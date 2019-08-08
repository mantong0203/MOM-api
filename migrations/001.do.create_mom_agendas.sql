CREATE TABLE mom_agendas (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);