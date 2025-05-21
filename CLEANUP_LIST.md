# Cleanup List

This document lists files that appear to be outdated or no longer needed in the repository.

## Root Directory Files to Remove

1. **Aider-related files (AI assistant tool)**
   - `aider.session`
   - `bak.aider.model.settings.yml`
   - `session.aider`
   - `reasoning-effort`

2. **Temporary or duplicate files**
   - `names.db` (looks like a leftover database file that should be in a data directory)
   - `blog.prompt.xml` (appears to be a prompt file not needed in root)
   - `error.tsx` (duplicate of app/error.tsx)
   - `not-found.tsx` (duplicate of app/not-found.tsx)
   - `page.tsx` (duplicate of app/page.tsx)
   - `cxo.html` (appears to be a temporary/test file)
   - `gitflow.mdc` (should be moved to docs/)

3. **Deprecated documentation**
   - `spec.md` (should be consolidated with specs/ directory or removed)
   - `erd.md` (better to include in ARCHITECTURE.md or move to docs/)

4. **Build artifacts**
   - Any `.lock` files not needed for the package manager in use (confirm which package manager is primary)

## Remove Task Directories

The `tasks/` and `tasks-refactor/` directories are no longer needed.

## Orphaned Directories

2. **signin/ directory in root**
   - This seems to duplicate app/signin/ and should be removed

## Documentation to Consolidate

Various markdown files should be consolidated in the docs/ directory:
- Move `DEAD_CODE_TARGETS.md` to `docs/refactor/`
- Move `CODE_REVIEW.md` to `docs/`


move saigo files to archive:
- all of them


## Next Steps

1. Create a backup branch before deleting any files
2. Remove the identified files
3. Update imports if necessary
4. Fix any build errors that occur
5. Create comprehensive ARCHITECTURE.md
6. Update README.md