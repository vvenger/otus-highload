package main

import (
	"log"

	chatapp "github.com/vvenger/otus-highload/internal/chat/app"
	"github.com/vvenger/otus-highload/internal/config"
)

func main() {
	if err := config.ParseArgs(); err != nil {
		log.Fatal(err)
	}

	chatapp.Run()
}
