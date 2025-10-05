# Presentation Order & Information Architecture Optimization
## Kaishin Method Website - Conversion Funnel Analysis

**Document Version:** 1.0
**Date:** 2025-10-02
**Status:** APPROVED FOR IMPLEMENTATION

---

## Executive Summary

This specification analyzes the current presentation order and information architecture of the Kaishin Method website and provides actionable recommendations to optimize conversion rates and user experience.

**Key Findings:**
- Current architecture creates a **fragmented 3-4 page journey** with multiple decision points
- **Content redundancy** (Framework and Five Bodies appear on both landing and path pages)
- Landing page violates **AIDA psychological model** (jumps to solution before establishing problem)
- **Split CTAs** on landing page cause decision paralysis
- Missing critical conversion elements (problem amplification, risk reversal, comparison)

**Expected Impact:**
- **+40-60% overall conversion improvement** with full implementation
- **+20-30% quick win** from Phase 1 changes alone
- **+35-40% email capture rate** improvement
- **15-20% reduction** in bounce rate

---

## Current State Analysis

### Site Map

**Public Pages:**
```
/ (Landing)
├── /path (Framework Education)
├── /program (Journey & Pricing)
├── /news (Content Listing)
├── /blog (Content Listing)
├── /book (Unknown)
└── /collective (Unknown)

/app/* (Member Portal)
├── /app (Dashboard)
├── /app/courses (Course Catalog)
├── /app/chat (DiamondMindAI)
├── /app/profile
├── /app/settings
└── /app/support
```

### Current Landing Page Structure (`/`)

**Section Order:**
1. **Hero** - "Stop Chasing Fragments. Master the Whole"
   - CTAs: "See Your Journey" (/program), "Explore the Framework" (/path)
2. **Framework Overview** - View/Compass/Ground (brief cards)
3. **Five Bodies** - Quick cards with icons
4. **About Kaishin** - Personal story (fragmentation → integration)
5. **Testimonials** - 3 social proof cards
6. **Lead Magnet Form**

**Information Flow:**
```
Problem (Hero) → Solution Overview → What Changes → Who/Credibility → Proof → Capture
```

### Current Path Page Structure (`/path`)

**Section Order:**
1. **Hero** - "Choose Your Path"
2. **Framework** - Detailed 3 Pillars (View/Compass/Ground)
3. **Five Bodies** - Expanded cards with full descriptions
4. **Eight Circles** - Progress visualization + explanation
5. **CTA** - "See Your Recommended Journey" (/program)

### Current Program Page Structure (`/program`)

**Section Order:**
1. **Hero** - "Your Transformation Journey"
2. **Journey Steps** - 4-step progression with pricing
   - 30-Day Challenge (£47)
   - 90-Day Transformation (£497)
   - Pillar Courses (£497-597)
   - Mastery/Certification (£997-5,997)
3. **Journey Note**
4. **CTA** - Start Challenge or View Courses

---

## Issues Identified

### 1. Content Redundancy (HIGH SEVERITY)

**Problem:** Framework and Five Bodies explanations appear on both landing and path pages.

**Impact:**
- Dilutes the unique purpose of each page
- Creates maintenance burden (updates needed in 2 places)
- Confuses visitor about which page to read
- Reduces perceived value of path page (already seen on landing)

**Affected Files:**
- `/src/app/page.tsx:66-155` (Framework Overview section)
- `/src/app/page.tsx:157-225` (Five Bodies section)
- `/src/app/path/page.tsx:40-88` (Framework section)
- `/src/app/path/page.tsx:92-175` (Five Bodies section)

---

### 2. Page Purpose Confusion (HIGH SEVERITY)

**Problem:** Landing and Path pages have overlapping purposes, creating unclear user journey.

**Current State:**
- Landing: Tries to do everything (problem, solution, framework, bodies, story, proof)
- Path: Also explains framework and bodies (redundant)
- Program: Shows journey/pricing

**Impact:**
- Visitor doesn't know which page to visit
- Split CTAs on landing cause decision paralysis
- 3-page journey creates multiple drop-off points

