package jwt

import (
	"context"
)

type ctxToken struct{}

func WithToken(ctx context.Context, tok Token) context.Context {
	return context.WithValue(ctx, ctxToken{}, tok)
}

func Ctx(ctx context.Context) (Token, bool) {
	if v, ok := ctx.Value(ctxToken{}).(Token); ok {
		return v, true
	}

	return Token{}, false
}
