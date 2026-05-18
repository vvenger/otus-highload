package module

import (
	"net/http"

	"github.com/vvenger/otus-highload/internal/wsnotifier/web"
	"go.uber.org/fx"
)

var _ http.Handler = (*web.HttpService)(nil)

func HttpService() fx.Option {
	return fx.Module("web",
		fx.Provide(
			web.NewHandler,
			fx.Annotate(web.NewHttpService,
				fx.As(new(http.Handler)),
				fx.ResultTags(`name:"http_server"`),
			),
		),
	)
}