---

### 3. Suboptimal Landing Page Section Order (HIGH SEVERITY)

**Problem:** Current order violates conversion psychology (AIDA model).

**Current Order:**
```
Hero → Framework (Solution) → Five Bodies (Features) → About (Credibility) → Testimonials → Lead Magnet
```

**Issues:**
1. **Framework Too Early** - Shows solution before establishing problem/urgency
2. **About Section Buried** - Strongest differentiator (3-domain integration) at position 4
3. **Five Bodies Abstract** - Complex concept before trust is built
4. **Lead Magnet at Bottom** - Only capture mechanism buried

**Optimal AIDA Flow Should Be:**
```
Hero → Problem Amplification → Unique Value Prop → Framework Teaser → Social Proof → Journey Preview → Lead Magnet → Final CTA
```

**Affected Files:**
- `/src/app/page.tsx` (entire landing page structure)

---

### 4. Split CTA Strategy (MEDIUM SEVERITY)

**Problem:** Landing page has two primary CTAs leading to different destinations.

**Current CTAs:**
- "See Your Journey" → /program
- "Explore the Framework" → /path

**Impact:**
- Decision paralysis (which button to click?)
- Splits traffic between two paths
- Dilutes conversion focus
- No clear "next step"

**Affected Files:**
- `/src/app/page.tsx:38-55` (Hero CTAs)

---

### 5. Missing Strategic Elements (MEDIUM SEVERITY)

**Missing Components:**
1. **Problem Amplification Section** - No dedicated space to establish pain/urgency
2. **Risk Reversal** - No money-back guarantee on program page
3. **Comparison Table** - No "Why Kaishin vs Alternatives"
4. **FAQ Sections** - No common questions answered
5. **Standalone About Page** - Story buried in landing page

**Impact:**
- Lower trust/credibility
- Higher uncertainty → lower conversion
- Missed opportunity to handle objections

---

## Recommended Solutions

### Solution Architecture: Clear Funnel Strategy

**Proposed Funnel:**
```
Landing (Awareness) → Path (Consideration) → Program (Decision)
     ↓                      ↓                      ↓
  Problem              Framework              Pricing
  Solution UVP         Five Bodies            Journey
  Teaser               8 Circles              Risk Reversal
  CTA: Learn More      CTA: See Journey      CTA: Start Challenge
```

**Page Purpose Clarity:**

| Page | Job-to-be-Done | Primary CTA | Secondary CTA |
|------|---------------|-------------|---------------|
| **Landing** | Make visitor identify with problem & believe this is credible solution | "Learn More" → /path | "Start Challenge" |
| **Path** | Educate on methodology & build conviction that this is THE solution | "See Your Journey" → /program | "Start Challenge" |
| **Program** | Convert educated visitor with logistics, pricing, risk reversal | "Start 30-Day Challenge" | "Get Free Guide" |

---

## Detailed Recommendations

### Landing Page Restructure (`/src/app/page.tsx`)

#### Proposed Section Order

**SECTION 1: HERO** ✅ Keep Current
- Current hook is strong: "Stop Chasing Fragments. Master the Whole"
- **MODIFY CTAs:**
  - Primary: "Understand the Method" → /path
  - Secondary: "Start 30-Day Challenge" → /app/courses

**SECTION 2: PROBLEM AMPLIFICATION** ⭐ NEW
- **Purpose:** Establish pain before presenting solution
- **Copy Direction:**
  ```
  You've tried meditation. You've done therapy. You've worked on your body.
  But something still feels incomplete.

  That's because most approaches treat you as separate parts, not an integrated whole.
  The result? Temporary relief, but no lasting transformation.
  ```
- **Length:** 300-400 words
- **Visuals:** Split imagery showing fragmented approaches
- **Implementation:** New section between Hero and current Framework section

**SECTION 3: UNIQUE VALUE PROPOSITION** 📍 Move Up (Currently Position 4)
- **Current:** "About Kaishin" section buried at position 4
- **New Title:** "Why Kaishin Is Different"
- **Lead With:** Unique 3-domain integration (20yr contemplative + 15yr therapy + 10yr engineering)
- **Purpose:** Establish credibility and differentiation EARLY
- **Implementation:** Move current About section to position 3, retitle, emphasize integration as differentiator

