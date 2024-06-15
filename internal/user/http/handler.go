package http

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/rs/zerolog"
	"github.com/vvenger/otus-highload/internal/api"
	"github.com/vvenger/otus-highload/internal/domain"
	"github.com/vvenger/otus-highload/internal/errs"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/pkg/requestid"
	"go.uber.org/fx"
)

type UserService interface {
	Login(ctx context.Context, login, password string) error
	Register(ctx context.Context, user *domain.RegisterRequest) (string, error)
	User(ctx context.Context, id string) (domain.User, error)
}

type HandlerParams struct {
	fx.In
	UserService UserService
	JWTService  jwt.Manager
}

type Handler struct {
	user UserService
	sec  jwt.Manager
}

func NewHandler(p HandlerParams) *Handler {
	return &Handler{
		user: p.UserService,
		sec:  p.JWTService,
	}
}

func (s *Handler) LoginPost(ctx context.Context, req api.OptLoginPostReq) (api.LoginPostRes, error) {
	op := "userHandler.LoginPost"

	m := domain.LoginRequest{
		Login:    string(req.Value.GetID()),
		Password: req.Value.GetPassword(),
	}

	if _, err := uuid.Parse(m.Login); err != nil {
		//nolint:nilerr
		return &api.LoginPostNotFound{}, nil
	}

	err := s.user.Login(ctx, m.Login, m.Password)
	if err != nil {
		if errors.Is(err, errs.ErrNotFound) {
			//nolint:nilerr
			return &api.LoginPostNotFound{}, nil
		}

		v := &api.LoginPostInternalServerError{
			Response: api.R5xx{
				Code:      api.NewOptInt(http.StatusInternalServerError),
				Message:   "Failed to login",
				RequestID: api.NewOptString(requestid.Get(ctx)),
			},
		}

		return v, nil
	}

	tok, err := s.sec.NewToken(domain.JwtToken{
		UserID: m.Login,
	})
	if err != nil {
		zerolog.Ctx(ctx).Error().
			Str("op", op).
			Err(err).
			Msg("could not create token")

		return &api.LoginPostInternalServerError{}, nil
	}

	zerolog.Ctx(ctx).Debug().Str("tok", tok).Send()

	return &api.LoginPostOK{
		Token: api.NewOptString(tok),
	}, nil
}

func (s *Handler) UserRegisterPost(ctx context.Context, req api.OptUserRegisterPostReq) (api.UserRegisterPostRes, error) {
	op := "userHandler.UserRegisterPost"

	m := domain.RegisterRequest{
		FirstName:  req.Value.GetFirstName(),
		SecondName: req.Value.GetSecondName(),
		Birthdate:  time.Time(req.Value.GetBirthdate()),
		City:       req.Value.GetCity(),
		Password:   req.Value.GetPassword(),
	}

	if req.Value.GetBiography().Set {
		v := req.Value.GetBiography().Value
		m.Biography = &v
	}

	id, err := s.user.Register(ctx, &m)
	if err != nil {
		zerolog.Ctx(ctx).Error().
			Str("op", op).
			Err(err).
			Msg("could not register user")

		if errors.Is(err, errs.ErrConflict) {
			return &api.UserRegisterPostBadRequest{}, nil
		}

		return &api.UserRegisterPostInternalServerError{}, nil
	}

	return &api.UserRegisterPostOK{
		UserID: api.NewOptString(id),
	}, nil
}

func (s *Handler) UserGetIDGet(ctx context.Context, params api.UserGetIDGetParams) (api.UserGetIDGetRes, error) {
	if _, err := uuid.Parse(string(params.ID)); err != nil {
		//nolint:nilerr
		return &api.UserGetIDGetNotFound{}, nil
	}

	u, err := s.user.User(ctx, string(params.ID))
	if err != nil {
		if errors.Is(err, errs.ErrNotFound) {
			//nolint:nilerr
			return &api.UserGetIDGetNotFound{}, nil
		}

		return &api.UserGetIDGetInternalServerError{}, nil
	}

	var biography api.OptString
	if u.Biography != nil {
		biography = api.NewOptString(*u.Biography)
	}

	resp := api.User{
		FirstName:  api.NewOptString(u.FirstName),
		SecondName: api.NewOptString(u.SecondName),
		Birthdate:  api.NewOptBirthDate(api.BirthDate(u.Birthdate)),
		City:       api.NewOptString(u.City),
		Biography:  biography,
	}

	return &resp, nil
}
