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
* Action to communicate with the action GetDataVersionAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetDataVersionAction
func GetDataVersionAction(c GetDataVersionActionRequest) (*GetDataVersionActionResponse, error) {
	return &GetDataVersionActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetDataVersionActionMeta() struct {
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
		Name:        "GetDataVersionAction",
		CliName:     "get-data-version-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/data-version",
		Method:      "",
		Description: `Returns information about content version, hash code information if data has changed.`,
	}
}

// The base class definition for getDataVersionActionRes
type GetDataVersionActionRes struct {
	DataVersion       string `json:"dataVersion" yaml:"dataVersion"`
	SchedulesVersion  string `json:"schedulesVersion" yaml:"schedulesVersion"`
	OperationsVersion string `json:"operationsVersion" yaml:"operationsVersion"`
	Timestamp         string `json:"timestamp" yaml:"timestamp"`
}

func (x *GetDataVersionActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetDataVersionActionResCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "data-version",
			Type: "string",
		},
		{
			Name: prefix + "schedules-version",
			Type: "string",
		},
		{
			Name: prefix + "operations-version",
			Type: "string",
		},
		{
			Name: prefix + "timestamp",
			Type: "string",
		},
	}
}
func CastGetDataVersionActionResFromCli(c emigo.CliCastable) GetDataVersionActionRes {
	data := GetDataVersionActionRes{}
	if c.IsSet("data-version") {
		data.DataVersion = c.String("data-version")
	}
	if c.IsSet("schedules-version") {
		data.SchedulesVersion = c.String("schedules-version")
	}
	if c.IsSet("operations-version") {
		data.OperationsVersion = c.String("operations-version")
	}
	if c.IsSet("timestamp") {
		data.Timestamp = c.String("timestamp")
	}
	return data
}

type GetDataVersionActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetDataVersionActionResponse) SetContentType(contentType string) *GetDataVersionActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetDataVersionActionResponse) AsStream(r io.Reader, contentType string) *GetDataVersionActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetDataVersionActionResponse) AsJSON(payload any) *GetDataVersionActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetDataVersionActionResponse) WithIdeal(payload GetDataVersionActionRes) *GetDataVersionActionResponse {
	x.Payload = payload
	return x
}
func (x *GetDataVersionActionResponse) AsHTML(payload string) *GetDataVersionActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetDataVersionActionResponse) AsBytes(payload []byte) *GetDataVersionActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetDataVersionActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetDataVersionActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetDataVersionActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetDataVersionActionRequestSig = func(c GetDataVersionActionRequest) (*GetDataVersionActionResponse, error)

/**
 * Query parameters for GetDataVersionAction
 */
// Query wrapper with private fields
type GetDataVersionActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
}

func GetDataVersionActionQueryFromString(rawQuery string) GetDataVersionActionQuery {
	v := GetDataVersionActionQuery{}
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
func GetDataVersionActionQueryFromHttp(r *http.Request) GetDataVersionActionQuery {
	return GetDataVersionActionQueryFromString(r.URL.RawQuery)
}
func (q GetDataVersionActionQuery) Values() url.Values {
	return q.values
}
func (q GetDataVersionActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetDataVersionActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetDataVersionActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetDataVersionActionRequest struct {
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

func GetDataVersionActionClientCreateUrl(
	req GetDataVersionActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetDataVersionActionMeta()
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
func GetDataVersionActionClientExecuteTyped(httpReq *http.Request) (*GetDataVersionActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetDataVersionActionResponse
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
func GetDataVersionActionClientBuildRequest(req GetDataVersionActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetDataVersionActionMeta()
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
func GetDataVersionActionCall(
	req GetDataVersionActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetDataVersionActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetDataVersionActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetDataVersionActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetDataVersionActionClientExecuteTyped(r)
}

// GetDataVersionActionRaw registers a raw Gin route for the GetDataVersionAction action.
// This gives the developer full control over middleware, handlers, and response handling.
func GetDataVersionActionRaw(r *gin.Engine, handlers ...gin.HandlerFunc) {
	meta := GetDataVersionActionMeta()
	r.Handle(meta.Method, meta.URL, handlers...)
}

// GetDataVersionActionHandler returns the HTTP method, route URL, and a typed Gin handler for the GetDataVersionAction action.
// Developers implement their business logic as a function that receives a typed request object
// and returns either an *ActionResponse or nil. JSON marshalling, headers, and errors are handled automatically.
func GetDataVersionActionHandler(
	handler func(c GetDataVersionActionRequest) (*GetDataVersionActionResponse, error),
) (method, url string, h gin.HandlerFunc) {
	meta := GetDataVersionActionMeta()
	return meta.Method, meta.URL, func(m *gin.Context) {
		// Build typed request wrapper
		req := GetDataVersionActionRequest{
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

// GetDataVersionActionGin is a high-level convenience wrapper around GetDataVersionActionHandler.
// It automatically constructs and registers the typed route on the Gin engine.
// Use this when you don't need custom middleware or route grouping.
func GetDataVersionActionGin(r gin.IRoutes, handler func(c GetDataVersionActionRequest) (*GetDataVersionActionResponse, error)) {
	method, url, h := GetDataVersionActionHandler(handler)
	r.Handle(method, url, h)
}
func (x GetDataVersionActionRequest) IsGin() bool {
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
func GetDataVersionActionQueryFromGin(c *gin.Context) GetDataVersionActionQuery {
	return GetDataVersionActionQueryFromString(c.Request.URL.RawQuery)
}
func (x GetDataVersionActionRequest) IsCli() bool {
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

// GetDataVersionActionHttpHandler returns the HTTP method, the ServeMux pattern, and a
// typed net/http handler for the GetDataVersionAction action. Developers implement
// their business logic as a function that receives a typed request object and
// returns either an *GetDataVersionActionResponse or nil. JSON marshalling, headers,
// status codes, and errors are handled automatically.
func GetDataVersionActionHttpHandler(
	handler func(c GetDataVersionActionRequest) (*GetDataVersionActionResponse, error),
) (method, pattern string, h http.HandlerFunc) {
	meta := GetDataVersionActionMeta()
	return meta.Method, meta.URL, func(w http.ResponseWriter, r *http.Request) {
		// Build typed request wrapper. GinCtx stays nil here (this is not gin),
		// which is what the IsGin() helper keys off.
		req := GetDataVersionActionRequest{
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

// GetDataVersionActionHttp is a high-level convenience wrapper around
// GetDataVersionActionHttpHandler. It registers the typed route on a standard
// *http.ServeMux using Go 1.22+ method-aware pattern syntax (e.g. "POST /").
// Use this when you don't need custom middleware.
func GetDataVersionActionHttp(
	mux *http.ServeMux,
	handler func(c GetDataVersionActionRequest) (*GetDataVersionActionResponse, error),
) {
	method, pattern, h := GetDataVersionActionHttpHandler(handler)
	mux.HandleFunc(method+" "+pattern, h)
}
