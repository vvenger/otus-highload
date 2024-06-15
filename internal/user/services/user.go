package services

import (
	"context"
	"errors"
	"fmt"

	"github.com/rs/zerolog"
	"github.com/vvenger/otus-highload/internal/domain"
	"github.com/vvenger/otus-highload/internal/errs"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"go.uber.org/fx"
	"golang.org/x/crypto/bcrypt"
)

type UserRepository interface {
	FindLogin(ctx context.Context, login string) (string, error)
	Register(ctx context.Context, user *domain.RegisterRequest) (string, error)
	User(ctx context.Context, id string) (domain.User, error)
}

type ServiceParams struct {
	fx.In
	JWT      jwt.Manager
	UserRepo UserRepository
}

type UserService struct {
	userRepo   UserRepository
	jwtManager jwt.Manager
}

func NewUserService(p ServiceParams) *UserService {
	return &UserService{
		jwtManager: p.JWT,
		userRepo:   p.UserRepo,
	}
}

func (s *UserService) Login(ctx context.Context, login, password string) error {
	op := "user.UserService.Login"

	p, err := s.userRepo.FindLogin(ctx, login)
	if err != nil {
		if errors.Is(err, errs.ErrNotFound) {
			return fmt.Errorf("could not find user: %w", err)
		}

		zerolog.Ctx(ctx).Error().
			Str("op", op).
			Err(err).
			Msg("could not repository login")

		return errs.ErrInternalServerError
	}

	if err := checkPassword(password, p); err != nil {
		return errs.ErrInvalidParams
	}

	zerolog.Ctx(ctx).Debug().
		Str("op", op).
		Str("id", login).
		Msg("loginned successfully")

	return nil
}

func (s *UserService) Register(ctx context.Context, user *domain.RegisterRequest) (string, error) {
	op := "user.UserService.Register"

	p, err := hashPassword(user.Password)
	if err != nil {
		zerolog.Ctx(ctx).Error().
			Str("op", op).
			Err(err).
			Msg("could not hash password")

		return "", errs.ErrInternalServerError
	}

	user.Password = p

	id, err := s.userRepo.Register(ctx, user)
	if err != nil {
		zerolog.Ctx(ctx).Error().
			Str("op", op).
			Err(err).
			Msg("could not repository register")

		if errors.Is(err, errs.ErrConflict) {
			return "", errs.ErrConflict
		}

		return "", errs.ErrInternalServerError
	}

	zerolog.Ctx(ctx).Debug().
		Str("op", op).
		Str("id", id).
		Msg("registered successfully")

	return id, nil
}

func (s *UserService) User(ctx context.Context, id string) (domain.User, error) {
	op := "user.UserService.User"

	u, err := s.userRepo.User(ctx, id)
	if err != nil {
		if !errors.Is(err, errs.ErrNotFound) {
			zerolog.Ctx(ctx).Error().
				Str("op", op).
				Err(err).
				Msg("could not get repository user")

			return domain.User{}, errs.ErrInternalServerError
		}

		return domain.User{}, errs.ErrNotFound
	}

	zerolog.Ctx(ctx).Debug().
		Str("op", op).
		Any("user", u).
		Send()

	return u, nil
}

//nolint:wrapcheck
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	return string(bytes), err
}

//nolint:wrapcheck
func checkPassword(password, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}
