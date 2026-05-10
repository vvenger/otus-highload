package app

import (
	"github.com/vvenger/otus-highload/internal/feed"
	service "github.com/vvenger/otus-highload/internal/post/services"
	storage "github.com/vvenger/otus-highload/internal/post/storages"
	"github.com/vvenger/otus-highload/internal/web"
	"go.uber.org/fx"
)

var (
	_ web.PostService        = (*service.PostService)(nil)
	_ feed.PostSvc           = (*service.PostService)(nil)
	_ service.PostRepository = (*storage.PostStorage)(nil)
)

func Post() fx.Option {
	return fx.Module("post",
		fx.Provide(
			fx.Annotate(service.NewPostService,
				fx.As(new(web.PostService)),
				fx.As(new(feed.PostSvc)),
			),
			fx.Annotate(storage.NewPostStorage,
				fx.As(new(service.PostRepository)),
			),
		),
	)
}
