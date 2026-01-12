# Oceanheart.ai Rebrand Progress

Last updated: 2026-01-12

## Phase Status

| Phase | Status | Iterations | Notes |
|-------|--------|------------|-------|
| 1 - Foundation | COMPLETE | 1 | CSS, fonts, hero, nav, ASCII logo |
| 2 - Portfolio | COMPLETE | 1 | Terminal cards, categorization, case study |
| 3 - Content | COMPLETE | 1 | About/consulting rewrite, 3 technical posts |
| 4 - Polish | COMPLETE | 1 | Keyboard nav, help overlay, terminal footer |
| 5 - Kaishin Cleanup | COMPLETE | 1 | Remove coaching content, engineering-first focus |

## Phase 1: Foundation

### Completed
- [x] Tokyo Night CSS variables added to `src/app/globals.css`
- [x] JetBrains Mono font configured in `src/app/layout.tsx`
- [x] Inter font configured in `src/app/layout.tsx`
- [x] Terminal utility classes created (`.font-terminal`, `.text-terminal-*`, etc.)
- [x] ASCII logo component: `src/components/terminal/ASCIILogo.tsx`
- [x] Terminal Hero component: `src/components/terminal/TerminalHero.tsx`
- [x] Engineering landing page: `src/app/build/page.tsx`
- [x] GitHub link added to Navigation (desktop and mobile)

### Verification
- [x] `/build` route renders terminal aesthetic
- [x] ASCII logo animates with typewriter effect
- [x] Navigation shows GitHub icon
- [x] Terminal colors match Tokyo Night palette

## Files Created/Modified

### New Files
- `src/components/terminal/ASCIILogo.tsx`
- `src/components/terminal/TerminalHero.tsx`
- `src/components/terminal/index.ts`
- `src/app/build/page.tsx`
- `.claude/prompts/rebrand/phase-1-foundation.md`
- `.claude/rebrand-progress.md`

### Modified Files
- `src/app/globals.css` - Added Tokyo Night variables and terminal utilities
- `src/app/layout.tsx` - Added JetBrains Mono and Inter fonts
- `src/components/kaishin/Navigation.tsx` - Added GitHub link

## Phase 2: Portfolio Enhancement

### Completed
- [x] Extended `src/lib/portfolio.ts` with new fields:
  - `problem` - One-sentence problem statement
  - `solution` - One-sentence solution description
  - `status` - Production | Prototype | Experiment | Archived
  - `impact` - Impact metrics where available
  - `currentlyBuilding` - Flag for active projects
- [x] Created `TerminalPortfolioCard` component with terminal styling
- [x] Rewrote `/portfolio` page with categorized sections:
  - Currently Building (with pulsing indicator)
  - Featured Case Study (Swanage Traffic Alliance)
  - Production Systems
  - Prototypes
  - Experiments
- [x] Added helper functions for project filtering by status
- [x] Applied terminal aesthetic throughout

### Verification
- [x] All project cards have enhanced structure
- [x] Projects categorized correctly by status
- [x] "Currently building" section renders with active projects
- [x] Swanage Traffic case study with full writeup
- [x] Terminal aesthetic maintained (colors, typography)
- [x] Build compiles successfully

### New Files
- `src/components/terminal/TerminalPortfolioCard.tsx`
- `.claude/prompts/rebrand/phase-2-portfolio.md`

### Modified Files
- `src/lib/portfolio.ts` - Added ProjectStatus type, new fields, helper functions
- `src/app/portfolio/page.tsx` - Complete rewrite with terminal aesthetic
- `src/components/terminal/index.ts` - Added TerminalPortfolioCard export

## Phase 3: Content & Blog Pipeline

### Completed
- [x] About page (`/kai`) rewritten with engineering-first identity:
  - JSON-formatted credentials section
  - Technical stack breakdown
  - Problem/solution framing
  - Proof points from portfolio
  - Terminal aesthetic throughout
- [x] Consulting page rewritten as "Engineering Consulting":
  - Specific services: Custom AI Tools, Web Apps, AI Strategy, Team Augmentation
  - Target audiences: Healthcare, Startups, Coaches/Consultants
  - Process flow: Discovery → Proposal → Build → Ship
  - Portfolio proof points
  - Terminal aesthetic throughout
- [x] Created 3 new technical blog posts:
  - "Building a Terminal Aesthetic in Next.js" (2025-01-20)
  - "Building RAG Systems for Therapeutic Context" (2025-01-22)
  - "Every Prototype Should Be Deployable" (2025-01-25)

### Verification
- [x] About page leads with engineering identity
- [x] Consulting page has specific audiences and services
- [x] At least 3 technical blog posts exist
- [x] Blog has clear technical/builder focus
- [x] Terminal aesthetic consistent across all pages
- [x] Build compiles successfully

### Modified Files
- `src/app/kai/page.tsx` - Complete rewrite with engineering identity
- `src/app/consulting/page.tsx` - Complete rewrite as engineering consulting

