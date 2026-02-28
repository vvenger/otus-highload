package tx

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

type IManager interface {
	Run(ctx context.Context, f func(ctx context.Context) error) error
}

type txKey struct{}

type DB interface {
	CopyFrom(ctx context.Context, tableName pgx.Identifier, columnNames []string, rowSrc pgx.CopyFromSource) (int64, error)
	SendBatch(ctx context.Context, b *pgx.Batch) pgx.BatchResults
	Exec(ctx context.Context, sql string, arguments ...any) (commandTag pgconn.CommandTag, err error)
	Query(ctx context.Context, sql string, args ...any) (pgx.Rows, error)
	QueryRow(ctx context.Context, sql string, args ...any) pgx.Row
}

type Manager struct {
	db *pgxpool.Pool
}

func NewManager(db *pgxpool.Pool) *Manager {
	return &Manager{
		db: db,
	}
}

func (m *Manager) Run(ctx context.Context, f func(ctx context.Context) error) error {
	if InTransaction(ctx) {
		return f(ctx)
	}

	tx, err := m.db.Begin(ctx)
	if err != nil {
		return fmt.Errorf("can't begin transaction: %w", err)
	}

	defer func(ctx context.Context, tx pgx.Tx) { // todo..?
		_ = tx.Rollback(ctx)
	}(ctx, tx)

	txCtx := context.WithValue(ctx, txKey{}, tx)

	if err := f(txCtx); err != nil {
		return err
	}

	if err := tx.Commit(ctx); err != nil {
		return fmt.Errorf("can't commit transaction: %w", err)
	}

	return nil
}

func Extract(ctx context.Context, default_ DB) DB {
	if tx, ok := ctx.Value(txKey{}).(DB); ok {
		return tx
	}

	return default_
}

func InTransaction(ctx context.Context) bool {
	_, ok := ctx.Value(txKey{}).(DB)

	return ok
}
