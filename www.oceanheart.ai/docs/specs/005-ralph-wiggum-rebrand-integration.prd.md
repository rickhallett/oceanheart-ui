# PRD: Ralph Wiggum Rebrand Integration

**Version:** 1.0
**Date:** 2026-01-12
**Status:** Draft
**Author:** Claude Code

---

## Executive Summary

This PRD defines how to leverage the Ralph Wiggum iterative development technique to systematically execute the oceanheart.ai rebrand specification. The rebrand transforms the site from "consultant who understands tech" to "engineer who understands humans" through a terminal-aesthetic redesign, content restructuring, and new technical features.

Ralph Wiggum's self-referential loop pattern is ideal for this rebrand because:
1. Each phase has clear completion criteria
2. Changes build incrementally on previous work
3. Visual and content changes benefit from iterative refinement
4. The technique matches the terminal-first engineering identity being established

---

## Problem Statement

### Current Issues

1. **Manual rebrand execution is error-prone** - The rebrand spec contains 50+ discrete changes across design, content, and features
2. **Coordination across phases is complex** - Four distinct phases with dependencies
3. **Quality assurance is fragmented** - No systematic way to verify each change meets spec
4. **Progress tracking is manual** - Easy to lose track of completed vs pending items

### Pain Points

- Rebrand specs often get partially implemented then abandoned
- Design consistency degrades without iterative verification
- Content restructuring requires multiple passes to get right
- Terminal aesthetic details (typography, colors, spacing) need fine-tuning

---

## Requirements

### Functional Requirements

#### FR-1: Phase-Based Ralph Loops
Each rebrand phase should have its own Ralph loop with:
- Clear prompt describing phase objectives
- Completion promise tied to verifiable criteria
- Max iterations as safety valve

#### FR-2: Self-Verifying Completion Criteria
Each loop must verify its work against the rebrand spec before outputting the completion promise.

#### FR-3: Incremental Progress Persistence
All changes must be committed to git so subsequent iterations can see progress.

#### FR-4: Cross-Phase Coordination
Later phases must check that earlier phase work is intact before proceeding.

### Technical Requirements

#### TR-1: Prompt Templates
Create standardized prompts for each phase stored in `.claude/prompts/rebrand/`.

#### TR-2: Verification Scripts
Optional scripts to validate completion criteria (e.g., CSS variable presence, component existence).

#### TR-3: State Tracking
Use `.claude/.ralph-loop.local.md` for active loop state plus a persistent `.claude/rebrand-progress.md` for overall progress.

### Design Requirements

#### DR-1: Tokyo Night Color Palette
All visual changes must use the specified CSS variables:
```css
--bg-primary: #1a1b26;
--bg-secondary: #24283b;
--bg-tertiary: #414868;
--text-primary: #c0caf5;
--text-secondary: #a9b1d6;
--text-muted: #565f89;
--accent-cyan: #7dcfff;
--accent-blue: #7aa2f7;
--accent-purple: #bb9af7;
--accent-green: #9ece6a;
--accent-orange: #ff9e64;
--accent-red: #f7768e;
```

#### DR-2: Typography System
```css
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
--font-sans: 'Inter', 'SF Pro', system-ui, sans-serif;
```

#### DR-3: Terminal Aesthetic Elements
- Monospace headers
- `$ ` prompts before section headers
- Minimal/no border-radius (max 2px)
- Subtle glow on hover states
- Cursor blink animations where appropriate

---

## Implementation: Ralph Loop Prompts

### Phase 1: Foundation (Iterations: max 15)

**Prompt File:** `.claude/prompts/rebrand/phase-1-foundation.md`

```markdown
# Ralph Loop: Rebrand Phase 1 - Foundation

## Objective
Apply the new terminal aesthetic foundation to oceanheart.ai.

## Tasks
Read the rebrand spec at `oceanheart-rebrand-spec.md` and implement:

1. **Color Palette** - Add Tokyo Night CSS variables to globals.css
2. **Typography** - Configure JetBrains Mono + Inter fonts
3. **Homepage Restructure** - Update hero to engineering-first messaging:
   - Title: "Software Engineer & Human Systems Architect"
   - One-liner: "I build AI systems that actually work for humans"
   - CTA: "See my work" (links to portfolio)
4. **GitHub Link** - Add prominently to navigation
5. **ASCII Logo** - Create and display in hero section

## Verification Checklist
Before completing, verify:
- [ ] CSS variables for all Tokyo Night colors exist in globals.css
- [ ] Fonts are imported and applied
- [ ] Homepage hero has new messaging
- [ ] Navigation includes GitHub link
- [ ] ASCII logo renders correctly

## Completion
When ALL verification items pass, output:
<promise>PHASE 1 FOUNDATION COMPLETE</promise>

If blocked or incomplete, describe what remains and continue iterating.
```

**Command:**
```bash
/ralph-loop "Execute rebrand Phase 1 - Foundation. Read .claude/prompts/rebrand/phase-1-foundation.md for full instructions." --completion-promise "PHASE 1 FOUNDATION COMPLETE" --max-iterations 15
```

