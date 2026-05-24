package app

import (
	"net/http"

	"github.com/vvenger/otus-highload/internal/socialnetwork/web"
	"go.uber.org/fx"
)

func HttpService() fx.Option {
	return fx.Module("handler",
		fx.Provide(
			fx.Annotate(web.NewHttpService,
				fx.As(new(http.Handler)),
				fx.ResultTags(`name:"http_server"`),
			),
		),
	)
}
