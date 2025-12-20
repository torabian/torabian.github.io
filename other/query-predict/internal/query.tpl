package artifacts

import (
	"database/sql"
	"fmt"
    "text/template"
	"log"
	"strings"
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

var {{ .FuncName }}Tmpl = template.Must(template.New("{{ .FuncName }}").Parse({{ .FuncName }}SQL))

func {{ .FuncName }}(db *sql.DB, ctx {{ .FuncName }}Context,{{ if .Params }}, {{ .Params }}{{ end }}) ([]{{ .FuncName }}Row, error) {
    var sb strings.Builder
	if err := {{ .FuncName }}Tmpl.Execute(&sb, ctx.Params); err != nil {
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
