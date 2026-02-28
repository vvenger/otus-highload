#!/usr/bin/env bash

migrate -database "postgres://$DB_MASTER_USER:$DB_MASTER_PASSWORD@$DB_MASTER_HOST:$DB_MASTER_PORT/$DB_MASTER_NAME?sslmode=disable" -path /app/migrations $@
