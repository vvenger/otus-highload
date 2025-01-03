package pgpool

import (
	"context"

	"github.com/jackc/pgx/v5/tracelog"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type QueryTracerParams struct {
	Logger *zap.Logger
}

type QueryTracer struct {
	logger *zap.Logger
}

func NewQueryTracer(l *zap.Logger) *QueryTracer {
	return &QueryTracer{
		logger: l,
	}
}

func (t *QueryTracer) Log(ctx context.Context, level tracelog.LogLevel, msg string, data map[string]interface{}) {
	log := t.logger
	if logger.HasLogger(ctx) {
		log = logger.Ctx(ctx)
	}

	fields := make([]zapcore.Field, len(data))
	i := 0
	for k, v := range data {
		fields[i] = zap.Any(k, v)
		i++
	}

	switch level {
	case tracelog.LogLevelDebug:
		log.Debug(msg, fields...)
	case tracelog.LogLevelInfo:
		log.Info(msg, fields...)
	case tracelog.LogLevelWarn:
		log.Warn(msg, fields...)
	case tracelog.LogLevelError:
		log.Error(msg, fields...)
	default:
		log.Error(msg, append(fields, zap.Stringer("PGX_LOG_LEVEL", level))...) //nolint:makezero
	}
}
