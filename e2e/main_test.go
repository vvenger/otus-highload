package e2e

import (
	"os"
	"testing"

	"github.com/stretchr/testify/suite"
	"github.com/vvenger/otus-highload/internal/config"
)

func TestSuite(t *testing.T) {
	os.Setenv(config.CmdEnvironment, "test")
	os.Setenv(config.CmdPath, "../")

	suite.Run(t, new(UserSuite))
}
