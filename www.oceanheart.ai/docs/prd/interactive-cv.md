# Interactive Agentic Resume - Implementation Plan

> Repository-adjusted implementation for oceanheart.ai codebase

## Executive Summary

Transform the existing static `/cv` page into an interactive AI-powered resume that allows recruiters to "interrogate" experience, assess fit, and discover the unflattened context behind bullet points.

**Key Insight:** The codebase already has 90% of the infrastructure needed:
- Streaming AI API (`/api/ask-visitor`)
- RAG pattern with prompt caching (`src/lib/rag/claude-simple.ts`)
- 80+ Aceternity UI components
- Chat session management (`ChatContext`)
- Terminal aesthetic design system

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    /cv (Interactive Page)                    │
├─────────────────────────────────────────────────────────────┤
│  Hero Section                                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  "I build production systems where humans orchestrate   ││
│  │   AI agents rather than write every line."              ││
│  │                                                          ││
│  │  [Chat Input with PlaceholdersAndVanishInput]           ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  Fit Assessment Section                                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  [Paste JD] → AI Analysis → Match/Mismatch Card         ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  Experience Timeline (with "View AI Context" toggles)        │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Oceanheart.ai [View Context ▼]                         ││
│  │    └─ Expanded: Technical deep-dive panel               ││
│  │  EDITED [View Context ▼]                                ││
│  │  Brandwatch [View Context ▼]                            ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  Skills Matrix (3-column: Strong | Moderate | Not For Me)    │
├─────────────────────────────────────────────────────────────┤
│  Persistent Chat Widget (bottom-right)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Data Layer & CV Content Structure

### 1.1 Create CV Data Module
**File:** `src/lib/cv-data.ts`

```typescript
// Structured CV data with "unflattened" context for each experience
export interface CVExperience {
  id: string;
  role: string;
  company: string;
  companyDescription?: string;
  period: string;
  bullets: string[];
  context: {
    situation: string;
    methodology: string;
    lessonsLearned: string;
    technicalDetails?: string;
  };
  techStack: string[];
  highlight?: boolean;
}

export interface CVSkill {
  name: string;
  category: 'core' | 'agentic' | 'moderate' | 'gap';
  description?: string;
}

export interface CVData {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  contact: { email: string; linkedin: string; github: string; portfolio: string; };
  experiences: CVExperience[];
  skills: CVSkill[];
  psychologyBackground: { years: number; description: string; relevance: string; };
  education: { degree: string; institution: string; year: number; }[];
}
```

### 1.2 Populate with Unflattened Content

Key "context" data to add for Oceanheart.ai experience:
- **Situation:** "Building AI applications revealed that context window limits create 'context rot' - agents lose track of prior decisions."
- **Methodology:** "Implemented file-based state management: PRDs as source of truth, git commits as checkpoints, external files for agent memory."
- **Lessons Learned:** "The architecture shift from 'in-context memory' to 'external persistence' mirrors how humans use notes and documentation."
- **Technical Details:** "Multi-stage pipeline: HTML parsing → structured data → match scoring → CV tailoring → PDF export. Each stage validates against acceptance criteria before proceeding."

---

## Phase 2: API Endpoint for CV Agent

### 2.1 Create CV-Specific RAG Endpoint
**File:** `src/app/api/cv-agent/route.ts`

Leverage existing pattern from `ask-visitor/route.ts`:

```typescript
// System prompt grounded in CV data
const systemPrompt = `You are the interactive resume of Richard Hallett, an AI-Augmented Software Engineer.

CORE IDENTITY:
- 4 years enterprise experience (React/TypeScript, Python)
- 15 years as Cognitive Behavioural Therapist
- Currently shipping multi-agent workflows daily using Claude Code

RESPONSE STYLE:
- Answer like a Staff Engineer: specific, concise, citing evidence
- Never hallucinate - only reference actual CV content
- Be honest about gaps (e.g., "My focus is greenfield AI development, not legacy Java maintenance")
- Connect psychology background to engineering when relevant

CV DATA:
${JSON.stringify(cvData, null, 2)}

PORTFOLIO CONTEXT:
${portfolioSummary}
`;
```

### 2.2 Fit Assessment Endpoint
**File:** `src/app/api/cv-agent/fit-assessment/route.ts`

