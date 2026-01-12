# Courses Page Implementation Guide

## Based on Refined Strategy (v2.0)

This guide shows how to implement the courses page in `/src/app/app/courses/page.tsx` following the refined business strategy from `course-generation-reframe.md`.

---

## PAGE STRUCTURE

### Hero Section
```tsx
<section className="courses-hero">
  <h1>Your Path to Mastery</h1>
  <p>From 30-day challenge to complete transformation.
     Choose your starting point.</p>
</section>
```

### Tier Organization

The page should be organized into clear tiers with visual hierarchy:

1. **Tier 1: The Entry Point** (Featured at top)
2. **Tier 2: The Transformation** (Main focus)
3. **Tier 3: Mastery & Specialization** (For advanced students)
4. **Tier 4: Certification** (Professional path)
5. **Community & Micro-Offers** (Ongoing support)

---

## TIER 1: THE ENTRY POINT

### Featured Spotlight Card

The 30-Day Challenge should be prominently featured at the top as the recommended starting point.

```tsx
<section className="tier-1-featured">
  <div className="featured-badge">RECOMMENDED START HERE</div>

  <CourseCard
    title="The 30-Day Integration Challenge"
    tagline="Build Your Unshakable Daily Practice in Just 15 Minutes a Day"
    pillars={['view', 'compass', 'ground']}
    duration="30 days"
    format="Daily emails + audio practices"
    price="£47"
    tier={1}
    featured={true}
    imageGradient="linear-gradient(135deg, var(--ocean-blue) 0%, var(--jade) 100%)"
    highlights={[
      "Days 1-10: The Ground (Somatic foundation)",
      "Days 11-20: The Compass (Psychological clarity)",
      "Days 21-30: The View (Spiritual recognition)",
      "Achieve Circle 1 mastery across all three pillars"
    ]}
    outcomes={[
      "Build consistent daily practice",
      "Experience the power of integration",
      "Perfect preparation for 90-Day Transformation"
    ]}
    cta="Start Your 30-Day Challenge"
  />
</section>
```

**Design Notes:**
- Larger card size (take full width or 2/3 width)
- "Recommended" or "Start Here" badge
- Visual emphasis (subtle glow or elevated shadow)
- Ocean blue → Jade gradient background
- Clear progression arrows pointing to Tier 2

---

## TIER 2: THE TRANSFORMATION

### Section Header
```tsx
<section className="tier-2">
  <div className="tier-header">
    <h2>Tier 2: Deep Transformation</h2>
    <p>Flagship immersion courses for comprehensive mastery</p>
  </div>

  <div className="courses-grid">
    {/* Course cards here */}
  </div>
</section>
```

### Course 1: The 90-Day Transformation (FLAGSHIP)

```tsx
<CourseCard
  title="The 90-Day Transformation"
  tagline="From Overwhelm to Embodied Peace: The Flagship Immersion"
  pillars={['view', 'compass', 'ground']}
  duration="90 days (12 weeks)"
  format="Self-paced + Live calls"
  price="£497"
  priceOptions="3 payments of £177"
  tier={2}
  flagship={true}
  imageGradient="linear-gradient(135deg, var(--plum) 0%, var(--gold) 100%)"
  highlights={[
    "Month 1: Master The Ground (Circle 1)",
    "Month 2: Master The Compass (Circle 2)",
    "Month 3: Master The View (Circle 3)",
    "12 video modules + 90 daily practices",
    "Bi-weekly live calls with Kaishin",
    "Private community + lifetime access"
  ]}
  outcomes={[
    "Regulated nervous system as baseline",
    "Values-aligned decision making",
    "Stable recognition of awareness",
    "Circle 1 → Circle 3 mastery"
  ]}
  prerequisites="30-Day Challenge recommended (not required)"
  cta="Begin Your 90-Day Transformation"
/>
```

**Design Notes:**
- "FLAGSHIP" badge in corner
- Larger card or full-width layout
- Plum → Gold gradient (wisdom/transformation)
- Month-by-month visual breakdown
- Clear circle progression indicator (1 → 2 → 3)

