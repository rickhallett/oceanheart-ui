# Oceanheart.ai Refactoring PRD

## Executive Summary

This document outlines a comprehensive refactoring plan for the Oceanheart.ai codebase. The focus is on cleaning up duplicate code, archiving deprecated features, and ensuring a more maintainable codebase going forward. The main pages to be preserved and enhanced are the landing page, about page, privacy policy page, and terms of service page, while other features will be archived rather than deleted outright.

## Current State Assessment

### Codebase Overview
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI**: React 18, Tailwind CSS, DaisyUI, Framer Motion, Recharts
- **Backend**: Next.js API Routes, Supabase (Auth, PostgreSQL)
- **Payments**: Stripe
- **Email**: Resend

### Issues Identified

#### 1. Duplicated Code

1. **Authentication Implementations**:
   - Three similar authentication flows in `/signin/page.tsx`, `/app/signin/page.tsx`, and `/app/saigo/signin/page.tsx`
   - Duplicate authentication API routes in `/app/api/auth/callback/route.ts` and `/app/api/auth/saigo-callback/route.ts`

2. **Redundant Components**:
   - Multiple testimonial components with overlapping functionality
   - Several feature display components with similar purposes
   - Duplicate button components for authentication

3. **Page Duplication**:
   - Privacy policy and terms of service pages exist in both root and `/app` directories
   - Multiple implementations of similar sections in the landing page

4. **Directory Structure Issues**:
   - Both legacy pages router and newer app router code coexist
   - Some components seem to exist in multiple directories

#### 2. Dead/Unused Code

1. **Unused Components**:
   - Several components have no imports anywhere in the codebase
   - Testimonial and video components appear unused

2. **Deprecated Features**:
   - Saigo feature (leaderboard, practice tracking)
   - HDI (Human Digital Interface) experimental section
   - Various A/B testing components from previous iterations

3. **Commented-Out Code**:
   - Instagram service has commented implementation
   - Multiple TODOs indicating planned changes

4. **Duplicate Files**:
   - Task files duplicated across `/tasks/` and `/tasks-refactor/`
   - Various root-level files duplicate app router functionality

## Refactoring Goals

1. **Codebase Cleanup**:
   - Archive deprecated features rather than delete them
   - Remove duplicated code where possible
   - Establish a clear component hierarchy
   - Standardize on the App Router pattern

2. **Feature Focus**:
   - Ensure landing page, about page, privacy policy, and terms page are optimized
   - Remove or archive features that are no longer core to the business

3. **Documentation**:
   - Document the archive structure for future reference
   - Create clear component documentation

## Implementation Plan

### 1. Code Organization and Architecture

#### 1.1 Directory Structure
- **Active Code**:
  - `/app`: All active Next.js App Router pages and API routes
  - `/components`: Active, reusable React components
  - `/libs`: Utility functions and service integrations
  - `/types`: TypeScript type definitions
  - `/public`: Static assets

- **Archived Code**:
  - `/archived`: New top-level directory for deprecated code
    - `/archived/saigo`: Complete Saigo feature code
    - `/archived/hdi`: Complete HDI feature code
    - `/archived/ab-testing`: Old A/B testing implementations

#### 1.2 Component Refactoring
- Standardize component file structure
- Create consistent naming conventions
- Ensure all components are properly typed
- Remove unused props and functions

### 2. Feature-Specific Refactoring

#### 2.1 Core Pages Enhancement
- Update landing page to reflect new branding
- Optimize about page with latest content
- Ensure privacy policy and terms pages are consistent and up-to-date
- Implement consistent header and footer across all pages

#### 2.2 Authentication Consolidation
- Standardize on a single authentication flow
- Remove redundant authentication components
- Ensure clean separation between auth UI and logic

#### 2.3 API Route Cleanup
- Archive deprecated API routes
- Consolidate similar API functionality
- Document API endpoints for future reference

### 3. Archive Strategy

#### 3.1 Saigo Feature
- Move all Saigo-related code to `/archived/saigo`
- Include app pages, components, and API routes
- Document database tables and their relationships
- Create a README explaining the feature and archival reason

#### 3.2 HDI Feature
- Move all HDI-related code to `/archived/hdi`
- Include components, pages, and API routes
- Document any specialized functionality

