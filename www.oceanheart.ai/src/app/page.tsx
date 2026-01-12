"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation, PageTransition } from "@/components/kaishin";
import { TerminalFooter } from "@/components/terminal";
import { IconBrandGithub, IconArrowRight } from "@tabler/icons-react";
import {
  getProductionProjects,
  getPrototypeProjects,
} from "@/lib/portfolio";

export default function HomePage() {
  const productionProjects = getProductionProjects().slice(0, 2);
  const prototypeProjects = getPrototypeProjects().slice(0, 2);
  const featuredProjects = [...productionProjects, ...prototypeProjects].slice(0, 4);

  return (
    <PageTransition>
      <main className="relative bg-terminal-bg antialiased">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative pt-32 pb-20 px-6">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(125, 207, 255, 0.5) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(125, 207, 255, 0.5) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Ambient glow */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-terminal-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-terminal-purple/10 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-6">
                <span className="text-terminal-green">$</span> whoami
              </p>

              <h1 className="font-terminal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-terminal mb-6 leading-tight">
                I build <span className="text-terminal-cyan">AI systems</span><br />
                that work for <span className="text-terminal-purple">humans</span>
              </h1>

              <p className="text-lg md:text-xl text-terminal-secondary font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                Software engineer with 15 years in psychology. I build tools that
                understand how people actually behave—not how we wish they would.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-6 py-3 font-terminal text-sm bg-transparent border border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan/10 hover:shadow-[0_0_20px_rgba(125,207,255,0.3)] transition-all duration-200 rounded-sm"
                >
                  <span className="text-terminal-green mr-2">$</span> view_portfolio
                </Link>
                <a
                  href="https://github.com/rickhallett"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 font-terminal text-sm bg-transparent border border-white/20 text-terminal-secondary hover:border-white/40 hover:text-terminal transition-all duration-200 rounded-sm"
                >
                  <IconBrandGithub className="w-4 h-4" />
                  github
                </a>
              </div>

              {/* Terminal prompt hint */}
              <p className="font-terminal text-xs text-terminal-muted">
                Press <kbd className="px-1.5 py-0.5 bg-terminal-bg-tertiary rounded-sm border border-white/10 mx-1">?</kbd> for keyboard shortcuts
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 px-6 bg-terminal-bg-secondary">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> ls ./projects/featured
              </p>
              <h2 className="font-terminal text-2xl sm:text-3xl text-terminal-cyan mb-8">
                What I&apos;ve Built
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 bg-terminal-bg border border-white/10 rounded-sm hover:border-terminal-cyan/30 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`font-terminal text-xs px-2 py-1 rounded-sm ${
                        project.status === "production"
                          ? "text-terminal-green border border-terminal-green/30"
                          : "text-terminal-blue border border-terminal-blue/30"
                      }`}>
                        [{project.status}]
                      </span>
                      {project.currentlyBuilding && (
                        <span className="font-terminal text-xs text-terminal-orange">
                          building...
                        </span>
                      )}
                    </div>
                    <h3 className="font-terminal text-lg text-terminal mb-2">
                      {project.title}
                    </h3>
                    <p className="text-terminal-secondary text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 font-terminal text-sm text-terminal-cyan hover:text-terminal-blue transition-colors"
              >
                <span className="text-terminal-green">$</span> view_all_projects
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Differentiator */}
        <section className="py-20 px-6 bg-terminal-bg">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> cat ./about/differentiator.md
              </p>
              <h2 className="font-terminal text-2xl sm:text-3xl text-terminal-purple mb-8">
                The Secret Weapon
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-red mb-3 block">## Problem</span>
                  <p className="text-terminal-secondary leading-relaxed">
                    Most AI tools ignore how humans actually behave. They optimise for
                    metrics that don&apos;t matter and break when people do what people do:
                    make mistakes, change their minds, resist what&apos;s good for them.
                  </p>
                </div>

                <div className="p-6 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-green mb-3 block">## Solution</span>
                  <p className="text-terminal-secondary leading-relaxed">
                    15 years in therapy taught me: people resist change, need psychological
                    safety, and respond to systems that meet them where they are. I encode
                    that understanding into every system I build.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                <div className="grid sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="font-terminal text-3xl text-terminal-cyan mb-2">15</div>
                    <div className="text-terminal-muted text-sm">years psychology</div>
                  </div>
                  <div>
                    <div className="font-terminal text-3xl text-terminal-purple mb-2">5</div>
                    <div className="text-terminal-muted text-sm">years engineering</div>
                  </div>
                  <div>
                    <div className="font-terminal text-3xl text-terminal-green mb-2">∞</div>
                    <div className="text-terminal-muted text-sm">systems shipped</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services CTA */}
        <section className="py-20 px-6 bg-terminal-bg-secondary">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> ls ./services/
              </p>
              <h2 className="font-terminal text-2xl sm:text-3xl text-terminal-green mb-8">
                What I Can Build For You
              </h2>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="p-5 bg-terminal-bg border border-white/5 rounded-sm">
                  <h3 className="font-terminal text-sm text-terminal-cyan mb-2">Custom AI Tools</h3>
                  <p className="text-terminal-muted text-xs">
                    RAG systems, LLM integrations, domain-specific applications
                  </p>
                </div>
                <div className="p-5 bg-terminal-bg border border-white/5 rounded-sm">
                  <h3 className="font-terminal text-sm text-terminal-purple mb-2">Web Applications</h3>
                  <p className="text-terminal-muted text-xs">
                    Next.js, React, Python backends, production deployments
                  </p>
                </div>
                <div className="p-5 bg-terminal-bg border border-white/5 rounded-sm">
                  <h3 className="font-terminal text-sm text-terminal-orange mb-2">AI Strategy</h3>
                  <p className="text-terminal-muted text-xs">
                    Technical guidance, architecture, team augmentation
                  </p>
                </div>
              </div>

              <Link
                href="/consulting"
                className="inline-flex items-center gap-2 font-terminal text-sm text-terminal-cyan hover:text-terminal-blue transition-colors"
              >
                <span className="text-terminal-green">$</span> learn_more
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Blog Preview */}
        <section className="py-20 px-6 bg-terminal-bg">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> tail -3 ./blog/posts.log
              </p>
              <h2 className="font-terminal text-2xl sm:text-3xl text-terminal mb-8">
                Learning in Public
              </h2>

              <div className="space-y-4 mb-8">
                <Link
                  href="/blog/2025-01-25-shipping-prototypes-production"
                  className="block p-4 bg-terminal-bg-secondary border border-white/5 rounded-sm hover:border-terminal-cyan/30 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-terminal text-sm text-terminal hover:text-terminal-cyan transition-colors">
                        Every Prototype Should Be Deployable
                      </h3>
                      <p className="text-terminal-muted text-xs mt-1">How I ship fast without accumulating debt</p>
                    </div>
                    <span className="font-terminal text-xs text-terminal-muted">2025-01-25</span>
                  </div>
                </Link>

                <Link
                  href="/blog/2025-01-22-rag-systems-therapy-context"
                  className="block p-4 bg-terminal-bg-secondary border border-white/5 rounded-sm hover:border-terminal-cyan/30 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-terminal text-sm text-terminal hover:text-terminal-cyan transition-colors">
                        Building RAG Systems for Therapeutic Context
                      </h3>
                      <p className="text-terminal-muted text-xs mt-1">Lessons from building Sidekick</p>
                    </div>
                    <span className="font-terminal text-xs text-terminal-muted">2025-01-22</span>
                  </div>
                </Link>

                <Link
                  href="/blog/2025-01-20-building-terminal-aesthetic-nextjs"
                  className="block p-4 bg-terminal-bg-secondary border border-white/5 rounded-sm hover:border-terminal-cyan/30 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-terminal text-sm text-terminal hover:text-terminal-cyan transition-colors">
                        Building a Terminal Aesthetic in Next.js
                      </h3>
                      <p className="text-terminal-muted text-xs mt-1">Tokyo Night theme implementation</p>
                    </div>
                    <span className="font-terminal text-xs text-terminal-muted">2025-01-20</span>
                  </div>
                </Link>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-terminal text-sm text-terminal-cyan hover:text-terminal-blue transition-colors"
              >
                <span className="text-terminal-green">$</span> read_all_posts
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-terminal-bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terminal-cyan/5 to-transparent" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-4">
                <span className="text-terminal-green">$</span> init new_project
              </p>
              <h2 className="font-terminal text-2xl md:text-3xl text-terminal mb-6">
                Ready to <span className="text-terminal-cyan">build</span>?
              </h2>
              <p className="text-terminal-secondary leading-relaxed mb-8">
                I build AI-powered tools for human domains. If you need custom software
                that actually understands how people work, let&apos;s talk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendar.app.google/RMwsbtUZ76G6VZzb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 font-terminal text-sm bg-transparent border border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan/10 hover:shadow-[0_0_20px_rgba(125,207,255,0.3)] transition-all duration-200 rounded-sm"
                >
                  <span className="text-terminal-green mr-2">$</span> schedule_call
                </a>
                <a
                  href="mailto:kai@oceanheart.ai"
                  className="inline-flex items-center justify-center px-6 py-3 font-terminal text-sm bg-transparent border border-white/20 text-terminal-secondary hover:border-white/40 hover:text-terminal transition-all duration-200 rounded-sm"
                >
                  <span className="text-terminal-green mr-2">$</span> kai@oceanheart.ai
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <TerminalFooter />
      </main>
    </PageTransition>
  );
}
