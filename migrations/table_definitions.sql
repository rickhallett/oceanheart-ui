create table public.saigo_users (
  id uuid not null default gen_random_uuid (),
  email text not null,
  user_id uuid null,
  created_at timestamp without time zone null default CURRENT_TIMESTAMP,
  username text null,
  force integer null default 0,
  constraint saigo_users_pkey primary key (id),
  constraint saigo_users_email_key unique (email),
  constraint saigo_users_username_key unique (username)
) TABLESPACE pg_default;

create table public.profiles (
  id uuid not null,
  name text null,
  email text null,
  image text null,
  customer_id text null,
  price_id text null,
  has_access boolean null default false,
  created_at timestamp with time zone null default (now() AT TIME ZONE 'UTC'::text),
  updated_at timestamp with time zone null default (now() AT TIME ZONE 'UTC'::text),
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create trigger update_profiles_updated_at BEFORE
update on profiles for EACH row
execute FUNCTION update_updated_at ();

create table public.practices (
  id uuid not null default extensions.uuid_generate_v4 (),
  type text not null,
  points integer null,
  user_id uuid null,
  created_at timestamp with time zone null,
  constraint practices_pkey primary key (id),
  constraint practices_user_id_fkey foreign KEY (user_id) references saigo_users (id)
) TABLESPACE pg_default;