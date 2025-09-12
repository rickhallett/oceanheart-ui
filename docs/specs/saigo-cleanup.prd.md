# PRD: Saigo Project Complete Removal

**Document Version:** 1.0  
**Date:** 2025-09-09  
**Status:** Draft

## Executive Summary

This PRD outlines the complete removal of all Saigo project references, files, and database components from the Oceanheart UI repository. The Saigo feature was a gamified practice logging and leaderboard system that is no longer needed.

## Objectives

- **Primary Goal:** Remove all traces of the Saigo project from the repository
- **Secondary Goals:**
  - Clean up database migrations and table definitions
  - Remove unused API endpoints and pages
  - Update documentation and configuration files
  - Maintain repository integrity and build process

## Scope

### In Scope
- Complete removal of all Saigo-related files and directories
- Database migration cleanup
- API endpoint removal
- Configuration updates
- Documentation updates
- Portfolio reference cleanup

### Out of Scope
- Data migration or backup (assume data is no longer needed)
- User notification about feature removal
- Alternative feature implementation

## Current Saigo References Analysis

Based on codebase analysis, the following components contain Saigo references:

### 1. Application Pages & Components (15+ files)
- `/app/saigo/` - Complete directory tree
- `/app/api/saigo/` - API endpoints
- `/app/api/auth/saigo-callback/` - Auth callback
- Components: `LiveLeaderboard.tsx`, `dashboard/page.tsx`

### 2. Database & Migrations (8+ files)
- Multiple migration files with `saigo` in filename
- Table definitions and relationships
- Database seeding scripts

### 3. Documentation & Specs (10+ files)
- Complete specs directory: `/docs/specs/0*.spec.md`
- Reference documentation
- Database ERD documentation

### 4. Configuration & Utilities (8+ files)
- `config.ts` - Theme and configuration
- `types/config.ts` - Type definitions
- `package.json` - Script references
- CLI tools and utilities

### 5. Assets & Content
- Portfolio images (`/images/saigo_*.webp`)
- Archived documentation
- Prompts and templates

## Implementation Plan

### Phase 1: File System Cleanup
**Priority:** High  
**Estimated Effort:** 2-3 hours

#### 1.1 Remove Application Files
- Delete `/app/saigo/` directory entirely
- Delete `/app/api/saigo/` directory entirely
- Delete `/app/api/auth/saigo-callback/`

#### 1.2 Remove Documentation
- Delete `/docs/specs/0*.spec.md` (Saigo specs)
- Delete `/archived/saigo/` directory
- Delete `/prompts/saigo_username_prompt.xml`

#### 1.3 Remove Migration Files
- Delete all migration files containing "saigo" in filename:
  - `migrations/saigo_tables_uuid.sql`
  - `migrations/saigo_tables.sql`
  - `migrations/saigo_table_relationships_by_id.sql`
  - `migrations/saigo_table_relationships.sql`
  - `migrations/20231018_add_practices_and_force.sql`

### Phase 2: Code Reference Cleanup
**Priority:** High  
**Estimated Effort:** 1-2 hours

#### 2.1 Configuration Files
- **File:** `types/config.ts`
  - Remove `saigoTheme: Theme` property
  - Remove `saigo: { ... }` configuration block

- **File:** `config.ts`
  - Remove Saigo theme configuration

- **File:** `package.json`
  - Remove `"add-instagram-check"` script reference

#### 2.2 Library & Utility Files
- **File:** `libs/portfolio.ts`
  - Remove portfolio entries with `/images/saigo_*.webp`

- **Files:** `bin/cli.ts`, `bin/bot_runner.ts`, `bin/reset_month.ts`
  - Remove all `saigo_users` table references
  - Remove Saigo-related database queries
  - Clean up related logic

#### 2.3 Component Updates
- **File:** `components/LiveLeaderboard.tsx`
  - Remove component entirely OR remove Saigo-specific logic
  - Assess if component has other uses

