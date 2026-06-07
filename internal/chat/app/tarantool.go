package app

import (
	"context"
	"fmt"

	tt "github.com/tarantool/go-tarantool/v2"
	"github.com/vvenger/otus-highload/internal/config"
	"go.uber.org/fx"
)

type TarantoolParams struct {
	fx.In
	Config *config.Config
}

func NewTarantool(p TarantoolParams) (*tt.Connection, error) {
	if p.Config.Tarantool.Host == "" {
		return nil, nil
	}

	dialer := tt.NetDialer{
		Address: fmt.Sprintf("%s:%d", p.Config.Tarantool.Host, p.Config.Tarantool.Port),
	}

	conn, err := tt.Connect(context.Background(), dialer, tt.Opts{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to tarantool: %w", err)
	}

	return conn, nil
}
