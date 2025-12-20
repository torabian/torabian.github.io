package tests

import (
	"database/sql"
	"log"
	"testing"

	"github.com/h22rana/jsonlogic2sql"
	_ "github.com/mattn/go-sqlite3"
	"github.com/torabian/query-predict/artifacts"
)

func TestSimple(t *testing.T) {
	// Open in-memory SQLite database
	db, err := sql.Open("sqlite3", ":memory:")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create table and insert test data
	db.Exec(`CREATE TABLE users (id INTEGER, name TEXT, email TEXT)`)
	db.Exec(`INSERT INTO users (id, name, email) VALUES (1, 'Alice', 'alice@example.com')`)
	db.Exec(`INSERT INTO users (id, name, email) VALUES (2, 'Bob', 'bob@example.com')`)

	// Run the generated query
	users, err := artifacts.GetUsers(db, artifacts.GetUsersContext{})
	if err != nil {
		log.Fatal(err)
	}

	for _, u := range users {
		t.Logf("%+v", u) // logs appear only in verbose mode
	}
}

func TestUsersWithOrders(t *testing.T) {
	db, err := sql.Open("sqlite3", ":memory:")
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	// Create tables
	db.Exec(`CREATE TABLE users (id INTEGER, name TEXT, email TEXT)`)
	db.Exec(`CREATE TABLE orders (id INTEGER, user_id INTEGER, total REAL)`)

	// Insert test data
	db.Exec(`INSERT INTO users (id, name, email) VALUES (1, 'Alice', 'alice@example.com')`)
	db.Exec(`INSERT INTO users (id, name, email) VALUES (2, 'Bob', 'bob@example.com')`)
	db.Exec(`INSERT INTO orders (id, user_id, total) VALUES (1, 1, 100.5)`)
	db.Exec(`INSERT INTO orders (id, user_id, total) VALUES (2, 1, 50.0)`)

	m := artifacts.Manifest{
		DB: db,
		FilterResolver: func(s string) (string, error) {
			result, err := jsonlogic2sql.Transpile(s)
			if err != nil {
				return "", err
			}

			result = result[6:]
			return result, nil
		},
	}

	rows, err := m.GetUsersWithOrders(artifacts.GetUsersWithOrdersContext{
		Filter: `{"and": [{">": [{"var": "order_id"}, 1]}]}`,
	})

	if err != nil {
		t.Fatal(err)
	}

	var results []artifacts.GetUsersWithOrdersRow
	for _, r := range rows {
		results = append(results, r)
	}

	// Print results
	for _, r := range results {
		t.Logf("%+v", r)
	}
}

func TestVirtualTableWhereHaving(t *testing.T) {
	db, err := sql.Open("sqlite3", ":memory:")
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()

	m := artifacts.Manifest{
		DB: db,
		FilterResolver: func(s string) (string, error) {
			result, err := jsonlogic2sql.Transpile(s)
			if err != nil {
				return "", err
			}

			result = result[6:]
			return result, nil
		},
	}

	rows, err := m.VirtualUserOrder(artifacts.VirtualUserOrderContext{
		Filter: `{"and": [{"!=": [{"var": "u.user_name"}, "Alicex"]}]}`,
		Params: map[string]interface{}{
			"limit": 2,
		},
	})

	if err != nil {
		t.Fatal(err)
	}

	var results []artifacts.VirtualUserOrderRow
	for _, r := range rows {
		results = append(results, r)
	}

	// Print results
	for _, r := range results {
		t.Logf("%+v", r)
	}
}
