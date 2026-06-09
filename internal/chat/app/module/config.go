package module

import (
	chatconfig "github.com/vvenger/otus-highload/internal/chat/config"
	"github.com/vvenger/otus-highload/internal/config"
	"go.uber.org/fx"
)

func Config() fx.Option {
	return fx.Module("config",
		fx.Provide(
			chatconfig.New,
			func(c *chatconfig.Config) config.AppConfig  { return c.App },
			func(c *chatconfig.Config) config.LogConfig  { return c.Log },
			func(c *chatconfig.Config) config.DBConfig   { return c.DB },
			func(c *chatconfig.Config) config.OtlpConfig { return c.Otlp },
		),
	)
}
