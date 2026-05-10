package post

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	model "github.com/vvenger/otus-highload/internal/post/model"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type PostRepository interface {
	Create(ctx context.Context, req model.CreatePost) (uuid.UUID, error)
	Update(ctx context.Context, req model.UpdatePost) error
	Delete(ctx context.Context, id uuid.UUID) error
	GetByID(ctx context.Context, id uuid.UUID) (model.Post, error)
	Posts(ctx context.Context, filter model.FeedFilter) ([]model.Post, error)
}

type ServiceParams struct {
	fx.In
	Repo  PostRepository
	Redis *redis.Client
}

type PostService struct {
	repo PostRepository
	rdb  *redis.Client
}

func NewPostService(p ServiceParams) *PostService {
	return &PostService{
		repo: p.Repo,
		rdb:  p.Redis,
	}
}

func (s *PostService) Create(ctx context.Context, req model.CreatePost) (uuid.UUID, error) {
	id, err := s.repo.Create(ctx, req)
	if err != nil {
		return uuid.Nil, fmt.Errorf("could not create post: %w", err)
	}

	if err := s.PublishEvent(ctx, model.Event{
		Type:     model.EventTypeCreated,
		PostID:   id.String(),
		AuthorID: req.AuthorID.String(),
		Text:     req.Text,
	}); err != nil {
		logger.Ctx(ctx).Warn("could not publish post.created event", zap.Error(err))
	}

	return id, nil
}

func (s *PostService) Update(ctx context.Context, req model.UpdatePost) error {
	p, err := s.repo.GetByID(ctx, req.ID)
	if err != nil {
		return fmt.Errorf("could not get post: %w", err)
	}

	if err := s.repo.Update(ctx, req); err != nil {
		return fmt.Errorf("could not update post: %w", err)
	}

	if err := s.PublishEvent(ctx, model.Event{
		Type:     model.EventTypeUpdated,
		PostID:   req.ID.String(),
		AuthorID: p.AuthorID.String(),
		Text:     req.Text,
	}); err != nil {
		logger.Ctx(ctx).Warn("could not publish post.updated event", zap.Error(err))
	}

	return nil
}

func (s *PostService) Delete(ctx context.Context, id uuid.UUID) error {
	p, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return fmt.Errorf("could not get post: %w", err)
	}

	if err := s.repo.Delete(ctx, id); err != nil {
		return fmt.Errorf("could not delete post: %w", err)
	}

	if err := s.PublishEvent(ctx, model.Event{
		Type:     model.EventTypeDeleted,
		PostID:   id.String(),
		AuthorID: p.AuthorID.String(),
	}); err != nil {
		logger.Ctx(ctx).Warn("could not publish post.deleted event", zap.Error(err))
	}

	return nil
}

func (s *PostService) GetByID(ctx context.Context, id uuid.UUID) (model.Post, error) {
	p, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return model.Post{}, fmt.Errorf("could not get post: %w", err)
	}

	return p, nil
}

func (s *PostService) Posts(ctx context.Context, filter model.FeedFilter) ([]model.Post, error) {
	posts, err := s.repo.Posts(ctx, filter)
	if err != nil {
		return nil, fmt.Errorf("could not get feed: %w", err)
	}

	return posts, nil
}

func (c *PostService) PublishEvent(ctx context.Context, ev model.Event) error {
	args := &redis.XAddArgs{
		Stream: model.TopicEvent,
		Values: map[string]any{
			"type":      ev.Type,
			"post_id":   ev.PostID,
			"author_id": ev.AuthorID,
			"text":      ev.Text,
		},
	}

	if err := c.rdb.XAdd(ctx, args).Err(); err != nil {
		return fmt.Errorf("could not publish event: %w", err)
	}

	return nil
}
