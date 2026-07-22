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
* Action to communicate with the action GetTrainOperationAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetTrainOperationAction
func GetTrainOperationAction(c GetTrainOperationActionRequest) (*GetTrainOperationActionResponse, error) {
	return &GetTrainOperationActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetTrainOperationActionMeta() struct {
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
		Name:        "GetTrainOperationAction",
		CliName:     "get-train-operation-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/operations/train/:scheduleId/:orderId/:operatingDate",
		Method:      "",
		Description: ``,
	}
}

// The base class definition for getTrainOperationActionRes
type GetTrainOperationActionRes struct {
	ScheduleId    int                                             `json:"scheduleId" yaml:"scheduleId"`
	OrderId       int                                             `json:"orderId" yaml:"orderId"`
	TrainOrderId  int                                             `json:"trainOrderId" yaml:"trainOrderId"`
	OperatingDate string                                          `json:"operatingDate" yaml:"operatingDate"`
	TrainStatus   string                                          `json:"trainStatus" yaml:"trainStatus"`
	Stations      emigo.Array[GetTrainOperationActionResStations] `json:"stations" yaml:"stations"`
}

// The base class definition for stations
type GetTrainOperationActionResStations struct {
	StationId             int    `json:"stationId" yaml:"stationId"`
	PlannedSequenceNumber int    `json:"plannedSequenceNumber" yaml:"plannedSequenceNumber"`
	ActualSequenceNumber  int    `json:"actualSequenceNumber" yaml:"actualSequenceNumber"`
	ActualArrival         string `json:"actualArrival" yaml:"actualArrival"`
	ActualDeparture       string `json:"actualDeparture" yaml:"actualDeparture"`
}

func (x *GetTrainOperationActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetTrainOperationActionResCliFlags(prefix string) []emigo.CliFlag {
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
func CastGetTrainOperationActionResFromCli(c emigo.CliCastable) GetTrainOperationActionRes {
	data := GetTrainOperationActionRes{}
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
		data.Stations = emigo.CapturePossibleArray(CastGetTrainOperationActionResStationsFromCli, "stations", c)
	}
	return data
}
func GetGetTrainOperationActionResStationsCliFlags(prefix string) []emigo.CliFlag {
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
func CastGetTrainOperationActionResStationsFromCli(c emigo.CliCastable) GetTrainOperationActionResStations {
	data := GetTrainOperationActionResStations{}
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

type GetTrainOperationActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetTrainOperationActionResponse) SetContentType(contentType string) *GetTrainOperationActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetTrainOperationActionResponse) AsStream(r io.Reader, contentType string) *GetTrainOperationActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetTrainOperationActionResponse) AsJSON(payload any) *GetTrainOperationActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetTrainOperationActionResponse) WithIdeal(payload GetTrainOperationActionRes) *GetTrainOperationActionResponse {
	x.Payload = payload
	return x
}

// Use this for client calls, so the payload is being casted
func (x *GetTrainOperationActionResponse) AsIdeal() (*GetTrainOperationActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}
	var res GetTrainOperationActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}
	return &res, nil
}
func (x *GetTrainOperationActionResponse) AsHTML(payload string) *GetTrainOperationActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetTrainOperationActionResponse) AsBytes(payload []byte) *GetTrainOperationActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetTrainOperationActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetTrainOperationActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetTrainOperationActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetTrainOperationActionRequestSig = func(c GetTrainOperationActionRequest) (*GetTrainOperationActionResponse, error)

/**
 * Path parameters for GetTrainOperationAction
 */
type GetTrainOperationActionPathParameter struct {
	ScheduleId    string
	OrderId       string
	OperatingDate string
}

// Converts a placeholder url, and applies the parameters to it.
func GetTrainOperationActionPathParameterApply(params GetTrainOperationActionPathParameter, templateUrl string) string {
	templateUrl = strings.ReplaceAll(templateUrl, ":scheduleId", fmt.Sprintf("%v", params.ScheduleId))
	templateUrl = strings.ReplaceAll(templateUrl, ":orderId", fmt.Sprintf("%v", params.OrderId))
	templateUrl = strings.ReplaceAll(templateUrl, ":operatingDate", fmt.Sprintf("%v", params.OperatingDate))
	return templateUrl
}

// General purpose to extract the value and cast based on type.
func GetTrainOperationActionPathParameterFromFn(fn func(key string) string) GetTrainOperationActionPathParameter {
	res := GetTrainOperationActionPathParameter{}
	res.ScheduleId = fn("scheduleId")
	res.OrderId = fn("orderId")
	res.OperatingDate = fn("operatingDate")
	return res
}

/**
 * Query parameters for GetTrainOperationAction
 */
// Query wrapper with private fields
type GetTrainOperationActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
}

func GetTrainOperationActionQueryFromString(rawQuery string) GetTrainOperationActionQuery {
	v := GetTrainOperationActionQuery{}
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
func GetTrainOperationActionQueryFromHttp(r *http.Request) GetTrainOperationActionQuery {
	return GetTrainOperationActionQueryFromString(r.URL.RawQuery)
}
func (q GetTrainOperationActionQuery) Values() url.Values {
	return q.values
}
func (q GetTrainOperationActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetTrainOperationActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetTrainOperationActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetTrainOperationActionRequest struct {
	Body        interface{}
	Params      GetTrainOperationActionPathParameter
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

func GetTrainOperationActionClientCreateUrl(
	req GetTrainOperationActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetTrainOperationActionMeta()
	urlAddr := meta.URL
	urlAddr = config.BaseURL + urlAddr
	// In case there is a path parameter, we need to apply that.
	urlAddr = GetTrainOperationActionPathParameterApply(req.Params, urlAddr)
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
func GetTrainOperationActionClientExecuteTyped(httpReq *http.Request) (*GetTrainOperationActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetTrainOperationActionResponse
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
func GetTrainOperationActionClientBuildRequest(req GetTrainOperationActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetTrainOperationActionMeta()
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
func GetTrainOperationActionCall(
	req GetTrainOperationActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetTrainOperationActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetTrainOperationActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetTrainOperationActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetTrainOperationActionClientExecuteTyped(r)
}
func GetGetTrainOperationActionPathParameterCliFlags(prefix string) []emigo.CliFlag {
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
		{
			Name:     prefix + "pp-operatingDate",
			Type:     "string",
			Required: true,
		},
	}
}

// Extracts the path parameter from a urfave v3 cli.
func GetTrainOperationActionPathParameterFromCli(c *cli.Command) GetTrainOperationActionPathParameter {
	return GetTrainOperationActionPathParameterFromFn(func(key string) string {
		// In cli, they are prefixed with pp, to avoid conflict with other params coming from 'in'
		// section of the definition.
		return c.String("pp-" + key)
	})
}
func (x GetTrainOperationActionRequest) IsCli() bool {
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
