export type PortfolioProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  externalUrl?: string;
  featured?: boolean;
  githubRepo?: string; // Format: owner/repo
  githubBranch?: string; // Optional, defaults to main
  category: "apps" | "websites" | "integrations" | "research";
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
        id: 101,
        title: "Preflight",
        description:
          "[Prototype - Phase 1] An assessment engine for clinicians exploring AI adoption. Current build showcases the JSON form system and design language. Next milestones: authentication, analytics dashboard, and adaptive coaching logic.",
        image: "/images/preflight-gpt.png",
        tech: ["Next.js", "FastAPI", "Pydantic", "MongoDB"],
        externalUrl: "https://preflight.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/preflight.oceanheart.ai",
        githubBranch: "main",
        category: "apps",
      },
      {
        id: 102,
        title: "Watson",
        description:
          "[UI Scaffold] A collaborative review interface for practitioners to classify and label LLM outputs. Live demo highlights the editing surface and data schema. Next milestones: real-time diff engine and export pipeline.",
        image: "/images/watson-gpt.png",
        tech: ["Next.js", "Django", "Postgres", "TipTap"],
        externalUrl: "https://watson.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/watson.oceanheart.ai",
        githubBranch: "main",
        category: "apps",
      },
      {
        id: 110,
        title: "Sidekick",
        description:
          "[Early Build] A reflective chat environment for meditation practice. This release demonstrates the Nuxt stack, streaming chat UI, and state management. Next milestones: memory layer and personalised coaching prompts.",
        image: "/images/sidekick-gpt.png",
        tech: ["Nuxt 4", "Postgres", "Drizzle ORM", "Tailwind"],
        externalUrl: "https://sidekick.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/sidekick.oceanheart.ai",
        githubBranch: "main",
        category: "apps",
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
          "[Live Production] A brutalist activism website for the Swanage Traffic Alliance. Built with Astro SSR, featuring real-time data visualizations, live visit tracking, and Decap CMS integration. Deployed on Vercel with Neon PostgreSQL database.",
        image: "/images/sta-home.png",
        tech: ["Astro", "React", "Neon PostgreSQL", "Decap CMS", "Vercel"],
        externalUrl: "https://www.swanagetraffic.org.uk",
        featured: true,
        githubRepo: "rickhallett/stadotcouk",
        githubBranch: "main",
        category: "websites",
      },
      {
        id: 109,
        title: "Becoming Diamond",
        description:
          "[Live Production] A premium coaching and personal development platform. Built with Next.js 15, featuring Aceternity UI components, 3D visualizations, member portal with protected routes, and GitHub OAuth integration via Decap CMS.",
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
        id: 107,
        title: "Passport",
        description:
          "[Core Service Prototype] Centralised authentication for the Oceanheart ecosystem. Current version provides multi-tenant routing and Supabase auth. Next milestones: SSO and encrypted profile hand-off between apps.",
        image: "/images/passport-gpt.png",
        tech: ["Rails", "Hotwire", "Stimulus"],
        externalUrl: "https://passport.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/passport.oceanheart.ai",
        githubBranch: "main",
        category: "integrations",
      },
      {
        id: 105,
        title: "Notebook",
        description:
          "[v0.1] A minimalist, markdown-first blog for learning in public. Stable core with Go/HTMX engine. Next milestones: tagging, RSS, and publishing pipeline.",
        image: "/images/notebook-gpt.png",
        tech: ["Go", "HTMX", "SQLite"],
        externalUrl: "https://notebook.oceanheart.ai",
        featured: true,
        githubRepo: "rickhallett/notebook.oceanheart.ai",
        githubBranch: "main",
        category: "integrations",
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
          "[Concept] Mobile-first exposure hierarchy builder for ERP therapy. Current prototype demonstrates drag-and-drop ladder editing. Next milestones: clinician-client sync, contracts, and PDF export functionality.",
        image: "/images/exposurelab-gpt.png",
        tech: ["Next.js", "Neon", "Tailwind"],
        featured: true,
        category: "research",
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
