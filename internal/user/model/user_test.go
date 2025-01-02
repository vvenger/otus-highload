package user

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_hashPassword(t *testing.T) {

	password := "password123"

	got, err := HashPassword(password)

	require.NoError(t, err)

	err = CheckPassword(password, got)

	require.NoError(t, err)

}