---

### Phase 2: Portfolio Enhancement (Iterations: max 20)

**Prompt File:** `.claude/prompts/rebrand/phase-2-portfolio.md`

```markdown
# Ralph Loop: Rebrand Phase 2 - Portfolio Enhancement

## Prerequisite
Verify Phase 1 is complete (Tokyo Night colors applied, homepage restructured).

## Objective
Transform the portfolio page to showcase engineering work prominently.

## Tasks
Per `oceanheart-rebrand-spec.md`:

1. **Project Cards** - Enhance with:
   - Hero screenshot/video placeholder
   - Problem statement (1 sentence)
   - Solution (1 sentence)
   - Tech stack badges
   - Live link + GitHub link
   - Status tag: [Production | Prototype | Experiment]

2. **Categorization** - Group projects:
   - Production Systems
   - AI/Clinical Tools
   - Infrastructure
   - Experiments

3. **"Currently Building"** - Add section showing active work

4. **Featured Case Study** - Create detailed Swanage Traffic writeup

## Verification Checklist
- [ ] All project cards have enhanced structure
- [ ] Projects are categorized correctly
- [ ] "Currently building" section exists
- [ ] At least one case study has full writeup
- [ ] Terminal aesthetic maintained (colors, typography)

## Completion
When ALL verification items pass, output:
<promise>PHASE 2 PORTFOLIO COMPLETE</promise>
```

**Command:**
```bash
/ralph-loop "Execute rebrand Phase 2 - Portfolio Enhancement. Read .claude/prompts/rebrand/phase-2-portfolio.md for full instructions." --completion-promise "PHASE 2 PORTFOLIO COMPLETE" --max-iterations 20
```

---

### Phase 3: Content & Blog Pipeline (Iterations: max 25)

**Prompt File:** `.claude/prompts/rebrand/phase-3-content.md`

```markdown
# Ralph Loop: Rebrand Phase 3 - Content & Blog Pipeline

## Prerequisite
Verify Phase 1 and 2 are complete.

## Objective
Establish "Learning in Public" content strategy and blog infrastructure.

## Tasks

1. **About Page Restructure**
   - Lead with engineering credentials
   - Professional identity section
   - Technical approach section
   - Proof points (shipped systems, GitHub)

2. **Consulting Page Reframe**
   - "Engineering Consulting" positioning
   - Specific target audiences
   - Concrete service offerings
   - Proof from portfolio projects

3. **Blog Enhancement**
   - Minimum 3 substantive technical posts
   - Content pillars: Technical, AI/Human, Building, Reflections
   - "Learning in public" framing

4. **Git Activity Integration** (if feasible)
   - "This week I shipped" section
   - GitHub contribution display

## Verification Checklist
- [ ] About page leads with engineering identity
- [ ] Consulting page has specific audiences and services
- [ ] At least 3 technical blog posts exist
- [ ] Blog has clear technical/builder focus
- [ ] Terminal aesthetic consistent across all pages

## Completion
When ALL verification items pass, output:
<promise>PHASE 3 CONTENT COMPLETE</promise>
```

**Command:**
```bash
/ralph-loop "Execute rebrand Phase 3 - Content & Blog. Read .claude/prompts/rebrand/phase-3-content.md for full instructions." --completion-promise "PHASE 3 CONTENT COMPLETE" --max-iterations 25
```

---

### Phase 4: Terminal Polish (Iterations: max 30)

**Prompt File:** `.claude/prompts/rebrand/phase-4-polish.md`

```markdown
# Ralph Loop: Rebrand Phase 4 - Terminal Polish

## Prerequisite
Verify Phases 1-3 are complete.

## Objective
Add terminal-specific flourishes and keyboard navigation.

## Tasks

1. **Keyboard Navigation**
   - Install hotkeys-js or implement custom
   - Shortcuts: g h (home), g p (portfolio), g b (blog), g c (consulting), g a (about)
   - `/` for search focus (if search exists)
   - `?` for help overlay
   - `j/k` for scroll

2. **Terminal UI Elements**
   - `$ ` prompts before section headers
   - Cursor blink animations
   - Command-line style navigation hints
   - Current page indicator: `> page-name`

3. **Easter Eggs** (optional)
   - Konami code
   - `vim` command in console
   - Hidden ASCII art

4. **Theme Switcher** (stretch)
   - Tokyo Night / Catppuccin variants
   - Persist preference

## Verification Checklist
- [ ] Keyboard shortcuts functional
- [ ] Help overlay shows all shortcuts
- [ ] Terminal styling elements present
- [ ] No accessibility regressions
- [ ] All previous phase work intact

## Completion
When ALL verification items pass, output:
<promise>PHASE 4 POLISH COMPLETE - REBRAND FINISHED</promise>
```

**Command:**
```bash
/ralph-loop "Execute rebrand Phase 4 - Terminal Polish. Read .claude/prompts/rebrand/phase-4-polish.md for full instructions." --completion-promise "PHASE 4 POLISH COMPLETE - REBRAND FINISHED" --max-iterations 30
```

