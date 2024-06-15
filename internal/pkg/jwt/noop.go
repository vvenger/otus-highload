package jwt

import (
	model "github.com/vvenger/otus-highload/internal/domain"
)

type managerNoop struct {
	userID string
	token  string
}

func NewNoop(userID, token string) Manager {
	return &managerNoop{
		userID: userID,
		token:  token,
	}
}

func (s *managerNoop) NewToken(val model.JwtToken) (string, error) {
	return s.token, nil
}

func (s *managerNoop) Validate(token string) (model.JwtToken, error) {
	return model.JwtToken{
		UserID: s.userID,
	}, nil
}
