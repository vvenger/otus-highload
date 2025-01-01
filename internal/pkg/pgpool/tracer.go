package pgpool

import (
	"context"

	"github.com/jackc/pgx/v5/tracelog"
	"github.com/rs/zerolog"
)

type QueryTracerParams struct {
	Logger *zerolog.Logger
}

type QueryTracer struct {
	logger *zerolog.Logger
}

func NewQueryTracer(l *zerolog.Logger) *QueryTracer {
	return &QueryTracer{
		logger: l,
	}
}

func (t *QueryTracer) Log(ctx context.Context, level tracelog.LogLevel, msg string, data map[string]interface{}) {
	var evt *zerolog.Event

	switch level {
	case tracelog.LogLevelWarn:
		evt = t.logger.Warn()
	case tracelog.LogLevelError:
		evt = t.logger.Error()
	default:
		evt = t.logger.Debug()
	}

	if !evt.Enabled() {
		return
	}

	for k, v := range data {
		evt = evt.Any(k, v)
	}

	evt.Msg(msg)
}
