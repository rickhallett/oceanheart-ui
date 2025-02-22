-- Create new table "practices"
CREATE TABLE IF NOT EXISTS practices (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT,
  points INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES saigo_users(id)
      ON DELETE CASCADE
);

-- Add a new column "force" to the saigo_users table
ALTER TABLE saigo_users
  ADD COLUMN IF NOT EXISTS force INT DEFAULT 0;
