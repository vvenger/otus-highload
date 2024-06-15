package app

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/vvenger/otus-highload/internal/config"
	"github.com/vvenger/otus-highload/internal/pkg/tracer"

	"go.opentelemetry.io/otel/trace"
	"go.uber.org/fx"

	promclient "github.com/prometheus/client_golang/prometheus"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/prometheus"
	"go.opentelemetry.io/otel/metric"
	sdk "go.opentelemetry.io/otel/sdk/metric"
)

var (
	BuildVersion = "1.0.0"
)

type TraceParams struct {
	fx.In
	Config *config.Config
}

type TracerProvider struct {
	trace.TracerProvider
	ShutdownTimeout time.Duration
}

func NewTracerProvider(params TraceParams) (*TracerProvider, error) {
	if !params.Config.Otlp.Enabled {
		return &TracerProvider{
			TracerProvider:  tracer.NewNoopTracerProvider(),
			ShutdownTimeout: time.Duration(params.Config.App.Shutdown) * time.Second,
		}, nil
	}

	p := tracer.Config{
		URL:      params.Config.Otlp.TracesURL,
		Service:  params.Config.App.Name,
		Version:  BuildVersion,
		Instance: uuid.New().String(),
	}

	tp, err := tracer.NewTracerProvider(p)
	if err != nil {
		return nil, fmt.Errorf("could not create tracer provider: %w", err)
	}

	return &TracerProvider{
		TracerProvider:  tp,
		ShutdownTimeout: time.Duration(params.Config.App.Shutdown) * time.Second,
	}, nil
}

type MeterParams struct {
	fx.In
	Config   *config.Config
	Registry *promclient.Registry
}

type MeterProvider struct {
	metric.MeterProvider
	ShutdownTimeout time.Duration
}

func NewMeterProvider(p MeterParams) (metric.MeterProvider, error) {
	exporter, err := prometheus.New(
		prometheus.WithRegisterer(p.Registry),
	)
	if err != nil {
		return nil, fmt.Errorf("could not create prometheus exporter: %w", err)
	}

	provider := sdk.NewMeterProvider(sdk.WithReader(exporter))

	otel.SetMeterProvider(provider)

	return &MeterProvider{
		MeterProvider:   provider,
		ShutdownTimeout: time.Duration(p.Config.App.Shutdown) * time.Second,
	}, nil
}
