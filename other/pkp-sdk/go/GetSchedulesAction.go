package external

import (
	"encoding/json"
	"github.com/torabian/emi/emigo"
	"io"
	"net/http"
	"net/url"
	"reflect"
)

/**
* Action to communicate with the action GetSchedulesAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetSchedulesAction
func GetSchedulesAction(c GetSchedulesActionRequest) (*GetSchedulesActionResponse, error) {
	return &GetSchedulesActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetSchedulesActionMeta() struct {
	Name        string
	CliName     string
	URL         string
	Method      string
	Description string
} {
	return struct {
		Name        string
		CliName     string
		URL         string
		Method      string
		Description string
	}{
		Name:        "GetSchedulesAction",
		CliName:     "get-schedules-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/schedules",
		Method:      "",
		Description: `Returns planned train schedules and routes.`,
	}
}

// The base class definition for getSchedulesActionRes
type GetSchedulesActionRes struct {
	GeneratedAt string                                   `json:"generatedAt" yaml:"generatedAt"`
	Period      GetSchedulesActionResPeriod              `json:"period" yaml:"period"`
	Routes      emigo.Array[GetSchedulesActionResRoutes] `json:"routes" yaml:"routes"`
}

// The base class definition for period
type GetSchedulesActionResPeriod struct {
	From string `json:"from" yaml:"from"`
	To   string `json:"to" yaml:"to"`
}

// The base class definition for routes
type GetSchedulesActionResRoutes struct {
	ScheduleId               int                                              `json:"scheduleId" yaml:"scheduleId"`
	OrderId                  int                                              `json:"orderId" yaml:"orderId"`
	TrainOrderId             int                                              `json:"trainOrderId" yaml:"trainOrderId"`
	CarrierCode              string                                           `json:"carrierCode" yaml:"carrierCode"`
	NationalNumber           string                                           `json:"nationalNumber" yaml:"nationalNumber"`
	CommercialCategorySymbol string                                           `json:"commercialCategorySymbol" yaml:"commercialCategorySymbol"`
	OperatingDates           []string                                         `json:"operatingDates" yaml:"operatingDates"`
	Stations                 emigo.Array[GetSchedulesActionResRoutesStations] `json:"stations" yaml:"stations"`
}

// The base class definition for stations
type GetSchedulesActionResRoutesStations struct {
	StationId                   int    `json:"stationId" yaml:"stationId"`
	OrderNumber                 int    `json:"orderNumber" yaml:"orderNumber"`
	ArrivalCommercialCategory   string `json:"arrivalCommercialCategory" yaml:"arrivalCommercialCategory"`
	ArrivalPlatform             string `json:"arrivalPlatform" yaml:"arrivalPlatform"`
	DepartureCommercialCategory string `json:"departureCommercialCategory" yaml:"departureCommercialCategory"`
	DepartureTrainNumber        string `json:"departureTrainNumber" yaml:"departureTrainNumber"`
	DeparturePlatform           string `json:"departurePlatform" yaml:"departurePlatform"`
	DepartureTime               string `json:"departureTime" yaml:"departureTime"`
}

func (x *GetSchedulesActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetSchedulesActionResCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "generated-at",
			Type: "string",
		},
		{
			Name:     prefix + "period",
			Type:     "object",
			Children: GetGetSchedulesActionResPeriodCliFlags("period-"),
		},
		{
			Name: prefix + "routes",
			Type: "array",
		},
	}
}
func CastGetSchedulesActionResFromCli(c emigo.CliCastable) GetSchedulesActionRes {
	data := GetSchedulesActionRes{}
	if c.IsSet("generated-at") {
		data.GeneratedAt = c.String("generated-at")
	}
	if c.IsSet("period") {
		data.Period = CastGetSchedulesActionResPeriodFromCli(c)
	}
	if c.IsSet("routes") {
		data.Routes = emigo.CapturePossibleArray(CastGetSchedulesActionResRoutesFromCli, "routes", c)
	}
	return data
}
func GetGetSchedulesActionResPeriodCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "from",
			Type: "string",
		},
		{
			Name: prefix + "to",
			Type: "string",
		},
	}
}
func CastGetSchedulesActionResPeriodFromCli(c emigo.CliCastable) GetSchedulesActionResPeriod {
	data := GetSchedulesActionResPeriod{}
	if c.IsSet("from") {
		data.From = c.String("from")
	}
	if c.IsSet("to") {
		data.To = c.String("to")
	}
	return data
}
func GetGetSchedulesActionResRoutesCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "schedule-id",
			Type: "int",
		},
		{
			Name: prefix + "order-id",
			Type: "int",
		},
		{
			Name: prefix + "train-order-id",
			Type: "int",
		},
		{
			Name: prefix + "carrier-code",
			Type: "string",
		},
		{
			Name: prefix + "national-number",
			Type: "string",
		},
		{
			Name: prefix + "commercial-category-symbol",
			Type: "string",
		},
		{
			Name: prefix + "operating-dates",
			Type: "slice",
		},
		{
			Name: prefix + "stations",
			Type: "array",
		},
	}
}
func CastGetSchedulesActionResRoutesFromCli(c emigo.CliCastable) GetSchedulesActionResRoutes {
	data := GetSchedulesActionResRoutes{}
	if c.IsSet("schedule-id") {
		data.ScheduleId = int(c.Int64("schedule-id"))
	}
	if c.IsSet("order-id") {
		data.OrderId = int(c.Int64("order-id"))
	}
	if c.IsSet("train-order-id") {
		data.TrainOrderId = int(c.Int64("train-order-id"))
	}
	if c.IsSet("carrier-code") {
		data.CarrierCode = c.String("carrier-code")
	}
	if c.IsSet("national-number") {
		data.NationalNumber = c.String("national-number")
	}
	if c.IsSet("commercial-category-symbol") {
		data.CommercialCategorySymbol = c.String("commercial-category-symbol")
	}
	if c.IsSet("operating-dates") {
		emigo.InflatePossibleSlice(c.String("operating-dates"), &data.OperatingDates)
	}
	if c.IsSet("stations") {
		data.Stations = emigo.CapturePossibleArray(CastGetSchedulesActionResRoutesStationsFromCli, "stations", c)
	}
	return data
}
func GetGetSchedulesActionResRoutesStationsCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "station-id",
			Type: "int",
		},
		{
			Name: prefix + "order-number",
			Type: "int",
		},
		{
			Name: prefix + "arrival-commercial-category",
			Type: "string",
		},
		{
			Name: prefix + "arrival-platform",
			Type: "string",
		},
		{
			Name: prefix + "departure-commercial-category",
			Type: "string",
		},
		{
			Name: prefix + "departure-train-number",
			Type: "string",
		},
		{
			Name: prefix + "departure-platform",
			Type: "string",
		},
		{
			Name: prefix + "departure-time",
			Type: "string",
		},
	}
}
func CastGetSchedulesActionResRoutesStationsFromCli(c emigo.CliCastable) GetSchedulesActionResRoutesStations {
	data := GetSchedulesActionResRoutesStations{}
	if c.IsSet("station-id") {
		data.StationId = int(c.Int64("station-id"))
	}
	if c.IsSet("order-number") {
		data.OrderNumber = int(c.Int64("order-number"))
	}
	if c.IsSet("arrival-commercial-category") {
		data.ArrivalCommercialCategory = c.String("arrival-commercial-category")
	}
	if c.IsSet("arrival-platform") {
		data.ArrivalPlatform = c.String("arrival-platform")
	}
	if c.IsSet("departure-commercial-category") {
		data.DepartureCommercialCategory = c.String("departure-commercial-category")
	}
	if c.IsSet("departure-train-number") {
		data.DepartureTrainNumber = c.String("departure-train-number")
	}
	if c.IsSet("departure-platform") {
		data.DeparturePlatform = c.String("departure-platform")
	}
	if c.IsSet("departure-time") {
		data.DepartureTime = c.String("departure-time")
	}
	return data
}

type GetSchedulesActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetSchedulesActionResponse) SetContentType(contentType string) *GetSchedulesActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetSchedulesActionResponse) AsStream(r io.Reader, contentType string) *GetSchedulesActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetSchedulesActionResponse) AsJSON(payload any) *GetSchedulesActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetSchedulesActionResponse) WithIdeal(payload GetSchedulesActionRes) *GetSchedulesActionResponse {
	x.Payload = payload
	return x
}
func (x *GetSchedulesActionResponse) AsHTML(payload string) *GetSchedulesActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetSchedulesActionResponse) AsBytes(payload []byte) *GetSchedulesActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetSchedulesActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetSchedulesActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetSchedulesActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetSchedulesActionRequestSig = func(c GetSchedulesActionRequest) (*GetSchedulesActionResponse, error)

/**
 * Query parameters for GetSchedulesAction
 */
