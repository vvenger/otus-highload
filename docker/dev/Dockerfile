FROM golang:1.25-bookworm

RUN go install github.com/go-delve/delve/cmd/dlv@v1.25.2
RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@v4.19.0
RUN go install github.com/vektra/mockery/v2@v2.53.5

WORKDIR /app

COPY ./migrate_wr.sh /migrate_wr.sh
COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]


