package module

import (
	"context"

	"github.com/vvenger/otus-highload/internal/wsnotifier/notifier"
	"github.com/vvenger/otus-highload/internal/wsnotifier/web"
	"go.uber.org/fx"
)

func Notifier() fx.Option {
	return fx.Module("notifier",
		fx.Provide(
			notifier.NewNotifier,
			fx.Annotate(notifier.NewFeedService,
				fx.As(new(web.FeedSubscriber)),
			),
		),
		fx.Invoke(func(lc fx.Lifecycle, n *notifier.Notifier) {
			lc.Append(fx.Hook{
				OnStart: func(ctx context.Context) error {
					return n.Start(ctx)
				},
				OnStop: func(ctx context.Context) error {
					return n.Close(ctx)
				},
			})
		}),
	)
}
