package web

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/websocket"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/wsnotifier/notifier"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type FeedSubscriber interface {
	Subscribe(ctx context.Context, userID string) (<-chan notifier.WSPostEvent, error)
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(_ *http.Request) bool { return true },
}

type HandlerParams struct {
	fx.In
	Feed   FeedSubscriber
	JWT    jwt.Manager
	Logger *zap.Logger
}

type Handler struct {
	feed   FeedSubscriber
	jwt    jwt.Manager
	logger *zap.Logger
}

func NewHandler(p HandlerParams) *Handler {
	return &Handler{
		feed:   p.Feed,
		jwt:    p.JWT,
		logger: p.Logger.Named("ws.handler"),
	}
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	userID, err := h.authFromHeader(r)
	if err != nil && !errors.Is(err, ErrNotAuthorized) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		h.logger.Error("could not upgrade connection", zap.Error(err))
		return
	}
	defer conn.Close() //nolint:errcheck

	// Браузер не может выставить заголовок — ждём токен первым сообщением.
	if userID == "" {
		userID, err = h.authFromMessage(conn)
		if err != nil {
			h.logger.Debug("auth failed", zap.Error(err))
			return
		}
	}

	ctx, cancel := context.WithCancel(r.Context())
	defer cancel()

	go func() {
		defer cancel()
		for {
			if _, _, err := conn.ReadMessage(); err != nil {
				return
			}
		}
	}()

	ch, err := h.feed.Subscribe(ctx, userID)
	if err != nil {
		h.logger.Error("could not subscribe", zap.String("user_id", userID), zap.Error(err))
		return
	}

	for event := range ch {
		data, err := json.Marshal(event)
		if err != nil {
			h.logger.Warn("could not marshal event", zap.Error(err))
			continue
		}

		if err := conn.WriteMessage(websocket.TextMessage, data); err != nil {
			if !errors.Is(err, context.Canceled) {
				h.logger.Warn("could not write message", zap.Error(err))
			}
			return
		}
	}
}

func (h *Handler) authFromHeader(r *http.Request) (string, error) {
	auth := r.Header.Get("Authorization")
	if auth == "" {
		return "", ErrNotAuthorized
	}

	parts := strings.SplitN(auth, " ", 2)
	if len(parts) != 2 || !strings.EqualFold(parts[0], "bearer") {
		return "", errors.New("missing Authorization header")
	}

	claims, err := h.jwt.Validate(parts[1])
	if err != nil {
		return "", fmt.Errorf("bad jwt token %w", err)
	}

	return claims.UserID, nil
}

func (h *Handler) authFromMessage(conn *websocket.Conn) (string, error) {
	const authTimeout = 3 * time.Second

	if err := conn.SetReadDeadline(time.Now().Add(authTimeout)); err != nil {
		return "", err
	}

	_, msg, err := conn.ReadMessage()
	if err != nil {
		return "", errors.New("auth timeout: no token received")
	}

	if err := conn.SetReadDeadline(time.Time{}); err != nil {
		return "", err
	}

	claims, err := h.jwt.Validate(string(msg))
	if err != nil {
		return "", fmt.Errorf("invalid token: %w", err)
	}

	return claims.UserID, nil
}
