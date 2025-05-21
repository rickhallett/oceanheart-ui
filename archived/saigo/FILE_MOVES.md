# Saigo Feature File Migration Plan

This document outlines the file migration plan for archiving the Saigo feature. Due to execution constraints, the actual file moves are documented here as a reference for completing the migration manually.

## App Pages

| Original Path | Archive Destination |
|---------------|---------------------|
| `/app/saigo/layout.tsx` | `/archived/saigo/app/layout.tsx` |
| `/app/saigo/leaderboard/layout.tsx` | `/archived/saigo/app/leaderboard/layout.tsx` |
| `/app/saigo/leaderboard/page.tsx` | `/archived/saigo/app/leaderboard/page.tsx` |
| `/app/saigo/signin/layout.tsx` | `/archived/saigo/app/signin/layout.tsx` |
| `/app/saigo/signin/page.tsx` | `/archived/saigo/app/signin/page.tsx` |
| `/app/saigo/username/layout.tsx` | `/archived/saigo/app/username/layout.tsx` |
| `/app/saigo/username/page.tsx` | `/archived/saigo/app/username/page.tsx` |

## API Routes

| Original Path | Archive Destination |
|---------------|---------------------|
| `/app/api/saigo/instagram/run/route.ts` | `/archived/saigo/api/instagram/run/route.ts` |
| `/app/api/saigo/instagram/delete/[id]/route.ts` | `/archived/saigo/api/instagram/delete/[id]/route.ts` |
| `/app/api/saigo/instagram/check-trigger/route.ts` | `/archived/saigo/api/instagram/check-trigger/route.ts` |
| `/app/api/saigo/instagram/route.ts` | `/archived/saigo/api/instagram/route.ts` |
| `/app/api/saigo/key/route.ts` | `/archived/saigo/api/key/route.ts` |
| `/app/api/saigo/practice/route.ts` | `/archived/saigo/api/practice/route.ts` |
| `/app/api/saigo/username/route.ts` | `/archived/saigo/api/username/route.ts` |
| `/app/api/saigo/leaderboard/route.ts` | `/archived/saigo/api/leaderboard/route.ts` |
| `/app/api/auth/saigo-callback/route.ts` | `/archived/saigo/api/auth/saigo-callback/route.ts` |
| `/app/api/auth/saigo-verify-and-signin/route.ts` | `/archived/saigo/api/auth/saigo-verify-and-signin/route.ts` |

## Utility and Library Files

| Original Path | Archive Destination |
|---------------|---------------------|
| `/app/saigo/lib/guard.ts` | `/archived/saigo/lib/guard.ts` |
| `/app/saigo/lib/sum_points_days.py` | `/archived/saigo/lib/sum_points_days.py` |
| `/app/saigo/lib/sum_practice_days.py` | `/archived/saigo/lib/sum_practice_days.py` |
| `/app/saigo/lib/testdb.ts` | `/archived/saigo/lib/testdb.ts` |
| `/app/saigo/lib/seed_users.ts` | `/archived/saigo/lib/seed_users.ts` |
| `/app/saigo/lib/seed_db.ts` | `/archived/saigo/lib/seed_db.ts` |
| `/app/saigo/lib/seed_practices_last7days.ts` | `/archived/saigo/lib/seed_practices_last7days.ts` |
| `/app/saigo/lib/encrypt.ts` | `/archived/saigo/lib/encrypt.ts` |
| `/app/saigo/lib/seed_practices.ts` | `/archived/saigo/lib/seed_practices.ts` |
| `/app/saigo/lib/add-instagram-check-with-users.ts` | `/archived/saigo/lib/add-instagram-check-with-users.ts` |
| `/app/saigo/lib/add-instagram-check.ts` | `/archived/saigo/lib/add-instagram-check.ts` |
| `/libs/instagram-service.ts` | `/archived/saigo/lib/instagram-service.ts` |

## Components

| Original Path | Archive Destination |
|---------------|---------------------|
| `/components/SaigoAnimatedText.tsx` | `/archived/saigo/components/SaigoAnimatedText.tsx` |
| `/components/LiveLeaderboard.tsx` | `/archived/saigo/components/LiveLeaderboard.tsx` |
| `/components/LeaderboardTable.tsx` | `/archived/saigo/components/LeaderboardTable.tsx` |

## Migrations

| Original Path | Archive Destination |
|---------------|---------------------|
| `/migrations/saigo_table_relationships.sql` | `/archived/saigo/migrations/saigo_table_relationships.sql` |
| `/migrations/saigo_table_relationships_by_id.sql` | `/archived/saigo/migrations/saigo_table_relationships_by_id.sql` |
| `/migrations/saigo_tables.sql` | `/archived/saigo/migrations/saigo_tables.sql` |
| `/migrations/saigo_tables_uuid.sql` | `/archived/saigo/migrations/saigo_tables_uuid.sql` |
| `/migrations/instagram_page_check.sql` | `/archived/saigo/migrations/instagram_page_check.sql` |

## Prompts and Specs

| Original Path | Archive Destination |
|---------------|---------------------|
| `/prompts/saigo.md` | `/archived/saigo/prompts/saigo.md` |
| `/prompts/saigo_username_prompt.xml` | `/archived/saigo/prompts/saigo_username_prompt.xml` |
| `/specs/02_saigo_login.spec.md` | `/archived/saigo/specs/02_saigo_login.spec.md` |
| `/specs/03_saigo_auth_api.spec.md` | `/archived/saigo/specs/03_saigo_auth_api.spec.md` |
| `/specs/04_saigo_users_insert.spec.md` | `/archived/saigo/specs/04_saigo_users_insert.spec.md` |
| `/specs/05_saigo_username_page.spec.md` | `/archived/saigo/specs/05_saigo_username_page.spec.md` |
| `/specs/06_saigo_leaderboard_update.spec.md` | `/archived/saigo/specs/06_saigo_leaderboard_update.spec.md` |

## Migration Process

To complete the migration:

1. Create all necessary directories in the archive destination
2. For each file, use git mv to preserve history: 
   ```
   git mv <original_path> <destination_path>
   ```
3. Update the tracking.csv file with details of each moved file
4. For files that have dependencies on other active code, update imports in the archived files
5. Remove references to the archived files from the active codebase

## Code References to Update

After moving files, the following files in the active codebase need to be checked and updated:

1. `config.ts` - Contains Saigo configuration that may need to be removed or commented out
2. `app/layout.tsx` - May include routes or references to Saigo pages
3. Any components that import Saigo components
4. Navigation components that link to Saigo routes