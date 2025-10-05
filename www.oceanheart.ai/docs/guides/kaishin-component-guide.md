# Kaishin Method Component Usage Guide

Quick reference for using the Kaishin Method components.

## Import Components

```tsx
import {
  PillarIcon,
  PillarBadge,
  CircleProgress,
  CircleBadge,
  FiveBodiesVisualizer,
  BodyBadge,
  CourseCard,
  CourseGrid,
} from "@/components/kaishin";
```

---

## 1. Pillar Components

### PillarIcon

Display pillar symbols (View, Compass, Ground)

```tsx
<PillarIcon pillar="view" size={24} />
<PillarIcon pillar="compass" size={32} />
<PillarIcon pillar="ground" size={48} />
```

**Pillar Colors:**

- `view` → Ocean Blue (#4a90a4)
- `compass` → Jade (#557b6e)
- `ground` → Plum (#8b5a7e)

### PillarBadge

Display pillar as a badge with label

```tsx
<PillarBadge pillar="view" showLabel={true} />
<PillarBadge pillar="compass" showLabel={false} />
```

---

## 2. Circle Progress Components

### CircleProgress

Show user's mastery progression through 8 circles

```tsx
<CircleProgress
  currentCircle={3}
  totalCircles={8}
  size="md"
  showLabels={true}
/>
```

**Sizes:** `sm`, `md`, `lg`

**Circle Names:**

- 0: Foundation
- 1: Guided Practice
- 2: Independence
- 3: Internalization (90-day goal)
- 4: Optimization
- 5: Integration
- 6: Subtle Mastery
- 7: Effortless Being
- 8: Embodied Wisdom

### CircleBadge

Simple circle indicator

```tsx
<CircleBadge circle={3} />
```

---

## 3. Five Bodies Visualizer

### FiveBodiesVisualizer

Display development across all 5 bodies

```tsx
<FiveBodiesVisualizer
  progress={{
    mental: 75,
    emotional: 60,
    physical: 80,
    energetic: 55,
    spiritual: 70,
  }}
  layout="bars" // or "radial"
  size="md"
  showLabels={true}
/>
```

**Body Colors:**

- `mental` → Ocean Blue (#4a90a4)
- `emotional` → Jade (#557b6e)
- `physical` → Plum (#8b5a7e)
- `energetic` → Gold (#c9a961)
- `spiritual` → Rust (#a65d5d)

### BodyBadge

Simple body indicator

```tsx
<BodyBadge body="mental" />
```

---

## 4. Course Card Component

### CourseCard

Display course with tier-based styling

```tsx
<CourseCard
  id="integrated-path-foundations"
  title="The Integrated Path - Foundations"
  tagline="View, Compass, Ground: A Complete Framework for Lasting Transformation"
  pillars={["view", "compass", "ground"]}
  duration="8 weeks"
  format="Self-paced + Live Q&A"
  price="£97"
  tier={1}
  difficulty="Beginner"
  students={250}
  imageGradient="linear-gradient(135deg, var(--ocean-blue) 0%, var(--jade) 100%)"
  isEnrolled={false}
  progress={0}
/>
```

**Tier Colors:**

- Tier 1 (Foundations): Jade (#557b6e)
- Tier 2 (Deepening): Ocean Blue (#4a90a4)
- Tier 3 (Mastery): Plum (#8b5a7e)
- Tier 4 (Certification): Gold (#c9a961)

### CourseGrid

Container for course cards

```tsx
<CourseGrid>
  <CourseCard {...course1Props} />
  <CourseCard {...course2Props} />
  <CourseCard {...course3Props} />
</CourseGrid>
```

---

## 5. Complete Examples

### Dashboard with Circle Progress

```tsx
export default function Dashboard() {
  const userCircle = 3;
  const bodiesProgress = {
    mental: 75,
    emotional: 60,
    physical: 80,
    energetic: 55,
    spiritual: 70,
  };

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-serif mb-6">Your Journey</h2>
        <CircleProgress
          currentCircle={userCircle}
          totalCircles={8}
          size="lg"
          showLabels={true}
        />
      </section>

      <section>
        <h2 className="text-2xl font-serif mb-6">Five Bodies Development</h2>
        <FiveBodiesVisualizer
          progress={bodiesProgress}
          layout="bars"
          size="md"
          showLabels={true}
        />
      </section>
    </div>
  );
}
```

### Course Catalog with All Tiers

```tsx
export default function CoursesPage() {
  const tier1Courses = [
    {
      id: "integrated-path-foundations",
      title: "The Integrated Path - Foundations",
      tagline: "View, Compass, Ground: A Complete Framework",
      pillars: ["view", "compass", "ground"],
      duration: "8 weeks",
      format: "Self-paced + Live Q&A",
      price: "£97",
      tier: 1,
      difficulty: "Beginner",
      students: 250,
      imageGradient:
        "linear-gradient(135deg, var(--jade) 0%, var(--ocean-blue) 100%)",
    },
    {
      id: "30-day-challenge",
      title: "30-Day Integration Challenge",
      tagline: "Build Unshakable Daily Practice in One Month",
      pillars: ["view", "compass", "ground"],
      duration: "30 days",
      format: "Daily Email + Practice",
      price: "£47",
      tier: 1,
      difficulty: "Beginner",
      students: 500,
      imageGradient:
        "linear-gradient(135deg, var(--ocean-blue) 0%, var(--jade) 100%)",
    },
  ];

  const tier2Courses = [
    {
      id: "ai-human-edge",
      title: "AI & The Human Edge",
      tagline:
        "Thrive in the Age of AI by Developing Irreplaceable Human Capacities",
      pillars: ["view", "compass"],
      duration: "6 weeks",
      format: "Hybrid: Self-paced + Group Sessions",
      price: "£297",
      tier: 2,
      difficulty: "Intermediate",
      students: 150,
      imageGradient:
        "linear-gradient(135deg, var(--ocean-blue) 0%, var(--plum) 100%)",
    },
    {
      id: "view-intensive",
      title: "The View Intensive",
      tagline: "Direct Recognition of Non-Dual Awareness: A 21-Day Immersion",
      pillars: ["view"],
      duration: "3 weeks",
      format: "Intensive Cohort",
      price: "£497",
      tier: 2,
      difficulty: "Intermediate",
      students: 80,
      imageGradient:
        "linear-gradient(135deg, var(--ocean-blue) 0%, var(--gold) 100%)",
    },
  ];

  return (
    <div className="space-y-16">
      <section>
        <h2 className="text-3xl font-serif mb-8">Tier 1: Foundations</h2>
        <CourseGrid>
          {tier1Courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </CourseGrid>
      </section>

      <section>
        <h2 className="text-3xl font-serif mb-8">Tier 2: Deepening</h2>
        <CourseGrid>
          {tier2Courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </CourseGrid>
      </section>
    </div>
  );
}
```

### Course Page with Pillar Indicators

```tsx
export default function CoursePage({ course }) {
  return (
    <div>
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          {course.pillars.map((pillar) => (
            <PillarBadge key={pillar} pillar={pillar} />
          ))}
        </div>
        <h1 className="text-5xl font-serif mb-4">{course.title}</h1>
        <p className="text-xl text-[var(--stone)]">{course.tagline}</p>
      </header>

      {/* Course content */}
    </div>
  );
}
```

---

## Color Variables Reference

Use these CSS variables for consistent theming:

### Background Colors

```css
background: var(--paper); /* #fefdfb - Primary background */
background: var(--mist); /* #f8f7f4 - Secondary background */
background: var(--cloud); /* #e8e6e1 - Tertiary background */
```

### Text Colors

```css
color: var(--ink); /* #1a1a1a - Primary text */
color: var(--stone); /* #6b6966 - Secondary text */
```

### Accent Colors

```css
color: var(--ocean-blue); /* #4a90a4 - Primary brand */
color: var(--plum); /* #8b5a7e - Secondary */
color: var(--jade); /* #557b6e - Tertiary */
color: var(--gold); /* #c9a961 - Highlight */
color: var(--rust); /* #a65d5d - Alert */
```

### Typography

```css
font-family: var(--font-noto-serif); /* Headers */
font-family: var(--font-noto-sans); /* Body text */
font-family: var(--font-noto-serif-jp); /* Kanji */
```

### Spacing

```css
padding: var(--section-padding); /* clamp(40px, 8vw, 150px) */
padding: var(--container-padding); /* clamp(20px, 5vw, 60px) */
gap: var(--space-4); /* 16px */
gap: var(--space-6); /* 24px */
```

### Animation

```css
transition: all 0.4s var(--ease-in-out); /* cubic-bezier(0.23, 1, 0.320, 1) */
```

---

## Responsive Patterns

### Mobile-First Breakpoints

```tsx
// Small devices (mobile)
className = "text-base md:text-lg";

// Medium devices (tablet)
className = "grid-cols-1 md:grid-cols-2";

// Large devices (desktop)
className = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
```

### Container Pattern

```tsx
<div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">{/* Content */}</div>
```

### Section Pattern

```tsx
<section className="py-[var(--section-padding)]">
  <div className="max-w-7xl mx-auto px-[var(--container-padding)]">
    <h2 className="text-3xl font-serif mb-8">Section Title</h2>
    {/* Section content */}
  </div>
</section>
```

---

## Common Patterns

### Card with Hover Effect

```tsx
<div className="group bg-[var(--paper)] border border-[var(--cloud)] p-8 transition-all duration-400 hover:shadow-xl relative">
  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--ocean-blue)] transform scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-400" />
  <div className="relative">{/* Card content */}</div>
</div>
```

### Button Pattern

```tsx
<button className="px-8 py-3 bg-[var(--ocean-blue)] text-[var(--paper)] border-2 border-[var(--ocean-blue)] transition-all duration-400 hover:bg-[var(--plum)] hover:border-[var(--plum)] hover:transform hover:-translate-y-1">
  Click Me
</button>
```

### Text Styles

```tsx
// Heading
<h1 className="font-serif text-[var(--ink)]">Heading</h1>

// Body text
<p className="font-sans text-[var(--ink)]">Body text</p>

// Muted text
<p className="text-[var(--stone)]">Secondary text</p>

// Quote
<blockquote className="text-quote">Quote text</blockquote>
```

---

## Complete Course Data Structure

```tsx
interface Course {
  id: string;
  title: string;
  tagline: string;
  pillars: ("view" | "compass" | "ground")[];
  duration: string;
  format: string;
  price: string;
  tier: 1 | 2 | 3 | 4;
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  students?: number;
  imageGradient?: string;
  isEnrolled?: boolean;
  progress?: number;
}
```

### Gradient Examples

```tsx
// View courses (blue/violet)
imageGradient: "linear-gradient(135deg, var(--ocean-blue) 0%, #8b7dd8 100%)";

// Compass courses (teal/emerald)
imageGradient: "linear-gradient(135deg, var(--jade) 0%, #10b981 100%)";

// Ground courses (earth tones)
imageGradient: "linear-gradient(135deg, var(--plum) 0%, var(--rust) 100%)";

// Integration courses (multi-color)
imageGradient: "linear-gradient(135deg, var(--ocean-blue) 0%, var(--jade) 50%, var(--plum) 100%)";
```

---

This guide provides everything needed to implement the Kaishin Method UI consistently across the platform. All components follow the design system principles: warm, light, spacious, and integrated. 🙏
