package app

import (
	"context"
	"fmt"

	"go.uber.org/fx"
)

func NewApp(modules ...fx.Option) *fx.App {
	modules = append(AppModules(), modules...)

	return fx.New(modules...)
}

func AppModules() []fx.Option {
	return []fx.Option{
		ConfigModule(),
		LoggerModule(),
		DBModule(),
		RedisModule(),
		WebModule(),
		SystemModule(),
	}
}

func Populate(modules []fx.Option, targets ...interface{}) (stop func(context.Context), err error) {
	return PopulateWith(nil, modules, targets...)
}

func PopulateWith(option fx.Option, modules []fx.Option, targets ...interface{}) (stop func(context.Context), err error) {
	modules = append(AppModules(), modules...)
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

func LoadFixture(modules []fx.Option, dir string) {
	var f *Fixture
	stop, err := Populate(modules, &f)
	if err != nil {
		panic(err)
	}
	defer stop(context.Background())

	if err := f.Up(dir); err != nil {
		panic(err)
	}
}
