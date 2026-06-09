package app

import (
	"fmt"

	nats "github.com/nats-io/nats.go"
	"github.com/vvenger/otus-highload/internal/config"
	"go.uber.org/fx"
)

type NatsParams struct {
	fx.In
	Config config.NatsConfig
}

func NewNats(p NatsParams) (*nats.Conn, nats.JetStreamContext, error) {
	if p.Config.Host == "" {
		return nil, nil, nil
	}

	url := fmt.Sprintf("nats://%s:%d", p.Config.Host, p.Config.Port)

	nc, err := nats.Connect(url)
	if err != nil {
		return nil, nil, fmt.Errorf("could not connect to nats: %w", err)
	}

	js, err := nc.JetStream()
	if err != nil {
		nc.Close()
		return nil, nil, fmt.Errorf("could not create jetstream context: %w", err)
	}

	return nc, js, nil
}
