package app

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"slices"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type FixtureParams struct {
	fx.In
	Db     *pgxpool.Pool
	Logger *zap.Logger
}

type Fixture struct {
	db     *pgxpool.Pool
	logger *zap.Logger
}

func NewFixture(p FixtureParams) *Fixture {
	return &Fixture{
		db:     p.Db,
		logger: p.Logger.Named("fixture"),
	}
}

func (f *Fixture) Up(dir string) error {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return fmt.Errorf("could not read fixtures dir: %w", err)
	}

	var files []string
	for _, e := range entries {
		if !e.IsDir() && strings.HasSuffix(e.Name(), ".sql") {
			files = append(files, filepath.Join(dir, e.Name()))
		}
	}

	slices.Sort(files)

	for _, file := range files {
		if err := f.UpSQL(file); err != nil {
			return err
		}
	}

	return nil
}

func (f *Fixture) UpSQL(filePath string) error {
	bytes, err := os.ReadFile(filePath)
	if err != nil {
		return fmt.Errorf("could not read file: %w", err)
	}

	if _, err = f.db.Exec(context.Background(), string(bytes)); err != nil {
		return fmt.Errorf("could not exec sql: %w", err)
	}

	return nil
}
