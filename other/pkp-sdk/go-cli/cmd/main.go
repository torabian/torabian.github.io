package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"

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
				Name:   "schedules",
				Usage:  "Show planned train schedules",
				Action: schedules,
			},
			{
				Name:   "disruptions",
				Usage:  "Show current railway disruptions",
				Action: disruptions,
			},
			{
				Name:   "commercial-categories",
				Usage:  "List commercial categories",
				Action: commercialCategories,
			},
			{
				Name:   "operations",
				Usage:  "Show current railway operations",
				Action: operations,
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
				Name:  "route",
				Usage: "Show the timetable for a train",
				Flags: []cli.Flag{
					&cli.StringFlag{
						Name:     "schedule-id",
						Required: true,
					},
					&cli.StringFlag{
						Name:     "order-id",
						Required: true,
					},
				},
				Action: route,
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
func disruptions(ctx context.Context, _ *cli.Command) error {

	api, err := client()
	if err != nil {
		return err
	}

	res, err := external.GetDisruptionsActionCall(
		external.GetDisruptionsActionRequest{},
		api,
	)
	if err != nil {
		return err
	}

	data, err := res.AsIdeal()
	if err != nil {
		return err
	}

	title("Disruptions")

	fmt.Println("Generated at:", data.GeneratedAt)
	fmt.Println()

	if len(data.Disruptions.Items) == 0 {
		fmt.Println("No disruptions found.")
		return nil
	}

	for _, disruption := range data.Disruptions.Items {

		fmt.Println(headerStyle.Render(
			fmt.Sprintf("Disruption #%d", disruption.DisruptionId),
		))

		fmt.Println()
		fmt.Println(disruption.Message)
		fmt.Println()

		if len(disruption.AffectedRoutes.Items) == 0 {
			fmt.Println("No affected routes")
			fmt.Println()
			continue
		}

		table := tablewriter.NewWriter(os.Stdout)

		table.Header([]string{
			"Schedule",
			"Order",
			"Date",
			"Station",
			"Sequence",
		})

		for _, route := range disruption.AffectedRoutes.Items {

			station := fmt.Sprintf("%d", route.StationId)

			if name, ok := data.Stations[station]; ok {
				station = fmt.Sprintf(
					"%s (%d)",
					name,
					route.StationId,
				)
			}

			table.Append([]string{
				fmt.Sprint(route.ScheduleId),
				fmt.Sprint(route.OrderId),
				route.OperatingDate,
				station,
				fmt.Sprint(route.SequenceNumber),
			})
		}

		table.Render()

		fmt.Println()
	}

	return nil
}

func operations(ctx context.Context, _ *cli.Command) error {

	api, err := client()
	if err != nil {
		return err
	}

	res, err := external.GetOperationsActionCall(
		external.GetOperationsActionRequest{},
		api,
	)
	if err != nil {
		return err
	}

	data, err := res.AsIdeal()
	if err != nil {
		return err
	}

	title("Trains")

	fmt.Println("Generated at:", data.GeneratedAt)
	fmt.Println()

	fmt.Printf(
		"Page %d/%d (%d trains)\n",
		data.Pagination.Page,
		data.Pagination.TotalPages,
		data.Pagination.TotalCount,
	)
	fmt.Println()

	if len(data.Trains.Items) == 0 {
		fmt.Println("No trains found.")
		return nil
	}

	table := tablewriter.NewWriter(os.Stdout)

	table.Header([]string{
		"Schedule",
		"Order",
		"Train Order",
		"Date",
		"Status",
		"Stations",
	})

	for _, train := range data.Trains.Items {

		stations := make([]string, 0)

		for _, station := range train.Stations.Items {

			name := fmt.Sprintf("%d", station.StationId)

			if stationName, ok := data.Stations[name]; ok {
				name = fmt.Sprintf(
					"%s (%d)",
					stationName,
					station.StationId,
				)
			}

			stations = append(
				stations,
				fmt.Sprintf(
					"%s #%d",
					name,
					station.PlannedSequenceNumber,
				),
			)
		}

		table.Append([]string{
			fmt.Sprint(train.ScheduleId),
			fmt.Sprint(train.OrderId),
			fmt.Sprint(train.TrainOrderId),
			train.OperatingDate,
			train.TrainStatus,
			strings.Join(stations, ", "),
		})
	}

	table.Render()

	if data.Pagination.HasNextPage {
		fmt.Println()
		fmt.Printf(
			"More results available (%d/%d pages)\n",
			data.Pagination.Page,
			data.Pagination.TotalPages,
		)
	}

	return nil
}

func schedules(ctx context.Context, _ *cli.Command) error {

	api, err := client()
	if err != nil {
		return err
	}

	res, err := external.GetSchedulesActionCall(
		external.GetSchedulesActionRequest{},
		api,
	)
	if err != nil {
		return err
	}

	data, err := res.AsIdeal()
	if err != nil {
		return err
	}

	title("Schedules")

	fmt.Println("Generated at:", data.GeneratedAt)
	fmt.Println(
		"Period:",
		data.Period.From,
		"-",
		data.Period.To,
	)
	fmt.Println()

	if len(data.Routes.Items) == 0 {
		fmt.Println("No schedules found.")
		return nil
	}

	table := tablewriter.NewWriter(os.Stdout)

	table.Header([]string{
		"Train",
		"Carrier",
		"Category",
		"From Date",
		"Stations",
	})

	for _, route := range data.Routes.Items {

		stations := ""

		for _, station := range route.Stations.Items {

			name := fmt.Sprintf(
				"%d",
				station.StationId,
			)

			// if stationName, ok := data.Stations[name]; ok {
			// 	name = stationName
			// }

			if stations != "" {
				stations += " → "
			}

			stations += name
		}

		date := ""

		if len(route.OperatingDates) > 0 {
			date = route.OperatingDates[0]
		}

		table.Append([]string{
			route.NationalNumber,
			route.CarrierCode,
			route.CommercialCategorySymbol,
			date,
			stations,
		})
	}

	table.Render()

	return nil
}
func commercialCategories(ctx context.Context, _ *cli.Command) error {

	api, err := client()
	if err != nil {
		return err
	}

	res, err := external.GetCommercialCategoriesActionCall(
		external.GetCommercialCategoriesActionRequest{},
		api,
	)
	if err != nil {
		return err
	}

	data, err := res.AsIdeal()
	if err != nil {
		return err
	}

	title("Commercial Categories")

	fmt.Println("Generated at:", data.GeneratedAt)
	fmt.Println()

	if len(data.CommercialCategories.Items) == 0 {
		fmt.Println("No commercial categories found.")
		return nil
	}

	table := tablewriter.NewWriter(os.Stdout)

	table.Header([]string{
		"Code",
		"Name",
		"Carrier",
		"Speed Category",
	})

	for _, category := range data.CommercialCategories.Items {
		table.Append([]string{
			category.Code,
			category.Name,
			category.CarrierCode,
			category.SpeedCategoryCode,
		})
	}

	table.Render()

	return nil
}
func route(ctx context.Context, cmd *cli.Command) error {

	api, err := client()
	if err != nil {
		return err
	}

	scheduleID := cmd.String("schedule-id")
	orderID := cmd.String("order-id")

	fmt.Println("-", scheduleID, orderID)

	res, err := external.GetSchedulesRouteActionCall(
		external.GetSchedulesRouteActionRequest{
			Params: external.GetSchedulesRouteActionPathParameter{
				ScheduleId: scheduleID,
				OrderId:    orderID,
			},
		},
		api,
	)
	if err != nil {
		return err
	}

	data, err := res.AsIdeal()
	if err != nil {
		return err
	}

	title("Train Route")

	fmt.Printf("Schedule ID : %d\n", data.ScheduleId)
	fmt.Printf("Order ID    : %d\n", data.OrderId)
	fmt.Printf("Train Order : %d\n", data.TrainOrderId)
	fmt.Printf("Carrier     : %s\n", data.CarrierCode)
	fmt.Printf("Train No.   : %s\n", data.NationalNumber)
	fmt.Printf("Category    : %s\n", data.CommercialCategorySymbol)

	if len(data.OperatingDates) > 0 {
		fmt.Printf("Operating   : %s → %s (%d days)\n",
			data.OperatingDates[0],
			data.OperatingDates[len(data.OperatingDates)-1],
			len(data.OperatingDates),
		)
	}

	fmt.Println()

	table := tablewriter.NewWriter(os.Stdout)

	table.Header([]string{
		"#",
		"Station",
		"Arrival",
		"Departure",
		"Platform",
	})

	for _, station := range data.Stations.Items {

		name := fmt.Sprintf("%d", station.StationId)

		// if stationName, ok := api.Stations()[name]; ok {
		// 	name = fmt.Sprintf("%s (%d)", stationName, station.StationId)
		// }

		platform := station.DeparturePlatform
		if platform == "" {
			platform = station.ArrivalPlatform
		}

		table.Append([]string{
			fmt.Sprint(station.OrderNumber),
			name,
			station.ArrivalTime,
			station.DepartureTime,
			platform,
		})
	}

	table.Render()

	return nil
}
