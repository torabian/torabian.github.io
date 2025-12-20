package internal

import (
	"fmt"
	"strings"

	"github.com/xwb1989/sqlparser"
)

// SelectColumn holds information for code generation
type SelectColumn struct {
	ActualName string         // SQL expression or alias
	GoName     string         // Go struct field name
	IsOptional bool           // true if column is optional
	Type       string         // Go type (string, int64, sql.NullString, etc)
	Expr       sqlparser.Expr // original AST node
}

// ExtractColumnsFromSql parses SQL and extracts structured column info
func ExtractColumnsFromSql(sql string) ([]SelectColumn, error) {
	stmt, err := sqlparser.Parse(sql)
	if err != nil {
		return nil, fmt.Errorf("failed to parse sql: %w", err)
	}

	sel, ok := stmt.(*sqlparser.Select)
	if !ok {
		return nil, fmt.Errorf("not a SELECT statement")
	}

	var cols []SelectColumn

	for _, expr := range sel.SelectExprs {
		switch e := expr.(type) {

		case *sqlparser.AliasedExpr:
			col := handleExpr(e)
			cols = append(cols, col)

		case *sqlparser.StarExpr:
			col := SelectColumn{}
			if e.TableName.IsEmpty() {
				col.ActualName = "*"
			} else {
				col.ActualName = e.TableName.Name.String() + ".*"
			}
			col.GoName = col.ActualName
			cols = append(cols, col)
		}
	}

	return cols, nil
}

// handleExpr recursively extracts info from AliasedExpr
func handleExpr(e *sqlparser.AliasedExpr) SelectColumn {
	col := SelectColumn{
		Expr: e.Expr,
	}

	// if the expression is a function, handle it
	if fn, ok := e.Expr.(*sqlparser.FuncExpr); ok {
		col = handleFuncExpr(fn, col)
	}

	// if it's a simple column and no alias set, use column name
	if _, ok := e.Expr.(*sqlparser.ColName); ok && col.ActualName == "" {
		col.ActualName = e.Expr.(*sqlparser.ColName).Name.String()
	}

	if e.As.String() != "" {
		col.ActualName = e.As.String()
	}

	// fallback for any other expression if ActualName still empty
	if col.ActualName == "" {
		col.ActualName = sqlparser.String(e.Expr)
	}

	return col
}

// handleFuncExpr detects custom functions like field() and selectable()
func handleFuncExpr(fn *sqlparser.FuncExpr, parentCol SelectColumn) SelectColumn {
	name := strings.ToLower(fn.Name.Lowered())

	switch name {

	case "field":
		// field(sqlExpr, goName?, optional?, type?)
		if len(fn.Exprs) >= 1 {
			if arg0, ok := fn.Exprs[0].(*sqlparser.AliasedExpr); ok {

				switch expr := arg0.Expr.(type) {
				case *sqlparser.ColName:
					// just take the column name, ignore table prefix
					parentCol.ActualName = expr.Name.String()
				default:
					// fallback for any other expression
					parentCol.ActualName = sqlparser.String(expr)
				}
				parentCol.Expr = arg0.Expr
			}
		}
		if len(fn.Exprs) >= 2 {
			if arg3, ok := fn.Exprs[1].(*sqlparser.AliasedExpr); ok {
				if strVal, ok := arg3.Expr.(*sqlparser.SQLVal); ok && strVal.Type == sqlparser.StrVal {
					parentCol.Type = string(strVal.Val)
				}
			}
		}
		if len(fn.Exprs) >= 3 {
			if arg1, ok := fn.Exprs[2].(*sqlparser.AliasedExpr); ok {
				if strVal, ok := arg1.Expr.(*sqlparser.SQLVal); ok && strVal.Type == sqlparser.StrVal {
					parentCol.GoName = string(strVal.Val)
				}
			}
		}
		if len(fn.Exprs) >= 4 {
			if arg2, ok := fn.Exprs[3].(*sqlparser.AliasedExpr); ok {
				switch val := arg2.Expr.(type) {
				case *sqlparser.SQLVal:
					// string or number
					if val.Type == sqlparser.StrVal {
						parentCol.IsOptional = strings.ToLower(string(val.Val)) == "true"
					} else if val.Type == sqlparser.IntVal {
						parentCol.IsOptional = string(val.Val) != "0"
					}
				case sqlparser.BoolVal:
					// boolean literal true/false
					parentCol.IsOptional = bool(val)
				}
			}
		}
	}

	return parentCol
}
