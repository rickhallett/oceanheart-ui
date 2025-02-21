-- Create the "saigo_users" table
CREATE TABLE IF NOT EXISTS saigo_users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE
);

-- Enable Row Level Security for saigo_users
ALTER TABLE saigo_users ENABLE ROW LEVEL SECURITY;

-- Create a full-access RLS policy for saigo_users
CREATE POLICY full_access_saigo_users ON saigo_users
  FOR ALL
  USING (true);

-- Create the "saigo_username" table
CREATE TABLE IF NOT EXISTS saigo_username (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE
);

-- Enable Row Level Security for saigo_username
ALTER TABLE saigo_username ENABLE ROW LEVEL SECURITY;

-- Create a full-access RLS policy for saigo_username
CREATE POLICY full_access_saigo_username ON saigo_username
  FOR ALL
  USING (true);
