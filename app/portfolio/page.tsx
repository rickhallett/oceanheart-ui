import { Suspense } from "react";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import FeaturedProjectsExpandable from "@/components/FeaturedProjectsExpandable";
import EnhancedBookTabs from "@/components/EnhancedBookTabs";
import { portfolioSections, getFeaturedProjects } from "@/libs/portfolio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Vortex } from "@/components/ui/vortex";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export const metadata = getSEOTags({
  title: `Portfolio | ${config.appName}`,
  description:
    "Human-centered Software Engineer with 6 years technical experience + 15 years psychotherapy expertise. Working prototypes demonstrating measurable business impact and technical excellence.",
  canonicalUrlRelative: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main className="bg-base-100">
        {/* Hero Section with Vortex Background */}
        <section className="relative mb-16 overflow-hidden">
          <Vortex
            backgroundColor="transparent"
            rangeY={800}
            particleCount={500}
            baseHue={120}
            className="flex items-center justify-center px-2 md:px-10 py-4 w-full h-full min-h-[600px]"
          >
            <div className="pt-20 px-4 sm:px-8 max-w-7xl mx-auto text-center">
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4 backdrop-blur-sm">
                  <span className="text-primary font-semibold text-sm">Human-centered Software Engineer</span>
                </div>
              </div>
              <div className="mb-8">
                <TextGenerateEffect 
                  words="6 Years Engineering + 15 Years Psychotherapy"
                  className="font-extrabold text-4xl md:text-6xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  duration={0.5}
                />
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl opacity-90 mx-auto mb-8 leading-relaxed">
                  <span className="font-semibold text-secondary/50">Working prototypes</span> that solve real business problems.<br />
                  <span className="font-semibold text-secondary/70">Measurable ROI</span> through human-centered design.<br />
                  <span className="font-semibold text-secondary/90">Technical excellence</span> proven by 20+ deployed applications.<br />
                </p>
              </div>
            </div>
          </Vortex>
        </section>
        {/* Featured Projects with Expandable Cards */}
        <FeaturedProjectsExpandable projects={getFeaturedProjects()} />

        {/* Portfolio Collection with Enhanced Tabs and Bento Grid */}
        <div className="pb-20">
          <EnhancedBookTabs sections={portfolioSections.filter((s) => !s.hidden)} />
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
      <Footer />
    </>
  )
}