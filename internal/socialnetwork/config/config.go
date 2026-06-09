package config

import (
	"fmt"

	"github.com/vvenger/otus-highload/internal/config"
)

type Config struct {
	App   config.AppConfig   `mapstructure:"app"`
	Log   config.LogConfig   `mapstructure:"log"`
	DB    config.DBConfig    `mapstructure:"db"`
	Redis config.RedisConfig `mapstructure:"redis"`
	Nats  config.NatsConfig  `mapstructure:"nats"`
	Otlp  config.OtlpConfig  `mapstructure:"otlp"`
	Chat  ChatConfig         `mapstructure:"chat"`
}

type ChatConfig struct {
	URL     string `mapstructure:"url"`
	Timeout int    `mapstructure:"timeout_sec"`
}

func New() (*Config, error) {
	v := config.NewViper()

	v.SetDefault("app.shutdown_timeout_sec", 5)
	v.SetDefault("app.web.port", 8000)
	v.SetDefault("app.web.read_timeout_sec", 5)
	v.SetDefault("app.web.write_timeout_sec", 5)
	v.SetDefault("app.web.retry_after_sec", 5)
	v.SetDefault("log.level", "info")
	v.SetDefault("log.format", "json")
	v.SetDefault("db.max_conns", 4)
	v.SetDefault("db.min_conns", 1)
	v.SetDefault("db.exec_mode", config.QueryExecModeSimple)
	v.SetDefault("otlp.metrics_port", 4318)
	v.SetDefault("chat.url", "http://localhost:8001")
	v.SetDefault("chat.timeout_sec", 5)

	if err := v.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("can't read config: %w", err)
	}

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return nil, fmt.Errorf("can't unmarshal config: %w", err)
	}

	return &cfg, nil
}
