package app

import (
	"bytes"
	"context"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"path"
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

func (f *Fixture) Up(fileName string) error {
	ext := strings.ToLower(path.Ext(fileName))

	f.logger.Debug("up fixture", zap.String("file", fileName))

	switch ext {
	case ".sql":
		return f.UpSQL(fileName)
	case ".csv":
		return f.UpCSV(fileName)
	default:
		return fmt.Errorf("unknown file extension: %s", ext)
	}
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

func (f *Fixture) UpCSV(filePath string) error {
	const (
		batchSize = 1_000
	)

	file, err := os.Open(filePath)
	if err != nil {
		log.Fatal("Unable to read input file "+filePath, err)
	}
	defer file.Close()

	csvReader := csv.NewReader(file)

	cols, err := csvReader.Read()
	if err != nil {
		log.Fatal("Unable to parse file as CSV for "+filePath, err)
	}

	joinSQL := func(fields []string) string {
		var buf bytes.Buffer

		cnt := 0
		for i := range fields {
			cnt += len(fields[i]) + 3
		}

		buf.Grow(cnt + 2)
		buf.WriteRune('(')

		for i := 0; i < len(fields)-1; i++ {
			buf.WriteRune('\'')
			buf.WriteString(fields[i])
			buf.WriteString("',")
		}

		buf.WriteRune('\'')
		buf.WriteString(fields[len(fields)-1])
		buf.WriteRune('\'')
		buf.WriteRune(')')

		return buf.String()
	}

	sqlInsert := fmt.Sprintf("INSERT INTO %s (%s) VALUES ", f.csvTableName(filePath), strings.Join(cols, ", "))

	sql := sqlInsert
	batch := 0
	total := 0
	for {
		row, err := csvReader.Read()
		if err == io.EOF {
			break
		}

		// TODO: optimize.
		sql += joinSQL(row) + ","

		batch++

		if batch == batchSize {
			if err := f.csvExecSQL(sql); err != nil {
				return fmt.Errorf("could not exec sql: %w", err)
			}

			total += batch
			batch = 0

			f.logger.Info("inserted", zap.Int("total", total))

			sql = sqlInsert
		}
	}

	if batch != 0 {
		if err := f.csvExecSQL(sql); err != nil {
			return fmt.Errorf("could not exec sql: %w", err)
		}

		f.logger.Info("inserted", zap.Int("total", total+batch))
	}

	return nil
}

func (f *Fixture) csvTableName(filePath string) string {
	_, file := path.Split(filePath)
	return strings.TrimSuffix(file, path.Ext(file))
}

func (f *Fixture) csvExecSQL(sql string) error {
	sql = strings.TrimSuffix(sql, "),")
	sql += ");"

	if _, err := f.db.Exec(context.Background(), sql); err != nil {
		return fmt.Errorf("could not exec sql: %w", err)
	}

	return nil
}
