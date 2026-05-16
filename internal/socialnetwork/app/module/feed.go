package app

import (
	"context"

	"github.com/vvenger/otus-highload/internal/domain/feed"
	friend "github.com/vvenger/otus-highload/internal/domain/friend/service"
	"github.com/vvenger/otus-highload/internal/socialnetwork/web"
	"go.uber.org/fx"
)

var (
	_ feed.FeedUpdater       = (*feed.FeedService)(nil)
	_ friend.FeedInvalidator = (*feed.FeedService)(nil)
	_ web.FeedService        = (*feed.FeedService)(nil)
)

func Feed() fx.Option {
	return fx.Module("feed",
		fx.Provide(
			feed.NewWorker,
			fx.Annotate(feed.NewFeedService,
				fx.As(new(feed.FeedUpdater)),
				fx.As(new(friend.FeedInvalidator)),
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
