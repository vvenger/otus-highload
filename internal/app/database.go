package app

import (
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog"
	"github.com/vvenger/otus-highload/internal/config"
	"github.com/vvenger/otus-highload/internal/pkg/pgpool"
	"go.uber.org/fx"
)

type DBParams struct {
	fx.In
	Config *config.Config
	Logger *zerolog.Logger
}

func NewDB(params DBParams) (*pgxpool.Pool, error) {
	c := pgpool.Config{
		Host:     params.Config.DB.Host,
		Port:     params.Config.DB.Port,
		Database: params.Config.DB.Database,
		User:     params.Config.DB.User,
		Password: params.Config.DB.Password,
		MaxConns: params.Config.DB.MaxConns,
		MinConns: params.Config.DB.MinConns,
		Logger:   params.Logger,
	}

	switch params.Config.DB.QueryMode {
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
