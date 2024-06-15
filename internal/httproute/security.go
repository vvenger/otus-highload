package httproute

import (
	"context"
	"fmt"

	"github.com/vvenger/otus-highload/internal/api"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
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

	return WithToken(ctx, v), nil
}
