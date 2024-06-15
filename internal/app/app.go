package app

import (
	"context"
	"fmt"

	"github.com/vvenger/otus-highload/internal/httproute"
	"github.com/vvenger/otus-highload/internal/user"
	"go.uber.org/fx"
)

func Run() {
	NewApp().Run()
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
		httproute.Module(),
		//
		user.Module(),
	}
}

func Populate(targets ...interface{}) error {
	return PopulateWith(nil, targets...)
}

func PopulateWith(option fx.Option, targets ...interface{}) error {
	modules := AppModules()
	modules = append(modules, fx.Populate(targets...))
	if option != nil {
		modules = append(modules, option)
	}

	app := fx.New(
		modules...,
	)

	if err := app.Start(context.Background()); err != nil {
		return fmt.Errorf("could not start app: %w", err)
	}

	defer func(app *fx.App, ctx context.Context) {
		_ = app.Stop(ctx)
	}(app, context.Background())

	return nil
}
