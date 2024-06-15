package services

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_hashPassword(t *testing.T) {

	password := "password123"

	got, err := hashPassword(password)

	require.NoError(t, err)

	err = checkPassword(password, got)

	require.NoError(t, err)

}
