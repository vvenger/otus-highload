package app

import (
	"github.com/vvenger/otus-highload/internal/socialnetwork/web"
	webproxy "github.com/vvenger/otus-highload/internal/socialnetwork/web_proxy"
	"go.uber.org/fx"
)

func HttpService() fx.Option {
	return fx.Module("handler",
		fx.Provide(
			web.NewHttpService,
			fx.Annotate(webproxy.NewDialogProxy,
				fx.ResultTags(`name:"proxy_dialog"`),
			),
			fx.Annotate(NewHttpServer,
				fx.ResultTags(`name:"http_server"`),
			),
		),
	)
}
