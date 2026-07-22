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
* Action to communicate with the action GetDisruptionsAction
 */
/*
Here is a quick function implementation to make your life easier:
// Actual implementation of GetDisruptionsAction
func GetDisruptionsAction(c GetDisruptionsActionRequest) (*GetDisruptionsActionResponse, error) {
	return &GetDisruptionsActionResponse{
		// Payload is an interface. Use it at carefully.
	}, nil
}
*/
func GetDisruptionsActionMeta() struct {
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
		Name:        "GetDisruptionsAction",
		CliName:     "get-disruptions-action",
		URL:         "https://pdp-api.plk-sa.pl/api/v1/disruptions",
		Method:      "",
		Description: `Returns current railway disruptions and affected routes.`,
	}
}

// The base class definition for getDisruptionsActionRes
type GetDisruptionsActionRes struct {
	GeneratedAt     string                                          `json:"generatedAt" yaml:"generatedAt"`
	Disruptions     emigo.Array[GetDisruptionsActionResDisruptions] `json:"disruptions" yaml:"disruptions"`
	DisruptionTypes map[string]string                               `json:"disruptionTypes" yaml:"disruptionTypes"`
	Stations        map[string]string                               `json:"stations" yaml:"stations"`
}

// The base class definition for disruptions
type GetDisruptionsActionResDisruptions struct {
	DisruptionId   int                                                           `json:"disruptionId" yaml:"disruptionId"`
	Message        string                                                        `json:"message" yaml:"message"`
	AffectedRoutes emigo.Array[GetDisruptionsActionResDisruptionsAffectedRoutes] `json:"affectedRoutes" yaml:"affectedRoutes"`
}

// The base class definition for affectedRoutes
type GetDisruptionsActionResDisruptionsAffectedRoutes struct {
	ScheduleId     int    `json:"scheduleId" yaml:"scheduleId"`
	OrderId        int    `json:"orderId" yaml:"orderId"`
	OperatingDate  string `json:"operatingDate" yaml:"operatingDate"`
	StationId      int    `json:"stationId" yaml:"stationId"`
	SequenceNumber int    `json:"sequenceNumber" yaml:"sequenceNumber"`
}

func (x *GetDisruptionsActionRes) Json() string {
	if x != nil {
		str, _ := json.MarshalIndent(x, "", "  ")
		return string(str)
	}
	return ""
}
func GetGetDisruptionsActionResCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "generated-at",
			Type: "string",
		},
		{
			Name: prefix + "disruptions",
			Type: "array",
		},
		{
			Name: prefix + "disruption-types",
			Type: "map",
		},
		{
			Name: prefix + "stations",
			Type: "map",
		},
	}
}
func CastGetDisruptionsActionResFromCli(c emigo.CliCastable) GetDisruptionsActionRes {
	data := GetDisruptionsActionRes{}
	if c.IsSet("generated-at") {
		data.GeneratedAt = c.String("generated-at")
	}
	if c.IsSet("disruptions") {
		data.Disruptions = emigo.CapturePossibleArray(CastGetDisruptionsActionResDisruptionsFromCli, "disruptions", c)
	}
	return data
}
func GetGetDisruptionsActionResDisruptionsCliFlags(prefix string) []emigo.CliFlag {
	return []emigo.CliFlag{
		{
			Name: prefix + "disruption-id",
			Type: "int",
		},
		{
			Name: prefix + "message",
			Type: "string",
		},
		{
			Name: prefix + "affected-routes",
			Type: "array",
		},
	}
}
func CastGetDisruptionsActionResDisruptionsFromCli(c emigo.CliCastable) GetDisruptionsActionResDisruptions {
	data := GetDisruptionsActionResDisruptions{}
	if c.IsSet("disruption-id") {
		data.DisruptionId = int(c.Int64("disruption-id"))
	}
	if c.IsSet("message") {
		data.Message = c.String("message")
	}
	if c.IsSet("affected-routes") {
		data.AffectedRoutes = emigo.CapturePossibleArray(CastGetDisruptionsActionResDisruptionsAffectedRoutesFromCli, "affected-routes", c)
	}
	return data
}
func GetGetDisruptionsActionResDisruptionsAffectedRoutesCliFlags(prefix string) []emigo.CliFlag {
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
			Name: prefix + "operating-date",
			Type: "string",
		},
		{
			Name: prefix + "station-id",
			Type: "int",
		},
		{
			Name: prefix + "sequence-number",
			Type: "int",
		},
	}
}
func CastGetDisruptionsActionResDisruptionsAffectedRoutesFromCli(c emigo.CliCastable) GetDisruptionsActionResDisruptionsAffectedRoutes {
	data := GetDisruptionsActionResDisruptionsAffectedRoutes{}
	if c.IsSet("schedule-id") {
		data.ScheduleId = int(c.Int64("schedule-id"))
	}
	if c.IsSet("order-id") {
		data.OrderId = int(c.Int64("order-id"))
	}
	if c.IsSet("operating-date") {
		data.OperatingDate = c.String("operating-date")
	}
	if c.IsSet("station-id") {
		data.StationId = int(c.Int64("station-id"))
	}
	if c.IsSet("sequence-number") {
		data.SequenceNumber = int(c.Int64("sequence-number"))
	}
	return data
}

