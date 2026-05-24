package web

import (
	"context"
	"errors"

	"github.com/google/uuid"
	friendmodel "github.com/vvenger/otus-highload/internal/domain/friend/model"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	"github.com/vvenger/otus-highload/internal/pkg/requestid"
	"github.com/vvenger/otus-highload/internal/socialnetwork/web/api"
	"go.uber.org/zap"
)

//nolint:nilerr
func (s *handler) FriendSetUserIDPut(ctx context.Context, params api.FriendSetUserIDPutParams) (api.FriendSetUserIDPutRes, error) {
	tok, ok := jwt.Ctx(ctx)
	if !ok {
		return &api.R401{}, nil
	}

	userID, err := uuid.Parse(tok.UserID)
	if err != nil {
		return &api.R401{}, nil
	}

	friendID, err := uuid.Parse(string(params.UserID))
	if err != nil {
		return &api.R400{}, nil
	}

	if err := s.friend.Add(ctx, friendmodel.UserFriend{
		UserID:   userID,
		FriendID: friendID,
	}); err != nil {
		if errors.Is(err, friendmodel.ErrConflict) {
			return &api.FriendSetUserIDPutOK{}, nil
		}

		logger.Ctx(ctx).Error(
			"FriendSetUserIDPut",
			zap.String("user_id", tok.UserID),
			zap.String("friend_id", string(params.UserID)),
			zap.Error(err),
		)

		return &api.FriendSetUserIDPutInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	return &api.FriendSetUserIDPutOK{}, nil
}

//nolint:nilerr
func (s *handler) FriendDeleteUserIDPut(ctx context.Context, params api.FriendDeleteUserIDPutParams) (api.FriendDeleteUserIDPutRes, error) {
	tok, ok := jwt.Ctx(ctx)
	if !ok {
		return &api.R401{}, nil
	}

	userID, err := uuid.Parse(tok.UserID)
	if err != nil {
		return &api.R401{}, nil
	}

	friendID, err := uuid.Parse(string(params.UserID))
	if err != nil {
		return &api.R400{}, nil
	}

	if err := s.friend.Delete(ctx, friendmodel.UserFriend{
		UserID:   userID,
		FriendID: friendID,
	}); err != nil {
		if errors.Is(err, friendmodel.ErrNotFound) {
			return &api.FriendDeleteUserIDPutOK{}, nil
		}

		logger.Ctx(ctx).Error(
			"FriendDeleteUserIDPut",
			zap.String("user_id", tok.UserID),
			zap.String("friend_id", string(params.UserID)),
			zap.Error(err),
		)

		return &api.FriendDeleteUserIDPutInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	return &api.FriendDeleteUserIDPutOK{}, nil
}
