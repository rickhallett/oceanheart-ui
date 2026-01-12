# Documentation Migration Plan

This file tracks the reorganization of documentation into the new structure.

## Current Status

The docs directory contains mixed content that needs to be organized into:
- `specs/` - PRDs only
- `architecture/` - Technical architecture docs
- `guides/` - Implementation guides and tutorials
- `decisions/` - ADRs and strategy decisions

## Files to Organize

### Root Level Files (to be moved)
- [ ] dark-theme-migration-plan.md → guides/dark-theme-migration.md
- [ ] IMPLEMENTATION-SUMMARY.md → guides/implementation-summary.md
- [ ] KAISHIN_COMPONENT_GUIDE.md → guides/kaishin-component-guide.md
- [ ] KAISHIN_TRANSFORMATION_SUMMARY.md → guides/kaishin-transformation-summary.md
- [ ] KAISHIN-COLOR-STRATEGY-GUIDE.md → guides/kaishin-color-strategy.md
- [ ] TRUSTPILOT-TESTIMONIALS-IMPLEMENTATION.md → guides/trustpilot-implementation.md
- [ ] website-copy-for-editing.md → guides/website-copy-editing.md
- [ ] powerselling.md → archive/powerselling.md (if not needed)

### Specs Files (to be renamed/numbered)
- [ ] 001-oceanheart-phoenix-integration.prd.md ✓ (already correct)
- [ ] 002-30-day-sprint-course-integration.prd.md ✓ (already correct)
- [ ] COURSES_PAGE_IMPLEMENTATION.md → convert to 003-courses-page.prd.md
- [ ] turso-vector-migration-analysis.md → convert to 004-turso-vector-migration.prd.md or move to architecture/

### Strategy/Content Files (evaluate placement)
- [ ] 90-day-transformation.md → guides/ or content/
- [ ] circles-of-mastery.md → content/
- [ ] course-generation-brainstorm.md → archive/
- [ ] course-generation-reframe.md → archive/
- [ ] first-principles-analysis.md → decisions/001-first-principles-approach.adr.md
- [ ] kaishin-method-copy-v2.md → content/
- [ ] kaishin-method-copy.md → archive/
- [ ] mastery-architecture.md → architecture/mastery-architecture.md
- [ ] new-copy-generation.md → archive/
- [ ] new-light-style-guide.md → guides/light-style-guide.md
- [ ] presentation-order-optimization.md → guides/
- [ ] STRATEGY_UPDATE_SUMMARY.md → decisions/
- [ ] the-kaishin-method.md → content/
- [ ] website-conversion-tasklist.md → archive/

## Next Steps

1. Review each file's content
2. Determine appropriate category
3. Rename to lowercase kebab-case
4. Move to correct directory
5. Update internal references
6. Archive outdated content

## Naming Convention

All files should use lowercase kebab-case:
- ✅ `kaishin-component-guide.md`
- ❌ `KAISHIN_COMPONENT_GUIDE.md`
- ❌ `KaishinComponentGuide.md`
