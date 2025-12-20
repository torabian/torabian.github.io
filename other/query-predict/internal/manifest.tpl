package artifacts

import "database/sql"

type Manifest struct {
	DB            *sql.DB
	FilterResolver func(string) (string, error)
}

{{ range .Queries }}
func (m *Manifest) {{ .Name }}(ctx {{ .Name }}Context) ([]{{ .Name }}Row, error) {
	if m.FilterResolver != nil {
		filter, err := m.FilterResolver(ctx.Filter)
		if err != nil {
			return []{{ .Name }}Row{}, err
		}
		ctx.Filter = filter
	}
	return {{ .Name }}(m.DB, ctx)
}
{{ end }}
