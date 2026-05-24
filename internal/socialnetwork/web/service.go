package web

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/ogen-go/ogen/ogenerrors"
	"github.com/vvenger/otus-highload/internal/config"
	friendmodel "github.com/vvenger/otus-highload/internal/domain/friend/model"
	postmodel "github.com/vvenger/otus-highload/internal/domain/post/model"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	user "github.com/vvenger/otus-highload/internal/domain/user/model"
	"github.com/vvenger/otus-highload/internal/socialnetwork/web/api"
	"go.opentelemetry.io/otel/metric"
	"go.opentelemetry.io/otel/trace"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type UserService interface {
	Login(ctx context.Context, login, password string) error
	Register(ctx context.Context, req user.RegisterUser) (string, error)
	User(ctx context.Context, id string) (user.User, error)
	Search(ctx context.Context, filt user.SearchFilter) ([]user.User, error)
}

type PostService interface {
	Create(ctx context.Context, req postmodel.CreatePost) (uuid.UUID, error)
	Update(ctx context.Context, req postmodel.UpdatePost) error
	Delete(ctx context.Context, id uuid.UUID) error
	GetByID(ctx context.Context, id uuid.UUID) (postmodel.Post, error)
}

type FeedService interface {
	GetFeed(ctx context.Context, filter postmodel.FeedFilter) ([]postmodel.Post, error)
}

type FriendService interface {
	Add(ctx context.Context, req friendmodel.UserFriend) error
	Delete(ctx context.Context, req friendmodel.UserFriend) error
	GetFriendIDs(ctx context.Context, userID uuid.UUID) ([]uuid.UUID, error)
}

type handler struct {
	api.UnimplementedHandler
	user       UserService
	post       PostService
	friend     FriendService
	feed       FeedService
	sec        jwt.Manager
	retryAfter int
}

type ServiceParams struct {
	fx.In
	TraceProvider  trace.TracerProvider
	MetricProvider metric.MeterProvider
	JWTService     jwt.Manager
	UserService    UserService
	PostService    PostService
	FriendService  FriendService
	FeedService    FeedService
	Config         *config.Config
}

type HttpService struct {
	*api.Server
}

func NewHttpService(p ServiceParams) (*HttpService, error) {
	h := &handler{
		user:       p.UserService,
		post:       p.PostService,
		friend:     p.FriendService,
		feed:       p.FeedService,
		sec:        p.JWTService,
		retryAfter: p.Config.App.Web.RetryAfter,
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
	logger.Ctx(ctx).Error(
		"errorHandler",
		zap.Error(err),
	)

	var pErr *ogenerrors.DecodeParamError
	if errors.As(err, &pErr) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var dErr *ogenerrors.DecodeRequestError
	if errors.As(err, &dErr) {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var sErr *ogenerrors.SecurityError
	if errors.As(err, &sErr) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusInternalServerError)
}
