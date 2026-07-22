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
* Action to communicate with the action GetOperationsAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetOperationsAction
func GetOperationsAction(c GetOperationsActionRequest) (*GetOperationsActionResponse, error) {
	return &GetOperationsActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetOperationsActionMeta() struct {
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
		Name:        "GetOperationsAction",
		CliName:     "get-operations-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/operations",
		Method:      "",
		Description: ``,
	}
}

// The base class definition for getOperationsActionRes
type GetOperationsActionRes struct {
	GeneratedAt string                                    `json:"generatedAt" yaml:"generatedAt"`
	Pagination  GetOperationsActionResPagination          `json:"pagination" yaml:"pagination"`
	Stations    map[string]string                         `json:"stations" yaml:"stations"`
	Trains      emigo.Array[GetOperationsActionResTrains] `json:"trains" yaml:"trains"`
}

// The base class definition for pagination
type GetOperationsActionResPagination struct {
	Page        int  `json:"page" yaml:"page"`
	PageSize    int  `json:"pageSize" yaml:"pageSize"`
	TotalCount  int  `json:"totalCount" yaml:"totalCount"`
	TotalPages  int  `json:"totalPages" yaml:"totalPages"`
	HasNextPage bool `json:"hasNextPage" yaml:"hasNextPage"`
}

// The base class definition for trains
type GetOperationsActionResTrains struct {
	ScheduleId    int                                               `json:"scheduleId" yaml:"scheduleId"`
	OrderId       int                                               `json:"orderId" yaml:"orderId"`
	TrainOrderId  int                                               `json:"trainOrderId" yaml:"trainOrderId"`
	OperatingDate string                                            `json:"operatingDate" yaml:"operatingDate"`
	TrainStatus   string                                            `json:"trainStatus" yaml:"trainStatus"`
	Stations      emigo.Array[GetOperationsActionResTrainsStations] `json:"stations" yaml:"stations"`
}

// The base class definition for stations
type GetOperationsActionResTrainsStations struct {
	StationId             int    `json:"stationId" yaml:"stationId"`
	PlannedSequenceNumber int    `json:"plannedSequenceNumber" yaml:"plannedSequenceNumber"`
	ActualSequenceNumber  int    `json:"actualSequenceNumber" yaml:"actualSequenceNumber"`
	ActualArrival         string `json:"actualArrival" yaml:"actualArrival"`
	ActualDeparture       string `json:"actualDeparture" yaml:"actualDeparture"`
}

func (x *GetOperationsActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetOperationsActionResCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "generated-at",
			Type: "string",
		},
		{
			Name:     prefix + "pagination",
			Type:     "object",
			Children: GetGetOperationsActionResPaginationCliFlags("pagination-"),
		},
		{
			Name: prefix + "stations",
			Type: "map",
		},
		{
			Name: prefix + "trains",
			Type: "array",
		},
	}
}
func CastGetOperationsActionResFromCli(c emigo.CliCastable) GetOperationsActionRes {
	data := GetOperationsActionRes{}
	if c.IsSet("generated-at") {
		data.GeneratedAt = c.String("generated-at")
	}
	if c.IsSet("pagination") {
		data.Pagination = CastGetOperationsActionResPaginationFromCli(c)
	}
	if c.IsSet("trains") {
		data.Trains = emigo.CapturePossibleArray(CastGetOperationsActionResTrainsFromCli, "trains", c)
	}
	return data
}
func GetGetOperationsActionResPaginationCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "page",
			Type: "int",
		},
		{
			Name: prefix + "page-size",
			Type: "int",
		},
		{
			Name: prefix + "total-count",
			Type: "int",
		},
		{
			Name: prefix + "total-pages",
			Type: "int",
		},
		{
			Name: prefix + "has-next-page",
			Type: "bool",
		},
	}
}
func CastGetOperationsActionResPaginationFromCli(c emigo.CliCastable) GetOperationsActionResPagination {
	data := GetOperationsActionResPagination{}
	if c.IsSet("page") {
		data.Page = int(c.Int64("page"))
	}
	if c.IsSet("page-size") {
		data.PageSize = int(c.Int64("page-size"))
	}
	if c.IsSet("total-count") {
		data.TotalCount = int(c.Int64("total-count"))
	}
	if c.IsSet("total-pages") {
		data.TotalPages = int(c.Int64("total-pages"))
	}
	if c.IsSet("has-next-page") {
		data.HasNextPage = bool(c.Bool("has-next-page"))
	}
	return data
}
func GetGetOperationsActionResTrainsCliFlags(prefix string) []emigo.CliFlag {
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
			Name: prefix + "operating-date",
			Type: "string",
		},
		{
			Name: prefix + "train-status",
			Type: "string",
		},
		{
			Name: prefix + "stations",
			Type: "array",
		},
	}
}
func CastGetOperationsActionResTrainsFromCli(c emigo.CliCastable) GetOperationsActionResTrains {
	data := GetOperationsActionResTrains{}
	if c.IsSet("schedule-id") {
		data.ScheduleId = int(c.Int64("schedule-id"))
	}
	if c.IsSet("order-id") {
		data.OrderId = int(c.Int64("order-id"))
	}
	if c.IsSet("train-order-id") {
		data.TrainOrderId = int(c.Int64("train-order-id"))
	}
	if c.IsSet("operating-date") {
		data.OperatingDate = c.String("operating-date")
	}
	if c.IsSet("train-status") {
		data.TrainStatus = c.String("train-status")
	}
	if c.IsSet("stations") {
		data.Stations = emigo.CapturePossibleArray(CastGetOperationsActionResTrainsStationsFromCli, "stations", c)
	}
	return data
}
func GetGetOperationsActionResTrainsStationsCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "station-id",
			Type: "int",
		},
		{
			Name: prefix + "planned-sequence-number",
			Type: "int",
		},
		{
			Name: prefix + "actual-sequence-number",
			Type: "int",
		},
		{
			Name: prefix + "actual-arrival",
			Type: "string",
		},
		{
			Name: prefix + "actual-departure",
			Type: "string",
		},
	}
}
func CastGetOperationsActionResTrainsStationsFromCli(c emigo.CliCastable) GetOperationsActionResTrainsStations {
	data := GetOperationsActionResTrainsStations{}
	if c.IsSet("station-id") {
		data.StationId = int(c.Int64("station-id"))
	}
	if c.IsSet("planned-sequence-number") {
		data.PlannedSequenceNumber = int(c.Int64("planned-sequence-number"))
	}
	if c.IsSet("actual-sequence-number") {
		data.ActualSequenceNumber = int(c.Int64("actual-sequence-number"))
	}
	if c.IsSet("actual-arrival") {
		data.ActualArrival = c.String("actual-arrival")
	}
	if c.IsSet("actual-departure") {
		data.ActualDeparture = c.String("actual-departure")
	}
	return data
}

type GetOperationsActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetOperationsActionResponse) SetContentType(contentType string) *GetOperationsActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetOperationsActionResponse) AsStream(r io.Reader, contentType string) *GetOperationsActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetOperationsActionResponse) AsJSON(payload any) *GetOperationsActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetOperationsActionResponse) WithIdeal(payload GetOperationsActionRes) *GetOperationsActionResponse {
	x.Payload = payload
	return x
}

// Use this for client calls, so the payload is being casted
func (x *GetOperationsActionResponse) AsIdeal() (*GetOperationsActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}
	var res GetOperationsActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}
	return &res, nil
}
func (x *GetOperationsActionResponse) AsHTML(payload string) *GetOperationsActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetOperationsActionResponse) AsBytes(payload []byte) *GetOperationsActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetOperationsActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetOperationsActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetOperationsActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetOperationsActionRequestSig = func(c GetOperationsActionRequest) (*GetOperationsActionResponse, error)

/**
 * Query parameters for GetOperationsAction
 */
// Query wrapper with private fields
type GetOperationsActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
	Stations        string `json:"stations"`
	CarriersInclude string `json:"carriersInclude"`
	CarriersExclude string `json:"carriersExclude"`
	FullRoutes      bool   `json:"fullRoutes"`
	WithPlanned     bool   `json:"withPlanned"`
	Page            int    `json:"page"`
	PageSize        int    `json:"pageSize"`
}

func GetOperationsActionQueryFromString(rawQuery string) GetOperationsActionQuery {
	v := GetOperationsActionQuery{}
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
func GetOperationsActionQueryFromHttp(r *http.Request) GetOperationsActionQuery {
	return GetOperationsActionQueryFromString(r.URL.RawQuery)
}
func (q GetOperationsActionQuery) Values() url.Values {
	return q.values
}
func (q GetOperationsActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetOperationsActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetOperationsActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetOperationsActionRequest struct {
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

func GetOperationsActionClientCreateUrl(
	req GetOperationsActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetOperationsActionMeta()
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
func GetOperationsActionClientExecuteTyped(httpReq *http.Request) (*GetOperationsActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetOperationsActionResponse
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
func GetOperationsActionClientBuildRequest(req GetOperationsActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetOperationsActionMeta()
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
func GetOperationsActionCall(
	req GetOperationsActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetOperationsActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetOperationsActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetOperationsActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetOperationsActionClientExecuteTyped(r)
}
func (x GetOperationsActionRequest) IsCli() bool {
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
