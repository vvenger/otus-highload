package app

import (
	"net/http"

	apihttp "github.com/vvenger/otus-highload/internal/httproute"
	"github.com/vvenger/otus-highload/internal/pkg/requestid"

	"github.com/rs/zerolog"
	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/trace"
	"go.uber.org/fx"
)

type RouteParams struct {
	fx.In
	Logger         *zerolog.Logger
	Handler        *apihttp.HttpRoute
	TracerProvider trace.TracerProvider
}

func NewRoute(params RouteParams) http.Handler {
	h := RecoveryMiddleware(params.Logger, params.TracerProvider)(params.Handler)

	return otelhttp.NewHandler(h, "http")
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