```typescript
// Specialized endpoint for JD analysis
// Input: Job description text
// Output: { matchLevel: 'strong' | 'moderate' | 'weak', evidence: string[], gaps: string[], recommendation: string }
```

---

## Phase 3: UI Components

### 3.1 Reusable Components to Create

| Component | Location | Based On |
|-----------|----------|----------|
| `CVChatWidget` | `src/components/cv/CVChatWidget.tsx` | New (uses PlaceholdersAndVanishInput) |
| `FitAssessment` | `src/components/cv/FitAssessment.tsx` | New (uses AnimatedModal) |
| `ExperienceCard` | `src/components/cv/ExperienceCard.tsx` | Extend existing experience section |
| `ContextPanel` | `src/components/cv/ContextPanel.tsx` | New (expandable with Framer Motion) |
| `SkillsMatrix` | `src/components/cv/SkillsMatrix.tsx` | New (3-column grid) |

### 3.2 CVChatWidget Component

Use existing Aceternity components:
- `PlaceholdersAndVanishInput` for animated chat input
- `TextGenerateEffect` for streaming response display
- Terminal aesthetic from existing design system

```typescript
// src/components/cv/CVChatWidget.tsx
// Suggested questions as placeholders:
const placeholders = [
  "Why does a psychology background help with coding?",
  "Tell me about your agent orchestration pipeline",
  "How did you solve the context rot problem?",
  "What's your approach to prompt engineering?",
  "Describe a complex system you've built recently"
];
```

### 3.3 FitAssessment Component

```typescript
// src/components/cv/FitAssessment.tsx
interface FitResult {
  matchLevel: 'strong' | 'moderate' | 'weak';
  evidence: string[];    // e.g., "JD mentions 'agent orchestration' - you have direct experience"
  gaps: string[];        // e.g., "Role requires Java - your focus is Python/TypeScript"
  recommendation: string; // e.g., "Strong match for this AI engineering role"
}

// Use MovingBorder for the result card
// Use HoverBorderGradient for the assessment button
```

### 3.4 ContextPanel Component

Expandable panel for "View AI Context" feature:

```typescript
// src/components/cv/ContextPanel.tsx
// Uses Framer Motion AnimatePresence for smooth expand/collapse
// Terminal-style code block for technical details
// Uses existing CodeBlock component for syntax highlighting
```

---

## Phase 4: Page Integration

### 4.1 Update CV Page Structure
**File:** `src/app/cv/page.tsx` (modify existing)

New section order:
1. **Hero** - Name, tagline, chat input
2. **Fit Assessment** - JD analysis tool (high priority for recruiters)
3. **Experience Timeline** - With expandable context panels
4. **Skills Matrix** - 3-column honest assessment
5. **Psychology Background** - Bridge section
6. **Persistent Chat** - Fixed bottom-right widget

### 4.2 Hero Section Redesign

Replace current hero with chat-first design:

```tsx
<section className="min-h-[60vh] flex flex-col items-center justify-center">
  <h1>Richard Hallett</h1>
  <p className="text-ocean-blue">
    "I build production systems where humans orchestrate AI agents."
  </p>
  <CVChatWidget className="mt-8 max-w-2xl" />
  <div className="flex gap-4 mt-6">
    <SuggestedQuestion>Why psychology + coding?</SuggestedQuestion>
    <SuggestedQuestion>Agent orchestration approach?</SuggestedQuestion>
    <SuggestedQuestion>Context engineering examples?</SuggestedQuestion>
  </div>
</section>
```

---

## Phase 5: Implementation Checklist

### Files to Create
- [ ] `src/lib/cv-data.ts` - Structured CV data with context
- [ ] `src/app/api/cv-agent/route.ts` - Main chat endpoint
- [ ] `src/app/api/cv-agent/fit-assessment/route.ts` - JD analysis endpoint
- [ ] `src/components/cv/CVChatWidget.tsx` - Hero chat component
- [ ] `src/components/cv/FitAssessment.tsx` - JD analysis component
- [ ] `src/components/cv/ExperienceCard.tsx` - Experience with context toggle
- [ ] `src/components/cv/ContextPanel.tsx` - Expandable context panel
- [ ] `src/components/cv/SkillsMatrix.tsx` - 3-column skills display
- [ ] `src/components/cv/CVChatProvider.tsx` - Local chat state (no auth required)

