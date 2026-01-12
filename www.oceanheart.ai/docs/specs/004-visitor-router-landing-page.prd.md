# PRD 004: Visitor Router Landing Page with AI Question Handler

**Version:** 1.0
**Date:** October 5, 2025
**Status:** Draft
**Priority:** High

---

## Executive Summary

A minimal, elegant landing page that intelligently routes different visitor types to relevant content areas while providing an AI-powered question interface. The page uses Aceternity UI components (Sparkles, Spotlight, Placeholders and Vanish Input, Animated Modal) to create a visually stunning experience that captures visitors' attention and directs them to appropriate content through visual cards and AI-assisted navigation.

---

## Problem Statement

### Current Issues

1. **No visitor segmentation**: All visitors see the same landing page regardless of their intent or background
2. **Unclear navigation**: Visitors don't immediately understand which content is most relevant to them
3. **High bounce rate potential**: Generic landing pages fail to connect with specific visitor types
4. **Lack of interactive discovery**: No intelligent way for visitors to ask questions and find relevant content

### Pain Points

- **Business/AI visitors** can't quickly find information about AI consulting, development services, or technical capabilities
- **Psychotherapy clients** need to identify somatic/therapeutic services without wading through technical content
- **Website/app development prospects** can't easily assess portfolio and development expertise
- **Recruiters** have no clear path to professional background, skills, or hire-ability information
- **Kaishin Method prospects** need immediate context about the transformation program
- **Curious explorers** lack a way to ask open-ended questions about the site's offerings

### User Requirements

- Immediate visual clarity about site offerings (within 3 seconds)
- Intuitive categorization that matches visitor mental models
- Elegant, professional aesthetic that builds trust
- Interactive question interface that feels intelligent and helpful
- Smooth transitions and animations that enhance rather than distract
- Mobile-responsive design for all visitor types
- Fast load times despite rich visual effects

### Technical Requirements

- Built with Next.js 15 App Router (Server Components where possible)
- Uses existing Aceternity UI components (no modifications)
- Reuses chat interface architecture from `/app/app/chat/`
- Build-time content compression for AI system prompt
- Dynamic content loading from markdown files in `docs/content/`
- Responsive design using Tailwind CSS 4
- Accessible (WCAG 2.1 AA compliance)

### Design Requirements

- Pure black theme (`--void: #000000`) with accent color gradients
- Card-based layout with distinct background gradients per visitor type:
  - **Business AI**: Ocean blue gradient (`--ocean-blue: #4fc3f7`)
  - **Psychotherapy**: Plum gradient (`--plum: #ba68c8`)
  - **Development**: Jade gradient (`--jade: #5dd6ae`)
  - **Recruiter**: Gold gradient (`--gold: #f2cc8f`)
  - **Kaishin Method**: Multi-color (gold/ocean-blue blend)
  - **Curious**: Neutral zinc gradient
- Sparkles effect header with "Oceanheart AI" company name
- Spotlight effect for visual depth
- Placeholders and Vanish Input for question interface
- Animated Modal for AI chat experience

---

## Requirements

### Functional Requirements

#### FR1: Header with Sparkles Effect
- Display "Oceanheart AI" as company name using SparklesCore component
- Particle color: Gold (`#f2cc8f`)
- Tagline: "Transformation Through Technology & Consciousness"
- Responsive sizing (larger on desktop, compact on mobile)

#### FR2: Spotlight Background Effect
- Implement Spotlight component with ocean-blue gradients
- Subtle animation (7-10s duration)
- Non-intrusive, enhances depth without distraction

#### FR3: Visitor Type Cards (6 Cards in Grid)
Each card includes:
- **Title**: Visitor type name
- **Icon**: Tabler icon representing the category
- **Description**: 2-3 sentence summary of offerings
- **CTA Button**: "Explore [Category]"
- **Unique gradient background**: Card-specific color scheme
- **Hover effect**: Subtle scale + glow using card's accent color

