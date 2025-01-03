package logger

import (
	"github.com/google/uuid"
	"github.com/ogen-go/ogen/middleware"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/trace"
	"go.uber.org/zap"
)

func LoggerMiddleware(logger *zap.Logger) middleware.Middleware {
	return func(r middleware.Request, next middleware.Next) (middleware.Response, error) {
		reqId := uuid.New().String()

		span := trace.SpanFromContext(r.Context)
		if span.SpanContext().HasTraceID() {
			span.SetAttributes(attribute.String("request_id", reqId))
		}

		l := loggerWithRequest(logger, span.SpanContext(), reqId)

		r.Context = With(r.Context, l)

		return next(r)
	}
}

func loggerWithRequest(l *zap.Logger, sp trace.SpanContext, reqId string) *zap.Logger {
	if sp.HasTraceID() {
		return l.With(
			zap.String("trace_id", sp.TraceID().String()),
			zap.String("request_id", reqId),
		)
	}

	return l.With(
		zap.String("request_id", reqId),
	)
}
