package app

import (
	"github.com/vvenger/otus-highload/internal/config"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"go.uber.org/fx"
)

type JWTParams struct {
	fx.In
	Config config.AppConfig
}

func NewJWT(p JWTParams) jwt.Manager {
	return jwt.New(jwt.JWTParams{
		Secret:    p.Config.Token.Secret,
		ExpMinute: p.Config.Token.Expire,
	})
}
