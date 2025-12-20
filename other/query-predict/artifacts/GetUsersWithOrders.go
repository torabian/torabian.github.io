package artifacts

import (
	"database/sql"
	"fmt"
	"log"
	"strings"
    "regexp"
)

const GetUsersWithOrdersSQL = `SELECT u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email,
      o.id AS order_id,
      o.total AS order_total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
where filter() and restriction()
`

type GetUsersWithOrdersRow struct {
	UserId string
	UserName string
	UserEmail string
	OrderId string
	OrderTotal string
}

type GetUsersWithOrdersContext struct {
    Filter string
    Having string
    Restriction string
    Params      map[string]interface{}
    Placeholders      []any
}


func GetUsersWithOrdersPrepreSql(ctx GetUsersWithOrdersContext) (string, error) {
    replaceUseVal := func(sql string, values map[string]interface{}) string {
        re := regexp.MustCompile(`useval\(\s*['"]([^'"]+)['"]\s*\)`)
        return re.ReplaceAllStringFunc(sql, func(match string) string {
            if m := re.FindStringSubmatch(match); len(m) > 1 {
                if val, ok := values[m[1]]; ok {
                    // escape the value safely
                    switch v := val.(type) {
                    case string:
                        safe := strings.ReplaceAll(v, `'`, `''`)
                        return "'" + safe + "'"
                    default:
                        return fmt.Sprintf("%v", v)
                    }
                }
            }
            return match
        })
    }

    script := replaceUseVal(GetUsersWithOrdersSQL, ctx.Params)
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

    return script, nil
}


func GetUsersWithOrders(db *sql.DB, ctx GetUsersWithOrdersContext,) ([]GetUsersWithOrdersRow, error) {
    script, err := GetUsersWithOrdersPrepreSql(ctx)
    if err != nil {
		return nil, err
	}

    log.Default().Println(script)

	rows, err := db.Query(script, ctx.Placeholders...)
	if err != nil {
		return nil, fmt.Errorf("query GetUsersWithOrders failed: %w", err)
	}
	defer rows.Close()

	cols, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	var results []GetUsersWithOrdersRow
	for rows.Next() {
		var r GetUsersWithOrdersRow

		scanArgs := make([]interface{}, len(cols))
		for i, col := range cols {
			switch col {
			case "user_id":
				scanArgs[i] = &r.UserId
			case "user_name":
				scanArgs[i] = &r.UserName
			case "user_email":
				scanArgs[i] = &r.UserEmail
			case "order_id":
				scanArgs[i] = &r.OrderId
			case "order_total":
				scanArgs[i] = &r.OrderTotal
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
