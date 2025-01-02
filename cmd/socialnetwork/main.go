package main

import (
	"log"

	"github.com/vvenger/otus-highload/internal/app"
	"github.com/vvenger/otus-highload/internal/config"
)

func main() {
	if err := config.ParseArgs(); err != nil {
		log.Fatal(err)
	}

	app.Run()
}
