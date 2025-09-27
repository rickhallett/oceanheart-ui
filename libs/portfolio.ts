import config from "@/config";

export type PortfolioProject = {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
  externalUrl?: string
  featured?: boolean
  githubRepo?: string // Format: owner/repo
  githubBranch?: string // Optional, defaults to main
}

export type PortfolioSection = {
  id: string
  title: string
  description: string
  projects: PortfolioProject[]
  hidden?: boolean
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function makeProjectSlug(sectionId: string, title: string) {
  return `${sectionId}-${slugify(title)}`
}

// Configuration-driven approach
const APP_PORTS = {
  sidekick: 3000,
  preflight: 3002,
  notebook: 3003,
  watson: 3001,
  passport: 5555,
  my: 3003,
  labs: 3004,
} as const;

const SPECIAL_CASES = {
  exposurelab: "#",
} as const;

type AppSubdomain = keyof typeof APP_PORTS | keyof typeof SPECIAL_CASES;

function isLocalEnvironment(): boolean {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return Boolean(siteUrl && /(localhost|\.lvh\.me)/.test(siteUrl));
}

function buildLocalUrl(subdomain: string, port: number): string {
  return `http://${subdomain}.lvh.me:${port}`;
}

function buildProductionUrl(subdomain: string): string {
  return `https://${subdomain}.${config.domainName}`;
}

function resolveAppUrl(appSubdomain: string): string {
  // Handle special cases first
  if (appSubdomain in SPECIAL_CASES) {
    return SPECIAL_CASES[appSubdomain as keyof typeof SPECIAL_CASES];
  }

  // Validate known app subdomains
  if (!(appSubdomain in APP_PORTS)) {
    console.warn(`Unknown app subdomain: ${appSubdomain}`);
    return buildProductionUrl(appSubdomain);
  }

  const port = APP_PORTS[appSubdomain as keyof typeof APP_PORTS];
  const isLocal = isLocalEnvironment();

  return isLocal 
    ? buildLocalUrl(appSubdomain, port)
    : buildProductionUrl(appSubdomain);
}

// Centralized portfolio data so both list and details pages share one source.
export const portfolioSections: PortfolioSection[] = [
  {
    id: "apps",
    title: "Product Apps",
    description: "Live prototypes and design studies in various stages of development. Each is a working scaffold—follow their evolution from architecture demo to full product.",
    hidden: false,
    projects: [
      {
        id: 101,
        title: "Preflight",
        description:
          "[Prototype - Phase 1] An assessment engine for clinicians exploring AI adoption. Current build showcases the JSON form system and design language. Next milestones: authentication, analytics dashboard, and adaptive coaching logic.",
        image: "/images/preflight-gpt.png",
        tech: ["Next.js", "FastAPI", "Pydantic", "MongoDB"],
        externalUrl: resolveAppUrl('preflight'),
        featured: true,
        githubRepo: "rickhallett/preflight.oceanheart.ai",
        githubBranch: "main",
      },
      {
        id: 102,
        title: "Watson",
        description:
          "[UI Scaffold] A collaborative review interface for practitioners to classify and label LLM outputs. Live demo highlights the editing surface and data schema. Next milestones: real-time diff engine and export pipeline.",
        image: "/images/watson-gpt.png",
        tech: ["Next.js", "Django", "Postgres", "TipTap"],
        externalUrl: resolveAppUrl('watson'),
        featured: true,
        githubRepo: "rickhallett/watson.oceanheart.ai",
        githubBranch: "main",
      },
      {
        id: 110,
        title: "Sidekick",
        description:
          "[Early Build] A reflective chat environment for meditation practice. This release demonstrates the Nuxt stack, streaming chat UI, and state management. Next milestones: memory layer and personalised coaching prompts.",
        image: "/images/sidekick-gpt.png",
        tech: ["Nuxt 4", "Postgres", "Drizzle ORM", "Tailwind"],
        externalUrl: resolveAppUrl("sidekick"),
        featured: true,
        githubRepo: "rickhallett/sidekick.oceanheart.ai",
        githubBranch: "main",
      }
      
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
        externalUrl: resolveAppUrl("passport"),
        featured: true,
        githubRepo: "rickhallett/passport.oceanheart.ai",
        githubBranch: "main",
      },
      {
        id: 105,
        title: "Notebook",
        description:
          "[v0.1] A minimalist, markdown-first blog for learning in public. Stable core with Go/HTMX engine. Next milestones: tagging, RSS, and publishing pipeline.",
        image: "/images/notebook-gpt.png",
        tech: ["Go", "HTMX", "SQLite"],
        externalUrl: resolveAppUrl("notebook"),
        featured: true,
        githubRepo: "rickhallett/notebook.oceanheart.ai",
        githubBranch: "main",
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
        // externalUrl: resolveAppUrl("exposurelab"),
        featured: true,
      },
    ],
  },
]

export function getAllProjects() {
  return portfolioSections.flatMap((section) =>
    section.projects.map((p) => ({
      sectionId: section.id,
      slug: makeProjectSlug(section.id, p.title),
      sectionTitle: section.title,
      hidden: section.hidden,
      ...p,
    }))
  ).filter((p) => !p.hidden)
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((p) => p.slug === slug)
}

export function getFeaturedProjects(limit = 5) {
  const all = getAllProjects().filter((p) => p.featured)
  // Ensure at most `limit` items and stable order by section then id
  return all
    .sort((a, b) => (a.sectionId.localeCompare(b.sectionId) || a.id - b.id))
    .slice(0, limit)
}

export function getMainFeaturedProjects() {
  // Return only Preflight and Sidekick for the main featured section
  return getAllProjects().filter((p) => 
    p.title === 'Preflight' || p.title === 'Sidekick'
  ).sort((a, b) => {
    // Ensure Preflight comes first, then Sidekick
    if (a.title === 'Preflight') return -1;
    if (b.title === 'Preflight') return 1;
    return 0;
  });
}

export function getLabProjects() {
  // Return Watson, Notebook, and Passport for the Labs section
  return getAllProjects().filter((p) => 
    p.title === 'Watson' || p.title === 'Notebook' || p.title === 'Passport'
  ).sort((a, b) => {
    // Order: Watson, Passport, Notebook
    const order = { 'Watson': 1, 'Passport': 2, 'Notebook': 3 };
    return (order[a.title as keyof typeof order] || 999) - (order[b.title as keyof typeof order] || 999);
  });
}

/**
 * Maps project slugs to their corresponding documentation files in docs/projects/
 * @param slug The project slug (e.g., "apps-watson")
 * @returns The markdown filename or null if no documentation exists
 */
export function getProjectDocumentationFile(slug: string): string | null {
  const slugToDocMap: Record<string, string> = {
    // Apps section
    'apps-preflight': 'preflight.md',
    'apps-watson': 'watson.md',
    'apps-sidekick': 'sidekick.md',

    // Integrations section
    'integrations-passport': 'passport.md',
    'integrations-oceanheart-notebook': 'notebook.md',

    // Research projects section
    // 'research-projects-exposurelab': 'exposurelab.md', // TODO: Create documentation
  }

  return slugToDocMap[slug] || null
}