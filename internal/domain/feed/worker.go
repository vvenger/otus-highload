package feed

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	nats "github.com/nats-io/nats.go"
	model "github.com/vvenger/otus-highload/internal/domain/post/model"
	"github.com/vvenger/otus-highload/internal/domain/topics"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

const (
	fetchBatch   = 10
	fetchTimeout = 5 * time.Second
	shutdownWait = 5 * time.Second
)

type WorkerParams struct {
	fx.In
	JS     nats.JetStreamContext
	Logger *zap.Logger
	Feed   FeedManager
}

type Worker struct {
	js       nats.JetStreamContext
	logger   *zap.Logger
	feed     FeedManager
	closed   chan struct{}
	shutdown chan struct{}
}

func NewWorker(p WorkerParams) *Worker {
	return &Worker{
		js:       p.JS,
		feed:     p.Feed,
		logger:   p.Logger.Named("feed.worker"),
		closed:   make(chan struct{}),
		shutdown: make(chan struct{}),
	}
}

//nolint:contextcheck
func (w *Worker) Start(ctx context.Context) error {
	if err := w.ensureStream(ctx); err != nil {
		return err
	}

	go w.run()

	return nil
}

func (w *Worker) Close(_ context.Context) error {
	close(w.closed)

	select {
	case <-w.shutdown:
	case <-time.After(shutdownWait):
	}

	return nil
}

func (w *Worker) ensureStream(_ context.Context) error {
	_, err := w.js.AddStream(&nats.StreamConfig{
		Name:     topics.StreamName,
		Subjects: []string{topics.TopicFanout},
	})
	if err != nil && !errors.Is(err, nats.ErrStreamNameAlreadyInUse) {
		return fmt.Errorf("could not create stream: %w", err)
	}

	return nil
}

func (w *Worker) run() {
	defer close(w.shutdown)

	sub, err := w.js.PullSubscribe(topics.TopicFanout, topics.CacheConsumer,
		nats.BindStream(topics.StreamName),
	)
	if err != nil {
		w.logger.Error("could not create pull subscription", zap.Error(err))
		return
	}
	defer sub.Unsubscribe() //nolint:errcheck

	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		<-w.closed
		cancel()
	}()

	for {
		select {
		case <-w.closed:
			return
		default:
			w.fetchAndProcess(ctx, sub)
		}
	}
}

func (w *Worker) fetchAndProcess(ctx context.Context, sub *nats.Subscription) {
	msgs, err := sub.Fetch(fetchBatch, nats.MaxWait(fetchTimeout))
	if err != nil {
		if !errors.Is(err, nats.ErrTimeout) && ctx.Err() == nil {
			w.logger.Error("fetch error", zap.Error(err))
		}

		return
	}

	for _, msg := range msgs {
		w.processMessage(ctx, msg)
	}
}

//nolint:errcheck
func (w *Worker) processMessage(ctx context.Context, msg *nats.Msg) {
	var batch FanoutBatch
	if err := json.Unmarshal(msg.Data, &batch); err != nil {
		w.logger.Error("could not unmarshal fanout batch", zap.Error(err))
		msg.Nak()
		return
	}

	if err := w.handleBatch(ctx, batch); err != nil {
		w.logger.Error("could not handle batch",
			zap.String("post_id", batch.PostID),
			zap.Error(err),
		)
		msg.Nak()
		return
	}

	msg.Ack()
}

func (w *Worker) handleBatch(ctx context.Context, batch FanoutBatch) error {
	postID, err := uuid.Parse(batch.PostID)
	if err != nil {
		return fmt.Errorf("invalid post_id %q: %w", batch.PostID, err)
	}

	authorID, err := uuid.Parse(batch.AuthorID)
	if err != nil {
		return fmt.Errorf("invalid author_id %q: %w", batch.AuthorID, err)
	}

	post := model.Post{
		ID:        postID,
		Text:      batch.Text,
		AuthorID:  authorID,
		CreatedAt: time.Now().UTC(),
	}

	for _, rawID := range batch.FollowerIDs {
		followerID, err := uuid.Parse(rawID)
		if err != nil {
			w.logger.Warn("invalid follower_id", zap.String("id", rawID))
			continue
		}

		if err := w.feed.PushPost(ctx, followerID, post); err != nil {
			w.logger.Warn("could not push post",
				zap.String("follower_id", rawID),
				zap.Error(err),
			)
		}
	}

	return nil
}
