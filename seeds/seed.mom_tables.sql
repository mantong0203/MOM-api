BEGIN;

TRUNCATE
  mom_agendas,
  mom_users
  RESTART IDENTITY CASCADE;

INSERT INTO mom_users (user_name, full_name, nickname, password)
VALUES
  ('dunder', 'Dunder Mifflin', null, '$2a$12$GaKHT5VhNZOYmLqGoroUGuXnXM6vVRCQMUJZJ/nfXiPPHUTAubE7m'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', '$2a$12$V1HghkvmXObxOlJCeZ0S.u8FQg2wv9eOY7OCbrsEXy.C0TKxubB1a'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', '$2a$12$xgBR6CiJ.U0N4McgLUKBdu8Sc68qjQTXgw3K6g8EWX/SMZqKEr2Vy'),
  ('s.smith', 'Sam Smith', 'Sam', '$2a$12$jzMGf1FZhRKnVrlslYHhhOra/vbwPg0zVfzbK7t2FqpbL7XlLw0GG'),
  ('lexlor', 'Alex Taylor', 'Lex', '$2a$12$6V9AInIJwmTvf4xzrI1IB.yxG3jrRsu1lvNwBpQdg4y6nxbW1Wl2.'),
  ('wippy', 'Ping Won In', 'Ping', '$2a$12$NYLifM6rHwpTfr1DnAM4cOQs9gWeUf24BhFtTiggnGgWR2JcLy0KG');


INSERT INTO mom_agendas (
  title,
  content,
  active,
  user_id
) VALUES
  (
    'Pick kids',
    'Pick up kids from school.',
    true,
    1
  ),
  (
    'Grocery shopping.',
    'Apple,orange,meat...',
    true,
    2
  ),
  (
    'Playdate with Susan.',
    '4pm go to splash playground',
    true,
    3
  );


COMMIT;
