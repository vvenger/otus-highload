package user

import "errors"

var (
	ErrInvalidParams = errors.New("invalid params")
	ErrNotFound      = errors.New("not found")
	ErrConflict      = errors.New("conflict error")
)
