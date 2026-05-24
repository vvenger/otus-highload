package feed

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	model "github.com/vvenger/otus-highload/internal/domain/post/model"
)

const (
	feedKeyPrefix = "feed:"
	feedMaxLen    = 1000
)

type cachePost struct {
	ID        string `json:"id"`
	Text      string `json:"text"`
	AuthorID  string `json:"author_id"`
	CreatedAt string `json:"created_at"`
}

type FeedCache struct {
	rdb *redis.Client
}

func NewFeedCache(rdb *redis.Client) *FeedCache {
	return &FeedCache{rdb: rdb}
}

func feedKey(userID uuid.UUID) string {
	return feedKeyPrefix + userID.String()
}

func (c *FeedCache) GetFeed(ctx context.Context, filter model.FeedFilter) ([]model.Post, error) {
	key := feedKey(filter.UserID)

	exists, err := c.rdb.Exists(ctx, key).Result()
	if err != nil {
		return nil, fmt.Errorf("could not check feed cache: %w", err)
	}

	if exists == 0 {
		return nil, model.ErrNotFound
	}

	end := int64(filter.Offset + filter.Limit - 1)

	items, err := c.rdb.LRange(ctx, key, int64(filter.Offset), end).Result()
	if err != nil {
		return nil, fmt.Errorf("could not read feed cache: %w", err)
	}

	posts := make([]model.Post, 0, len(items))
	for _, item := range items {
		var cp cachePost
		if err := json.Unmarshal([]byte(item), &cp); err != nil {
			return nil, fmt.Errorf("could not unmarshal cached post: %w", err)
		}

		if post, err := fromCachePost(cp); err == nil {
			posts = append(posts, post)
		}
	}

	if len(posts) == 0 {
		return nil, model.ErrNotFound
	}

	return posts, nil
}

func (c *FeedCache) SetFeed(ctx context.Context, userID uuid.UUID, posts []model.Post) error {
	key := feedKey(userID)

	pipe := c.rdb.Pipeline()
	pipe.Del(ctx, key)

	if len(posts) > 0 {
		values := make([]any, 0, len(posts))
		for _, p := range posts {
			data, err := json.Marshal(toCachePost(p))
			if err != nil {
				return fmt.Errorf("could not marshal post: %w", err)
			}

			values = append(values, data)
		}

		pipe.RPush(ctx, key, values...)
		pipe.LTrim(ctx, key, 0, feedMaxLen-1)
	}

	if _, err := pipe.Exec(ctx); err != nil && !errors.Is(err, redis.Nil) {
		return fmt.Errorf("could not set feed cache: %w", err)
	}

	return nil
}

func (c *FeedCache) PushPost(ctx context.Context, userID uuid.UUID, post model.Post) error {
	key := feedKey(userID)

	data, err := json.Marshal(toCachePost(post))
	if err != nil {
		return fmt.Errorf("could not marshal post: %w", err)
	}

	pipe := c.rdb.Pipeline()
	pipe.LPush(ctx, key, data)
	pipe.LTrim(ctx, key, 0, feedMaxLen-1)

	if _, err := pipe.Exec(ctx); err != nil {
		return fmt.Errorf("could not push post to feed: %w", err)
	}

	return nil
}

func (c *FeedCache) InvalidateFeed(ctx context.Context, userID uuid.UUID) error {
	if err := c.rdb.Del(ctx, feedKey(userID)).Err(); err != nil {
		return fmt.Errorf("could not invalidate feed cache: %w", err)
	}

	return nil
}

func toCachePost(p model.Post) cachePost {
	return cachePost{
		ID:        p.ID.String(),
		Text:      p.Text,
		AuthorID:  p.AuthorID.String(),
		CreatedAt: p.CreatedAt.UTC().Format(time.RFC3339),
	}
}

func fromCachePost(cp cachePost) (model.Post, error) {
	id, err := uuid.Parse(cp.ID)
	if err != nil {
		return model.Post{}, fmt.Errorf("could not parse post id: %w", err)
	}

	authorID, err := uuid.Parse(cp.AuthorID)
	if err != nil {
		return model.Post{}, fmt.Errorf("could not parse author id: %w", err)
	}

	createdAt, err := time.Parse(time.RFC3339, cp.CreatedAt)
	if err != nil {
		return model.Post{}, fmt.Errorf("could not parse created at: %w", err)
	}

	return model.Post{
		ID:        id,
		Text:      cp.Text,
		AuthorID:  authorID,
		CreatedAt: createdAt,
	}, nil
}
