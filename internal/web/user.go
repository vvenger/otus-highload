package web

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	"github.com/vvenger/otus-highload/internal/pkg/requestid"
	model "github.com/vvenger/otus-highload/internal/user/model"
	"github.com/vvenger/otus-highload/internal/web/api"
	"go.uber.org/zap"
)

//nolint:nilerr
func (s *handler) LoginPost(ctx context.Context, req api.OptLoginPostReq) (api.LoginPostRes, error) {
	login := string(req.Value.GetID())
	pass := req.Value.GetPassword()

	if _, err := uuid.Parse(login); err != nil {
		return &api.LoginPostNotFound{}, nil
	}

	if err := s.user.Login(ctx, login, pass); err != nil {
		if errors.Is(err, model.ErrNotFound) {
			return &api.LoginPostNotFound{}, nil
		}

		logger.Ctx(ctx).Error(
			"could not login",
			zap.String("login", login),
			zap.Error(err),
		)

		return &api.LoginPostInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	tok, err := s.sec.NewToken(jwt.Token{
		UserID: login,
	})
	if err != nil {
		logger.Ctx(ctx).Error(
			"LoginPost",
			zap.Error(err),
		)

		return &api.LoginPostInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	logger.Ctx(ctx).Debug(
		"LoginPost",
		zap.String("token", tok),
	)

	return &api.LoginPostOK{
		Token: api.NewOptString(tok),
	}, nil
}

func (s *handler) UserRegisterPost(ctx context.Context, req api.OptUserRegisterPostReq) (api.UserRegisterPostRes, error) {
	id, err := s.user.Register(ctx, model.RegisterUser{
		FirstName:  req.Value.GetFirstName(),
		SecondName: req.Value.GetSecondName(),
		Birthdate:  time.Time(req.Value.GetBirthdate()),
		Biography:  req.Value.GetBiography().Value,
		City:       req.Value.GetCity(),
		Password:   req.Value.GetPassword(),
	})
	if err != nil {
		logger.Ctx(ctx).Error(
			"UserRegisterPost",
			zap.Error(err),
		)

		if errors.Is(err, model.ErrConflict) {
			return &api.UserRegisterPostBadRequest{}, nil
		}

		return &api.UserRegisterPostInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	return &api.UserRegisterPostOK{
		UserID: api.NewOptString(id),
	}, nil
}

//nolint:nilerr
func (s *handler) UserGetIDGet(ctx context.Context, params api.UserGetIDGetParams) (api.UserGetIDGetRes, error) {
	if _, err := uuid.Parse(string(params.ID)); err != nil {
		return &api.UserGetIDGetNotFound{}, nil
	}

	u, err := s.user.User(ctx, string(params.ID))
	if err != nil {
		if errors.Is(err, model.ErrNotFound) {
			return &api.UserGetIDGetNotFound{}, nil
		}

		logger.Ctx(ctx).Error(
			"UserGetIDGet",
			zap.Error(err),
		)

		return &api.UserGetIDGetInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	return &api.User{
		FirstName:  api.NewOptString(u.FirstName),
		SecondName: api.NewOptString(u.SecondName),
		Birthdate:  api.NewOptBirthDate(api.BirthDate(u.Birthdate)),
		City:       api.NewOptString(u.City),
		Biography:  optString(u.Biography),
	}, nil
}