---

## Responsive Design

### Mobile Considerations

All rebrand changes must maintain mobile responsiveness:

```
BREAKPOINTS
├── sm: 640px   - Stack cards, reduce padding
├── md: 768px   - Two-column grids
├── lg: 1024px  - Full layout
└── xl: 1280px  - Max content width

MOBILE KEYBOARD NAV
├── Disable vim-style shortcuts on touch devices
├── Show touch-friendly navigation instead
└── Help overlay adapts to touch interface

TERMINAL AESTHETIC ON MOBILE
├── Reduce ASCII art size or hide
├── Maintain monospace headers
├── Simplify hover states to tap states
└── Keep color palette consistent
```

---

## Animation Specifications

### Typewriter Effect (Hero)
```css
.typewriter {
  overflow: hidden;
  border-right: 2px solid var(--accent-cyan);
  white-space: nowrap;
  animation:
    typing 2s steps(40, end),
    blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: var(--accent-cyan) }
}
```

### Card Hover Glow
```css
.card {
  border: 1px solid var(--bg-tertiary);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 0 20px rgba(125, 207, 255, 0.1);
}
```

### Link Hint Flash (Keyboard Nav)
```css
.link-hint {
  background: var(--accent-orange);
  color: var(--bg-primary);
  padding: 2px 4px;
  font-family: var(--font-mono);
  font-size: 12px;
  animation: hint-flash 0.3s ease;
}
```

---

## Success Metrics

### Phase Completion Tracking

| Phase | Prompt | Promise | Max Iter | Status |
|-------|--------|---------|----------|--------|
| 1 | Foundation | `PHASE 1 FOUNDATION COMPLETE` | 15 | Pending |
| 2 | Portfolio | `PHASE 2 PORTFOLIO COMPLETE` | 20 | Pending |
| 3 | Content | `PHASE 3 CONTENT COMPLETE` | 25 | Pending |
| 4 | Polish | `PHASE 4 POLISH COMPLETE - REBRAND FINISHED` | 30 | Pending |

### Quality Metrics

- **Color Consistency:** 100% of components use CSS variables
- **Typography Adherence:** All headers monospace, body sans-serif
- **Mobile Score:** Lighthouse mobile score >= 90
- **Accessibility:** No WCAG AA violations introduced
- **Performance:** No significant bundle size increase

### Business Metrics (Post-Launch)

- Inbound engineering inquiries (vs consulting)
- Blog traffic growth
- GitHub profile visits from site
- "Found through blog" leads

---

## Future Enhancements

### Post-Rebrand Ralph Loops

1. **Content Generation Loop**
   ```bash
   /ralph-loop "Generate technical blog post about [topic]. Must include code examples, be 1000+ words, and match the site's terminal aesthetic." --completion-promise "BLOG POST COMPLETE" --max-iterations 10
   ```

2. **Component Polish Loop**
   ```bash
   /ralph-loop "Review and polish the [component]. Ensure terminal aesthetic, accessibility, and mobile responsiveness." --completion-promise "COMPONENT POLISHED" --max-iterations 8
   ```

3. **Automated Weekly Shipping Summary**
   ```bash
   /ralph-loop "Generate 'This Week I Shipped' blog post from git commits in the past 7 days. Include code snippets and learnings." --completion-promise "WEEKLY SUMMARY COMPLETE" --max-iterations 5
   ```

### Technical Debt Cleanup Loop
```bash
/ralph-loop "Identify and fix technical debt in [area]. Must not break existing functionality." --completion-promise "DEBT CLEARED" --max-iterations 15
```

---

## Appendix: Quick Reference

### Starting the Rebrand

```bash
# Phase 1
/ralph-loop "Execute rebrand Phase 1 - Foundation. Read .claude/prompts/rebrand/phase-1-foundation.md" --completion-promise "PHASE 1 FOUNDATION COMPLETE" --max-iterations 15

# After Phase 1 completes, Phase 2
/ralph-loop "Execute rebrand Phase 2 - Portfolio Enhancement. Read .claude/prompts/rebrand/phase-2-portfolio.md" --completion-promise "PHASE 2 PORTFOLIO COMPLETE" --max-iterations 20

# Continue sequentially...
```

### Canceling a Stuck Loop

```bash
/cancel-ralph
```

### Checking Progress

Review `.claude/rebrand-progress.md` (create during Phase 1) for overall status.

---

## File Structure

```
.claude/
├── prompts/
│   └── rebrand/
│       ├── phase-1-foundation.md
│       ├── phase-2-portfolio.md
│       ├── phase-3-content.md
│       └── phase-4-polish.md
├── rebrand-progress.md          # Overall progress tracker
└── .ralph-loop.local.md         # Active loop state (auto-managed)

docs/specs/
└── 005-ralph-wiggum-rebrand-integration.prd.md  # This document

oceanheart-rebrand-spec.md       # Source rebrand specification
```
