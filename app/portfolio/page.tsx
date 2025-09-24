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
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

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
                  <span className="text-primary font-semibold text-sm">Live Design Studies</span>
                </div>
              </div>
              <div className="mb-8">
                <TextGenerateEffect 
                  words="Oceanheart Labs"
                  className="font-extrabold text-4xl md:text-6xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  duration={0.5}
                />
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl opacity-90 mx-auto mb-8 leading-relaxed">
                  <span className="font-semibold text-secondary/50">Prototypes at the frontier</span> of AI, wellbeing, and web engineering.<br />
                  <span className="font-semibold text-secondary/70">Working scaffolds</span>—open invitations to follow their evolution.<br />
                  <span className="font-semibold text-secondary/90">From architecture demo to full product</span>, watch them grow in real-time.<br />
                </p>
              </div>
            </div>
          </Vortex>
          {/* Gentle fade to background */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-100 to-transparent pointer-events-none" />
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
                className="hover:scale-105 transition-transform"
              >
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="bg-base-100 text-base-content flex items-center space-x-2 px-8 py-4 font-semibold"
                >
                  <span>Schedule a Call</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </HoverBorderGradient>
              </a>
              <a
                href="/about"
                className="hover:scale-105 transition-transform"
              >
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="bg-base-100 text-base-content flex items-center space-x-2 px-8 py-4 font-semibold"
                >
                  <span>Learn More About Me</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </HoverBorderGradient>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}