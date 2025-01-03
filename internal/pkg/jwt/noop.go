package jwt

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

func (s *managerNoop) NewToken(val Token) (string, error) {
	return s.token, nil
}

func (s *managerNoop) Validate(token string) (Token, error) {
	return Token{
		UserID: s.userID,
	}, nil
}
