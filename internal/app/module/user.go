package app

import (
	service "github.com/vvenger/otus-highload/internal/user/services"
	storage "github.com/vvenger/otus-highload/internal/user/storages"
	"github.com/vvenger/otus-highload/internal/web"
	"go.uber.org/fx"
)

var (
	_ web.UserService        = (*service.UserService)(nil)
	_ service.UserRepository = (*storage.UserStorage)(nil)
)

func User() fx.Option {
	return fx.Module("user",
		fx.Provide(
			fx.Annotate(service.NewUserService,
				fx.As(new(web.UserService)),
			),
			fx.Annotate(storage.NewUserStorage,
				fx.As(new(service.UserRepository)),
			),
		),
	)
}
