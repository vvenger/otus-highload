package app

import (
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/vvenger/otus-highload/internal/config"
	"github.com/vvenger/otus-highload/internal/pkg/pgpool"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type DBParams struct {
	fx.In
	Config config.DBConfig
	Logger *zap.Logger
}

func NewDB(params DBParams) (*pgxpool.Pool, error) {
	if params.Config.Host == "" {
		return nil, nil
	}

	c := pgpool.Config{
		Host:     params.Config.Host,
		Port:     params.Config.Port,
		Database: params.Config.Database,
		User:     params.Config.User,
		Password: params.Config.Password,
		MaxConns: params.Config.MaxConns,
		MinConns: params.Config.MinConns,
		Logger:   params.Logger,
	}

	switch params.Config.QueryMode {
	case config.QueryExecModeSimple:
		c.ExecMode = pgx.QueryExecModeSimpleProtocol
	case config.QueryExecModeExec:
		c.ExecMode = pgx.QueryExecModeExec
	default:
		c.ExecMode = pgx.QueryExecModeCacheStatement
	}

	db, err := pgpool.New(&c)
	if err != nil {
		return nil, fmt.Errorf("failed to cretate connection pool: %w", err)
	}

	return db, nil
}
