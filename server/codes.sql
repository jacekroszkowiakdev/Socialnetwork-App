DROP TABLE IF EXISTS codes;

  CREATE TABLE codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL CHECK (email != ''),
    code VARCHAR NOT NULL CHECK (code != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);