-- Ensure the pgcrypto extension is enabled for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop the existing tables if needed (use caution—this will lose data)
DROP TABLE IF EXISTS saigo_username CASCADE;
DROP TABLE IF EXISTS saigo_users CASCADE;

-- Create the saigo_users table with a UUID primary key and a default value using gen_random_uuid()
CREATE TABLE saigo_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  user_id UUID  -- foreign key to the users table; update type as necessary (assumes users.id is UUID)
);

-- Enable RLS and create a full-access RLS policy for saigo_users
ALTER TABLE saigo_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY full_access_saigo_users ON saigo_users
  FOR ALL
  USING (true);

-- Create the saigo_username table with a UUID primary key and a default value using gen_random_uuid()
CREATE TABLE saigo_username (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  saigo_user_id UUID  -- foreign key to saigo_users.id
);

-- Enable RLS and create a full-access RLS policy for saigo_username
ALTER TABLE saigo_username ENABLE ROW LEVEL SECURITY;
CREATE POLICY full_access_saigo_username ON saigo_username
  FOR ALL
  USING (true);

-- Update foreign key relationships to use IDs:

-- Establish a relationship from saigo_users.user_id (UUID) to users.id (assumes users.id is UUID)
ALTER TABLE saigo_users
  ADD CONSTRAINT fk_saigo_users_user_id
  FOREIGN KEY (user_id) REFERENCES auth.users(id)
  ON DELETE CASCADE;

-- Establish a relationship from saigo_username.saigo_user_id (UUID) to saigo_users.id (UUID)
ALTER TABLE saigo_username
  ADD CONSTRAINT fk_saigo_username_saigo_users_id
  FOREIGN KEY (saigo_user_id) REFERENCES saigo_users(id)
  ON DELETE CASCADE;