- **File:** `app/dashboard/page.tsx`
  - Remove Saigo dashboard references

### Phase 3: Asset Cleanup
**Priority:** Medium  
**Estimated Effort:** 30 minutes

#### 3.1 Image Assets
- Delete `/public/images/saigo_*.webp` files
- Verify no other references to these assets exist

### Phase 4: Documentation Updates
**Priority:** Medium  
**Estimated Effort:** 30 minutes

#### 4.1 Update Project Documentation
- **File:** `README.md`
  - Remove Saigo feature description
  - Update feature list

- **File:** `docs/refactor_prd.md`
  - Remove Saigo references if present

- **File:** `docs/CODE_REVIEW.md`
  - Clean up any Saigo-related review items

### Phase 5: Database Schema Updates
**Priority:** High  
**Estimated Effort:** 1 hour

#### 5.1 Create Cleanup Migration
- Create new migration to drop Saigo-related tables:
  - `saigo_users`
  - `practices` (if exclusively Saigo-related)
  - Any related junction tables

#### 5.2 Update Schema Documentation
- Update `migrations/table_definitions.sql` to remove Saigo tables
- Update any database documentation

## Risk Assessment

### High Risk Items
- **Database Migration:** Dropping tables could affect other features
- **Component Dependencies:** LiveLeaderboard might be used elsewhere
- **Build Process:** Removing files might break imports

### Mitigation Strategies
- Create comprehensive backup before starting
- Test build process after each major deletion
- Use IDE/editor to find all references before deleting files
- Verify no other features depend on Saigo infrastructure

## Testing Strategy

### 1. Build Verification
```bash
# After each phase, verify build still works
bun build
bun lint
bun test
```

### 2. Reference Verification
```bash
# Search for any remaining references
grep -r -i "saigo" . --exclude-dir=.git --exclude-dir=node_modules
```

### 3. Database Migration Testing
- Test migration rollback capability
- Verify no foreign key constraints are broken
- Check that remaining features still function

## Success Criteria

### Must Have
- [ ] No references to "saigo" found in codebase (case-insensitive)
- [ ] Application builds successfully
- [ ] All tests pass
- [ ] No broken imports or missing dependencies
- [ ] Database migrations run cleanly

### Should Have
- [ ] Documentation updated to reflect removal
- [ ] Asset files cleaned up
- [ ] Configuration simplified

### Could Have
- [ ] Code refactored to remove unused utilities
- [ ] Database optimized after table removal

## Rollback Plan

If issues arise during cleanup:

1. **Git Rollback:** Use git to restore to pre-cleanup state
2. **Selective Restoration:** Restore specific files if needed
3. **Database Rollback:** Use migration rollback if database issues occur

## Timeline

- **Phase 1:** Day 1 (2-3 hours)
- **Phase 2:** Day 1-2 (1-2 hours)  
- **Phase 3:** Day 2 (30 minutes)
- **Phase 4:** Day 2 (30 minutes)
- **Phase 5:** Day 2 (1 hour)

**Total Estimated Effort:** 5-7 hours over 2 days

## Dependencies

- Development environment access
- Database access for migration testing
- Backup/restore capabilities
- Test suite functionality

## Acceptance Criteria

1. **Code Search Results:** `grep -r -i "saigo" .` returns no results (excluding git history)
2. **Build Success:** `bun build` completes without errors
3. **Test Pass:** `bun test` passes all tests
4. **Lint Clean:** `bun lint` reports no issues
5. **Database Clean:** No Saigo-related tables remain in schema
6. **Documentation Updated:** All project documentation reflects Saigo removal

## Notes

- This is a destructive operation - ensure proper backups
- Consider archiving Saigo code in a separate repository if needed for future reference
- Some files in `/archived/saigo/` suggest this cleanup may have been partially attempted before
- Review `CLEANUP_LIST.md` for any related cleanup items

---

**Prepared by:** Claude Code  
**Review Required:** Yes  
**Implementation Risk:** Medium-High