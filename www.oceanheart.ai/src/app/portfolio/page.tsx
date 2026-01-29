"use client";
import { Navigation, PageTransition } from "@/components/kaishin";
import { TerminalPortfolioCardWithModal, TerminalFooter } from "@/components/terminal";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  getCurrentlyBuildingProjects,
  getProductionProjects,
  getPrototypeProjects,
  getExperimentProjects,
  getAllProjects,
  makeProjectSlug,
} from "@/lib/portfolio";

export default function PortfolioPage() {
  const currentlyBuilding = getCurrentlyBuildingProjects();
  const productionProjects = getProductionProjects();
  // Filter out currently building projects to avoid duplication
  const prototypeProjects = getPrototypeProjects().filter(p => !p.currentlyBuilding);
  const experimentProjects = getExperimentProjects().filter(p => !p.currentlyBuilding);

  // Find Swanage Traffic for featured case study
  const swanageProject = getAllProjects().find(p => p.title === "Swanage Traffic Alliance");

  // Find wasp for featured case study
  const waspProject = getAllProjects().find(p => p.title === "wasp");

  return (
    <PageTransition>
      <main className="relative bg-terminal-bg antialiased">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-[50vh] flex items-center justify-center relative pt-32 pb-16 px-6">
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
          <div className="absolute top-10 left-0 w-96 h-96 bg-terminal-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-0 w-80 h-80 bg-terminal-purple/10 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-4">
                <span className="text-terminal-green">$</span> ls -la ./portfolio
              </p>
              <h1 className="font-terminal text-3xl sm:text-4xl md:text-5xl text-terminal mb-4">
                Production Systems <span className="text-terminal-cyan">&</span> Experiments
              </h1>
              <p className="font-terminal text-lg text-terminal-secondary leading-relaxed max-w-2xl mb-8">
                AI-powered tools, human-centred platforms, and systems that actually work.
                From production deployments to ongoing experiments.
              </p>
              <div className="flex flex-wrap gap-4 font-terminal text-sm">
                <span className="text-terminal-green">[{productionProjects.length} production]</span>
                <span className="text-terminal-blue">[{prototypeProjects.length} prototype]</span>
                <span className="text-terminal-purple">[{experimentProjects.length} experiment]</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Case Study: wasp */}
        {waspProject && (
          <section className="py-16 px-6 bg-terminal-bg-secondary">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-terminal text-terminal-muted text-sm mb-2">
                  <span className="text-terminal-green">$</span> cat ./case-studies/wasp.md
                </p>
                <h2 className="font-terminal text-2xl text-terminal-cyan mb-8">
                  Featured Case Study
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {/* Project image */}
                  <div className="relative rounded-sm overflow-hidden border border-white/10">
                    <img
                      src={waspProject.image}
                      alt={waspProject.title}
                      className="w-full h-64 object-cover object-top"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="font-terminal text-xs px-2 py-1 border border-terminal-green/30 text-terminal-green rounded-sm bg-terminal-bg/80 backdrop-blur-sm">
                        [production]
                      </span>
                    </div>
                  </div>

                  {/* Case study content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-terminal text-xl text-terminal mb-2">
                        {waspProject.title}
                      </h3>
                      <p className="font-terminal text-terminal-secondary text-sm">
                        {waspProject.description}
                      </p>
                    </div>

                    <div className="space-y-4 p-4 bg-terminal-bg border border-white/5 rounded-sm">
                      <div>
                        <span className="font-terminal text-xs text-terminal-red">## Problem</span>
                        <p className="font-terminal text-terminal-muted text-sm mt-1">
                          {waspProject.problem}
                        </p>
                      </div>
                      <div>
                        <span className="font-terminal text-xs text-terminal-green">## Solution</span>
                        <p className="font-terminal text-terminal-muted text-sm mt-1">
                          {waspProject.solution}
                        </p>
                      </div>
                      {waspProject.impact && (
                        <div>
                          <span className="font-terminal text-xs text-terminal-cyan">## Impact</span>
                          <p className="text-terminal-cyan text-sm mt-1 font-terminal">
                            {waspProject.impact}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Tech stack */}
                    <div>
                      <span className="font-terminal text-xs text-terminal-muted">## Stack</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {waspProject.tech.map((tech) => (
                          <span
                            key={tech}
                            className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {waspProject.externalUrl && (
                        <a
                          href={waspProject.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-terminal text-sm text-terminal-cyan hover:text-terminal-blue transition-colors"
                        >
                          <span className="text-terminal-green">$</span> visit site →
                        </a>
                      )}
                      {waspProject.githubRepo && (
                        <a
                          href={`https://github.com/${waspProject.githubRepo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-terminal text-sm text-terminal-secondary hover:text-terminal-cyan transition-colors"
                        >
                          <span className="text-terminal-green">$</span> view source →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Currently Building Section */}
        {currentlyBuilding.length > 0 && (
          <section className="py-16 px-6 bg-terminal-bg-secondary">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <p className="font-terminal text-terminal-muted text-sm mb-2">
                  <span className="text-terminal-green">$</span> cat ./status/currently-building.log
                </p>
                <h2 className="font-terminal text-2xl text-terminal-orange flex items-center gap-3">
                  Currently Building
                  <span className="inline-block w-2 h-2 bg-terminal-orange rounded-full animate-pulse" />
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentlyBuilding.map((project, index) => (
                  <TerminalPortfolioCardWithModal
                    key={project.id}
                    project={{ ...project, sectionId: project.sectionId }}
                    index={index}
                    showProblemSolution={true}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Case Study: Swanage Traffic */}
        {swanageProject && (
          <section className="py-16 px-6 bg-terminal-bg">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-terminal text-terminal-muted text-sm mb-2">
                  <span className="text-terminal-green">$</span> cat ./case-studies/swanage-traffic.md
                </p>
                <h2 className="font-terminal text-2xl text-terminal-cyan mb-8">
                  Featured Case Study
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {/* Project image */}
                  <div className="relative rounded-sm overflow-hidden border border-white/10">
                    <img
                      src={swanageProject.image}
                      alt={swanageProject.title}
                      className="w-full h-64 object-cover object-top"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="font-terminal text-xs px-2 py-1 border border-terminal-green/30 text-terminal-green rounded-sm bg-terminal-bg/80 backdrop-blur-sm">
                        [production]
                      </span>
                    </div>
                  </div>

                  {/* Case study content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-terminal text-xl text-terminal mb-2">
                        {swanageProject.title}
                      </h3>
                      <p className="font-terminal text-terminal-secondary text-sm">
                        {swanageProject.description}
                      </p>
                    </div>

                    <div className="space-y-4 p-4 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                      <div>
                        <span className="font-terminal text-xs text-terminal-red">## Problem</span>
                        <p className="font-terminal text-terminal-muted text-sm mt-1">
                          {swanageProject.problem}
                        </p>
                      </div>
                      <div>
                        <span className="font-terminal text-xs text-terminal-green">## Solution</span>
                        <p className="font-terminal text-terminal-muted text-sm mt-1">
                          {swanageProject.solution}
                        </p>
                      </div>
                      {swanageProject.impact && (
                        <div>
                          <span className="font-terminal text-xs text-terminal-cyan">## Impact</span>
                          <p className="text-terminal-cyan text-sm mt-1 font-terminal">
                            {swanageProject.impact}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Tech stack */}
                    <div>
                      <span className="font-terminal text-xs text-terminal-muted">## Stack</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {swanageProject.tech.map((tech) => (
                          <span
                            key={tech}
                            className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {swanageProject.externalUrl && (
                        <a
                          href={swanageProject.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-terminal text-sm text-terminal-cyan hover:text-terminal-blue transition-colors"
                        >
                          <span className="text-terminal-green">$</span> visit site →
                        </a>
                      )}
                      {swanageProject.githubRepo && (
                        <a
                          href={`https://github.com/${swanageProject.githubRepo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-terminal text-sm text-terminal-secondary hover:text-terminal-cyan transition-colors"
                        >
                          <span className="text-terminal-green">$</span> view source →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Production Systems */}
        {productionProjects.length > 0 && (
          <section className="py-16 px-6 bg-terminal-bg-secondary">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <p className="font-terminal text-terminal-muted text-sm mb-2">
                  <span className="text-terminal-green">$</span> ls ./production/
                </p>
                <h2 className="font-terminal text-2xl text-terminal-green">
                  Production Systems
                </h2>
                <p className="font-terminal text-terminal-secondary text-sm mt-2">
                  Live, deployed systems serving real users
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productionProjects.map((project, index) => (
                  <TerminalPortfolioCardWithModal
                    key={project.id}
                    project={{ ...project, sectionId: project.sectionId }}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Prototypes */}
        {prototypeProjects.length > 0 && (
          <section className="py-16 px-6 bg-terminal-bg">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <p className="font-terminal text-terminal-muted text-sm mb-2">
                  <span className="text-terminal-green">$</span> ls ./prototype/
                </p>
                <h2 className="font-terminal text-2xl text-terminal-blue">
                  Prototypes
                </h2>
                <p className="font-terminal text-terminal-secondary text-sm mt-2">
                  Working builds demonstrating core functionality
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prototypeProjects.map((project, index) => (
                  <TerminalPortfolioCardWithModal
                    key={project.id}
                    project={{ ...project, sectionId: project.sectionId }}
                    index={index}
                    showProblemSolution={true}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experiments */}
        {experimentProjects.length > 0 && (
          <section className="py-16 px-6 bg-terminal-bg-secondary">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <p className="font-terminal text-terminal-muted text-sm mb-2">
                  <span className="text-terminal-green">$</span> ls ./experiments/
                </p>
                <h2 className="font-terminal text-2xl text-terminal-purple">
                  Experiments
                </h2>
                <p className="font-terminal text-terminal-secondary text-sm mt-2">
                  Early explorations and research projects
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experimentProjects.map((project, index) => (
                  <TerminalPortfolioCardWithModal
                    key={project.id}
                    project={{ ...project, sectionId: project.sectionId }}
                    index={index}
                    showProblemSolution={true}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-20 px-6 bg-terminal-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terminal-cyan/5 to-transparent" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-4">
                <span className="text-terminal-green">$</span> cat ./contact/hire-me.md
              </p>
              <h2 className="font-terminal text-2xl md:text-3xl text-terminal mb-6">
                Need something <span className="text-terminal-cyan">built</span>?
              </h2>
              <p className="font-terminal text-terminal-secondary leading-relaxed mb-8">
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
                <Link
                  href="/consulting"
                  className="inline-flex items-center justify-center px-6 py-3 font-terminal text-sm bg-transparent border border-white/20 text-terminal-secondary hover:border-white/40 hover:text-terminal transition-all duration-200 rounded-sm"
                >
                  <span className="text-terminal-green mr-2">$</span> learn_more
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <TerminalFooter />
      </main>
    </PageTransition>
  );
}
