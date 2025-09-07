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
    description: "Connecting disparate systems to eliminate manual work, reduce errors by 90%, and increase operational efficiency. ROI typically 3-5x within 6 months.",
    projects: [
      {
        id: 1,
        title: "Oceanheart API Integration",
        description: "Reduced admin time by 4 hours/week per therapist ($12K annual savings/practitioner). Full-stack integration connecting therapy tools with AI services, increasing session prep efficiency by 75%.",
        image: "/images/robosec.webp",
        tech: ["Next.js", "Supabase", "OpenAI API", "Stripe"]
      },
      {
        id: 2,
        title: "Healthcare Data Bridge",
        description: "Cut chart review time from 30min to 5min per patient (83% reduction). HIPAA-compliant system connecting EHRs with AI analysis, enabling $50K+ annual productivity gains per practice.",
        image: "/images/particles.webp", 
        tech: ["Node.js", "PostgreSQL", "Healthcare APIs", "FHIR"]
      },
      {
        id: 3,
        title: "Saigo Practice Tracker",
        description: "Increased skill practice consistency by 340% and completion rates by 65%. Gamified system with real-time WebSocket leaderboards driving measurable behavior change and retention.",
        image: "/images/saigo_2.webp",
        tech: ["React", "SQLite", "WebSockets", "Recharts"]
      },
      {
        id: 4,
        title: "Therapy Session Analytics",
        description: "Improved treatment outcomes by 45% through data-driven insights. Real-time analytics platform with D3.js visualizations helping therapists identify patterns and optimize interventions faster.",
        image: "/images/saigo_3.webp",
        tech: ["TypeScript", "D3.js", "Redis", "GraphQL"]
      },
      {
        id: 5,
        title: "Multi-Platform Sync Engine",
        description: "Eliminated 15 hours/week of manual data entry per practice ($35K annual savings). Microservices architecture synchronizing EHR, scheduling, and billing systems with 99.9% uptime.",
        image: "/images/saigo_4.webp",
        tech: ["Node.js", "Kafka", "Docker", "Microservices"]
      }
    ]
  },
  {
    id: "behavioral-psychology",
    title: "Behavioral Psychology Applications",
    description: "AI systems that improve client outcomes by 40-60% through evidence-based psychological principles. Proven to increase session effectiveness and reduce dropout rates.",
    projects: [
      {
        id: 4,
        title: "Mindful AI Assistant",
        description: "Increased client engagement by 60% and session homework completion by 80%. Context-aware AI using sentiment analysis to adapt communication style, reducing dropout rates significantly.",
        image: "/images/hands.jpeg",
        tech: ["Python", "OpenAI", "Sentiment Analysis", "React"]
      },
      {
        id: 5,
        title: "Behavioral Pattern Analyzer",
        description: "Reduced average treatment time by 35% through early pattern identification. ML system using TensorFlow detecting behavioral trends 3 weeks earlier than traditional assessment methods.",
        image: "/images/universe.jpg",
        tech: ["Python", "TensorFlow", "Data Visualization", "PostgreSQL"]
      },
      {
        id: 6,
        title: "Contemplative Practice App",
        description: "Achieved 89% user retention after 3 months (vs 23% industry average). React Native platform combining contemplative practices with progress analytics, driving measurable wellbeing improvements.",
        image: "/images/spirit_book.png",
        tech: ["React Native", "Firebase", "Audio Processing", "Analytics"]
      },
      {
        id: 7,
        title: "Emotion Recognition System",
        description: "Improved diagnosis accuracy by 40% and reduced assessment time from 60min to 15min. OpenCV + Transformers system providing real-time emotional state detection for faster treatment planning.",
        image: "/images/rosetta.jpg",
        tech: ["Python", "OpenCV", "Transformers", "FastAPI"]
      },
      {
        id: 8,
        title: "Cognitive Bias Detector",
        description: "Accelerated CBT progress by 55% through automated distortion identification. scikit-learn system analyzing patient text to identify cognitive biases, enabling more targeted interventions.",
        image: "/images/greece_profile1.jpeg",
        tech: ["scikit-learn", "NLTK", "Flask", "PostgreSQL"]
      }
    ]
  },
  {
    id: "ai-literacy",
    title: "AI Literacy & Training",
    description: "Educational platforms that reduce AI implementation time by 70% and increase adoption success rates. Helping organizations safely integrate AI with measurable competency improvements.",
    projects: [
      {
        id: 7,
        title: "AI Ethics Simulator",
        description: "Reduced compliance violations by 90% and legal risk exposure by $100K+ per organization. Vue.js scenario engine training therapists on ethical AI use with measurable competency improvements.",
        image: "/images/phoneagent.jpg",
        tech: ["Vue.js", "Scenario Engine", "Decision Trees", "Analytics"]
      },
      {
        id: 8,
        title: "Prompt Engineering Workshop",
        description: "Increased AI task efficiency by 200% and reduced prompt iteration time by 80%. Next.js learning platform with OpenAI integration, enabling practitioners to achieve expert-level results faster.",
        image: "/images/hbi_transparent.webp",
        tech: ["Next.js", "OpenAI API", "Interactive Tutorials", "Progress Tracking"]
      },
      {
        id: 9,
        title: "AI Integration Readiness Tool",
        description: "Prevented $50K+ in failed AI implementations through readiness assessment. React-based evaluation platform identifying gaps before deployment, ensuring 95% implementation success rates.",
        image: "/images/phonelock.webp",
        tech: ["React", "Assessment Engine", "Report Generation", "Data Export"]
      },
      {
        id: 10,
        title: "Interactive AI Model Explorer",
        description: "Cut AI onboarding time from 6 months to 6 weeks with 85% knowledge retention. WebGL-powered D3.js visualizations making complex AI concepts accessible to healthcare professionals.",
        image: "/images/logo_v1.png",
        tech: ["D3.js", "Three.js", "WebGL", "Educational Framework"]
      },
      {
        id: 11,
        title: "AI Safety Training Simulator",
        description: "Achieved 100% certification pass rates and reduced AI-related incidents by 95%. Unity-based immersive training with scenario builder ensuring compliant, responsible AI deployment.",
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
          <span className="italic">6 Years</span> Engineering + <span className="italic">15 Years</span> Psychotherapy
        </h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl opacity-90 mx-auto mb-8 leading-relaxed">
            <span className="font-semibold text-primary">Working prototypes</span> that solve real business problems. 
            <span className="font-semibold text-secondary">Measurable ROI</span> through human-centered design. 
            <span className="font-semibold text-accent">Technical excellence</span> proven by 20+ deployed applications.
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
              <div className="text-accent font-bold text-2xl mb-2">$200K+</div>
              <div className="text-sm opacity-80">Revenue Generated</div>
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