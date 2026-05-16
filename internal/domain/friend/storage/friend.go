package friend

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
	model "github.com/vvenger/otus-highload/internal/domain/friend/model"
	"go.uber.org/fx"
)

const pgUniqueViolation = "23505"

type FriendStorageParams struct {
	fx.In
	DB *pgxpool.Pool
}

type FriendStorage struct {
	db *pgxpool.Pool
}

func NewFriendStorage(p FriendStorageParams) *FriendStorage {
	return &FriendStorage{db: p.DB}
}

func (s *FriendStorage) Add(ctx context.Context, req model.UserFriend) error {
	sql := `
		INSERT INTO friends (
			user_id, 
			friend_id
		) VALUES (
			@user_id,
			@friend_id
		)`

	args := pgx.NamedArgs{
		"user_id":   req.UserID,
		"friend_id": req.FriendID,
	}

	if _, err := s.db.Exec(ctx, sql, args); err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == pgUniqueViolation {
			return model.ErrConflict
		}

		return fmt.Errorf("could not add friend: %w", err)
	}

	return nil
}

func (s *FriendStorage) Delete(ctx context.Context, req model.UserFriend) error {
	sql := `
		DELETE FROM friends
		WHERE 
		      user_id = @user_id 
		  AND friend_id = @friend_id`

	args := pgx.NamedArgs{
		"user_id":   req.UserID,
		"friend_id": req.FriendID,
	}

	tag, err := s.db.Exec(ctx, sql, args)
	if err != nil {
		return fmt.Errorf("could not delete friend: %w", err)
	}

	if tag.RowsAffected() == 0 {
		return model.ErrNotFound
	}

	return nil
}

func (s *FriendStorage) GetFollowerIDs(ctx context.Context, authorID uuid.UUID) ([]uuid.UUID, error) {
	sql := `
		SELECT user_id
		FROM friends
		WHERE friend_id = $1`

	rows, err := s.db.Query(ctx, sql, authorID)
	if err != nil {
		return nil, fmt.Errorf("could not execute query: %w", err)
	}
	defer rows.Close()

	var ids []uuid.UUID
	for rows.Next() {
		var id uuid.UUID
		if err := rows.Scan(&id); err != nil {
			return nil, fmt.Errorf("could not scan row: %w", err)
		}

		ids = append(ids, id)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("could not iterate rows: %w", err)
	}

	return ids, nil
}

func (s *FriendStorage) GetFriendIDs(ctx context.Context, userID uuid.UUID) ([]uuid.UUID, error) {
	sql := `
		SELECT friend_id
		FROM friends
		WHERE user_id = $1`

	rows, err := s.db.Query(ctx, sql, userID)
	if err != nil {
		return nil, fmt.Errorf("could not execute query: %w", err)
	}
	defer rows.Close()

	var ids []uuid.UUID
	for rows.Next() {
		var id uuid.UUID
		if err := rows.Scan(&id); err != nil {
			return nil, fmt.Errorf("could not scan row: %w", err)
		}

		ids = append(ids, id)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("could not iterate rows: %w", err)
	}

	return ids, nil
}
