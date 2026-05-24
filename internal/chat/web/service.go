package web

import (
	"context"
	"fmt"

	"github.com/vvenger/otus-highload/internal/chat/web/api"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"go.uber.org/fx"
)

type ServiceParams struct {
	fx.In
	Dialog     DialogService
	JWTService jwt.Manager
}

type HttpService struct {
	*api.Server
}

func NewHttpService(p ServiceParams) (*HttpService, error) {
	h := &chatHandler{
		dialog: p.Dialog,
	}

	sec := &securityHandler{srv: p.JWTService}

	srv, err := api.NewServer(h, sec)
	if err != nil {
		return nil, fmt.Errorf("could not create chat http server: %w", err)
	}

	return &HttpService{srv}, nil
}

type securityHandler struct {
	srv jwt.Manager
}

func (s *securityHandler) HandleBearerAuth(
	ctx context.Context,
	_ string,
	t api.BearerAuth,
) (context.Context, error) {
	v, err := s.srv.Validate(t.GetToken())
	if err != nil {
		return ctx, fmt.Errorf("could not validate token: %w", err)
	}

	return jwt.WithToken(ctx, v), nil
}
