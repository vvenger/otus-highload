package app

import (
	"net/http"

	"github.com/vvenger/otus-highload/internal/socialnetwork/web"
	"go.uber.org/fx"
)

type HttpServerParams struct {
	fx.In
	OgenServer  *web.HttpService
	DialogProxy http.Handler `name:"proxy_dialog"`
}

func NewHttpServer(p HttpServerParams) http.Handler {
	mux := http.NewServeMux()
	mux.Handle("/dialog/", p.DialogProxy)
	mux.Handle("/", p.OgenServer)

	return mux
}
