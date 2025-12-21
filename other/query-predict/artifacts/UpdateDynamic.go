package artifacts

import (
	"database/sql"
	"fmt"
	"log"
	"strings"
    "regexp"
)

const UpdateDynamicSQL = `UPDATE users
SET last_order_total = (
    SELECT total
    FROM orders
    WHERE orders.user_id = users.id
    ORDER BY id DESC
    LIMIT 1
),
name = field("asdasd", 'int64', 'Name', true)
WHERE EXISTS (
    SELECT 1 FROM orders WHERE orders.user_id = users.id
);
`

type UpdateDynamicContext struct {
    Filter string
    Having string
    Restriction string
    Params      map[string]interface{}

	// Native sql placeholder values such as where id = ?
	Placeholders []any
}


func UpdateDynamicPrepreSql(ctx UpdateDynamicContext) (string, error) {
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

    script := replaceUseVal(UpdateDynamicSQL, ctx.Params)
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


func UpdateDynamic(db *sql.DB, ctx UpdateDynamicContext,) (sql.Result, error) {
    script, err := UpdateDynamicPrepreSql(ctx)
    if err != nil {
		return nil, err
	}


    log.Default().Println(script)

	res, err := db.Exec(script, ctx.Placeholders...)
	if err != nil {
		return res, fmt.Errorf("exec UpdateDynamic failed: %w", err)
	}

	return res, nil
}