---

### Course 2: AI & The Human Edge

```tsx
<CourseCard
  title="AI & The Human Edge"
  tagline="Thrive in the Age of AI by Mastering the Irreplaceable Human Capacities"
  pillars={['view', 'compass', 'ground']}
  duration="6 weeks"
  format="Hybrid (self-paced + 2 live calls)"
  price="£297"
  tier={2}
  imageGradient="linear-gradient(135deg, var(--ocean-blue) 0%, var(--plum) 100%)"
  highlights={[
    "Understanding AI: Clarity over anxiety",
    "The View in the tech age",
    "The Compass for AI collaboration",
    "The Ground of conscious integration",
    "6 modules + AI tools handbook",
    "2 live Q&A sessions"
  ]}
  outcomes={[
    "Technical AI literacy",
    "Presence under technological pressure",
    "Conscious AI workflow integration",
    "Irreplaceable human capacities developed"
  ]}
  cta="Master AI & The Human Edge"
/>
```

**Design Notes:**
- Ocean blue → Plum gradient (tech + wisdom)
- Tech-forward iconography
- "Unique to Kaishin" badge or indicator

---

### Course 3-5: Pillar Deepening Courses

These are for graduates of the 90-Day Transformation ready for Circles 4-5.

```tsx
<div className="deepening-courses">
  <div className="tier-subheader">
    <h3>Pillar Deepening Courses</h3>
    <p>For 90-Day graduates ready to move into Circles 4 & 5</p>
    <div className="prerequisite-badge">
      Requires: 90-Day Transformation completion
    </div>
  </div>

  <CourseCard
    title="The View Intensive: Awakening to What You Are"
    tagline="21-Day Direct Recognition of Non-Dual Awareness"
    pillars={['view']}
    duration="21 days"
    format="Intensive cohort"
    price="£497"
    tier={2}
    imageGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    highlights={[
      "Week 1: Deconstructing the seeker",
      "Week 2: Direct recognition",
      "Week 3: Living from awakening",
      "Daily practices + weekly live sessions",
      "Limited to 20 participants"
    ]}
    outcomes={[
      "Stable recognition of awareness",
      "Circle 4-5 mastery in The View",
      "Direct transmission experience"
    ]}
    prerequisites="90-Day Transformation (required)"
    cta="Join The View Intensive"
  />

  <CourseCard
    title="The Compass Mastery: ACT for Real Life"
    tagline="Master Acceptance & Commitment Therapy"
    pillars={['compass']}
    duration="8 weeks"
    format="Applied learning cohort"
    price="£497"
    tier={2}
    imageGradient="linear-gradient(135deg, var(--jade) 0%, var(--ocean-blue) 100%)"
    highlights={[
      "All 6 ACT core processes",
      "20+ defusion techniques",
      "Deep values work",
      "Weekly practice sessions",
      "Therapist toolkit included"
    ]}
    outcomes={[
      "Psychological flexibility mastery",
      "Circle 4-5 mastery in The Compass",
      "Professional application skills"
    ]}
    prerequisites="90-Day Transformation (required)"
    cta="Master The Compass"
  />

  <CourseCard
    title="The Ground Awakening: Somatic Mastery"
    tagline="Heal Your Nervous System, Reclaim Your Body"
    pillars={['ground']}
    duration="12 weeks"
    format="Slow & steady cohort"
    price="£597"
    tier={2}
    imageGradient="linear-gradient(135deg, #a8714a 0%, var(--jade) 100%)"
    highlights={[
      "Phase 1: Foundation (Weeks 1-4)",
      "Phase 2: Release (Weeks 5-8)",
      "Phase 3: Integration (Weeks 9-12)",
      "50+ somatic practices",
      "Trauma-informed approach",
      "1-on-1 check-ins included"
    ]}
    outcomes={[
      "Deep nervous system healing",
      "Circle 4-5 mastery in The Ground",
      "Embodied wisdom integration"
    ]}
    prerequisites="90-Day Transformation (required)"
    cta="Awaken The Ground"
  />
</div>
```

