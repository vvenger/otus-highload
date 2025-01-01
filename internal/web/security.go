package web

import (
	"context"
	"fmt"

	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/web/api"
)

var (
	_ api.SecurityHandler = (*securityHandler)(nil)
)

type securityHandler struct {
	srv jwt.Manager
}

func (s *securityHandler) HandleBearerAuth(
	ctx context.Context,
	operationName string,
	t api.BearerAuth,
) (context.Context, error) {
	v, err := s.srv.Validate(t.GetToken())
	if err != nil {
		return ctx, fmt.Errorf("could not validate token: %w", err)
	}

	return jwt.WithToken(ctx, v), nil
}
