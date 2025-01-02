package app

import (
	"fmt"
	"net/http"
	"time"

	"github.com/rs/zerolog"
	"github.com/vvenger/otus-highload/internal/config"
	"github.com/vvenger/otus-highload/internal/pkg/requestid"
	"github.com/vvenger/otus-highload/internal/web"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/trace"
	"go.uber.org/fx"
)

var (
	_ http.Handler = (*web.HttpService)(nil)
)

type WebServer struct {
	*http.Server
	ShutdownTimeout time.Duration
}

type WebServerParams struct {
	fx.In
	Config         *config.Config
	Logger         *zerolog.Logger
	TracerProvider trace.TracerProvider
	WebService     *web.HttpService
}

func NewWebServer(params WebServerParams) *WebServer {
	read := defaultReadTimeout
	if params.Config.App.Web.ReadTimeout != 0 {
		read = time.Duration(params.Config.App.Web.ReadTimeout) * time.Second
	}

	write := defaultWriteTimeout
	if params.Config.App.Web.ReadTimeout != 0 {
		write = time.Duration(params.Config.App.Web.WriteTimeout) * time.Second
	}

	shutdown := defaultShutdown
	if params.Config.App.Shutdown != 0 {
		write = time.Duration(params.Config.App.Shutdown) * time.Second
	}

	route := RecoveryMiddleware(params.Logger, params.TracerProvider)(params.WebService)

	return &WebServer{
		Server: &http.Server{
			Addr:         fmt.Sprintf(":%d", params.Config.App.Web.Port),
			ReadTimeout:  read,
			WriteTimeout: write,
			Handler:      otelhttp.NewHandler(route, "http"),
		},
		ShutdownTimeout: shutdown,
	}
}

func RecoveryMiddleware(logger *zerolog.Logger, tp trace.TracerProvider) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			tr := tp.Tracer("http")

			ctx, span := tr.Start(r.Context(), "HandleRequest")
			defer span.End()

			ctx, req_id := requestid.New(ctx, span.SpanContext())

			l := logger.With().Str("trace_id", req_id).Logger()

			l.Debug().
				Str("method", r.Method).
				Str("path", r.URL.Path).
				Send()

			defer func() {
				if err := recover(); err != nil {
					l.Error().Interface("error", err).Msg("panic")

					span.AddEvent("Panic recovered", trace.WithStackTrace(true))
					span.SetStatus(codes.Error, "Panic recovered")

					w.WriteHeader(http.StatusInternalServerError)
				}
			}()

			ctx = l.WithContext(ctx)

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
