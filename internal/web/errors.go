package web

type ErrorCode int

const (
	ErrInternalServer ErrorCode = 1
)

var ErrorMessage = map[ErrorCode]string{
	ErrInternalServer: "internal server error",
}
