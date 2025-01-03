package user

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/jackc/pgconn"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	model "github.com/vvenger/otus-highload/internal/user/model"
	"go.uber.org/fx"
)

const (
	PgUniqueViolation = "23505"
)

type UserStorageParams struct {
	fx.In
	DB *pgxpool.Pool
}

type UserStorage struct {
	db *pgxpool.Pool
}

func NewUserStorage(params UserStorageParams) *UserStorage {
	return &UserStorage{
		db: params.DB,
	}
}

func (s *UserStorage) FindLogin(ctx context.Context, login string) (string, error) {
	sql := `
		SELECT
			password
		FROM
			users
		WHERE
			id = $1`

	var password string
	if err := s.db.QueryRow(ctx, sql, login).Scan(&password); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return "", model.ErrNotFound
		}

		return "", fmt.Errorf("could not get user: %w", err)
	}

	return password, nil
}

func (s *UserStorage) Register(ctx context.Context, user model.RegisterUser) (string, error) {
	sql := `
		INSERT INTO users (
			id, 
			password,
			first_name,
			second_name,
			birthdate,
			biography,
			city
		) VALUES (
			@id,
			@password,
			@first_name,
			@second_name,
			@birthdate,
			@biography,
			@city
		)`

	id := uuid.NewString()

	var biography *string
	if user.Biography != "" {
		biography = &user.Biography
	}

	args := pgx.NamedArgs{
		"id":          id,
		"password":    user.Password,
		"first_name":  user.FirstName,
		"second_name": user.SecondName,
		"birthdate":   user.Birthdate,
		"biography":   biography,
		"city":        user.City,
	}

	if _, err := s.db.Exec(ctx, sql, args); err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == PgUniqueViolation {
			return "", model.ErrConflict
		}

		return "", fmt.Errorf("could not insert user: %w", err)
	}

	return id, nil
}

func (s *UserStorage) User(ctx context.Context, id string) (model.User, error) {
	sql := `
		SELECT 
			id, 
			first_name,
			second_name,
			birthdate,
			biography,
			city
		FROM 
			users
		WHERE
			id = $1`

	var (
		user      model.User
		biography *string
	)

	err := s.db.QueryRow(ctx, sql, id).Scan(
		&user.ID,
		&user.FirstName,
		&user.SecondName,
		&user.Birthdate,
		&biography,
		&user.City,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return model.User{}, model.ErrNotFound
		}

		return model.User{}, fmt.Errorf("could not get user: %w", err)
	}

	if biography != nil {
		user.Biography = *biography
	}

	return user, nil
}
