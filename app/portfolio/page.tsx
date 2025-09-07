import Image from "next/image";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import PortfolioCarousel from "@/components/PortfolioCarousel";

export const metadata = getSEOTags({
  title: `Portfolio | ${config.appName}`,
  description: "Human-centered Software Engineer with 6 years technical experience + 15 years psychotherapy expertise. Working prototypes demonstrating measurable business impact and technical excellence.",
  canonicalUrlRelative: "/portfolio",
});

// Portfolio project data
const portfolioSections = [
  {
    id: "integrations",
    title: "System Integrations",
    description: "Connecting disparate systems to automate workflows and reduce manual processes. Built for scalability, handling high-volume data synchronization across healthcare platforms.",
    projects: [
      {
        id: 1,
        title: "Oceanheart API Integration",
        description: "Full-stack Next.js platform connecting therapy tools with AI services. Automates session prep workflows that typically take 30 minutes, handles 100+ concurrent API calls with Supabase backend.",
        image: "/images/robosec.webp",
        tech: ["Next.js", "Supabase", "OpenAI API", "Stripe"]
      },
      {
        id: 2,
        title: "Healthcare Data Bridge",
        description: "HIPAA-compliant Node.js system processing EHR data through FHIR standards. Transforms 20+ page medical records into structured summaries, handles patient data for 500+ providers.",
        image: "/images/particles.webp", 
        tech: ["Node.js", "PostgreSQL", "Healthcare APIs", "FHIR"]
      },
      {
        id: 3,
        title: "Saigo Practice Tracker",
        description: "React-based gamification system with real-time WebSocket leaderboards. Tracks 15+ skill metrics per session, stores 10K+ practice attempts in SQLite with sub-100ms response times.",
        image: "/images/saigo_2.webp",
        tech: ["React", "SQLite", "WebSockets", "Recharts"]
      },
      {
        id: 4,
        title: "Therapy Session Analytics",
        description: "TypeScript analytics engine with D3.js visualizations processing session data. Generates trend analysis across 50+ therapeutic indicators, renders interactive charts from 1M+ data points.",
        image: "/images/saigo_3.webp",
        tech: ["TypeScript", "D3.js", "Redis", "GraphQL"]
      },
      {
        id: 5,
        title: "Multi-Platform Sync Engine",
        description: "Microservices architecture using Kafka for real-time data synchronization. Connects 5+ healthcare platforms, processes 10K+ daily transactions with sub-500ms latency across distributed systems.",
        image: "/images/saigo_4.webp",
        tech: ["Node.js", "Kafka", "Docker", "Microservices"]
      }
    ]
  },
  {
    id: "behavioral-psychology",
    title: "Behavioral Psychology Applications",
    description: "AI applications leveraging evidence-based psychological principles for therapeutic contexts. Designed to enhance session effectiveness through personalized, adaptive interactions.",
    projects: [
      {
        id: 4,
        title: "Mindful AI Assistant",
        description: "Python-based AI assistant using OpenAI API with sentiment analysis. Processes 8 emotional states, adapts communication across 12 therapeutic modalities with context-aware response generation.",
        image: "/images/hands.jpeg",
        tech: ["Python", "OpenAI", "Sentiment Analysis", "React"]
      },
      {
        id: 5,
        title: "Behavioral Pattern Analyzer",
        description: "TensorFlow machine learning system analyzing behavioral data patterns. Processes 50+ behavioral indicators per session, identifies recurring patterns across 90-day therapeutic timelines.",
        image: "/images/universe.jpg",
        tech: ["Python", "TensorFlow", "Data Visualization", "PostgreSQL"]
      },
      {
        id: 6,
        title: "Contemplative Practice App",
        description: "React Native cross-platform app with Firebase backend for contemplative practices. Tracks 20+ mindfulness metrics, supports offline audio processing for 100+ guided sessions.",
        image: "/images/spirit_book.png",
        tech: ["React Native", "Firebase", "Audio Processing", "Analytics"]
      },
      {
        id: 7,
        title: "Emotion Recognition System",
        description: "Computer vision system using OpenCV and Transformers for emotion detection. Analyzes facial expressions at 30fps, processes text sentiment with 95% accuracy across 7 emotional categories.",
        image: "/images/rosetta.jpg",
        tech: ["Python", "OpenCV", "Transformers", "FastAPI"]
      },
      {
        id: 8,
        title: "Cognitive Bias Detector",
        description: "scikit-learn NLP system identifying 15+ cognitive distortions in patient communications. Processes therapeutic text with NLTK, flags bias patterns across 500+ session transcripts.",
        image: "/images/greece_profile1.jpeg",
        tech: ["scikit-learn", "NLTK", "Flask", "PostgreSQL"]
      }
    ]
  },
  {
    id: "ai-literacy",
    title: "AI Literacy & Training",
    description: "Educational platforms and assessment tools designed to accelerate AI literacy in healthcare settings. Focused on safe, ethical AI integration with comprehensive training modules.",
    projects: [
      {
        id: 7,
        title: "AI Ethics Simulator",
        description: "Vue.js interactive scenario engine with 25+ ethical decision trees. Simulates complex therapeutic situations, tracks choice patterns across 8 ethical frameworks with branching narratives.",
        image: "/images/phoneagent.jpg",
        tech: ["Vue.js", "Scenario Engine", "Decision Trees", "Analytics"]
      },
      {
        id: 8,
        title: "Prompt Engineering Workshop",
        description: "Next.js educational platform with live OpenAI API integration. Features 50+ hands-on exercises, real-time prompt testing, progress tracking across 12 therapeutic use cases.",
        image: "/images/hbi_transparent.webp",
        tech: ["Next.js", "OpenAI API", "Interactive Tutorials", "Progress Tracking"]
      },
      {
        id: 9,
        title: "AI Integration Readiness Tool",
        description: "React assessment platform evaluating organizational AI readiness across 40+ criteria. Generates detailed reports, risk matrices, and implementation roadmaps for healthcare organizations.",
        image: "/images/phonelock.webp",
        tech: ["React", "Assessment Engine", "Report Generation", "Data Export"]
      },
      {
        id: 10,
        title: "Interactive AI Model Explorer",
        description: "WebGL-powered D3.js visualization system demystifying 15+ AI model types. Features interactive 3D neural network representations, real-time parameter adjustment, and concept mapping.",
        image: "/images/logo_v1.png",
        tech: ["D3.js", "Three.js", "WebGL", "Educational Framework"]
      },
      {
        id: 11,
        title: "AI Safety Training Simulator",
        description: "Unity 3D immersive training environment with custom scenario builder. Simulates 30+ safety scenarios, tracks decision-making patterns, provides certification pathways for clinical staff.",
        image: "/images/hands.jpeg",
        tech: ["Unity", "Scenario Builder", "Progress Tracking", "Certification System"]
      }
    ]
  }
];

