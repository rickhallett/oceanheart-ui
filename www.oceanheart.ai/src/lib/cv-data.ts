/**
 * Structured CV data for the Interactive Agentic Resume
 *
 * This module provides the "unflattened" context behind resume bullet points,
 * enabling the AI agent to give detailed, evidence-based answers about experience.
 */

// =============================================================================
// Type Definitions
// =============================================================================

export interface CVContext {
  /** The problem or challenge faced */
  situation: string;
  /** The approach taken to solve it */
  methodology: string;
  /** Key takeaways and insights */
  lessonsLearned: string;
  /** Optional technical implementation details */
  technicalDetails?: string;
}

export interface CVExperience {
  id: string;
  role: string;
  company: string;
  companyDescription?: string;
  period: string;
  bullets: string[];
  /** The "unflattened" story behind the bullet points */
  context: CVContext;
  techStack: string[];
  /** Highlight this experience in the UI */
  highlight?: boolean;
}

export type SkillCategory = "agentic" | "core" | "moderate" | "gap";

export interface CVSkill {
  name: string;
  category: SkillCategory;
  /** Optional description, especially for gaps to explain honestly */
  description?: string;
}

export interface CVEducation {
  degree: string;
  institution: string;
  year: number;
}

export interface CVContact {
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface PsychologyBackground {
  years: number;
  title: string;
  description: string;
  /** How this background applies to engineering work */
  relevance: string;
  /** Specific examples of CBT-to-engineering transfer */
  engineeringApplications: string[];
}

export interface AgenticProject {
  name: string;
  description: string;
  technicalDetails: string;
  techStack: string[];
}

export interface CVData {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  contact: CVContact;
  experiences: CVExperience[];
  skills: CVSkill[];
  psychologyBackground: PsychologyBackground;
  education: CVEducation[];
  agenticPortfolio: AgenticProject[];
  /** Keywords that indicate strong fit in job descriptions */
  strongFitKeywords: string[];
  /** Keywords that indicate weak fit in job descriptions */
  weakFitKeywords: string[];
}

// =============================================================================
// CV Data
// =============================================================================

export const cvData: CVData = {
  name: "Richard Hallett",
  title: "AI-Augmented Software Engineer",
  tagline:
    "I build production systems where humans orchestrate AI agents rather than write every line.",

  summary: `Software Engineer operating at the frontier of AI-augmented development. Building production systems where humans orchestrate AI agents rather than write every line. 4 years enterprise experience (React/TypeScript, Python), combined with 15 years as a Cognitive Behavioural Therapist—expertise in structured reasoning, communication, and human-AI collaboration patterns. Currently shipping multi-agent workflows daily using Claude Code as my primary development methodology.`,

  contact: {
    email: "rickhallett@icloud.com",
    linkedin: "linkedin.com/in/richardhallett86",
    github: "github.com/rickhallett",
    portfolio: "oceanheart.ai/portfolio",
  },

  // ===========================================================================
  // Professional Experience with Unflattened Context
  // ===========================================================================

  experiences: [
    {
      id: "oceanheart",
      role: "Founder & AI Systems Engineer",
      company: "Oceanheart.ai",
      companyDescription: "AI-augmented development studio and personal platform",
      period: "Apr 2024 – Present",
      highlight: true,
      bullets: [
        "Built multi-agent orchestration systems using Claude Code, including automated job application pipelines with parser generation, match analysis, and document export",
        "Designed context-engineered workflows solving the 'context rot' problem through external persistence via file-based state, PRDs, and git commits",
        "Implemented agentic loops for autonomous task completion with acceptance criteria validation",
        "Created reusable prompt architectures for consistent agent behaviour across domains",
        "Shipped client websites (Next.js, Astro) with custom CMS and AI-powered features",
      ],
      context: {
        situation: `Building AI applications revealed a critical limitation: context window constraints create 'context rot' where agents lose track of prior decisions mid-task. A 200k token window sounds large until you're orchestrating a multi-step pipeline that needs to remember decisions made 50 steps ago.`,

        methodology: `Implemented file-based state management that mirrors how humans work:
- PRDs as source of truth (the agent reads the spec before each task)
- Git commits as memory checkpoints (agent can review what it decided previously)
- External files for agent context persistence (task lists, decision logs, acceptance criteria)
- Structured handoff protocols between agent sessions

The key insight: treat the context window as working memory, not long-term storage. External files become the agent's "notes."`,

        lessonsLearned: `The architecture shift from 'in-context memory' to 'external persistence' mirrors how humans use documentation. AI agents need the same scaffolding we do—they can't hold everything in their head either.

This also revealed that prompt engineering is really "context engineering"—controlling what information the agent has access to at each decision point matters more than clever instructions.`,

        technicalDetails: `Job Application Orchestration System (multi-stage pipeline):

1. HTML Parsing Stage
   - Agent generates custom parsers for each job board (WTTJ, Lever, etc.)
   - Parser validates against schema before proceeding
   - Failed parses trigger regeneration with error context

2. Match Scoring Stage
   - CV-to-JD compatibility analysis
   - Extracts requirements, maps to experience
   - Outputs structured match report with evidence

3. CV Tailoring Stage
   - Dynamic content optimization based on match report
   - Preserves factual accuracy while emphasizing relevance
   - Validates no hallucinated experience added

4. Cover Letter Generation Stage
   - Context-aware drafting using match report
   - Company research integration
   - Tone calibration based on company culture signals

5. PDF Export Stage
   - Professional document rendering
   - Consistent formatting across outputs
   - Version tracking for iteration

Each stage validates against acceptance criteria before proceeding. The system is designed to fail fast and surface issues rather than propagate errors.`,
      },
      techStack: [
        "Claude Code",
        "Multi-agent orchestration",
        "Next.js",
        "Astro",
        "Python",
        "File-based state management",
        "Kernel MCP",
      ],
    },

    {
      id: "edited",
      role: "Software Engineer",
      company: "EDITED",
      companyDescription: "AI-driven retail analytics SaaS platform",
      period: "Nov 2023 – Mar 2024",
      highlight: false,
      bullets: [
        "Developed React/TypeScript features for AI-driven retail analytics SaaS platform",
        "Built data visualisation components enabling clients to interpret ML insights",
        "Partnered with backend engineers (Python/Django) to optimize API integrations",
      ],
      context: {
        situation: `Joined a mature SaaS platform that used ML for retail price optimization and market analysis. The challenge was building frontend features that made complex ML outputs actionable for non-technical retail buyers.`,

        methodology: `Focused on translating ML model outputs into intuitive visualizations. Worked closely with data scientists to understand what the models were actually predicting, then designed UI patterns that surfaced the most actionable insights without overwhelming users with data.

Key approach: every visualization needed to answer "what should I do?" not just "what does the data show?"`,

        lessonsLearned: `Enterprise ML products have a "last mile" problem—the model can be excellent, but if the interface doesn't translate predictions into decisions, the value is lost.

Also learned the importance of API design for frontend performance. Worked with Django backend team to optimize endpoints specifically for the visualization patterns we needed, rather than accepting generic data shapes.`,
      },
      techStack: ["React", "TypeScript", "Python", "Django", "Data visualization"],
    },

    {
      id: "brandwatch",
      role: "Software Engineer",
      company: "Brandwatch",
      companyDescription: "Enterprise social media analytics platform",
      period: "Jun 2021 – Nov 2023",
      highlight: false,
      bullets: [
        "Contributed to enterprise data visualisation platform (Monitor project) serving millions of users",
        "Built scalable React components while modernising legacy Backbone codebase",
        "Mentored junior developers and facilitated knowledge-sharing sessions",
      ],
      context: {
        situation: `Brandwatch's Monitor product was a large-scale data visualization platform built on aging Backbone.js. The codebase served millions of users but needed modernization without disrupting service. My role spanned both feature development and gradual migration to React.`,

        methodology: `Adopted a "strangler fig" pattern for modernization—new features in React, gradual replacement of Backbone components, careful attention to not breaking existing functionality.

For mentoring, developed a structured approach: weekly 1:1s focused on specific learning goals, code review as teaching opportunity, and documentation of patterns for team-wide benefit.`,

        lessonsLearned: `The mentoring experience directly informs how I now work with AI agents. Junior developers and LLMs share similar needs: clear context, defined constraints, explicit acceptance criteria, and review feedback that explains the "why" not just the "what."

Teaching humans to code taught me how to teach machines to code.`,
      },
      techStack: ["React", "TypeScript", "Backbone.js", "Enterprise scale"],
    },

    {
      id: "telesoft",
      role: "Full Stack Engineer",
      company: "Telesoft",
      companyDescription: "Cybersecurity applications",
      period: "Sep 2020 – Feb 2021",
      highlight: false,
      bullets: [
        "Delivered secure features for cybersecurity applications (TypeScript, Angular, Node.js)",
        "Built Python utilities for data processing and automation",
      ],
      context: {
        situation: `Telesoft builds cybersecurity tools for network monitoring and threat detection. The work required attention to security at every layer—from input validation to data handling to access control.`,

        methodology: `Security-first development: threat modeling before implementation, input validation as a non-negotiable, principle of least privilege for all data access. Built automation tools in Python to handle large-scale data processing for threat analysis.`,

        lessonsLearned: `Cybersecurity work instilled habits that transfer to AI development: never trust input (including from AI), validate at boundaries, assume adversarial conditions. These principles now inform how I design agent guardrails.`,
      },
      techStack: ["TypeScript", "Angular", "Node.js", "Python", "Security"],
    },

    {
      id: "sbs",
      role: "Software Developer",
      company: "School Business Services Ltd",
      companyDescription: "Financial management software for schools",
      period: "Mar 2019 – Mar 2020",
      highlight: false,
      bullets: [
        "Created Vue.js frontend features for school financial management software",
        "Applied psychology expertise to simplify complex workflows and improve usability",
      ],
      context: {
        situation: `First software development role after transitioning from therapy. The product was financial management software used by school administrators—people who needed to complete complex tasks but weren't technical users.`,

        methodology: `Drew heavily on psychology background to understand user mental models. Conducted informal usability research, redesigned workflows to match how users actually thought about their tasks rather than how the system was architected.`,

        lessonsLearned: `This role crystallized the connection between therapy skills and software development. Understanding how people think, reducing cognitive load, clear communication—these transfer directly.

Also learned Vue.js, which gave me a different perspective on component architecture compared to React.`,
      },
      techStack: ["Vue.js", "JavaScript", "UX design"],
    },
  ],

  // ===========================================================================
  // Skills Matrix with Honest Categorization
  // ===========================================================================

  skills: [
    // Agentic Stack (jade) - The differentiator
    {
      name: "Agent Orchestration (Claude Code)",
      category: "agentic",
      description: "Daily practice shipping multi-agent workflows",
    },
    {
      name: "Context Engineering",
      category: "agentic",
      description: "Designing what information agents have at each decision point",
    },
    {
      name: "Prompt Architecture",
      category: "agentic",
      description: "Reusable prompt patterns for consistent agent behaviour",
    },
    {
      name: "File-based State Management",
      category: "agentic",
      description: "External persistence for agent memory beyond context windows",
    },
    {
      name: "Agentic Loop Design",
      category: "agentic",
      description: "Autonomous task completion with validation gates",
    },
    {
      name: "LLM API Integration",
      category: "agentic",
      description: "Claude, OpenAI API integration with streaming",
    },

    // Core Stack (ocean-blue) - Solid foundation
    {
      name: "React",
      category: "core",
      description: "4+ years, including enterprise scale at Brandwatch",
    },
    {
      name: "TypeScript",
      category: "core",
      description: "Primary language for frontend and Node.js",
    },
    {
      name: "Python",
      category: "core",
      description: "Automation, data processing, backend services",
    },
    {
      name: "Node.js",
      category: "core",
      description: "API development, tooling, serverless functions",
    },
    {
      name: "Next.js",
      category: "core",
      description: "App Router, Server Components, API routes",
    },
    {
      name: "SQL",
      category: "core",
      description: "PostgreSQL, SQLite, query optimization",
    },
    {
      name: "Git",
      category: "core",
      description: "Version control, branching strategies, CI/CD",
    },
    {
      name: "Docker",
      category: "core",
      description: "Containerization for development and deployment",
    },

    // Moderate (zinc) - Can work with, not primary strength
    {
      name: "Vue.js",
      category: "moderate",
      description: "Production experience, prefer React",
    },
    {
      name: "Angular",
      category: "moderate",
      description: "Project experience at Telesoft",
    },
    {
      name: "Django",
      category: "moderate",
      description: "Collaborated with Django backends",
    },
    {
      name: "AWS/Cloud",
      category: "moderate",
      description: "Vercel primary, AWS exposure",
    },

    // Gaps (transparent) - Honest about what I don't do
    {
      name: "Legacy Java/C#",
      category: "gap",
      description: "Not my focus area—greenfield AI development preferred",
    },
    {
      name: "On-premise Infrastructure",
      category: "gap",
      description: "Cloud-native approach, limited on-prem experience",
    },
    {
      name: "Large Team Management",
      category: "gap",
      description: "Mentored individuals, haven't managed teams of 10+",
    },
    {
      name: "Mobile Development",
      category: "gap",
      description: "Web-focused, no native iOS/Android",
    },
  ],

  // ===========================================================================
  // Psychology Background
  // ===========================================================================

  psychologyBackground: {
    years: 15,
    title: "Cognitive Behavioural Therapist",
    description: `15 years as a Cognitive Behavioural Therapist. This isn't just "soft skills"—it's structured problem decomposition, clear communication under uncertainty, and understanding how humans collaborate with systems.`,

    relevance: `Directly applicable to prompt engineering, agent behaviour design, and building AI tools that actually help people. CBT is fundamentally about changing thought patterns through structured intervention—which is exactly what prompt engineering does for AI.`,

    engineeringApplications: [
      "Structured Problem Decomposition: CBT breaks complex problems into manageable components with clear intervention points. I apply this same approach to system architecture and agent workflow design.",

      "Communication Under Uncertainty: Therapy involves navigating ambiguous situations with limited information. This transfers to working with stakeholders, debugging unclear issues, and designing for edge cases.",

      "Prompt Engineering as Cognitive Restructuring: CBT changes thought patterns through careful questioning and reframing. Prompt engineering is the same skill applied to AI—guiding the model's 'thinking' through structured input.",

      "Human-Centered Design: Understanding how people actually think (not how they should think) is core to both therapy and UX. I design AI interfaces that match human mental models.",

      "Rubric-Driven Assessment: Clinical assessment uses structured rubrics to evaluate progress. I apply this to AI output validation—clear criteria, consistent measurement, actionable feedback.",
    ],
  },

  // ===========================================================================
  // Education
  // ===========================================================================

  education: [
    {
      degree: "PGDip Cognitive Behavioural Therapy",
      institution: "Royal Holloway, University of London",
      year: 2015,
    },
    {
      degree: "PGCert Cognitive Behavioural Therapy",
      institution: "University of Central Lancashire",
      year: 2013,
    },
    {
      degree: "BSc Psychology",
      institution: "University of the West of England",
      year: 2008,
    },
  ],

  // ===========================================================================
  // Agentic Development Portfolio
  // ===========================================================================

  agenticPortfolio: [
    {
      name: "Job Application Orchestration System",
      description:
        "Multi-stage pipeline for automated job applications with agent-driven parser generation",
      technicalDetails: `Five-stage pipeline: HTML parsing → match scoring → CV tailoring → cover letter generation → PDF export. Each stage validates against acceptance criteria. Parser generation is itself agentic—Claude writes extraction logic for each job board format.`,
      techStack: ["Claude Code", "Python", "File-based state", "PDF generation"],
    },
    {
      name: "Browser Automation Agents",
      description:
        "WTTJ/Lever application automation via Kernel MCP with pattern matching",
      technicalDetails: `Browser automation using Kernel MCP for reliable web interaction. Pattern matching handles dynamic form fields across different ATS platforms. Includes retry logic and error recovery.`,
      techStack: ["Kernel MCP", "Browser automation", "Pattern matching"],
    },
    {
      name: "Technical Test Designer Agent",
      description:
        "Multi-domain challenge generation with rubric-driven difficulty calibration",
      technicalDetails: `Generates technical assessments across React/TS, Python, SQL, and Docker. Uses rubric-driven difficulty calibration to ensure consistent challenge levels. Includes automated evaluation criteria generation.`,
      techStack: ["Claude Code", "Multi-domain", "Rubric design"],
    },
  ],

  // ===========================================================================
  // Fit Assessment Keywords
  // ===========================================================================

  strongFitKeywords: [
    "AI",
    "LLM",
    "agent",
    "agentic",
    "Claude",
    "GPT",
    "orchestration",
    "prompt engineering",
    "context engineering",
    "React",
    "TypeScript",
    "Python",
    "Next.js",
    "greenfield",
    "startup",
    "AI-augmented",
    "automation",
    "NLP",
    "conversational AI",
    "full-stack",
    "frontend",
  ],

  weakFitKeywords: [
    "Java",
    "C#",
    ".NET",
    "legacy",
    "maintenance",
    "on-premise",
    "COBOL",
    "mainframe",
    "Kubernetes at scale",
    "SRE",
    "DevOps lead",
    "team of 10+",
    "native mobile",
    "iOS",
    "Android",
    "embedded",
    "firmware",
  ],
};

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: SkillCategory): CVSkill[] {
  return cvData.skills.filter((skill) => skill.category === category);
}

