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
    if (isLocal) return 'https://preflight.lvh.me:3444'
    return `https://preflight.${config.domainName}`
  }

  // Fallback: standard subdomain
  return `https://${appSubdomain}.${config.domainName}`
}

// Centralized portfolio data so both list and details pages share one source.
export const portfolioSections: PortfolioSection[] = [
  {
    id: "apps",
    title: "Product Apps",
    description: "Subdomain-hosted applications in the Oceanheart portfolio.",
    hidden: false,
    projects: [
      {
        id: 100,
        title: "Flowstate",
        description:
          "Focus and performance companion. Explore the live app hosted at flowstate.oceanheart.ai.",
        image: "/images/flowstate-card.png",
        tech: ["Next.js", "Supabase", "TypeScript", "Tailwind"],
        externalUrl: resolveAppUrl('flowstate'),
        featured: true,
      },
      {
        id: 101,
        title: "Preflight",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/preflight-card.png",
        tech: ["Next.js", "TypeScript", "Supabase"],
        externalUrl: resolveAppUrl('preflight'),
        featured: true,
      },
      {
        id: 102,
        title: "Therapy Vis",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        image: "/images/lines.webp",
        tech: ["React", "D3.js", "TypeScript"],
        featured: true,
      },
      {
        id: 103,
        title: "Saigo Leaderboard",
        description:
          "Live practice tracking and leaderboard system for the White Dragon competition. Features real-time analytics, progress visualization, and comprehensive performance metrics.",
        image: "/images/saigo_2.webp",
        tech: ["Next.js", "TypeScript", "SWR", "Recharts", "Supabase"],
        externalUrl: `https://${config.domainName}/saigo/leaderboard`,
      },
      {
        id: 104,
        title: "Lorem Ipsum Project",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
        image: "/images/unimon.webp",
        tech: ["Next.js", "TypeScript"],
      },
    ],
  },
  // Existing sections below
  {
    id: "integrations",
    title: "System Integrations",
    description:
      "Connecting disparate systems to automate workflows and reduce manual processes. Built for scalability, handling high-volume data synchronization across healthcare platforms.",
    projects: [
      {
        id: 1,
        title: "Lorem Ipsum Integration",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        image: "/images/robosec.webp",
        tech: ["Next.js", "Supabase", "TypeScript", "API"],
      },
      {
        id: 2,
        title: "Dolore Magna Data Bridge",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "/images/particles.webp",
        tech: ["Node.js", "PostgreSQL", "APIs", "Data Processing"],
      },
      {
        id: 3,
        title: "Consectetur Tracker",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/images/saigo_2.webp",
        tech: ["React", "Database", "WebSockets", "Charts"],
      },
      {
        id: 4,
        title: "Adipiscing Analytics",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
        image: "/images/saigo_3.webp",
        tech: ["TypeScript", "D3.js", "Redis", "GraphQL"],
      },
      {
        id: 5,
        title: "Tempor Sync Engine",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "/images/saigo_4.webp",
        tech: ["Node.js", "Message Queue", "Docker", "Microservices"],
      },
    ],
    hidden: true,
  },
  {
    id: "behavioral-psychology",
    title: "Behavioral Psychology Applications",
    description:
      "AI applications leveraging evidence-based psychological principles for therapeutic contexts. Designed to enhance session effectiveness through personalized, adaptive interactions.",
    hidden: true,
    projects: [
      {
        id: 200,
        title: "Flowstate",
        description:
          "Focus and performance companion. Explore the live app hosted at flowstate.oceanheart.ai.",
        image: "/images/flowstate-card.png",
        tech: ["Next.js", "Supabase", "TypeScript", "Tailwind"],
        externalUrl: resolveAppUrl('flowstate'),
      },
      {
        id: 4,
        title: "Voluptate AI Assistant",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        image: "/images/hands.jpeg",
        tech: ["Python", "AI", "Analysis", "React"],
      },
      {
        id: 5,
        title: "Labore Pattern Analyzer",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "/images/universe.jpg",
        tech: ["Python", "Machine Learning", "Visualization", "Database"],
      },
      {
        id: 6,
        title: "Dolore Practice App",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/images/spirit_book.png",
        tech: ["React Native", "Backend", "Audio", "Analytics"],
      },
      {
        id: 7,
        title: "Magna Recognition System",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
        image: "/images/rosetta.jpg",
        tech: ["Python", "Computer Vision", "ML", "API"],
      },
      {
        id: 8,
        title: "Aliqua Bias Detector",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "/images/greece_profile1.jpeg",
        tech: ["Machine Learning", "NLP", "Web Framework", "Database"],
      },
    ],
  },
  {
    id: "ai-literacy",
    title: "AI Literacy & Training",
    description:
      "Interactive education tools and curriculum designed to build AI literacy in clinical and organizational settings. Emphasis on safety, interpretability, and ethical design.",
    hidden: true,
    projects: [
      {
        id: 9,
        title: "Eiusmod Literacy Toolkit",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        image: "/images/abstract_shapes.png",
        tech: ["Next.js", "Content", "Auth", "Tracking"],
      },
      {
        id: 10,
        title: "Incididunt AI Visualizer",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "/images/lines.webp",
        tech: ["D3.js", "Three.js", "WebGL", "Framework"],
      },
      {
        id: 11,
        title: "Cupidatat Training Simulator",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/images/hands.jpeg",
        tech: ["Unity", "Builder", "Tracking", "System"],
      },
    ],
  },
  {
    id: "data-visualization",
    title: "Data Visualization",
    description: 
      "Interactive dashboards and visualization tools that transform complex datasets into actionable insights. Built for scalability and real-time performance.",
    projects: [],
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile applications focused on user experience and performance. Designed for both iOS and Android platforms.",
    projects: [],
  },
  {
    id: "research-projects",
    title: "Research & Experiments",
    description:
      "Experimental projects and research initiatives exploring emerging technologies, novel approaches, and innovative solutions.",
    projects: [
      {
        id: 300,
        title: "HDI",
        description:
          "Mysterious experimental interface exploring human-digital integration. Features dynamic terminal emulation, interactive countdown, and evolving definitions of what HDI represents.",
        image: "/images/abstract_shapes.png",
        tech: ["Next.js", "Framer Motion", "TypeScript", "Terminal UI"],
        externalUrl: `https://${config.domainName}/hdi`,
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

export function getFeaturedProjects(limit = 3) {
  const all = getAllProjects().filter((p) => p.featured)
  // Ensure at most `limit` items and stable order by section then id
  return all
    .sort((a, b) => (a.sectionId.localeCompare(b.sectionId) || a.id - b.id))
    .slice(0, limit)
}
