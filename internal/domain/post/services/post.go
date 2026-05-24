package post

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/google/uuid"
	nats "github.com/nats-io/nats.go"
	model "github.com/vvenger/otus-highload/internal/domain/post/model"
	"github.com/vvenger/otus-highload/internal/domain/topics"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

const fanoutBatchSize = 100

type PostRepository interface {
	Create(ctx context.Context, req model.CreatePost) (uuid.UUID, error)
	Update(ctx context.Context, req model.UpdatePost) error
	Delete(ctx context.Context, id uuid.UUID) error
	GetByID(ctx context.Context, id uuid.UUID) (model.Post, error)
	Posts(ctx context.Context, filter model.FeedFilter) ([]model.Post, error)
}

type FollowerRepository interface {
	GetFollowerIDs(ctx context.Context, authorID uuid.UUID) ([]uuid.UUID, error)
}

type ServiceParams struct {
	fx.In
	Repo      PostRepository
	Followers FollowerRepository
	JS        nats.JetStreamContext
}

type PostService struct {
	repo      PostRepository
	followers FollowerRepository
	js        nats.JetStreamContext
}

func NewPostService(p ServiceParams) *PostService {
	return &PostService{
		repo:      p.Repo,
		followers: p.Followers,
		js:        p.JS,
	}
}

func (s *PostService) Create(ctx context.Context, req model.CreatePost) (uuid.UUID, error) {
	id, err := s.repo.Create(ctx, req)
	if err != nil {
		return uuid.Nil, fmt.Errorf("could not create post: %w", err)
	}

	go func(ctx context.Context) {
		ctx = context.WithoutCancel(ctx)
		s.publishFanout(ctx, id, req.AuthorID, req.Text)
	}(ctx)

	return id, nil
}

func (s *PostService) Update(ctx context.Context, req model.UpdatePost) error {
	if err := s.repo.Update(ctx, req); err != nil {
		return fmt.Errorf("could not update post: %w", err)
	}

	return nil
}

func (s *PostService) Delete(ctx context.Context, id uuid.UUID) error {
	if err := s.repo.Delete(ctx, id); err != nil {
		return fmt.Errorf("could not delete post: %w", err)
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

func (s *PostService) publishFanout(ctx context.Context, postID, authorID uuid.UUID, text string) {
	followerIDs, err := s.followers.GetFollowerIDs(ctx, authorID)
	if err != nil {
		logger.Ctx(ctx).Warn("could not get follower ids", zap.Error(err))
		return
	}

	followerIDs = append(followerIDs, authorID)

	for i := 0; i < len(followerIDs); i += fanoutBatchSize {
		end := min(i+fanoutBatchSize, len(followerIDs))
		batch := followerIDs[i:end]

		ids := make([]string, len(batch))
		for j, id := range batch {
			ids[j] = id.String()
		}

		payload, err := json.Marshal(model.FanoutBatch{
			PostID:      postID.String(),
			AuthorID:    authorID.String(),
			Text:        text,
			FollowerIDs: ids,
		})
		if err != nil {
			logger.Ctx(ctx).Error("could not marshal fanout batch", zap.Error(err))
			continue
		}

		if _, err := s.js.Publish(topics.TopicFanout, payload); err != nil {
			logger.Ctx(ctx).Error("could not publish fanout batch", zap.Error(err))
		}
	}
}