**Design Notes:**
- Grouped together visually
- Clear "prerequisite" indicator
- Color-coded by pillar:
  - View: Purple/violet gradients
  - Compass: Teal/blue gradients
  - Ground: Earth tones/green gradients

---

## TIER 3: MASTERY & SPECIALIZATION

### Section Header
```tsx
<section className="tier-3">
  <div className="tier-header">
    <h2>Tier 3: Applied Mastery</h2>
    <p>Bring The Kaishin Method into specific life domains</p>
  </div>

  <div className="courses-grid">
    {/* Applied courses here */}
  </div>
</section>
```

### Applied Integration Courses

```tsx
<CourseCard
  title="Integrated Leadership"
  tagline="Lead with Presence, Navigate with Wisdom, Ground in Values"
  pillars={['view', 'compass', 'ground']}
  duration="8 weeks"
  format="Cohort-based"
  price="£997"
  tier={3}
  imageGradient="linear-gradient(135deg, var(--gold) 0%, var(--plum) 100%)"
  highlights={[
    "The awakened leader",
    "Embodied authority",
    "Team dynamics & culture",
    "Navigating complexity",
    "Sustainability without burnout",
    "Peer cohort (6-8 leaders)"
  ]}
  outcomes={[
    "Presence-based leadership",
    "Values-driven organizations",
    "Sustainable pace mastery"
  ]}
  targetAudience="Executives, managers, entrepreneurs"
  cta="Lead with Integration"
/>

<CourseCard
  title="Integrated Relationships"
  tagline="Bring The Method into Your Intimate Relationships"
  pillars={['view', 'compass', 'ground']}
  duration="6 weeks"
  format="Individual or couple"
  price="£197 (individual) / £297 (couple)"
  tier={3}
  imageGradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  highlights={[
    "The View of relationship",
    "The Compass in communication",
    "The Ground in connection",
    "Working with conflict",
    "Desire and devotion",
    "Partner practice library"
  ]}
  outcomes={[
    "Deeper intimacy and autonomy",
    "Conscious communication",
    "Co-regulation skills"
  ]}
  cta="Transform Your Relationship"
/>

{/* Additional applied courses */}
<CourseCard
  title="Integrated Parenting"
  price="£297"
  tier={3}
/>

<CourseCard
  title="Integrated Creativity"
  price="£297"
  tier={3}
/>

<CourseCard
  title="Grief, Loss & Transformation"
  price="£397"
  tier={3}
/>
```

**Design Notes:**
- Standard card size
- Domain-specific iconography
- Use case-specific color gradients
- Clear target audience labels

---

## TIER 4: CERTIFICATION

### Section Header
```tsx
<section className="tier-4">
  <div className="tier-header">
    <h2>Tier 4: Professional Training</h2>
    <p>Become certified to teach The Kaishin Method</p>
  </div>
</section>
```

### Certification Program

```tsx
<CourseCard
  title="The Kaishin Method Certified Practitioner"
  tagline="Become Certified to Guide Others Using the View, Compass, and Ground Framework"
  pillars={['view', 'compass', 'ground']}
  duration="6 months"
  format="Intensive cohort training"
  price="£5,997"
  tier={4}
  featured={true}
  imageGradient="linear-gradient(135deg, var(--gold) 0%, var(--ocean-blue) 100%)"
  highlights={[
    "Phase 1: Deep personal practice (Circle 5-6 development)",
    "Phase 2: Pedagogy & teaching skills",
    "Phase 3: Supervised practice",
    "60 hours of training",
    "License to teach 30-Day Challenge",
    "Ongoing mentorship & community",
    "Annual recertification pathway"
  ]}
  outcomes={[
    "Circle 6 mastery (Subtle Mastery)",
    "Certified to teach framework",
    "Join teaching lineage",
    "Generate passive licensing revenue"
  ]}
  prerequisites={[
    "90-Day Transformation + 2 Deepening Courses",
    "6+ months personal practice",
    "Application & interview required"
  ]}
  limitedTo="10-15 participants per cohort"
  cta="Apply for Certification"
/>

<CourseCard
  title="AI Integration Specialist Training"
  tagline="Train to Guide Others in Conscious AI Integration"
  pillars={['view', 'compass', 'ground']}
  duration="3 months"
  format="Professional training"
  price="£3,997"
  tier={4}
  imageGradient="linear-gradient(135deg, var(--ocean-blue) 0%, var(--jade) 100%)"
  highlights={[
    "Month 1: AI literacy & psychological impact",
    "Month 2: Industry applications & workflow design",
    "Month 3: Training & facilitation skills",
    "Consulting methodology",
    "Corporate training certification"
  ]}
  outcomes={[
    "AI specialist certification",
    "Corporate consulting skills",
    "Workshop design mastery"
  ]}
  targetAudience="Tech professionals, consultants, coaches, educators"
  cta="Become an AI Specialist"
/>
```

