# The Kaishin Method - Color Strategy Style Guide

## Executive Summary

This guide establishes a disciplined color hierarchy for The Kaishin Method website. The strategy follows the **80/10/5/5 Rule** to create visual clarity, brand consistency, and sophisticated restraint expected of a premium wellness brand.

---

## Core Principle

**Color is a voice—use it like a whisper, not a shout.**

Every accent color must earn its place by communicating meaning, not just filling space.

---

## The 80/10/5/5 Rule

| Tier | Color | Usage % | Purpose |
|------|-------|---------|---------|
| **Tier 1** | Ocean Blue (#4fc3f7) | 70-80% | Primary brand color, main interactions |
| **Tier 2** | Jade (#5dd6ae) | 15-20% | Secondary actions, success states |
| **Tier 3** | Plum (#ba68c8) | ~5% | Premium tier indicators only |
| **Tier 4** | Gold (#f2cc8f) | ~5% | Trust signals, guarantees only |

**Foundation Colors:**
- **Zinc scale (grays):** Should comprise 70% of all color by area
- **Black background (#000000):** Should comprise 90% of all backgrounds

---

## Color Palette

### Primary Accent (Tier 1)
```css
--ocean-blue: #4fc3f7;
```
**Usage:** 70-80% of all accent applications
- All primary CTAs ("Begin Your Journey", "Start 30-Day Challenge")
- Active navigation states
- Primary interactive elements (links, buttons)
- Progress indicators (current state)
- Brand logo accent

**Purpose:** This is your brand color. It should dominate.

---

### Secondary Accent (Tier 2)
```css
--jade: #5dd6ae;
```
**Usage:** 15-20% of accent applications
- Secondary CTAs ("Learn More", "View All Courses")
- Success states (completed modules, achievements)
- Highlights for positive outcomes
- Selected/featured content cards
- Progress indicators (completed state)

**Purpose:** Support primary color, indicate positive actions/states

---

### Semantic Colors (Tier 3 - EXTREMELY LIMITED)

#### Plum - Premium Indicator
```css
--plum: #ba68c8;
```
**Usage:** ~5% (Maximum 1-2 uses per page)
- Premium tier indicators (Master level programs only)
- Special announcements
- Transformation/spiritual concepts

#### Gold - Trust Signals
```css
--gold: #f2cc8f;
```
**Usage:** ~5% (Maximum 1-2 uses per page)
- Guarantees/trust signals
- Certification badges
- Achievement highlights

---

### Functional Colors
```css
--success: #5dd6ae; /* Jade */
--warning: #f59e0b; /* Muted amber */
--error: #ef4444;   /* Muted red */
--info: #4fc3f7;    /* Ocean Blue */
```

---

### Base & Typography Colors
```css
/* Backgrounds */
--void: #000000;       /* Pure black - 95% of site */
--obsidian: #0a0a0a;   /* Slightly lighter black */
--charcoal: #1a1a1a;   /* Card backgrounds */
--slate: #262626;      /* Elevated surfaces */
--ash: #3a3a3a;        /* Muted backgrounds */

/* Text Hierarchy (Zinc Scale) */
--zinc-50: #fafafa;    /* H1/Hero Text */
--zinc-200: #e4e4e7;   /* H2/Section Headers */
--zinc-300: #d4d4d8;   /* H3/Card Headers */
--zinc-400: #a1a1aa;   /* Body Text */
--zinc-500: #71717a;   /* Muted Text */
--zinc-600: #52525b;   /* Very muted */
--zinc-700: #3f3f46;   /* Borders, dividers */
--zinc-800: #27272a;   /* Subtle backgrounds */
--zinc-900: #18181b;   /* Darkest text */
```

---

## Implementation Guidelines

### 1. Background Strategy

**Primary Background:** Pure black (#000000) - 95% of site

**Accent Background:** Use ONLY for lead magnet or special sections
```css
/* Subtle ocean blue background (not sky blue) */
background: rgba(79, 195, 247, 0.08);

/* OR: Keep black, use borders/glows instead */
background: #000000;
border: 1px solid rgba(79, 195, 247, 0.3);
box-shadow: 0 0 20px rgba(79, 195, 247, 0.15);
```

**❌ NEVER:** Use bright sky blue backgrounds—breaks immersion

---

### 2. Button Hierarchy

#### Primary CTA (70% of buttons)
```css
.btn-primary {
  background: #4fc3f7;        /* Solid ocean blue */
  color: #000000;             /* Black text for contrast */
  border: 1px solid #4fc3f7;
}

.btn-primary:hover {
  background: rgba(79, 195, 247, 0.9);
  box-shadow: 0 0 20px rgba(79, 195, 247, 0.8),
              0 0 40px rgba(79, 195, 247, 0.4);
}
```

**Usage:** "Begin Your Journey", "Enroll Now", "Get Started"

---

#### Secondary CTA (20% of buttons)
```css
.btn-secondary {
  background: #5dd6ae;        /* Solid jade */
  color: #000000;             /* Black text */
  border: 1px solid #5dd6ae;
}

.btn-secondary:hover {
  background: rgba(93, 214, 174, 0.9);
  box-shadow: 0 0 20px rgba(93, 214, 174, 0.6),
              0 0 40px rgba(93, 214, 174, 0.3);
}
```

**Usage:** "Learn More", "View All Courses", "Download Guide"

---

#### Tertiary/Ghost CTA (10% of buttons)
```css
.btn-tertiary {
  background: rgba(255, 255, 255, 0.2);  /* 20% white - visible */
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.btn-tertiary:hover {
  background: rgba(255, 255, 255, 0.3);
}
```

**Usage:** "Cancel", "Go Back", "Skip"

---

**❌ CRITICAL RULE:** Never use semi-transparent base states below 20% opacity
```css
/* WRONG - Hard to see over black */
background: rgba(79, 195, 247, 0.1);   /* 10% - invisible */
background: rgba(255, 255, 255, 0.08); /* 8% - nearly invisible */

/* CORRECT - Always visible */
background: #4fc3f7;                    /* Solid */
background: rgba(255, 255, 255, 0.2);  /* 20% minimum */
```

---

### 3. Icon Color Rules

#### Default Icons
```css
.icon-default {
  color: #a1a1aa; /* zinc-400 - neutral gray */
}
```

#### Interactive Icons
```css
.icon-interactive {
  color: #a1a1aa;              /* Default: zinc-400 */
  transition: color 300ms ease;
}

.icon-interactive:hover {
  color: #4fc3f7;              /* Hover: ocean blue ONLY */
}
```

#### Category Icons (ONLY if semantically meaningful)
```css
/* The Five Bodies - Show colors PROGRESSIVELY, not simultaneously */
.mental-body-icon    { color: #4fc3f7; } /* Ocean Blue */
.emotional-body-icon { color: #ba68c8; } /* Plum */
.physical-body-icon  { color: #5dd6ae; } /* Jade */
.energetic-body-icon { color: #f2cc8f; } /* Gold */
.spiritual-body-icon { color: #fafafa; } /* White/Zinc-100 */
```

**❌ CRITICAL:** Never show all 5 body colors simultaneously. Reveal them progressively as user scrolls/explores.

---

### 4. Typography Color Hierarchy

```css
/* H1/Hero Text */
h1 { color: #ffffff; }  /* zinc-50 */

/* H2/Section Headers */
h2 { color: #e4e4e7; }  /* zinc-200 */

/* H3/Card Headers */
h3 { color: #d4d4d8; }  /* zinc-300 */

/* Body Text */
p { color: #a1a1aa; }   /* zinc-400 */

/* Muted Text */
.text-muted { color: #71717a; }  /* zinc-500 */

/* Accent Text - ONLY Ocean Blue */
.text-accent { color: #4fc3f7; }
```

**Usage for Accent Text:**
- Highlighted words in paragraphs
- Inline links
- Emphasized phrases

**❌ NEVER:** Use Plum, Jade, or Gold for inline text emphasis

---

### 5. Card/Component Accents

#### Default Card (Most cards)
```css
.card-default {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  /* No colored accents */
}
```

#### Featured Card (Maximum 1 per section)
```css
.card-featured {
  border: 1px solid rgba(79, 195, 247, 0.3);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 20px rgba(79, 195, 247, 0.15);
}

.card-featured .icon {
  color: #4fc3f7; /* Ocean Blue icon */
}
```

#### Premium Card (Master tier programs ONLY)
```css
.card-premium {
  border: 1px solid rgba(186, 104, 200, 0.3);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 20px rgba(186, 104, 200, 0.15);
}

.card-premium .icon {
  color: #ba68c8; /* Plum icon */
}
```

---

### 6. Navigation Color Rules

```css
/* Inactive Links */
.nav-link {
  color: #a1a1aa; /* zinc-400 */
}

/* Hover State */
.nav-link:hover {
  color: #4fc3f7; /* Ocean Blue */
}

/* Active/Current Page */
.nav-link.active {
  color: #4fc3f7;             /* Ocean Blue */
  border-bottom: 2px solid #4fc3f7;
}
```

**❌ NEVER:** Use multiple colors in same navigation component

---

### 7. Progress Indicators

```css
/* Circles 1-3: Completed */
.progress-completed {
  background: #5dd6ae;  /* Jade */
  border: 2px solid #5dd6ae;
}

/* Circle 4: Current */
.progress-current {
  background: #4fc3f7;  /* Ocean Blue */
  border: 2px solid #4fc3f7;
}

/* Circles 5-8: Future */
.progress-future {
  background: rgba(255, 255, 255, 0.1);  /* Zinc-700 equivalent */
  border: 2px solid #3f3f46;  /* zinc-700 */
}

/* Timeline Connector */
.timeline-connector.completed {
  background: #4fc3f7;  /* Ocean Blue */
}

.timeline-connector.inactive {
  background: #27272a;  /* zinc-800 */
}
```

---

### 8. Exclusion Zones (NEVER Use Color)

These elements should ONLY use the zinc scale (grays):

- ❌ Footer navigation
- ❌ Form labels
- ❌ Breadcrumbs (except current page = ocean blue)
- ❌ Pagination (except active page = ocean blue)
- ❌ Dividers/separators
- ❌ Timestamps
- ❌ Metadata

---

## Page-Specific Implementations

### Landing Page

**✅ Keep:**
- Ocean blue CTAs
- Testimonial cards (neutral)

**❌ Remove:**
- Multiple accent colors in same section
- Sky blue background

**🔧 Revise:**
- Replace sky blue background with subtle ocean blue glow on black
- Limit to max 2 accent colors per viewport (Ocean Blue + ONE other)

---

### Path Page

**✅ Keep:**
- Three framework cards can each have ONE color:
  - **The View:** Ocean Blue
  - **The Compass:** Jade
  - **The Ground:** White/neutral (NOT plum)

**❌ Remove:**
- Rainbow of colors in Five Bodies icons (show progressively on interaction)

**🔧 Revise:**
- Use neutral icons by default
- Reveal colors on hover/scroll
- Circle progression: Completed (Jade), Current (Ocean Blue), Future (Zinc-700)

---

### Journey/Program Page

**✅ Keep:**
- Tiered program structure

**🔧 Revise:** Color assignment by tier level ONLY

```css
/* Start Here (£47) */
.tier-start .icon { color: #4fc3f7; }  /* Ocean Blue */

/* Transform (£497) */
.tier-transform .icon { color: #5dd6ae; }  /* Jade */

/* Deepen (£497-597) */
.tier-deepen .icon { color: #ffffff; }  /* Neutral/White */

/* Master (£997-5,997) */
.tier-master .icon { color: #ba68c8; }  /* Plum - premium indicator */
```

**❌ Remove:**
- Decorative color variety in cards

**✅ Add:**
- Subtle background gradient using tier color at 5% opacity

---

## Utility Classes Reference

### Buttons
```css
.btn-primary      /* Ocean Blue solid - 70% usage */
.btn-secondary    /* Jade solid - 20% usage */
.btn-tertiary     /* Ghost/outline - 10% usage */
```

### Cards
```css
.card-default     /* Most cards - neutral */
.card-featured    /* Max 1 per section - ocean blue */
.card-premium     /* Master tier only - plum */
```

### Icons
```css
.icon-default         /* Zinc-400 neutral */
.icon-interactive     /* Zinc-400 → Ocean Blue on hover */
```

### Typography
```css
.text-hero                /* H1 - zinc-50 */
.text-heading-primary     /* H2 - zinc-200 */
.text-heading-secondary   /* H3 - zinc-300 */
.text-body                /* Body - zinc-400 */
.text-muted               /* Muted - zinc-500 */
.text-accent              /* Ocean Blue accent */
```

### Progress
```css
.progress-completed  /* Jade */
.progress-current    /* Ocean Blue */
.progress-future     /* Zinc-700 */
```

### Effects
```css
.glow-ocean-blue  /* Ocean blue glow effect */
.glow-jade        /* Jade glow effect */
.glow-plum        /* Plum glow effect */
.glow-gold        /* Gold glow effect */
```

---

## Testing Checklist

Before approving any design, verify:

- [ ] Can you see a clear visual hierarchy at 6-foot distance?
- [ ] Is Ocean Blue the dominant accent (70%+ of colored elements)?
- [ ] Are there fewer than 3 accent colors per viewport?
- [ ] Do colors have functional meaning, not just decoration?
- [ ] Would the page work in grayscale (hierarchy test)?
- [ ] Is the design calmer, more sophisticated than before?
- [ ] Are buttons visible with solid backgrounds (no opacity < 20%)?
- [ ] Are icons neutral (zinc-400) by default?
- [ ] Is black (#000000) the primary background?

---

## Implementation Priority

### Phase 1: Immediate (Week 1)
1. ✅ Update Tailwind CSS configuration with utility classes
2. Reduce all buttons to Ocean Blue + Ghost variants only
3. Update Navigation component to follow color rules

### Phase 2: Core Pages (Week 2)
1. Refactor landing page to follow color hierarchy
2. Refactor Path page to follow color hierarchy
3. Refactor Program/Journey page to follow color hierarchy

### Phase 3: Components (Week 3)
1. Convert all icons to zinc-400 default, Ocean Blue hover
2. Implement tiered color system for cards/programs
3. Update shared Kaishin components

### Phase 4: Audit & Polish (Week 4)
1. Audit and remove decorative color usage
2. Add subtle glow effects to replace flat color blocks
3. Member portal pages audit for consistency

---

## Quick Reference: Do's and Don'ts

### ✅ DO:
- Use Ocean Blue for 70-80% of accent applications
- Use solid backgrounds for buttons (100% or ≥20% opacity)
- Limit to 2-3 accent colors per viewport
- Use Plum ONLY for Master tier/premium indicators
- Use Gold ONLY for trust signals and guarantees
- Default icons to zinc-400, hover to Ocean Blue
- Keep black (#000000) as 90% of backgrounds

### ❌ DON'T:
- Use all 4 accent colors on the same page
- Create buttons with <20% opacity backgrounds
- Use Plum or Gold for standard UI elements
- Show all Five Bodies colors simultaneously
- Use sky blue or other bright backgrounds
- Add colored accents to footer, breadcrumbs, or metadata
- Use accent colors decoratively without semantic meaning

---

## Philosophy

> "Color is a voice—use it like a whisper, not a shout. Every accent color should earn its place by communicating meaning, not just filling space."

This strategy creates:
- **Visual clarity** through consistent hierarchy
- **Brand recognition** through Ocean Blue dominance
- **Sophisticated restraint** expected of premium wellness
- **Functional communication** where color = meaning

---

## Support

For questions or clarifications about this color strategy:
1. Reference this guide first
2. Test against the Testing Checklist
3. Follow the 80/10/5/5 Rule
4. When in doubt, use Ocean Blue

**Last Updated:** 2025-10-02
**Version:** 1.0
