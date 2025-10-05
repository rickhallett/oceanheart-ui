# Change Log: Blog Pipeline

## Date: 2025-09-24

## Phase 1: Core Markdown Pipeline

### Files Modified

#### libs/blog.ts
- **Change**: Created new blog utility module
- **Rationale**: Central location for markdown parsing and blog post operations
- **Impact**: Provides API for fetching and processing markdown blog posts
- **Commit**: 65f80a9

#### app/blog/page.tsx
- **Change**: Updated to use markdown posts instead of hardcoded content
- **Rationale**: Enable dynamic content loading from markdown files
- **Impact**: Blog page now reads from content/blog directory
- **Commit**: 65f80a9

#### content/blog/2025-02-18-introducing-oceanheart-ai.md
- **Change**: Created first markdown blog post
- **Rationale**: Example post to test markdown pipeline
- **Impact**: Demonstrates frontmatter structure and content format
- **Commit**: 65f80a9

## Dependencies Added

- **gray-matter@4.0.3** - Parse frontmatter from markdown files
- **remark@15.0.1** - Markdown processor
- **remark-html@16.0.1** - Convert markdown to HTML
- **reading-time@1.5.0** - Calculate reading time for posts

## Phase 2: Navigation & Discovery

### Files Modified

#### components/blog/BlogSearch.tsx
- **Change**: Created fuzzy search component
- **Rationale**: Enable real-time content discovery
- **Impact**: Users can search posts by title, description, content, and tags
- **Commit**: 80f5a9e

#### components/blog/TagFilter.tsx  
- **Change**: Created tag filtering component
- **Rationale**: Allow users to filter posts by topic
- **Impact**: Dynamic tag-based navigation
- **Commit**: 80f5a9e

#### components/blog/BlogContent.tsx
- **Change**: Created client-side wrapper for interactive features
- **Rationale**: Handle search/filter state on client side
- **Impact**: Enables interactive blog features without page reloads
- **Commit**: 80f5a9e

#### app/blog/page.tsx
- **Change**: Integrated new interactive components
- **Rationale**: Add search and filtering capabilities
- **Impact**: Blog now supports fuzzy search and tag filtering
- **Commit**: 80f5a9e

### Dependencies Added

- **fuse.js@7.1.0** - Fuzzy search implementation

## Breaking Changes

- Blog content structure changed from TypeScript components to markdown files
- Migration required: Existing blog posts need conversion to markdown format