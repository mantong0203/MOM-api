CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  user_name TEXT NOT NULL UNIQUE,
  
  password TEXT NOT NULL,
  
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);
DROP TYPE IF EXISTS category;

CREATE TYPE category AS ENUM (
    'School',
    'Shopping',
    'Activities',
    'Family',
    'Afterschool'
);

ALTER TABLE mom_agendas
  ADD COLUMN
    user_id INTEGER REFERENCES users(id)
    ON DELETE SET NULL;

ALTER TABLE mom_agendas
    ADD COLUMN
        claim_user INTEGER REFERENCES users(id)
        ON DELETE SET NULL;
