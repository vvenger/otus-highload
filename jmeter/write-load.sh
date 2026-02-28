#!/bin/bash

PROJECT_NAME="${PROJECT_NAME:-social-network}"
COMPOSE_FILE="${COMPOSE_FILE:-./docker/docker-compose.yaml}"
NODE_NAME="${NODE_NAME:-patroni-1}"

echo "=== Write load started (Ctrl+C to stop) ==="

docker compose -p "$PROJECT_NAME" -f "$COMPOSE_FILE" exec -T \
    -e PGPASSWORD=root "$NODE_NAME" gosu postgres bash -c "
count=0
while true; do
    psql -h haproxy -p 5432 -U root -d main -t -A -q \
        -c 'INSERT INTO failover_test DEFAULT VALUES;' 2>/dev/null \
    && count=\$((count + 1)) && echo \"Inserted: \$count\"
done
"
