package storages

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/jackc/pgconn"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/vvenger/otus-highload/internal/domain"
	"github.com/vvenger/otus-highload/internal/errs"
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
			id = @id`

	args := pgx.NamedArgs{
		"id": login,
	}

	var password string
	err := s.db.QueryRow(ctx, sql, args).Scan(&password)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return "", errs.ErrNotFound
		}

		return "", fmt.Errorf("could not get user: %w", err)
	}

	return password, nil
}

func (s *UserStorage) Register(ctx context.Context, user *domain.RegisterRequest) (string, error) {
	sql := `INSERT INTO users (
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

	args := pgx.NamedArgs{
		"id":          id,
		"password":    user.Password,
		"first_name":  user.FirstName,
		"second_name": user.SecondName,
		"birthdate":   user.Birthdate,
		"biography":   user.Biography,
		"city":        user.City,
	}

	_, err := s.db.Exec(ctx, sql, args)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == PgUniqueViolation {
			return "", errs.ErrConflict
		}

		return "", fmt.Errorf("could not insert user: %w", err)
	}

	return id, nil

}

func (s *UserStorage) User(ctx context.Context, id string) (domain.User, error) {
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
			id = @id`

	args := pgx.NamedArgs{
		"id": id,
	}

	var user domain.User
	err := s.db.QueryRow(ctx, sql, args).Scan(
		&user.ID,
		&user.FirstName,
		&user.SecondName,
		&user.Birthdate,
		&user.Biography,
		&user.City,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return domain.User{}, errs.ErrNotFound
		}

		return domain.User{}, fmt.Errorf("could not get user: %w", err)
	}

	return user, nil
}
