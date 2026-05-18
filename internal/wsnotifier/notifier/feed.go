package notifier

import (
	"context"
	"encoding/json"

	nats "github.com/nats-io/nats.go"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type FeedParams struct {
	fx.In
	NC     *nats.Conn
	Logger *zap.Logger
}

type FeedService struct {
	nc     *nats.Conn
	logger *zap.Logger
}

func NewFeedService(p FeedParams) *FeedService {
	return &FeedService{
		nc:     p.NC,
		logger: p.Logger.Named("feed.service"),
	}
}

func (s *FeedService) Subscribe(ctx context.Context, userID string) (<-chan WSPostEvent, error) {
	sub, err := s.nc.SubscribeSync(WsFeedPrefix + userID)
	if err != nil {
		return nil, err
	}

	ch := make(chan WSPostEvent)

	go func() {
		defer close(ch)
		defer sub.Unsubscribe() //nolint:errcheck

		for {
			msg, err := sub.NextMsgWithContext(ctx)
			if err != nil {
				return
			}

			var event WSPostEvent
			if err := json.Unmarshal(msg.Data, &event); err != nil {
				s.logger.Warn("could not unmarshal ws event", zap.Error(err))
				continue
			}

			select {
			case ch <- event:
			case <-ctx.Done():
				return
			}
		}
	}()

	return ch, nil
}
