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
* Action to communicate with the action GetStationsAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetStationsAction
func GetStationsAction(c GetStationsActionRequest) (*GetStationsActionResponse, error) {
	return &GetStationsActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetStationsActionMeta() struct {
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
		Name:        "GetStationsAction",
		CliName:     "get-stations-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/dictionaries/stations",
		Method:      "",
		Description: ``,
	}
}

// The base class definition for getStationsActionRes
type GetStationsActionRes struct {
	GeneratedAt string                                    `json:"generatedAt" yaml:"generatedAt"`
	Stations    emigo.Array[GetStationsActionResStations] `json:"stations" yaml:"stations"`
}

// The base class definition for stations
type GetStationsActionResStations struct {
	Id   int    `json:"id" yaml:"id"`
	Name string `json:"name" yaml:"name"`
}

func (x *GetStationsActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetStationsActionResCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "generated-at",
			Type: "string",
		},
		{
			Name: prefix + "stations",
			Type: "array",
		},
	}
}
func CastGetStationsActionResFromCli(c emigo.CliCastable) GetStationsActionRes {
	data := GetStationsActionRes{}
	if c.IsSet("generated-at") {
		data.GeneratedAt = c.String("generated-at")
	}
	if c.IsSet("stations") {
		data.Stations = emigo.CapturePossibleArray(CastGetStationsActionResStationsFromCli, "stations", c)
	}
	return data
}
func GetGetStationsActionResStationsCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "id",
			Type: "int",
		},
		{
			Name: prefix + "name",
			Type: "string",
		},
	}
}
func CastGetStationsActionResStationsFromCli(c emigo.CliCastable) GetStationsActionResStations {
	data := GetStationsActionResStations{}
	if c.IsSet("id") {
		data.Id = int(c.Int64("id"))
	}
	if c.IsSet("name") {
		data.Name = c.String("name")
	}
	return data
}

type GetStationsActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetStationsActionResponse) SetContentType(contentType string) *GetStationsActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetStationsActionResponse) AsStream(r io.Reader, contentType string) *GetStationsActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetStationsActionResponse) AsJSON(payload any) *GetStationsActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetStationsActionResponse) WithIdeal(payload GetStationsActionRes) *GetStationsActionResponse {
	x.Payload = payload
	return x
}
func (x *GetStationsActionResponse) AsHTML(payload string) *GetStationsActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetStationsActionResponse) AsBytes(payload []byte) *GetStationsActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetStationsActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetStationsActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetStationsActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetStationsActionRequestSig = func(c GetStationsActionRequest) (*GetStationsActionResponse, error)

/**
 * Query parameters for GetStationsAction
 */
// Query wrapper with private fields
type GetStationsActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
	Search   string `json:"search"`
	Page     int    `json:"page"`
	PageSize int    `json:"pageSize"`
}

func GetStationsActionQueryFromString(rawQuery string) GetStationsActionQuery {
	v := GetStationsActionQuery{}
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
func GetStationsActionQueryFromHttp(r *http.Request) GetStationsActionQuery {
	return GetStationsActionQueryFromString(r.URL.RawQuery)
}
func (q GetStationsActionQuery) Values() url.Values {
	return q.values
}
func (q GetStationsActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetStationsActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetStationsActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetStationsActionRequest struct {
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

func GetStationsActionClientCreateUrl(
	req GetStationsActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetStationsActionMeta()
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
func GetStationsActionClientExecuteTyped(httpReq *http.Request) (*GetStationsActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetStationsActionResponse
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
func GetStationsActionClientBuildRequest(req GetStationsActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetStationsActionMeta()
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
func GetStationsActionCall(
	req GetStationsActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetStationsActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetStationsActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetStationsActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetStationsActionClientExecuteTyped(r)
}
func (x GetStationsActionRequest) IsCli() bool {
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
