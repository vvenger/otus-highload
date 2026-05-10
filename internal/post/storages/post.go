package post

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	model "github.com/vvenger/otus-highload/internal/post/model"
	"go.uber.org/fx"
)

type PostStorageParams struct {
	fx.In
	DB *pgxpool.Pool
}

type PostStorage struct {
	db *pgxpool.Pool
}

func NewPostStorage(p PostStorageParams) *PostStorage {
	return &PostStorage{db: p.DB}
}

func (s *PostStorage) Create(ctx context.Context, req model.CreatePost) (uuid.UUID, error) {
	sql := `
		INSERT INTO posts (id, text, author_id)
		VALUES (@id, @text, @author_id)`

	id := uuid.New()

	args := pgx.NamedArgs{
		"id":        id,
		"text":      req.Text,
		"author_id": req.AuthorID,
	}

	if _, err := s.db.Exec(ctx, sql, args); err != nil {
		return uuid.UUID{}, fmt.Errorf("could not create post: %w", err)
	}

	return id, nil
}

func (s *PostStorage) Update(ctx context.Context, req model.UpdatePost) error {
	sql := `
		UPDATE posts
		SET 
			text = @text, 
			updated_at = @updated_at
		WHERE 
			id = @id`

	args := pgx.NamedArgs{
		"id":         req.ID,
		"text":       req.Text,
		"updated_at": time.Now().UTC(),
	}

	tag, err := s.db.Exec(ctx, sql, args)
	if err != nil {
		return fmt.Errorf("could not update post: %w", err)
	}

	if tag.RowsAffected() == 0 {
		return model.ErrNotFound
	}

	return nil
}

func (s *PostStorage) Delete(ctx context.Context, id uuid.UUID) error {
	sql := `DELETE FROM posts WHERE id = $1`

	tag, err := s.db.Exec(ctx, sql, id)
	if err != nil {
		return fmt.Errorf("could not delete post: %w", err)
	}

	if tag.RowsAffected() == 0 {
		return model.ErrNotFound
	}

	return nil
}

func (s *PostStorage) GetByID(ctx context.Context, id uuid.UUID) (model.Post, error) {
	sql := `
		SELECT 
			id, 
			text, 
			author_id, 
			created_at, 
			updated_at
		FROM 
			posts
		WHERE 
			id = $1`

	var p model.Post
	err := s.db.QueryRow(ctx, sql, id).Scan(
		&p.ID,
		&p.Text,
		&p.AuthorID,
		&p.CreatedAt,
		&p.UpdatedAt,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return model.Post{}, model.ErrNotFound
		}

		return model.Post{}, fmt.Errorf("could not get post: %w", err)
	}

	return p, nil
}

func (s *PostStorage) Posts(ctx context.Context, filter model.FeedFilter) ([]model.Post, error) {
	sq := squirrel.
		Select(
			"id",
			"text",
			"author_id",
			"created_at",
			"updated_at",
		).
		From("posts").
		OrderBy("created_at DESC").
		Limit(uint64(filter.Limit)).
		PlaceholderFormat(squirrel.Dollar)

	if len(filter.AuthorIDs) != 0 {
		sq = sq.Where(squirrel.Eq{"author_id": filter.AuthorIDs})
	}

	if filter.Offset != 0 {
		sq = sq.Offset(uint64(filter.Offset))
	}

	sql, args, err := sq.ToSql()
	if err != nil {
		return nil, fmt.Errorf("could not build query: %w", err)
	}

	rows, err := s.db.Query(ctx, sql, args...)
	if err != nil {
		return nil, fmt.Errorf("could not execute query: %w", err)
	}
	defer rows.Close()

	var posts []model.Post
	for rows.Next() {
		var p model.Post
		if err := rows.Scan(
			&p.ID,
			&p.Text,
			&p.AuthorID,
			&p.CreatedAt,
			&p.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("could not scan row: %w", err)
		}

		posts = append(posts, p)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("could not iterate rows: %w", err)
	}

	return posts, nil
}
