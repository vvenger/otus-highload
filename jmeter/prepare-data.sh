#!/bin/bash
set -e

PROJECT_NAME="${PROJECT_NAME:-social-network}"
COMPOSE_FILE="${COMPOSE_FILE:-./docker/docker-compose.yaml}"
DATA_DIR="./jmeter/data"
SAMPLE_SIZE=10000

mkdir -p "$DATA_DIR"

echo "Extracting user IDs..."
docker compose -p "$PROJECT_NAME" -f "$COMPOSE_FILE" exec -T -e PGPASSWORD=root patroni-1 \
  gosu postgres psql -h haproxy -p 5432 -U root -d main -t -A -c \
  "SELECT id FROM users ORDER BY random() LIMIT $SAMPLE_SIZE;" \
  | sed '/^$/d' > "$DATA_DIR/user_ids.csv.tmp"

echo "id" > "$DATA_DIR/user_ids.csv"
cat "$DATA_DIR/user_ids.csv.tmp" >> "$DATA_DIR/user_ids.csv"
rm "$DATA_DIR/user_ids.csv.tmp"

echo "Extracting search parameters..."
docker compose -p "$PROJECT_NAME" -f "$COMPOSE_FILE" exec -T -e PGPASSWORD=root patroni-1 \
  gosu postgres psql -h haproxy -p 5432 -U root -d main -t -A -F',' -c \
  "SELECT first_name, second_name FROM (SELECT DISTINCT first_name, second_name FROM users) t ORDER BY random() LIMIT $SAMPLE_SIZE;" \
  | sed '/^$/d' > "$DATA_DIR/search_params.csv.tmp"

echo "first_name,last_name" > "$DATA_DIR/search_params.csv"
cat "$DATA_DIR/search_params.csv.tmp" >> "$DATA_DIR/search_params.csv"
rm "$DATA_DIR/search_params.csv.tmp"

echo "Done! Generated:"
echo "  $DATA_DIR/user_ids.csv ($(wc -l < "$DATA_DIR/user_ids.csv") lines)"
echo "  $DATA_DIR/search_params.csv ($(wc -l < "$DATA_DIR/search_params.csv") lines)"