// Query wrapper with private fields
type GetSchedulesActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
	DateFrom        string `json:"dateFrom"`
	DateTo          string `json:"dateTo"`
	Stations        string `json:"stations"`
	CarriersInclude string `json:"carriersInclude"`
	CarriersExclude string `json:"carriersExclude"`
}

func GetSchedulesActionQueryFromString(rawQuery string) GetSchedulesActionQuery {
	v := GetSchedulesActionQuery{}
	values, _ := url.ParseQuery(rawQuery)
	mapped := map[string]interface{}{}
	if result, err := emigo.UnmarshalQs(rawQuery); err == nil {
		mapped = result
	}
	decoder, err := emigo.NewDecoder(&emigo.DecoderConfig{
		TagName:          "json", // reuse json tags
		WeaklyTypedInput: true,   // "1" -> int, "true" -> bool
		Result:           &v,
	})
	if err == nil {
		_ = decoder.Decode(mapped)
	}
	v.values = values
	v.mapped = mapped
	return v
}
func GetSchedulesActionQueryFromHttp(r *http.Request) GetSchedulesActionQuery {
	return GetSchedulesActionQueryFromString(r.URL.RawQuery)
}
func (q GetSchedulesActionQuery) Values() url.Values {
	return q.values
}
func (q GetSchedulesActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetSchedulesActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetSchedulesActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetSchedulesActionRequest struct {
	Body        interface{}
	QueryParams url.Values
	// Automatically casted headers, for purpose of typesafe headers in later versions
	Headers http.Header
	// Cli library helper (urfave) by default. The instance is interface{}, and you
	// need to manually cast it to the *cli.Command, so gives you freedom and independence
	// of external library.
	// Ideally, you should not be needing this, and emi has to provide necessary helper
	// functions to read and write a request.
	CliCtx interface{}
	// Reference to the application instance, in such scenarios that entire
	// application is wrapped into a single struct that holds database connection,
	// routes, etc.
	Application interface{}
}

func GetSchedulesActionClientCreateUrl(
	req GetSchedulesActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetSchedulesActionMeta()
	urlAddr := meta.URL
	urlAddr = config.BaseURL + urlAddr
	// Build final URL with query string
	u, err := url.Parse(urlAddr)
	if err != nil {
		return nil, err
	}
	// if UrlValues present, encode and append
	if len(req.QueryParams) > 0 {
		u.RawQuery = req.QueryParams.Encode()
	}
	return u, nil
}
func GetSchedulesActionClientExecuteTyped(httpReq *http.Request) (*GetSchedulesActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetSchedulesActionResponse
	result.resp = resp
	defer resp.Body.Close()
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return &result, err
	}
	if err := json.Unmarshal(respBody, &result.Payload); err != nil {
		return &result, err
	}
	return &result, nil
}
func GetSchedulesActionClientBuildRequest(req GetSchedulesActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetSchedulesActionMeta()
	httpReq, err := http.NewRequest(meta.Method, reqUrl.String(), nil)
	if err != nil {
		return nil, err
	}
	httpReq.Header = make(http.Header)
	// copy defaults
	for k, v := range config.Headers {
		for _, vv := range v {
			httpReq.Header.Add(k, vv)
		}
	}
	// override with request-specific headers
	for k, v := range req.Headers {
		httpReq.Header.Del(k) // ensure override, not duplicate
		for _, vv := range v {
			httpReq.Header.Add(k, vv)
		}
	}
	return httpReq, nil
}
func GetSchedulesActionCall(
	req GetSchedulesActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetSchedulesActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetSchedulesActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetSchedulesActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetSchedulesActionClientExecuteTyped(r)
}
func (x GetSchedulesActionRequest) IsCli() bool {
	if x.CliCtx == nil {
		return false
	}
	v := reflect.ValueOf(x.CliCtx)
	switch v.Kind() {
	case reflect.Ptr, reflect.Map, reflect.Slice, reflect.Interface, reflect.Func, reflect.Chan:
		return !v.IsNil()
	}
	return true
}
