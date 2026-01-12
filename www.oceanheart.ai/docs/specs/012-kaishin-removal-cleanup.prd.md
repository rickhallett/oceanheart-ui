# PRD: Kaishin Method Content Removal

## Overview

Following the terminal rebrand (Phases 1-4), remove all spiritual/coaching content related to "The Kaishin Method", somatic work, five bodies framework, three pillars, and private sessions. The goal is a focused engineering-first website.

## Current State

The website contains dual messaging:
1. **Engineering identity** (new): Portfolio, consulting, technical blog posts
2. **Coaching/spiritual identity** (old): Kaishin Method, somatic sessions, transformation programs

## Target State

A clean engineering-focused site with:
- Portfolio showcasing technical projects
- Blog with technical content
- Consulting services page
- About page with engineering credentials
- No spiritual/coaching content

---

## Phase 1: Page Removal (High Priority)

### Pages to DELETE

| Page | Path | Reason |
|------|------|--------|
| Somatic Sessions | `/src/app/somatic/page.tsx` | Pure coaching offering |
| Kaishin Framework | `/src/app/path/page.tsx` | Spiritual methodology |
| Program Sales | `/src/app/program/page.tsx` | Course sales funnel |

### Implementation
```bash
# Remove pages
rm src/app/somatic/page.tsx
rm src/app/path/page.tsx
rm src/app/program/page.tsx
# Remove directories if empty
rmdir src/app/somatic src/app/path src/app/program 2>/dev/null || true
```

---

## Phase 2: Homepage Rewrite (High Priority)

### Current Homepage Issues (`/src/app/page.tsx`)
- References "five bodies integration"
- "Why Kaishin Is Different" section
- "90-day transformation" messaging
- Course pricing (£47, £497)
- Lead magnet form
- Testimonials for coaching

### New Homepage Structure
```
HERO
├── Name: Kai Hallett
├── Title: Software Engineer & Human Systems Architect
├── Tagline: "I build AI systems that actually work for humans"
└── CTA: "See my work" → /portfolio

FEATURED PROJECTS (3-4 cards)
├── Link to /portfolio
└── Status badges [production/prototype]

DIFFERENTIATOR
├── "15 years as a therapist... 5 years as an engineer..."
└── Brief value proposition

SERVICES (simplified)
├── "Need something built?" → /portfolio
├── "Need AI guidance?" → /consulting
└── CTA: Schedule call

BLOG PREVIEW
├── Latest 2-3 technical posts
└── Link to /blog
```

---

## Phase 3: Component Cleanup (Medium Priority)

### kaishin/ Directory Decision

**Option A: Remove entire directory**
- Pros: Clean slate, no legacy code
- Cons: Lose PageTransition, Tabs, Switch, RevealOnScroll utilities

**Option B: Migrate useful utilities, delete rest**
- Move to `/src/components/ui/`: PageTransition.tsx, Tabs.tsx, Switch.tsx, RevealOnScroll.tsx
- Delete everything else

**Recommended: Option B**

### Components to DELETE from kaishin/
```
src/components/kaishin/
├── FiveBodiesVisualizer.tsx  [DELETE]
├── CircleProgress.tsx        [DELETE]
├── PillarCard.tsx           [DELETE]
├── PillarIcon.tsx           [DELETE]
├── CourseCard.tsx           [DELETE]
├── LeadMagnetForm.tsx       [DELETE]
├── TestimonialsCarousel.tsx [DELETE]
├── FAQSection.tsx           [DELETE]
├── RiskReversal.tsx         [DELETE]
├── PopularBadge.tsx         [DELETE]
├── ProblemAmplification.tsx [DELETE]
├── Navigation.tsx           [MODIFY - remove Kaishin dropdown]
├── Footer.tsx               [DELETE - replaced by TerminalFooter]
├── index.ts                 [UPDATE exports]
├── PageTransition.tsx       [MIGRATE to ui/]
├── Tabs.tsx                 [MIGRATE to ui/]
├── Switch.tsx               [MIGRATE to ui/]
└── RevealOnScroll.tsx       [MIGRATE to ui/]
```

