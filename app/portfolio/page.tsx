import Image from "next/image";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import PortfolioCarousel from "@/components/PortfolioCarousel";

export const metadata = getSEOTags({
  title: `Portfolio | ${config.appName}`,
  description: "Explore my portfolio of projects spanning integrations, behavioral psychology applications, and AI literacy tools.",
  canonicalUrlRelative: "/portfolio",
});

// Portfolio project data
const portfolioSections = [
  {
    id: "integrations",
    title: "System Integrations",
    description: "Building bridges between platforms and services to create seamless workflows",
    projects: [
      {
        id: 1,
        title: "Oceanheart API Integration",
        description: "Complete API integration platform connecting therapy tools with AI services for enhanced clinical workflows.",
        image: "/images/robosec.webp",
        tech: ["Next.js", "Supabase", "OpenAI API", "Stripe"]
      },
      {
        id: 2,
        title: "Healthcare Data Bridge",
        description: "HIPAA-compliant integration system connecting electronic health records with AI analysis tools.",
        image: "/images/particles.webp", 
        tech: ["Node.js", "PostgreSQL", "Healthcare APIs", "FHIR"]
      },
      {
        id: 3,
        title: "Saigo Practice Tracker",
        description: "Gamified practice logging system with leaderboards and social features for skill development.",
        image: "/images/saigo_2.webp",
        tech: ["React", "SQLite", "WebSockets", "Recharts"]
      },
      {
        id: 4,
        title: "Therapy Session Analytics",
        description: "Real-time integration platform connecting session notes with outcome tracking and progress visualization tools.",
        image: "/images/saigo_3.webp",
        tech: ["TypeScript", "D3.js", "Redis", "GraphQL"]
      },
      {
        id: 5,
        title: "Multi-Platform Sync Engine",
        description: "Unified synchronization system connecting EHR, scheduling, billing, and communication platforms seamlessly.",
        image: "/images/saigo_4.webp",
        tech: ["Node.js", "Kafka", "Docker", "Microservices"]
      }
    ]
  },
  {
    id: "behavioral-psychology",
    title: "Behavioral Psychology",
    description: "Applications that leverage psychological principles for behavior change and mental health support",
    projects: [
      {
        id: 4,
        title: "Mindful AI Assistant",
        description: "Context-aware AI assistant that adapts communication style based on user's emotional state and therapeutic needs.",
        image: "/images/hands.jpeg",
        tech: ["Python", "OpenAI", "Sentiment Analysis", "React"]
      },
      {
        id: 5,
        title: "Behavioral Pattern Analyzer",
        description: "Machine learning tool that identifies behavioral patterns from user interactions to support therapeutic interventions.",
        image: "/images/universe.jpg",
        tech: ["Python", "TensorFlow", "Data Visualization", "PostgreSQL"]
      },
      {
        id: 6,
        title: "Contemplative Practice App",
        description: "Digital platform combining ancient wisdom traditions with modern psychology for personal development.",
        image: "/images/spirit_book.png",
        tech: ["React Native", "Firebase", "Audio Processing", "Analytics"]
      },
      {
        id: 7,
        title: "Emotion Recognition System",
        description: "Computer vision and NLP system that detects emotional states from text and facial expressions for therapeutic insights.",
        image: "/images/rosetta.jpg",
        tech: ["Python", "OpenCV", "Transformers", "FastAPI"]
      },
      {
        id: 8,
        title: "Cognitive Bias Detector",
        description: "Machine learning tool that identifies cognitive distortions in patient communications to support CBT interventions.",
        image: "/images/greece_profile1.jpeg",
        tech: ["scikit-learn", "NLTK", "Flask", "PostgreSQL"]
      }
    ]
  },
  {
    id: "ai-literacy",
    title: "AI Literacy Tools",
    description: "Educational platforms and tools to help professionals understand and integrate AI effectively",
    projects: [
      {
        id: 7,
        title: "AI Ethics Simulator",
        description: "Interactive scenarios helping therapists understand ethical implications of AI in clinical practice.",
        image: "/images/phoneagent.jpg",
        tech: ["Vue.js", "Scenario Engine", "Decision Trees", "Analytics"]
      },
      {
        id: 8,
        title: "Prompt Engineering Workshop",
        description: "Educational platform teaching effective AI communication through hands-on prompt engineering exercises.",
        image: "/images/hbi_transparent.webp",
        tech: ["Next.js", "OpenAI API", "Interactive Tutorials", "Progress Tracking"]
      },
      {
        id: 9,
        title: "AI Integration Readiness Tool",
        description: "Assessment platform helping organizations evaluate their readiness for AI adoption in therapeutic contexts.",
        image: "/images/phonelock.webp",
        tech: ["React", "Assessment Engine", "Report Generation", "Data Export"]
      },
      {
        id: 10,
        title: "Interactive AI Model Explorer",
        description: "Visual learning platform that demystifies different AI models and their applications in healthcare settings.",
        image: "/images/logo_v1.png",
        tech: ["D3.js", "Three.js", "WebGL", "Educational Framework"]
      },
      {
        id: 11,
        title: "AI Safety Training Simulator",
        description: "Immersive scenarios teaching responsible AI use, bias detection, and ethical decision-making in clinical environments.",
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
        <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
          Portfolio: <span className="italic">Building the Future</span> of Therapy Tech
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl opacity-90 mx-auto mb-8 leading-relaxed">
            Explore a curated collection of projects that bridge <span className="font-semibold text-primary">artificial intelligence</span>, 
            <span className="font-semibold text-secondary"> behavioral psychology</span>, and <span className="font-semibold text-accent">systems integration</span>. 
            Each project represents a step toward more <span className="italic">conscious, effective</span> technology in therapeutic practice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-base-200 p-6 rounded-lg">
              <div className="text-primary font-bold text-2xl mb-2">11</div>
              <div className="text-sm opacity-80">Projects Showcased</div>
            </div>
            <div className="bg-base-200 p-6 rounded-lg">
              <div className="text-secondary font-bold text-2xl mb-2">3</div>
              <div className="text-sm opacity-80">Core Specializations</div>
            </div>
            <div className="bg-base-200 p-6 rounded-lg">
              <div className="text-accent font-bold text-2xl mb-2">15+</div>
              <div className="text-sm opacity-80">Technologies Used</div>
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
            Ready to <span className="text-primary italic">collaborate</span>?
          </h2>
          <p className="mb-8 text-lg md:text-xl leading-relaxed">
            Whether you need <span className="font-semibold">system integrations</span>, 
            <span className="font-semibold text-secondary"> behavioral insights</span>, or 
            <span className="font-semibold text-accent"> AI literacy training</span>, 
            let's discuss how we can work together to bring your vision to life.
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