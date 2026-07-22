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
* Action to communicate with the action GetCarriersAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetCarriersAction
func GetCarriersAction(c GetCarriersActionRequest) (*GetCarriersActionResponse, error) {
	return &GetCarriersActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetCarriersActionMeta() struct {
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
		Name:        "GetCarriersAction",
		CliName:     "get-carriers-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/dictionaries/carriers",
		Method:      "",
		Description: ``,
	}
}

// The base class definition for getCarriersActionRes
type GetCarriersActionRes struct {
	GeneratedAt string                                    `json:"generatedAt" yaml:"generatedAt"`
	Carriers    emigo.Array[GetCarriersActionResCarriers] `json:"carriers" yaml:"carriers"`
	Usage       GetCarriersActionResUsage                 `json:"usage" yaml:"usage"`
}

// The base class definition for carriers
type GetCarriersActionResCarriers struct {
	Code      string `json:"code" yaml:"code"`
	Name      string `json:"name" yaml:"name"`
	ValidFrom string `json:"validFrom" yaml:"validFrom"`
	ValidTo   string `json:"validTo" yaml:"validTo"`
}

// The base class definition for usage
type GetCarriersActionResUsage struct {
	Examples    []string `json:"examples" yaml:"examples"`
	Description string   `json:"description" yaml:"description"`
}

func (x *GetCarriersActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetCarriersActionResCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "generated-at",
			Type: "string",
		},
		{
			Name: prefix + "carriers",
			Type: "array",
		},
		{
			Name:     prefix + "usage",
			Type:     "object",
			Children: GetGetCarriersActionResUsageCliFlags("usage-"),
		},
	}
}
func CastGetCarriersActionResFromCli(c emigo.CliCastable) GetCarriersActionRes {
	data := GetCarriersActionRes{}
	if c.IsSet("generated-at") {
		data.GeneratedAt = c.String("generated-at")
	}
	if c.IsSet("carriers") {
		data.Carriers = emigo.CapturePossibleArray(CastGetCarriersActionResCarriersFromCli, "carriers", c)
	}
	if c.IsSet("usage") {
		data.Usage = CastGetCarriersActionResUsageFromCli(c)
	}
	return data
}
func GetGetCarriersActionResCarriersCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "code",
			Type: "string",
		},
		{
			Name: prefix + "name",
			Type: "string",
		},
		{
			Name: prefix + "valid-from",
			Type: "string",
		},
		{
			Name: prefix + "valid-to",
			Type: "string",
		},
	}
}
func CastGetCarriersActionResCarriersFromCli(c emigo.CliCastable) GetCarriersActionResCarriers {
	data := GetCarriersActionResCarriers{}
	if c.IsSet("code") {
		data.Code = c.String("code")
	}
	if c.IsSet("name") {
		data.Name = c.String("name")
	}
	if c.IsSet("valid-from") {
		data.ValidFrom = c.String("valid-from")
	}
	if c.IsSet("valid-to") {
		data.ValidTo = c.String("valid-to")
	}
	return data
}
func GetGetCarriersActionResUsageCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "examples",
			Type: "slice",
		},
		{
			Name: prefix + "description",
			Type: "string",
		},
	}
}
func CastGetCarriersActionResUsageFromCli(c emigo.CliCastable) GetCarriersActionResUsage {
	data := GetCarriersActionResUsage{}
	if c.IsSet("examples") {
		emigo.InflatePossibleSlice(c.String("examples"), &data.Examples)
	}
	if c.IsSet("description") {
		data.Description = c.String("description")
	}
	return data
}

type GetCarriersActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetCarriersActionResponse) SetContentType(contentType string) *GetCarriersActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetCarriersActionResponse) AsStream(r io.Reader, contentType string) *GetCarriersActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetCarriersActionResponse) AsJSON(payload any) *GetCarriersActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetCarriersActionResponse) WithIdeal(payload GetCarriersActionRes) *GetCarriersActionResponse {
	x.Payload = payload
	return x
}

// Use this for client calls, so the payload is being casted
func (x *GetCarriersActionResponse) AsIdeal() (*GetCarriersActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}
	var res GetCarriersActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}
	return &res, nil
}
func (x *GetCarriersActionResponse) AsHTML(payload string) *GetCarriersActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetCarriersActionResponse) AsBytes(payload []byte) *GetCarriersActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetCarriersActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetCarriersActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetCarriersActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetCarriersActionRequestSig = func(c GetCarriersActionRequest) (*GetCarriersActionResponse, error)

/**
 * Query parameters for GetCarriersAction
 */
// Query wrapper with private fields
type GetCarriersActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
}

func GetCarriersActionQueryFromString(rawQuery string) GetCarriersActionQuery {
	v := GetCarriersActionQuery{}
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
func GetCarriersActionQueryFromHttp(r *http.Request) GetCarriersActionQuery {
	return GetCarriersActionQueryFromString(r.URL.RawQuery)
}
func (q GetCarriersActionQuery) Values() url.Values {
	return q.values
}
func (q GetCarriersActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetCarriersActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetCarriersActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetCarriersActionRequest struct {
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

func GetCarriersActionClientCreateUrl(
	req GetCarriersActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetCarriersActionMeta()
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
func GetCarriersActionClientExecuteTyped(httpReq *http.Request) (*GetCarriersActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetCarriersActionResponse
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
func GetCarriersActionClientBuildRequest(req GetCarriersActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetCarriersActionMeta()
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
func GetCarriersActionCall(
	req GetCarriersActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetCarriersActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetCarriersActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetCarriersActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetCarriersActionClientExecuteTyped(r)
}
func (x GetCarriersActionRequest) IsCli() bool {
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
