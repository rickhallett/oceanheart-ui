-- Relationship between users and saigo_users
-- Step 1: Update saigo_users to add a "user_id" column if it doesn't exist
ALTER TABLE saigo_users
  ADD COLUMN IF NOT EXISTS user_id INTEGER;

-- Step 2: Create a foreign key from saigo_users.user_id to users.id
ALTER TABLE saigo_users
  ADD CONSTRAINT fk_saigo_users_user_id
  FOREIGN KEY (user_id) REFERENCES users(id)
  ON DELETE CASCADE;

-- Relationship between saigo_users and saigo_username
-- Step 3: Update saigo_username to add a "saigo_user_id" column if it doesn't exist
ALTER TABLE saigo_username
  ADD COLUMN IF NOT EXISTS saigo_user_id INTEGER;

-- Step 4: Create a foreign key from saigo_username.saigo_user_id to saigo_users.id
ALTER TABLE saigo_username
  ADD CONSTRAINT fk_saigo_username_saigo_users_id
  FOREIGN KEY (saigo_user_id) REFERENCES saigo_users(id)
  ON DELETE CASCADE;