### Other Components to DELETE
```
src/components/FiveBodiesCard.tsx [DELETE]
src/components/MemberAreaTransition.tsx [CHECK - may be needed for /app]
```

---

## Phase 4: Navigation Update (High Priority)

### Current Navigation Structure
```typescript
// Remove this entire dropdown
{
  label: "Kaishin Method",
  dropdown: [
    { href: "/path", label: "The Methodology" },
    { href: "/program", label: "90-Day Program" },
    { href: "/somatic", label: "Somatic Practice" },
  ]
}
```

### New Navigation Structure
```typescript
const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/consulting", label: "Consulting" },
  { href: "/kai", label: "About" },
];
```

---

## Phase 5: Blog Content Cleanup (Medium Priority)

### Blog Posts to DELETE
| File | Title | Reason |
|------|-------|--------|
| `2025-01-05-three-pillars-framework.md` | Three Pillars: View, Compass, Ground | Spiritual framework |
| `2025-01-10-zen-practice-modern-life.md` | Zen Practice in Modern Life | Meditation content |
| `2025-01-15-five-bodies-integration.md` | The Five Bodies | Spiritual framework |

### Blog Posts to KEEP
| File | Title | Category |
|------|-------|----------|
| `2025-01-20-building-terminal-aesthetic-nextjs.md` | Terminal Aesthetic in Next.js | Technical |
| `2025-01-22-rag-systems-therapy-context.md` | RAG Systems for Therapeutic Context | Technical (AI/Human) |
| `2025-01-25-shipping-prototypes-production.md` | Every Prototype Should Be Deployable | Technical |

### Implementation
```bash
rm content/blog/2025-01-05-three-pillars-framework.md
rm content/blog/2025-01-10-zen-practice-modern-life.md
rm content/blog/2025-01-15-five-bodies-integration.md
```

---

## Phase 6: Course/Member Area Decision (Low Priority)

### Current State
- `/src/app/app/` - Member portal
- `/src/app/app/courses/` - Course viewer
- `/content/courses/` - Course content
- `/src/contexts/CourseContext.tsx` - Course state

### Options

**Option A: Remove entirely**
- Delete all course-related code
- Remove member portal
- Simplest but loses infrastructure

**Option B: Repurpose for future**
- Keep member portal infrastructure
- Remove Kaishin-specific courses
- Could be used for future developer tools/resources

**Recommended: Option A for now**
- Can rebuild member features later if needed
- Cleaner codebase

---

## Phase 7: Final Verification

### Checklist
- [ ] No references to "Kaishin Method" remain
- [ ] No references to "somatic" or "five bodies"
- [ ] No references to coaching sessions or transformation
- [ ] No broken links to removed pages
- [ ] Navigation updated
- [ ] Footer updated (already using TerminalFooter on key pages)
- [ ] Homepage engineering-focused
- [ ] Build compiles successfully
- [ ] All routes resolve correctly

### Search Commands
```bash
# Verify removal
grep -r "kaishin" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md"
grep -r "somatic" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md"
grep -r "five bodies" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md"
grep -r "three pillars" src/ content/ --include="*.tsx" --include="*.ts" --include="*.md"
```

---

## Execution Order

1. **Phase 1**: Delete obvious pages (somatic, path, program)
2. **Phase 4**: Update navigation (remove broken links)
3. **Phase 5**: Delete spiritual blog posts
4. **Phase 2**: Rewrite homepage
5. **Phase 3**: Clean up components
6. **Phase 6**: Decide on member area
7. **Phase 7**: Verify and test

---

## Risk Mitigation

### Before Starting
- Commit current state with message: "Rebrand complete - before Kaishin removal"
- Create branch: `cleanup/kaishin-removal`

### Rollback Plan
- All changes reversible via git
- No data deletion (content is in repo)

---

## Success Criteria

1. Site focuses purely on engineering/AI consulting
2. No spiritual/coaching content visible
3. Clean, fast build with no unused code
4. All navigation works correctly
5. Blog shows only technical content
