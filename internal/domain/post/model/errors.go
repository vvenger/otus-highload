package post

import "errors"

var (
	ErrNotFound      = errors.New("not found")
	ErrInvalidParams = errors.New("invalid params")
	ErrForbidden     = errors.New("forbidden")
)
