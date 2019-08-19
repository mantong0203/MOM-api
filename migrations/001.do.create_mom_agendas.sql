DROP TABLE IF EXISTS mom_agendas;

CREATE TABLE mom_agendas (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true
);