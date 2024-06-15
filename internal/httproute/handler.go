package httproute

import (
	"context"
	"fmt"

	"github.com/vvenger/otus-highload/internal/api"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
)

type handler struct {
	api.UnimplementedHandler
	user UserHandler
	sec  jwt.Manager
}

func (h *handler) LoginPost(ctx context.Context, req api.OptLoginPostReq) (api.LoginPostRes, error) {
	res, err := h.user.LoginPost(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("could not login: %w", err)
	}

	return res, nil
}

func (h *handler) UserRegisterPost(ctx context.Context, req api.OptUserRegisterPostReq) (api.UserRegisterPostRes, error) {
	res, err := h.user.UserRegisterPost(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("could not register: %w", err)
	}

	return res, nil
}

func (h *handler) UserGetIDGet(ctx context.Context, req api.UserGetIDGetParams) (api.UserGetIDGetRes, error) {
	res, err := h.user.UserGetIDGet(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("could not get user: %w", err)
	}

	return res, nil
}