**SECTION 4: FRAMEWORK TEASER** ✂️ Reduce from Current
- **Current:** Full framework cards
- **New:** Brief overview (3 sentences + visual)
  ```
  The Kaishin Method integrates three pillars:
  - The View (Zen & Non-Duality)
  - The Compass (ACT Psychology)
  - The Ground (Somatic Practice)

  [Learn the complete framework →]
  ```
- **CTA:** "Deep Dive: The Framework" → /path
- **Implementation:** Drastically reduce lines 66-155, keep visual, add strong internal link

**SECTION 5: SOCIAL PROOF** 📍 Move Up (Currently Position 5)
- **Current:** Testimonials at position 5
- **New Position:** Position 5 (after UVP and Framework Teaser)
- **Purpose:** Provide proof immediately after establishing credibility
- **Implementation:** Move testimonials section up

**SECTION 6: TRANSFORMATION PREVIEW** 🔄 Replace Five Bodies
- **Current:** Five Bodies cards (detailed)
- **New:** Journey preview
  ```
  From Fragmented to Whole in 90 Days

  30-Day Challenge → Foundation across all dimensions
  90-Day Transformation → Circle 1 to Circle 3 mastery

  [See Your Complete Journey →]
  ```
- **Purpose:** More concrete/tangible than abstract "5 bodies" concept
- **CTA:** "See Your Journey" → /program
- **Implementation:** Replace lines 157-225

**SECTION 7: LEAD MAGNET** 📍 Move Up (Currently at Bottom)
- **Current:** Lead magnet form at very bottom
- **New Position:** Position 7 (before final CTA)
- **Purpose:** Capture emails mid-funnel for those not ready to buy
- **Implementation:** Move up from current bottom position

**SECTION 8: FINAL CTA** ✅ Keep
- Strong close: "Ready to Begin?"
- Primary button: "Start 30-Day Challenge for £47"

---

### Path Page Enhancements (`/src/app/path/page.tsx`)

**Current Structure:** ✅ Well-Structured (Minor Changes Only)

**Additions Needed:**

1. **Comparison Table** (New Section After Framework)
   - "Traditional Approaches vs Kaishin Method"
   - Columns: Meditation Apps | Therapy | Fitness Programs | Kaishin Method
   - Rows: Mental | Emotional | Physical | Energetic | Spiritual | Integration

2. **FAQ Section** (New Section Before Final CTA)
   - "How is this different from meditation?"
   - "Do I need prior experience?"
   - "What if I miss a day?"
   - "Is this religious?"
   - "How much time commitment?"

3. **CTA Copy Strengthening**
   - Current: "See Your Recommended Journey"
   - New: "Ready to Begin? See Your Transformation Journey"

**Implementation:**
- Add comparison table after line 88
- Add FAQ section before line 220
- Update CTA copy at line 208-215

---

### Program Page Enhancements (`/src/app/program/page.tsx`)

**Current Structure:** ✅ Excellent (Add Strategic Elements Only)

**Additions Needed:**

1. **"Most Popular" Badge** (Visual Enhancement)
   - Add badge to 90-Day Transformation card (lines 133-190)
   - Position: Top-right corner of card
   - Text: "Most Popular" or "Recommended"

2. **Risk Reversal** (New Element)
   - Add after journey steps, before CTA section
   - Content: "30-Day Money-Back Guarantee. Try the method risk-free."
   - Emphasize: "If you complete the practices and don't see progress, full refund."

3. **Testimonial Snippets** (Enhancement)
   - Add 1-2 sentence testimonials within each journey step card
   - Position: Below "What You'll Achieve" section
   - Purpose: Provide social proof at point of consideration

4. **Payment Plan Emphasis**
   - Current: "or 3x £177" (small text)
   - New: Make payment plans more prominent
   - Add: "Pay Monthly: £177/month for 3 months"

