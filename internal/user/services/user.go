package user

import (
	"context"
	"fmt"

	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	model "github.com/vvenger/otus-highload/internal/user/model"
	"go.uber.org/fx"
	"go.uber.org/zap"
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
	p, err := s.userRepo.FindLogin(ctx, login)
	if err != nil {
		return fmt.Errorf("could not find user: %w", err)
	}

	if err := model.CheckPassword(password, p); err != nil {
		return model.ErrNotFound
	}

	logger.Ctx(ctx).Debug(
		"loginned successfully",
		zap.String("id", login),
	)

	return nil
}

func (s *UserService) Register(ctx context.Context, user model.RegisterUser) (string, error) {
	p, err := model.HashPassword(user.Password)
	if err != nil {
		return "", fmt.Errorf("could not hash password: %w", err)
	}

	user.Password = p

	id, err := s.userRepo.Register(ctx, user)
	if err != nil {
		return "", fmt.Errorf("could not register user: %w", err)
	}

	logger.Ctx(ctx).Debug(
		"registered successfully",
		zap.String("id", id),
	)

	return id, nil
}

func (s *UserService) User(ctx context.Context, id string) (model.User, error) {
	u, err := s.userRepo.User(ctx, id)
	if err != nil {
		return model.User{}, fmt.Errorf("could not get user: %w", err)
	}

	logger.Ctx(ctx).Debug(
		"registered successfully",
		zap.Any("user", u),
	)

	return u, nil
}
