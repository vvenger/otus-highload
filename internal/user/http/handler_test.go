package http

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"github.com/vvenger/otus-highload/internal/api"
	"github.com/vvenger/otus-highload/internal/domain"
	"github.com/vvenger/otus-highload/internal/errs"
	mocks "github.com/vvenger/otus-highload/internal/mocks/user/http"
	"github.com/vvenger/otus-highload/internal/pkg/jwt"
)

func TestHandler_LoginPost(t *testing.T) {
	var (
		userID = "12345678-1234-1234-1234-123456789012"
		token  = "jwt.token"
	)

	type args struct {
		req api.OptLoginPostReq
	}
	type jwtArgs struct {
		secret string
		user   string
	}
	type loginResponse struct {
		reqLogin string
		reqPass  string
		resErr   error
	}
	tests := []struct {
		name  string
		args  args
		sec   jwtArgs
		login loginResponse
		want  api.LoginPostRes
	}{
		{
			name: "OK",
			args: args{
				req: api.OptLoginPostReq{
					Value: api.LoginPostReq{
						ID:       api.UserId(userID),
						Password: "password",
					},
					Set: true,
				},
			},
			sec: jwtArgs{
				secret: token,
				user:   userID,
			},
			login: loginResponse{
				reqLogin: userID,
				reqPass:  "password",
				resErr:   nil,
			},
			want: &api.LoginPostOK{
				Token: api.NewOptString(token),
			},
		},
		{
			name: "not found - id not uuid",
			args: args{
				req: api.OptLoginPostReq{
					Value: api.LoginPostReq{
						ID:       "123",
						Password: "password",
					},
					Set: true,
				},
			},
			want: &api.LoginPostNotFound{},
		},
		{
			name: "not found",
			args: args{
				req: api.OptLoginPostReq{
					Value: api.LoginPostReq{
						ID:       api.UserId(userID),
						Password: "password",
					},
					Set: true,
				},
			},
			sec: jwtArgs{
				secret: token,
				user:   userID,
			},
			login: loginResponse{
				reqLogin: userID,
				reqPass:  "password",
				resErr:   errs.ErrNotFound,
			},
			want: &api.LoginPostNotFound{},
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			user := &mocks.UserService{}
			user.On("Login", context.Background(), tt.login.reqLogin, tt.login.reqPass).Return(tt.login.resErr)

			sec := jwt.NewNoop(tt.sec.user, tt.sec.secret)

			srv := Handler{
				user: user,
				sec:  sec,
			}

			got, err := srv.LoginPost(context.Background(), tt.args.req)

			require.NoError(t, err)
			require.Equal(t, tt.want, got)
		})
	}
}

func TestHandler_UserRegisterPost(t *testing.T) {
	var (
		userID = "12345678-1234-1234-1234-123456789012"
		token  = "jwt.token"
		now    = time.Now()
	)

	type args struct {
		req api.OptUserRegisterPostReq
	}
	type jwtArgs struct {
		secret string
		user   string
	}
	type userArgs struct {
		req    *domain.RegisterRequest
		resID  string
		resErr error
	}
	tests := []struct {
		name string
		args args
		sec  jwtArgs
		user userArgs
		want api.UserRegisterPostRes
	}{
		{
			name: "OK",
			args: args{
				req: api.OptUserRegisterPostReq{
					Value: api.UserRegisterPostReq{
						FirstName:  "first",
						SecondName: "second",
						Birthdate:  api.BirthDate(now),
						City:       "city",
						Password:   "password",
					},
					Set: true,
				},
			},
			sec: jwtArgs{
				secret: token,
				user:   userID,
			},
			user: userArgs{
				req: &domain.RegisterRequest{
					FirstName:  "first",
					SecondName: "second",
					Birthdate:  now,
					City:       "city",
					Password:   "password",
				},
				resID:  userID,
				resErr: nil,
			},
			want: &api.UserRegisterPostOK{
				UserID: api.NewOptString(userID),
			},
		},
		{
			name: "error conflict",
			args: args{
				req: api.OptUserRegisterPostReq{
					Value: api.UserRegisterPostReq{
						FirstName:  "first",
						SecondName: "second",
						Birthdate:  api.BirthDate(now),
						City:       "city",
						Password:   "password",
					},
					Set: true,
				},
			},
			sec: jwtArgs{
				secret: token,
				user:   userID,
			},
			user: userArgs{
				req: &domain.RegisterRequest{
					FirstName:  "first",
					SecondName: "second",
					Birthdate:  now,
					City:       "city",
					Password:   "password",
				},
				resID:  "",
				resErr: errs.ErrConflict,
			},
			want: &api.UserRegisterPostBadRequest{},
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			user := &mocks.UserService{}
			user.On("Register", context.Background(), tt.user.req).Return(tt.user.resID, tt.user.resErr)

			sec := jwt.NewNoop(tt.sec.user, tt.sec.secret)

			srv := Handler{
				user: user,
				sec:  sec,
			}

			got, err := srv.UserRegisterPost(context.Background(), tt.args.req)

			require.NoError(t, err)
			require.Equal(t, tt.want, got)
		})
	}
}

func TestHandler_UserGetIDGet(t *testing.T) {
	var (
		userID = "12345678-1234-1234-1234-123456789012"
		token  = "jwt.token"
		now    = time.Now()
	)

	type args struct {
		req api.UserGetIDGetParams
	}
	type jwtArgs struct {
		secret string
		user   string
	}
	type userArgs struct {
		req string
		res domain.User
		err error
	}
	tests := []struct {
		name string
		args args
		sec  jwtArgs
		user userArgs
		want api.UserGetIDGetRes
	}{
		{
			name: "OK",
			args: args{
				req: api.UserGetIDGetParams{
					ID: api.UserId(userID),
				},
			},
			sec: jwtArgs{
				secret: token,
				user:   userID,
			},
			user: userArgs{
				req: userID,
				res: domain.User{
					ID:         userID,
					FirstName:  "first",
					SecondName: "second",
					Birthdate:  now,
					City:       "city",
				},
				err: nil,
			},
			want: &api.User{
				FirstName:  api.NewOptString("first"),
				SecondName: api.NewOptString("second"),
				Birthdate:  api.NewOptBirthDate(api.BirthDate(now)),
				City:       api.NewOptString("city"),
			},
		},
		{
			name: "not found",
			args: args{
				req: api.UserGetIDGetParams{
					ID: api.UserId(userID),
				},
			},
			sec: jwtArgs{
				secret: token,
				user:   userID,
			},
			user: userArgs{
				req: userID,
				res: domain.User{},
				err: errs.ErrNotFound,
			},
			want: &api.UserGetIDGetNotFound{},
		},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			user := &mocks.UserService{}
			user.On("User", context.Background(), tt.user.req).Return(tt.user.res, tt.user.err)

			sec := jwt.NewNoop(tt.sec.user, tt.sec.secret)

			srv := Handler{
				user: user,
				sec:  sec,
			}

			got, err := srv.UserGetIDGet(context.Background(), tt.args.req)

			require.NoError(t, err)
			require.Equal(t, tt.want, got)
		})
	}
}
