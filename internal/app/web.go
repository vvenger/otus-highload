package app

import (
	"fmt"
	"net/http"
	"time"

	"github.com/vvenger/otus-highload/internal/config"
	"go.uber.org/fx"
)

type WebService struct {
	*http.Server
	ShutdownTimeout time.Duration
}

type WebServiceParams struct {
	fx.In
	Config *config.Config
	Route  http.Handler
}

func NewWebService(params WebServiceParams) *WebService {
	p := params.Config.App.Web

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", p.Port),
		ReadTimeout:  time.Duration(p.ReadTimeout) * time.Second,
		WriteTimeout: time.Duration(p.WriteTimeout) * time.Second,
		Handler:      params.Route,
	}

	return &WebService{
		Server:          srv,
		ShutdownTimeout: time.Duration(params.Config.App.Shutdown) * time.Second,
	}
}
