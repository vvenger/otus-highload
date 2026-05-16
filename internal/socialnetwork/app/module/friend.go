package app

import (
	"github.com/vvenger/otus-highload/internal/domain/feed"
	service "github.com/vvenger/otus-highload/internal/domain/friend/service"
	storage "github.com/vvenger/otus-highload/internal/domain/friend/storage"
	"github.com/vvenger/otus-highload/internal/socialnetwork/web"
	"go.uber.org/fx"
)

var (
	_ web.FriendService        = (*service.FriendService)(nil)
	_ service.FriendRepository = (*storage.FriendStorage)(nil)
	_ feed.Friends             = (*service.FriendService)(nil)
)

func Friend() fx.Option {
	return fx.Module("friend",
		fx.Provide(
			fx.Annotate(service.NewFriendService,
				fx.As(new(web.FriendService)),
				fx.As(new(feed.Friends)),
			),
			fx.Annotate(storage.NewFriendStorage,
				fx.As(new(service.FriendRepository)),
			),
		),
	)
}
