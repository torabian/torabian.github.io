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

// GetStopTypesActionRaw registers a raw Gin route for the GetStopTypesAction action.
// This gives the developer full control over middleware, handlers, and response handling.
func GetStopTypesActionRaw(r *gin.Engine, handlers ...gin.HandlerFunc) {
	meta := GetStopTypesActionMeta()
	r.Handle(meta.Method, meta.URL, handlers...)
}

// GetStopTypesActionHandler returns the HTTP method, route URL, and a typed Gin handler for the GetStopTypesAction action.
// Developers implement their business logic as a function that receives a typed request object
// and returns either an *ActionResponse or nil. JSON marshalling, headers, and errors are handled automatically.
func GetStopTypesActionHandler(
	handler func(c GetStopTypesActionRequest) (*GetStopTypesActionResponse, error),
) (method, url string, h gin.HandlerFunc) {
	meta := GetStopTypesActionMeta()
	return meta.Method, meta.URL, func(m *gin.Context) {
		// Build typed request wrapper
		req := GetStopTypesActionRequest{
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

// GetStopTypesActionGin is a high-level convenience wrapper around GetStopTypesActionHandler.
// It automatically constructs and registers the typed route on the Gin engine.
// Use this when you don't need custom middleware or route grouping.
func GetStopTypesActionGin(r gin.IRoutes, handler func(c GetStopTypesActionRequest) (*GetStopTypesActionResponse, error)) {
	method, url, h := GetStopTypesActionHandler(handler)
	r.Handle(method, url, h)
}
func (x GetStopTypesActionRequest) IsGin() bool {
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
func GetStopTypesActionQueryFromGin(c *gin.Context) GetStopTypesActionQuery {
	return GetStopTypesActionQueryFromString(c.Request.URL.RawQuery)
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

// GetStopTypesActionHttpHandler returns the HTTP method, the ServeMux pattern, and a
// typed net/http handler for the GetStopTypesAction action. Developers implement
// their business logic as a function that receives a typed request object and
// returns either an *GetStopTypesActionResponse or nil. JSON marshalling, headers,
// status codes, and errors are handled automatically.
func GetStopTypesActionHttpHandler(
	handler func(c GetStopTypesActionRequest) (*GetStopTypesActionResponse, error),
) (method, pattern string, h http.HandlerFunc) {
	meta := GetStopTypesActionMeta()
	return meta.Method, meta.URL, func(w http.ResponseWriter, r *http.Request) {
		// Build typed request wrapper. GinCtx stays nil here (this is not gin),
		// which is what the IsGin() helper keys off.
		req := GetStopTypesActionRequest{
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

// GetStopTypesActionHttp is a high-level convenience wrapper around
// GetStopTypesActionHttpHandler. It registers the typed route on a standard
// *http.ServeMux using Go 1.22+ method-aware pattern syntax (e.g. "POST /").
// Use this when you don't need custom middleware.
func GetStopTypesActionHttp(
	mux *http.ServeMux,
	handler func(c GetStopTypesActionRequest) (*GetStopTypesActionResponse, error),
) {
	method, pattern, h := GetStopTypesActionHttpHandler(handler)
	mux.HandleFunc(method+" "+pattern, h)
}
