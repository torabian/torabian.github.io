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
* Action to communicate with the action GetOperationsStatisticsAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetOperationsStatisticsAction
func GetOperationsStatisticsAction(c GetOperationsStatisticsActionRequest) (*GetOperationsStatisticsActionResponse, error) {
	return &GetOperationsStatisticsActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetOperationsStatisticsActionMeta() struct {
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
		Name:        "GetOperationsStatisticsAction",
		CliName:     "get-operations-statistics-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/operations/statistics",
		Method:      "",
		Description: ``,
	}
}

// The base class definition for getOperationsStatisticsActionRes
type GetOperationsStatisticsActionRes struct {
	GeneratedAt      string `json:"generatedAt" yaml:"generatedAt"`
	Date             string `json:"date" yaml:"date"`
	TotalTrains      int    `json:"totalTrains" yaml:"totalTrains"`
	NotStarted       int    `json:"notStarted" yaml:"notStarted"`
	InProgress       int    `json:"inProgress" yaml:"inProgress"`
	Completed        int    `json:"completed" yaml:"completed"`
	Cancelled        int    `json:"cancelled" yaml:"cancelled"`
	PartialCancelled int    `json:"partialCancelled" yaml:"partialCancelled"`
}

func (x *GetOperationsStatisticsActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetOperationsStatisticsActionResCliFlags(prefix string) []emigo.CliFlag {
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
			Name: prefix + "total-trains",
			Type: "int",
		},
		{
			Name: prefix + "not-started",
			Type: "int",
		},
		{
			Name: prefix + "in-progress",
			Type: "int",
		},
		{
			Name: prefix + "completed",
			Type: "int",
		},
		{
			Name: prefix + "cancelled",
			Type: "int",
		},
		{
			Name: prefix + "partial-cancelled",
			Type: "int",
		},
	}
}
func CastGetOperationsStatisticsActionResFromCli(c emigo.CliCastable) GetOperationsStatisticsActionRes {
	data := GetOperationsStatisticsActionRes{}
	if c.IsSet("generated-at") {
		data.GeneratedAt = c.String("generated-at")
	}
	if c.IsSet("date") {
		data.Date = c.String("date")
	}
	if c.IsSet("total-trains") {
		data.TotalTrains = int(c.Int64("total-trains"))
	}
	if c.IsSet("not-started") {
		data.NotStarted = int(c.Int64("not-started"))
	}
	if c.IsSet("in-progress") {
		data.InProgress = int(c.Int64("in-progress"))
	}
	if c.IsSet("completed") {
		data.Completed = int(c.Int64("completed"))
	}
	if c.IsSet("cancelled") {
		data.Cancelled = int(c.Int64("cancelled"))
	}
	if c.IsSet("partial-cancelled") {
		data.PartialCancelled = int(c.Int64("partial-cancelled"))
	}
	return data
}

type GetOperationsStatisticsActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetOperationsStatisticsActionResponse) SetContentType(contentType string) *GetOperationsStatisticsActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetOperationsStatisticsActionResponse) AsStream(r io.Reader, contentType string) *GetOperationsStatisticsActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetOperationsStatisticsActionResponse) AsJSON(payload any) *GetOperationsStatisticsActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetOperationsStatisticsActionResponse) WithIdeal(payload GetOperationsStatisticsActionRes) *GetOperationsStatisticsActionResponse {
	x.Payload = payload
	return x
}
func (x *GetOperationsStatisticsActionResponse) AsHTML(payload string) *GetOperationsStatisticsActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetOperationsStatisticsActionResponse) AsBytes(payload []byte) *GetOperationsStatisticsActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetOperationsStatisticsActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetOperationsStatisticsActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetOperationsStatisticsActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetOperationsStatisticsActionRequestSig = func(c GetOperationsStatisticsActionRequest) (*GetOperationsStatisticsActionResponse, error)

/**
 * Query parameters for GetOperationsStatisticsAction
 */
// Query wrapper with private fields
type GetOperationsStatisticsActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
}

