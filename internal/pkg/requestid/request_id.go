package requestid

import (
	"context"

	"github.com/google/uuid"
	"go.opentelemetry.io/otel/trace"
)

type reqID struct{}

func Get(ctx context.Context) string {
	if v, ok := ctx.Value(reqID{}).(string); ok {
		return v
	}

	return ""
}

func New(ctx context.Context, sc trace.SpanContext) (context.Context, string) {
	id := sc.TraceID().String()
	if !sc.HasTraceID() {
		id = uuid.New().String()
	}

	return context.WithValue(ctx, reqID{}, id), id
}
