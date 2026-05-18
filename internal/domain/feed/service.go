package feed

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	model "github.com/vvenger/otus-highload/internal/domain/post/model"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type PostSvc interface {
	Posts(ctx context.Context, filter model.FeedFilter) ([]model.Post, error)
}

type FeedManager interface {
	GetFeed(ctx context.Context, filter model.FeedFilter) ([]model.Post, error)
	SetFeed(ctx context.Context, userID uuid.UUID, posts []model.Post) error
	PushPost(ctx context.Context, userID uuid.UUID, post model.Post) error
	InvalidateFeed(ctx context.Context, userID uuid.UUID) error
}

type FeedServiceParams struct {
	fx.In
	Logger *zap.Logger
	Posts  PostSvc
	Feed   FeedManager
}

type FeedService struct {
	cache  FeedManager
	logger *zap.Logger
	posts  PostSvc
}

func NewFeedService(p FeedServiceParams) *FeedService {
	return &FeedService{
		cache:  p.Feed,
		logger: p.Logger.Named("feed"),
		posts:  p.Posts,
	}
}

func (s *FeedService) GetFeed(ctx context.Context, filter model.FeedFilter) ([]model.Post, error) {
	// Запросы за пределами кэша идут напрямую в БД с оригинальным offset/limit.
	if filter.Offset >= feedMaxLen {
		posts, err := s.posts.Posts(ctx, filter)
		if err != nil {
			return nil, fmt.Errorf("could not get posts: %w", err)
		}

		return posts, nil
	}

	posts, err := s.cache.GetFeed(ctx, filter)
	if err == nil {
		return posts, nil
	}

	if !errors.Is(err, model.ErrNotFound) {
		return nil, fmt.Errorf("could not get feed from cache: %w", err)
	}

	dbPosts, err := s.posts.Posts(ctx, model.FeedFilter{
		AuthorIDs: filter.AuthorIDs,
		Limit:     feedMaxLen,
	})
	if err != nil {
		return nil, fmt.Errorf("could not get posts: %w", err)
	}

	if err = s.cache.SetFeed(ctx, filter.UserID, dbPosts); err != nil {
		s.logger.Error("could not set feed cache", zap.Error(err))
	}

	offset := filter.Offset
	if offset >= len(dbPosts) {
		return nil, nil
	}

	return dbPosts[offset:min(offset+filter.Limit, len(dbPosts))], nil
}