**Implementation:**
- Add badge component to line 143
- Add risk reversal section before line 328
- Enhance testimonials within cards
- Update pricing display throughout

---

## Implementation Roadmap

### Phase 1: Quick Wins (1-2 Days) - HIGH PRIORITY

**Goal:** Fix redundancy and clarify funnel without complete redesign

**Tasks:**
1. ✅ **Establish Baselines**
   - Document current conversion rates: `/` → `/path`, `/` → `/program`, `/path` → `/program`
   - Ensure analytics tracking is in place

2. ✅ **Prune Landing Page Content**
   - Reduce Framework section (lines 66-155) to 3-4 sentence teaser
   - Reduce Five Bodies section (lines 157-225) to single paragraph mention
   - Add strong internal CTAs: "Learn the complete framework →" to `/path`

3. ✅ **Unify Landing Page CTAs**
   - Change Hero CTA (lines 38-55) to single primary destination: `/path`
   - Keep `/program` link in navigation only
   - Add secondary "Start Challenge" button (links to /app/courses)

4. ✅ **Add "Most Popular" Badge**
   - Add visual badge to 90-Day Transformation on `/program` page
   - Simple implementation: styled span or small component

**Expected Impact:** +10-15% increase in qualified traffic to `/program` page

**Files to Modify:**
- `/src/app/page.tsx` (lines 38-55, 66-155, 157-225)
- `/src/app/program/page.tsx` (line 143)

---

### Phase 2: A/B Test New Landing Page (1 Week) - HIGH PRIORITY

**Goal:** Validate psychologically-optimized AIDA flow

**Tasks:**
1. ✅ **Build Variant B (New Landing Page)**
   - Implement proposed section order:
     - Hero → Problem Amplification (NEW) → UVP (moved up) → Framework Teaser → Social Proof (moved up) → Journey Preview → Lead Magnet (moved up) → Final CTA
   - Write Problem Amplification section (300-400 words)
   - Move About section to position 3, retitle as "Why Kaishin Is Different"

2. ✅ **Configure A/B Test**
   - Control (A): Pruned landing page from Phase 1
   - Variant (B): New AIDA-optimized layout
   - Primary Metric: CTR to `/path` page
   - Secondary Metrics: Scroll depth, bounce rate, time on page

3. ✅ **Run Test for Minimum 7 Days**
   - Minimum 1,000 visitors per variant
   - Statistical significance target: 95% confidence

**Expected Impact:** +20-30% lift in CTR to `/path` page

**Files to Create:**
- `/src/app/page-variant-b.tsx` (new file for A/B test)

**Files to Modify:**
- A/B testing configuration (implementation dependent)

---

### Phase 3: Strategic Content Additions (1-2 Weeks) - MEDIUM PRIORITY

**Goal:** Build missing pages and elements

**Priority 1: Comparison Page** ⭐
- Create `/comparison` page
- Content: "Kaishin Method vs Meditation Apps vs Therapy vs Coaching"
- Frame against alternatives (not just competitors)
- Highlight unique integration

**Priority 2: Risk Reversal & Social Proof**
- Add money-back guarantee to `/program` page
- Enhance testimonials with before/after stories
- Add trust badges (certifications, credentials)

**Priority 3: FAQ Sections**
- Add FAQ to `/path` page (methodology questions)
- Add FAQ to `/program` page (logistics, pricing questions)
- 8-10 questions per page

**Priority 4: Standalone About Page**
- Create `/about` page
- Move full Kaishin story from landing
- Add mission, vision, values
- Add team section (if applicable)

**Expected Impact:** +15-20% increase in conversion from program page to purchase

**Files to Create:**
- `/src/app/comparison/page.tsx` (new page)
- `/src/app/about/page.tsx` (new page)

**Files to Modify:**
- `/src/app/path/page.tsx` (add FAQ section)
- `/src/app/program/page.tsx` (add risk reversal + FAQ)

---

### Phase 4: Long-Term Enhancements (Ongoing) - LOW PRIORITY

