-- Enable the UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the "saigo_users" table
CREATE TABLE IF NOT EXISTS saigo_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  user_id UUID,
  username TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security for saigo_users
ALTER TABLE saigo_users ENABLE ROW LEVEL SECURITY;

-- Create a full-access RLS policy for saigo_users
CREATE POLICY full_access_saigo_users ON saigo_users
  FOR ALL
  USING (true);

-- Add migration to update existing records
DO $$ 
BEGIN
  -- Add username column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'saigo_users' 
    AND column_name = 'username'
  ) THEN
    ALTER TABLE saigo_users ADD COLUMN username TEXT;
  END IF;

  -- Update null usernames with default values
  UPDATE saigo_users 
  SET username = CONCAT('User_', SUBSTRING(id::text, 1, 8))
  WHERE username IS NULL;

  -- Set NOT NULL constraint after populating data
  ALTER TABLE saigo_users 
  ALTER COLUMN username SET NOT NULL;
END $$;
