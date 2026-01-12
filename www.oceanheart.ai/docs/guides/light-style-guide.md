# New Light Style Guide for Phoenix.OceanHeart.AI

## Document Purpose

This comprehensive style guide defines the complete visual transformation of phoenix.oceanheart.ai from its current dark "Becoming Diamond" aesthetic to Kai's light, Zen-influenced integrated path brand. This guide ensures design coherence across all touchpoints while maintaining the technical excellence of the existing platform.

---

## I. TRANSFORMATION OVERVIEW

### From → To

**COLOR PALETTE:**
- FROM: Pure black (#000000) backgrounds with diamond blue (#4fc3f7) accents
- TO: Light cream/paper backgrounds (#fefdfb, #f8f7f4) with ocean blue primary and plum accents

**TYPOGRAPHY:**
- FROM: Sans-serif only (modern, tech-forward)
- TO: Serif for headers (contemplative, timeless) + Sans-serif for body (readable, clean)

**AESTHETIC:**
- FROM: Dark, intense, pressure-focused, aggressive conversion-optimization
- TO: Light, spacious, calm, invitation-focused, trust-building

**PHILOSOPHY:**
- FROM: Diamond forged under pressure (transformation through force)
- TO: Ocean heart integration (transformation through wholeness)

---

## II. COLOR SYSTEM

### Primary Palette

**Background Colors:**

```css
--paper: #fefdfb;        /* Primary background - warm off-white */
--mist: #f8f7f4;         /* Secondary background - subtle gray-beige */
--cloud: #e8e6e1;        /* Tertiary background - light gray */
--ink: #1a1a1a;          /* Primary text - soft black */
--stone: #6b6966;        /* Secondary text - warm gray */
```

**Accent Colors:**

```css
--ocean-blue: #4a90a4;   /* Primary brand color - calming ocean blue */
--plum: #8b5a7e;         /* Secondary accent - contemplative plum */
--jade: #557b6e;         /* Tertiary accent - grounding green */
--gold: #c9a961;         /* Highlight - warm wisdom */
--rust: #a65d5d;         /* Alert/emphasis - grounded red */
```

**Utility Colors:**

```css
--success: #557b6e;      /* Jade - natural, grounding */
--warning: #c9a961;      /* Gold - attention without alarm */
--error: #a65d5d;        /* Rust - serious but not harsh */
--info: #4a90a4;         /* Ocean blue - calm information */
```

### Color Usage Guidelines

**Backgrounds:**
- Primary page background: `--paper`
- Alternate sections: `--mist` (creates subtle rhythm without harsh contrast)
- Cards/panels: `--paper` on `--mist` backgrounds, `--cloud` on `--paper` backgrounds
- Never use pure white (#ffffff) - always the warm paper tone

**Text:**
- Primary headings: `--ink`
- Body text: `--ink` at 90% opacity or `--stone`
- De-emphasized text: `--stone`
- Links: `--ocean-blue` with hover to `--plum`
- Never use pure black (#000000)

**Accents:**
- Primary actions (buttons, CTAs): `--ocean-blue`
- Hover states: `--plum`
- Icons and decorative elements: `--jade` or `--gold`
- Highlights and emphasis: `--gold`
- Warnings and important notes: `--rust`

**Gradients:**

```css
/* Subtle background gradients */
.gradient-subtle {
  background: linear-gradient(135deg, var(--paper) 0%, var(--mist) 100%);
}

/* Accent gradients for special elements */
.gradient-ocean {
  background: linear-gradient(135deg, var(--ocean-blue) 0%, var(--jade) 100%);
}

.gradient-wisdom {
  background: linear-gradient(135deg, var(--plum) 0%, var(--gold) 100%);
}
```

### Color Psychology Mapping

**Ocean Blue (#4a90a4):**
- Associations: Depth, wisdom, calm, trust, vastness (like the ocean)
- Use for: Primary branding, main CTAs, trust signals, key navigation
- Psychology: Creates sense of spaciousness and clarity

**Plum (#8b5a7e):**
- Associations: Contemplation, integration, depth, spirituality
- Use for: Hover states, secondary emphasis, spiritual content markers
- Psychology: Suggests wisdom without being intimidating

**Jade (#557b6e):**
- Associations: Nature, groundedness, growth, stability
- Use for: Success states, grounding practices, somatic content
- Psychology: Evokes natural balance and health

**Gold (#c9a961):**
- Associations: Illumination, value, wisdom, warmth
- Use for: Highlights, special offers, premium content markers
- Psychology: Suggests worth and insight without gaudiness

---

## III. TYPOGRAPHY SYSTEM

### Font Families

**Primary Fonts:**

```css
/* Headers - Contemplative, timeless */
--font-serif: 'Noto Serif', 'Georgia', 'Times New Roman', serif;

/* Body - Clear, readable */
--font-sans: 'Noto Sans', 'Helvetica Neue', 'Arial', sans-serif;

/* Code/Technical (if needed) */
--font-mono: 'IBM Plex Mono', 'Courier New', monospace;
```

**Rationale:**
- **Noto Serif**: Beautiful, readable serif with excellent character set. Works across languages. Suggests contemplation and timelessness without being stuffy.
- **Noto Sans**: Clean, modern sans-serif that pairs perfectly with Noto Serif. Excellent readability at all sizes.
- Both are Google Fonts (free, reliable, good performance)

**Fallback Strategy:**
Always provide complete fallback chains. System fonts are acceptable if web fonts fail to load.

### Type Scale

**Desktop Scale:**

```css
--text-xs: 0.75rem;      /* 12px - Small labels, legal text */
--text-sm: 0.875rem;     /* 14px - Secondary text, captions */
--text-base: 1rem;       /* 16px - Body text (default) */
--text-lg: 1.125rem;     /* 18px - Emphasized body text */
--text-xl: 1.25rem;      /* 20px - Small headings */
--text-2xl: 1.5rem;      /* 24px - H4 */
--text-3xl: 1.875rem;    /* 30px - H3 */
--text-4xl: 2.25rem;     /* 36px - H2 */
--text-5xl: 3rem;        /* 48px - H1 */
--text-6xl: 3.75rem;     /* 60px - Hero headings */
--text-7xl: 4.5rem;      /* 72px - Special large headings */
```

**Mobile Scale (max-width: 640px):**

```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.375rem;    /* 22px */
--text-3xl: 1.5rem;      /* 24px */
--text-4xl: 1.875rem;    /* 30px */
--text-5xl: 2.25rem;     /* 36px */
--text-6xl: 2.75rem;     /* 44px */
--text-7xl: 3.25rem;     /* 52px */
```

### Typography Hierarchy

**Headings:**

```css
h1, .heading-1 {
  font-family: var(--font-serif);
  font-size: var(--text-5xl);
  font-weight: 300;              /* Light weight for elegance */
  line-height: 1.2;
  letter-spacing: -0.02em;       /* Slight negative tracking for large text */
  color: var(--ink);
}

h2, .heading-2 {
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: 300;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--ink);
}

h3, .heading-3 {
  font-family: var(--font-serif);
  font-size: var(--text-3xl);
  font-weight: 400;              /* Regular weight for smaller headings */
  line-height: 1.4;
  color: var(--ink);
}

h4, .heading-4 {
  font-family: var(--font-sans);  /* Sans for smaller headings */
  font-size: var(--text-xl);
  font-weight: 500;              /* Medium weight */
  line-height: 1.5;
  letter-spacing: 0.02em;        /* Slight positive tracking */
  color: var(--ink);
}
```

**Body Text:**

```css
body, .text-body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 300;              /* Light weight for elegance */
  line-height: 1.8;              /* Generous line height for readability */
  letter-spacing: 0.02em;        /* Slight tracking for breathing room */
  color: var(--ink);
}

.text-body-emphasized {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 300;
  line-height: 1.7;
  color: var(--ink);
}

.text-small {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 300;
  line-height: 1.6;
  color: var(--stone);
}
```

**Special Text Styles:**

```css
.text-quote {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-style: italic;
  font-weight: 300;
  line-height: 1.6;
  color: var(--stone);
}

.text-accent {
  color: var(--ocean-blue);
  font-weight: 400;
}

.text-kanji {
  font-family: 'Noto Serif JP', var(--font-serif);
  color: var(--plum);
  opacity: 0.3;
}
```

### Typography Guidelines

**Readability:**
- Body text: Never smaller than 16px (1rem)
- Line length: 60-75 characters optimal, 45-90 acceptable
- Line height: 1.6-1.8 for body text
- Paragraph spacing: 1.5em between paragraphs

**Hierarchy:**
- Use only 2-3 levels of headings per page
- Maintain consistent vertical rhythm (spacing between elements)
- Ensure sufficient contrast between levels

**Accessibility:**
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- All text must be resizable to 200% without breaking layout
- Never use all-caps for more than a few words (reduces readability)

---

## IV. SPACING SYSTEM

### Base Unit

```css
--spacing-unit: 0.25rem; /* 4px base unit */
```

### Spacing Scale

```css
--space-0: 0;
--space-1: calc(var(--spacing-unit) * 1);   /* 4px */
--space-2: calc(var(--spacing-unit) * 2);   /* 8px */
--space-3: calc(var(--spacing-unit) * 3);   /* 12px */
--space-4: calc(var(--spacing-unit) * 4);   /* 16px */
--space-5: calc(var(--spacing-unit) * 5);   /* 20px */
--space-6: calc(var(--spacing-unit) * 6);   /* 24px */
--space-8: calc(var(--spacing-unit) * 8);   /* 32px */
--space-10: calc(var(--spacing-unit) * 10); /* 40px */
--space-12: calc(var(--spacing-unit) * 12); /* 48px */
--space-16: calc(var(--spacing-unit) * 16); /* 64px */
--space-20: calc(var(--spacing-unit) * 20); /* 80px */
--space-24: calc(var(--spacing-unit) * 24); /* 96px */
--space-32: calc(var(--spacing-unit) * 32); /* 128px */
```

### Responsive Spacing (Fluid)

```css
--section-padding: clamp(40px, 8vw, 150px);
--section-padding-mobile: clamp(20px, 6vw, 60px);
--container-padding: clamp(20px, 5vw, 60px);
--nav-height: 80px;
--nav-height-mobile: 60px;
```

**Usage:**
- Use `clamp()` for responsive spacing that scales smoothly
- Minimum value for mobile, middle value for scaling, maximum for large screens

### Spacing Guidelines

**Component Spacing:**
- Between related elements: `--space-2` to `--space-4`
- Between component sections: `--space-8` to `--space-12`
- Between major sections: `--space-16` to `--space-32`

**Layout Spacing:**
- Page margins: `var(--container-padding)`
- Section padding (vertical): `var(--section-padding)`
- Card padding: `var(--space-6)` to `var(--space-8)`

**Vertical Rhythm:**
- Maintain consistent spacing ratios (1:1.5:2 for small:medium:large)
- Use spacing scale values, not arbitrary numbers
- Consider content density when choosing spacing

---

## V. COMPONENT LIBRARY

### Buttons

**Primary Button (Main CTAs):**

```css
.btn-primary {
  display: inline-block;
  padding: clamp(14px, 3vw, 18px) clamp(30px, 6vw, 50px);
  background: var(--ocean-blue);
  color: var(--paper);
  font-family: var(--font-sans);
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid var(--ocean-blue);
  border-radius: 0;                    /* Sharp corners for clarity */
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);

  /* Subtle shadow for depth */
  box-shadow: 0 2px 8px rgba(74, 144, 164, 0.15);
}

.btn-primary:hover,
.btn-primary:focus {
  background: var(--plum);
  border-color: var(--plum);
  box-shadow: 0 4px 16px rgba(139, 90, 126, 0.25);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Secondary Button (Alternative CTAs):**

```css
.btn-secondary {
  display: inline-block;
  padding: clamp(14px, 3vw, 18px) clamp(30px, 6vw, 50px);
  background: transparent;
  color: var(--ocean-blue);
  font-family: var(--font-sans);
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid var(--ocean-blue);
  border-radius: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
}

.btn-secondary:hover,
.btn-secondary:focus {
  background: var(--ocean-blue);
  color: var(--paper);
  box-shadow: 0 2px 8px rgba(74, 144, 164, 0.15);
}
```

**Tertiary Button (Text-like CTAs):**

```css
.btn-tertiary {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: transparent;
  color: var(--ocean-blue);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 400;
  text-decoration: none;
  border: none;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.btn-tertiary:hover,
.btn-tertiary:focus {
  border-bottom-color: var(--ocean-blue);
}
```

### Cards

**Standard Card:**

```css
.card {
  background: var(--paper);
  border: 1px solid var(--cloud);
  padding: var(--space-8);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  position: relative;
  overflow: hidden;
}

/* Subtle accent border on left */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--ocean-blue);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.320, 1);
}

.card:hover::before {
  transform: scaleY(1);
}

.card:hover {
  transform: translateX(10px);
  box-shadow: -10px 0 30px rgba(74, 144, 164, 0.1);
}
```

**Elevated Card (for special content):**

```css
.card-elevated {
  background: var(--paper);
  border: 1px solid var(--cloud);
  padding: var(--space-8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
}

.card-elevated:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}
```

### Forms

**Input Fields:**

```css
.input-field {
  width: 100%;
  padding: var(--space-4) var(--space-5);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 300;
  color: var(--ink);
  background: var(--paper);
  border: 2px solid var(--cloud);
  border-radius: 0;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--ocean-blue);
  box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.1);
}

.input-field::placeholder {
  color: var(--stone);
  opacity: 0.6;
}
```

**Textarea:**

```css
.textarea {
  width: 100%;
  min-height: 120px;
  padding: var(--space-4) var(--space-5);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 300;
  line-height: 1.6;
  color: var(--ink);
  background: var(--paper);
  border: 2px solid var(--cloud);
  border-radius: 0;
  resize: vertical;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.textarea:focus {
  outline: none;
  border-color: var(--ocean-blue);
  box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.1);
}
```

**Labels:**

```css
.form-label {
  display: block;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: var(--space-2);
}
```

### Navigation

**Top Navigation Bar:**

```css
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, var(--paper) 70%, transparent);
  padding: clamp(15px, 4vw, 30px) clamp(20px, 5vw, 60px);
  z-index: 100;
  backdrop-filter: blur(10px);
  height: var(--nav-height);
  border-bottom: 1px solid rgba(107, 105, 102, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
```

**Logo:**

```css
.logo {
  font-family: var(--font-serif);
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 300;
  color: var(--ink);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 15px);
}

.logo-kanji {
  font-size: clamp(1.4rem, 3.5vw, 1.8rem);
  color: var(--ocean-blue);
}
```

**Nav Links:**

```css
.nav-links {
  display: flex;
  gap: clamp(20px, 4vw, 40px);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: var(--stone);
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  letter-spacing: 0.05em;
  position: relative;
  transition: color 0.4s ease;
  white-space: nowrap;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--ocean-blue);
  transition: width 0.4s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a:hover {
  color: var(--ink);
}
```

---

## VI. LAYOUT PATTERNS

### Grid System

**Container:**

```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.container-narrow {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.container-wide {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
```

**Section Spacing:**

```css
.section {
  padding: var(--section-padding) 0;
}

.section-mist {
  background: var(--mist);
}

.section-paper {
  background: var(--paper);
}
```

**Two-Column Layout (Story Pattern):**

```css
.story-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: clamp(40px, 8vw, 80px);
  align-items: center;
}

.story-container.reverse {
  grid-template-columns: 2fr 1fr;
}

/* Mobile */
@media (max-width: 767px) {
  .story-container,
  .story-container.reverse {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
}
```

**Three-Column Grid (Features/Pillars):**

```css
.pillars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(30px, 6vw, 40px);
}
```

### Vertical Rhythm

**Consistent Spacing:**

```css
/* Elements flow with consistent spacing */
.content-flow > * + * {
  margin-top: var(--space-6);
}

.content-flow > h2 + *,
.content-flow > h3 + * {
  margin-top: var(--space-4);
}

.content-flow > * + h2 {
  margin-top: var(--space-12);
}

.content-flow > * + h3 {
  margin-top: var(--space-8);
}
```

---

## VII. DECORATIVE ELEMENTS

### Bamboo Pattern (Subtle Background Texture)

```css
.bamboo-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.02;
  pointer-events: none;
  z-index: -1;
  background-image: repeating-linear-gradient(
    90deg,
    var(--ink) 0px,
    var(--ink) 1px,
    transparent 1px,
    transparent 80px
  );
}
```

### Gradient Overlays

```css
.gradient-overlay {
  background: radial-gradient(
    circle at 20% 80%,
    var(--cloud) 0%,
    transparent 50%
  ),
  radial-gradient(
    circle at 80% 20%,
    var(--mist) 0%,
    transparent 50%
  );
  opacity: 0.4;
  pointer-events: none;
}
```

### Vertical Kanji Markers

```css
.story-title-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Noto Serif JP', var(--font-serif);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var(--plum);
  letter-spacing: clamp(0.2em, 0.5vw, 0.5em);
  margin: 0 auto;
  opacity: 0.8;
}

/* Mobile - horizontal instead */
@media (max-width: 767px) {
  .story-title-vertical {
    writing-mode: horizontal-tb;
    text-align: center;
    font-size: clamp(1.5rem, 4vw, 2rem);
    letter-spacing: 0.2em;
  }
}
```

### Accent Lines

```css
.accent-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--ocean-blue) 50%,
    transparent 100%
  );
  opacity: 0.3;
}