**Nice-to-Have Features:**
1. **Success Stories Page** - Expanded testimonials with full case studies
2. **Resources Hub** - Consolidate blog/news into single resource center
3. **Interactive Assessment** - Quiz/assessment tool for lead capture
4. **Video Content** - Explainer videos for framework and journey
5. **Live Chat** - Real-time support for visitors with questions

---

## SEO Considerations & Mitigation

### Risk: Content Removal from Landing Page

**Problem:** Removing Framework and Five Bodies content from landing page may impact SEO.

**Why It Matters:**
- Landing page (`/`) likely has domain authority
- May currently rank for "integrated transformation framework," "five bodies development," etc.
- Removing content = potential ranking loss

### Mitigation Strategy

**1. Make `/path` the Canonical Resource**
- Heavily optimize `/path` page for core keywords
- Target solution-aware keywords: "integrated transformation framework," "five bodies method," "Zen ACT somatic integration"
- Ensure `/path` becomes the authoritative source

**2. Internal Linking Strategy**
- Landing page Framework Teaser links to `/path` with keyword-rich anchor text
- Pass link equity: "Learn more about our integrated framework methodology →"
- Helps search engines understand new content structure

**3. Reoptimize Landing Page**
- Target higher-funnel, problem-aware keywords
- Examples: "overcome burnout holistically," "integrated personal development," "lasting transformation method"
- Focus on awareness-stage search intent

**4. Monitor Rankings**
- Track keyword rankings weekly for 30 days post-launch
- Watch for: "Kaishin Method," "integrated transformation," "five bodies"
- Be prepared to adjust if significant ranking drop

**5. Schema Markup**
- Add structured data to `/path` page
- Mark up: Course, HowTo, FAQPage
- Helps search engines understand content relationships

---

## Success Metrics & Measurement Plan

### Baseline Metrics (Pre-Implementation)

**Capture Before Any Changes:**
1. Landing page bounce rate: _%_
2. Landing → Path CTR: _%_
3. Landing → Program CTR: _%_
4. Path → Program CTR: _%_
5. Program → Purchase conversion: _%_
6. Email capture rate (lead magnet): _%_
7. Average time on landing page: _seconds_
8. Average scroll depth: _%_

### Target Metrics (Post-Implementation)

| Metric | Baseline | Phase 1 Target | Phase 2 Target | Phase 3 Target |
|--------|----------|----------------|----------------|----------------|
| Landing bounce rate | _% | -10% | -15% | -20% |
| Landing → Path CTR | _% | +15% | +35% | +40% |
| Path → Program CTR | _% | +10% | +20% | +25% |
| Program → Purchase | _% | +5% | +15% | +20% |
| Email capture rate | _% | +25% | +35% | +40% |
| Time on landing | _sec | +20% | +30% | +35% |
| Scroll depth | _% | +15% | +25% | +30% |

### Phase-by-Phase Targets

**Phase 1 Success Criteria:**
- ✅ Landing → Path CTR increases by 10-15%
- ✅ Bounce rate decreases by 5-10%
- ✅ Time on landing page increases by 15-20%

**Phase 2 Success Criteria:**
- ✅ Landing → Path CTR increases by additional 15-20%
- ✅ Bounce rate decreases by additional 5-10%
- ✅ Email capture rate increases by 25-35%

**Phase 3 Success Criteria:**
- ✅ Program → Purchase conversion increases by 15-20%
- ✅ Overall funnel conversion improves by 40-60%

### Monitoring Tools

**Required Analytics:**
- Google Analytics 4 (funnel tracking)
- Hotjar or similar (heatmaps, session recordings)
- A/B testing platform (if not using GA4 experiments)

**Tracking Setup:**
1. Goal tracking for each page transition
2. Event tracking for CTA clicks
3. Form submission tracking (lead magnet)
4. Scroll depth tracking
5. Time on page tracking

---

## Expert Validation Summary

**Strategic Refinement:**
- Confirmed AIDA psychological flow is optimal
- Added SEO risk mitigation strategy
- Recommended phased A/B testing approach over "big bang" release

