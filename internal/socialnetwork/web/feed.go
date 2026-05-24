package web

import (
	"context"

	"github.com/google/uuid"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
	"github.com/vvenger/otus-highload/internal/pkg/logger"
	"github.com/vvenger/otus-highload/internal/pkg/requestid"
	postmodel "github.com/vvenger/otus-highload/internal/domain/post/model"
	"github.com/vvenger/otus-highload/internal/socialnetwork/web/api"
	"go.uber.org/zap"
)

//nolint:nilerr
func (s *handler) PostFeedGet(ctx context.Context, params api.PostFeedGetParams) (api.PostFeedGetRes, error) {
	tok, ok := jwt.Ctx(ctx)
	if !ok {
		return &api.R401{}, nil
	}

	userID, err := uuid.Parse(tok.UserID)
	if err != nil {
		return &api.R401{}, nil
	}

	friendIDs, err := s.friend.GetFriendIDs(ctx, userID)
	if err != nil {
		logger.Ctx(ctx).Error("PostFeedGet: get friend ids", zap.Error(err))

		return &api.PostFeedGetInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	posts, err := s.feed.GetFeed(ctx, postmodel.FeedFilter{
		UserID:    userID,
		AuthorIDs: append(friendIDs, userID),
		Offset:    params.Offset.Value,
		Limit:     params.Limit.Value,
	})
	if err != nil {
		logger.Ctx(ctx).Error("PostFeedGet: get posts", zap.Error(err))

		return &api.PostFeedGetInternalServerError{
			Response: api.R5xx{
				Code:      optErrorCode(ErrInternalServer),
				Message:   ErrorMessage[ErrInternalServer],
				RequestID: optString(requestid.Get(ctx)),
			},
			RetryAfter: api.NewOptInt(s.retryAfter),
		}, nil
	}

	result := make(api.PostFeedGetOKApplicationJSON, 0, len(posts))
	for _, p := range posts {
		authorID := api.UserId(p.AuthorID.String())
		postID := api.PostId(p.ID.String())

		result = append(result, api.Post{
			ID:           api.NewOptPostId(postID),
			Text:         api.NewOptPostText(api.PostText(p.Text)),
			AuthorUserID: api.NewOptUserId(authorID),
		})
	}

	return &result, nil
}
