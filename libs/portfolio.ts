export type PortfolioProject = {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
  externalUrl?: string
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

// Centralized portfolio data so both list and details pages share one source.
export const portfolioSections: PortfolioSection[] = [
  {
    id: "apps",
    title: "Product Apps",
    description: "Subdomain-hosted applications in the Oceanheart portfolio.",
    hidden: true,
    projects: [
      {
        id: 100,
        title: "Flowstate",
        description:
          "Focus and performance companion. Explore the live app hosted at flowstate.oceanheart.ai.",
        image: "/images/keyboard.webp",
        tech: ["Next.js", "Supabase", "TypeScript", "Tailwind"],
        externalUrl: "https://flowstate.oceanheart.ai",
      },
      {
        id: 101,
        title: "Preflight",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "/images/psychedelicmind.avif",
        tech: ["Next.js", "TypeScript", "Supabase"],
      },
      {
        id: 102,
        title: "Therapy Vis",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        image: "/images/lines.webp",
        tech: ["React", "D3.js", "TypeScript"],
      },
      {
        id: 103,
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
  },
  {
    id: "behavioral-psychology",
    title: "Behavioral Psychology Applications",
    description:
      "AI applications leveraging evidence-based psychological principles for therapeutic contexts. Designed to enhance session effectiveness through personalized, adaptive interactions.",
    projects: [
      {
        id: 200,
        title: "Flowstate",
        description:
          "Focus and performance companion. Explore the live app hosted at flowstate.oceanheart.ai.",
        image: "/images/keyboard.webp",
        tech: ["Next.js", "Supabase", "TypeScript", "Tailwind"],
        externalUrl: "https://flowstate.oceanheart.ai",
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
]

export function getAllProjects() {
  return portfolioSections.flatMap((section) =>
    section.projects.map((p) => ({
      sectionId: section.id,
      slug: makeProjectSlug(section.id, p.title),
      sectionTitle: section.title,
      ...p,
    }))
  )
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((p) => p.slug === slug)
}
