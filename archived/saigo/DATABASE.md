# Saigo Database Structure

This document provides detailed information about the database schema used by the Saigo feature.

## Overview

The Saigo feature used several PostgreSQL tables in Supabase to store user data, practice records, and related information. The primary tables were:

1. `saigo_users` - Stored user information specific to the Saigo system
2. `practices` - Recorded user practice activities and points
3. Various relationship tables for linking users, practices, and other entities

## Table Schemas

### saigo_users

```sql
create table public.saigo_users (
  id uuid not null default gen_random_uuid(),
  email text not null,
  user_id uuid null,
  created_at timestamp without time zone null default CURRENT_TIMESTAMP,
  username text null,
  force integer null default 0,
  constraint saigo_users_pkey primary key (id),
  constraint saigo_users_email_key unique (email),
  constraint saigo_users_username_key unique (username)
);
```

#### Columns:
- `id`: UUID primary key, automatically generated
- `email`: User's email address (unique)
- `user_id`: Optional reference to the main users table
- `created_at`: Timestamp when the user was created
- `username`: User's chosen username (unique)
- `force`: Points modifier value used in calculations

### practices

```sql
create table public.practices (
  id uuid not null default extensions.uuid_generate_v4(),
  type text not null,
  points integer null,
  user_id uuid null,
  created_at timestamp with time zone null,
  constraint practices_pkey primary key (id),
  constraint practices_user_id_fkey foreign key (user_id) references saigo_users(id)
);
```

#### Columns:
- `id`: UUID primary key, automatically generated
- `type`: The type of practice performed
- `points`: Number of points awarded for the practice
- `user_id`: Reference to the saigo_users table
- `created_at`: Timestamp when the practice was recorded

## Relationships

The Saigo feature implemented several relationships:

1. Each practice record was associated with a Saigo user through the `user_id` foreign key
2. Saigo users could be linked to the main authentication users through the `user_id` column
3. The Instagram check feature related Saigo users to their Instagram verification records

## Migration Files

The database schema was defined and modified through several migration files:

1. `saigo_tables.sql` - Initial table definitions
2. `saigo_tables_uuid.sql` - Updated schema with UUID support
3. `saigo_table_relationships.sql` - Defined relationships between tables
4. `saigo_table_relationships_by_id.sql` - Updated relationships to use IDs
5. `instagram_page_check.sql` - Added support for Instagram page verification

## Index Strategy

The following indexes were created to optimize query performance:

- Primary key indexes on `id` columns
- Unique indexes on `email` and `username` columns in the `saigo_users` table
- Foreign key indexes on relationship columns

## Data Access Patterns

The Saigo feature typically accessed data in the following ways:

1. Retrieving a user's profile by username or email
2. Fetching a user's practice history
3. Calculating points and leaderboard positions
4. Verifying Instagram accounts
5. Retrieving leaderboard data for all users

## Security Considerations

The Saigo database implemented the following security measures:

1. Row-Level Security (RLS) policies to restrict data access
2. Foreign key constraints to maintain data integrity
3. Unique constraints to prevent duplicate records