# HDI Database Structure

This document details the database structure used by the Human Digital Interface (HDI) feature of Oceanheart.ai.

## Overview

The HDI feature utilized SQLite for its database needs, primarily to store and retrieve sample data for demonstration purposes. The database was used to showcase interactions between a web application and local database storage.

## Database Location

The SQLite database file was located at:
```
/app/api/hdi/names/names.db
```

## Schema

The database schema was defined in `/app/api/hdi/names/seed.sql` and included the following table:

### names

```sql
CREATE TABLE IF NOT EXISTS names (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    origin TEXT,
    meaning TEXT,
    popularity INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Columns
- `id`: Unique identifier, auto-incrementing integer
- `name`: The actual name (text, required)
- `origin`: Cultural or linguistic origin of the name
- `meaning`: Description of the name's meaning
- `popularity`: Numeric rating of the name's popularity
- `created_at`: Timestamp of when the record was created

## Database Management

The HDI feature included several Python scripts for database management:

1. `/app/hdi/lib/create_db.py`: Script to create the initial database structure
2. `/app/api/hdi/names/seed_db.py`: Script to populate the database with sample data
3. `/app/hdi/lib/db_agent.py`: Utility for interacting with the database

## API Integration

The database was accessed through two main API endpoints:

1. `/app/api/hdi/names/route.ts`: Provided CRUD operations for names
2. `/app/api/hdi/download/route.ts`: Allowed downloading database content

## Sample Query Patterns

The HDI feature typically used the following query patterns:

1. Retrieving all names:
   ```sql
   SELECT * FROM names ORDER BY name ASC;
   ```

2. Finding a specific name:
   ```sql
   SELECT * FROM names WHERE name LIKE ?;
   ```

3. Adding a new name:
   ```sql
   INSERT INTO names (name, origin, meaning, popularity) VALUES (?, ?, ?, ?);
   ```

## Data Security Considerations

As this was an experimental feature, the database implementation had the following security characteristics:

1. Local SQLite database with no remote access
2. No user-provided data was stored (only pre-seeded demonstration data)
3. API endpoints had basic validation but were primarily for demonstration