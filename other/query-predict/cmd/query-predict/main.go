package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path"

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
		Usage: "Path of the file on the disk",
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
	Description: "Generate the sql files, and golang helpers from the yaml file",
	Usage:       "Generate the sql files, and golang helpers from the yaml file",
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
