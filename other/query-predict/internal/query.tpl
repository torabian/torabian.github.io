package artifacts

import (
	"database/sql"
	"fmt"
	"log"
	"strings"
    "regexp"
)

const {{ .FuncName }}SQL = `{{ .SQL }}`

type {{ .FuncName }}Row struct {
{{- range .Fields }}
	{{ .Name }} {{ .Type }}
{{- end }}
}

type {{ .FuncName }}Context struct {
    Filter string
    Having string
    Restriction string
    Params      map[string]interface{}
}

func {{ .FuncName }}(db *sql.DB, ctx {{ .FuncName }}Context,{{ if .Params }}, {{ .Params }}{{ end }}) ([]{{ .FuncName }}Row, error) {
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

    script := replaceUseVal({{ .FuncName }}SQL, ctx.Params)
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

	rows, err := db.Query(script{{ if .ParamArgs }}, {{ .ParamArgs }}{{ end }})
	if err != nil {
		return nil, fmt.Errorf("query {{ .FuncName }} failed: %w", err)
	}
	defer rows.Close()

	cols, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	var results []{{ .FuncName }}Row
	for rows.Next() {
		var r {{ .FuncName }}Row

		scanArgs := make([]interface{}, len(cols))
		for i, col := range cols {
			switch col {
{{- range .Fields }}
			case "{{ .From }}":
				scanArgs[i] = &r.{{ .Name }}
{{- end }}
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
