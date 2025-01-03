package logger

import (
	"context"

	"go.uber.org/zap"
)

type ctxKey struct{}

func With(ctx context.Context, logger *zap.Logger) context.Context {
	return context.WithValue(ctx, ctxKey{}, logger)
}

func Ctx(ctx context.Context) *zap.Logger {
	l, ok := ctx.Value(ctxKey{}).(*zap.Logger)
	if ok {
		return l
	}

	return zap.L()
}

func WithFields(ctx context.Context, fields ...zap.Field) context.Context {
	l := Ctx(ctx).With(fields...)

	return With(ctx, l)
}

func Debug(ctx context.Context, msg string, fields ...zap.Field) {
	Ctx(ctx).Debug(msg, fields...)
}

func Info(ctx context.Context, msg string, fields ...zap.Field) {
	Ctx(ctx).Info(msg, fields...)
}

func Warn(ctx context.Context, msg string, fields ...zap.Field) {
	Ctx(ctx).Warn(msg, fields...)
}

func Error(ctx context.Context, msg string, err error) {
	Ctx(ctx).Error(msg, zap.Error(err))
}

func HasLogger(ctx context.Context) bool {
	_, ok := ctx.Value(ctxKey{}).(*zap.Logger)
	return ok
}
