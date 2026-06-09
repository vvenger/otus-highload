package config

import (
	"fmt"

	"github.com/vvenger/otus-highload/internal/config"
)

type Config struct {
	App  config.AppConfig  `mapstructure:"app"`
	Log  config.LogConfig  `mapstructure:"log"`
	Nats config.NatsConfig `mapstructure:"nats"`
	Otlp config.OtlpConfig `mapstructure:"otlp"`
}

func New() (*Config, error) {
	v := config.NewViper()

	v.SetDefault("app.shutdown_timeout_sec", 5)
	v.SetDefault("app.web.port", 8002)
	v.SetDefault("app.web.read_timeout_sec", 5)
	v.SetDefault("app.web.write_timeout_sec", 5)
	v.SetDefault("log.level", "info")
	v.SetDefault("log.format", "json")
	v.SetDefault("otlp.metrics_port", 4318)
	v.SetDefault("otlp.traces_enabled", false)

	if err := v.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("can't read config: %w", err)
	}

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return nil, fmt.Errorf("can't unmarshal config: %w", err)
	}

	return &cfg, nil
}
