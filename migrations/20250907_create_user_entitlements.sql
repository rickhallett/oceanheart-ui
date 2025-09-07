-- Migration: create user_entitlements table
-- Requires Supabase/Postgres

create extension if not exists pgcrypto;

create table if not exists public.user_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  app_slug text not null,
  plan text,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists user_entitlements_user_app_uidx
  on public.user_entitlements (user_id, app_slug);

create index if not exists user_entitlements_user_idx
  on public.user_entitlements (user_id);

-- Optional: enable RLS and add policies as needed
-- alter table public.user_entitlements enable row level security;

