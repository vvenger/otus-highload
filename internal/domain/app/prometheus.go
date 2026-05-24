package app

import (
	"github.com/prometheus/client_golang/prometheus"
)

func NewPrometheusRegistry() *prometheus.Registry {
	return prometheus.NewRegistry()
}
