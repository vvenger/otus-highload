package config

import (
	"flag"
	"fmt"

	"github.com/ilyakaznacheev/cleanenv"
)

// Command line arguments.
type cmdArgs struct {
	Environment string
	ConfigFile  string
	LogLevel    string
	LogFormat   string
}

func parseArgs(c *Config, args []string) (cmdArgs, error) {
	var flags cmdArgs

	fSet := flag.CommandLine
	fSet.StringVar(&flags.ConfigFile, "c", "", "Path to configuration file")
	fSet.StringVar(&flags.LogLevel, "l", "", "Log Level: debug, info, warn, error")
	fSet.StringVar(&flags.LogFormat, "f", "", "Log Format: json or console")
	fSet.StringVar(&flags.Environment, "e", "", "Environment: dev, test or prod")

	fu := fSet.Usage
	fSet.Usage = func() {
		fu()
		envHelp, _ := cleanenv.GetDescription(c, nil)
		fmt.Fprintln(fSet.Output())
		fmt.Fprintln(fSet.Output(), envHelp)
	}

	if err := fSet.Parse(args); err != nil {
		return cmdArgs{}, fmt.Errorf("could not parse args: %w", err)
	}

	return flags, nil
}
