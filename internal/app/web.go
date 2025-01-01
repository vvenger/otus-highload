package app

import (
	"fmt"
	"net/http"
	"time"

	"github.com/vvenger/otus-highload/internal/config"
	"github.com/vvenger/otus-highload/internal/web"
	"go.uber.org/fx"
)

var (
	_ http.Handler = (*web.HttpService)(nil)
)

type WebServer struct {
	*http.Server
	ShutdownTimeout time.Duration
}

type WebServerParams struct {
	fx.In
	Config     *config.Config
	WebService *web.HttpService
}

func NewWebServer(params WebServerParams) *WebServer {
	read := defaultReadTimeout
	if params.Config.App.Web.ReadTimeout != 0 {
		read = time.Duration(params.Config.App.Web.ReadTimeout) * time.Second
	}

	write := defaultWriteTimeout
	if params.Config.App.Web.ReadTimeout != 0 {
		write = time.Duration(params.Config.App.Web.WriteTimeout) * time.Second
	}

	shutdown := defaultShutdown
	if params.Config.App.Shutdown != 0 {
		write = time.Duration(params.Config.App.Shutdown) * time.Second
	}

	return &WebServer{
		Server: &http.Server{
			Addr:         fmt.Sprintf(":%d", params.Config.App.Web.Port),
			ReadTimeout:  read,
			WriteTimeout: write,
			Handler:      http.Handler(params.WebService),
		},
		ShutdownTimeout: shutdown,
	}
}
