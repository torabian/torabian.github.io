package main

import (
	"embed"
	"encoding/json"
	"fmt"
	"io/fs"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/torabian/query-predict/internal"
	"github.com/urfave/cli"
)

type MicroGenContext struct {
	Tags     string // Tags/features to enable or disable
	Output   string // Output file or directory
	Flags    string
	Content  string
	Document internal.QueryDocument
}

var commonFlags []cli.Flag = []cli.Flag{
	cli.StringFlag{
		Name:  "path",
		Usage: "Path of the file on the disk, or maybe the folder which contains sql files",
	},
	cli.StringFlag{
		Name:  "output",
		Usage: "The directory which the generated files will be rewritten to",
	},
	cli.StringFlag{
		Name:  "tags",
		Usage: "A set of string flags separated by comma (,) to add or remove compile feature. Such as 'nestjs-headers-decorator'",
	},
}

func createCliContext(c *cli.Context) (MicroGenContext, error) {
	ctx := MicroGenContext{
		Tags:   c.String("tags"),
		Output: c.String("output"),
	}

	content, _ := os.ReadFile(c.String("path"))
	var m map[string]string = map[string]string{}

	document, err := internal.LoadQueriesFromString(string(content))

	if err != nil {
		fmt.Printf("expected no error, got %v", err)
		return ctx, err
	}

	ctx.Document = *document

	res, _ := json.Marshal(m)

	ctx.Flags = string(res)
	ctx.Content = string(content)

	return ctx, nil
}

func main() {

	commands := []cli.Command{
		GenerateCommand,
		DirCommand,
	}

	app := &cli.App{
		Name:     "Query Predict",
		Usage:    "Query Predict generation tool",
		Commands: commands,
	}

	if err := app.Run(os.Args); err != nil {
		fmt.Println(err)
	}
}

var GenerateCommand = cli.Command{
	Name:        "gen",
	Description: "Generate the query predict golang files from a query predict yaml definition",
	Usage:       "Generate the query predict golang files from a query predict yaml definition",
	Flags:       commonFlags,
	Action: func(c *cli.Context) error {
		ctx, err := createCliContext(c)
		if err != nil {
			return err
		}

		files, err := internal.ProcessQueryPredicts(ctx.Document)
		if err != nil {
			return err
		}

		for _, file := range files {

			filePath := path.Join(ctx.Output, file.Location, file.Name+file.Extension)
			os.MkdirAll(path.Dir(filePath), os.ModePerm)

			if err := os.WriteFile(filePath, []byte(file.ActualScript), 0644); err != nil {
				return fmt.Errorf("error on writing file to disk: %v, %v, %w", file.Location, file.Name, err)
			}
		}

		return nil
	},
}
var DirCommand = cli.Command{
	Name:        "dir",
	Description: "Searches for .sql files in given directory, considering maximum depth, and would generate querypredict golang files in output ",
	Usage:       "Searches for .sql files in given directory, considering maximum depth, and would generate querypredict golang files in output ",
	Flags:       commonFlags,
	Action: func(c *cli.Context) error {

		files := []internal.VirtualFile{}
		doc := internal.QueryDocument{}

		err2 := ReadSQLFiles(DiskFS{Root: c.String("path")}, ".", 1, func(filePath string, data []byte) error {

			doc.Queries = append(doc.Queries, internal.QuerySpec{

				Name:  strings.ReplaceAll(path.Base(filePath), ".sql", ""),
				Query: string(data),
			})

			return nil
		})

		if err2 != nil {
			return err2
		}

		files, err := internal.ProcessQueryPredicts(doc)
		if err != nil {
			return err
		}

		for _, file := range files {

			filePath := path.Join(c.String("output"), file.Location, file.Name+file.Extension)
			os.MkdirAll(path.Dir(filePath), os.ModePerm)

			if err := os.WriteFile(filePath, []byte(file.ActualScript), 0644); err != nil {
				return fmt.Errorf("error on writing file to disk: %v, %v, %w", file.Location, file.Name, err)
			}
		}

		for _, file := range files {

			filePath := path.Join(c.String("output"), file.Location, file.Name+file.Extension)
			os.MkdirAll(path.Dir(filePath), os.ModePerm)

			if err := os.WriteFile(filePath, []byte(file.ActualScript), 0644); err != nil {
				return fmt.Errorf("error on writing file to disk: %v, %v, %w", file.Location, file.Name, err)
			}
		}

		return nil
	},
}

// FS defines minimal interface for reading files and walking directories
type FS interface {
	ReadDir(dirname string) ([]fs.DirEntry, error)
	ReadFile(name string) ([]byte, error)
}

// DiskFS implements FS for the OS file system
type DiskFS struct {
	Root string
}

func (d DiskFS) ReadDir(dirname string) ([]fs.DirEntry, error) {
	return os.ReadDir(filepath.Join(d.Root, dirname))
}

func (d DiskFS) ReadFile(name string) ([]byte, error) {
	return os.ReadFile(filepath.Join(d.Root, name))
}

// EmbedFS implements FS for embed.FS
type EmbedFS struct {
	FS   embed.FS
	Root string
}

func (e EmbedFS) ReadDir(dirname string) ([]fs.DirEntry, error) {
	return e.FS.ReadDir(filepath.Join(e.Root, dirname))
}

func (e EmbedFS) ReadFile(name string) ([]byte, error) {
	return e.FS.ReadFile(filepath.Join(e.Root, name))
}

// ReadSQLFiles walks the FS and reads all .sql files up to maxDepth
func ReadSQLFiles(fsys FS, root string, maxDepth int, reader func(path string, data []byte) error) error {
	var walk func(path string, depth int) error
	walk = func(path string, depth int) error {
		if maxDepth >= 0 && depth > maxDepth {
			return nil
		}
		entries, err := fsys.ReadDir(path)
		if err != nil {
			return err
		}
		for _, e := range entries {
			p := filepath.Join(path, e.Name())
			if e.IsDir() {
				if err := walk(p, depth+1); err != nil {
					return err
				}
			} else if strings.HasSuffix(e.Name(), ".sql") {
				data, err := fsys.ReadFile(p)
				if err != nil {
					return err
				}
				if err := reader(p, data); err != nil {
					return err
				}
			}
		}
		return nil
	}
	return walk(root, 0)
}
