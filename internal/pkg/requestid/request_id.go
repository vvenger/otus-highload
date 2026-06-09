package requestid

import (
	"context"

	"github.com/google/uuid"
)

const HeaderRequestID = "x-request-id"

type (
	reqID struct{}
)

func Get(ctx context.Context) string {
	if v, ok := ctx.Value(reqID{}).(string); ok {
		return v
	}

	return ""
}

func WithValue(ctx context.Context, id string) (context.Context, string) {
	if id == "" {
		id = uuid.New().String()
	}

	return context.WithValue(ctx, reqID{}, id), id
}
