-- Example seed: grant flowstate entitlement to a known dev email
-- Replace dev@example.com and run in Supabase SQL editor or via migration tooling.

-- with u as (
--   select id as user_id from auth.users where email = 'dev@example.com'
-- )
-- insert into public.user_entitlements (user_id, app_slug, plan, expires_at)
-- select user_id, 'flowstate', 'dev', now() + interval '30 days' from u
-- on conflict (user_id, app_slug) do update set
--   plan = excluded.plan,
--   expires_at = excluded.expires_at;

