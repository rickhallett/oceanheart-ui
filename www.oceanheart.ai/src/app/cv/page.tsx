"use client";

import { Navigation, PageTransition } from "@/components/kaishin";
import { TerminalFooter } from "@/components/terminal";
import {
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconExternalLink,
} from "@tabler/icons-react";
import {
  CVChatWidget,
  FitAssessment,
  ExperienceCard,
  SkillsMatrix,
} from "@/components/cv";
import { cvData } from "@/lib/cv-data";

export default function CVPage() {
  return (
    <PageTransition>
      <main className="relative bg-terminal-bg antialiased min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center relative pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-left sm:text-center relative z-10 w-full">
            <div className="font-terminal text-xs text-terminal-muted mb-4 sm:mb-6">
              <span className="text-terminal-green">$</span> cat ./profile/summary.md
            </div>

            <h1 className="font-terminal text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-terminal mb-3 sm:mb-4">
              {cvData.name}
            </h1>
            <p className="font-terminal text-base sm:text-lg md:text-xl text-terminal-cyan mb-3 sm:mb-4">
              {cvData.title}
            </p>
            <p className="font-terminal text-xs sm:text-sm md:text-base text-terminal-muted mb-6 sm:mb-8 max-w-2xl sm:mx-auto">
              {cvData.tagline}
            </p>

            {/* Contact Links */}
            <div className="flex flex-wrap justify-start sm:justify-center gap-3 sm:gap-4 md:gap-6 text-terminal-secondary mb-8 sm:mb-10">
              <a
                href={`mailto:${cvData.contact.email}`}
                className="flex items-center gap-1.5 sm:gap-2 font-terminal text-xs hover:text-terminal-cyan transition-colors"
              >
                <IconMail className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{cvData.contact.email}</span>
              </a>
              <a
                href={`https://${cvData.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 font-terminal text-xs hover:text-terminal-cyan transition-colors"
              >
                <IconBrandLinkedin className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">linkedin</span>
              </a>
              <a
                href={`https://${cvData.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 font-terminal text-xs hover:text-terminal-cyan transition-colors"
              >
                <IconBrandGithub className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">github</span>
              </a>
              <a
                href="/portfolio"
                className="flex items-center gap-1.5 sm:gap-2 font-terminal text-xs hover:text-terminal-cyan transition-colors"
              >
                <IconExternalLink className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">portfolio</span>
              </a>
            </div>

            {/* Interactive Chat */}
            <CVChatWidget variant="hero" />
          </div>
        </section>

        {/* Fit Assessment Section */}
        <section className="py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="font-terminal text-xs text-terminal-muted mb-1.5 sm:mb-2">
              <span className="text-terminal-green">$</span> ./fit-assessment --interactive
            </div>
            <h2 className="font-terminal text-xl sm:text-2xl text-terminal mb-4 sm:mb-6">
              am I a good fit?
            </h2>
            <FitAssessment />
          </div>
        </section>

        {/* Summary */}
        <section className="py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="font-terminal text-xs text-terminal-muted mb-1.5 sm:mb-2">
              <span className="text-terminal-green">$</span> cat ./summary.txt
            </div>
            <h2 className="font-terminal text-xl sm:text-2xl text-terminal mb-3 sm:mb-4">summary</h2>
            <p className="font-terminal text-xs sm:text-sm text-terminal-secondary leading-relaxed text-left">
              {cvData.summary}
            </p>
          </div>
        </section>

        {/* Skills Matrix */}
        <section className="py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="font-terminal text-xs text-terminal-muted mb-1.5 sm:mb-2">
              <span className="text-terminal-green">$</span> ls -la ./skills/
            </div>
            <h2 className="font-terminal text-xl sm:text-2xl text-terminal mb-4 sm:mb-6">skills matrix</h2>
            <SkillsMatrix />
          </div>
        </section>

        {/* Professional Experience */}
        <section className="py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="font-terminal text-xs text-terminal-muted mb-1.5 sm:mb-2">
              <span className="text-terminal-green">$</span> ls -la ./experience/
            </div>
            <h2 className="font-terminal text-xl sm:text-2xl text-terminal mb-1.5 sm:mb-2">
              professional experience
            </h2>
            <p className="font-terminal text-xs text-terminal-muted mb-4 sm:mb-6 text-left">
              click [view context] to see the unflattened story behind each role
            </p>

            <div className="space-y-3 sm:space-y-4">
              {cvData.experiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        </section>

        {/* Psychology Background */}
        <section className="py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="font-terminal text-xs text-terminal-muted mb-1.5 sm:mb-2">
              <span className="text-terminal-green">$</span> cat ./background/psychology.md
            </div>
            <h2 className="font-terminal text-xl sm:text-2xl text-terminal mb-4 sm:mb-6">
              psychology background
            </h2>

            <div className="bg-terminal-bg-secondary border border-white/10 rounded-sm p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
              <h3 className="font-terminal text-base sm:text-lg text-terminal-purple mb-1">
                {cvData.psychologyBackground.title}
              </h3>
              <p className="font-terminal text-xs sm:text-sm text-terminal-cyan mb-3 sm:mb-4">
                {cvData.psychologyBackground.years} years
              </p>
              <p className="font-terminal text-xs sm:text-sm text-terminal-secondary leading-relaxed mb-3 sm:mb-4 text-left">
                {cvData.psychologyBackground.description}
              </p>
              <p className="font-terminal text-xs sm:text-sm text-terminal-muted leading-relaxed italic text-left">
                {cvData.psychologyBackground.relevance}
              </p>
            </div>

            <div className="bg-terminal-bg-secondary border border-white/10 rounded-sm p-3 sm:p-4 md:p-5">
              <div className="font-terminal text-xs text-terminal-muted mb-2 sm:mb-3">
                <span className="text-terminal-purple">#</span> engineering applications
              </div>
              <div className="space-y-2 sm:space-y-3">
                {cvData.psychologyBackground.engineeringApplications.map(
                  (application, index) => (
                    <div key={index} className="font-terminal text-xs sm:text-sm text-terminal-secondary text-left">
                      <span className="text-terminal-purple">-</span>
                      <span className="ml-1.5 sm:ml-2">{application}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="font-terminal text-xs text-terminal-muted mb-1.5 sm:mb-2">
              <span className="text-terminal-green">$</span> cat ./education.txt
            </div>
            <h2 className="font-terminal text-xl sm:text-2xl text-terminal mb-4 sm:mb-6">education</h2>

            <div className="space-y-2 sm:space-y-3">
              {cvData.education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-terminal-bg-secondary border border-white/10 rounded-sm p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 sm:gap-2"
                >
                  <div>
                    <h3 className="font-terminal text-xs sm:text-sm text-terminal">{edu.degree}</h3>
                    <p className="font-terminal text-xs text-terminal-muted">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="font-terminal text-xs text-terminal-cyan">{edu.year}</span>
                </div>
              ))}

              <div className="bg-terminal-bg-secondary border border-terminal-green/20 rounded-sm p-3 sm:p-4">
                <div className="font-terminal text-xs text-terminal-green mb-1.5 sm:mb-2">
                  ongoing:
                </div>
                <p className="font-terminal text-xs sm:text-sm text-terminal-secondary text-left">
                  AI/ML systems, context engineering patterns, agentic workflow design
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-left sm:text-center">
            <div className="font-terminal text-xs text-terminal-muted mb-3 sm:mb-4">
              <span className="text-terminal-green">$</span> ./contact --collaborate
            </div>
            <h2 className="font-terminal text-xl sm:text-2xl text-terminal mb-3 sm:mb-4">
              let's collaborate
            </h2>
            <p className="font-terminal text-xs sm:text-sm text-terminal-secondary mb-6 sm:mb-8">
              looking for an AI systems engineer who combines technical excellence
              with human-centered design?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-center">
              <a
                href={`mailto:${cvData.contact.email}`}
                className="px-5 sm:px-6 py-2.5 sm:py-3 font-terminal text-xs sm:text-sm bg-terminal-cyan text-terminal-bg border border-terminal-cyan hover:bg-terminal-cyan/90 transition-colors rounded-sm text-center"
              >
                [get in touch]
              </a>
              <a
                href="/portfolio"
                className="px-5 sm:px-6 py-2.5 sm:py-3 font-terminal text-xs sm:text-sm bg-terminal-bg-secondary text-terminal border border-white/10 hover:border-terminal-cyan/30 hover:text-terminal-cyan transition-colors rounded-sm text-center"
              >
                [view portfolio]
              </a>
            </div>
          </div>
        </section>

        <TerminalFooter />

        {/* Floating Chat Widget */}
        <CVChatWidget variant="widget" />
      </main>
    </PageTransition>
  );
}