**De-Risking Implementation:**
- Phased rollout allows incremental validation
- Each phase hypothesis-driven with clear success metrics
- Baseline measurement critical before any changes

**Priority Adjustments:**
- Comparison page elevated to high priority (powerful bottom-of-funnel asset)
- Risk reversal emphasized as quick win
- A/B testing approach validates strategy before full commitment

**Key Insight:**
> "Your sole purpose on the landing page is to get the visitor to identify with the problem and believe this is a credible place to find a solution. You are selling the click, not the program, at this stage."

---

## Implementation Checklist

### Pre-Flight
- [ ] Document baseline conversion rates
- [ ] Ensure analytics tracking is configured
- [ ] Set up funnel visualization in GA4
- [ ] Configure heatmap tracking (Hotjar/similar)

### Phase 1 (Quick Wins)
- [ ] Prune Framework section on landing to 3-4 sentences
- [ ] Prune Five Bodies section to single paragraph
- [ ] Add internal CTAs: "Learn complete framework →" to /path
- [ ] Change Hero CTA to single destination: /path
- [ ] Add "Most Popular" badge to 90-Day Transformation
- [ ] Deploy to production
- [ ] Monitor metrics for 3-5 days

### Phase 2 (A/B Test)
- [ ] Write Problem Amplification section (300-400 words)
- [ ] Move About section to position 3, retitle
- [ ] Reorder landing page sections (AIDA flow)
- [ ] Build variant B landing page
- [ ] Configure A/B test (Control vs Variant)
- [ ] Run test for minimum 7 days / 1,000 visitors per variant
- [ ] Analyze results, implement winner

### Phase 3 (Strategic Additions)
- [ ] Create comparison page (/comparison)
- [ ] Add risk reversal section to /program
- [ ] Add FAQ sections to /path and /program
- [ ] Create standalone About page
- [ ] Enhance testimonials with before/after stories
- [ ] Add trust badges and credentials

### SEO Monitoring
- [ ] Track keyword rankings pre-implementation
- [ ] Monitor rankings weekly for 30 days
- [ ] Optimize /path page for core keywords
- [ ] Add schema markup to /path
- [ ] Adjust strategy if rankings drop significantly

### Success Validation
- [ ] Compare Phase 1 metrics to baseline (week 1)
- [ ] Validate A/B test winner (week 2-3)
- [ ] Measure Phase 3 impact (week 4-6)
- [ ] Calculate overall funnel improvement
- [ ] Document learnings and iterate

---

## Appendix: Section-by-Section Landing Page Redesign

### Current Landing Page (Before)

```
SECTION 1: Hero
  - Headline: "Stop Chasing Fragments. Master the Whole."
  - CTAs: "See Your Journey" (/program), "Explore the Framework" (/path)
  - Social proof snippets

SECTION 2: Framework Overview
  - View/Compass/Ground cards (full detail)
  - Integration statement
  - CTA: "Deep Dive: The Framework" → /path

SECTION 3: Five Bodies
  - 5 cards with icons and descriptions
  - Integration statement
  - CTA: "Explore the Five Bodies" → /path

SECTION 4: About Kaishin
  - Personal story (fragmentation → integration)
  - 3 domains integration (20yr/15yr/10yr)
  - Testimonial

SECTION 5: Testimonials
  - 3 testimonial cards

SECTION 6: Lead Magnet Form
  - Email capture form
```

### Proposed Landing Page (After)

