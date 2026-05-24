package app

import (
	"context"

	"github.com/vvenger/otus-highload/internal/domain/feed"
	friend "github.com/vvenger/otus-highload/internal/domain/friend/service"
	"github.com/vvenger/otus-highload/internal/socialnetwork/web"
	"go.uber.org/fx"
)

var (
	_ friend.FeedInvalidator = (*feed.FeedCache)(nil)
	_ feed.FeedManager       = (*feed.FeedCache)(nil)
	_ web.FeedService        = (*feed.FeedService)(nil)
)

func Feed() fx.Option {
	return fx.Module("feed",
		fx.Provide(
			feed.NewWorker,
			fx.Annotate(feed.NewFeedCache,
				fx.As(new(feed.FeedManager)),
				fx.As(new(friend.FeedInvalidator)),
			),
			fx.Annotate(feed.NewFeedService,
				fx.As(new(web.FeedService)),
			),
		),
		fx.Invoke(func(lc fx.Lifecycle, w *feed.Worker) {
			lc.Append(fx.Hook{
				OnStart: func(ctx context.Context) error {
					return w.Start(ctx)
				},
				OnStop: func(ctx context.Context) error {
					return w.Close(ctx)
				},
			})
		}),
	)
}
