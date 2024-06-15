package rand

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
)

func RandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)

	if _, err := rand.Read(b); err != nil {
		return nil, fmt.Errorf("could not generate random bytes: %w", err)
	}

	return b, nil
}

func RandomString(n int) (string, error) {
	const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

	bytes, err := RandomBytes(n)
	if err != nil {
		return "", fmt.Errorf("could not generate random string: %w", err)
	}

	for i, b := range bytes {
		bytes[i] = letters[b%byte(len(letters))]
	}

	return string(bytes), nil
}

func RandomBase64String(n int) (string, error) {
	b, err := RandomBytes(n)
	if err != nil {
		return "", fmt.Errorf("could not generate random base64 string: %w", err)
	}

	return base64.URLEncoding.EncodeToString(b), nil
}