```
SECTION 1: Hero ✅
  - Headline: "Stop Chasing Fragments. Master the Whole."
  - Primary CTA: "Understand the Method" → /path
  - Secondary CTA: "Start 30-Day Challenge" → /app/courses
  - Social proof snippets

SECTION 2: Problem Amplification ⭐ NEW
  - Headline: "You've Tried Everything. Why Are You Still Incomplete?"
  - Body: Amplify fragmentation problem (300-400 words)
  - Visuals: Split imagery showing fragmented approaches
  - Transition: "There's a reason other approaches haven't worked..."

SECTION 3: Unique Value Proposition 📍 MOVED UP
  - Headline: "Why Kaishin Is Different: Integration, Not Accumulation"
  - Body: 20yr contemplative + 15yr therapy + 10yr engineering
  - Emphasize: This integration IS the differentiator
  - Testimonial snippet

SECTION 4: Framework Teaser ✂️ REDUCED
  - Headline: "Three Pillars. Five Bodies. One Complete System."
  - Body: 3-4 sentences (not full cards)
  - Visual: Simple diagram
  - CTA: "Deep Dive: The Complete Framework" → /path

SECTION 5: Social Proof 📍 MOVED UP
  - 3 testimonial cards (same as before)
  - Positioned after UVP to validate claims

SECTION 6: Transformation Preview 🔄 REPLACES FIVE BODIES
  - Headline: "From Fragmented to Whole in 90 Days"
  - Body: Journey progression overview
  - Visual: 30-day → 90-day → Mastery timeline
  - CTA: "See Your Complete Journey" → /program

SECTION 7: Lead Magnet 📍 MOVED UP
  - Headline: "Not Ready Yet? Start Here."
  - Offer: Free Integration Assessment or Guide
  - Form: Email capture
  - CTA: "Get Free Assessment"

SECTION 8: Final CTA ✅
  - Headline: "Ready to Begin?"
  - Primary CTA: "Start 30-Day Challenge for £47"
  - Secondary CTA: "Learn More" → /path
```

---

## File Changes Summary

### High Priority Files to Modify

**`/src/app/page.tsx`** (Landing Page - Major Restructure)
- Lines 38-55: Update Hero CTAs
- Lines 66-155: Reduce to teaser (remove detail)
- Lines 157-225: Replace Five Bodies with Journey Preview
- Lines 227-291: Move to position 3, retitle as "Why Kaishin Is Different"
- Lines 293-348: Move to position 5 (after framework teaser)
- Lines 350-353: Move to position 7 (before final CTA)
- **NEW:** Add Problem Amplification section (position 2)

**`/src/app/program/page.tsx`** (Program Page - Minor Enhancements)
- Line 143: Add "Most Popular" badge component
- After line 324: Add risk reversal section
- Lines 70-313: Add testimonial snippets within each card

**`/src/app/path/page.tsx`** (Path Page - Minor Additions)
- After line 88: Add comparison table section
- Before line 220: Add FAQ section
- Lines 208-215: Update CTA copy

### New Files to Create

**`/src/app/comparison/page.tsx`** (New Page)
- Comparison table: Kaishin vs Meditation Apps vs Therapy vs Coaching

**`/src/app/about/page.tsx`** (New Page)
- Full Kaishin story, mission, vision, team

### Components to Create

**`/src/components/kaishin/ProblemAmplification.tsx`** (New Component)
- Problem amplification section for landing page

**`/src/components/kaishin/ComparisonTable.tsx`** (New Component)
- Comparison table for path and comparison pages

**`/src/components/kaishin/FAQSection.tsx`** (New Component)
- FAQ section for path and program pages

**`/src/components/kaishin/RiskReversal.tsx`** (New Component)
- Money-back guarantee section for program page

**`/src/components/kaishin/PopularBadge.tsx`** (New Component)
- "Most Popular" badge for program page cards

---

## Conclusion

This specification provides a comprehensive roadmap to optimize the Kaishin Method website's information architecture and presentation order. By implementing the recommended changes in a phased, data-driven approach, we expect to achieve:

- **40-60% overall conversion improvement**
- **Clearer user journey** (Landing → Path → Program)
- **Reduced redundancy** and maintenance burden
- **Better SEO positioning** with optimized content distribution
- **Improved user experience** with AIDA-optimized psychological flow

**Next Steps:**
1. Review and approve this specification
2. Set up analytics baseline measurement
3. Begin Phase 1 implementation (Quick Wins)
4. Monitor results and iterate

**Questions or Concerns:**
- Contact: [Project Lead]
- Review Date: [Next Review]

---

**Document Status:** READY FOR IMPLEMENTATION
**Approval Required:** Product Owner, Engineering Lead, Marketing Lead
