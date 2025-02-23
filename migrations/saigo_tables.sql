-- Enable the UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the "saigo_users" table
CREATE TABLE IF NOT EXISTS saigo_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  user_id UUID
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
  username TEXT NOT NULL UNIQUE,
  saigo_user_id INTEGER
);

-- Enable Row Level Security for saigo_username
ALTER TABLE saigo_username ENABLE ROW LEVEL SECURITY;

-- Create a full-access RLS policy for saigo_username
CREATE POLICY full_access_saigo_username ON saigo_username
  FOR ALL
  USING (true);
