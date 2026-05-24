CREATE TABLE users
(
    id uuid     NOT NULL DEFAULT gen_random_uuid (),
    password    VARCHAR(72) NOT NULL,
    first_name  VARCHAR(50) NOT NULL,
    second_name VARCHAR(50) NOT NULL,
    birthdate   TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    biography   TEXT,
    city        VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

