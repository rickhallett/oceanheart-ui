-- Create table for tracking Instagram page status
CREATE TABLE IF NOT EXISTS instagram_page_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_username TEXT NOT NULL,
  page_found BOOLEAN DEFAULT FALSE,
  last_check_time TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for affected users whose points should be reset
CREATE TABLE IF NOT EXISTS instagram_affected_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instagram_check_id UUID NOT NULL,
  user_id UUID NOT NULL,
  points_reset BOOLEAN DEFAULT FALSE,
  reset_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT fk_instagram_check
    FOREIGN KEY(instagram_check_id) 
    REFERENCES instagram_page_checks(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES saigo_users(id)
    ON DELETE CASCADE
);

-- Enable RLS and create policies
ALTER TABLE instagram_page_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_affected_users ENABLE ROW LEVEL SECURITY;

-- Grant access to service role (for background jobs)
GRANT ALL ON instagram_page_checks TO service_role;
GRANT ALL ON instagram_affected_users TO service_role;

-- Allow authenticated users to view checks (can be restricted further if needed)
CREATE POLICY read_instagram_checks ON instagram_page_checks
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to view their own affected records
CREATE POLICY read_own_affected_users ON instagram_affected_users
  FOR SELECT
  TO authenticated
  USING (user_id IN (
    SELECT id FROM saigo_users WHERE user_id = auth.uid()
  ));

-- Create index for performance
CREATE INDEX idx_instagram_check_page_username ON instagram_page_checks(page_username);
CREATE INDEX idx_instagram_affected_users_check_id ON instagram_affected_users(instagram_check_id);
CREATE INDEX idx_instagram_affected_users_user_id ON instagram_affected_users(user_id); 