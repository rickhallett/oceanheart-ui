-- Enable RLS and add a read policy for user_entitlements

alter table if exists public.user_entitlements enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'user_entitlements' and policyname = 'select_own_entitlements'
  ) then
    create policy select_own_entitlements on public.user_entitlements
      for select
      using (auth.uid() = user_id);
  end if;
end $$;

