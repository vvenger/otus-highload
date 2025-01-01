package user

import "time"

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
