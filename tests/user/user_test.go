// build+ integration
package tests

import (
	"testing"
)

func TestUserHandler_UserRegisterPost(t *testing.T) {
	// TODO: добавить интеграционные тесты.

	// t.Setenv(config.AppEnvironment, config.EnvTest)

	// var (
	// 	db      *pgxpool.Pool
	// 	storage services.UserRepository
	// 	handler http.Handler
	// )

	// err := app.Populate(
	// 	&db,
	// 	&storage,
	// 	&handler,
	// )
	// if err != nil {
	// 	t.Fatal(err)
	// }

	// exp := httpexpect.WithConfig(httpexpect.Config{
	// 	Client: &http.Client{
	// 		Jar:       httpexpect.NewCookieJar(),
	// 		Transport: httpexpect.NewBinder(handler),
	// 	},
	// 	Printers: []httpexpect.Printer{
	// 		httpexpect.NewDebugPrinter(t, true),
	// 	},
	// 	Reporter: httpexpect.NewAssertReporter(t),
	// })

	// j := exp.
	// 	POST("/user/register").
	// 	Expect().
	// 	Status(http.StatusOK).
	// 	JSON()

	// j.
	// 	Object().
	// 	ContainsKey("user_id")

}