**Card Specifications:**

1. **Business AI Card**
   - Title: "AI Solutions for Business"
   - Icon: `IconBrain`
   - Background: Ocean-blue gradient (`bg-gradient-to-br from-ocean-blue/20 to-ocean-blue/5`)
   - Description: "Custom AI integrations, intelligent automation, and Claude-powered solutions that transform how your business operates."
   - Link: `/consulting` (future route) or section anchor

2. **Psychotherapy Card**
   - Title: "Somatic Therapy & Healing"
   - Icon: `IconHeart`
   - Background: Plum gradient (`bg-gradient-to-br from-plum/20 to-plum/5`)
   - Description: "Body-centered therapeutic practices, trauma healing, and consciousness expansion for deep personal transformation."
   - Link: `/somatic` (future route)

3. **Web/App Development Card**
   - Title: "Web & App Development"
   - Icon: `IconCode`
   - Background: Jade gradient (`bg-gradient-to-br from-jade/20 to-jade/5`)
   - Description: "Modern, performant applications built with Next.js, React, and cutting-edge web technologies. Full-stack expertise from concept to deployment."
   - Link: `/portfolio` (future route)

4. **Recruiter Card**
   - Title: "Professional Profile"
   - Icon: `IconBriefcase`
   - Background: Gold gradient (`bg-gradient-to-br from-gold/20 to-gold/5`)
   - Description: "15+ years of software engineering, AI integration, full-stack development, and technical leadership. View skills, experience, and availability."
   - Link: `/profile` or external LinkedIn

5. **Kaishin Method Card**
   - Title: "The Kaishin Method"
   - Icon: `IconFlame` (or custom Japanese 心 character)
   - Background: Multi-gradient (`bg-gradient-to-br from-gold/20 via-ocean-blue/10 to-plum/5`)
   - Description: "A transformative journey through consciousness, mastery, and embodied awakening. Integrate the Five Bodies through the Eight Circles of Mastery."
   - Link: `/program` (existing route)

6. **Curious Explorers Card**
   - Title: "Just Exploring?"
   - Icon: `IconSparkles`
   - Background: Neutral zinc gradient (`bg-gradient-to-br from-zinc-700/20 to-zinc-900/5`)
   - Description: "Not sure where to start? Ask me anything about my work, philosophy, or how I can help you."
   - Action: Opens AI Question Modal (see FR4)

#### FR4: AI Question Interface ("Questions" Component)

**Visual Design:**
- Reusable component: `<AskOceanheart />`
- Section title: "Questions?" with subtitle "Ask me anything about what I do"
- Uses `PlaceholdersAndVanishInput` component
- Placeholders cycle through example questions:
  - "What AI services do you offer?"
  - "Tell me about somatic therapy approaches..."
  - "Can you build a Next.js app for my startup?"
  - "What makes the Kaishin Method unique?"
  - "How can I hire you for a project?"
  - "What's your development philosophy?"

**Interaction Flow:**
1. User types question into input
2. Presses Enter or clicks submit arrow
3. Text vanishes with particle effect
4. Animated Modal opens with chat interface (see FR5)

#### FR5: AI Chat Modal

**Modal Trigger:**
- Triggered by PlaceholdersAndVanishInput submission
- Triggered by "Curious Explorers" card click

