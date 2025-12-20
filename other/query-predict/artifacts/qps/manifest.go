package artifacts

import "database/sql"

type Manifest struct {
	DB            *sql.DB
	FilterResolver func(string) (string, error)
}


func (m *Manifest) AnotherQuery(ctx AnotherQueryContext) ([]AnotherQueryRow, error) {
	if m.FilterResolver != nil {
		filter, err := m.FilterResolver(ctx.Filter)
		if err != nil {
			return []AnotherQueryRow{}, err
		}
		ctx.Filter = filter
	}
	return AnotherQuery(m.DB, ctx)
}

func (m *Manifest) SimpleQuery(ctx SimpleQueryContext) ([]SimpleQueryRow, error) {
	if m.FilterResolver != nil {
		filter, err := m.FilterResolver(ctx.Filter)
		if err != nil {
			return []SimpleQueryRow{}, err
		}
		ctx.Filter = filter
	}
	return SimpleQuery(m.DB, ctx)
}

