package app

import (
	"context"
	"fmt"
	"time"

	app "github.com/vvenger/otus-highload/internal/app/module"
	"go.uber.org/fx"
)

const (
	defaultShutdown     = 5 * time.Second
	defaultReadTimeout  = 5 * time.Second
	defaultWriteTimeout = defaultReadTimeout
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
