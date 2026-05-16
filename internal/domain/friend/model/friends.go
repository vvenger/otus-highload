package friend

import "github.com/google/uuid"

type UserFriend struct {
	UserID   uuid.UUID
	FriendID uuid.UUID
}
