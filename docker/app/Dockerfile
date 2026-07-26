FROM golang:1.25-bookworm

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -mod=vendor \
    -o /app/socialnetwork ./cmd/socialnetwork

ENV ENVIRONMENT=dev

EXPOSE 8000

ENTRYPOINT ["/app/socialnetwork"]
