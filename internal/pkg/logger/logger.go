package logger

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/rs/zerolog"
)

type Config struct {
	LogLevel  string
	LogFormat string
}

func New(out io.Writer, c Config) zerolog.Logger {
	lvl, err := zerolog.ParseLevel(c.LogLevel)
	if err != nil {
		lvl = zerolog.ErrorLevel
	}

	if c.LogFormat == "console" {
		return newConsole(out, lvl)
	}

	return newJSON(out, lvl)
}

func newConsole(out io.Writer, level zerolog.Level) zerolog.Logger {
	w := zerolog.ConsoleWriter{
		Out:     out,
		NoColor: false,
		FormatCaller: func(i interface{}) string {
			var c string
			if cc, ok := i.(string); ok {
				c = cc
			}

			if len(c) > 0 {
				if cwd, err := os.Getwd(); err == nil {
					if rel, err := filepath.Rel(cwd, c); err == nil {
						c = rel
					}
				}
				c = fmt.Sprintf("%s \x1b[36m>\x1b[0m", c)
			}

			return c
		},
		PartsExclude: []string{
			zerolog.TimestampFieldName,
		},
	}

	return zerolog.New(w).Level(level)
}

func newJSON(w io.Writer, level zerolog.Level) zerolog.Logger {
	l := zerolog.New(w).
		Level(level).
		With().
		Timestamp().
		Logger()

	return l
}
