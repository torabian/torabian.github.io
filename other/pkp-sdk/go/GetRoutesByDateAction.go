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
* Action to communicate with the action GetRoutesByDateAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetRoutesByDateAction
func GetRoutesByDateAction(c GetRoutesByDateActionRequest) (*GetRoutesByDateActionResponse, error) {
	return &GetRoutesByDateActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetRoutesByDateActionMeta() struct {
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
		Name:        "GetRoutesByDateAction",
		CliName:     "get-routes-by-date-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/schedules/routes/:date",
		Method:      "",
		Description: ``,
	}
}

// The base class definition for getRoutesByDateActionRes
type GetRoutesByDateActionRes struct {
	GeneratedAt string                                      `json:"generatedAt" yaml:"generatedAt"`
	Date        string                                      `json:"date" yaml:"date"`
	Count       int                                         `json:"count" yaml:"count"`
	Routes      emigo.Array[GetRoutesByDateActionResRoutes] `json:"routes" yaml:"routes"`
}

// The base class definition for routes
type GetRoutesByDateActionResRoutes struct {
	ScheduleId   int    `json:"scheduleId" yaml:"scheduleId"`
	OrderId      int    `json:"orderId" yaml:"orderId"`
	TrainOrderId int    `json:"trainOrderId" yaml:"trainOrderId"`
	Name         string `json:"name" yaml:"name"`
	CarrierCode  string `json:"carrierCode" yaml:"carrierCode"`
}

func (x *GetRoutesByDateActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetRoutesByDateActionResCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "generated-at",
			Type: "string",
		},
		{
			Name: prefix + "date",
			Type: "string",
		},
		{
			Name: prefix + "count",
			Type: "int",
		},
		{
			Name: prefix + "routes",
			Type: "array",
		},
	}
}
func CastGetRoutesByDateActionResFromCli(c emigo.CliCastable) GetRoutesByDateActionRes {
	data := GetRoutesByDateActionRes{}
	if c.IsSet("generated-at") {
		data.GeneratedAt = c.String("generated-at")
	}
	if c.IsSet("date") {
		data.Date = c.String("date")
	}
	if c.IsSet("count") {
		data.Count = int(c.Int64("count"))
	}
	if c.IsSet("routes") {
		data.Routes = emigo.CapturePossibleArray(CastGetRoutesByDateActionResRoutesFromCli, "routes", c)
	}
	return data
}
func GetGetRoutesByDateActionResRoutesCliFlags(prefix string) []emigo.CliFlag {
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
			Name: prefix + "name",
			Type: "string",
		},
		{
			Name: prefix + "carrier-code",
			Type: "string",
		},
	}
}
func CastGetRoutesByDateActionResRoutesFromCli(c emigo.CliCastable) GetRoutesByDateActionResRoutes {
	data := GetRoutesByDateActionResRoutes{}
	if c.IsSet("schedule-id") {
		data.ScheduleId = int(c.Int64("schedule-id"))
	}
	if c.IsSet("order-id") {
		data.OrderId = int(c.Int64("order-id"))
	}
	if c.IsSet("train-order-id") {
		data.TrainOrderId = int(c.Int64("train-order-id"))
	}
	if c.IsSet("name") {
		data.Name = c.String("name")
	}
	if c.IsSet("carrier-code") {
		data.CarrierCode = c.String("carrier-code")
	}
	return data
}

type GetRoutesByDateActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetRoutesByDateActionResponse) SetContentType(contentType string) *GetRoutesByDateActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetRoutesByDateActionResponse) AsStream(r io.Reader, contentType string) *GetRoutesByDateActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetRoutesByDateActionResponse) AsJSON(payload any) *GetRoutesByDateActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetRoutesByDateActionResponse) WithIdeal(payload GetRoutesByDateActionRes) *GetRoutesByDateActionResponse {
	x.Payload = payload
	return x
}

// Use this for client calls, so the payload is being casted
func (x *GetRoutesByDateActionResponse) AsIdeal() (*GetRoutesByDateActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}
	var res GetRoutesByDateActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}
	return &res, nil
}
func (x *GetRoutesByDateActionResponse) AsHTML(payload string) *GetRoutesByDateActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetRoutesByDateActionResponse) AsBytes(payload []byte) *GetRoutesByDateActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetRoutesByDateActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetRoutesByDateActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetRoutesByDateActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetRoutesByDateActionRequestSig = func(c GetRoutesByDateActionRequest) (*GetRoutesByDateActionResponse, error)

/**
 * Path parameters for GetRoutesByDateAction
 */
type GetRoutesByDateActionPathParameter struct {
	Date string
}

// Converts a placeholder url, and applies the parameters to it.
func GetRoutesByDateActionPathParameterApply(params GetRoutesByDateActionPathParameter, templateUrl string) string {
	templateUrl = strings.ReplaceAll(templateUrl, ":date", fmt.Sprintf("%v", params.Date))
	return templateUrl
}

// General purpose to extract the value and cast based on type.
func GetRoutesByDateActionPathParameterFromFn(fn func(key string) string) GetRoutesByDateActionPathParameter {
	res := GetRoutesByDateActionPathParameter{}
	res.Date = fn("date")
	return res
}

/**
 * Query parameters for GetRoutesByDateAction
 */
// Query wrapper with private fields
type GetRoutesByDateActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
}

func GetRoutesByDateActionQueryFromString(rawQuery string) GetRoutesByDateActionQuery {
	v := GetRoutesByDateActionQuery{}
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
func GetRoutesByDateActionQueryFromHttp(r *http.Request) GetRoutesByDateActionQuery {
	return GetRoutesByDateActionQueryFromString(r.URL.RawQuery)
}
func (q GetRoutesByDateActionQuery) Values() url.Values {
	return q.values
}
func (q GetRoutesByDateActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetRoutesByDateActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetRoutesByDateActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetRoutesByDateActionRequest struct {
	Body        interface{}
	Params      GetRoutesByDateActionPathParameter
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

func GetRoutesByDateActionClientCreateUrl(
	req GetRoutesByDateActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetRoutesByDateActionMeta()
	urlAddr := meta.URL
	urlAddr = config.BaseURL + urlAddr
	// In case there is a path parameter, we need to apply that.
	urlAddr = GetRoutesByDateActionPathParameterApply(req.Params, urlAddr)
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
func GetRoutesByDateActionClientExecuteTyped(httpReq *http.Request) (*GetRoutesByDateActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetRoutesByDateActionResponse
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
func GetRoutesByDateActionClientBuildRequest(req GetRoutesByDateActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetRoutesByDateActionMeta()
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
func GetRoutesByDateActionCall(
	req GetRoutesByDateActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetRoutesByDateActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetRoutesByDateActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetRoutesByDateActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetRoutesByDateActionClientExecuteTyped(r)
}
func GetGetRoutesByDateActionPathParameterCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name:     prefix + "pp-date",
			Type:     "string",
			Required: true,
		},
	}
}

// Extracts the path parameter from a urfave v3 cli.
func GetRoutesByDateActionPathParameterFromCli(c *cli.Command) GetRoutesByDateActionPathParameter {
	return GetRoutesByDateActionPathParameterFromFn(func(key string) string {
		// In cli, they are prefixed with pp, to avoid conflict with other params coming from 'in'
		// section of the definition.
		return c.String("pp-" + key)
	})
}
func (x GetRoutesByDateActionRequest) IsCli() bool {
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
