package app

import (
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/vvenger/otus-highload/internal/config"
	"github.com/vvenger/otus-highload/internal/pkg/pgpool"
	"github.com/vvenger/otus-highload/internal/pkg/tx"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type DBParams struct {
	fx.In
	Config *config.Config
	Logger *zap.Logger
}

func NewMasterDB(params DBParams) (*pgxpool.Pool, error) {
	c := pgpool.Config{
		Host:     params.Config.DB.Master.Host,
		Port:     params.Config.DB.Master.Port,
		Database: params.Config.DB.Master.Database,
		User:     params.Config.DB.Master.User,
		Password: params.Config.DB.Master.Password,
		MaxConns: params.Config.DB.Master.MaxConns,
		MinConns: params.Config.DB.Master.MinConns,
		Logger:   params.Logger,
	}

	switch params.Config.DB.Master.QueryMode {
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

func NewReplicaDB(params DBParams) (*pgxpool.Pool, error) {
	c := pgpool.Config{
		Host:     params.Config.DB.Replica.Host,
		Port:     params.Config.DB.Replica.Port,
		Database: params.Config.DB.Master.Database,
		User:     params.Config.DB.Master.User,
		Password: params.Config.DB.Master.Password,
		MaxConns: params.Config.DB.Replica.MaxConns,
		MinConns: params.Config.DB.Replica.MinConns,
		Logger:   params.Logger,
	}

	switch params.Config.DB.Master.QueryMode {
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

type TxParams struct {
	fx.In
	Db *pgxpool.Pool `name:"master_db"`
}

func NewTxManager(params TxParams) tx.IManager {
	return tx.NewManager(params.Db)
}
