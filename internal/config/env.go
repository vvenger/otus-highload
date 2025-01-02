package config

import (
	"os"
	"strings"
)

const (
	CmdEnvironment = "ENVIRONMENT"
	CmdPath        = "CONFIG_PATH"
	CmdLogLevel    = "LOG_LEVEL"
	CmdLogFormat   = "LOG_FORMAT"
)

const (
	envDev  = "dev"
	envTest = "test"
	envProd = "prod"
)

var envList = map[string]struct{}{
	envTest: {},
	envDev:  {},
	envProd: {},
}

func GetEnvironment() string {
	env := strings.ToLower(os.Getenv(CmdEnvironment))
	if _, ok := envList[env]; ok {
		return env
	}

	return envDev
}
