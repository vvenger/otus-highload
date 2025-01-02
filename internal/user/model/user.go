package user

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

type RegisterUser struct {
	FirstName  string
	SecondName string
	Birthdate  time.Time
	Biography  string
	City       string
	Password   string
}

type User struct {
	ID         string
	FirstName  string
	SecondName string
	Birthdate  time.Time
	Biography  string
	City       string
}

//nolint:wrapcheck
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	return string(bytes), err
}

//nolint:wrapcheck
func CheckPassword(password, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}
