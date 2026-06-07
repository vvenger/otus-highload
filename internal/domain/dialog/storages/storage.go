package dialog

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/tarantool/go-tarantool/v2"

	model "github.com/vvenger/otus-highload/internal/domain/dialog/model"
)

type MessageStorage struct {
	conn *tarantool.Connection
}

func NewMessageStorage(conn *tarantool.Connection) *MessageStorage {
	return &MessageStorage{conn: conn}
}

func (s *MessageStorage) Send(ctx context.Context, req model.SendMessage) error {
	dialogID := model.DialogID(req.FromUserID, req.ToUserID)

	args := []any{
		dialogID.String(),
		req.FromUserID.String(),
		req.ToUserID.String(),
		req.Text,
	}

	fut := s.conn.Do(tarantool.NewCallRequest("dialog_send").Args(args).Context(ctx))
	if _, err := fut.Get(); err != nil {
		return fmt.Errorf("could not send message: %w", err)
	}

	return nil
}

func (s *MessageStorage) List(ctx context.Context, fromUserID, toUserID uuid.UUID) ([]model.Message, error) {
	dialogID := model.DialogID(fromUserID, toUserID)

	args := []any{dialogID.String()}

	fut := s.conn.Do(tarantool.NewCallRequest("dialog_list").Args(args).Context(ctx))
	data, err := fut.Get()
	if err != nil {
		return nil, fmt.Errorf("could not list messages: %w", err)
	}

	if len(data) != 1 {
		return nil, fmt.Errorf("messages list: %w", model.ErrUnexpectedResponse)
	}

	rows, ok := data[0].([]any)
	if !ok || len(rows) == 0 {
		return nil, nil
	}

	messages := make([]model.Message, 0, len(rows))
	for _, row := range rows {
		m, err := decodeMessage(row)
		if err != nil {
			return nil, fmt.Errorf("could not decode message: %w", err)
		}

		messages = append(messages, m)
	}

	return messages, nil
}

func decodeMessage(row any) (model.Message, error) {
	const messageFields = 6

	tuple, ok := row.([]any)
	if !ok || len(tuple) < messageFields {
		return model.Message{}, fmt.Errorf("invalid message tuple: %w", model.ErrUnexpectedResponse)
	}

	id, err := uuid.Parse(tuple[0].(string))
	if err != nil {
		return model.Message{}, fmt.Errorf("invalid id: %w", err)
	}

	dialogID, err := uuid.Parse(tuple[1].(string))
	if err != nil {
		return model.Message{}, fmt.Errorf("invalid dialog_id: %w", err)
	}

	fromUserID, err := uuid.Parse(tuple[2].(string))
	if err != nil {
		return model.Message{}, fmt.Errorf("invalid from_user_id: %w", err)
	}

	toUserID, err := uuid.Parse(tuple[3].(string))
	if err != nil {
		return model.Message{}, fmt.Errorf("invalid to_user_id: %w", err)
	}

	text, _ := tuple[4].(string)
	createdAtSec, _ := tuple[5].(float64)

	return model.Message{
		ID:         id,
		DialogID:   dialogID,
		FromUserID: fromUserID,
		ToUserID:   toUserID,
		Text:       text,
		CreatedAt:  time.Unix(int64(createdAtSec), 0),
	}, nil
}
