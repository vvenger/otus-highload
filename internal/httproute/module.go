package httproute

import (
	"go.uber.org/fx"
)

func Module() fx.Option {
	opt := fx.Module("httpserver",
		fx.Provide(
			NewHttpRoute,
		),
	)

	return opt
}
