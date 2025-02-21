-- Create relationships between tables
-- Assume the "users" table contains a unique "email" column

-- Create a foreign key from saigo_users.email to users.email
ALTER TABLE saigo_users
  ADD CONSTRAINT fk_saigo_users_user_email
  FOREIGN KEY (email) REFERENCES users(email)
  ON DELETE CASCADE;

-- Create a foreign key from saigo_username.email to saigo_users.email
ALTER TABLE saigo_username
  ADD CONSTRAINT fk_saigo_username_saigo_users_email
  FOREIGN KEY (email) REFERENCES saigo_users(email)
  ON DELETE CASCADE;
