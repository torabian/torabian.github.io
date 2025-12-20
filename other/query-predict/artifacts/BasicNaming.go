package artifacts

import (
	"database/sql"
	"fmt"
    "text/template"
	"log"
	"strings"
)

const BasicNamingSQL = `Select table1.firstColumn as ali;`

type BasicNamingRow struct {
	Ali int64
}

type BasicNamingContext struct {
    Filter string
    Having string
    Restriction string
    Params      map[string]interface{}
}

var BasicNamingTmpl = template.Must(template.New("BasicNaming").Parse(BasicNamingSQL))

func BasicNaming(db *sql.DB, ctx BasicNamingContext,) ([]BasicNamingRow, error) {
    var sb strings.Builder
	if err := BasicNamingTmpl.Execute(&sb, ctx.Params); err != nil {
		return nil, fmt.Errorf("failed to execute template: %w", err)
	}
	script := sb.String()

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
		return nil, fmt.Errorf("query BasicNaming failed: %w", err)
	}
	defer rows.Close()

	cols, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	var results []BasicNamingRow
	for rows.Next() {
		var r BasicNamingRow

		scanArgs := make([]interface{}, len(cols))
		for i, col := range cols {
			switch col {
			case "ali":
				scanArgs[i] = &r.Ali
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