func GetOperationsStatisticsActionQueryFromString(rawQuery string) GetOperationsStatisticsActionQuery {
	v := GetOperationsStatisticsActionQuery{}
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
func GetOperationsStatisticsActionQueryFromHttp(r *http.Request) GetOperationsStatisticsActionQuery {
	return GetOperationsStatisticsActionQueryFromString(r.URL.RawQuery)
}
func (q GetOperationsStatisticsActionQuery) Values() url.Values {
	return q.values
}
func (q GetOperationsStatisticsActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetOperationsStatisticsActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetOperationsStatisticsActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetOperationsStatisticsActionRequest struct {
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

func GetOperationsStatisticsActionClientCreateUrl(
	req GetOperationsStatisticsActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetOperationsStatisticsActionMeta()
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
func GetOperationsStatisticsActionClientExecuteTyped(httpReq *http.Request) (*GetOperationsStatisticsActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetOperationsStatisticsActionResponse
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
func GetOperationsStatisticsActionClientBuildRequest(req GetOperationsStatisticsActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetOperationsStatisticsActionMeta()
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
func GetOperationsStatisticsActionCall(
	req GetOperationsStatisticsActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetOperationsStatisticsActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetOperationsStatisticsActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetOperationsStatisticsActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetOperationsStatisticsActionClientExecuteTyped(r)
}

// GetOperationsStatisticsActionRaw registers a raw Gin route for the GetOperationsStatisticsAction action.
// This gives the developer full control over middleware, handlers, and response handling.
func GetOperationsStatisticsActionRaw(r *gin.Engine, handlers ...gin.HandlerFunc) {
	meta := GetOperationsStatisticsActionMeta()
	r.Handle(meta.Method, meta.URL, handlers...)
}

// GetOperationsStatisticsActionHandler returns the HTTP method, route URL, and a typed Gin handler for the GetOperationsStatisticsAction action.
// Developers implement their business logic as a function that receives a typed request object
// and returns either an *ActionResponse or nil. JSON marshalling, headers, and errors are handled automatically.
func GetOperationsStatisticsActionHandler(
	handler func(c GetOperationsStatisticsActionRequest) (*GetOperationsStatisticsActionResponse, error),
) (method, url string, h gin.HandlerFunc) {
	meta := GetOperationsStatisticsActionMeta()
	return meta.Method, meta.URL, func(m *gin.Context) {
		// Build typed request wrapper
		req := GetOperationsStatisticsActionRequest{
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

// GetOperationsStatisticsActionGin is a high-level convenience wrapper around GetOperationsStatisticsActionHandler.
// It automatically constructs and registers the typed route on the Gin engine.
// Use this when you don't need custom middleware or route grouping.
func GetOperationsStatisticsActionGin(r gin.IRoutes, handler func(c GetOperationsStatisticsActionRequest) (*GetOperationsStatisticsActionResponse, error)) {
	method, url, h := GetOperationsStatisticsActionHandler(handler)
	r.Handle(method, url, h)
}
func (x GetOperationsStatisticsActionRequest) IsGin() bool {
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
func GetOperationsStatisticsActionQueryFromGin(c *gin.Context) GetOperationsStatisticsActionQuery {
	return GetOperationsStatisticsActionQueryFromString(c.Request.URL.RawQuery)
}
func (x GetOperationsStatisticsActionRequest) IsCli() bool {
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

// GetOperationsStatisticsActionHttpHandler returns the HTTP method, the ServeMux pattern, and a
// typed net/http handler for the GetOperationsStatisticsAction action. Developers implement
// their business logic as a function that receives a typed request object and
// returns either an *GetOperationsStatisticsActionResponse or nil. JSON marshalling, headers,
// status codes, and errors are handled automatically.
func GetOperationsStatisticsActionHttpHandler(
	handler func(c GetOperationsStatisticsActionRequest) (*GetOperationsStatisticsActionResponse, error),
) (method, pattern string, h http.HandlerFunc) {
	meta := GetOperationsStatisticsActionMeta()
	return meta.Method, meta.URL, func(w http.ResponseWriter, r *http.Request) {
		// Build typed request wrapper. GinCtx stays nil here (this is not gin),
		// which is what the IsGin() helper keys off.
		req := GetOperationsStatisticsActionRequest{
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

// GetOperationsStatisticsActionHttp is a high-level convenience wrapper around
// GetOperationsStatisticsActionHttpHandler. It registers the typed route on a standard
// *http.ServeMux using Go 1.22+ method-aware pattern syntax (e.g. "POST /").
// Use this when you don't need custom middleware.
func GetOperationsStatisticsActionHttp(
	mux *http.ServeMux,
	handler func(c GetOperationsStatisticsActionRequest) (*GetOperationsStatisticsActionResponse, error),
) {
	method, pattern, h := GetOperationsStatisticsActionHttpHandler(handler)
	mux.HandleFunc(method+" "+pattern, h)
}
