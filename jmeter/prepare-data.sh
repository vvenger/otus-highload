#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="${PROJECT_NAME:-social-network}"
COMPOSE_FILE="${COMPOSE_FILE:-./docker/docker-compose.yaml}"
DATA_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/data"

mkdir -p "$DATA_DIR"

echo "Extracting dialog user IDs from postgres..."
docker compose -p "$PROJECT_NAME" -f "$COMPOSE_FILE" exec -T postgres \
  psql -U root -d main -t -A -c \
  "SELECT id FROM users WHERE first_name LIKE 'Dialog%' ORDER BY first_name;" \
  | sed '/^$/d' > "$DATA_DIR/dialog_users.csv.tmp"

echo "recipientId" > "$DATA_DIR/dialog_users.csv"
cat "$DATA_DIR/dialog_users.csv.tmp" >> "$DATA_DIR/dialog_users.csv"
rm "$DATA_DIR/dialog_users.csv.tmp"

echo "Done! Generated:"
echo "  $DATA_DIR/dialog_users.csv ($(wc -l < "$DATA_DIR/dialog_users.csv") lines)"