/**
 * Get highlighted experiences
 */
export function getHighlightedExperiences(): CVExperience[] {
  return cvData.experiences.filter((exp) => exp.highlight);
}

/**
 * Get experience by ID
 */
export function getExperienceById(id: string): CVExperience | undefined {
  return cvData.experiences.find((exp) => exp.id === id);
}

/**
 * Get full context for an experience (formatted for display)
 */
export function getFormattedContext(experienceId: string): string | null {
  const experience = getExperienceById(experienceId);
  if (!experience) return null;

  const { context } = experience;
  let formatted = `## The Situation\n${context.situation}\n\n`;
  formatted += `## The Approach\n${context.methodology}\n\n`;
  formatted += `## What I Learned\n${context.lessonsLearned}`;

  if (context.technicalDetails) {
    formatted += `\n\n## Technical Details\n\`\`\`\n${context.technicalDetails}\n\`\`\``;
  }

  return formatted;
}

/**
 * Get a summary of all skills for the AI agent context
 */
export function getSkillsSummary(): string {
  const agentic = getSkillsByCategory("agentic")
    .map((s) => s.name)
    .join(", ");
  const core = getSkillsByCategory("core")
    .map((s) => s.name)
    .join(", ");
  const moderate = getSkillsByCategory("moderate")
    .map((s) => s.name)
    .join(", ");
  const gaps = getSkillsByCategory("gap")
    .map((s) => `${s.name} (${s.description})`)
    .join(", ");

  return `
AGENTIC STACK (Primary Differentiator): ${agentic}

CORE ENGINEERING: ${core}

MODERATE PROFICIENCY: ${moderate}

HONEST GAPS: ${gaps}
`.trim();
}

/**
 * Check if a job description is likely a strong fit
 */
export function assessFitFromKeywords(jobDescription: string): {
  strongMatches: string[];
  weakMatches: string[];
  score: number;
} {
  const jdLower = jobDescription.toLowerCase();

  const strongMatches = cvData.strongFitKeywords.filter((keyword) =>
    jdLower.includes(keyword.toLowerCase())
  );

  const weakMatches = cvData.weakFitKeywords.filter((keyword) =>
    jdLower.includes(keyword.toLowerCase())
  );

  // Simple scoring: strong matches add points, weak matches subtract
  const score = Math.max(
    0,
    Math.min(100, 50 + strongMatches.length * 10 - weakMatches.length * 15)
  );

  return { strongMatches, weakMatches, score };
}
