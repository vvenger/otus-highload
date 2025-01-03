package app

import (
	"github.com/vvenger/otus-highload/internal/web"
	"go.uber.org/fx"
)

func HttpService() fx.Option {
	return fx.Module("handler",
		fx.Provide(
			web.NewHttpService,
		),
	)
}
