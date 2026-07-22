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
* Action to communicate with the action GetStopTypesAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetStopTypesAction
func GetStopTypesAction(c GetStopTypesActionRequest) (*GetStopTypesActionResponse, error) {
	return &GetStopTypesActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetStopTypesActionMeta() struct {
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
		Name:        "GetStopTypesAction",
		CliName:     "get-stop-types-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/dictionaries/stop-types",
		Method:      "",
		Description: ``,
	}
}

// The base class definition for getStopTypesActionRes
type GetStopTypesActionRes struct {
	GeneratedAt string                                      `json:"generatedAt" yaml:"generatedAt"`
	StopTypes   emigo.Array[GetStopTypesActionResStopTypes] `json:"stopTypes" yaml:"stopTypes"`
}

// The base class definition for stopTypes
type GetStopTypesActionResStopTypes struct {
	Id          int    `json:"id" yaml:"id"`
	Description string `json:"description" yaml:"description"`
}

func (x *GetStopTypesActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetStopTypesActionResCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "generated-at",
			Type: "string",
		},
		{
			Name: prefix + "stop-types",
			Type: "array",
		},
	}
}
func CastGetStopTypesActionResFromCli(c emigo.CliCastable) GetStopTypesActionRes {
	data := GetStopTypesActionRes{}
	if c.IsSet("generated-at") {
		data.GeneratedAt = c.String("generated-at")
	}
	if c.IsSet("stop-types") {
		data.StopTypes = emigo.CapturePossibleArray(CastGetStopTypesActionResStopTypesFromCli, "stop-types", c)
	}
	return data
}
func GetGetStopTypesActionResStopTypesCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "id",
			Type: "int",
		},
		{
			Name: prefix + "description",
			Type: "string",
		},
	}
}
func CastGetStopTypesActionResStopTypesFromCli(c emigo.CliCastable) GetStopTypesActionResStopTypes {
	data := GetStopTypesActionResStopTypes{}
	if c.IsSet("id") {
		data.Id = int(c.Int64("id"))
	}
	if c.IsSet("description") {
		data.Description = c.String("description")
	}
	return data
}

type GetStopTypesActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetStopTypesActionResponse) SetContentType(contentType string) *GetStopTypesActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetStopTypesActionResponse) AsStream(r io.Reader, contentType string) *GetStopTypesActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetStopTypesActionResponse) AsJSON(payload any) *GetStopTypesActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetStopTypesActionResponse) WithIdeal(payload GetStopTypesActionRes) *GetStopTypesActionResponse {
	x.Payload = payload
	return x
}

// Use this for client calls, so the payload is being casted
func (x *GetStopTypesActionResponse) AsIdeal() (*GetStopTypesActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}
	var res GetStopTypesActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}
	return &res, nil
}
func (x *GetStopTypesActionResponse) AsHTML(payload string) *GetStopTypesActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetStopTypesActionResponse) AsBytes(payload []byte) *GetStopTypesActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetStopTypesActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetStopTypesActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetStopTypesActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetStopTypesActionRequestSig = func(c GetStopTypesActionRequest) (*GetStopTypesActionResponse, error)

/**
 * Query parameters for GetStopTypesAction
 */
// Query wrapper with private fields
type GetStopTypesActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
}

func GetStopTypesActionQueryFromString(rawQuery string) GetStopTypesActionQuery {
	v := GetStopTypesActionQuery{}
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
func GetStopTypesActionQueryFromHttp(r *http.Request) GetStopTypesActionQuery {
	return GetStopTypesActionQueryFromString(r.URL.RawQuery)
}
func (q GetStopTypesActionQuery) Values() url.Values {
	return q.values
}
func (q GetStopTypesActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetStopTypesActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetStopTypesActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetStopTypesActionRequest struct {
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

func GetStopTypesActionClientCreateUrl(
	req GetStopTypesActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetStopTypesActionMeta()
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
func GetStopTypesActionClientExecuteTyped(httpReq *http.Request) (*GetStopTypesActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetStopTypesActionResponse
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
func GetStopTypesActionClientBuildRequest(req GetStopTypesActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetStopTypesActionMeta()
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
func GetStopTypesActionCall(
	req GetStopTypesActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetStopTypesActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetStopTypesActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetStopTypesActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetStopTypesActionClientExecuteTyped(r)
}
func (x GetStopTypesActionRequest) IsCli() bool {
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
