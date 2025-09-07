import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import { portfolioSections } from "@/libs/portfolio";

export const metadata = getSEOTags({
  title: `Portfolio | ${config.appName}`,
  description:
    "Human-centered Software Engineer with 6 years technical experience + 15 years psychotherapy expertise. Working prototypes demonstrating measurable business impact and technical excellence.",
  canonicalUrlRelative: "/portfolio",
});

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
            <span className="font-semibold text-primary">Working prototypes</span> that solve real business problems.<br />
            <span className="font-semibold text-secondary">Measurable ROI</span> through human-centered design.<br />
            <span className="font-semibold text-accent">Technical excellence</span> proven by 20+ deployed applications.<br />
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
            <PortfolioCarousel projects={section.projects} sectionId={section.id} isReversed={index % 2 === 1} />
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
            <span className="font-semibold">For hiring teams:</span> See a human-centered engineer who delivers technical excellence with proven business impact.<br />
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
            <a href="/about" className="btn btn-outline btn-wide btn-lg hover:scale-105 transition-transform">
              Learn More About Me
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

