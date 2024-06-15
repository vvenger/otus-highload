package domain

import "time"

type LoginRequest struct {
	Login    string
	Password string
}

type RegisterRequest struct {
	FirstName  string
	SecondName string
	Birthdate  time.Time
	Biography  *string
	City       string
	Password   string
}

type RegisterResponse struct {
	ID string
}

type User struct {
	ID         string
	FirstName  string
	SecondName string
	Birthdate  time.Time
	Biography  *string
	City       string
}
