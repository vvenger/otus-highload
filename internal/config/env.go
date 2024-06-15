package config

import (
	"os"
	"strings"
)

const (
	OSEnvironment = "ENVIRONMENT"
)

const (
	EnvDev  = "dev"
	EnvTest = "test"
	EnvProd = "prod"
)

var envList = []string{
	EnvTest,
	EnvDev,
	EnvProd,
}

func GetEnvironment() string {
	env := strings.ToLower(os.Getenv(OSEnvironment))
	for _, e := range envList {
		if e == env {
			return env
		}
	}

	return EnvDev
}