**Modal Content:**
- Reuses chat UI from `/app/app/chat/page.tsx`
- Simplified version (no sidebar, no session management)
- Single-session ephemeral chat (doesn't persist between page loads)
- Clean, minimal chat interface with:
  - Message history display
  - User message input
  - AI streaming response
  - Markdown rendering (via `MarkdownMessage` component)

**Modal Styling:**
- Dark theme (`bg-black border border-white/[0.1]`)
- Max width: 90% on mobile, 800px on desktop
- Height: 90vh max
- Close button (X) in top-right
- Backdrop blur effect

**System Prompt (AI Personality):**
The AI should be knowledgeable, friendly, and directive—guiding users to relevant pages/sections.

**System Prompt Content Structure:**
```
You are Oceanheart AI, an intelligent assistant representing Richard Hallett's multifaceted work.

Your purpose: Help visitors understand offerings and direct them to relevant content.

# Content Areas

1. **AI Solutions for Business**
   [Compressed markdown from docs/content/ about AI consulting, Claude integrations, automation]

2. **Somatic Therapy & Healing**
   [Compressed markdown about therapeutic approach, body-centered work, trauma healing]

3. **Web & App Development**
   [Portfolio highlights, tech stack, development philosophy]

4. **Professional Profile**
   [Skills, experience, availability for hire]

5. **The Kaishin Method**
   [Compressed content from docs/content/the-kaishin-method.md, circles-of-mastery.md, 90-day-transformation.md]

# Response Guidelines
- Be concise (2-4 sentences for most answers)
- Always end responses with a suggested next action (e.g., "Visit /program to learn more")
- Use markdown formatting for readability
- Match the tone to the question (technical for dev questions, warm for therapy, professional for business)
- If unsure, ask clarifying questions
- Proactively suggest related content areas
```

**Content Compression Strategy (Build-Time):**
- Create `scripts/compress-content.ts` to run during build
- Reads all markdown files in `docs/content/`
- Parses frontmatter and content
- Compresses to condensed format (remove extra whitespace, summarize long sections)
- Outputs to `public/ai/content-summary.json`
- AI system prompt loads this JSON at runtime

#### FR6: Responsive Layout

**Desktop (≥1024px):**
- 3-column grid for visitor type cards
- Larger sparkles header (h-48)
- Question input: max-width 600px, centered
- Modal: 800px wide

**Tablet (768px - 1023px):**
- 2-column grid for visitor type cards
- Medium sparkles header (h-36)
- Question input: max-width 500px

**Mobile (<768px):**
- 1-column stack for visitor type cards
- Compact sparkles header (h-24)
- Question input: full width with padding
- Modal: full-screen minus safe margins

---

## Implementation Notes

### File Structure

```
src/
├── app/
│   └── page.tsx                        # Main landing page (Server Component wrapper)
├── components/
│   ├── landing/
│   │   ├── OceanheartHeader.tsx       # Sparkles header component
│   │   ├── VisitorCard.tsx            # Reusable visitor type card
│   │   ├── AskOceanheart.tsx          # Question input component (Client)
│   │   └── AIModal.tsx                # Chat modal component (Client)
│   └── ui/                             # Aceternity components (unchanged)
│       ├── sparkles.tsx
│       ├── spotlight-new.tsx
│       ├── placeholders-and-vanish-input.tsx
│       └── animated-modal.tsx
├── lib/
│   └── ai/
│       └── landing-chat.ts            # API route handler for landing chat
└── app/api/
    └── ask-visitor/
        └── route.ts                    # Visitor chat endpoint

public/
└── ai/
    └── content-summary.json            # Build-time generated content summary

scripts/
└── compress-content.ts                 # Build script for content compression
```

### Component Breakdown

#### 1. `OceanheartHeader.tsx` (Client Component)
```typescript
"use client";
import { SparklesCore } from "@/components/ui/sparkles";

export function OceanheartHeader() {
  return (
    <div className="relative h-48 lg:h-64 w-full overflow-hidden">
      <SparklesCore
        id="oceanheart-sparkles"
        background="transparent"
        minSize={0.6}
        maxSize={2}
        particleDensity={80}
        className="w-full h-full"
        particleColor="#f2cc8f" // gold
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-5xl lg:text-7xl font-serif font-light text-zinc-100 mb-4">
          Oceanheart AI
        </h1>
        <p className="text-zinc-400 text-lg lg:text-xl">
          Transformation Through Technology & Consciousness
        </p>
      </div>
    </div>
  );
}
```

#### 2. `VisitorCard.tsx` (Client Component)
```typescript
"use client";
import { motion } from "framer-motion";
import type { Icon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface VisitorCardProps {
  title: string;
  description: string;
  icon: Icon;
  gradient: string; // Tailwind gradient classes
  href?: string;
  onClick?: () => void;
}

export function VisitorCard({ title, description, icon: Icon, gradient, href, onClick }: VisitorCardProps) {
  const cardContent = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative p-8 border border-white/[0.1] cursor-pointer overflow-hidden group",
        gradient
      )}
      onClick={onClick}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/[0.05] to-transparent" />

      {/* Icon */}
      <div className="mb-4 relative z-10">
        <Icon className="w-12 h-12 text-zinc-100" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-serif font-light text-zinc-100 mb-3 relative z-10">
        {title}
      </h3>

      {/* Description */}
      <p className="text-zinc-300 text-sm leading-relaxed mb-6 relative z-10">
        {description}
      </p>

      {/* CTA */}
      <div className="relative z-10">
        <span className="text-zinc-100 text-sm font-medium group-hover:text-gold transition-colors">
          Explore {title} →
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
```

#### 3. `AskOceanheart.tsx` (Client Component)
```typescript
"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Modal, ModalBody, ModalContent, ModalProvider } from "@/components/ui/animated-modal";
import { AIModal } from "./AIModal";

const placeholders = [
  "What AI services do you offer?",
  "Tell me about somatic therapy approaches...",
  "Can you build a Next.js app for my startup?",
  "What makes the Kaishin Method unique?",
  "How can I hire you for a project?",
  "What's your development philosophy?",
];

export function AskOceanheart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get("question") as string;
    setInitialQuestion(question);
    setIsModalOpen(true);
  };

  return (
    <ModalProvider>
      <div className="max-w-2xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-serif font-light text-zinc-100 text-center mb-4">
          Questions?
        </h2>
        <p className="text-zinc-400 text-center mb-8">
          Ask me anything about what I do
        </p>

        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={() => {}}
          onSubmit={handleSubmit}
        />
      </div>

      {isModalOpen && (
        <Modal>
          <ModalBody>
            <ModalContent>
              <AIModal initialQuestion={initialQuestion} onClose={() => setIsModalOpen(false)} />
            </ModalContent>
          </ModalBody>
        </Modal>
      )}
    </ModalProvider>
  );
}
```

#### 4. `AIModal.tsx` (Client Component)
Simplified version of `/app/app/chat/page.tsx`:
- Remove sidebar and session management
- Single ephemeral session (no localStorage persistence)
- Reuse message rendering, streaming logic, and MarkdownMessage
- API endpoint: `/api/ask-visitor` (similar to `/api/ask` but with visitor-specific system prompt)

#### 5. `/api/ask-visitor/route.ts` (API Route)
```typescript
import { Anthropic } from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const { question, history } = await request.json();

  // Load compressed content summary
  const contentPath = path.join(process.cwd(), 'public/ai/content-summary.json');
  const contentSummary = JSON.parse(await fs.readFile(contentPath, 'utf-8'));

  const systemPrompt = `You are Oceanheart AI, an intelligent assistant representing Richard Hallett's multifaceted work.

Your purpose: Help visitors understand offerings and direct them to relevant content.

# Content Areas

${contentSummary.aiSolutions}

${contentSummary.somaticTherapy}

${contentSummary.webDevelopment}

${contentSummary.professionalProfile}

${contentSummary.kaishinMethod}

# Response Guidelines
- Be concise (2-4 sentences for most answers)
- Always end responses with a suggested next action (e.g., "Visit /program to learn more")
- Use markdown formatting for readability
- Match the tone to the question (technical for dev questions, warm for therapy, professional for business)
- If unsure, ask clarifying questions
- Proactively suggest related content areas
`;

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  // Build message history
  const messages = [
    ...history.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: 'user', content: question },
  ];

  const stream = await anthropic.messages.stream({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });

  // Stream response back to client
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
```

#### 6. `scripts/compress-content.ts` (Build Script)
```typescript
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

async function compressContent() {
  const contentDir = path.join(process.cwd(), 'docs/content');
  const outputPath = path.join(process.cwd(), 'public/ai/content-summary.json');

  // Read markdown files
  const kaishinMethod = await fs.readFile(path.join(contentDir, 'the-kaishin-method.md'), 'utf-8');
  const circles = await fs.readFile(path.join(contentDir, 'circles-of-mastery.md'), 'utf-8');
  const transformation = await fs.readFile(path.join(contentDir, '90-day-transformation.md'), 'utf-8');

  // Parse and compress
  const kaishinParsed = matter(kaishinMethod);
  const circlesParsed = matter(circles);
  const transformationParsed = matter(transformation);

  // Compress content (remove extra whitespace, truncate if needed)
  const compress = (text: string, maxLength = 1000) => {
    return text
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .replace(/\s+/g, ' ')       // Collapse whitespace
      .slice(0, maxLength);       // Truncate
  };

  const summary = {
    aiSolutions: `## AI Solutions for Business
Richard specializes in custom Claude AI integrations, intelligent automation, and agentic workflows. Expertise includes RAG systems, prompt engineering, and production-grade AI applications built with TypeScript/Python.`,

    somaticTherapy: `## Somatic Therapy & Healing
Body-centered therapeutic practices drawing from somatic experiencing, trauma healing, and consciousness expansion. Integrative approach combines psychology, embodiment, and spiritual development.`,

    webDevelopment: `## Web & App Development
15+ years building modern web applications with Next.js, React, TypeScript, and full-stack technologies. Specializes in high-performance applications, developer experience, and clean architecture.`,

    professionalProfile: `## Professional Profile
Senior Software Engineer with expertise in AI integration, full-stack development, and technical leadership. Available for consulting, fractional CTO roles, and complex development projects.`,

    kaishinMethod: `## The Kaishin Method
${compress(kaishinParsed.content, 800)}

### Eight Circles of Mastery
${compress(circlesParsed.content, 600)}

### 90-Day Transformation
${compress(transformationParsed.content, 400)}`,
  };

  // Ensure output directory exists
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  // Write compressed content
  await fs.writeFile(outputPath, JSON.stringify(summary, null, 2));

  console.log('✅ Content compressed successfully to public/ai/content-summary.json');
}

compressContent().catch(console.error);
```

Add to `package.json`:
```json
{
  "scripts": {
    "prebuild": "tsx scripts/compress-content.ts && node scripts/copy-decap.js"
  }
}
```

### Code Examples

**Main Landing Page (`src/app/page.tsx`):**
```typescript
import { Spotlight } from "@/components/ui/spotlight-new";
import { OceanheartHeader } from "@/components/landing/OceanheartHeader";
import { VisitorCard } from "@/components/landing/VisitorCard";
import { AskOceanheart } from "@/components/landing/AskOceanheart";
import {
  IconBrain,
  IconHeart,
  IconCode,
  IconBriefcase,
  IconFlame,
  IconSparkles,
} from "@tabler/icons-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-void relative overflow-hidden">
      {/* Spotlight background effect */}
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(199, 89%, 60%, .08) 0, hsla(199, 89%, 60%, .02) 50%, transparent 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(199, 89%, 60%, .06) 0, hsla(199, 89%, 60%, .02) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(199, 89%, 60%, .04) 0, transparent 100%)"
      />

      {/* Header with sparkles */}
      <OceanheartHeader />

      {/* Visitor type cards */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VisitorCard
            title="AI Solutions for Business"
            description="Custom AI integrations, intelligent automation, and Claude-powered solutions that transform how your business operates."
            icon={IconBrain}
            gradient="bg-gradient-to-br from-ocean-blue/20 to-ocean-blue/5"
            href="/consulting"
          />

          <VisitorCard
            title="Somatic Therapy & Healing"
            description="Body-centered therapeutic practices, trauma healing, and consciousness expansion for deep personal transformation."
            icon={IconHeart}
            gradient="bg-gradient-to-br from-plum/20 to-plum/5"
            href="/somatic"
          />

          <VisitorCard
            title="Web & App Development"
            description="Modern, performant applications built with Next.js, React, and cutting-edge web technologies. Full-stack expertise from concept to deployment."
            icon={IconCode}
            gradient="bg-gradient-to-br from-jade/20 to-jade/5"
            href="/portfolio"
          />

          <VisitorCard
            title="Professional Profile"
            description="15+ years of software engineering, AI integration, full-stack development, and technical leadership. View skills, experience, and availability."
            icon={IconBriefcase}
            gradient="bg-gradient-to-br from-gold/20 to-gold/5"
            href="/profile"
          />

          <VisitorCard
            title="The Kaishin Method"
            description="A transformative journey through consciousness, mastery, and embodied awakening. Integrate the Five Bodies through the Eight Circles of Mastery."
            icon={IconFlame}
            gradient="bg-gradient-to-br from-gold/20 via-ocean-blue/10 to-plum/5"
            href="/program"
          />

          <VisitorCard
            title="Just Exploring?"
            description="Not sure where to start? Ask me anything about my work, philosophy, or how I can help you."
            icon={IconSparkles}
            gradient="bg-gradient-to-br from-zinc-700/20 to-zinc-900/5"
            onClick={() => {}} // Modal opens via AskOceanheart component
          />
        </div>
      </section>

      {/* Question input */}
      <AskOceanheart />
    </main>
  );
}
```

---

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

### Mobile Optimizations
- Stack cards in single column
- Reduce sparkles particle density (60 vs 80)
- Full-width question input with side padding
- Larger touch targets for cards (min-height: 200px)
- Full-screen modal (minus safe margins)

### Tablet Optimizations
- 2-column grid for cards
- Medium sparkles header
- Centered question input (max-width: 500px)

### Desktop Optimizations
- 3-column grid for cards
- Large sparkles header
- Wider question input (max-width: 600px)
- Modal at 800px width (centered)

---

## Animation Specifications

### Card Hover Effect
```typescript
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.2, ease: "easeOut" }}
```

### Modal Entry Animation
```typescript
initial={{ opacity: 0, scale: 0.5, rotateX: 40, y: 40 }}
animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
transition={{ type: "spring", stiffness: 260, damping: 15 }}
```

### Sparkles Effect
- Particle density: 80 (desktop), 60 (mobile)
- Speed: 4 (opacity animation)
- Min size: 0.6px, Max size: 2px
- Particle color: Gold (#f2cc8f)

### Spotlight Animation
- Duration: 7 seconds
- X offset: 100px
- Ease: easeInOut
- Repeat: Infinite, reverse

### Vanish Input Animation
- Text particle disintegration on submit
- Particle decay: 0.05 * random
- Animation frame rate: requestAnimationFrame
- Canvas-based particle rendering

---

## Success Metrics

### Engagement Metrics
- **Bounce rate**: Target < 40% (baseline: ~60% for generic landing pages)
- **Time on page**: Target > 45 seconds (indicates card exploration)
- **Card click-through rate**: Target > 30% (at least 1 card clicked per visit)
- **Question submissions**: Target > 10% of visitors ask a question

### Navigation Metrics
- **Visitor routing accuracy**: % of visitors who click the "right" card for their intent (measured via surveys or follow-up analytics)
- **AI modal engagement**: % of visitors who submit ≥ 2 questions in AI chat
- **Exit destination relevance**: % of visitors who navigate to relevant content areas after landing page

### Technical Metrics
- **Page load time**: Target < 2 seconds (LCP - Largest Contentful Paint)
- **First Input Delay**: Target < 100ms
- **Cumulative Layout Shift**: Target < 0.1
- **Mobile responsiveness score**: Target 100/100 (Google PageSpeed Insights)

### Conversion Metrics
- **Contact form submissions**: Track from each visitor type route
- **Kaishin Method signups**: Measure conversions from Kaishin card
- **Consultation bookings**: Track from Business AI and Development cards

---

## Future Enhancements

### Phase 2: Personalization
- Track visitor behavior (cards viewed, questions asked)
- Adjust card ordering based on engagement patterns
- Remember visitor preferences via localStorage
- Pre-populate question input if visitor returns

### Phase 3: Advanced AI Features
- Multi-turn conversations with context persistence
- AI-suggested card recommendations based on questions
- Intelligent content summarization (dynamic summaries based on question context)
- Voice input for questions (Web Speech API)

### Phase 4: Analytics & Optimization
- Heatmap tracking (Hotjar or similar)
- A/B testing for card copy, gradients, CTAs
- Visitor type self-identification (optional survey after card click)
- Funnel analysis: Landing → Card Click → Content Page → Conversion

### Phase 5: Expanded Content
- Video introductions for each visitor type
- Interactive demos (e.g., AI solution sandbox, Kaishin Method preview)
- Testimonials carousel by visitor type
- Case studies linked from cards

---

## Dependencies

### NPM Packages (Already Installed)
- `@anthropic-ai/sdk` - For AI chat functionality
- `framer-motion` - For animations
- `@tabler/icons-react` - For card icons
- `@tsparticles/react` - For sparkles effect
- `gray-matter` - For markdown parsing
- `next` - Framework
- `react` - UI library
- `tailwindcss` - Styling

### New Dependencies
None required (all components reused from existing UI library)

### Environment Variables
- `ANTHROPIC_API_KEY` - Required for AI chat functionality

---

## Technical Constraints

### Performance Constraints
- Total JavaScript bundle for landing page: Target < 200KB (gzipped)
- Sparkles particle count: Max 120 particles (performance on low-end devices)
- Modal chat history: Max 50 messages (prevent memory issues)
- Content summary JSON: Max 10KB (fast parsing)

### Browser Compatibility
- **Target browsers**: Last 2 versions of Chrome, Firefox, Safari, Edge
- **Graceful degradation**: Sparkles/Spotlight disabled on older browsers
- **Fallback**: Plain gradient backgrounds if animation not supported

### Accessibility Constraints
- **WCAG 2.1 AA compliance**
- Keyboard navigation for all interactive elements
- Screen reader support (ARIA labels for cards, modal)
- Focus indicators on all interactive elements
- Color contrast ratio: Min 4.5:1 for text

---

## Open Questions

1. **Content summary compression**: Should we use AI to generate summaries, or manually curate?
   - **Recommendation**: Manual curation for Phase 1 (higher quality), AI-assisted in Phase 2

2. **Card routing**: Should cards link to dedicated pages or scroll to sections on current page?
   - **Recommendation**: Link to dedicated pages (better SEO, clearer navigation)

3. **AI chat persistence**: Should conversations persist across page loads?
   - **Recommendation**: No for landing page (ephemeral), Yes for member portal

4. **Visitor tracking**: Should we track which card each visitor clicks?
   - **Recommendation**: Yes, with privacy-respecting analytics (Plausible or similar)

5. **Mobile modal UX**: Should modal be full-screen on mobile or bottom sheet?
   - **Recommendation**: Full-screen (better chat experience, less distraction)

---

## Timeline Estimate

### Phase 1: Core Implementation (Week 1-2)
- Day 1-2: Set up component structure (`OceanheartHeader`, `VisitorCard`, `AskOceanheart`)
- Day 3-4: Implement AI modal and chat functionality
- Day 5: Build content compression script
- Day 6-7: API route implementation and testing
- Day 8-10: Responsive design and mobile optimization
- Day 11-12: Accessibility testing and fixes
- Day 13-14: Performance optimization and polish

### Phase 2: Testing & Refinement (Week 3)
- User testing with 5+ people from each visitor type
- Iterate on copy, gradients, animations based on feedback
- Fix bugs and edge cases
- Load testing for AI chat endpoint

### Phase 3: Deployment (Week 4)
- Deploy to staging
- Cross-browser testing
- Analytics setup (Plausible or Google Analytics)
- Production deployment
- Post-launch monitoring

---

## Appendix

### Gradient Color Reference
```css
/* Business AI */
bg-gradient-to-br from-ocean-blue/20 to-ocean-blue/5
/* Ocean-blue: #4fc3f7 */

/* Psychotherapy */
bg-gradient-to-br from-plum/20 to-plum/5
/* Plum: #ba68c8 */

/* Development */
bg-gradient-to-br from-jade/20 to-jade/5
/* Jade: #5dd6ae */

/* Recruiter */
bg-gradient-to-br from-gold/20 to-gold/5
/* Gold: #f2cc8f */

/* Kaishin Method */
bg-gradient-to-br from-gold/20 via-ocean-blue/10 to-plum/5
/* Multi-gradient blend */

/* Curious */
bg-gradient-to-br from-zinc-700/20 to-zinc-900/5
/* Neutral zinc */
```

### ASCII Diagram: Page Layout

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    ✨ SPARKLES HEADER ✨                   │
│                                                            │
│                     Oceanheart AI                          │
│          Transformation Through Technology &               │
│                    Consciousness                           │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌─────────────────────┬─────────────────────┬──────────────────┐
│                     │                     │                  │
│  AI Solutions       │  Somatic Therapy    │  Web Development │
│  [Ocean-blue]       │  [Plum]             │  [Jade]          │
│                     │                     │                  │
│  Description...     │  Description...     │  Description...  │
│                     │                     │                  │
│  → Explore          │  → Explore          │  → Explore       │
│                     │                     │                  │
└─────────────────────┴─────────────────────┴──────────────────┘

┌─────────────────────┬─────────────────────┬──────────────────┐
│                     │                     │                  │
│  Professional       │  Kaishin Method     │  Just Exploring? │
│  Profile [Gold]     │  [Multi-gradient]   │  [Zinc]          │
│                     │                     │                  │
│  Description...     │  Description...     │  Description...  │
│                     │                     │                  │
│  → Explore          │  → Explore          │  → Ask AI        │
│                     │                     │                  │
└─────────────────────┴─────────────────────┴──────────────────┘

                          ┌───────────────┐
                          │  Questions?   │
                          └───────────────┘
                     Ask me anything about
                         what I do

              ┌──────────────────────────────────┐
              │ [Vanishing Input Component]      │
              │ What AI services do you offer?   │
              └──────────────────────────────────┘

                          [Submit] →


                     ┌─────────────────┐
                     │  ANIMATED MODAL │  (Opens on question submit)
                     │                 │
                     │  [Chat UI]      │
                     │                 │
                     │  User: ...      │
                     │  AI: ...        │
                     │                 │
                     │  [Input box]    │
                     └─────────────────┘
```

### File Checklist
- [ ] `src/components/landing/OceanheartHeader.tsx`
- [ ] `src/components/landing/VisitorCard.tsx`
- [ ] `src/components/landing/AskOceanheart.tsx`
- [ ] `src/components/landing/AIModal.tsx`
- [ ] `src/app/page.tsx` (update with new components)
- [ ] `src/app/api/ask-visitor/route.ts`
- [ ] `scripts/compress-content.ts`
- [ ] `public/ai/content-summary.json` (generated)
- [ ] `package.json` (add prebuild script)

---

**End of PRD 004**
