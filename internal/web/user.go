package web

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/rs/zerolog"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/pkg/requestid"
	model "github.com/vvenger/otus-highload/internal/user/model"
	"github.com/vvenger/otus-highload/internal/web/api"
)

//nolint:nilerr
func (s *handler) LoginPost(ctx context.Context, req api.OptLoginPostReq) (api.LoginPostRes, error) {
	op := "web.user.LoginPost"

	login := string(req.Value.GetID())
	pass := req.Value.GetPassword()

	if _, err := uuid.Parse(login); err != nil {
		return &api.LoginPostNotFound{}, nil
	}

	err := s.user.Login(ctx, login, pass)
	if err != nil {
		if errors.Is(err, model.ErrNotFound) {
			return &api.LoginPostNotFound{}, nil
		}

		zerolog.Ctx(ctx).Error().
			Str("op", op).
			Str("login", login).
			Err(err).
			Msg("could not login")

		v := &api.LoginPostInternalServerError{
			Response: api.R5xx{
				Code:      api.NewOptInt(http.StatusInternalServerError),
				Message:   "Failed to login",
				RequestID: api.NewOptString(requestid.Get(ctx)),
			},
		}

		return v, nil
	}

	tok, err := s.sec.NewToken(jwt.Token{
		UserID: login,
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

func (s *handler) UserRegisterPost(ctx context.Context, req api.OptUserRegisterPostReq) (api.UserRegisterPostRes, error) {
	op := "web.user.UserRegisterPost"

	id, err := s.user.Register(ctx, model.RegisterUser{
		FirstName:  req.Value.GetFirstName(),
		SecondName: req.Value.GetSecondName(),
		Birthdate:  time.Time(req.Value.GetBirthdate()),
		Biography:  req.Value.GetBiography().Value,
		City:       req.Value.GetCity(),
		Password:   req.Value.GetPassword(),
	})
	if err != nil {
		zerolog.Ctx(ctx).Error().
			Str("op", op).
			Err(err).
			Msg("could not register user")

		if errors.Is(err, model.ErrConflict) {
			return &api.UserRegisterPostBadRequest{}, nil
		}

		return &api.UserRegisterPostInternalServerError{}, nil
	}

	return &api.UserRegisterPostOK{
		UserID: api.NewOptString(id),
	}, nil
}

//nolint:nilerr
func (s *handler) UserGetIDGet(ctx context.Context, params api.UserGetIDGetParams) (api.UserGetIDGetRes, error) {
	op := "web.user.UserGetIDGet"

	if _, err := uuid.Parse(string(params.ID)); err != nil {
		return &api.UserGetIDGetNotFound{}, nil
	}

	u, err := s.user.User(ctx, string(params.ID))
	if err != nil {
		if errors.Is(err, model.ErrNotFound) {
			return &api.UserGetIDGetNotFound{}, nil
		}

		zerolog.Ctx(ctx).Error().
			Str("op", op).
			Err(err).
			Msg("could not get user")

		return &api.UserGetIDGetInternalServerError{}, nil
	}

	return &api.User{
		FirstName:  api.NewOptString(u.FirstName),
		SecondName: api.NewOptString(u.SecondName),
		Birthdate:  api.NewOptBirthDate(api.BirthDate(u.Birthdate)),
		City:       api.NewOptString(u.City),
		Biography:  optString(u.Biography),
	}, nil
}
