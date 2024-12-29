package config

import (
	"os"
	"strings"
)

const (
	appEnvironment = "ENVIRONMENT"
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
	env := strings.ToLower(os.Getenv(appEnvironment))
	if _, ok := envList[env]; ok {
		return env
	}

	return envDev
}
