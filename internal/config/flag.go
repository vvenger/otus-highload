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
	if args.FixturesPath != "" {
		os.Setenv(CmdFixturesPath, args.FixturesPath)
	}

	return nil
}

// Command line arguments.
type cmdArgs struct {
	Environment  string
	ConfigPath   string
	LogLevel     string
	LogFormat    string
	FixturesPath string
}

func parseArgs(args []string) (cmdArgs, error) {
	var res cmdArgs

	fSet := flag.NewFlagSet("service", flag.ExitOnError)

	fSet.StringVar(&res.ConfigPath, "c", "", "Path to configuration file")
	fSet.StringVar(&res.LogLevel, "l", "", "Log Level: debug, info, warn, error")
	fSet.StringVar(&res.LogFormat, "f", "", "Log Format: json or console")
	fSet.StringVar(&res.Environment, "e", "", "Environment: dev, test or prod")
	fSet.StringVar(&res.FixturesPath, "fixtures", "", "Path to fixtures directory")

	if err := fSet.Parse(args); err != nil {
		return cmdArgs{}, fmt.Errorf("could not parse args: %w", err)
	}

	return res, nil
}
