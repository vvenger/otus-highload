package config

import (
	"flag"
	"fmt"
	"os"
)

func ParseArgs() error {
	args, err := parseArgs(os.Args[1:])
	if err != nil {
		return fmt.Errorf("could not parse args: %w", err)
	}

	if args.Fixtures != "" {
		os.Setenv(CmdFixtures, args.Fixtures)
		// Не выводим дебаг логи.
		args.LogLevel = "info"
	}
	if args.Environment != "" {
		os.Setenv(CmdEnvironment, args.Environment)
	}
	if args.ConfigPath != "" {
		os.Setenv(CmdPath, args.ConfigPath)
	}
	if args.LogLevel != "" {
		os.Setenv(CmdLogLevel, args.LogLevel)
	}
	if args.LogFormat != "" {
		os.Setenv(CmdLogFormat, args.LogFormat)
	}
	if args.Fixtures != "" {
		os.Setenv(CmdFixtures, args.Fixtures)
	}

	return nil
}

// Command line arguments.
type cmdArgs struct {
	Environment string
	ConfigPath  string
	LogLevel    string
	LogFormat   string
	Fixtures    string
}

func parseArgs(args []string) (cmdArgs, error) {
	var res cmdArgs

	fSet := flag.NewFlagSet("service", flag.ExitOnError)

	fSet.StringVar(&res.ConfigPath, "c", "", "Path to configuration file")
	fSet.StringVar(&res.LogLevel, "l", "", "Log Level: debug, info, warn, error")
	fSet.StringVar(&res.LogFormat, "f", "", "Log Format: json or console")
	fSet.StringVar(&res.Environment, "e", "", "Environment: dev, test or prod")
	fSet.StringVar(&res.Fixtures, "fixtures", "", "Fixtures: path to fixtures")

	if err := fSet.Parse(args); err != nil {
		return cmdArgs{}, fmt.Errorf("could not parse args: %w", err)
	}

	return res, nil
}
