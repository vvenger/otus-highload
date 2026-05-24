package web

import (
	"github.com/vvenger/otus-highload/internal/socialnetwork/web/api"
)

func optString(s string) api.OptString {
	if s == "" {
		return api.OptString{}
	}

	return api.NewOptString(s)
}

//nolint:unparam
func optErrorCode(v ErrorCode) api.OptInt {
	return api.NewOptInt(int(v))
}
