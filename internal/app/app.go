package app

import (
	"context"
	"fmt"

	app "github.com/vvenger/otus-highload/internal/app/module"
	"go.uber.org/fx"
)

func Run() {
	srv := NewApp()
	srv.Run()
}

func NewApp() *fx.App {
	modules := AppModules()

	return fx.New(modules...)
}

func AppModules() []fx.Option {
	return []fx.Option{
		ConfigModule(),
		LoggerModule(),
		DBModule(),
		WebModule(),
		SystemModule(),
		//
		app.HttpService(),
		//
		app.User(),
	}
}

func Populate(targets ...interface{}) (stop func(context.Context), err error) {
	return PopulateWith(nil, targets...)
}

func PopulateWith(option fx.Option, targets ...interface{}) (stop func(context.Context), err error) {
	modules := AppModules()
	modules = append(modules, fx.Populate(targets...))
	if option != nil {
		modules = append(modules, option)
	}

	app := fx.New(modules...)

	if err = app.Start(context.Background()); err != nil {
		err = fmt.Errorf("could not start app: %w", err)

		return
	}

	stop = func(ctx context.Context) {
		_ = app.Stop(ctx)
	}

	return
}
