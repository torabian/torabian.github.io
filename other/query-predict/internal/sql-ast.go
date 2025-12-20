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

	// fallback alias if missing
	if e.As.String() != "" {
		col.ActualName = e.As.String()
	} else {
		col.ActualName = sqlparser.String(e.Expr)
	}

	// recursively handle functions
	if fn, ok := e.Expr.(*sqlparser.FuncExpr); ok {
		col = handleFuncExpr(fn, col)
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
				parentCol.ActualName = sqlparser.String(arg0.Expr)
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

	case "selectable":
		// selectable(expr, ...)
		if len(fn.Exprs) >= 1 {
			if arg0, ok := fn.Exprs[0].(*sqlparser.AliasedExpr); ok {
				// recursively handle inner function
				parentCol = handleExpr(arg0)
			}
		}
		// could extend to handle extra args to selectable later

	default:
		// unknown functions, leave as-is
	}

	return parentCol
}

// ExtractColumnsAndCleanSql parses SQL and returns structured columns + cleaned SQL
func ExtractColumnsAndCleanSql(sql string) ([]SelectColumn, string, error) {
	stmt, err := sqlparser.Parse(sql)
	if err != nil {
		return nil, "", fmt.Errorf("failed to parse sql: %w", err)
	}

	sel, ok := stmt.(*sqlparser.Select)
	if !ok {
		return nil, "", fmt.Errorf("not a SELECT statement")
	}

	var cols []SelectColumn

	for i, expr := range sel.SelectExprs {
		switch e := expr.(type) {

		case *sqlparser.AliasedExpr:
			col := handleExpr(e)
			cols = append(cols, col)

			// Replace field()/selectable() with the inner SQL expression
			sel.SelectExprs[i] = &sqlparser.AliasedExpr{
				Expr: col.Expr,
				As:   e.As, // keep original alias
			}

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

	// Generate cleaned SQL
	buf := sqlparser.NewTrackedBuffer(nil)
	sel.Format(buf)

	return cols, buf.String(), nil
}