**Design Notes:**
- Premium visual treatment (gold accents, elevation)
- "LIMITED ENROLLMENT" or "APPLICATION REQUIRED" badges
- Professional photography/imagery
- Testimonials from certified practitioners

---

## COMMUNITY & MICRO-OFFERS

### Section Header
```tsx
<section className="ongoing-support">
  <div className="tier-header">
    <h2>Ongoing Support & Micro-Learning</h2>
    <p>Community membership and focused skill-building</p>
  </div>
</section>
```

### Community Membership

```tsx
<CourseCard
  title="The Kaishin Method Community"
  tagline="Ongoing Support, Practice, and Connection for Course Alumni"
  pillars={['view', 'compass', 'ground']}
  duration="Ongoing"
  format="Monthly/Annual membership"
  price="£27/month or £297/year"
  tier="community"
  imageGradient="linear-gradient(135deg, var(--mist) 0%, var(--cloud) 100%)"
  highlights={[
    "Monthly live sessions with Kaishin",
    "Weekly peer-led practice groups",
    "Private forum access",
    "Resource library (expanding)",
    "20% discount on all courses",
    "AI practice companion (community version)"
  ]}
  outcomes={[
    "Ongoing accountability",
    "Continued development",
    "Lifelong practice support"
  ]}
  cta="Join The Community"
/>
```

### Micro-Courses Library

```tsx
<div className="micro-courses">
  <h3>Focused Skills (£27 each)</h3>
  <p className="bundle-offer">Bundle any 5 for £97 (save £38)</p>

  <div className="micro-grid">
    <MicroCourseCard
      title="Somatic Anxiety Release"
      duration="2 hours"
      pillar="ground"
      price="£27"
    />

    <MicroCourseCard
      title="Values Clarification Workshop"
      duration="2 hours"
      pillar="compass"
      price="£27"
    />

    <MicroCourseCard
      title="Introduction to Non-Dual Meditation"
      duration="2 hours"
      pillar="view"
      price="£27"
    />

    <MicroCourseCard
      title="Breathwork for Regulation"
      duration="2 hours"
      pillar="ground"
      price="£27"
    />

    <MicroCourseCard
      title="ACT for Chronic Pain"
      duration="2 hours"
      pillar="compass"
      price="£27"
    />

    <MicroCourseCard
      title="Digital Detox & Tech Boundaries"
      duration="2 hours"
      pillar="compass"
      price="£27"
    />
  </div>
</div>
```

**Design Notes:**
- Smaller card size (4-6 per row)
- Simple, minimal design
- Pillar-color coding
- Bundle pricing prominently displayed

---

## FILTERING & NAVIGATION

### Filter Bar

```tsx
<div className="course-filters">
  <button className="filter-btn active" data-tier="all">
    All Courses
  </button>
  <button className="filter-btn" data-tier="1">
    Entry Point (£47)
  </button>
  <button className="filter-btn" data-tier="2">
    Transformation (£297-597)
  </button>
  <button className="filter-btn" data-tier="3">
    Mastery (£997+)
  </button>
  <button className="filter-btn" data-tier="4">
    Certification (£3,997+)
  </button>
</div>

<div className="pillar-filters">
  <PillarBadge pillar="view" clickable />
  <PillarBadge pillar="compass" clickable />
  <PillarBadge pillar="ground" clickable />
</div>

<div className="sort-options">
  <select>
    <option>Recommended Path</option>
    <option>Price: Low to High</option>
    <option>Price: High to Low</option>
    <option>Duration: Shortest First</option>
    <option>Duration: Longest First</option>
  </select>
</div>
```

