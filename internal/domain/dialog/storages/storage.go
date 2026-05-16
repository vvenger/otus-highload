package dialog

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	model "github.com/vvenger/otus-highload/internal/domain/dialog/model"
)

type MessageStorage struct {
	db *pgxpool.Pool
}

func NewMessageStorage(db *pgxpool.Pool) *MessageStorage {
	return &MessageStorage{
		db: db,
	}
}

func (s *MessageStorage) Send(ctx context.Context, req model.SendMessage) error {
	dialogID := model.DialogID(req.FromUserID, req.ToUserID)

	sql := `
		INSERT INTO messages (
			dialog_id, 
			from_user_id, 
			to_user_id, 
			text
		) 
		VALUES (
			@dialog_id, 
			@from_user_id, 
			@to_user_id, 
			@text
		)`

	args := pgx.NamedArgs{
		"dialog_id":    dialogID,
		"from_user_id": req.FromUserID,
		"to_user_id":   req.ToUserID,
		"text":         req.Text,
	}

	if _, err := s.db.Exec(ctx, sql, args); err != nil {
		return fmt.Errorf("could not send message: %w", err)
	}

	return nil
}

func (s *MessageStorage) List(ctx context.Context, fromUserID, toUserID uuid.UUID) ([]model.Message, error) {
	dialogID := model.DialogID(fromUserID, toUserID)

	sql := `
		SELECT 
			id, 
			dialog_id, 
			from_user_id, 
			to_user_id, 
			text, 
			created_at
		FROM 
			messages
		WHERE 
			dialog_id = $1
		ORDER BY created_at`

	rows, err := s.db.Query(ctx, sql, dialogID)
	if err != nil {
		return nil, fmt.Errorf("could not list messages: %w", err)
	}
	defer rows.Close()

	var messages []model.Message
	for rows.Next() {
		var m model.Message
		if err := rows.Scan(
			&m.ID,
			&m.DialogID,
			&m.FromUserID,
			&m.ToUserID,
			&m.Text,
			&m.CreatedAt,
		); err != nil {
			return nil, fmt.Errorf("could not scan row: %w", err)
		}
		messages = append(messages, m)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("could not iterate rows: %w", err)
	}

	return messages, nil
}
