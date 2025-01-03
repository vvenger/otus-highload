FROM golang:1.23-bullseye

RUN go install github.com/go-delve/delve/cmd/dlv@v1.24.0
RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
RUN go install github.com/vektra/mockery/v2@v2.50.1

WORKDIR /app

COPY ./migrate_wr.sh /migrate_wr.sh
COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

