package web

import "net/http"

type HttpService struct {
	*http.ServeMux
}

func NewHttpService(h *Handler) *HttpService {
	mux := http.NewServeMux()
	mux.Handle("/post/feed/posted", h)

	return &HttpService{mux}
}
