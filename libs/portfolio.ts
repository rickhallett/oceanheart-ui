import config from "@/config";

export type PortfolioProject = {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
  externalUrl?: string
  featured?: boolean
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

// Resolve an app's base URL depending on environment
// - Local dev: prefer lvh.me URLs surfaced via NEXT_PUBLIC_* envs
// - Prod: subdomain on the configured domain
function resolveAppUrl(appSubdomain: string) {
  // Heuristic: when NEXT_PUBLIC_SITE_URL points to lvh.me/localhost, treat as local
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const isLocal = Boolean(siteUrl && /(localhost|\.lvh\.me)/.test(siteUrl))

  if (appSubdomain === 'accounts') {
    if (isLocal && siteUrl) return siteUrl.replace(/\/$/, '')
    return `https://accounts.${config.domainName}`
  }

  if (appSubdomain === 'flowstate') {
    // For local, prefer explicit default return-to if provided (points at flowstate dev origin)
    const dev = process.env.NEXT_PUBLIC_DEFAULT_RETURN_TO?.replace(/\/$/, '')
    if (isLocal && dev) return dev
    return `https://flowstate.${config.domainName}`
  }

  if (appSubdomain === 'preflight') {
    // Local dev: conventional lvh.me host/port used in this repo's docs/env
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    const isLocal = Boolean(siteUrl && /(localhost|\.lvh\.me)/.test(siteUrl))
    if (isLocal) return 'http://preflight.lvh.me:3444'
    return `https://preflight.${config.domainName}`
  }

  if (appSubdomain === 'notebook') {
    if (isLocal) return 'http://notebook.lvh.me:8080'
    return `https://notebook.oceanheart.ai`
  }

  if (appSubdomain === 'watson') {
    if (isLocal) return 'http://watson.lvh.me:8080'
    return `https://watson-oceanheart-ai.fly.dev/`
  }

  if (appSubdomain === 'passport') {
    if (isLocal) return 'http://passport.lvh.me:5555'
    return `https://passport.oceanheart.ai`
  }

  if (appSubdomain === 'exposurelab') {
    return "#"
  }

  // Fallback: standard subdomain
  return `https://${appSubdomain}.${config.domainName}`
}

// Centralized portfolio data so both list and details pages share one source.
export const portfolioSections: PortfolioSection[] = [
  {
    id: "apps",
    title: "Product Apps",
    description: "Production-ready (or aspiring) applications in the Oceanheart portfolio, designed for clinical and well-being professionals.",
    hidden: false,
    projects: [
      {
        id: 101,
        title: "Preflight",
        description:
          "An AI readiness survey and coaching demo for clinicians and well-being professionals. Built with a JSON-driven form engine and a conversational LLM pipeline, it showcases both technical design and human-centred UX.",
        image: "/images/preflight-gpt.png",
        tech: ["SvelteKit", "FastAPI", "Pydantic", "MongoDB", "LangChain"],
        externalUrl: resolveAppUrl('preflight'),
        featured: true,
      },
      {
        id: 102,
        title: "Watson",
        description:
          "A clinical review tool that lets practitioners edit, classify, and label LLM outputs. Submissions generate structured diffs and basic analytics, with exports for research and iteration.",
        image: "/images/watson-gpt.png",
        tech: ["Django", "Postgres", "TipTap"],
        externalUrl: resolveAppUrl('watson'),
        featured: true,
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
          "A central authentication system for all Oceanheart applications. Built with Next.js, Supabase, and Tailwind.",
        image: "/images/passport-gpt.png",
        tech: ["Rails", "Hotwire", "Stimulus"],
        externalUrl: resolveAppUrl("passport"),
        featured: true,
      },
      {
        id: 105,
        title: "Oceanheart Notebook",
        description:
          "A minimalist learn-in-public blog powered by Go, HTMX, and SQLite. Markdown-first, fast, and single-binary deploy.",
        image: "/images/notebook-gpt.png",
        tech: ["Go", "HTMX", "SQLite"],
        externalUrl: resolveAppUrl("notebook"),
        featured: true,
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
          "Mobile-first exposure hierarchy builder for ERP therapy. Features drag-and-drop ladder editing, clinician-client sync, contracts, and one-click PDF exports.",
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

    // Integrations section
    'integrations-passport': 'passport.md',
    'integrations-oceanheart-notebook': 'notebook.md',

    // Research projects section
    // 'research-projects-exposurelab': 'exposurelab.md', // TODO: Create documentation
  }

  return slugToDocMap[slug] || null
}
