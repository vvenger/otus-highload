package user

import (
	apihttp "github.com/vvenger/otus-highload/internal/httproute"
	userhttp "github.com/vvenger/otus-highload/internal/user/http"
	"github.com/vvenger/otus-highload/internal/user/services"
	"github.com/vvenger/otus-highload/internal/user/storages"
	"go.uber.org/fx"
)

var (
	_ apihttp.UserHandler     = (*userhttp.Handler)(nil)
	_ userhttp.UserService    = (*services.UserService)(nil)
	_ services.UserRepository = (*storages.UserStorage)(nil)
)

func Module() fx.Option {
	opt := fx.Module("user",
		fx.Provide(
			fx.Annotate(userhttp.NewHandler,
				fx.As(new(apihttp.UserHandler)),
			),
			fx.Annotate(services.NewUserService,
				fx.As(new(userhttp.UserService)),
			),
			fx.Annotate(storages.NewUserStorage,
				fx.As(new(services.UserRepository)),
			),
		),
	)

	return opt
}
