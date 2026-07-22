package external

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
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
	// Gin context for each request in case of a direct access requirement
	// Now it's interface, so the code gen doesn't depend on the instance
	// or gin package. Make sure you cast is later into *gin.Context, or whatever
	// your framework is passing when creating a request.
	// Ideally, you should not be needing this, and emi has to provide necessary helper
	// functions to read and write a request.
	GinCtx interface{}
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

// GetCarriersActionRaw registers a raw Gin route for the GetCarriersAction action.
// This gives the developer full control over middleware, handlers, and response handling.
func GetCarriersActionRaw(r *gin.Engine, handlers ...gin.HandlerFunc) {
	meta := GetCarriersActionMeta()
	r.Handle(meta.Method, meta.URL, handlers...)
}

// GetCarriersActionHandler returns the HTTP method, route URL, and a typed Gin handler for the GetCarriersAction action.
// Developers implement their business logic as a function that receives a typed request object
// and returns either an *ActionResponse or nil. JSON marshalling, headers, and errors are handled automatically.
func GetCarriersActionHandler(
	handler func(c GetCarriersActionRequest) (*GetCarriersActionResponse, error),
) (method, url string, h gin.HandlerFunc) {
	meta := GetCarriersActionMeta()
	return meta.Method, meta.URL, func(m *gin.Context) {
		// Build typed request wrapper
		req := GetCarriersActionRequest{
			Body:        nil,
			QueryParams: m.Request.URL.Query(),
			Headers:     m.Request.Header,
			GinCtx:      m,
		}
		resp, err := handler(req)
		if err != nil {
			m.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		// If the handler returned nil (and no error), it means the response was handled manually.
		if resp == nil {
			return
		}
		// Apply headers
		for k, v := range resp.Headers {
			m.Header(k, v)
		}
		// Apply status and payload
		status := resp.StatusCode
		if status == 0 {
			status = http.StatusOK
		}
		if resp.Payload != nil {
			m.JSON(status, resp.Payload)
		} else {
			m.Status(status)
		}
	}
}

// GetCarriersActionGin is a high-level convenience wrapper around GetCarriersActionHandler.
// It automatically constructs and registers the typed route on the Gin engine.
// Use this when you don't need custom middleware or route grouping.
func GetCarriersActionGin(r gin.IRoutes, handler func(c GetCarriersActionRequest) (*GetCarriersActionResponse, error)) {
	method, url, h := GetCarriersActionHandler(handler)
	r.Handle(method, url, h)
}
func (x GetCarriersActionRequest) IsGin() bool {
	if x.GinCtx == nil {
		return false
	}
	v := reflect.ValueOf(x.GinCtx)
	switch v.Kind() {
	case reflect.Ptr, reflect.Map, reflect.Slice, reflect.Interface, reflect.Func, reflect.Chan:
		return !v.IsNil()
	}
	return true
}
func GetCarriersActionQueryFromGin(c *gin.Context) GetCarriersActionQuery {
	return GetCarriersActionQueryFromString(c.Request.URL.RawQuery)
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

// GetCarriersActionHttpHandler returns the HTTP method, the ServeMux pattern, and a
// typed net/http handler for the GetCarriersAction action. Developers implement
// their business logic as a function that receives a typed request object and
// returns either an *GetCarriersActionResponse or nil. JSON marshalling, headers,
// status codes, and errors are handled automatically.
func GetCarriersActionHttpHandler(
	handler func(c GetCarriersActionRequest) (*GetCarriersActionResponse, error),
) (method, pattern string, h http.HandlerFunc) {
	meta := GetCarriersActionMeta()
	return meta.Method, meta.URL, func(w http.ResponseWriter, r *http.Request) {
		// Build typed request wrapper. GinCtx stays nil here (this is not gin),
		// which is what the IsGin() helper keys off.
		req := GetCarriersActionRequest{
			Body:        nil,
			QueryParams: r.URL.Query(),
			Headers:     r.Header,
		}
		resp, err := handler(req)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
			return
		}
		// If the handler returned nil (and no error), the response was handled
		// manually.
		if resp == nil {
			return
		}
		// Apply headers
		for k, v := range resp.Headers {
			w.Header().Set(k, v)
		}
		// Apply status and payload
		status := resp.StatusCode
		if status == 0 {
			status = http.StatusOK
		}
		if resp.Payload != nil {
			if w.Header().Get("Content-Type") == "" {
				w.Header().Set("Content-Type", "application/json")
			}
			w.WriteHeader(status)
			json.NewEncoder(w).Encode(resp.Payload)
		} else {
			w.WriteHeader(status)
		}
	}
}

// GetCarriersActionHttp is a high-level convenience wrapper around
// GetCarriersActionHttpHandler. It registers the typed route on a standard
// *http.ServeMux using Go 1.22+ method-aware pattern syntax (e.g. "POST /").
// Use this when you don't need custom middleware.
func GetCarriersActionHttp(
	mux *http.ServeMux,
	handler func(c GetCarriersActionRequest) (*GetCarriersActionResponse, error),
) {
	method, pattern, h := GetCarriersActionHttpHandler(handler)
	mux.HandleFunc(method+" "+pattern, h)
}