export default function PortfolioPage() {
  return (
    <main className="bg-base-100">
      {/* Hero Section */}
      <section className="pt-20 px-4 sm:px-8 max-w-7xl mx-auto text-center mb-16">
        <div className="mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-primary font-semibold text-sm">Human-centered Software Engineer</span>
          </div>
        </div>
        <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
          <span className="">6 Years</span> Engineering + <span className="">15 Years</span> Psychotherapy
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl opacity-90 mx-auto mb-8 leading-relaxed">
            <span className="font-semibold text-primary">Working prototypes</span> that solve real business problems.<br/>
            <span className="font-semibold text-secondary">Measurable ROI</span> through human-centered design.<br/>
            <span className="font-semibold text-accent">Technical excellence</span> proven by 20+ deployed applications.<br/>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-base-200 p-6 rounded-lg">
              <div className="text-primary font-bold text-2xl mb-2">20+</div>
              <div className="text-sm opacity-80">Apps Deployed</div>
            </div>
            <div className="bg-base-200 p-6 rounded-lg">
              <div className="text-secondary font-bold text-2xl mb-2">15+</div>
              <div className="text-sm opacity-80">Years Psychology</div>
            </div>
            <div className="bg-base-200 p-6 rounded-lg">
              <div className="text-accent font-bold text-2xl mb-2">6</div>
              <div className="text-sm opacity-80">Modern tech stacks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20 pb-20">
        {portfolioSections.map((section, index) => (
          <section key={section.id} className="space-y-8">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="font-bold text-3xl md:text-4xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {section.title}
              </h2>
              <p className="text-lg text-base-content/80 max-w-3xl mx-auto leading-relaxed">
                {section.description}
              </p>
            </div>
            
            {/* Carousel */}
            <PortfolioCarousel 
              projects={section.projects} 
              sectionId={section.id}
              isReversed={index % 2 === 1}
            />
          </section>
        ))}
      </div>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-neutral to-neutral-focus text-neutral-content py-20 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center p-8 bg-black/20 backdrop-blur-sm rounded-xl">
          <h2 className="font-bold text-3xl md:text-4xl mb-6">
            Ready to <span className="text-primary italic">drive results</span>?
          </h2>
          <p className="mb-8 text-lg md:text-xl leading-relaxed">
            <span className="font-semibold">For hiring teams:</span> See a human-centered engineer who delivers technical excellence with proven business impact.<br/>
            <span className="font-semibold text-secondary">For clients:</span> Get measurable ROI through psychology-informed software that solves real problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-wide btn-lg hover:scale-105 transition-transform"
            >
              Schedule a Call
            </a>
            <a
              href="/about"
              className="btn btn-outline btn-wide btn-lg hover:scale-105 transition-transform"
            >
              Learn More About Me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}