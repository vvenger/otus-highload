package webproxy

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"time"

	"github.com/vvenger/otus-highload/internal/pkg/requestid"
	"github.com/vvenger/otus-highload/internal/socialnetwork/config"
	"go.uber.org/fx"
)

type DialogParams struct {
	fx.In
	Config config.ChatConfig
}

func NewDialogProxy(p DialogParams) (http.Handler, error) {
	target, err := url.Parse(p.Config.URL)
	if err != nil {
		return nil, fmt.Errorf("parse chat url: %w", err)
	}

	proxy := httputil.NewSingleHostReverseProxy(target)

	proxy.Transport = &http.Transport{
		ResponseHeaderTimeout: time.Duration(p.Config.Timeout) * time.Second,
	}

	director := proxy.Director
	proxy.Director = func(req *http.Request) {
		director(req)
		if id := requestid.Get(req.Context()); id != "" {
			req.Header.Set(requestid.HeaderRequestID, id)
		}
	}

	proxy.ModifyResponse = func(resp *http.Response) error {
		resp.Header.Del(requestid.HeaderRequestID)
		return nil
	}

	return proxy, nil
}
