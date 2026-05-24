CREATE TABLE messages (
    id           UUID        NOT NULL DEFAULT gen_random_uuid(),
    dialog_id    UUID        NOT NULL,
    from_user_id UUID        NOT NULL,
    to_user_id   UUID        NOT NULL,
    text         TEXT        NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (dialog_id, id)
);

SELECT create_distributed_table('messages', 'dialog_id');
