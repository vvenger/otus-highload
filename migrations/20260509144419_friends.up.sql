CREATE TABLE friends
(
    user_id    uuid      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    friend_id  uuid      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, friend_id)
);

CREATE INDEX idx_friends_friend_id ON friends (friend_id);
