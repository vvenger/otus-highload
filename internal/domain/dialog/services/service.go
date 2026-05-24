package dialog

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	model "github.com/vvenger/otus-highload/internal/domain/dialog/model"
	"go.uber.org/fx"
)

type MessageRepository interface {
	Send(ctx context.Context, req model.SendMessage) error
	List(ctx context.Context, fromUserID, toUserID uuid.UUID) ([]model.Message, error)
}

type ServiceParams struct {
	fx.In
	Repo MessageRepository
}

type DialogService struct {
	repo MessageRepository
}

func NewDialogService(p ServiceParams) *DialogService {
	return &DialogService{repo: p.Repo}
}

func (s *DialogService) Send(ctx context.Context, req model.SendMessage) error {
	if err := s.repo.Send(ctx, req); err != nil {
		return fmt.Errorf("could not send message: %w", err)
	}

	return nil
}

func (s *DialogService) List(ctx context.Context, fromUserID, toUserID uuid.UUID) ([]model.Message, error) {
	messages, err := s.repo.List(ctx, fromUserID, toUserID)
	if err != nil {
		return nil, fmt.Errorf("could not list messages: %w", err)
	}

	return messages, nil
}