---

## CALL-TO-ACTION STRATEGY

### Primary CTAs by Tier

**Tier 1 (30-Day Challenge):**
- "Start Your 30-Day Challenge"
- "Begin with £47"
- "Prove the Method Works"

**Tier 2 (90-Day Transformation):**
- "Begin Your 90-Day Transformation"
- "Achieve Circle 3 Mastery"
- "Transform in 90 Days"

**Tier 2 (Deepening):**
- "Deepen [Pillar Name]"
- "Master [Pillar Name]"
- "Join [Course Name] Cohort"

**Tier 3 (Applied):**
- "[Domain] with Integration"
- "Apply The Method to [Domain]"
- "Transform Your [Domain]"

**Tier 4 (Certification):**
- "Apply for Certification"
- "Become a Certified Practitioner"
- "Join the Teaching Lineage"

---

## RESPONSIVE DESIGN

### Mobile (< 768px)
- Single column layout
- Filters collapse into dropdown menu
- Featured courses stay at top
- Simplified card design (fewer details)
- Sticky CTA bar at bottom

### Tablet (768px - 1024px)
- Two column layout
- Side-scrolling tier sections
- Filter bar stays visible
- Medium card detail level

### Desktop (> 1024px)
- Three column layout (standard cards)
- Full width for featured courses
- All filters visible
- Maximum card detail

---

## PROGRESSION INDICATORS

### Visual Path

Show the recommended journey:

```tsx
<div className="recommended-path">
  <div className="path-step">
    <div className="step-number">1</div>
    <div className="step-title">Start Here</div>
    <div className="step-course">30-Day Challenge</div>
    <div className="step-price">£47</div>
  </div>

  <div className="path-arrow">→</div>

  <div className="path-step highlighted">
    <div className="step-number">2</div>
    <div className="step-title">Transform</div>
    <div className="step-course">90-Day Transformation</div>
    <div className="step-price">£497</div>
  </div>

  <div className="path-arrow">→</div>

  <div className="path-step">
    <div className="step-number">3</div>
    <div className="step-title">Deepen</div>
    <div className="step-course">Choose Your Pillar</div>
    <div className="step-price">£497-597</div>
  </div>

  <div className="path-arrow">→</div>

  <div className="path-step">
    <div className="step-number">4</div>
    <div className="step-title">Master</div>
    <div className="step-course">Applied or Certification</div>
    <div className="step-price">£997-5,997</div>
  </div>
</div>
```

---

## IMPLEMENTATION CHECKLIST

- [ ] Create CourseCard component (already done by agent)
- [ ] Build courses page layout with tier sections
- [ ] Implement 30-Day Challenge featured spotlight
- [ ] Add 90-Day Transformation flagship emphasis
- [ ] Create all Tier 2 course cards (AI + Deepening)
- [ ] Add Tier 3 applied courses
- [ ] Implement Tier 4 certification courses
- [ ] Add community and micro-courses section
- [ ] Build filter and sort functionality
- [ ] Add recommended path visual
- [ ] Implement responsive layouts
- [ ] Add prerequisite indicators
- [ ] Create enrollment flow for each course
- [ ] Test on all devices

---

## SUMMARY

The courses page structure reflects the refined strategy:

1. **30-Day Challenge** is prominently featured as the entry point
2. **90-Day Transformation** is clearly the flagship offering
3. **Tier progression** is visually clear and logical
4. **Filtering** allows students to find their path
5. **Recommended journey** guides decision-making
6. **Responsive design** works on all devices

This implementation creates a clear funnel from curiosity (browsing) to commitment (enrollment) while honoring the sophisticated framework of The Kaishin Method.