type GetDisruptionsActionResponse struct {
	StatusCode int
	Headers    map[string]string
	Payload    interface{}
	// Do not manually fill this in. It has no effect. This is only useful when you are using
	// client code, and want to get access to the original response. When sending response from your
	// application it will be ignored.
	resp *http.Response
}

func (x *GetDisruptionsActionResponse) SetContentType(contentType string) *GetDisruptionsActionResponse {
	if x.Headers == nil {
		x.Headers = make(map[string]string)
	}
	x.Headers["Content-Type"] = contentType
	return x
}
func (x *GetDisruptionsActionResponse) AsStream(r io.Reader, contentType string) *GetDisruptionsActionResponse {
	x.Payload = r
	x.SetContentType(contentType)
	return x
}
func (x *GetDisruptionsActionResponse) AsJSON(payload any) *GetDisruptionsActionResponse {
	x.Payload = payload
	x.SetContentType("application/json")
	return x
}

// When the response is expected as documentation, you call this to get some type
// safety for the action which is happening.
func (x *GetDisruptionsActionResponse) WithIdeal(payload GetDisruptionsActionRes) *GetDisruptionsActionResponse {
	x.Payload = payload
	return x
}
func (x *GetDisruptionsActionResponse) AsHTML(payload string) *GetDisruptionsActionResponse {
	x.Payload = payload
	x.SetContentType("text/html; charset=utf-8")
	return x
}
func (x *GetDisruptionsActionResponse) AsBytes(payload []byte) *GetDisruptionsActionResponse {
	x.Payload = payload
	x.SetContentType("application/octet-stream")
	return x
}
func (x GetDisruptionsActionResponse) GetStatusCode() int {
	return x.StatusCode
}
func (x GetDisruptionsActionResponse) GetRespHeaders() map[string]string {
	return x.Headers
}
func (x GetDisruptionsActionResponse) GetPayload() interface{} {
	return x.Payload
}

// Request signature, which is here for refernece. Now it's inlined, so auto completions suggest the function body.
type GetDisruptionsActionRequestSig = func(c GetDisruptionsActionRequest) (*GetDisruptionsActionResponse, error)

/**
 * Query parameters for GetDisruptionsAction
 */
// Query wrapper with private fields
type GetDisruptionsActionQuery struct {
	values url.Values
	mapped map[string]interface{}
	// Typesafe fields
	DateFrom        string `json:"dateFrom"`
	DateTo          string `json:"dateTo"`
	Stations        string `json:"stations"`
	CarriersInclude string `json:"carriersInclude"`
	CarriersExclude string `json:"carriersExclude"`
}

