package app

import (
	"fmt"

	"github.com/redis/go-redis/v9"
	"github.com/vvenger/otus-highload/internal/config"
	"go.uber.org/fx"
)

type RedisParams struct {
	fx.In
	Config *config.Config
}

func NewRedis(p RedisParams) *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr: fmt.Sprintf("%s:%d", p.Config.Redis.Host, p.Config.Redis.Port),
	})
}
