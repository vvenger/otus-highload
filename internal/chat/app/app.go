package app

import (
	"context"

	"github.com/vvenger/otus-highload/internal/chat/app/module"
	"github.com/vvenger/otus-highload/internal/domain/app"
	"go.uber.org/fx"
)

func Run() {
	srv := NewApp()
	srv.Run()
}

func NewApp() *fx.App {
	return app.NewApp(AppModules()...)
}

func AppModules() []fx.Option {
	return []fx.Option{
		module.HttpService(),
		//
		module.Dialog(),
	}
}

//nolint:wrapcheck
func Populate(targets ...interface{}) (stop func(context.Context), err error) {
	return app.PopulateWith(nil, AppModules(), targets...)
}

func PopulateWith(option fx.Option, targets ...interface{}) (stop func(context.Context), err error) {
	stop, err = app.PopulateWith(option, AppModules(), targets...)
	return
}

func LoadFixture(dir string) {
	app.LoadFixture(AppModules(), dir)
}
