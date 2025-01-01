package config

import (
	"flag"
	"fmt"
)

// Command line arguments.
type cmdArgs struct {
	Environment string
	ConfigPath  string
	LogLevel    string
	LogFormat   string
}

func parseArgs(args []string) (cmdArgs, error) {
	var res cmdArgs

	fSet := flag.CommandLine

	fSet.StringVar(&res.ConfigPath, "c", "", "Path to configuration file")
	fSet.StringVar(&res.LogLevel, "l", "", "Log Level: debug, info, warn, error")
	fSet.StringVar(&res.LogFormat, "f", "", "Log Format: json or console")
	fSet.StringVar(&res.Environment, "e", "", "Environment: dev, test or prod")

	if err := fSet.Parse(args); err != nil {
		return cmdArgs{}, fmt.Errorf("could not parse args: %w", err)
	}

	return res, nil
}