### Files to Modify
- [ ] `src/app/cv/page.tsx` - Integrate new components

### Existing Components to Leverage
- `PlaceholdersAndVanishInput` - Chat input with animated placeholders
- `TextGenerateEffect` - Streaming text display
- `AnimatedModal` - For detailed context views
- `MovingBorder` - For result cards
- `HoverBorderGradient` - For action buttons
- `Timeline` - For experience section (if desired)
- `CodeBlock` - For technical details display
- `Tabs` - For skills categorization

---

## Phase 6: Detailed Implementation Steps

### Step 1: Create CV Data Structure (1 file)

```typescript
// src/lib/cv-data.ts
export const cvData: CVData = {
  name: "Richard Hallett",
  title: "AI-Augmented Software Engineer",
  tagline: "I build production systems where humans orchestrate AI agents rather than write every line.",
  summary: "Software Engineer operating at the frontier of AI-augmented development...",

  experiences: [
    {
      id: "oceanheart",
      role: "Founder | AI Systems Engineer",
      company: "Oceanheart.ai",
      period: "Apr 2024 – Present",
      highlight: true,
      bullets: [
        "Built multi-agent orchestration systems using Claude Code",
        "Designed context-engineered workflows solving 'context rot'",
        "Implemented agentic loops with acceptance criteria validation",
        "Created reusable prompt architectures for consistent agent behaviour"
      ],
      context: {
        situation: "Building AI applications revealed that context window limits create 'context rot' - agents lose track of prior decisions mid-task.",
        methodology: "Implemented file-based state management: PRDs as source of truth, git commits as memory checkpoints, external files for agent context persistence.",
        lessonsLearned: "The architecture shift from 'in-context memory' to 'external persistence' mirrors how humans use notes - AI agents need the same scaffolding.",
        technicalDetails: `Multi-stage job application pipeline:
1. HTML Parsing → Structured job data extraction
2. Match Scoring → CV-to-JD compatibility analysis
3. CV Tailoring → Dynamic content optimization
4. Cover Letter Generation → Context-aware drafting
5. PDF Export → Professional document rendering

Each stage validates against acceptance criteria before proceeding. Parser generation is itself agentic - Claude writes the extraction logic.`
      },
      techStack: ["Claude Code", "Next.js", "Python", "Multi-agent orchestration"]
    },
    // ... other experiences
  ],

  skills: [
    { name: "Agent Orchestration (Claude Code)", category: "agentic" },
    { name: "Context Engineering", category: "agentic" },
    { name: "Prompt Architecture", category: "agentic" },
    { name: "React/TypeScript", category: "core" },
    { name: "Python", category: "core" },
    { name: "Node.js", category: "core" },
    { name: "SQL/Docker", category: "core" },
    { name: "Vue.js", category: "moderate" },
    { name: "Angular", category: "moderate" },
    { name: "Legacy Java/C#", category: "gap", description: "Not my focus area" },
    { name: "On-premise infrastructure", category: "gap", description: "Cloud-native preferred" }
  ],

  psychologyBackground: {
    years: 15,
    description: "Cognitive Behavioural Therapist",
    relevance: "This isn't just 'soft skills'—it's structured problem decomposition, clear communication under uncertainty, and understanding how humans collaborate with systems. Directly applicable to prompt engineering, agent behaviour design, and building AI tools that actually help people."
  }
};
```

### Step 2: Create CV Agent API (2 files)

**Main chat endpoint:**
```typescript
// src/app/api/cv-agent/route.ts
// - Load cvData and portfolioSections
// - Build system prompt with full CV context
// - Stream responses using existing pattern from ask-visitor
// - Include suggested follow-up questions in metadata
```

**Fit assessment endpoint:**
```typescript
// src/app/api/cv-agent/fit-assessment/route.ts
// Input: { jobDescription: string }
// - Analyze JD for key requirements
// - Compare against cvData skills and experience
// - Return structured assessment with evidence
// - Be brutally honest about mismatches
```

### Step 3: Create UI Components (5 files)

**CVChatWidget:**
- Uses `PlaceholdersAndVanishInput` for input
- Displays streaming responses with `TextGenerateEffect`
- Shows suggested follow-up questions
- Stores conversation in local state (no auth required)

