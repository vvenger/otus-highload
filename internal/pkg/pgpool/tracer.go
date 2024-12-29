package pgpool

import (
	"context"

	"github.com/jackc/pgx/v5"
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

func (t *QueryTracer) TraceQueryStart(ctx context.Context, _ *pgx.Conn, data pgx.TraceQueryStartData) context.Context {
	if evt := t.logger.Debug(); evt.Enabled() {
		evt.Str("sql", data.SQL).
			Any("args", data.Args).
			Msg("executing query")
	}

	return ctx
}

func (t *QueryTracer) TraceQueryEnd(ctx context.Context, _ *pgx.Conn, data pgx.TraceQueryEndData) {
}
