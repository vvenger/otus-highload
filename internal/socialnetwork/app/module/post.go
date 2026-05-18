package app

import (
	"github.com/vvenger/otus-highload/internal/domain/feed"
	postservice "github.com/vvenger/otus-highload/internal/domain/post/services"
	storage "github.com/vvenger/otus-highload/internal/domain/post/storages"
	"github.com/vvenger/otus-highload/internal/socialnetwork/web"
	"go.uber.org/fx"
)

var (
	_ web.PostService            = (*postservice.PostService)(nil)
	_ feed.PostSvc               = (*postservice.PostService)(nil)
	_ postservice.PostRepository = (*storage.PostStorage)(nil)
)

func Post() fx.Option {
	return fx.Module("post",
		fx.Provide(
			fx.Annotate(postservice.NewPostService,
				fx.As(new(web.PostService)),
				fx.As(new(feed.PostSvc)),
			),
			fx.Annotate(storage.NewPostStorage,
				fx.As(new(postservice.PostRepository)),
			),
		),
	)
}
