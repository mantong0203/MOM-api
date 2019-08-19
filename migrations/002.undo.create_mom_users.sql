ALTER TABLE mom_agendas
  DROP COLUMN IF EXISTS user_id;

ALTER TABLE mom_agendas
    DROP COLUMN IF EXISTS claim_user;

DROP TABLE IF EXISTS mom_users;