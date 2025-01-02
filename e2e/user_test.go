package e2e

import (
	"context"
	"net/http"
	"time"

	httpexpect "github.com/gavv/httpexpect/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/stretchr/testify/suite"
	"github.com/vvenger/otus-highload/internal/app"
	model "github.com/vvenger/otus-highload/internal/user/model"
	user "github.com/vvenger/otus-highload/internal/user/services"
	"github.com/vvenger/otus-highload/internal/web"
)

type UserSuite struct {
	suite.Suite
	db     *pgxpool.Pool
	exp    *httpexpect.Expect
	store  user.UserRepository
	fxStop func(context.Context)
}

func (suite *UserSuite) SetupSuite() {
	var (
		db    *pgxpool.Pool
		web   *web.HttpService
		store user.UserRepository
	)

	stop, err := app.Populate(&db, &web, &store)
	if err != nil {
		suite.FailNow(err.Error())
	}

	if err := db.Ping(context.Background()); err != nil {
		suite.FailNow(err.Error())
	}

	exp := httpexpect.WithConfig(httpexpect.Config{
		Client: &http.Client{
			Jar:       httpexpect.NewCookieJar(),
			Transport: httpexpect.NewBinder(http.Handler(web)),
		},
		Printers: []httpexpect.Printer{
			httpexpect.NewDebugPrinter(suite.T(), true),
		},
		Reporter: httpexpect.NewAssertReporter(suite.T()),
	})

	suite.db = db
	suite.exp = exp
	suite.store = store
	suite.fxStop = stop
}

func (suite *UserSuite) TearDownSuite() {
	suite.db.Exec(context.Background(), "DELETE FROM users")

	suite.fxStop(context.Background())
}

func (suite *UserSuite) SetupTest() {
	suite.db.Exec(context.Background(), "DELETE FROM users")
}

func (suite *UserSuite) TestRegister() {
	type args struct {
		FirstName  string `json:"first_name"`
		SecondName string `json:"second_name"`
		Birthdate  string `json:"birthdate"`
		Biography  string `json:"biography,omitempty"`
		City       string `json:"city"`
		Password   string `json:"password"`
	}

	res := suite.exp.
		POST("/user/register").
		WithJSON(args{
			FirstName:  "John",
			SecondName: "Doe",
			Birthdate:  "2000-01-01",
			City:       "New York",
			Password:   "123456",
		}).
		Expect().
		Status(http.StatusOK).
		JSON().Object()

	res.ContainsKey("user_id")
}

func (suite *UserSuite) TestLogin() {
	type args struct {
		ID       string `json:"id"`
		Password string `json:"password"`
	}

	const (
		password = "123456"
	)

	id, err := suite.insertUser(password)
	if err != nil {
		suite.FailNow(err.Error())
	}

	res := suite.exp.
		POST("/login").
		WithJSON(args{
			ID:       id,
			Password: password,
		}).
		Expect().
		Status(http.StatusOK).
		JSON().Object()

	res.ContainsKey("token")
}

func (suite *UserSuite) TestGetUser() {
	const (
		password = "123456"
	)

	id, err := suite.insertUser(password)
	if err != nil {
		suite.FailNow(err.Error())
	}

	res := suite.exp.
		GET("/user/get/{userId}", id).
		Expect().
		Status(http.StatusOK).
		JSON().Object()

	res.
		HasValue("first_name", "John").
		HasValue("second_name", "Doe").
		HasValue("birthdate", "2000-01-01").
		HasValue("city", "New York")
}

func (suite *UserSuite) insertUser(password string) (string, error) {
	hashPass, err := model.HashPassword(password)
	if err != nil {
		return "", err
	}

	id, err := suite.store.Register(context.Background(), model.RegisterUser{
		FirstName:  "John",
		SecondName: "Doe",
		Birthdate:  time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
		City:       "New York",
		Password:   hashPass,
	})
	if err != nil {
		return "", err
	}

	return id, nil
}