### New Files
- `content/blog/2025-01-20-building-terminal-aesthetic-nextjs.md`
- `content/blog/2025-01-22-rag-systems-therapy-context.md`
- `content/blog/2025-01-25-shipping-prototypes-production.md`
- `.claude/prompts/rebrand/phase-3-content.md`

## Phase 4: Terminal Polish

### Completed
- [x] Keyboard navigation system with vim-style shortcuts:
  - `g h` - Go to Home
  - `g p` - Go to Portfolio
  - `g b` - Go to Blog
  - `g c` - Go to Consulting
  - `g a` - Go to About
  - `g s` - Go to Build
  - `j/k` - Scroll down/up
  - `g g` / `G` - Go to top/bottom
  - `?` - Toggle help overlay
  - `ESC` - Close overlay
- [x] Help overlay showing all keyboard shortcuts
- [x] Terminal footer with keyboard hint and cursor blink
- [x] Pending key indicator for multi-key sequences
- [x] Touch device detection (shortcuts disabled on mobile)

### Verification
- [x] Keyboard shortcuts functional
- [x] Help overlay shows all shortcuts
- [x] Terminal styling elements present
- [x] No accessibility regressions (touch devices handled)
- [x] All previous phase work intact
- [x] Build compiles successfully

### New Files
- `src/components/terminal/KeyboardNavigation.tsx`
- `src/components/terminal/TerminalFooter.tsx`
- `.claude/prompts/rebrand/phase-4-polish.md`

### Modified Files
- `src/components/terminal/index.ts` - Added new exports
- `src/app/layout.tsx` - Added KeyboardNavigation component
- `src/app/portfolio/page.tsx` - TerminalFooter
- `src/app/kai/page.tsx` - TerminalFooter
- `src/app/consulting/page.tsx` - TerminalFooter
- `src/app/build/page.tsx` - TerminalFooter

---

## Phase 5: Kaishin Method Content Cleanup

### Completed
- [x] Deleted pages: `/somatic`, `/path`, `/program`
- [x] Deleted spiritual blog posts:
  - `2025-01-05-three-pillars-framework.md`
  - `2025-01-10-zen-practice-modern-life.md`
  - `2025-01-15-five-bodies-integration.md`
- [x] Navigation simplified (removed Kaishin dropdown)
- [x] Homepage completely rewritten with engineering focus
- [x] Blog pages updated with terminal aesthetic
- [x] Deleted 11 unused kaishin components:
  - Footer, PillarCard, LeadMagnetForm, PopularBadge
  - ProblemAmplification, RiskReversal, FAQSection
  - TestimonialsCarousel, CourseCard, PortfolioCard, RevealOnScroll
- [x] Deleted FiveBodiesCard from main components
- [x] Updated kaishin/index.ts exports
- [x] Updated landing components (AIModal, AskOceanheart)
- [x] Updated author bio to engineering focus
- [x] All pages using TerminalFooter instead of old Footer

### Remaining Kaishin References (Member App)
The `/app` member portal still contains Kaishin content. Per PRD Phase 6, this can be:
- Option A: Remove entirely (recommended for clean slate)
- Option B: Repurpose for future developer tools

### Files Deleted
- `src/app/somatic/page.tsx`
- `src/app/path/page.tsx`
- `src/app/program/page.tsx`
- `content/blog/2025-01-05-three-pillars-framework.md`
- `content/blog/2025-01-10-zen-practice-modern-life.md`
- `content/blog/2025-01-15-five-bodies-integration.md`
- 11 kaishin component files
- `src/components/FiveBodiesCard.tsx`

### Modified Files
- `src/components/kaishin/Navigation.tsx` - Simplified nav links
- `src/components/kaishin/index.ts` - Reduced exports
- `src/app/page.tsx` - Complete engineering-first rewrite
- `src/app/blog/page.tsx` - Terminal aesthetic
- `src/app/blog/[slug]/page.tsx` - Terminal aesthetic
- `src/app/synai/page.tsx` - TerminalFooter
- `src/app/cv/page.tsx` - TerminalFooter
- `src/app/labs/program/v1/page.tsx` - TerminalFooter
- `src/app/labs/program/v7/page.tsx` - TerminalFooter
- `src/components/landing/AIModal.tsx` - Updated welcome message
- `src/components/landing/AskOceanheart.tsx` - Updated placeholders
- `content/authors/richard-hallett.md` - Engineering bio

---

## REBRAND & CLEANUP COMPLETE

All 5 phases finished successfully:
- Terminal aesthetic applied across all public pages
- Portfolio with categorized projects
- About page with engineering identity
- Consulting page with specific services
- 3 technical blog posts (spiritual posts removed)
- Keyboard navigation system
- Terminal footer with shortcuts hint
- Homepage engineering-first (no Kaishin content)
- Navigation simplified
- Unused components cleaned up

### Public Site Status
Engineering-focused with no visible Kaishin/somatic content on public pages.

### Member App (/app) Status
Still contains Kaishin content - can be addressed in future cleanup if needed.
