package artifacts

import "database/sql"

type Manifest struct {
	DB             *sql.DB
	FilterResolver func(string) (string, error)
}

func (m *Manifest) DeleteData(ctx DeleteDataContext) (sql.Result, error) {
	if m.FilterResolver != nil {
		filter, err := m.FilterResolver(ctx.Filter)
		if err != nil {
			return nil, err
		}
		ctx.Filter = filter
	}
	return DeleteData(m.DB, ctx)
}

func (m *Manifest) InsertInto(ctx InsertIntoContext) (sql.Result, error) {
	if m.FilterResolver != nil {
		filter, err := m.FilterResolver(ctx.Filter)
		if err != nil {
			return nil, err
		}
		ctx.Filter = filter
	}
	return InsertInto(m.DB, ctx)
}

func (m *Manifest) TransactionSample(ctx TransactionSampleContext) (sql.Result, error) {
	if m.FilterResolver != nil {
		filter, err := m.FilterResolver(ctx.Filter)
		if err != nil {
			return nil, err
		}
		ctx.Filter = filter
	}
	return TransactionSample(m.DB, ctx)
}

func (m *Manifest) GetUsers(ctx GetUsersContext) ([]GetUsersRow, error) {
	if m.FilterResolver != nil {
		filter, err := m.FilterResolver(ctx.Filter)
		if err != nil {
			return []GetUsersRow{}, err
		}
		ctx.Filter = filter
	}
	return GetUsers(m.DB, ctx)
}

func (m *Manifest) GetUsersWithOrders(ctx GetUsersWithOrdersContext) ([]GetUsersWithOrdersRow, error) {
	if m.FilterResolver != nil {
		filter, err := m.FilterResolver(ctx.Filter)
		if err != nil {
			return []GetUsersWithOrdersRow{}, err
		}
		ctx.Filter = filter
	}
	return GetUsersWithOrders(m.DB, ctx)
}

func (m *Manifest) BasicNaming(ctx BasicNamingContext) ([]BasicNamingRow, error) {
	if m.FilterResolver != nil {
		filter, err := m.FilterResolver(ctx.Filter)
		if err != nil {
			return []BasicNamingRow{}, err
		}
		ctx.Filter = filter
	}
	return BasicNaming(m.DB, ctx)
}

func (m *Manifest) VirtualUserOrder(ctx VirtualUserOrderContext) ([]VirtualUserOrderRow, error) {
	if m.FilterResolver != nil {
		filter, err := m.FilterResolver(ctx.Filter)
		if err != nil {
			return []VirtualUserOrderRow{}, err
		}
		ctx.Filter = filter
	}
	return VirtualUserOrder(m.DB, ctx)
}
