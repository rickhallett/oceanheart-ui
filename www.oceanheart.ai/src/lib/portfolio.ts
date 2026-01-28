export type ProjectStatus = "production" | "prototype" | "experiment" | "archived";

export type PortfolioProject = {
  id: number;
  title: string;
  description: string;
  problem?: string; // One-sentence problem statement
  solution?: string; // One-sentence solution
  image: string;
  tech: string[];
  externalUrl?: string;
  featured?: boolean;
  githubRepo?: string; // Format: owner/repo
  githubBranch?: string; // Optional, defaults to main
  category: "apps" | "websites" | "integrations" | "research";
  status?: ProjectStatus; // Production, Prototype, Experiment
  impact?: string; // Impact metric if available
  currentlyBuilding?: boolean; // Is this actively being worked on
};

export type PortfolioSection = {
  id: string;
  title: string;
  description: string;
  projects: PortfolioProject[];
  hidden?: boolean;
};

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function makeProjectSlug(sectionId: string, title: string) {
  return `${sectionId}-${slugify(title)}`;
}

// Portfolio data adapted to The Kaishin Method website
export const portfolioSections: PortfolioSection[] = [
  {
    id: "apps",
    title: "Product Apps",
    description:
      "Live prototypes and design studies in various stages of development. Each is a working scaffold—follow their evolution from architecture demo to full product.",
    hidden: false,
    projects: [
      {
        id: 113,
        title: "SATI",
        description:
          "Session Analysis Training Intelligence - an AI meditation coach that classifies jhana practice obstacles against a taxonomy of 20+ antipatterns, with calibrated confidence scoring and safety guardrails.",
        problem: "Jhana practitioners struggle to identify why their practice isn't progressing, lacking accessible expert guidance on common obstacles.",
        solution: "A conversational AI that detects practice antipatterns from Jhourney's methodology, calibrates confidence with empirical multipliers, and provides targeted interventions.",
        image: "/images/sati-card.jpeg",
        tech: ["Next.js 15", "React 19", "Claude API", "Vercel AI SDK", "Turso SQLite", "Drizzle ORM"],
        externalUrl: "https://sati.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/koan",
        githubBranch: "main",
        category: "apps",
        status: "experiment",
        impact: "20+ antipatterns classified, 8 categories of practice obstacles",
        currentlyBuilding: true,
      },
      {
        id: 112,
        title: "Discovering Ben",
        description:
          "A groundbreaking research initiative documenting vicious reinforcement cycles in autism-LLM interactions. Analyzed 255 conversations revealing that 60-70% of interaction dysfunction originates from LLM responses, not user behavior.",
        problem: "Autistic users experience pathological interaction patterns with LLMs, but current research lacks quantitative evidence of whether dysfunction stems from users or system design.",
        solution: "A rigorous two-stage analysis pipeline combining quantitative regex detection with qualitative LLM semantic analysis, identifying 7 distinct interaction patterns and producing evidence-based system prompt interventions.",
        image: "/images/discovering-ben-card.jpeg",
        tech: ["Python", "Claude API", "MkDocs", "Regex Pattern Matching", "Parallel Agent Orchestration"],
        featured: true,
        githubRepo: "rickhallett/discovering-ben",
        githubBranch: "master",
        category: "apps",
        status: "prototype",
        impact: "255 conversations analyzed, 7 interaction patterns identified, 4 pathological cycles documented",
        currentlyBuilding: true,
      },
      {
        id: 101,
        title: "Preflight",
        description:
          "An assessment engine for clinicians exploring AI adoption. Current build showcases the JSON form system and design language.",
        problem: "Clinicians need structured ways to evaluate their readiness for AI integration.",
        solution: "A dynamic assessment engine that adapts questions based on responses and generates personalized adoption roadmaps.",
        image: "/images/preflight-gpt.png",
        tech: ["Next.js", "FastAPI", "Pydantic", "MongoDB"],
        externalUrl: "https://preflight.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/preflight.oceanheart.ai",
        githubBranch: "main",
        category: "apps",
        status: "prototype",
        currentlyBuilding: true,
      },
      {
        id: 102,
        title: "Watson",
        description:
          "A collaborative review interface for practitioners to classify and label LLM outputs with real-time diff tracking.",
        problem: "Teams reviewing AI outputs lack structured tools for classification and quality feedback.",
        solution: "A TipTap-powered editing surface with data schema for collaborative LLM output labeling.",
        image: "/images/watson-gpt.png",
        tech: ["Next.js", "Django", "Postgres", "TipTap"],
        externalUrl: "https://watson.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/watson.oceanheart.ai",
        githubBranch: "main",
        category: "apps",
        status: "prototype",
        currentlyBuilding: true,
      },
      {
        id: 110,
        title: "Sidekick",
        description:
          "A reflective chat environment for meditation practice with streaming responses and personalized coaching.",
        problem: "Meditation practitioners lack an AI companion that understands contemplative practice context.",
        solution: "A memory-enabled chat interface that provides contextual guidance grounded in meditation traditions.",
        image: "/images/sidekick-gpt.png",
        tech: ["Nuxt 4", "Postgres", "Drizzle ORM", "Tailwind"],
        externalUrl: "https://sidekick.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/sidekick.oceanheart.ai",
        githubBranch: "main",
        category: "apps",
        status: "experiment",
      },
      {
        id: 111,
        title: "Clockwork Hamlet",
        description:
          "A persistent AI village simulation where 10 autonomous agents with distinct personalities live, interact, and create emergent narratives.",
        problem: "AI simulations are typically scripted—real emergence requires autonomous agents making independent decisions.",
        solution: "10 LLM-powered agents with personalities, memory, and relationships creating unscripted drama in a virtual village.",
        image: "/images/clockwork-hamlet.png",
        tech: ["FastAPI", "React", "SQLite", "Claude API", "Docker", "SSE", "TypeScript"],
        externalUrl: "https://clockwork.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/clockwork-hamlet",
        githubBranch: "master",
        category: "apps",
        status: "experiment",
        currentlyBuilding: true,
      },
    ],
  },
  {
    id: "websites",
    title: "Featured Websites",
    description:
      "Premium client websites showcasing modern web architectures, design excellence, and production-grade delivery. Built with performance, accessibility, and user experience as core priorities.",
    hidden: false,
    projects: [
      {
        id: 108,
        title: "Swanage Traffic Alliance",
        description:
          "A brutalist activism website with real-time traffic data visualizations, live visit tracking, and community engagement tools.",
        problem: "A coastal town's traffic crisis needed a platform to unite residents and present data-driven advocacy.",
        solution: "A high-impact brutalist website with real-time traffic charts, visitor analytics, and CMS-powered news updates.",
        image: "/images/sta-home.png",
        tech: ["Astro", "React", "Neon PostgreSQL", "Decap CMS", "Vercel"],
        externalUrl: "https://www.swanagetraffic.org.uk",
        featured: true,
        githubRepo: "rickhallett/stadotcouk",
        githubBranch: "main",
        category: "websites",
        status: "production",
        impact: "500+ active community members",
      },
      {
        id: 109,
        title: "Becoming Diamond",
        description:
          "A premium coaching platform with 3D visualizations, member portal, and protected content delivery system.",
        problem: "A coaching business needed a sophisticated platform to deliver premium content and manage member access.",
        solution: "A Next.js 15 platform with Aceternity UI, 3D globe visualization, and GitHub OAuth authentication.",
        image: "/images/becoming-dia-globe2.png",
        tech: [
          "Next.js 15",
          "React 19",
          "Aceternity UI",
          "Decap CMS",
          "Vercel",
        ],
        externalUrl: "https://diamond.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/becoming-diamond-nextjs",
        githubBranch: "main",
        category: "websites",
        status: "production",
      },
    ],
  },
  {
    id: "integrations",
    title: "System Integrations",
    description:
      "Connecting disparate systems to automate workflows and reduce manual processes.",
    hidden: false,
    projects: [
      {
        id: 114,
        title: "wasp",
        description:
          "Security whitelist layer for agentic AI systems. Pre-inference filtering and tool-call interception to stop prompt injection attacks before they reach your agent.",
        problem: "Agentic AI systems have no filtering layer—any untrusted input could hijack your agent via prompt injection.",
        solution: "A trust-based whitelist that blocks unknown senders entirely and intercepts dangerous tool calls for limited-trust contacts.",
        image: "/images/wasp-card.png",
        tech: ["Bun", "SQLite", "TypeScript", "Hono", "Commander"],
        externalUrl: "https://wasp.xyz",
        featured: true,
        githubRepo: "rickhallett/wasp",
        githubBranch: "master",
        category: "integrations",
        status: "production",
        impact: "90+ tests, 210+ assertions, npm published",
        currentlyBuilding: true,
      },
      {
        id: 107,
        title: "Passport",
        description:
          "Centralised authentication service for the Oceanheart ecosystem with multi-tenant routing and SSO.",
        problem: "Multiple apps need shared authentication without duplicating user management logic.",
        solution: "A Rails-based auth service with Hotwire for real-time UI and encrypted profile hand-off between apps.",
        image: "/images/passport-gpt.png",
        tech: ["Rails", "Hotwire", "Stimulus"],
        externalUrl: "https://passport.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/passport.oceanheart.ai",
        githubBranch: "main",
        category: "integrations",
        status: "prototype",
      },
      {
        id: 105,
        title: "Notebook",
        description:
          "A minimalist, markdown-first blog engine built for learning in public with Go and HTMX.",
        problem: "Needed a fast, simple blog engine without JavaScript framework overhead.",
        solution: "A Go server with HTMX for interactivity and SQLite for persistence - ships as a single binary.",
        image: "/images/notebook-gpt.png",
        tech: ["Go", "HTMX", "SQLite"],
        externalUrl: "https://notebook.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/notebook.oceanheart.ai",
        githubBranch: "main",
        category: "integrations",
        status: "production",
      },
    ],
  },
  {
    id: "research-projects",
    title: "Research & Experiments",
    description:
      "Experimental projects and research initiatives exploring emerging technologies, novel approaches, and innovative solutions.",
    hidden: false,
    projects: [
      {
        id: 106,
        title: "ExposureLab",
        description:
          "Mobile-first exposure hierarchy builder for ERP therapy with drag-and-drop ladder editing.",
        problem: "Clinicians and clients need collaborative tools to build and track exposure therapy hierarchies.",
        solution: "A mobile-optimized interface for creating, ordering, and tracking exposure exercises with real-time sync.",
        image: "/images/exposurelab-gpt.png",
        tech: ["Next.js", "Neon", "Tailwind"],
        featured: true,
        category: "research",
        status: "experiment",
      },
    ],
  },
];

export function getAllProjects() {
  return portfolioSections
    .flatMap((section) =>
      section.projects.map((p) => ({
        sectionId: section.id,
        slug: makeProjectSlug(section.id, p.title),
        sectionTitle: section.title,
        hidden: section.hidden,
        ...p,
      }))
    )
    .filter((p) => !p.hidden);
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 6) {
  const all = getAllProjects().filter((p) => p.featured);
  return all
    .sort((a, b) => a.sectionId.localeCompare(b.sectionId) || a.id - b.id)
    .slice(0, limit);
}

export function getProjectsByCategory(category: PortfolioProject["category"]) {
  return getAllProjects().filter((p) => p.category === category);
}

export function getCurrentlyBuildingProjects() {
  return getAllProjects().filter((p) => p.currentlyBuilding);
}

export function getProjectsByStatus(status: ProjectStatus) {
  return getAllProjects().filter((p) => p.status === status);
}

export function getProductionProjects() {
  return getProjectsByStatus("production");
}

export function getPrototypeProjects() {
  return getProjectsByStatus("prototype");
}

export function getExperimentProjects() {
  return getProjectsByStatus("experiment");
}
