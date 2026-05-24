package web

import (
	"context"

	"github.com/google/uuid"
	"github.com/vvenger/otus-highload/internal/chat/web/api"
	dialogmodel "github.com/vvenger/otus-highload/internal/domain/dialog/model"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	"go.uber.org/zap"
)

type DialogService interface {
	Send(ctx context.Context, req dialogmodel.SendMessage) error
	List(ctx context.Context, fromUserID, toUserID uuid.UUID) ([]dialogmodel.Message, error)
}

type chatHandler struct {
	api.UnimplementedHandler
	dialog DialogService
}

//nolint:nilerr
func (h *chatHandler) DialogUserIDSendPost(
	ctx context.Context,
	req api.OptDialogUserIDSendPostReq,
	params api.DialogUserIDSendPostParams,
) (api.DialogUserIDSendPostRes, error) {
	tok, ok := jwt.Ctx(ctx)
	if !ok {
		return &api.R401{}, nil
	}

	fromID, err := uuid.Parse(tok.UserID)
	if err != nil {
		return &api.R401{}, nil
	}

	toID, err := uuid.Parse(string(params.UserID))
	if err != nil {
		return &api.R400{}, nil
	}

	body, ok := req.Get()
	if !ok {
		return &api.R400{}, nil
	}

	if err := h.dialog.Send(ctx, dialogmodel.SendMessage{
		FromUserID: fromID,
		ToUserID:   toID,
		Text:       string(body.GetText()),
	}); err != nil {
		logger.Ctx(ctx).Error("DialogUserIDSendPost", zap.Error(err))
		return &api.DialogUserIDSendPostInternalServerError{}, nil
	}

	return &api.DialogUserIDSendPostOK{}, nil
}

//nolint:nilerr
func (h *chatHandler) DialogUserIDListGet(
	ctx context.Context,
	params api.DialogUserIDListGetParams,
) (api.DialogUserIDListGetRes, error) {
	tok, ok := jwt.Ctx(ctx)
	if !ok {
		return &api.R401{}, nil
	}

	fromID, err := uuid.Parse(tok.UserID)
	if err != nil {
		return &api.R401{}, nil
	}

	toID, err := uuid.Parse(string(params.UserID))
	if err != nil {
		return &api.R400{}, nil
	}

	messages, err := h.dialog.List(ctx, fromID, toID)
	if err != nil {
		logger.Ctx(ctx).Error("DialogUserIDListGet", zap.Error(err))
		return &api.DialogUserIDListGetInternalServerError{}, nil
	}

	result := make(api.DialogUserIDListGetOKApplicationJSON, 0, len(messages))
	for _, m := range messages {
		result = append(result, api.DialogMessage{
			From: api.UserId(m.FromUserID.String()),
			To:   api.UserId(m.ToUserID.String()),
			Text: api.DialogMessageText(m.Text),
		})
	}

	return &result, nil
}
