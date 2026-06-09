package app

import (
	"github.com/vvenger/otus-highload/internal/config"
	snconfig "github.com/vvenger/otus-highload/internal/socialnetwork/config"
	"go.uber.org/fx"
)

func Config() fx.Option {
	return fx.Module("config",
		fx.Provide(
			snconfig.New,
			func(c *snconfig.Config) config.AppConfig      { return c.App },
			func(c *snconfig.Config) config.LogConfig      { return c.Log },
			func(c *snconfig.Config) config.DBConfig       { return c.DB },
			func(c *snconfig.Config) config.RedisConfig    { return c.Redis },
			func(c *snconfig.Config) config.NatsConfig     { return c.Nats },
			func(c *snconfig.Config) config.OtlpConfig     { return c.Otlp },
			func(c *snconfig.Config) snconfig.ChatConfig   { return c.Chat },
		),
	)
}
