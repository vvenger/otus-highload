package friend

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	model "github.com/vvenger/otus-highload/internal/domain/friend/model"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type FriendRepository interface {
	Add(ctx context.Context, req model.UserFriend) error
	Delete(ctx context.Context, req model.UserFriend) error
	GetFriendIDs(ctx context.Context, userID uuid.UUID) ([]uuid.UUID, error)
	GetFollowerIDs(ctx context.Context, authorID uuid.UUID) ([]uuid.UUID, error)
}

// FeedInvalidator инвалидирует кэш ленты при изменении списка друзей.
type FeedInvalidator interface {
	InvalidateFeed(ctx context.Context, userID uuid.UUID) error
}

type ServiceParams struct {
	fx.In
	Repo        FriendRepository
	Invalidator FeedInvalidator
}

type FriendService struct {
	repo        FriendRepository
	invalidator FeedInvalidator
}

func NewFriendService(p ServiceParams) *FriendService {
	return &FriendService{
		repo:        p.Repo,
		invalidator: p.Invalidator,
	}
}

func (s *FriendService) Add(ctx context.Context, req model.UserFriend) error {
	if err := s.repo.Add(ctx, req); err != nil {
		return fmt.Errorf("could not add friend: %w", err)
	}

	// Инвалидируем кэш ленты пользователя — новый друг появился
	if err := s.invalidator.InvalidateFeed(ctx, req.UserID); err != nil {
		logger.Ctx(ctx).Warn("could not invalidate feed cache", zap.Error(err))
	}

	return nil
}

func (s *FriendService) Delete(ctx context.Context, req model.UserFriend) error {
	if err := s.repo.Delete(ctx, req); err != nil {
		return fmt.Errorf("could not delete friend: %w", err)
	}

	// Инвалидируем кэш ленты пользователя — друг удалён
	if err := s.invalidator.InvalidateFeed(ctx, req.UserID); err != nil {
		logger.Ctx(ctx).Warn("could not invalidate feed cache", zap.Error(err))
	}

	return nil
}

func (s *FriendService) GetFriendIDs(ctx context.Context, userID uuid.UUID) ([]uuid.UUID, error) {
	ids, err := s.repo.GetFriendIDs(ctx, userID)
	if err != nil {
		return nil, fmt.Errorf("could not get friend ids: %w", err)
	}

	return ids, nil
}

func (s *FriendService) GetFollowerIDs(ctx context.Context, authorID uuid.UUID) ([]uuid.UUID, error) {
	ids, err := s.repo.GetFollowerIDs(ctx, authorID)
	if err != nil {
		return nil, fmt.Errorf("could not get followers ids: %w", err)
	}

	return ids, nil
}
