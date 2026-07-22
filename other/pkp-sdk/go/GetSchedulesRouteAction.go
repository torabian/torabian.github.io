package external

import (
	"encoding/json"
	"fmt"
	"github.com/torabian/emi/emigo"
	"github.com/urfave/cli/v3"
	"io"
	"net/http"
	"net/url"
	"reflect"
	"strings"
)

/**
* Action to communicate with the action GetSchedulesRouteAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetSchedulesRouteAction
func GetSchedulesRouteAction(c GetSchedulesRouteActionRequest) (*GetSchedulesRouteActionResponse, error) {
	return &GetSchedulesRouteActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetSchedulesRouteActionMeta() struct {
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
		Name:        "GetSchedulesRouteAction",
		CliName:     "get-schedules-route-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/schedules/route/:scheduleId/:orderId",
		Method:      "",
		Description: ``,
	}
}

// The base class definition for getSchedulesRouteActionRes
type GetSchedulesRouteActionRes struct {
	ScheduleId               int                                             `json:"scheduleId" yaml:"scheduleId"`
	OrderId                  int                                             `json:"orderId" yaml:"orderId"`
	TrainOrderId             int                                             `json:"trainOrderId" yaml:"trainOrderId"`
	CarrierCode              string                                          `json:"carrierCode" yaml:"carrierCode"`
	NationalNumber           string                                          `json:"nationalNumber" yaml:"nationalNumber"`
	CommercialCategorySymbol string                                          `json:"commercialCategorySymbol" yaml:"commercialCategorySymbol"`
	OperatingDates           []string                                        `json:"operatingDates" yaml:"operatingDates"`
	Stations                 emigo.Array[GetSchedulesRouteActionResStations] `json:"stations" yaml:"stations"`
}

// The base class definition for stations
type GetSchedulesRouteActionResStations struct {
	StationId                   int    `json:"stationId" yaml:"stationId"`
	OrderNumber                 int    `json:"orderNumber" yaml:"orderNumber"`
	ArrivalCommercialCategory   string `json:"arrivalCommercialCategory" yaml:"arrivalCommercialCategory"`
	ArrivalTrainNumber          string `json:"arrivalTrainNumber" yaml:"arrivalTrainNumber"`
	ArrivalPlatform             string `json:"arrivalPlatform" yaml:"arrivalPlatform"`
	ArrivalTime                 string `json:"arrivalTime" yaml:"arrivalTime"`
	DepartureCommercialCategory string `json:"departureCommercialCategory" yaml:"departureCommercialCategory"`
	DepartureTrainNumber        string `json:"departureTrainNumber" yaml:"departureTrainNumber"`
	DeparturePlatform           string `json:"departurePlatform" yaml:"departurePlatform"`
	DepartureTime               string `json:"departureTime" yaml:"departureTime"`
}

func (x *GetSchedulesRouteActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetSchedulesRouteActionResCliFlags(prefix string) []emigo.CliFlag {
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
func CastGetSchedulesRouteActionResFromCli(c emigo.CliCastable) GetSchedulesRouteActionRes {
	data := GetSchedulesRouteActionRes{}
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
		data.Stations = emigo.CapturePossibleArray(CastGetSchedulesRouteActionResStationsFromCli, "stations", c)
	}
	return data
}
func GetGetSchedulesRouteActionResStationsCliFlags(prefix string) []emigo.CliFlag {
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
			Name: prefix + "arrival-train-number",
			Type: "string",
		},
		{
			Name: prefix + "arrival-platform",
			Type: "string",
		},
		{
			Name: prefix + "arrival-time",
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
func CastGetSchedulesRouteActionResStationsFromCli(c emigo.CliCastable) GetSchedulesRouteActionResStations {
	data := GetSchedulesRouteActionResStations{}
	if c.IsSet("station-id") {
		data.StationId = int(c.Int64("station-id"))
	}
	if c.IsSet("order-number") {
		data.OrderNumber = int(c.Int64("order-number"))
	}
	if c.IsSet("arrival-commercial-category") {
		data.ArrivalCommercialCategory = c.String("arrival-commercial-category")
	}
	if c.IsSet("arrival-train-number") {
		data.ArrivalTrainNumber = c.String("arrival-train-number")
	}
	if c.IsSet("arrival-platform") {
		data.ArrivalPlatform = c.String("arrival-platform")
	}
	if c.IsSet("arrival-time") {
		data.ArrivalTime = c.String("arrival-time")
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

type GetSchedulesRouteActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetSchedulesRouteActionResponse) SetContentType(contentType string) *GetSchedulesRouteActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetSchedulesRouteActionResponse) AsStream(r io.Reader, contentType string) *GetSchedulesRouteActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetSchedulesRouteActionResponse) AsJSON(payload any) *GetSchedulesRouteActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetSchedulesRouteActionResponse) WithIdeal(payload GetSchedulesRouteActionRes) *GetSchedulesRouteActionResponse {
	x.Payload = payload
	return x
}

// Use this for client calls, so the payload is being casted
func (x *GetSchedulesRouteActionResponse) AsIdeal() (*GetSchedulesRouteActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}
	var res GetSchedulesRouteActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}
	return &res, nil
}
func (x *GetSchedulesRouteActionResponse) AsHTML(payload string) *GetSchedulesRouteActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetSchedulesRouteActionResponse) AsBytes(payload []byte) *GetSchedulesRouteActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetSchedulesRouteActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetSchedulesRouteActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetSchedulesRouteActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetSchedulesRouteActionRequestSig = func(c GetSchedulesRouteActionRequest) (*GetSchedulesRouteActionResponse, error)

/**
 * Path parameters for GetSchedulesRouteAction
 */
