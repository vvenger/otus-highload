package user

import (
	"context"
	"fmt"

	"github.com/rs/zerolog"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	model "github.com/vvenger/otus-highload/internal/user/model"
	"go.uber.org/fx"
)

type UserRepository interface {
	FindLogin(ctx context.Context, login string) (string, error)
	Register(ctx context.Context, user model.RegisterUser) (string, error)
	User(ctx context.Context, id string) (model.User, error)
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
		return fmt.Errorf("could not find user: %w", err)
	}

	if err := model.CheckPassword(password, p); err != nil {
		return model.ErrNotFound
	}

	zerolog.Ctx(ctx).Debug().
		Str("op", op).
		Str("id", login).
		Msg("loginned successfully")

	return nil
}

func (s *UserService) Register(ctx context.Context, user model.RegisterUser) (string, error) {
	op := "user.UserService.Register"

	zerolog.Ctx(ctx).Debug().
		Str("op", op).
		Any("user", user).
		Send()

	p, err := model.HashPassword(user.Password)
	if err != nil {
		return "", fmt.Errorf("could not hash password: %w", err)
	}

	user.Password = p

	id, err := s.userRepo.Register(ctx, user)
	if err != nil {
		return "", fmt.Errorf("could not register user: %w", err)
	}

	zerolog.Ctx(ctx).Debug().
		Str("op", op).
		Str("id", id).
		Msg("registered successfully")

	return id, nil
}

func (s *UserService) User(ctx context.Context, id string) (model.User, error) {
	op := "user.UserService.User"

	u, err := s.userRepo.User(ctx, id)
	if err != nil {
		return model.User{}, fmt.Errorf("could not get user: %w", err)
	}

	zerolog.Ctx(ctx).Debug().
		Str("op", op).
		Any("user", u).
		Send()

	return u, nil
}
