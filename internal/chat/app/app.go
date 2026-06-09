package app

import (
	"context"

	"github.com/vvenger/otus-highload/internal/chat/app/module"
	domainapp "github.com/vvenger/otus-highload/internal/domain/app"
	"go.uber.org/fx"
)

func Run() {
	srv := fx.New(AppModules()...)
	srv.Run()
}

func AppModules() []fx.Option {
	return []fx.Option{
		domainapp.LoggerModule(),
		domainapp.DBModule(),
		domainapp.WebModule(),
		domainapp.SystemModule(),
		//
		module.Config(),
		module.HttpService(),
		//
		module.Dialog(),
	}
}

//nolint:wrapcheck
func Populate(targets ...interface{}) (stop func(context.Context), err error) {
	return domainapp.PopulateWith(nil, AppModules(), targets...)
}

func PopulateWith(option fx.Option, targets ...interface{}) (stop func(context.Context), err error) {
	stop, err = domainapp.PopulateWith(option, AppModules(), targets...)
	return
}

func LoadFixture(dir string) {
	domainapp.LoadFixture(AppModules(), dir)
}