**FitAssessment:**
- Textarea for JD paste
- Loading state with `MultiStepLoader`
- Result card with `MovingBorder`
- Color-coded: green (strong), yellow (moderate), red (weak)

**ExperienceCard:**
- Existing bullet points
- "View AI Context" toggle button
- Expands to show `ContextPanel`

**ContextPanel:**
- Three sections: Situation, Methodology, Lessons Learned
- Optional technical details in `CodeBlock`
- Smooth expand/collapse animation

**SkillsMatrix:**
- Three columns with distinct styling:
  - Core Stack (ocean-blue) - React, Python, etc.
  - Agentic Stack (jade) - Claude Code, Context Engineering
  - Not For Me (zinc-500) - Legacy systems (honest gaps)

### Step 4: Integrate into CV Page

Modify `src/app/cv/page.tsx` to:
1. Import new components
2. Restructure with chat-first hero
3. Add FitAssessment section after hero
4. Replace experience section with ExperienceCards
5. Add SkillsMatrix section
6. Add persistent chat widget (fixed position)

---

## Design Specifications

### Color Usage
- **ocean-blue** - Primary actions, strong matches, core skills
- **jade** - Agentic skills, success states
- **plum** - Psychology background, differentiators
- **zinc-500** - Gaps (honest, not apologetic)
- **terminal colors** - Code blocks, technical details

### Typography
- **Headings:** font-serif font-light (existing pattern)
- **Body:** font-light text-zinc-300
- **Code:** font-mono (JetBrains Mono)
- **Chat:** font-terminal styling

### Animations
- Use existing Framer Motion patterns from page
- `AnimatePresence` for context panel expand/collapse
- `TextGenerateEffect` for streaming responses
- `PlaceholdersAndVanishInput` for chat input

---

## API Response Formats

### Chat Response
```typescript
// Streaming text response with metadata at end
{
  content: "...", // Streamed text
  metadata: {
    suggestedQuestions: string[],
    referencedExperiences: string[],
    confidence: number
  }
}
```

### Fit Assessment Response
```typescript
{
  matchLevel: "strong" | "moderate" | "weak",
  overallScore: number, // 0-100
  evidence: [
    { requirement: "LLM orchestration", match: true, detail: "Direct experience with Claude Code multi-agent systems" },
    { requirement: "Java experience", match: false, detail: "Focus is Python/TypeScript; Java not in current stack" }
  ],
  recommendation: "Strong match. Role emphasizes AI-augmented development which aligns with core expertise.",
  honestGaps: ["Role mentions 5+ years Java - my Java is limited", "On-call rotation - prefer async communication"],
  suggestedQuestions: ["Ask about specific agent architecture patterns", "Discuss context engineering approach"]
}
```

---

## Testing Strategy

### Manual Testing Checklist
- [ ] Chat responds accurately to CV questions
- [ ] Chat refuses to hallucinate (test with "Do you know Kubernetes?" - should admit limited experience)
- [ ] Fit Assessment correctly identifies strong matches (AI roles)
- [ ] Fit Assessment correctly identifies weak matches (Java maintenance roles)
- [ ] Context panels expand/collapse smoothly
- [ ] Mobile responsive
- [ ] Streaming works without errors

### Sample Test Queries

**Should answer confidently:**
- "Tell me about your agent orchestration experience"
- "How did you solve context rot?"
- "Why is your psychology background relevant?"

**Should be honest about limits:**
- "What's your experience with Kubernetes at scale?"
- "Have you managed large engineering teams?"
- "Do you have experience with legacy COBOL systems?"

**Fit Assessment Tests:**
- Strong match JD: "AI Engineer, Claude API, Python, React, greenfield"
- Weak match JD: "Java Developer, legacy systems, on-premise, no AI"

---

## Success Metrics

The implementation is successful when:
1. A recruiter can understand technical depth within 2 minutes of interaction
2. The site itself demonstrates the claimed "agent orchestration" skills
3. Mismatched roles are filtered out before wasting either party's time
4. The psychology-to-engineering bridge is clear and compelling
5. Technical hiring managers can "interrogate" specific architectural decisions

---

## Future Enhancements (Out of Scope)

- Voice interaction mode
- Calendar booking integration
- Analytics dashboard (which questions are most asked)
- A/B testing different response styles
- Integration with actual job application system
