package friend

import "errors"

var (
	ErrNotFound      = errors.New("not found")
	ErrConflict      = errors.New("conflict error")
	ErrInvalidParams = errors.New("invalid params")
)
