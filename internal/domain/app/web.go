package app

import (
	"fmt"
	"net/http"
	"time"

	"github.com/vvenger/otus-highload/internal/config"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	"github.com/vvenger/otus-highload/internal/pkg/requestid"
	"github.com/vvenger/otus-highload/internal/socialnetwork/web"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/trace"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

var (
	_ http.Handler = (*web.HttpService)(nil)
)

const (
	otelRequestIDKey = "trace_id"
	logRequestIDKey  = "request_id"
)

type WebServer struct {
	*http.Server
	ShutdownTimeout time.Duration
}

type WebServerParams struct {
	fx.In
	App            config.AppConfig
	Logger         *zap.Logger
	TracerProvider trace.TracerProvider
	WebService     http.Handler `name:"http_server"`
}

func NewWebServer(p WebServerParams) *WebServer {
	route := RecoveryMiddleware(p.Logger, p.TracerProvider)(p.WebService)

	return &WebServer{
		Server: &http.Server{
			Addr:         fmt.Sprintf(":%d", p.App.Web.Port),
			ReadTimeout:  time.Duration(p.App.Web.ReadTimeout) * time.Second,
			WriteTimeout: time.Duration(p.App.Web.WriteTimeout) * time.Second,
			Handler:      otelhttp.NewHandler(route, "http"),
		},
		ShutdownTimeout: time.Duration(p.App.Shutdown) * time.Second,
	}
}

func RecoveryMiddleware(log *zap.Logger, tp trace.TracerProvider) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			tr := tp.Tracer("http")

			ctx, span := tr.Start(r.Context(), "HandleRequest")
			defer span.End()

			zapTrace := zap.Skip()
			if span.SpanContext().HasTraceID() {
				zapTrace = zap.String(otelRequestIDKey, span.SpanContext().TraceID().String())
			}

			ctx, reqId := requestid.WithValue(ctx, r.Header.Get(requestid.HeaderRequestID))

			w.Header().Set(requestid.HeaderRequestID, reqId)

			l := log.With(
				zapTrace,
				zap.String(logRequestIDKey, reqId),
			)

			l.Debug("request",
				zap.String("method", r.Method),
				zap.String("path", r.URL.Path),
			)

			defer func() {
				if v := recover(); v != nil {
					l.Error("panic", zap.Any("error", v))

					span.AddEvent("Panic recovered", trace.WithStackTrace(true))
					span.SetStatus(codes.Error, "Panic recovered")

					w.WriteHeader(http.StatusInternalServerError)
				}
			}()

			ctx = logger.With(ctx, l)

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
