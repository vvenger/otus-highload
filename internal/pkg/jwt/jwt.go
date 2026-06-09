package jwt

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

type Manager interface {
	NewToken(val Token) (string, error)
	Validate(token string) (Token, error)
}

type JWTParams struct {
	Secret    string
	ExpMinute int
}

type managerImp struct {
	secret string
	expire time.Duration
}

func New(p JWTParams) Manager {
	return &managerImp{
		secret: p.Secret,
		expire: time.Duration(p.ExpMinute) * time.Minute,
	}
}

type tokenClaims struct {
	jwt.StandardClaims
	UserID string `json:"user_id,omitempty"`
}

func (s *managerImp) NewToken(val Token) (string, error) {
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		UserID: val.UserID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(s.expire).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	})

	accesValue, err := t.SignedString([]byte(s.secret))
	if err != nil {
		return "", fmt.Errorf("could not sign token: %w", err)
	}

	return accesValue, nil
}

func (s *managerImp) Validate(token string) (Token, error) {
	t, err := jwt.ParseWithClaims(token, &tokenClaims{},
		func(tok *jwt.Token) (interface{}, error) {
			if _, ok := tok.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, jwt.ErrInvalidKey
			}

			return []byte(s.secret), nil
		})
	if err != nil {
		return Token{}, fmt.Errorf("could not parse token: %w", err)
	}

	claims, ok := t.Claims.(*tokenClaims)
	if !ok || !t.Valid {
		return Token{}, jwt.ErrInvalidKey
	}

	return Token{
		UserID: claims.UserID,
	}, nil
}
