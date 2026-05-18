package main

import (
	"log"

	wsapp "github.com/vvenger/otus-highload/internal/wsnotifier/app"
	"github.com/vvenger/otus-highload/internal/config"
)

func main() {
	if err := config.ParseArgs(); err != nil {
		log.Fatal(err)
	}

	wsapp.Run()
}
