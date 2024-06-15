package main

import (
	"github.com/vvenger/otus-highload/internal/app"
)

func main() {
	srv := app.NewApp()
	srv.Run()
}
