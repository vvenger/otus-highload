package httproute

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"github.com/ogen-go/ogen/ogenerrors"
	"github.com/rs/zerolog"
	"github.com/vvenger/otus-highload/internal/api"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"go.opentelemetry.io/otel/metric"
	"go.opentelemetry.io/otel/trace"
	"go.uber.org/fx"
)

type UserHandler interface {
	LoginPost(ctx context.Context, req api.OptLoginPostReq) (api.LoginPostRes, error)
	UserRegisterPost(ctx context.Context, req api.OptUserRegisterPostReq) (api.UserRegisterPostRes, error)
	UserGetIDGet(ctx context.Context, params api.UserGetIDGetParams) (api.UserGetIDGetRes, error)
}

type HttpRouteParams struct {
	fx.In
	TraceProvider  trace.TracerProvider
	MetricProvider metric.MeterProvider
	JWTService     jwt.Manager
	UserService    UserHandler
	//TODO: add other handlers
}

type HttpRoute struct {
	*api.Server
}

func NewHttpRoute(p HttpRouteParams) (*HttpRoute, error) {
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

	return &HttpRoute{srv}, nil
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
