package app

import (
	"fmt"
	"net/http"
	"net/http/pprof"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/collectors"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/vvenger/otus-highload/internal/config"
	"go.uber.org/fx"
)

type SystemParams struct {
	fx.In
	Config     *config.Config
	Prometheus *prometheus.Registry
}

type SystemService struct {
	*http.Server
	ShutdownTimeout time.Duration
}

func NewSystemService(p SystemParams) *SystemService {
	p.Prometheus.MustRegister(
		collectors.NewGoCollector(),
		collectors.NewProcessCollector(collectors.ProcessCollectorOpts{}),
	)

	mux := http.NewServeMux()

	mux.Handle("/metrics", promhttp.HandlerFor(p.Prometheus, promhttp.HandlerOpts{}))

	mux.HandleFunc("/debug/pprof/", pprof.Index)
	mux.HandleFunc("/debug/pprof/cmdline", pprof.Cmdline)
	mux.HandleFunc("/debug/pprof/profile", pprof.Profile)
	mux.HandleFunc("/debug/pprof/symbol", pprof.Symbol)
	mux.HandleFunc("/debug/pprof/trace", pprof.Trace)

	//nolint:gosec
	return &SystemService{
		Server: &http.Server{
			Addr:    fmt.Sprintf(":%d", p.Config.Otlp.MetricsPort),
			Handler: mux,
		},
		ShutdownTimeout: time.Duration(p.Config.App.Shutdown) * time.Second,
	}
}
