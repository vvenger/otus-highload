package web

import (
	"github.com/vvenger/otus-highload/internal/web/api"
)

func optString(s string) api.OptString {
	if s == "" {
		return api.OptString{}
	}

	return api.NewOptString(s)
}
