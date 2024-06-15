package config

import (
	"fmt"
	"os"

	"github.com/ilyakaznacheev/cleanenv"
)

const (
	defaultConfig = "/app/config.%s.yaml"
)

type Config struct {
	App   AppConfig   `yaml:"app"`
	Log   LogConfig   `yaml:"log"`
	DB    DBConfig    `yaml:"db"`
	Redis RedisConfig `yaml:"redis"`
	Otlp  OtlpConfig  `yaml:"otlp"`
}

func New() (*Config, error) {
	c := &Config{}

	args, err := parseArgs(c, os.Args[1:])
	if err != nil {
		return nil, fmt.Errorf("could not parse args: %w", err)
	}

	if args.Environment != "" {
		os.Setenv("ENVIRONMENT", args.Environment)
	}

	if args.ConfigFile == "" {
		args.ConfigFile = fmt.Sprintf(defaultConfig, GetEnvironment())
	}

	if args.LogLevel != "" {
		os.Setenv("LOG_LEVEL", args.LogLevel)
	}

	if args.LogFormat != "" {
		os.Setenv("LOG_FORMAT", args.LogFormat)
	}

	err = cleanenv.ReadConfig(args.ConfigFile, c)
	if err != nil {
		return nil, fmt.Errorf("could not read config: %w", err)
	}

	return c, nil
}

type AppConfig struct {
	Name     string         `yaml:"name" env:"APP_NAME" env-description:"Name of the service"`
	Shutdown int            `yaml:"shutdown_timeout" env-default:"5" env-description:"Timeout for the server to shutdown gracefully"`
	Web      AppWebConfig   `yaml:"web"`
	Token    AppTokenConfig `yaml:"token"`
}

type AppTokenConfig struct {
	Secret string `yaml:"secret" env:"TOKEN_SECRET"`
	Expire int    `yaml:"expire" env:"TOKEN_EXPIRE" env-default:"1440"`
}

type AppWebConfig struct {
	Port         int `yaml:"port" env:"APP_PORT" env-default:"8080"`
	ReadTimeout  int `yaml:"read_timeout" env-default:"5" env-description:"Read timeout"`
	WriteTimeout int `yaml:"write_timeout" env-default:"5" env-description:"Write timeout"`
}

type LogConfig struct {
	Level  string `yaml:"level" env:"LOG_LEVEL" env-default:"info" env-description:"Log level: debug, info, warn, error"`
	Format string `yaml:"format" env:"LOG_FORMAT" env-default:"json" env-description:"Log format: json or console"`
}

type DBConfig struct {
	Host     string `yaml:"host" env:"DB_HOST"`
	Port     int    `yaml:"port" env:"DB_PORT"`
	Database string `yaml:"database" env:"DB_NAME"`
	User     string `yaml:"user" env:"DB_USER"`
	Password string `yaml:"password" env:"DB_PASSWORD"`
	MaxConns int    `yaml:"max_conns" env:"DB_MAX_CONNS" env-default:"4"`
	MinConns int    `yaml:"min_conns" env:"DB_MIN_CONNS" env-default:"0"`
}

type RedisConfig struct {
	Host string `yaml:"host" env:"REDIS_HOST"`
	Port int    `yaml:"port" env:"REDIS_PORT"`
}

type OtlpConfig struct {
	MetricsPort int    `yaml:"metrics_port" env:"OTLP_METRICS_PORT" env-default:"4318"`
	TracesURL   string `yaml:"traces_url" env:"OTLP_TRACES_URL"`
	ServiceName string `yaml:"service_name" env:"SERVICE_NAME"`
	Enabled     bool   `yaml:"traces_enabled" env-default:"false"`
}
