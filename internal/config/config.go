package config

import (
	"os"
	"strings"

	"github.com/spf13/viper"
)

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
	RetryAfter   int `mapstructure:"retry_after_sec"`
}

type LogConfig struct {
	Level  string `mapstructure:"level"`
	Format string `mapstructure:"format"`
}

type DBConfig struct {
	Host      string        `mapstructure:"host"`
	Port      uint16        `mapstructure:"port"`
	Database  string        `mapstructure:"database"`
	User      string        `mapstructure:"user"`
	Password  string        `mapstructure:"password"`
	MaxConns  int32         `mapstructure:"max_conns"`
	MinConns  int32         `mapstructure:"min_conns"`
	QueryMode QueryExecMode `mapstructure:"exec_mode"`
}

type RedisConfig struct {
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
}

type NatsConfig struct {
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
}

type OtlpConfig struct {
	MetricsPort int    `mapstructure:"metrics_port"`
	TracesURL   string `mapstructure:"traces_url"`
	Enabled     bool   `mapstructure:"traces_enabled"`
}

// NewViper returns a viper instance pre-configured with path, env, and key replacer.
// Each service calls this and adds its own defaults before ReadInConfig.
func NewViper() *viper.Viper {
	v := viper.New()

	cfgPath := os.Getenv(CmdPath)
	if cfgPath == "" {
		cfgPath = "."
	}

	v.AddConfigPath(cfgPath)
	v.SetConfigType("yaml")
	v.SetConfigName("config." + GetEnvironment())
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	v.AutomaticEnv()

	return v
}
