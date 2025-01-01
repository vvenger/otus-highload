package web

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	user "github.com/vvenger/otus-highload/internal/user/model"

	"github.com/ogen-go/ogen/ogenerrors"
	"github.com/rs/zerolog"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/web/api"
	"go.opentelemetry.io/otel/metric"
	"go.opentelemetry.io/otel/trace"
	"go.uber.org/fx"
)

type UserService interface {
	Login(ctx context.Context, login, password string) error
	Register(ctx context.Context, req user.RegisterUser) (string, error)
	User(ctx context.Context, id string) (user.User, error)
}

type handler struct {
	api.UnimplementedHandler
	user UserService
	sec  jwt.Manager
}

type ServiceParams struct {
	fx.In
	TraceProvider  trace.TracerProvider
	MetricProvider metric.MeterProvider
	JWTService     jwt.Manager
	UserService    UserService
}

type HttpService struct {
	*api.Server
}

func NewHttpService(p ServiceParams) (*HttpService, error) {
	h := &handler{
		user: p.UserService,
		sec:  p.JWTService,
	}

	sec := &securityHandler{
		srv: p.JWTService,
	}

	srv, err := api.NewServer(h, sec,
		api.WithTracerProvider(p.TraceProvider),
		api.WithMeterProvider(p.MetricProvider),
		api.WithErrorHandler(errorHandler),
	)
	if err != nil {
		return nil, fmt.Errorf("could not create http server: %w", err)
	}

	return &HttpService{srv}, nil
}

func errorHandler(ctx context.Context, w http.ResponseWriter, r *http.Request, err error) {
	// TODO: Разобраться с ошибками.
	// В swagger только на 500 отдается ошибка, а остальное код.

	var pErr *ogenerrors.DecodeParamError
	if errors.As(err, &pErr) {
		zerolog.Ctx(ctx).Debug().Err(err).Send()

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var dErr *ogenerrors.DecodeRequestError
	if errors.As(err, &dErr) {
		zerolog.Ctx(ctx).Debug().Err(err).Send()

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var sErr *ogenerrors.SecurityError
	if errors.As(err, &sErr) {
		zerolog.Ctx(ctx).Debug().Err(err).Send()

		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	zerolog.Ctx(ctx).Error().Err(err).Send()

	w.WriteHeader(http.StatusInternalServerError)
}