#### 3.3 Other Deprecated Features
- Archive AB testing components no longer in use
- Archive unused testimonial components
- Maintain database migration files for reference

## Technical Implementation Details

### 1. Component Duplication Resolution

#### 1.1 Authentication Components
- Keep only `/app/signin/page.tsx` and related components
- Remove or archive duplicate implementations
- Refactor `ButtonSignin.tsx` and `ButtonAccount.tsx` into a single component with different modes

#### 1.2 Feature Display Components
- Consolidate `FeaturesGrid.tsx`, `FeaturesListicle.tsx`, and `FeaturesAccordion.tsx` into a single component with different layout options
- Refactor testimonial components into a unified system

#### 1.3 Section Components
- Evaluate newly added `KnowledgeGapSection.tsx` and `CompoundingHoursSection.tsx` for potential consolidation
- Create a generic section component pattern for consistency

### 2. Dead Code Removal

#### 2.1 Unused Root-Level Files
- Archive or remove duplicated root-level files:
  - `/page.tsx` (duplicates app router structure)
  - `/globals.css` (duplicate of app/globals.css)
  - `/error.tsx` (redundant with app/error.tsx)
  - `/not-found.tsx` (redundant with app/not-found.tsx)

#### 2.2 Commented-Out Code
- Remove commented code blocks in:
  - `/libs/instagram-service.ts`
  - `/libs/gpt.ts`
  - Various components with commented sections

#### 2.3 Tools and Development Files
- Clean up development tool files:
  - `/aider.session`
  - `/session.aider`
  - `/bak.aider.model.settings.yml`

### 3. Archive Structure Implementation

#### 3.1 Saigo Archive
```
/archived/saigo/
  /app/ - App router pages
  /api/ - API routes
  /components/ - UI components
  /libs/ - Utility functions
  /migrations/ - Database migrations
  README.md - Documentation
```

#### 3.2 HDI Archive
```
/archived/hdi/
  /app/ - App router pages
  /api/ - API routes
  /components/ - UI components
  /libs/ - Utility functions
  README.md - Documentation
```

## Risk Assessment and Mitigation

### Potential Risks

1. **Breaking Changes**:
   - Moving components might break existing imports
   - Removing unused code could affect hidden dependencies

2. **Database Dependencies**:
   - Archived features may have database tables referenced by active code
   - Foreign key relationships may exist between active and archived tables

3. **Client-Side Navigation**:
   - Links to archived pages might exist in active pages
   - User bookmarks to deprecated pages will break

### Mitigation Strategies

1. **Phased Approach**:
   - Implement changes in logical, isolated chunks
   - Test thoroughly after each phase
   - Use feature flags for gradual transition

2. **Comprehensive Testing**:
   - Create a test plan for core functionality
   - Verify all user flows still work after changes
   - Test on multiple devices and browsers

3. **Redirects for Removed Routes**:
   - Implement Next.js redirects for deprecated routes
   - Create a 404 page that helps users find what they need

## Implementation Roadmap

### Phase 1: Initial Setup (Week 1)
- Create the `/archived` directory structure
- Document the archival approach
- Set up test environments

### Phase 2: Code Archival (Week 2)
- Move Saigo feature code to archive
- Move HDI feature code to archive
- Update references in active code

### Phase 3: Duplication Resolution (Week 3)
- Consolidate authentication components
- Refactor feature display components
- Update header/footer components

### Phase 4: Cleanup and Testing (Week 4)
- Remove unused root-level files
- Clean up commented code
- Comprehensive testing of all features

## Success Criteria

1. **Codebase Metrics**:
   - Reduced overall line count
   - Fewer components with high similarity
   - Improved code quality metrics

2. **Performance**:
   - Maintained or improved page load times
   - Reduced bundle size
   - Better Lighthouse scores

3. **Developer Experience**:
   - Clearer component structure
   - Improved documentation
   - Faster onboarding for new developers

## Conclusion

This refactoring plan aims to clean up the Oceanheart.ai codebase while preserving important features and functionality. By archiving deprecated code rather than deleting it, we maintain the ability to reference or restore previous functionality if needed in the future. The result will be a more maintainable, efficient codebase focused on the core business needs: a compelling landing page, about page, and necessary legal pages like privacy policy and terms of service.