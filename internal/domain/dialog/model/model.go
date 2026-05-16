package dialog

import (
	"bytes"
	"time"

	"github.com/google/uuid"
)

type Message struct {
	ID         uuid.UUID
	DialogID   uuid.UUID
	FromUserID uuid.UUID
	ToUserID   uuid.UUID
	Text       string
	CreatedAt  time.Time
}

type SendMessage struct {
	FromUserID uuid.UUID
	ToUserID   uuid.UUID
	Text       string
}

func DialogID(a, b uuid.UUID) uuid.UUID {
	// Сортируем, чтобы dialog(A,B) == dialog(B,A)
	if bytes.Compare(a[:], b[:]) > 0 {
		a, b = b, a
	}

	id := append(a[:], b[:]...)

	return uuid.NewSHA1(uuid.NameSpaceOID, id)
}
