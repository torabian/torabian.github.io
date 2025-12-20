package artifacts

import (
	"database/sql"
	"fmt"
	"log"
	"strings"
)

const AnotherQuerySQL = `SELECT 1 as 'one'`

type AnotherQueryRow struct {
	One string
}

type AnotherQueryContext struct {
    Filter string
    Having string
    Restriction string
}

func AnotherQuery(db *sql.DB, ctx AnotherQueryContext,) ([]AnotherQueryRow, error) {
    script := AnotherQuerySQL
    filter := "1"
	if ctx.Filter != "" {
		filter = ctx.Filter
	}
	script = strings.ReplaceAll(script, "filter()", "(" +filter+ ")")

    restriction := "1"
    if ctx.Restriction != "" {
        restriction = ctx.Restriction
    }
    script = strings.ReplaceAll(script, "restriction()", "(" +restriction + ")")
    
    having := ""
    if ctx.Having != "" {
        having = ctx.Having
    }
    script = strings.ReplaceAll(script, "having()", having)


    log.Default().Println(script)

	rows, err := db.Query(script)
	if err != nil {
		return nil, fmt.Errorf("query AnotherQuery failed: %w", err)
	}
	defer rows.Close()

	cols, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	var results []AnotherQueryRow
	for rows.Next() {
		var r AnotherQueryRow

		scanArgs := make([]interface{}, len(cols))
		for i, col := range cols {
			switch col {
			case "one":
				scanArgs[i] = &r.One
			default:
				var discard interface{}
				scanArgs[i] = &discard
			}
		}

		if err := rows.Scan(scanArgs...); err != nil {
			return nil, err
		}
		results = append(results, r)
	}

	return results, nil
}
