# Blog Pipeline PRD

**Date**: 2025-09-24

## Executive Summary

A minimal, performance-focused markdown-to-blog pipeline for oceanheart.ai/blog that prioritizes fast loading times, simple content management, and intuitive navigation. The system will support markdown-based blog posts with automatic slug generation, tags, and efficient filtering capabilities.

## Problem Statement

The current blog implementation relies on hardcoded React components in a TypeScript content file, making it difficult to:
- Add new blog posts without code changes
- Manage content separately from the application code
- Scale the blog as content grows
- Maintain consistent formatting and structure
- Provide efficient search and filtering capabilities

The existing system requires developers to modify code for content updates, creating unnecessary friction in the publishing workflow.

## Requirements

### User Requirements
- Fast page load times (< 2s initial load, < 500ms navigation)
- Intuitive navigation with tag filtering and search
- Clean, readable layout optimized for article consumption
- Mobile-responsive design
- SEO-optimized pages with proper meta tags

### Technical Requirements
- Markdown files as the source of truth for blog content
- Automatic slug generation from filename (format: `YYYY-MM-DD-title-kebab-case.md`)
- Frontmatter support for metadata (title, date, tags)
- Static generation at build time for optimal performance
- Efficient client-side filtering without page reloads
- Fuzzy search implementation for content discovery

### Design Requirements
- Maintain consistency with existing oceanheart.ai design system
- Use existing Tailwind/DaisyUI components
- Preserve current blog layout and visual hierarchy
- Ensure smooth transitions during filtering/search

## Implementation Phases

### Phase 1: Core Markdown Pipeline
- Set up markdown parsing infrastructure
- Create markdown blog post template with frontmatter
- Implement slug generation from filenames
- Build markdown-to-JSX conversion pipeline
- Migrate existing blog posts to markdown format

### Phase 2: Navigation & Discovery
- Implement tag-based filtering system
- Add fuzzy search functionality
- Create tag cloud or filter UI components
- Optimize client-side state management for filters
- Add keyboard shortcuts for power users

### Phase 3: Performance & Polish
- Implement content caching strategies
- Add pagination for large content sets
- Optimize image loading with lazy loading
- Add reading time estimates
- Implement related articles suggestions

## Implementation Notes

### Markdown File Structure
```markdown
---
title: "Blog Post Title"
date: 2025-02-24
tags: ["ai", "therapy", "feature"]
author: "kai"
description: "Brief description for SEO and previews"
image: "/blog/post-slug/header.jpg"
published: true
---

# Content starts here

Blog post content in standard markdown...
```

### File Naming Convention
```
/content/blog/
  2025-02-24-introducing-oceanheart.md
  2025-02-25-composable-agents.md
  2025-02-26-scaling-compute.md
```

### Parsing Pipeline
```typescript
// Simplified implementation approach
const blogPost = {
  slug: generateSlugFromFilename(filename),
  frontmatter: parseFrontmatter(content),
  content: parseMarkdown(content),
  readingTime: calculateReadingTime(content)
};
```

### Search Implementation
```typescript
// Use existing fuzzy search library
import Fuse from 'fuse.js';

const searchIndex = new Fuse(posts, {
  keys: ['title', 'description', 'content', 'tags'],
  threshold: 0.3
});
```

## Security Considerations

- Sanitize markdown content to prevent XSS attacks
- Validate frontmatter schema to ensure data integrity
- Implement rate limiting for search queries if exposed via API
- Ensure proper Content Security Policy headers

## Success Metrics

- Page load performance: < 2s initial load (measured via Lighthouse)
- Navigation speed: < 500ms between blog posts
- Search response time: < 100ms for fuzzy search results
- Content management efficiency: < 5 minutes to publish new post
- SEO performance: Improved search engine visibility

## Future Enhancements

- RSS feed generation
- Newsletter integration
- Comments system (if user engagement warrants)
- Analytics integration for popular content tracking
- Draft/preview functionality
- Content versioning
- Multi-author support enhancements
- Series/collection grouping for related posts