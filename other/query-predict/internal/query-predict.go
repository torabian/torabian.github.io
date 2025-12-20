package internal

type QuerySpecColumn struct {
	Name string `yaml:"name"`
	Type string `yaml:"type"`
	From string `yaml:"from"`
}

type QuerySpec struct {
	Name  string            `yaml:"name"`
	Query string            `yaml:"query"`
	Out   []QuerySpecColumn `yaml:"out"`
}

type QueryDocument struct {
	Queries []QuerySpec `yaml:"queries"`
}
