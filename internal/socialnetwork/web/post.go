package web

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	"github.com/vvenger/otus-highload/internal/pkg/requestid"
	postmodel "github.com/vvenger/otus-highload/internal/domain/post/model"
	"github.com/vvenger/otus-highload/internal/socialnetwork/web/api"
	"go.uber.org/zap"
)

//nolint:nilerr
func (s *handler) PostCreatePost(ctx context.Context, req api.OptPostCreatePostReq) (api.PostCreatePostRes, error) {
	tok, ok := jwt.Ctx(ctx)
	if !ok {
		return &api.R401{}, nil
	}

	authorID, err := uuid.Parse(tok.UserID)
	if err != nil {
		return &api.R401{}, nil
	}

	body, ok := req.Get()
	if !ok {
		return &api.R400{}, nil
	}

	id, err := s.post.Create(ctx, postmodel.CreatePost{
		Text:     string(body.GetText()),
		AuthorID: authorID,
	})
	if err != nil {
		logger.Ctx(ctx).Error("PostCreatePost", zap.Error(err))

		return &api.PostCreatePostInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	postID := api.PostId(id.String())

	return &postID, nil
}

//nolint:nilerr
func (s *handler) PostUpdatePut(ctx context.Context, req api.OptPostUpdatePutReq) (api.PostUpdatePutRes, error) {
	tok, ok := jwt.Ctx(ctx)
	if !ok {
		return &api.R401{}, nil
	}

	body, ok := req.Get()
	if !ok {
		return &api.R400{}, nil
	}

	postID, err := uuid.Parse(string(body.GetID()))
	if err != nil {
		return &api.R400{}, nil
	}

	if err := s.post.Update(ctx, postmodel.UpdatePost{
		ID:   postID,
		Text: string(body.GetText()),
	}); err != nil {
		if errors.Is(err, postmodel.ErrNotFound) {
			return &api.R400{}, nil
		}

		logger.Ctx(ctx).Error(
			"PostUpdatePut",
			zap.String("user_id", tok.UserID),
			zap.String("post_id", string(body.GetID())),
			zap.Error(err),
		)

		return &api.PostUpdatePutInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	return &api.PostUpdatePutOK{}, nil
}

//nolint:nilerr
func (s *handler) PostDeleteIDPut(ctx context.Context, params api.PostDeleteIDPutParams) (api.PostDeleteIDPutRes, error) {
	tok, ok := jwt.Ctx(ctx)
	if !ok {
		return &api.R401{}, nil
	}

	postID, err := uuid.Parse(string(params.ID))
	if err != nil {
		return &api.R400{}, nil
	}

	if err := s.post.Delete(ctx, postID); err != nil {
		if errors.Is(err, postmodel.ErrNotFound) {
			return &api.PostDeleteIDPutOK{}, nil
		}

		logger.Ctx(ctx).Error(
			"PostDeleteIDPut",
			zap.String("user_id", tok.UserID),
			zap.String("post_id", string(params.ID)),
			zap.Error(err),
		)

		return &api.PostDeleteIDPutInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	return &api.PostDeleteIDPutOK{}, nil
}

//nolint:nilerr
func (s *handler) PostGetIDGet(ctx context.Context, params api.PostGetIDGetParams) (api.PostGetIDGetRes, error) {
	postID, err := uuid.Parse(string(params.ID))
	if err != nil {
		return &api.R400{}, nil
	}

	p, err := s.post.GetByID(ctx, postID)
	if err != nil {
		if errors.Is(err, postmodel.ErrNotFound) {
			return &api.R400{}, nil
		}

		logger.Ctx(ctx).Error(
			"PostGetIDGet",
			zap.String("post_id", string(params.ID)),
			zap.Error(err),
		)

		return &api.PostGetIDGetInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	authorID := api.UserId(p.AuthorID.String())
	postID2 := api.PostId(p.ID.String())

	return &api.Post{
		ID:           api.NewOptPostId(postID2),
		Text:         api.NewOptPostText(api.PostText(p.Text)),
		AuthorUserID: api.NewOptUserId(authorID),
	}, nil
}
