#!/usr/bin/env bash

set -euo pipefail

until /migrate_wr.sh up; do
    echo "migrate: waiting for database..." >&2
    sleep 1
done
