FROM postgres:16-bookworm

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    curl \
    gettext-base \
    && python3 -m venv /opt/patroni \
    && /opt/patroni/bin/pip install --no-cache-dir patroni[etcd] psycopg2-binary \
    && ln -s /opt/patroni/bin/patroni /usr/local/bin/patroni \
    && ln -s /opt/patroni/bin/patronictl /usr/local/bin/patronictl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/patroni && chown -R postgres:postgres /etc/patroni

ENTRYPOINT []
CMD ["patroni", "/etc/patroni/patroni.yml"]
