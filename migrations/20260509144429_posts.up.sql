CREATE TABLE posts
(
    id         uuid      NOT NULL,
    text       TEXT      NOT NULL,
    author_id  uuid      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE INDEX idx_posts_author_created ON posts (author_id, created_at DESC);
