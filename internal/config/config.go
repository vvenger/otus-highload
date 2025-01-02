package config

import (
	"fmt"
	"os"
	"strings"

	"github.com/spf13/viper"
)

type Config struct {
	App   AppConfig   `mapstructure:"app"`
	Log   LogConfig   `mapstructure:"log"`
	DB    DBConfig    `mapstructure:"db"`
	Redis RedisConfig `mapstructure:"redis"`
	Otlp  OtlpConfig  `mapstructure:"otlp"`
}

type AppConfig struct {
	Name     string         `mapstructure:"name"`
	Shutdown int            `mapstructure:"shutdown_timeout_sec"`
	Web      AppWebConfig   `mapstructure:"web"`
	Token    AppTokenConfig `mapstructure:"token"`
}

type AppTokenConfig struct {
	Secret string `mapstructure:"secret"`
	Expire int    `mapstructure:"expire_sec"`
}

type AppWebConfig struct {
	Port         int `mapstructure:"port"`
	ReadTimeout  int `mapstructure:"read_timeout_sec"`
	WriteTimeout int `mapstructure:"write_timeout_sec"`
}

type LogConfig struct {
	Level  string `mapstructure:"level"`
	Format string `mapstructure:"format"`
}

type DBConfig struct {
	Host      string        `mapstructure:"host"`
	Port      int           `mapstructure:"port"`
	Database  string        `mapstructure:"database"`
	User      string        `mapstructure:"user"`
	Password  string        `mapstructure:"password"`
	MaxConns  int           `mapstructure:"max_conns"`
	MinConns  int           `mapstructure:"min_conns"`
	QueryMode QueryExecMode `mapstructure:"exec_mode"`
}

type RedisConfig struct {
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
}

type OtlpConfig struct {
	MetricsPort int    `mapstructure:"metrics_port"`
	TracesURL   string `mapstructure:"traces_url"`
	Enabled     bool   `mapstructure:"traces_enabled"`
}

func New() (*Config, error) {
	v := newViperInstance()

	v.AutomaticEnv()

	if err := v.ReadInConfig(); err != nil {
		return &Config{}, fmt.Errorf("can't read config: %w", err)
	}

	var cfg Config
	if err := v.Unmarshal(&cfg); err != nil {
		return nil, fmt.Errorf("can't unmarshal config: %w", err)
	}

	return &cfg, nil
}

func newViperInstance() *viper.Viper {
	v := viper.New()

	cfgPath := os.Getenv(CmdPath)
	if cfgPath == "" {
		cfgPath = "."
	}

	v.AddConfigPath(cfgPath)
	v.SetConfigType("yaml")
	v.SetConfigName("config." + GetEnvironment())

	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	// APP.
	v.SetDefault("app.name", "app")
	v.SetDefault("app.shutdown_timeout_sec", 5)
	v.SetDefault("app.token_expire_sec", 1440)
	v.SetDefault("app.web_port", 8000)
	v.SetDefault("app.web_read_timeout_sec", 5)
	v.SetDefault("app.web_write_timeout_sec", 5)
	// Log.
	v.SetDefault("log.level", "info")
	v.SetDefault("log.format", "json")
	// DB.
	v.SetDefault("db.max_conns", 4)
	v.SetDefault("db.min_conns", 1)
	v.SetDefault("db.exec_mode", QueryExecModeSimple)
	// OTLP.
	v.SetDefault("otlp.metrics_port", 4318)

	return v
}
