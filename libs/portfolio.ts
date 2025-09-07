export type PortfolioProject = {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
}

export type PortfolioSection = {
  id: string
  title: string
  description: string
  projects: PortfolioProject[]
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
    id: "integrations",
    title: "System Integrations",
    description:
      "Connecting disparate systems to automate workflows and reduce manual processes. Built for scalability, handling high-volume data synchronization across healthcare platforms.",
    projects: [
      {
        id: 1,
        title: "Oceanheart API Integration",
        description:
          "Full-stack Next.js platform connecting therapy tools with AI services. Automates session prep workflows that typically take 30 minutes, handles 100+ concurrent API calls with Supabase backend.",
        image: "/images/robosec.webp",
        tech: ["Next.js", "Supabase", "OpenAI API", "Stripe"],
      },
      {
        id: 2,
        title: "Healthcare Data Bridge",
        description:
          "HIPAA-compliant Node.js system processing EHR data through FHIR standards. Transforms 20+ page medical records into structured summaries, handles patient data for 500+ providers.",
        image: "/images/particles.webp",
        tech: ["Node.js", "PostgreSQL", "Healthcare APIs", "FHIR"],
      },
      {
        id: 3,
        title: "Saigo Practice Tracker",
        description:
          "React-based gamification system with real-time WebSocket leaderboards. Tracks 15+ skill metrics per session, stores 10K+ practice attempts in SQLite with sub-100ms response times.",
        image: "/images/saigo_2.webp",
        tech: ["React", "SQLite", "WebSockets", "Recharts"],
      },
      {
        id: 4,
        title: "Therapy Session Analytics",
        description:
          "TypeScript analytics engine with D3.js visualizations processing session data. Generates trend analysis across 50+ therapeutic indicators, renders interactive charts from 1M+ data points.",
        image: "/images/saigo_3.webp",
        tech: ["TypeScript", "D3.js", "Redis", "GraphQL"],
      },
      {
        id: 5,
        title: "Multi-Platform Sync Engine",
        description:
          "Microservices architecture using Kafka for real-time data synchronization. Connects 5+ healthcare platforms, processes 10K+ daily transactions with sub-500ms latency across distributed systems.",
        image: "/images/saigo_4.webp",
        tech: ["Node.js", "Kafka", "Docker", "Microservices"],
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
        id: 4,
        title: "Mindful AI Assistant",
        description:
          "Python-based AI assistant using OpenAI API with sentiment analysis. Processes 8 emotional states, adapts communication across 12 therapeutic modalities with context-aware response generation.",
        image: "/images/hands.jpeg",
        tech: ["Python", "OpenAI", "Sentiment Analysis", "React"],
      },
      {
        id: 5,
        title: "Behavioral Pattern Analyzer",
        description:
          "TensorFlow machine learning system analyzing behavioral data patterns. Processes 50+ behavioral indicators per session, identifies recurring patterns across 90-day therapeutic timelines.",
        image: "/images/universe.jpg",
        tech: ["Python", "TensorFlow", "Data Visualization", "PostgreSQL"],
      },
      {
        id: 6,
        title: "Contemplative Practice App",
        description:
          "React Native cross-platform app with Firebase backend for contemplative practices. Tracks 20+ mindfulness metrics, supports offline audio processing for 100+ guided sessions.",
        image: "/images/spirit_book.png",
        tech: ["React Native", "Firebase", "Audio Processing", "Analytics"],
      },
      {
        id: 7,
        title: "Emotion Recognition System",
        description:
          "Computer vision system using OpenCV and Transformers for emotion detection. Analyzes facial expressions at 30fps, processes text sentiment with 95% accuracy across 7 emotional categories.",
        image: "/images/rosetta.jpg",
        tech: ["Python", "OpenCV", "Transformers", "FastAPI"],
      },
      {
        id: 8,
        title: "Cognitive Bias Detector",
        description:
          "scikit-learn NLP system identifying 15+ cognitive distortions in patient communications. Processes therapeutic text with NLTK, flags bias patterns across 500+ session transcripts.",
        image: "/images/greece_profile1.jpeg",
        tech: ["scikit-learn", "NLTK", "Flask", "PostgreSQL"],
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
        title: "AI Literacy Toolkit",
        description:
          "Web-based learning platform for clinicians and staff. Includes interactive lessons, case studies, and guided exercises; supports 50+ learners concurrently with granular progress tracking.",
        image: "/images/abstract_shapes.png",
        tech: ["Next.js", "MDX", "Auth", "Progress Tracking"],
      },
      {
        id: 10,
        title: "Explainable AI Visualizer",
        description:
          "D3.js visualization suite demonstrating explainability techniques (SHAP, LIME, attention maps). Real-time sliders to manipulate model inputs and instantly observe impact on predictions.",
        image: "/images/lines.webp",
        tech: ["D3.js", "Three.js", "WebGL", "Educational Framework"],
      },
      {
        id: 11,
        title: "AI Safety Training Simulator",
        description:
          "Unity 3D immersive training environment with custom scenario builder. Simulates 30+ safety scenarios, tracks decision-making patterns, provides certification pathways for clinical staff.",
        image: "/images/hands.jpeg",
        tech: ["Unity", "Scenario Builder", "Progress Tracking", "Certification System"],
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

