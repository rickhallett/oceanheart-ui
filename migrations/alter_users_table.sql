-- Enable Row Level Security on the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create a full-access RLS policy for the users table
CREATE POLICY full_access_users ON users
  FOR ALL
  USING (true);
