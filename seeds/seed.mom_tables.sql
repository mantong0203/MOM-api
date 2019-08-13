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

INSERT INTO mom_agendas (title, user_id, content)
VALUES
  ('Hand-Painted Rubber Ducky', 1, 'This ducky has been hand-painted and is now art. Therefore it is useless and cannot be put in water.'),
  ('Cloning Machine', 2, '100% guaranteed to occasionally work every time! Requires a 167.23v power outlet or a dragonscale battery (obtained separately by solving a riddle).'),
  ('Kangaroo Carrier', 3, 'This convenient item can assist you in bringing your kangaroo to your favorite grocery store, or as a conversation starter at a first date or funeral.'),
  ('Love Potion #26', 4, 'While not as well known as its predecessor, Love Potion #9, this formulation has been proven to be effective in winning the affections of some small amphibians.'),
  ('My Freeze Ray', 5, 'With this freeze ray, you can stop the world.'),
  ('Personal EMP Generator', 6, 'With its guaranteed 10m radius, this discreet device will disable an entire busload of iPhones with the push of a button. It is recommended to include an analog camera which can record the entertaining looks on the faces of those affected, as well as a riot shield in case of mass hysteria.'),
  ('Foolproof Instant Wealth Pamphlet', 1, 'Purchase this pamphlet for $100. Sell this pamphlet to a billion people for $100. Acquisition of this pamphlet is indeed proof of foolishness!'),
  ('Story Water Spigot', 2, 'Once installed by a qualified leprechaun, this spigot will produce a steady stream of stories which can be later be adapted to motion pictures which will not be quite as good as the originals.'),
  ('Ruby Red Slippers', 4, 'May or may not produce a genie.');

COMMIT;
