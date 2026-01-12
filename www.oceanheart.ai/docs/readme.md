# Documentation Organization

This directory contains all project documentation organized by type.

## Directory Structure

```
docs/
├── specs/           # Product Requirements Documents (PRDs)
├── architecture/    # Architecture documentation and diagrams
├── guides/          # How-to guides and tutorials
└── decisions/       # Architecture Decision Records (ADRs)
```

## File Naming Convention

### PRDs (specs/)
Format: `{number}-{kebab-case-description}.prd.md`

Examples:
- `001-oceanheart-phoenix-integration.prd.md`
- `002-authentication-system.prd.md`
- `003-course-viewer.prd.md`

**Rules:**
- Numbers are zero-padded to 3 digits (001, 002, etc.)
- Use kebab-case for descriptions
- Always end with `.prd.md`
- Start numbering from 001

### Architecture Docs (architecture/)
Format: `{kebab-case-name}.md`

Examples:
- `monorepo-structure.md`
- `deployment-pipeline.md`
- `tech-stack.md`

### Guides (guides/)
Format: `{kebab-case-topic}.md`

Examples:
- `getting-started.md`
- `development-workflow.md`
- `testing-strategy.md`

### ADRs (decisions/)
Format: `{number}-{kebab-case-decision}.adr.md`

Examples:
- `001-use-nextjs-app-router.adr.md`
- `002-adopt-kaishin-design-system.adr.md`

## Creating New Documents

### New PRD
Use the create-prd command:
```
create-prd <feature-name> <description>
```

The system will automatically assign the next available number.

### New ADR
Create a new file in `decisions/` with the next number and describe the architectural decision, context, consequences, and alternatives considered.

## Maintenance

- Keep numbering sequential within each category
- Use lowercase for all filenames
- Avoid spaces in filenames (use kebab-case)
- Keep descriptions concise but meaningful
- Archive old/superseded docs by adding `[ARCHIVED]` prefix
