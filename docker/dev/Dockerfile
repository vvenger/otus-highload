FROM golang:1.21-bullseye

RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
RUN go install github.com/vektra/mockery/v2@v2.40.3

WORKDIR /app

COPY ./migrate_wr.sh /migrate_wr.sh
COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

