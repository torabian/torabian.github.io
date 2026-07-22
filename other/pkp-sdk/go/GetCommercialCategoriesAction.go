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
* Action to communicate with the action GetCommercialCategoriesAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetCommercialCategoriesAction
func GetCommercialCategoriesAction(c GetCommercialCategoriesActionRequest) (*GetCommercialCategoriesActionResponse, error) {
	return &GetCommercialCategoriesActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetCommercialCategoriesActionMeta() struct {
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
		Name:        "GetCommercialCategoriesAction",
		CliName:     "get-commercial-categories-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/dictionaries/commercial-categories",
		Method:      "",
		Description: ``,
	}
}

// The base class definition for getCommercialCategoriesActionRes
type GetCommercialCategoriesActionRes struct {
	GeneratedAt          string                                                            `json:"generatedAt" yaml:"generatedAt"`
	CommercialCategories emigo.Array[GetCommercialCategoriesActionResCommercialCategories] `json:"commercialCategories" yaml:"commercialCategories"`
}

// The base class definition for commercialCategories
type GetCommercialCategoriesActionResCommercialCategories struct {
	Code              string `json:"code" yaml:"code"`
	Name              string `json:"name" yaml:"name"`
	CarrierCode       string `json:"carrierCode" yaml:"carrierCode"`
	SpeedCategoryCode string `json:"speedCategoryCode" yaml:"speedCategoryCode"`
}

func (x *GetCommercialCategoriesActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetCommercialCategoriesActionResCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "generated-at",
			Type: "string",
		},
		{
			Name: prefix + "commercial-categories",
			Type: "array",
		},
	}
}
func CastGetCommercialCategoriesActionResFromCli(c emigo.CliCastable) GetCommercialCategoriesActionRes {
	data := GetCommercialCategoriesActionRes{}
	if c.IsSet("generated-at") {
		data.GeneratedAt = c.String("generated-at")
	}
	if c.IsSet("commercial-categories") {
		data.CommercialCategories = emigo.CapturePossibleArray(CastGetCommercialCategoriesActionResCommercialCategoriesFromCli, "commercial-categories", c)
	}
	return data
}
func GetGetCommercialCategoriesActionResCommercialCategoriesCliFlags(prefix string) []emigo.CliFlag {
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
			Name: prefix + "carrier-code",
			Type: "string",
		},
		{
			Name: prefix + "speed-category-code",
			Type: "string",
		},
	}
}
func CastGetCommercialCategoriesActionResCommercialCategoriesFromCli(c emigo.CliCastable) GetCommercialCategoriesActionResCommercialCategories {
	data := GetCommercialCategoriesActionResCommercialCategories{}
	if c.IsSet("code") {
		data.Code = c.String("code")
	}
	if c.IsSet("name") {
		data.Name = c.String("name")
	}
	if c.IsSet("carrier-code") {
		data.CarrierCode = c.String("carrier-code")
	}
	if c.IsSet("speed-category-code") {
		data.SpeedCategoryCode = c.String("speed-category-code")
	}
	return data
}

type GetCommercialCategoriesActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetCommercialCategoriesActionResponse) SetContentType(contentType string) *GetCommercialCategoriesActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetCommercialCategoriesActionResponse) AsStream(r io.Reader, contentType string) *GetCommercialCategoriesActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetCommercialCategoriesActionResponse) AsJSON(payload any) *GetCommercialCategoriesActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetCommercialCategoriesActionResponse) WithIdeal(payload GetCommercialCategoriesActionRes) *GetCommercialCategoriesActionResponse {
	x.Payload = payload
	return x
}

// Use this for client calls, so the payload is being casted
func (x *GetCommercialCategoriesActionResponse) AsIdeal() (*GetCommercialCategoriesActionRes, error) {
	b, err := json.Marshal(x.GetPayload())
	if err != nil {
		return nil, err
	}
	var res GetCommercialCategoriesActionRes
	if err := json.Unmarshal(b, &res); err != nil {
		return nil, err
	}
	return &res, nil
}
func (x *GetCommercialCategoriesActionResponse) AsHTML(payload string) *GetCommercialCategoriesActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetCommercialCategoriesActionResponse) AsBytes(payload []byte) *GetCommercialCategoriesActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetCommercialCategoriesActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetCommercialCategoriesActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetCommercialCategoriesActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetCommercialCategoriesActionRequestSig = func(c GetCommercialCategoriesActionRequest) (*GetCommercialCategoriesActionResponse, error)

/**
 * Query parameters for GetCommercialCategoriesAction
 */
// Query wrapper with private fields
type GetCommercialCategoriesActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
}

func GetCommercialCategoriesActionQueryFromString(rawQuery string) GetCommercialCategoriesActionQuery {
	v := GetCommercialCategoriesActionQuery{}
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
func GetCommercialCategoriesActionQueryFromHttp(r *http.Request) GetCommercialCategoriesActionQuery {
	return GetCommercialCategoriesActionQueryFromString(r.URL.RawQuery)
}
func (q GetCommercialCategoriesActionQuery) Values() url.Values {
	return q.values
}
func (q GetCommercialCategoriesActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetCommercialCategoriesActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetCommercialCategoriesActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetCommercialCategoriesActionRequest struct {
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

func GetCommercialCategoriesActionClientCreateUrl(
	req GetCommercialCategoriesActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetCommercialCategoriesActionMeta()
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
func GetCommercialCategoriesActionClientExecuteTyped(httpReq *http.Request) (*GetCommercialCategoriesActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetCommercialCategoriesActionResponse
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
func GetCommercialCategoriesActionClientBuildRequest(req GetCommercialCategoriesActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetCommercialCategoriesActionMeta()
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
func GetCommercialCategoriesActionCall(
	req GetCommercialCategoriesActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetCommercialCategoriesActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetCommercialCategoriesActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetCommercialCategoriesActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetCommercialCategoriesActionClientExecuteTyped(r)
}
func (x GetCommercialCategoriesActionRequest) IsCli() bool {
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
