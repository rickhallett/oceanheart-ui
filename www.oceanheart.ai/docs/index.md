# Documentation Index

**Last Updated:** October 5, 2025

## Quick Navigation

- [Product Requirements](specs/) - PRDs for features and integrations
- [Architecture](architecture/) - Technical architecture and system design
- [Guides](guides/) - Implementation guides and tutorials
- [Decisions](decisions/) - Architecture Decision Records (ADRs)
- [Content](content/) - Marketing copy and content strategy
- [Archive](archive/) - Historical/outdated documentation

---

## Product Requirements Documents (PRDs)

📁 **Location:** `docs/specs/`

1. [001-oceanheart-phoenix-integration.prd.md](specs/001-oceanheart-phoenix-integration.prd.md) - Website unification strategy
2. [002-30-day-sprint-course-integration.prd.md](specs/002-30-day-sprint-course-integration.prd.md) - Sprint & course viewer implementation
3. [003-courses-page.prd.md](specs/003-courses-page.prd.md) - Courses page implementation

---

## Architecture Documentation

📁 **Location:** `docs/architecture/`

- [system-overview.md](architecture/system-overview.md) - Complete system architecture
- [mastery-architecture.md](architecture/mastery-architecture.md) - Mastery system design
- [turso-vector-migration.md](architecture/turso-vector-migration.md) - Database migration analysis

---

## Implementation Guides

📁 **Location:** `docs/guides/`

### Transformation Guides
- [kaishin-transformation-summary.md](guides/kaishin-transformation-summary.md) - Overview of Kaishin transformation
- [transformation-status.md](guides/transformation-status.md) - Current transformation status
- [dark-theme-migration.md](guides/dark-theme-migration.md) - Dark theme migration plan

### Style & Design
- [kaishin-color-strategy.md](guides/kaishin-color-strategy.md) - Color system strategy
- [kaishin-component-guide.md](guides/kaishin-component-guide.md) - Component usage guide
- [light-style-guide.md](guides/light-style-guide.md) - Light theme style guide

### Implementation
- [implementation-summary.md](guides/implementation-summary.md) - Implementation overview
- [presentation-order-optimization.md](guides/presentation-order-optimization.md) - Presentation optimization
- [trustpilot-implementation.md](guides/trustpilot-implementation.md) - Trustpilot integration
- [website-copy-editing.md](guides/website-copy-editing.md) - Website copy

---

## Architecture Decisions

📁 **Location:** `docs/decisions/`

1. [001-strategy-update.adr.md](decisions/001-strategy-update.adr.md) - Strategy update decision
2. [002-first-principles-approach.adr.md](decisions/002-first-principles-approach.adr.md) - First principles methodology

---

## Content Strategy

📁 **Location:** `docs/content/`

- [the-kaishin-method.md](content/the-kaishin-method.md) - Core methodology content
- [kaishin-method-copy-v2.md](content/kaishin-method-copy-v2.md) - Marketing copy v2
- [90-day-transformation.md](content/90-day-transformation.md) - Transformation program
- [circles-of-mastery.md](content/circles-of-mastery.md) - Mastery framework

---

## File Naming Conventions

### PRDs
Format: `{number}-{feature-name}.prd.md`
- Numbers: 001, 002, 003 (zero-padded)
- Names: lowercase-kebab-case

### Architecture Docs
Format: `{descriptive-name}.md`
- Names: lowercase-kebab-case

### Guides
Format: `{guide-topic}.md`
- Names: lowercase-kebab-case

### ADRs
Format: `{number}-{decision-name}.adr.md`
- Numbers: 001, 002, 003 (zero-padded)
- Names: lowercase-kebab-case

---

## Creating New Documentation

### New PRD
```bash
# Use the create-prd command
create-prd feature-name "Brief description"
```

### New Guide
Create in `docs/guides/` with kebab-case naming.

### New ADR
Create in `docs/decisions/` with next number and `.adr.md` extension.

---

## Archive Policy

Outdated or superseded documentation is moved to `docs/archive/` for historical reference.
