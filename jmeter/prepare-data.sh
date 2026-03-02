#!/usr/bin/env bash
# prepare-data.sh — export random search params from DB into jmeter/data/search_params.csv
#
# Usage: ./prepare-data.sh
#
# Optional env vars:
#   SAMPLE_SIZE — number of rows to export (default: 10000)
#   NETWORK     — docker network (default: social-network_default)
#   DB_HOST     — postgres hostname inside the network (default: postgres)
#   DB_PORT     — postgres port (default: 5432)
#   DB_NAME     — database name (default: main)
#   DB_USER     — database user (default: root)
#   DB_PASSWORD — database password (default: root)

set -euo pipefail

SAMPLE_SIZE="${SAMPLE_SIZE:-10000}"
NETWORK="${NETWORK:-social-network_default}"
DB_HOST="${DB_HOST:-postgres}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-main}"
DB_USER="${DB_USER:-root}"
DB_PASSWORD="${DB_PASSWORD:-root}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_FILE="${SCRIPT_DIR}/data/search_params.csv"

mkdir -p "$(dirname "${OUT_FILE}")"

echo "=== Exporting ${SAMPLE_SIZE} random search params ==="
echo "  Source: ${DB_HOST}:${DB_PORT}/${DB_NAME}"
echo "  Output: ${OUT_FILE}"

PREFIX_LEN="${PREFIX_LEN:-4}"

SQL="SELECT LEFT(first_name, ${PREFIX_LEN}) AS first_name, LEFT(second_name, ${PREFIX_LEN}) AS second_name
     FROM (SELECT DISTINCT first_name, second_name FROM users) t
     ORDER BY random()
     LIMIT ${SAMPLE_SIZE}"

docker run --rm \
    --network "${NETWORK}" \
    -e PGPASSWORD="${DB_PASSWORD}" \
    postgres:14-bullseye \
    psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" \
    -c "\COPY (${SQL}) TO STDOUT WITH CSV HEADER" \
> "${OUT_FILE}"

ROWS=$(( $(wc -l < "${OUT_FILE}") - 1 ))
echo "Done. Exported ${ROWS} rows → ${OUT_FILE}"
