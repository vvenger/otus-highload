LOCAL_BIN:=$(CURDIR)/bin

install-deps:
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(LOCAL_BIN) v1.54.2
	GOBIN=$(LOCAL_BIN) go install github.com/vektra/mockery/v2@v2.40.1

# ---------------
# docker-compose
# ---------------

PROJECT_NAME=social-network
COMPOSE_DEV=./docker/docker-compose.yaml

up:
	docker-compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) up --build -d

down:
	docker-compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) down

run:
	docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec app sh -c "go run ./cmd/socialnetwork"

test:
	docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_DEV} exec app sh -c "go test ./..."	

logs:
	docker-compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) logs -f --tail 100	

shell:
	docker-compose -p ${PROJECT_NAME} -f $(COMPOSE_DEV) exec app bash	

# ---------------
# golangci-lint
# ---------------	

lint: 
	./bin/golangci-lint run ./... --config=./golangci.yml

lint-fast:
	./bin/golangci-lint run ./... --fast --config=./golangci.yml


# ---------------
# test coverage
# ---------------

COVERAGEFILE = /tmp/coverage.out

# COVER -FUNC
cover:
	go test -coverprofile=$(COVERAGEFILE) ./...
	go tool cover -func=$(COVERAGEFILE)
	rm $(COVERAGEFILE)

# COVER -HTML
cover-html:
	go test -coverprofile=$(COVERAGEFILE) ./...
	go tool cover -html=$(COVERAGEFILE)
	rm $(COVERAGEFILE)		

# ---------------
# mocks
# ---------------

mocks: 
	rm -rf /internal/mocks && ./bin/mockery --all