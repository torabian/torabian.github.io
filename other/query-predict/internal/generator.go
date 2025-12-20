package internal

import (
	"bytes"
	"embed"
	"regexp"
	"strings"
	"text/template"
	"unicode"
)

//go:embed query.tpl manifest.tpl
var tplFS embed.FS

type Field struct {
	Name string
	Type string
	From string
}

type QueryData struct {
	FuncName  string
	SQL       string
	Fields    []Field
	Params    string // e.g., "active bool"
	ParamArgs string // e.g., "active"
}

// helper for template: detect last element
func lastFunc(i int, a []Field) bool {
	return i == len(a)-1
}

func MakeValidGoField(col string) string {
	// Remove *, dots, parentheses, quotes, and any non-alphanumeric chars
	re := regexp.MustCompile(`[^a-zA-Z0-9]+`)
	clean := re.ReplaceAllString(col, " ")

	// Split words and capitalize each (CamelCase)
	parts := strings.Fields(clean)
	for i, p := range parts {
		parts[i] = strings.Title(p)
	}

	field := strings.Join(parts, "")

	// Make sure the first letter is uppercase
	if field == "" {
		return "Col"
	}
	runes := []rune(field)
	if !unicode.IsUpper(runes[0]) {
		runes[0] = unicode.ToUpper(runes[0])
	}
	return string(runes)
}

// ProcessQueryPredicts generates Go code files in memory
func ProcessQueryPredicts(document QueryDocument) ([]VirtualFile, error) {
	files := []VirtualFile{}

	// load template from embedded FS
	tplContent, err := tplFS.ReadFile("query.tpl")
	if err != nil {
		return nil, err
	}

	tpl, err := template.New("query.tpl").
		Funcs(template.FuncMap{"last": lastFunc}).
		Parse(string(tplContent))
	if err != nil {
		return nil, err
	}

	for _, spec := range document.Queries {

		fields := []Field{}

		fields2, err := ExtractColumnsFromSql(spec.Query)
		if err != nil {
			return nil, err
		}

		for _, column := range fields2 {
			goName := column.GoName
			if goName == "" {
				goName = MakeValidGoField(column.ActualName)
			}

			typeof := "string"
			if column.Type != "" {
				typeof = column.Type
			}
			fields = append(fields,
				Field{
					Name: goName,
					From: column.ActualName,
					Type: typeof,
				},
			)
		}

		// _, sqlCleaned, err := ExtractColumnsAndCleanSql(spec.Query)
		// if err != nil {
		// 	return nil, err
		// }

		// For manual define.
		// for _, column := range spec.Out {
		// 	from := column.From
		// 	if from == "" {
		// 		from = column.Name
		// 	}
		// 	fields = append(fields,
		// 		Field{
		// 			Name: column.Name,
		// 			Type: column.Type,
		// 			From: from,
		// 		},
		// 	)
		// }

		cleanSQL := spec.Query

		re := regexp.MustCompile(`field\(\s*([^,]+),[^\)]*\)`)
		cleanSQL = re.ReplaceAllString(cleanSQL, "$1")

		data := QueryData{
			FuncName: spec.Name,
			SQL:      cleanSQL,
			Fields:   fields,
		}

		var buf bytes.Buffer
		if err := tpl.Execute(&buf, data); err != nil {
			return nil, err
		}

		file := VirtualFile{
			Name:         spec.Name,
			ActualScript: buf.String(),
			Extension:    ".go",
		}

		files = append(files, file)
	}

	// --- load manifest.tpl ---
	manifestTplContent, err := tplFS.ReadFile("manifest.tpl")
	if err != nil {
		return nil, err
	}

	manifestTpl, err := template.New("manifest.tpl").
		Parse(string(manifestTplContent))
	if err != nil {
		return nil, err
	}

	// --- generate manifest.go ---
	var manifestBuf bytes.Buffer
	if err := manifestTpl.Execute(&manifestBuf, document); err != nil {
		return nil, err
	}

	files = append(files, VirtualFile{
		Name:         "manifest",
		ActualScript: manifestBuf.String(),
		Extension:    ".go",
	})

	return files, nil
}
