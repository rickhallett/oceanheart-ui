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

-- Enable RLS and create policies for saigo_users
ALTER TABLE saigo_users ENABLE ROW LEVEL SECURITY;
GRANT ALL ON saigo_users TO authenticated;

-- Allow users to see their own records
CREATE POLICY read_own_saigo_users ON saigo_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow insert for authenticated users
CREATE POLICY insert_saigo_users ON saigo_users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create the saigo_username table with a UUID primary key and a default value using gen_random_uuid()
CREATE TABLE saigo_username (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  saigo_user_id UUID  -- foreign key to saigo_users.id
);

-- Enable RLS and create policies for saigo_username
ALTER TABLE saigo_username ENABLE ROW LEVEL SECURITY;
GRANT ALL ON saigo_username TO authenticated;

-- Allow users to see their own records via saigo_users relationship
CREATE POLICY read_own_saigo_username ON saigo_username
  FOR SELECT
  TO authenticated
  USING (saigo_user_id IN (
    SELECT id FROM saigo_users WHERE user_id = auth.uid()
  ));

-- Allow insert for authenticated users
CREATE POLICY insert_saigo_username ON saigo_username
  FOR INSERT
  TO authenticated
  WITH CHECK (saigo_user_id IN (
    SELECT id FROM saigo_users WHERE user_id = auth.uid()
  ));

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
