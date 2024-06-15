package pgpool

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog"
)

type Config struct {
	Host     string
	Port     uint16
	Database string
	User     string
	Password string
	MaxConns int
	MinConns int
	Logger   *zerolog.Logger
}

func New(c *Config) (*pgxpool.Pool, error) {
	s := fmt.Sprintf("postgresql://%s:%s@%s:%d/%s", c.User, c.Password, c.Host, c.Port, c.Database)

	cfg, err := pgxpool.ParseConfig(s)
	if err != nil {
		return nil, fmt.Errorf("could not parse config: %w", err)
	}

	if c.Logger != nil {
		cfg.ConnConfig.Tracer = NewQueryTracer(c.Logger)
	}
	if c.MaxConns != 0 {
		cfg.MaxConns = int32(c.MaxConns)
	}
	if c.MinConns != 0 {
		cfg.MinConns = int32(c.MinConns)
	}

	db, err := pgxpool.NewWithConfig(context.Background(), cfg)
	if err != nil {
		return nil, fmt.Errorf("could not create connection pool: %w", err)
	}

	return db, nil
}
