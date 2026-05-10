package feed

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	model "github.com/vvenger/otus-highload/internal/post/model"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

const (
	groupName     = "feed-workers"
	consumerName  = "worker-1"
	blockDuration = 5 * time.Second
	batchSize     = 10
)

// FeedUpdater обновляет кэши лент пользователей.
type FeedUpdater interface {
	PushPost(ctx context.Context, userID uuid.UUID, post model.Post) error
	InvalidateFeed(ctx context.Context, userID uuid.UUID) error
}

// FollowerRepo возвращает подписчиков автора.
type Friends interface {
	GetFollowerIDs(ctx context.Context, authorID uuid.UUID) ([]uuid.UUID, error)
}

type WorkerParams struct {
	fx.In
	Redis     *redis.Client
	Logger    *zap.Logger
	Feed      FeedUpdater
	Followers Friends
}

type Worker struct {
	rdb       *redis.Client
	logger    *zap.Logger
	feed      FeedUpdater
	followers Friends
	closed    chan struct{}
	shutdown  chan struct{}
}

func NewWorker(p WorkerParams) *Worker {
	return &Worker{
		rdb:       p.Redis,
		feed:      p.Feed,
		followers: p.Followers,
		logger:    p.Logger.Named("feed.worker"),
		closed:    make(chan struct{}),
		shutdown:  make(chan struct{}),
	}
}

func (w *Worker) Start(ctx context.Context) error {
	err := w.rdb.XGroupCreateMkStream(ctx, model.TopicEvent, groupName, "$").Err()
	if err != nil && !isGroupExistsError(err) {
		return fmt.Errorf("could not create consumer group: %w", err)
	}

	go w.run()

	return nil
}

func (w *Worker) Close(_ context.Context) error {
	close(w.closed)

	select {
	case <-w.shutdown:
	case <-time.After(5 * time.Second):
	}

	return nil
}

func (w *Worker) run() {
	defer close(w.shutdown)

	for {
		select {
		case <-w.closed:
			return
		default:
			w.readBatch(context.Background())
		}
	}
}

func (w *Worker) readBatch(ctx context.Context) {
	args := &redis.XReadGroupArgs{
		Group:    groupName,
		Consumer: consumerName,
		Streams:  []string{model.TopicEvent, ">"},
		Count:    batchSize,
		Block:    blockDuration,
	}

	entries, err := w.rdb.XReadGroup(ctx, args).Result()
	if err != nil {
		if !errors.Is(err, redis.Nil) && ctx.Err() == nil {
			w.logger.Error("read group error", zap.Error(err))
		}

		return
	}

	for _, stream := range entries {
		for _, msg := range stream.Messages {
			w.processMessage(ctx, msg)
		}
	}
}

func (w *Worker) processMessage(ctx context.Context, msg redis.XMessage) {
	ev := parseEvent(msg.Values)

	var err error

	switch ev.Type {
	case "post.created":
		err = w.handleCreated(ctx, ev)
	case "post.updated":
		err = w.handleUpdated(ctx, ev)
	case "post.deleted":
		err = w.handleDeleted(ctx, ev)
	default:
		w.logger.Warn("unknown event type", zap.String("type", ev.Type))
	}

	if err != nil {
		w.logger.Error("process message error",
			zap.String("type", ev.Type),
			zap.String("post_id", ev.PostID),
			zap.Error(err),
		)

		return
	}

	if err := w.rdb.XAck(ctx, model.TopicEvent, groupName, msg.ID).Err(); err != nil {
		w.logger.Warn("could not ack message",
			zap.String("id", msg.ID),
			zap.Error(err),
		)
	}
}

func (w *Worker) handleCreated(ctx context.Context, ev model.Event) error {
	authorID, err := uuid.Parse(ev.AuthorID)
	if err != nil {
		return fmt.Errorf("invalid author_id %q: %w", ev.AuthorID, err)
	}

	postID, err := uuid.Parse(ev.PostID)
	if err != nil {
		return fmt.Errorf("invalid post_id %q: %w", ev.PostID, err)
	}

	followerIDs, err := w.followers.GetFollowerIDs(ctx, authorID)
	if err != nil {
		return fmt.Errorf("could not get follower ids: %w", err)
	}

	post := model.Post{
		ID:        postID,
		Text:      ev.Text,
		AuthorID:  authorID,
		CreatedAt: time.Now().UTC(),
	}

	for _, followerID := range followerIDs {
		if err := w.feed.PushPost(ctx, followerID, post); err != nil {
			w.logger.Warn("could not push post",
				zap.String("follower_id", followerID.String()),
				zap.Error(err),
			)
		}
	}

	return nil
}

func (w *Worker) handleUpdated(ctx context.Context, ev model.Event) error {
	return w.invalidateFollowers(ctx, ev.AuthorID)
}

func (w *Worker) handleDeleted(ctx context.Context, ev model.Event) error {
	return w.invalidateFollowers(ctx, ev.AuthorID)
}

func (w *Worker) invalidateFollowers(ctx context.Context, rawAuthorID string) error {
	authorID, err := uuid.Parse(rawAuthorID)
	if err != nil {
		return fmt.Errorf("invalid author_id %q: %w", rawAuthorID, err)
	}

	followerIDs, err := w.followers.GetFollowerIDs(ctx, authorID)
	if err != nil {
		return fmt.Errorf("could not get follower ids: %w", err)
	}

	for _, followerID := range followerIDs {
		if err := w.feed.InvalidateFeed(ctx, followerID); err != nil {
			w.logger.Warn("could not invalidate feed",
				zap.String("follower_id", followerID.String()),
				zap.Error(err),
			)
		}
	}

	return nil
}

func parseEvent(values map[string]any) model.Event {
	get := func(key string) string {
		if v, ok := values[key]; ok {
			if s, ok := v.(string); ok {
				return s
			}
		}

		return ""
	}

	return model.Event{
		Type:     get("type"),
		PostID:   get("post_id"),
		AuthorID: get("author_id"),
		Text:     get("text"),
	}
}

func isGroupExistsError(err error) bool {
	return err != nil && err.Error() == "BUSYGROUP Consumer Group name already exists"
}
