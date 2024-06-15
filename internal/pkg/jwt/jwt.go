package jwt

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/vvenger/otus-highload/internal/config"
	model "github.com/vvenger/otus-highload/internal/domain"
	"go.uber.org/fx"
)

type Manager interface {
	NewToken(val model.JwtToken) (string, error)
	Validate(token string) (model.JwtToken, error)
}

type JWTParams struct {
	fx.In
	Config *config.Config
}

type managerImp struct {
	secret string
	expire time.Duration
}

func New(p JWTParams) Manager {
	return &managerImp{
		secret: p.Config.App.Token.Secret,
		expire: time.Duration(p.Config.App.Token.Expire) * time.Minute,
	}
}

type tokenClaims struct {
	jwt.StandardClaims
	UserID string `json:"user_id,omitempty"`
}

func (s *managerImp) NewToken(val model.JwtToken) (string, error) {
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

func (s *managerImp) Validate(token string) (model.JwtToken, error) {
	t, err := jwt.ParseWithClaims(token, &tokenClaims{},
		func(tok *jwt.Token) (interface{}, error) {
			if _, ok := tok.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, jwt.ErrInvalidKey
			}

			return []byte(s.secret), nil
		})
	if err != nil {
		return model.JwtToken{}, fmt.Errorf("could not parse token: %w", err)
	}

	claims, ok := t.Claims.(*tokenClaims)
	if !ok || !t.Valid {
		return model.JwtToken{}, jwt.ErrInvalidKey
	}

	res := model.JwtToken{
		UserID: claims.UserID,
	}

	return res, nil
}
