package pgpool

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/tracelog"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type Config struct {
	Host     string
	Port     uint16
	Database string
	User     string
	Password string
	MaxConns int32
	MinConns int32
	ExecMode pgx.QueryExecMode
	Logger   *zap.Logger
}

func New(c *Config) (*pgxpool.Pool, error) {
	cfg, err := pgxpool.ParseConfig(fmt.Sprintf("postgresql://%s:%s@%s:%d/%s", c.User, c.Password, c.Host, c.Port, c.Database))
	if err != nil {
		return nil, fmt.Errorf("could not parse config: %w", err)
	}

	cfg.ConnConfig.Tracer = &tracelog.TraceLog{
		LogLevel: dbLogLevel(c.Logger.Level()),
		Logger:   NewQueryTracer(c.Logger.Named("PGX")),
	}
	if c.MaxConns != 0 {
		cfg.MaxConns = c.MaxConns
	}
	if c.MinConns != 0 {
		cfg.MinConns = c.MinConns
	}

	cfg.ConnConfig.DefaultQueryExecMode = c.ExecMode

	db, err := pgxpool.NewWithConfig(context.Background(), cfg)
	if err != nil {
		return nil, fmt.Errorf("could not create connection pool: %w", err)
	}

	return db, nil
}

func dbLogLevel(lvl zapcore.Level) tracelog.LogLevel {
	switch lvl {
	case zap.DebugLevel:
		return tracelog.LogLevelDebug
	default:
		return tracelog.LogLevelWarn
	}
}
