package errs

import "errors"

var (
	ErrInvalidParams       = errors.New("invalid params")
	ErrNotFound            = errors.New("not found")
	ErrInternalServerError = errors.New("internal server error")
	ErrConflict            = errors.New("conflict error")
	ErrUnauthorized        = errors.New("unauthorized")
	ErrForbidden           = errors.New("forbidden")
)