func GetDisruptionsActionQueryFromString(rawQuery string) GetDisruptionsActionQuery {
	v := GetDisruptionsActionQuery{}
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
func GetDisruptionsActionQueryFromHttp(r *http.Request) GetDisruptionsActionQuery {
	return GetDisruptionsActionQueryFromString(r.URL.RawQuery)
}
func (q GetDisruptionsActionQuery) Values() url.Values {
	return q.values
}
func (q GetDisruptionsActionQuery) Mapped() map[string]interface{} {
	return q.mapped
}
func (q *GetDisruptionsActionQuery) SetValues(v url.Values) {
	q.values = v
}
func (q *GetDisruptionsActionQuery) SetMapped(m map[string]interface{}) {
	q.mapped = m
}

type GetDisruptionsActionRequest struct {
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

func GetDisruptionsActionClientCreateUrl(
	req GetDisruptionsActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*url.URL, error) {
	meta := GetDisruptionsActionMeta()
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
func GetDisruptionsActionClientExecuteTyped(httpReq *http.Request) (*GetDisruptionsActionResponse, error) {
	resp, err := http.DefaultClient.Do(httpReq)
	if err != nil {
		return nil, err
	}
	// At this point, response is valid, and we need to return the results.
	var result GetDisruptionsActionResponse
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
func GetDisruptionsActionClientBuildRequest(req GetDisruptionsActionRequest, reqUrl *url.URL, config *emigo.APIClient) (*http.Request, error) {
	meta := GetDisruptionsActionMeta()
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
func GetDisruptionsActionCall(
	req GetDisruptionsActionRequest,
	config *emigo.APIClient, // optional pre-built request
) (*GetDisruptionsActionResponse, error) {
	// This function intentionally is split into 3 different sections, so in case
	// of some modifications that we did not anticipate, at least a part would become quite useful.
	// first we create url, apply all path parameters, query params, etc
	u, err := GetDisruptionsActionClientCreateUrl(req, config)
	if err != nil {
		return nil, err
	}
	// We create the request from the body in second stage
	r, err := GetDisruptionsActionClientBuildRequest(req, u, config)
	if err != nil {
		return nil, err
	}
	// This one would execute the request and cast the result.
	return GetDisruptionsActionClientExecuteTyped(r)
}

// GetDisruptionsActionRaw registers a raw Gin route for the GetDisruptionsAction action.
// This gives the developer full control over middleware, handlers, and response handling.
func GetDisruptionsActionRaw(r *gin.Engine, handlers ...gin.HandlerFunc) {
	meta := GetDisruptionsActionMeta()
	r.Handle(meta.Method, meta.URL, handlers...)
}

// GetDisruptionsActionHandler returns the HTTP method, route URL, and a typed Gin handler for the GetDisruptionsAction action.
// Developers implement their business logic as a function that receives a typed request object
// and returns either an *ActionResponse or nil. JSON marshalling, headers, and errors are handled automatically.
func GetDisruptionsActionHandler(
	handler func(c GetDisruptionsActionRequest) (*GetDisruptionsActionResponse, error),
) (method, url string, h gin.HandlerFunc) {
	meta := GetDisruptionsActionMeta()
	return meta.Method, meta.URL, func(m *gin.Context) {
		// Build typed request wrapper
		req := GetDisruptionsActionRequest{
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

// GetDisruptionsActionGin is a high-level convenience wrapper around GetDisruptionsActionHandler.
// It automatically constructs and registers the typed route on the Gin engine.
// Use this when you don't need custom middleware or route grouping.
func GetDisruptionsActionGin(r gin.IRoutes, handler func(c GetDisruptionsActionRequest) (*GetDisruptionsActionResponse, error)) {
	method, url, h := GetDisruptionsActionHandler(handler)
	r.Handle(method, url, h)
}
func (x GetDisruptionsActionRequest) IsGin() bool {
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
func GetDisruptionsActionQueryFromGin(c *gin.Context) GetDisruptionsActionQuery {
	return GetDisruptionsActionQueryFromString(c.Request.URL.RawQuery)
}
func (x GetDisruptionsActionRequest) IsCli() bool {
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

// GetDisruptionsActionHttpHandler returns the HTTP method, the ServeMux pattern, and a
// typed net/http handler for the GetDisruptionsAction action. Developers implement
// their business logic as a function that receives a typed request object and
// returns either an *GetDisruptionsActionResponse or nil. JSON marshalling, headers,
// status codes, and errors are handled automatically.
func GetDisruptionsActionHttpHandler(
	handler func(c GetDisruptionsActionRequest) (*GetDisruptionsActionResponse, error),
) (method, pattern string, h http.HandlerFunc) {
	meta := GetDisruptionsActionMeta()
	return meta.Method, meta.URL, func(w http.ResponseWriter, r *http.Request) {
		// Build typed request wrapper. GinCtx stays nil here (this is not gin),
		// which is what the IsGin() helper keys off.
		req := GetDisruptionsActionRequest{
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

// GetDisruptionsActionHttp is a high-level convenience wrapper around
// GetDisruptionsActionHttpHandler. It registers the typed route on a standard
// *http.ServeMux using Go 1.22+ method-aware pattern syntax (e.g. "POST /").
// Use this when you don't need custom middleware.
func GetDisruptionsActionHttp(
	mux *http.ServeMux,
	handler func(c GetDisruptionsActionRequest) (*GetDisruptionsActionResponse, error),
) {
	method, pattern, h := GetDisruptionsActionHttpHandler(handler)
	mux.HandleFunc(method+" "+pattern, h)
}
