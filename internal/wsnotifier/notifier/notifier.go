package notifier

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	nats "github.com/nats-io/nats.go"
	"github.com/vvenger/otus-highload/internal/domain/topics"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

const (
	streamName = "FEED_FANOUT"

	// wsFeedPrefix = "ws.feed."
	fetchBatch   = 10
	fetchTimeout = 5 * time.Second
	shutdownWait = 5 * time.Second
)

type NotifierParams struct {
	fx.In
	NC     *nats.Conn
	JS     nats.JetStreamContext
	Logger *zap.Logger
}

type Notifier struct {
	nc       *nats.Conn
	js       nats.JetStreamContext
	logger   *zap.Logger
	closed   chan struct{}
	shutdown chan struct{}
}

func NewNotifier(p NotifierParams) *Notifier {
	return &Notifier{
		nc:       p.NC,
		js:       p.JS,
		logger:   p.Logger.Named("wsnotifier"),
		closed:   make(chan struct{}),
		shutdown: make(chan struct{}),
	}
}

func (n *Notifier) Start(_ context.Context) error {
	if n.js == nil {
		return fmt.Errorf("NATS JetStream is not configured")
	}

	if err := n.ensureStream(); err != nil {
		return err
	}

	go n.run()

	return nil
}

func (n *Notifier) Close(_ context.Context) error {
	close(n.closed)

	select {
	case <-n.shutdown:
	case <-time.After(shutdownWait):
	}

	return nil
}

func (n *Notifier) ensureStream() error {
	_, err := n.js.AddStream(&nats.StreamConfig{
		Name:     streamName,
		Subjects: []string{topics.TopicFanout},
	})
	if err != nil && !errors.Is(err, nats.ErrStreamNameAlreadyInUse) {
		return fmt.Errorf("could not create stream: %w", err)
	}

	return nil
}

func (n *Notifier) run() {
	defer close(n.shutdown)

	sub, err := n.js.PullSubscribe(topics.TopicFanout, topics.NotifierConsumer,
		nats.BindStream(streamName),
	)
	if err != nil {
		n.logger.Error("could not create pull subscription", zap.Error(err))
		return
	}
	defer sub.Unsubscribe() //nolint:errcheck

	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		<-n.closed
		cancel()
	}()

	for {
		select {
		case <-n.closed:
			return
		default:
			n.fetchAndProcess(ctx, sub)
		}
	}
}

func (n *Notifier) fetchAndProcess(ctx context.Context, sub *nats.Subscription) {
	msgs, err := sub.Fetch(fetchBatch, nats.MaxWait(fetchTimeout))
	if err != nil {
		if !errors.Is(err, nats.ErrTimeout) && ctx.Err() == nil {
			n.logger.Error("fetch error", zap.Error(err))
		}

		return
	}

	for _, msg := range msgs {
		n.processMessage(ctx, msg)
	}
}

//nolint:errcheck
func (n *Notifier) processMessage(_ context.Context, msg *nats.Msg) {
	var batch FanoutBatch
	if err := json.Unmarshal(msg.Data, &batch); err != nil {
		n.logger.Error("could not unmarshal fanout batch", zap.Error(err))
		msg.Nak()
		return
	}

	event := WSPostEvent{
		PostID:       batch.PostID,
		PostText:     batch.Text,
		AuthorUserID: batch.AuthorID,
	}

	payload, err := json.Marshal(event)
	if err != nil {
		n.logger.Error("could not marshal ws event", zap.Error(err))
		msg.Nak()
		return
	}

	for _, followerID := range batch.FollowerIDs {
		if err := n.nc.Publish(WsFeedPrefix+followerID, payload); err != nil {
			n.logger.Warn("could not publish ws event",
				zap.String("follower_id", followerID),
				zap.Error(err),
			)
		}
	}

	msg.Ack()
}
