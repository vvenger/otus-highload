package app

import (
	"os"

	"github.com/rs/zerolog"
	"github.com/vvenger/otus-highload/internal/config"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	"go.uber.org/fx"
)

type LoggerParams struct {
	fx.In
	Config *config.Config
}

func NewLogger(params LoggerParams) *zerolog.Logger {
	p := logger.Config{
		LogLevel:  params.Config.Log.Level,
		LogFormat: params.Config.Log.Format,
	}

	l := logger.New(os.Stderr, p)

	return &l
}
