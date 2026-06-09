package module

import (
	"github.com/vvenger/otus-highload/internal/config"
	wsconfig "github.com/vvenger/otus-highload/internal/wsnotifier/config"
	"go.uber.org/fx"
)

func Config() fx.Option {
	return fx.Module("config",
		fx.Provide(
			wsconfig.New,
			func(c *wsconfig.Config) config.AppConfig  { return c.App },
			func(c *wsconfig.Config) config.LogConfig  { return c.Log },
			func(c *wsconfig.Config) config.NatsConfig { return c.Nats },
			func(c *wsconfig.Config) config.OtlpConfig { return c.Otlp },
		),
	)
}
