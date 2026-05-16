#!/usr/bin/env bash

migrate -database "postgres://$DIALOG_DB_USER:$DIALOG_DB_PASSWORD@$DIALOG_DB_HOST:$DIALOG_DB_PORT/$DIALOG_DB_NAME?sslmode=disable" -path /app/migrations/citus $@
