#!/usr/bin/env bash

migrate_wr() {
    /migrate_wr.sh down
    /migrate_wr.sh up
}

migrate_wr

while [ $? -ne 0 ]; do
    sleep 1
    migrate_wr
done

tail -f /dev/null
