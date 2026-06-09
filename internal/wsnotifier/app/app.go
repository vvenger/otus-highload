package app

import (
	"context"

	domainapp "github.com/vvenger/otus-highload/internal/domain/app"
	"github.com/vvenger/otus-highload/internal/wsnotifier/app/module"
	"go.uber.org/fx"
)

func Run() {
	srv := fx.New(AppModules()...)
	srv.Run()
}

func AppModules() []fx.Option {
	return []fx.Option{
		domainapp.LoggerModule(),
		domainapp.NatsModule(),
		domainapp.WebModule(),
		domainapp.SystemModule(),
		//
		module.Config(),
		module.HttpService(),
		//
		module.Notifier(),
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
