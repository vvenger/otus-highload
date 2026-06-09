LOCAL_BIN:=$(CURDIR)/bin

install-deps:
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(LOCAL_BIN) v2.6.0
	GOBIN=$(LOCAL_BIN) go install github.com/vektra/mockery/v2@v2.53.5

# ---------------
# docker-compose
# ---------------

PROJECT_NAME=social-network
COMPOSE_DEV=./docker/docker-compose.yaml

up:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) up --build -d

up/socialnetwork:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) up --build -d app postgres redis adminer nats

down:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) down -v --remove-orphans

down/socialnetwork:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) stop app postgres redis adminer nats

down/chat:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) stop chat citus-coordinator citus-worker1 citus-worker2

run:
	@$(MAKE) -j3 run/socialnetwork run/wsnotifier run/chat

run/socialnetwork:
	docker compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec -T app sh -c "go run ./cmd/socialnetwork"

run/chat:
	docker compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec -T chat sh -c "go run ./cmd/chat"

run/wsnotifier:
	docker compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec -T wsnotifier sh -c "go run ./cmd/wsnotifier"

up/example:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) up -d example

down/example:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) stop example

debug/socialnetwork:
	docker compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec app sh -c "dlv debug --headless --listen=:2345 --api-version=2 --build-flags='-buildvcs=false' ./cmd/socialnetwork"

debug/chat:
	docker compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec chat sh -c "dlv debug --headless --listen=:2345 --api-version=2 --build-flags='-buildvcs=false' ./cmd/chat"

logs/socialnetwork:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) logs -f --tail 100 app

logs/chat:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) logs -f --tail 100 chat

shell/socialnetwork:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) exec app bash

shell/chat:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) exec chat bash

shell/citus:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) exec citus-coordinator psql -U root -d dialogs

fixture:
	docker compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec app sh -c "go run ./cmd/socialnetwork --fixtures ./fixtures"

migration:
	@read -p "Migration name: " migration; \
		docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) exec app sh -c "/migrate_wr.sh create -ext sql -dir /app/migrations/app $$migration"

migrate/citus:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) exec chat sh -c "/migrate_wr.sh up"

test:
	docker compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec app sh -c "go test ./internal/..."

logs:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) logs -f --tail 100

test/e2e:
	docker compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec app sh -c "go test ./e2e/..."

debug:
	docker compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec app sh -c "dlv debug --headless --listen=:2345 --api-version=2 --build-flags='-buildvcs=false' ./cmd/socialnetwork"

shell:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) exec app bash


generate/api: generate/api/socialnetwork generate/api/chat

generate/api/socialnetwork:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) exec app sh -c "go generate ./docs/gen.go"

generate/api/chat:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) exec app sh -c "go generate ./docs/gen.chat.go"

generate/mocks:
	docker compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) exec app sh -c "rm -rf ./internal/mocks/ && ./bin/mockery --all"


# ---------------
# golangci-lint
# ---------------	

lint: 
	./bin/golangci-lint run ./... --config=./.golangci.yaml

lint-fast:
	./bin/golangci-lint run ./... --fast --config=./.golangci.yaml


# ---------------
# test coverage
# ---------------

COVERAGEFILE = /tmp/coverage.out

# COVER -FUNC
cover:
	go test -coverprofile=$(COVERAGEFILE) `go list ./... | grep -v ./internal/mocks`
	go tool cover -func=$(COVERAGEFILE)
	rm $(COVERAGEFILE)

# COVER -HTML
cover/html:
	go test -coverprofile=$(COVERAGEFILE) `go list ./... | grep -v ./internal/mocks`
	go tool cover -html=$(COVERAGEFILE)
	rm $(COVERAGEFILE)		

