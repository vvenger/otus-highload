package tracer

import (
	"context"
	"fmt"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.24.0"
	"go.opentelemetry.io/otel/trace"
	"go.opentelemetry.io/otel/trace/noop"
)

type Config struct {
	URL      string
	Service  string
	Version  string
	Instance string
}

func NewTracerProvider(params Config) (trace.TracerProvider, error) {
	exp, err := otlptracehttp.New(context.Background(),
		otlptracehttp.WithEndpoint(params.URL),
		otlptracehttp.WithInsecure(),
	)
	if err != nil {
		return nil, fmt.Errorf("could not create trace exporter: %w", err)
	}

	otel.SetTextMapPropagator(newPropagator())

	tp := sdktrace.NewTracerProvider(
		sdktrace.WithBatcher(exp),
		sdktrace.WithResource(resource.NewWithAttributes(
			semconv.SchemaURL,
			semconv.ServiceInstanceIDKey.String(params.Instance),
			semconv.ServiceNameKey.String(params.Service),
			semconv.ServiceVersionKey.String(params.Version),
		)),
	)

	otel.SetTracerProvider(tp)

	return tp, nil
}

func newPropagator() propagation.TextMapPropagator {
	return propagation.NewCompositeTextMapPropagator(
		propagation.TraceContext{},
		propagation.Baggage{},
	)
}

func NewNoopTracerProvider() trace.TracerProvider {
	tp := noop.NewTracerProvider()

	otel.SetTracerProvider(tp)

	return tp
}