.accent-line-vertical {
  width: 4px;
  height: 100%;
  background: var(--ocean-blue);
  opacity: 0.6;
}
```

---

## VIII. ANIMATION & INTERACTION

### Animation Principles

**Guidelines:**
- Animations should feel natural and organic, not mechanical
- Use easing functions that mirror natural movement
- Keep animations subtle - they enhance, not dominate
- Duration: 0.3s-0.6s for most interactions, up to 1s for reveals
- Provide reduced motion alternatives for accessibility

### Standard Easing Functions

```css
--ease-in-out: cubic-bezier(0.23, 1, 0.320, 1);    /* Smooth, natural */
--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);     /* Deceleration */
--ease-in: cubic-bezier(0.4, 0, 1, 1);             /* Acceleration */
```

### Scroll-Based Reveals

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s var(--ease-in-out);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

### Hover States

**Gentle Lift:**

```css
.hover-lift {
  transition: transform 0.4s var(--ease-in-out), box-shadow 0.4s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
```

**Color Shift:**

```css
.hover-color {
  color: var(--stone);
  transition: color 0.3s ease;
}

.hover-color:hover {
  color: var(--ocean-blue);
}
```

### Loading States

```css
.loading-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## IX. RESPONSIVE DESIGN STRATEGY

### Breakpoints

```css
/* Mobile-first approach */
--breakpoint-sm: 640px;   /* Small tablets portrait */
--breakpoint-md: 768px;   /* Tablets portrait */
--breakpoint-lg: 1024px;  /* Tablets landscape, small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large desktops */
```

### Mobile-First CSS

```css
/* Base styles for mobile */
.responsive-heading {
  font-size: var(--text-3xl);
  margin-bottom: var(--space-4);
}

/* Tablet and up */
@media (min-width: 768px) {
  .responsive-heading {
    font-size: var(--text-4xl);
    margin-bottom: var(--space-6);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .responsive-heading {
    font-size: var(--text-5xl);
    margin-bottom: var(--space-8);
  }
}
```

### Touch Targets

**Minimum sizes for interactive elements:**

```css
.touch-target {
  min-height: 44px;  /* iOS recommendation */
  min-width: 44px;
  padding: var(--space-3) var(--space-4);
}
```

### Mobile Navigation Pattern

```css
/* Mobile menu toggle */
.mobile-menu-toggle {
  display: none;
}

@media (max-width: 767px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .mobile-menu-toggle span {
    width: 24px;
    height: 2px;
    background: var(--ink);
    border-radius: 3px;
    transition: all 0.3s linear;
  }
}
```

---

## X. ACCESSIBILITY GUIDELINES

### Color Contrast

**WCAG AA Requirements (minimum):**
- Normal text (under 18pt): 4.5:1
- Large text (18pt+): 3:1
- UI components and graphics: 3:1

**Current Palette Compliance:**

✓ Paper (#fefdfb) + Ink (#1a1a1a): 14.2:1 (AAA)
✓ Paper (#fefdfb) + Stone (#6b6966): 5.1:1 (AA)
✓ Paper (#fefdfb) + Ocean Blue (#4a90a4): 4.7:1 (AA)
✓ Paper (#fefdfb) + Plum (#8b5a7e): 5.8:1 (AA)

**Testing:**
Always test color combinations with WebAIM Contrast Checker before implementation.

### Focus States

```css
/* Visible focus indicators */
*:focus-visible {
  outline: 2px solid var(--ocean-blue);
  outline-offset: 2px;
}

/* Remove default outline only when using custom */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### Screen Reader Support

**Semantic HTML:**
- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- Use `<button>` for buttons, `<a>` for links
- Provide alt text for all images
- Use `aria-label` for icon-only buttons

**Skip Links:**

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--ocean-blue);
  color: var(--paper);
  padding: var(--space-2) var(--space-4);
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}
</style>
```

### Reduced Motion

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## XI. IMAGE GUIDELINES

### Photography Style

**Characteristics:**
- Natural lighting (soft, not harsh)
- Warm tones that complement the paper background
- Spacious compositions (not cluttered)
- Calm, contemplative mood
- Nature-inspired where possible (ocean, trees, mountains, sky)
- Human subjects showing presence, not performance

**Avoid:**
- Harsh shadows and high contrast
- Stock photo artificiality
- Busy, chaotic compositions
- Cool-toned or overly saturated images
- Corporate/sterile environments

### Image Treatment

**Subtle Overlay:**

```css
.image-container {
  position: relative;
  overflow: hidden;
}

.image-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(254, 253, 251, 0.3) 100%
  );
  pointer-events: none;
}
```

**Aspect Ratios:**
- Hero images: 21:9 (cinematic) or 16:9 (standard)
- Portrait images: 4:5 or 3:4
- Square thumbnails: 1:1
- Card images: 16:9 or 4:3

### Icons

**Style:**
- Line icons, not filled
- 2px stroke weight
- Rounded line caps
- Ocean blue color (`--ocean-blue`)
- 24px × 24px standard size
- Scale proportionally for larger/smaller uses

**Icon Library:**
Tabler Icons or similar minimal, line-based icon sets

---

## XII. IMPLEMENTATION CHECKLIST

### Phase 1: Foundation Setup

- [ ] Install fonts (Noto Serif, Noto Sans, Noto Serif JP)
- [ ] Define CSS custom properties for colors
- [ ] Define CSS custom properties for spacing
- [ ] Define CSS custom properties for typography
- [ ] Set up responsive breakpoints
- [ ] Create base reset/normalize styles

### Phase 2: Core Components

- [ ] Implement button variants (primary, secondary, tertiary)
- [ ] Implement form elements (inputs, textarea, labels, checkboxes)
- [ ] Implement card variants
- [ ] Implement navigation (desktop and mobile)
- [ ] Implement footer

### Phase 3: Layout Patterns

- [ ] Set up container classes
- [ ] Implement section spacing system
- [ ] Create grid layouts (2-col, 3-col, flexible)
- [ ] Implement vertical rhythm utilities
- [ ] Add responsive patterns for all layouts

### Phase 4: Decorative Elements

- [ ] Add bamboo pattern background
- [ ] Implement gradient overlays
- [ ] Create vertical kanji styling
- [ ] Add accent lines and dividers
- [ ] Implement subtle shadows and depth

### Phase 5: Animation & Interaction

- [ ] Implement scroll-based reveals
- [ ] Add hover states for all interactive elements
- [ ] Create loading states
- [ ] Test all animations with reduced motion setting
- [ ] Ensure smooth performance (60fps)

### Phase 6: Content Pages

- [ ] Transform homepage to light theme
- [ ] Update about page
- [ ] Redesign course/offering pages
- [ ] Update members area (if applicable)
- [ ] Create blog/resource templates (if applicable)

### Phase 7: Quality Assurance

- [ ] Test color contrast ratios (WCAG AA minimum)
- [ ] Test with screen readers
- [ ] Test keyboard navigation
- [ ] Test on multiple devices (phone, tablet, desktop)
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Validate HTML and CSS
- [ ] Check performance (Lighthouse score)
- [ ] Ensure all images have alt text
- [ ] Test with reduced motion preferences
- [ ] Get feedback from diverse users

---

## XIII. BRAND ASSETS

### Logo Specifications

**Primary Logo:**
- Kanji character: 海 (Ocean) or 心 (Heart/Mind)
- Typeface: Noto Serif JP
- Color: Ocean Blue (#4a90a4) for kanji
- Wordmark: "Kai" in Noto Serif, Ink (#1a1a1a)
- Spacing: 0.5em between kanji and wordmark

**Logo Variations:**
- Full logo (kanji + wordmark)
- Kanji only (for small spaces, app icons)
- Wordmark only (for text-heavy contexts)

**Clear Space:**
Minimum clear space around logo = height of the kanji character

**Minimum Sizes:**
- Digital: 24px height minimum
- Print: 0.5 inch height minimum

### Brand Patterns

**The Wave Pattern (optional decorative element):**

```css
.wave-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 5, 50 10 T 100 10' stroke='%234a90a4' stroke-width='1' fill='none' opacity='0.3'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  background-position: bottom;
  background-size: 100px 20px;
}
```

**The Zen Circle (Enso) - Use sparingly:**

Circular brushstroke element in plum color, used as:
- Section dividers
- Background watermark
- Loading indicator
- Decorative accent

```css
.enso {
  width: 200px;
  height: 200px;
  border: 4px solid var(--plum);
  border-radius: 50%;
  opacity: 0.15;
  /* Slightly imperfect circle - hand-drawn feel */
  border-top-left-radius: 48% 52%;
  border-top-right-radius: 52% 48%;
  border-bottom-right-radius: 48% 52%;
  border-bottom-left-radius: 52% 48%;
}
```

---

## XIV. VOICE & MESSAGING ALIGNMENT

### Visual-Verbal Coherence

The visual design must support the verbal messaging:

**Philosophy → Design:**
- Integration (View + Compass + Ground) → Cohesive visual system with three complementary accent colors
- Spaciousness/Awareness → Generous whitespace, breathing room
- Embodiment → Warm, touchable colors (not cold tech)
- Wisdom → Serif fonts, timeless aesthetic
- Accessibility → Clear hierarchy, high contrast, simple navigation

**Tone → Typography:**
- Calm, centered → Light font weights, generous line height
- Clear, direct → Sans-serif for body text
- Contemplative → Serif for headings
- Professional → Consistent spacing, clean layouts
- Approachable → Warm colors, soft shadows

**Audience → Aesthetic:**
- Educated seekers → Sophisticated without pretension
- Tech-aware → Modern without being trendy
- Psychology-minded → Scientific clarity with aesthetic beauty
- Spiritual practitioners → Zen influence without cliché

---

## XV. EXAMPLES OF KEY PAGES

### Homepage Hero Section

```html
<section class="hero">
  <div class="bamboo-pattern"></div>
  <div class="gradient-overlay"></div>

  <div class="hero-content container-narrow">
    <span class="hero-kanji">心</span>

    <h1>The Path Beyond Self-Improvement:<br>When Understanding Isn't Enough</h1>

    <p class="hero-subtitle">
      An integrated framework for those who've exhausted the maps of personal
      development and are ready for embodied transformation.
    </p>

    <div class="hero-cta">
      <a href="#framework" class="btn-primary">Explore the Integration</a>
      <a href="#story" class="btn-secondary">Read Kai's Story</a>
    </div>
  </div>
</section>
```

**Styling:**

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--section-padding);
  position: relative;
  background: linear-gradient(135deg, var(--paper) 0%, var(--mist) 100%);
}

.hero-kanji {
  font-family: 'Noto Serif JP', var(--font-serif);
  font-size: clamp(3rem, 8vw, 6rem);
  color: var(--cloud);
  position: absolute;
  top: clamp(-40px, -8vw, -80px);
  right: clamp(-20px, -4vw, -40px);
  opacity: 0.3;
  z-index: 0;
}

.hero-subtitle {
  font-size: clamp(1rem, 3vw, 1.3rem);
  color: var(--stone);
  max-width: 700px;
  margin: 0 auto var(--space-12);
  line-height: 1.6;
  font-style: italic;
}

.hero-cta {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}
```

### Three-Pillar Framework Section

```html
<section class="framework section section-paper" id="framework">
  <div class="framework-container container">
    <div class="section-header">
      <h2>The Integrated Framework</h2>
      <p>View, Compass, and Ground. A complete method for lasting transformation.</p>
    </div>

    <div class="pillars">
      <div class="pillar">
        <div class="pillar-label">The View</div>
        <h3>Zen & Non-Duality</h3>
        <p>The practice of seeing what is already here. We shift our identity from
        the content of experience to the silent, aware context in which it arises.</p>
      </div>

      <div class="pillar">
        <div class="pillar-label">The Compass</div>
        <h3>Acceptance & Commitment (ACT)</h3>
        <p>The science-backed skills for a meaningful life. We learn to unhook from
        difficult thoughts, clarify our values, and take committed action.</p>
      </div>

      <div class="pillar">
        <div class="pillar-label">The Ground</div>
        <h3>Somatic Work</h3>
        <p>The practice of coming home to the body. We release stored tension from
        the nervous system, building capacity to handle life.</p>
      </div>
    </div>
  </div>
</section>
```

**Styling:**

```css
.pillar {
  padding: var(--space-10) var(--space-8);
  background: var(--mist);
  border: 1px solid var(--cloud);
  transition: all 0.4s var(--ease-in-out);
  position: relative;
  overflow: hidden;
}

.pillar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--ocean-blue);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s var(--ease-in-out);
}

.pillar:hover::before {
  transform: scaleY(1);
}

.pillar:hover {
  transform: translateX(10px);
  box-shadow: -10px 0 30px rgba(74, 144, 164, 0.15);
}

.pillar-label {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  color: var(--ocean-blue);
  margin-bottom: var(--space-4);
  font-weight: 300;
}

.pillar h3 {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  color: var(--ink);
  margin-bottom: var(--space-4);
  font-weight: 400;
}

.pillar p {
  color: var(--stone);
  line-height: 1.6;
  font-size: var(--text-base);
}
```

---

## XVI. FINAL NOTES

### Design Philosophy

This style guide embodies the integration it represents:
- **The View** (contemplative wisdom) = Zen-minimalist aesthetic, spacious design
- **The Compass** (psychological clarity) = Clear hierarchy, accessible navigation
- **The Ground** (embodied practice) = Warm, touchable colors and textures

### Flexibility Within System

While this guide provides comprehensive specifications:
- Use judgment based on specific contexts
- Adapt patterns for unique content needs
- Maintain the spirit of the system even when deviating
- Document any significant variations

### Continuous Improvement

This is a living document:
- Test designs with real users
- Gather feedback continuously
- Refine based on analytics and user behavior
- Update the guide as patterns emerge
- Maintain coherence as the system evolves

### Success Metrics

The design succeeds when:
- Users describe the experience as "calm," "clear," and "trustworthy"
- Accessibility scores meet or exceed WCAG AA standards
- Conversion rates improve (with ethical, pressure-free CTAs)
- Users can easily navigate and find what they need
- The aesthetic authentically represents Kai's integrated path

---

**This style guide provides the complete visual framework for transforming phoenix.oceanheart.ai into Kai's integrated path website. Combined with the first principles analysis, new copy generation, and conversion tasklist, it enables a comprehensive transformation that maintains technical excellence while embodying authentic wisdom.**
