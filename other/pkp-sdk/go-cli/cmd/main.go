package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/charmbracelet/lipgloss"
	"github.com/joho/godotenv"
	"github.com/olekukonko/tablewriter"
	"github.com/torabian/emi/emigo"
	external "github.com/torabian/pkp-sdk/go"
	"github.com/urfave/cli/v3"
)

var (
	apiKey = os.Getenv("PKP_API_KEY")

	headerStyle = lipgloss.NewStyle().
			Bold(true).
			Foreground(lipgloss.Color("205"))
)

func loadEnv() {

	home, err := os.UserHomeDir()
	if err != nil {
		return
	}

	envPath := filepath.Join(home, ".pkp.env")

	_ = godotenv.Load(envPath)

	apiKey = os.Getenv("PKP_API_KEY")
}

func saveEnv(key string, value string) error {

	home, err := os.UserHomeDir()
	if err != nil {
		return err
	}

	envPath := filepath.Join(home, ".pkp.env")

	content := fmt.Sprintf(
		"PKP_API_KEY=%s\n",
		value,
	)

	return os.WriteFile(
		envPath,
		[]byte(content),
		0600,
	)
}

func auth(ctx context.Context, cmd *cli.Command) error {

	token := cmd.Args().First()

	if token == "" {
		return fmt.Errorf("missing token: pkp auth <token>")
	}

	if err := saveEnv("PKP_API_KEY", token); err != nil {
		return err
	}

	apiKey = token

	fmt.Println("✓ PKP token saved")

	return nil
}

func main() {

	loadEnv()

	app := &cli.Command{
		Name:  "pkp",
		Usage: "PKP API CLI",

		Commands: []*cli.Command{
			{
				Name:      "auth",
				Usage:     "Store PKP API token",
				Action:    auth,
				ArgsUsage: "<token>",
			},
			{
				Name:   "carriers",
				Usage:  "List carriers",
				Action: carriers,
			},
			{
				Name:   "stations",
				Usage:  "List stations",
				Action: stations,
			},
			{
				Name:   "stop-types",
				Usage:  "List stop types",
				Action: stopTypes,
			},
			{
				Name:   "versions",
				Usage:  "Show data versions",
				Action: versions,
			},
			{
				Name:   "statistics",
				Usage:  "Show operation statistics",
				Action: statistics,
			},
		},
	}

	if err := app.Run(context.Background(), os.Args); err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
}

func client() (*emigo.APIClient, error) {
	if apiKey == "" {
		return nil, fmt.Errorf("PKP_API_KEY environment variable is required")
	}

	headers := http.Header{}
	headers.Set("X-API-Key", apiKey)

	return &emigo.APIClient{
		Headers: headers,
	}, nil
}

func title(v string) {
	fmt.Println()
	fmt.Println(headerStyle.Render(v))
	fmt.Println()
}

func carriers(ctx context.Context, _ *cli.Command) error {

	api, err := client()
	if err != nil {
		return err
	}

	res, err := external.GetCarriersActionCall(
		external.GetCarriersActionRequest{},
		api,
	)
	if err != nil {
		return err
	}

	data, err := res.AsIdeal()
	if err != nil {
		return err
	}

	title("Carriers")

	table := tablewriter.NewWriter(os.Stdout)
	table.Header([]string{
		"Code",
		"Name",
		"Valid From",
		"Valid To",
	})

	for _, item := range data.Carriers.Items {
		table.Append([]string{
			item.Code,
			item.Name,
			fmt.Sprint(item.ValidFrom),
			fmt.Sprint(item.ValidTo),
		})
	}

	table.Render()

	fmt.Println()
	fmt.Println("Usage:")
	fmt.Println(data.Usage.Description)

	return nil
}

func stations(ctx context.Context, _ *cli.Command) error {

	api, err := client()
	if err != nil {
		return err
	}

	res, err := external.GetStationsActionCall(
		external.GetStationsActionRequest{},
		api,
	)
	if err != nil {
		return err
	}

	data, err := res.AsIdeal()
	if err != nil {
		return err
	}

	title("Stations")

	table := tablewriter.NewWriter(os.Stdout)

	table.Header([]string{
		"ID",
		"Name",
	})

	for _, item := range data.Stations.Items {
		table.Append([]string{
			fmt.Sprint(item.Id),
			item.Name,
		})
	}

	table.Render()

	return nil
}

func stopTypes(ctx context.Context, _ *cli.Command) error {

	api, err := client()
	if err != nil {
		return err
	}

	res, err := external.GetStopTypesActionCall(
		external.GetStopTypesActionRequest{},
		api,
	)
	if err != nil {
		return err
	}

	data, err := res.AsIdeal()
	if err != nil {
		return err
	}

	title("Stop Types")

	table := tablewriter.NewWriter(os.Stdout)

	table.Header([]string{
		"ID",
		"Description",
	})

	for _, item := range data.StopTypes.Items {
		table.Append([]string{
			fmt.Sprint(item.Id),
			item.Description,
		})
	}

	table.Render()

	return nil
}

func versions(ctx context.Context, _ *cli.Command) error {

	api, err := client()
	if err != nil {
		return err
	}

	res, err := external.GetDataVersionActionCall(
		external.GetDataVersionActionRequest{},
		api,
	)
	if err != nil {
		return err
	}

	data, err := res.AsIdeal()
	if err != nil {
		return err
	}

	title("Versions")

	table := tablewriter.NewWriter(os.Stdout)

	table.Header([]string{
		"Data",
		"Operations",
		"Schedules",
		"Timestamp",
	})

	table.Append([]string{
		fmt.Sprint(data.DataVersion),
		fmt.Sprint(data.OperationsVersion),
		fmt.Sprint(data.SchedulesVersion),
		fmt.Sprint(data.Timestamp),
	})

	table.Render()

	return nil
}

func statistics(ctx context.Context, _ *cli.Command) error {

	api, err := client()
	if err != nil {
		return err
	}

	res, err := external.GetOperationsStatisticsActionCall(
		external.GetOperationsStatisticsActionRequest{},
		api,
	)
	if err != nil {
		return err
	}

	data, err := res.AsIdeal()
	if err != nil {
		return err
	}

	title("Operation Statistics")

	table := tablewriter.NewWriter(os.Stdout)

	table.Header([]string{
		"Total",
		"Not Started",
		"In Progress",
		"Completed",
		"Cancelled",
		"Partial Cancelled",
	})

	table.Append([]string{
		fmt.Sprint(data.TotalTrains),
		fmt.Sprint(data.NotStarted),
		fmt.Sprint(data.InProgress),
		fmt.Sprint(data.Completed),
		fmt.Sprint(data.Cancelled),
		fmt.Sprint(data.PartialCancelled),
	})

	table.Render()

	return nil
}
