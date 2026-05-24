package main

import (
	"log"
	"os"

	"github.com/vvenger/otus-highload/internal/socialnetwork/app"
	"github.com/vvenger/otus-highload/internal/config"
)

func main() {
	if err := config.ParseArgs(); err != nil {
		log.Fatal(err)
	}

	if v := os.Getenv(config.CmdFixtures); v != "" {
		app.LoadFixture(v)
		return
	}

	app.Run()
}
