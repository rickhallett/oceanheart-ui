# Portfolio Detail Enhancement PRD

**Date:** September 14, 2024
**Feature:** Enhanced Portfolio Detail Pages with README Integration

---

## Executive Summary

This PRD outlines the enhancement of portfolio project detail pages to improve user experience and content richness. The current implementation has a basic detail page with minimal content and mixed routing behavior. This enhancement will standardize routing to always use portfolio detail pages and integrate rich README content from the `docs/projects/` directory to provide more comprehensive project information.

## Problem Statement

### Current Issues

1. **Inconsistent Routing**: Portfolio cards currently route to either external URLs or internal detail pages based on project configuration, creating an inconsistent user experience.

2. **Minimal Detail Content**: The existing detail page (`app/portfolio/[slug]/page.tsx`) shows only basic project information with a placeholder alert message indicating limited content.

3. **Underutilized Content**: Rich project documentation exists in `docs/projects/` (watson.md, preflight.md, notebook.md, passport.md) but is not integrated into the user-facing portfolio.

4. **Poor Visual Hierarchy**: Detail pages use the same project screenshot/image instead of more informative content layout.

### Current Routing Logic
```typescript
// In FeaturedGrid.tsx
href={p.externalUrl || `/portfolio/${p.slug}`}
target={p.externalUrl ? "_blank" : undefined}
```

### Available Documentation
- `docs/projects/watson.md` - Clinical LLM review tool
- `docs/projects/preflight.md` - AI readiness survey
- `docs/projects/notebook.md` - Learn-in-public blog
- `docs/projects/passport.md` - Central authentication system

## Requirements

### User Requirements
- **Consistent Navigation**: All portfolio cards should route to internal detail pages
- **Rich Content**: Detail pages should display comprehensive project information
- **Better Information Architecture**: Replace generic project images with structured content presentation
- **External Access**: Maintain ability to access live applications through clear CTAs

### Technical Requirements
- Modify routing logic to always use `/portfolio/[slug]` paths
- Create README content integration system
- Map project slugs to corresponding documentation files
- Implement markdown rendering for project documentation
- Add external application access through dedicated buttons/links
- Maintain existing slug generation and routing infrastructure

### Design Requirements
- Replace hero image section with structured content layout
- Implement clear visual hierarchy for project information
- Add prominent external application access CTAs
- Ensure mobile-responsive design
- Maintain consistency with existing design system (DaisyUI/Tailwind)

## Implementation Phases

### Phase 1: Routing Standardization
- Remove external URL routing from portfolio cards
- Update `FeaturedGrid.tsx` to always route to `/portfolio/[slug]`
- Update `BookTabs.tsx` portfolio cards with same routing logic
- Test routing consistency across all portfolio entry points

### Phase 2: README Integration System
- Create README content loading system
- Implement slug-to-documentation mapping
- Add markdown parsing and rendering capabilities
- Create fallback content for projects without documentation
- Handle missing documentation files gracefully

### Phase 3: Detail Page Enhancement
- Redesign portfolio detail page layout
- Replace hero image with structured content sections
- Implement markdown content rendering
- Add external application access section
- Update responsive design and mobile layout

### Phase 4: Content and UX Polish
- Review and enhance existing project documentation
- Add consistent formatting to README files
- Implement loading states and error handling
- Add navigation improvements (breadcrumbs, related projects)
- Performance optimization for content loading

## Implementation Notes

### Current Slug Generation
```typescript
export function makeProjectSlug(sectionId: string, title: string) {
  return `${sectionId}-${slugify(title)}`
}
```

### Expected Slug Mappings
- `apps-watson` → `docs/projects/watson.md`
- `integrations-passport` → `docs/projects/passport.md`
- `integrations-oceanheart-notebook` → `docs/projects/notebook.md`
- `apps-preflight` → `docs/projects/preflight.md`
- `research-projects-exposurelab` → needs documentation creation

### Markdown Processing
```typescript
// Example implementation approach
import { readFile } from 'fs/promises'
import { remark } from 'remark'
import html from 'remark-html'

async function getProjectReadme(projectSlug: string) {
  // Map slug to documentation file
  const docMap = {
    'apps-watson': 'watson.md',
    'integrations-passport': 'passport.md',
    // ... etc
  }

  const docFile = docMap[projectSlug]
  if (!docFile) return null

  const content = await readFile(`docs/projects/${docFile}`, 'utf8')
  const processed = await remark().use(html).process(content)
  return processed.toString()
}
```

### Updated Detail Page Structure
```typescript
// Enhanced detail page layout
<main className="max-w-4xl mx-auto px-6 py-16">
  <Navigation />
  <ProjectHeader />
  <ExternalAppAccess />
  <ProjectContent /> // README content
  <TechStackSection />
  <RelatedProjectsSection />
</main>
```

## Security Considerations

### Content Security
- Sanitize markdown content to prevent XSS attacks
- Validate file paths to prevent directory traversal
- Use server-side rendering for content processing

### Access Control
- Ensure documentation files don't contain sensitive information
- Implement proper error handling for missing files
- Use read-only access to documentation directory

## Success Metrics

### User Experience
- **Navigation Consistency**: 100% of portfolio cards route to detail pages
- **Content Richness**: All major projects have comprehensive documentation
- **User Engagement**: Increased time spent on portfolio detail pages

### Technical Performance
- **Page Load Time**: Detail pages load within 2 seconds
- **Error Handling**: Graceful fallbacks for missing documentation
- **Mobile Responsiveness**: Optimal display across all device sizes

## Future Enhancements

### Content Management
- Admin interface for editing project documentation
- Dynamic content updates without code deployments
- Version control integration for documentation changes

### Enhanced Features
- Project galleries with multiple screenshots
- Interactive demos or embedded previews
- User feedback and testimonial integration
- Related project recommendations

### SEO and Discovery
- Dynamic meta tags based on project content
- Structured data markup for better search indexing
- Social media preview optimization

---

## Appendix: Current Implementation Analysis

### Existing Detail Page
The current implementation at `app/portfolio/[slug]/page.tsx` provides:
- Basic project information display
- Single hero image
- Tech stack visualization
- Placeholder alert for content expansion

### Available Documentation Structure
Documentation in `docs/projects/` follows consistent structure:
- Project overview and purpose
- Technical architecture details
- Key features and capabilities
- Implementation highlights
- Usage examples and screenshots

This rich content is currently unutilized in the user-facing portfolio, representing a significant opportunity for enhancement.