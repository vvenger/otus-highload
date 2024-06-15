package httproute

import (
	"context"

	"github.com/vvenger/otus-highload/internal/domain"
)

type userToken struct{}

func WithToken(ctx context.Context, user domain.JwtToken) context.Context {
	return context.WithValue(ctx, userToken{}, user)
}

func TokenCtx(ctx context.Context) (domain.JwtToken, bool) {
	v, ok := ctx.Value(userToken{}).(domain.JwtToken)
	if !ok {
		return domain.JwtToken{}, false
	}

	return v, true
}
