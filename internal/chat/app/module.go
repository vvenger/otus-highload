package app

import (
	"context"

	"github.com/tarantool/go-tarantool/v2"
	"go.uber.org/fx"
)

func TarantoolModule() fx.Option {
	return fx.Module("tarantool",
		fx.Provide(
			NewTarantool,
		),
		fx.Invoke(func(lc fx.Lifecycle, conn *tarantool.Connection) {
			if conn == nil {
				return
			}
			lc.Append(fx.Hook{
				OnStop: func(_ context.Context) error {
					return conn.Close()
				},
			})
		}),
	)
}
