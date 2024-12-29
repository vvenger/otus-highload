package app

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"

	"go.opentelemetry.io/otel/metric"
	sdkmetric "go.opentelemetry.io/otel/sdk/metric"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	"go.opentelemetry.io/otel/trace"
	"go.uber.org/fx"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/vvenger/otus-highload/internal/config"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
)

func ConfigModule() fx.Option {
	opt := fx.Module("config",
		fx.Provide(config.New),
	)

	return opt
}

func LoggerModule() fx.Option {
	opt := fx.Module("logger",
		fx.Provide(NewLogger),
	)

	return opt
}

func DBModule() fx.Option {
	opt := fx.Module("db",
		fx.Provide(
			NewDB,
		),
		fx.Invoke(func(lc fx.Lifecycle, db *pgxpool.Pool) {
			lc.Append(fx.Hook{
				OnStop: func(ctx context.Context) error {
					db.Close()
					return nil
				},
			})
		}),
	)

	return opt
}

func WebModule() fx.Option {
	opt := fx.Module("web",
		fx.Provide(
			NewWebService,
			NewRoute,
			jwt.New,
		),
		fx.Invoke(func(lc fx.Lifecycle, srv *WebService) {
			lc.Append(fx.Hook{
				OnStart: func(ctx context.Context) error {
					go func() {
						log.Println("starting service on port:", srv.Addr)

						_ = srv.ListenAndServe()
					}()

					return nil
				},
				OnStop: func(_ context.Context) error {
					log.Println("shutting down service...")

					ctx, cancel := context.WithTimeout(context.Background(), srv.ShutdownTimeout)
					defer cancel()

					err := srv.Shutdown(ctx) //nolint:contextcheck
					if err != nil && !errors.Is(err, http.ErrServerClosed) {
						return fmt.Errorf("could not shutdown service: %w", err)
					}

					return nil
				},
			})
		}),
	)

	return opt
}

func SystemModule() fx.Option {
	opt := fx.Module("system",
		fx.Provide(
			NewSystemService,
			NewPrometheusRegistry,
			fx.Annotate(NewTracerProvider,
				fx.As(new(trace.TracerProvider)),
			),
			fx.Annotate(NewMeterProvider,
				fx.As(new(metric.MeterProvider)),
			),
		),
		fx.Invoke(func(lc fx.Lifecycle, srv *SystemService) {
			lc.Append(fx.Hook{
				OnStart: func(ctx context.Context) error {
					log.Printf("starting system service at port %s\n", srv.Addr)

					go func() {
						_ = srv.ListenAndServe()
					}()

					return nil
				},
				OnStop: func(_ context.Context) error {
					log.Println("shutting down system service...")

					ctx, cancel := context.WithTimeout(context.Background(), srv.ShutdownTimeout)
					defer cancel()

					err := srv.Shutdown(ctx) //nolint:contextcheck
					if err != nil && !errors.Is(err, http.ErrServerClosed) {
						return fmt.Errorf("could not shutdown system service: %w", err)
					}

					return nil
				},
			})
		}),
		fx.Invoke(func(lc fx.Lifecycle, t trace.TracerProvider) {
			lc.Append(fx.Hook{
				OnStop: func(_ context.Context) error {
					log.Println("shutting down trace provaider...")

					srv, ok := t.(*TracerProvider)
					if !ok {
						return nil
					}

					tp, ok := srv.TracerProvider.(*sdktrace.TracerProvider)
					if !ok {
						log.Println("trace provider not initialized")
						return nil
					}

					ctx, cancel := context.WithTimeout(context.Background(), srv.ShutdownTimeout)
					defer cancel()

					//nolint:contextcheck
					if err := tp.Shutdown(ctx); err != nil {
						return fmt.Errorf("could not shutdown trace provider: %w", err)
					}

					return nil
				},
			})
		}),
		fx.Invoke(func(lc fx.Lifecycle, m metric.MeterProvider) {
			lc.Append(fx.Hook{
				OnStop: func(_ context.Context) error {
					log.Println("shutting down metric provaider...")

					srv, ok := m.(*MeterProvider)
					if !ok {
						return nil
					}

					mp, ok := srv.MeterProvider.(*sdkmetric.MeterProvider)
					if !ok {
						log.Println("metric provider not initialized")
						return nil
					}

					ctx, cancel := context.WithTimeout(context.Background(), srv.ShutdownTimeout)
					defer cancel()

					//nolint:contextcheck
					if err := mp.Shutdown(ctx); err != nil {
						return fmt.Errorf("could not shutdown metric provider: %w", err)
					}

					return nil
				},
			})
		}),
	)

	return opt
}
