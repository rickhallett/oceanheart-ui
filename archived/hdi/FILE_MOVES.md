# HDI Feature File Migration Plan

This document outlines the file migration plan for archiving the HDI (Human Digital Interface) feature. Due to execution constraints, the actual file moves are documented here as a reference for completing the migration manually.

## App Pages and Layout

| Original Path | Archive Destination |
|---------------|---------------------|
| `/app/hdi/page.tsx` | `/archived/hdi/app/page.tsx` |
| `/app/hdi/layout.tsx` | `/archived/hdi/app/layout.tsx` |

## Components

| Original Path | Archive Destination |
|---------------|---------------------|
| `/app/hdi/components/AudioPlayer.tsx` | `/archived/hdi/app/components/AudioPlayer.tsx` |
| `/app/hdi/components/ContentSections.tsx` | `/archived/hdi/app/components/ContentSections.tsx` |
| `/app/hdi/components/CountdownTimer.tsx` | `/archived/hdi/app/components/CountdownTimer.tsx` |
| `/app/hdi/components/HDIHeader.tsx` | `/archived/hdi/app/components/HDIHeader.tsx` |
| `/app/hdi/components/TerminalEmulation.tsx` | `/archived/hdi/app/components/TerminalEmulation.tsx` |
| `/app/hdi/components/-- SQLite` | `/archived/hdi/app/components/-- SQLite` |

## Library and Utility Files

| Original Path | Archive Destination |
|---------------|---------------------|
| `/app/hdi/lib/create_db.py` | `/archived/hdi/app/lib/create_db.py` |
| `/app/hdi/lib/db_agent.py` | `/archived/hdi/app/lib/db_agent.py` |

## API Routes

| Original Path | Archive Destination |
|---------------|---------------------|
| `/app/api/hdi/download/route.ts` | `/archived/hdi/api/download/route.ts` |
| `/app/api/hdi/names/route.ts` | `/archived/hdi/api/names/route.ts` |

## Database Files

| Original Path | Archive Destination |
|---------------|---------------------|
| `/app/api/hdi/names/names.db` | `/archived/hdi/api/names/names.db` |
| `/app/api/hdi/names/seed.sql` | `/archived/hdi/api/names/seed.sql` |
| `/app/api/hdi/names/seed_db.py` | `/archived/hdi/api/names/seed_db.py` |

## References to Check and Update

After archiving the HDI feature, the following files should be checked for references to HDI:

1. `Header.tsx` and `Footer.tsx` - May contain navigation links to HDI pages
2. Any configuration files that mention HDI
3. Main app layout files that might include HDI routes

## Migration Process

To complete the migration:

1. Create all necessary directories in the archive destination
2. For each file, use git mv to preserve history: 
   ```
   git mv <original_path> <destination_path>
   ```
3. Update the tracking.csv file with details of each moved file
4. Remove references to HDI in active components like headers and footers

## Notes on Functionality

The HDI feature included:

1. An experimental UI section for exploring human-computer interaction patterns
2. SQLite database integration for storing names and references
3. Python scripts for database management
4. Custom components for audio playback and terminal emulation
5. Specialized content display with countdown timers and sectioned content

When removing references to HDI from the active codebase, ensure that navigation, routing, and imports are updated appropriately to prevent errors.