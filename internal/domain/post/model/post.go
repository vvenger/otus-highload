package post

import (
	"time"

	"github.com/google/uuid"
)

type Post struct {
	ID        uuid.UUID
	Text      string
	AuthorID  uuid.UUID
	CreatedAt time.Time
	UpdatedAt time.Time
}

type CreatePost struct {
	Text     string
	AuthorID uuid.UUID
}

type UpdatePost struct {
	ID   uuid.UUID
	Text string
}

type Event struct {
	Type     string
	PostID   string
	AuthorID string
	Text     string
}

type FeedFilter struct {
	UserID    uuid.UUID
	AuthorIDs []uuid.UUID
	Offset    int
	Limit     int
}
