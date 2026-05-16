package app

import (
	"fmt"
	"os"

	"github.com/vvenger/otus-highload/internal/config"

	"go.uber.org/fx"
	"go.uber.org/zap"
)

type LoggerParams struct {
	fx.In
	Config *config.Config
}

func NewLogger(params LoggerParams) (*zap.Logger, error) {
	var loggerConfig zap.Config
	if config.IsProdaction() {
		loggerConfig = zap.NewProductionConfig()
	} else {
		loggerConfig = zap.NewDevelopmentConfig()
	}

	loggerConfig.Encoding = params.Config.Log.Format

	if params.Config.Log.Level != "" {
		level, err := zap.ParseAtomicLevel(params.Config.Log.Level)
		if err != nil {
			return nil, fmt.Errorf("can't parse log level: %w", err)
		}
		loggerConfig.Level = level
	}

	l, err := loggerConfig.Build()
	if err != nil {
		return nil, fmt.Errorf("can't build logger: %w", err)
	}

	h, err := os.Hostname()
	if err == nil {
		l = l.With(zap.String("host", h))
	}

	return l, nil
}