type GetSchedulesRouteActionPathParameter struct {
	ScheduleId string
	OrderId    string
}

// Converts a placeholder url, and applies the parameters to it.
func GetSchedulesRouteActionPathParameterApply(params GetSchedulesRouteActionPathParameter, templateUrl string) string {
	templateUrl = strings.ReplaceAll(templateUrl, ":scheduleId", fmt.Sprintf("%v", params.ScheduleId))
	templateUrl = strings.ReplaceAll(templateUrl, ":orderId", fmt.Sprintf("%v", params.OrderId))
	return templateUrl
}

// General purpose to extract the value and cast based on type.
func GetSchedulesRouteActionPathParameterFromFn(fn func(key string) string) GetSchedulesRouteActionPathParameter {
	res := GetSchedulesRouteActionPathParameter{}
	res.ScheduleId = fn("scheduleId")
	res.OrderId = fn("orderId")
	return res
}

/**
 * Query parameters for GetSchedulesRouteAction
 */
// Query wrapper with private fields
type GetSchedulesRouteActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
}

func GetSchedulesRouteActionQueryFromString(rawQuery string) GetSchedulesRouteActionQuery {
	v := GetSchedulesRouteActionQuery{}
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
func GetSchedulesRouteActionQueryFromHttp(r *http.Request) GetSchedulesRouteActionQuery {
	return GetSchedulesRouteActionQueryFromString(r.URL.RawQuery)
}
func (q GetSchedulesRouteActionQuery) Values() url.Values {
	return q.values
}
func (q GetSchedulesRouteActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetSchedulesRouteActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetSchedulesRouteActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetSchedulesRouteActionRequest struct {
	Body        interface{}
	Params      GetSchedulesRouteActionPathParameter
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

func GetSchedulesRouteActionClientCreateUrl(
	req GetSchedulesRouteActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetSchedulesRouteActionMeta()
	urlAddr := meta.URL
	urlAddr = config.BaseURL + urlAddr
	// In case there is a path parameter, we need to apply that.
	urlAddr = GetSchedulesRouteActionPathParameterApply(req.Params, urlAddr)
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
func GetSchedulesRouteActionClientExecuteTyped(httpReq *http.Request) (*GetSchedulesRouteActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetSchedulesRouteActionResponse
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
func GetSchedulesRouteActionClientBuildRequest(req GetSchedulesRouteActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetSchedulesRouteActionMeta()
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
func GetSchedulesRouteActionCall(
	req GetSchedulesRouteActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetSchedulesRouteActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetSchedulesRouteActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetSchedulesRouteActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetSchedulesRouteActionClientExecuteTyped(r)
}
func GetGetSchedulesRouteActionPathParameterCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name:     prefix + "pp-scheduleId",
			Type:     "string",
			Required: true,
		},
		{
			Name:     prefix + "pp-orderId",
			Type:     "string",
			Required: true,
		},
	}
}

// Extracts the path parameter from a urfave v3 cli.
func GetSchedulesRouteActionPathParameterFromCli(c *cli.Command) GetSchedulesRouteActionPathParameter {
	return GetSchedulesRouteActionPathParameterFromFn(func(key string) string {
		// In cli, they are prefixed with pp, to avoid conflict with other params coming from 'in'
		// section of the definition.
		return c.String("pp-" + key)
	})
}
func (x GetSchedulesRouteActionRequest) IsCli() bool {
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
