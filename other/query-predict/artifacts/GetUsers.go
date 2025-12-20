package artifacts

import (
	"database/sql"
	"fmt"
	"log"
	"strings"
)

const GetUsersSQL = `SELECT id, name, email FROM users`

type GetUsersRow struct {
	Id string
	Name string
	Email string
}

type GetUsersContext struct {
    Filter string
    Having string
    Restriction string
}

func GetUsers(db *sql.DB, ctx GetUsersContext,) ([]GetUsersRow, error) {
    script := GetUsersSQL
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
		return nil, fmt.Errorf("query GetUsers failed: %w", err)
	}
	defer rows.Close()

	cols, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	var results []GetUsersRow
	for rows.Next() {
		var r GetUsersRow

		scanArgs := make([]interface{}, len(cols))
		for i, col := range cols {
			switch col {
			case "id":
				scanArgs[i] = &r.Id
			case "name":
				scanArgs[i] = &r.Name
			case "email":
				scanArgs[i] = &r.Email
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
