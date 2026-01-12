"use client";

import { Navigation, Footer, PageTransition } from "@/components/kaishin";
import { TerminalHero } from "@/components/terminal";
import { motion } from "framer-motion";
import Link from "next/link";

// Featured projects for the proof section
const featuredProjects = [
  {
    name: "Swanage Traffic Alliance",
    description: "Real-time traffic monitoring for a coastal town",
    tech: ["Next.js", "Python", "PostgreSQL"],
    status: "Production",
    href: "/portfolio#swanage-traffic",
  },
  {
    name: "Preflight",
    description: "AI-powered assessment engine for therapists",
    tech: ["Go", "React", "OpenAI"],
    status: "Production",
    href: "/portfolio#preflight",
  },
  {
    name: "Becoming Diamond",
    description: "Personalized transformation platform",
    tech: ["Next.js", "Turso", "Claude"],
    status: "Production",
    href: "/portfolio#becoming-diamond",
  },
];

export default function BuildPage() {
  return (
    <PageTransition>
      <main className="relative bg-terminal-bg antialiased">
        <Navigation />

        {/* Terminal Hero */}
        <TerminalHero />

        {/* Proof Section - Featured Projects */}
        <section className="py-20 px-6 bg-terminal-bg-secondary">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> ls -la ./projects/featured
              </p>
              <h2 className="font-terminal text-2xl sm:text-3xl text-terminal-cyan">
                Production Systems I&apos;ve Built
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={project.href}
                    className="block p-6 bg-terminal-bg border border-white/10 rounded-sm hover:border-terminal-cyan/30 hover:shadow-[0_0_20px_rgba(125,207,255,0.1)] transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-terminal text-xs text-terminal-green">
                        [{project.status}]
                      </span>
                    </div>
                    <h3 className="font-terminal text-lg text-terminal mb-2">
                      {project.name}
                    </h3>
                    <p className="text-terminal-secondary text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-muted rounded-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center font-terminal text-sm text-terminal-cyan hover:text-terminal-blue transition-colors"
              >
                <span className="text-terminal-green mr-2">$</span>
                cd ./portfolio
                <span className="ml-2">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Art of Personal AI Section */}
        <section className="py-20 px-6 bg-terminal-bg">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> cat ./philosophy/art-of-personal-ai.md
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-terminal-bg-secondary border border-white/10 rounded-sm">
              <h2 className="font-terminal text-xl sm:text-2xl text-terminal-purple mb-6">
                The Art of Personal AI
              </h2>

              <div className="space-y-6 text-terminal-secondary">
                <div>
                  <h3 className="font-terminal text-terminal-cyan mb-2">
                    # Story
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    AI should amplify your narrative, not replace it. The best systems help you tell your story more effectively.
                  </p>
                </div>

                <div>
                  <h3 className="font-terminal text-terminal-cyan mb-2">
                    # Spirit
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Technology should serve human flourishing. I build tools that respect psychological safety and emotional intelligence.
                  </p>
                </div>

                <div>
                  <h3 className="font-terminal text-terminal-cyan mb-2">
                    # Science
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Evidence-based approaches grounded in cognitive science, not just hype. What actually works, measured and refined.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-terminal text-terminal-muted text-sm italic">
                  &quot;Most AI tools ignore how humans actually behave. I build that understanding into the systems I create.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-6 bg-terminal-bg-secondary">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> cat ./services/index.md
              </p>
              <h2 className="font-terminal text-2xl sm:text-3xl text-terminal">
                How I Can Help
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 bg-terminal-bg border border-terminal-cyan/20 rounded-sm">
                <div className="font-terminal text-terminal-cyan text-sm mb-3">
                  ./build
                </div>
                <h3 className="font-terminal text-lg text-terminal mb-2">
                  Need Something Built?
                </h3>
                <p className="text-terminal-secondary text-sm mb-4">
                  Custom AI-powered tools, production systems, and human-centred software.
                </p>
                <Link
                  href="/portfolio"
                  className="font-terminal text-xs text-terminal-cyan hover:text-terminal-blue"
                >
                  View Portfolio &rarr;
                </Link>
              </div>

              <div className="p-6 bg-terminal-bg border border-terminal-purple/20 rounded-sm">
                <div className="font-terminal text-terminal-purple text-sm mb-3">
                  ./consult
                </div>
                <h3 className="font-terminal text-lg text-terminal mb-2">
                  Need AI Guidance?
                </h3>
                <p className="text-terminal-secondary text-sm mb-4">
                  Architecture review, implementation support, and AI strategy for your team.
                </p>
                <Link
                  href="/consulting"
                  className="font-terminal text-xs text-terminal-purple hover:text-terminal-cyan"
                >
                  Learn More &rarr;
                </Link>
              </div>

              <div className="p-6 bg-terminal-bg border border-terminal-green/20 rounded-sm">
                <div className="font-terminal text-terminal-green text-sm mb-3">
                  ./sessions
                </div>
                <h3 className="font-terminal text-lg text-terminal mb-2">
                  Need Personal Support?
                </h3>
                <p className="text-terminal-secondary text-sm mb-4">
                  1:1 sessions integrating therapy, coaching, and human-centred guidance.
                </p>
                <Link
                  href="/kai"
                  className="font-terminal text-xs text-terminal-green hover:text-terminal-cyan"
                >
                  Book a Session &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <section className="py-20 px-6 bg-terminal-bg">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> tail -n 3 ./blog/latest.log
              </p>
              <h2 className="font-terminal text-2xl text-terminal">
                Learning in Public
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-terminal-bg-secondary border border-white/10 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-terminal text-xs text-terminal-muted">2025-01-15</span>
                  <span className="font-terminal text-xs text-terminal-blue">[technical]</span>
                </div>
                <h3 className="font-terminal text-terminal hover:text-terminal-cyan transition-colors">
                  <Link href="/blog">
                    Building SSO from scratch with Passport.oceanheart.ai
                  </Link>
                </h3>
              </div>

              <div className="p-4 bg-terminal-bg-secondary border border-white/10 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-terminal text-xs text-terminal-muted">2025-01-10</span>
                  <span className="font-terminal text-xs text-terminal-purple">[ai-human]</span>
                </div>
                <h3 className="font-terminal text-terminal hover:text-terminal-cyan transition-colors">
                  <Link href="/blog">
                    What therapy taught me about AI system design
                  </Link>
                </h3>
              </div>

              <div className="p-4 bg-terminal-bg-secondary border border-white/10 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-terminal text-xs text-terminal-muted">2025-01-05</span>
                  <span className="font-terminal text-xs text-terminal-green">[building]</span>
                </div>
                <h3 className="font-terminal text-terminal hover:text-terminal-cyan transition-colors">
                  <Link href="/blog">
                    This month I shipped: January 2025
                  </Link>
                </h3>
              </div>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center font-terminal text-sm text-terminal-cyan hover:text-terminal-blue transition-colors"
            >
              <span className="text-terminal-green mr-2">$</span>
              cd ./blog
              <span className="ml-2">&rarr;</span>
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
