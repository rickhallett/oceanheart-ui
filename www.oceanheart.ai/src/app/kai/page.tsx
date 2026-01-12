"use client";
import { Navigation, PageTransition } from "@/components/kaishin";
import { TerminalFooter } from "@/components/terminal";
import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import Link from "next/link";

export default function KaiPage() {
  return (
    <PageTransition>
      <main className="relative bg-terminal-bg antialiased">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center relative pt-32 pb-16 px-6">
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

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-terminal text-terminal-muted text-sm mb-4">
                  <span className="text-terminal-green">$</span> cat ./about/kai.md
                </p>
                <h1 className="font-terminal text-3xl sm:text-4xl md:text-5xl text-terminal mb-4">
                  Kai Hallett
                </h1>
                <p className="font-terminal text-lg text-terminal-cyan mb-6">
                  Software Engineer & Human Systems Architect
                </p>
                <p className="text-lg text-terminal-secondary font-light leading-relaxed max-w-2xl mb-8">
                  I build AI systems that actually work for humans. 15 years as a therapist
                  taught me how people behave. 5 years as an engineer taught me how to build
                  systems. Now I build systems that account for real human behaviour.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/rickhallett"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 font-terminal text-sm border border-terminal-cyan/30 text-terminal-cyan hover:bg-terminal-cyan/10 transition-all duration-200 rounded-sm"
                  >
                    <IconBrandGithub className="w-4 h-4" />
                    github
                  </a>
                  <a
                    href="https://linkedin.com/in/richardkaihallett"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 font-terminal text-sm border border-terminal-blue/30 text-terminal-blue hover:bg-terminal-blue/10 transition-all duration-200 rounded-sm"
                  >
                    <IconBrandLinkedin className="w-4 h-4" />
                    linkedin
                  </a>
                  <a
                    href="mailto:kai@oceanheart.ai"
                    className="inline-flex items-center gap-2 px-4 py-2 font-terminal text-sm border border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10 transition-all duration-200 rounded-sm"
                  >
                    <IconMail className="w-4 h-4" />
                    email
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden md:block"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-terminal-cyan/20 to-terminal-purple/20 rounded-sm blur-sm" />
                  <img
                    src="/images/about_me_profile_2.jpeg"
                    alt="Kai Hallett"
                    className="relative w-64 h-64 object-cover rounded-sm border border-white/10"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Professional Identity */}
        <section className="py-16 px-6 bg-terminal-bg-secondary">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-4">
                <span className="text-terminal-green">$</span> cat ./credentials.json
              </p>

              <div className="p-6 bg-terminal-bg border border-white/10 rounded-sm font-terminal text-sm">
                <div className="space-y-4">
                  <div>
                    <span className="text-terminal-purple">"current"</span>
                    <span className="text-terminal-muted">: </span>
                    <span className="text-terminal-green">"Founder @ Oceanheart.ai"</span>
                    <span className="text-terminal-muted">,</span>
                  </div>
                  <div className="ml-4 text-terminal-secondary">
                    // Building AI tools for human domains
                  </div>

                  <div>
                    <span className="text-terminal-purple">"previous"</span>
                    <span className="text-terminal-muted">: [</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-terminal-green">"Software Engineer @ EDITED (retail analytics)"</span>
                    <span className="text-terminal-muted">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-terminal-green">"Software Engineer @ Brandwatch (social intelligence)"</span>
                    <span className="text-terminal-muted">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-terminal-green">"Software Engineer @ Telesoft (network security)"</span>
                  </div>
                  <div className="text-terminal-muted">],</div>

                  <div>
                    <span className="text-terminal-purple">"background"</span>
                    <span className="text-terminal-muted">: </span>
                    <span className="text-terminal-green">"15 years Cognitive Behavioural Therapist"</span>
                    <span className="text-terminal-muted">,</span>
                  </div>

                  <div>
                    <span className="text-terminal-purple">"education"</span>
                    <span className="text-terminal-muted">: [</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-terminal-green">"PGDip CBT (Royal Holloway)"</span>
                    <span className="text-terminal-muted">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-terminal-green">"BSc Psychology (UWE Bristol)"</span>
                  </div>
                  <div className="text-terminal-muted">]</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why This Combination */}
        <section className="py-16 px-6 bg-terminal-bg">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> explain --why-this-combination
              </p>
              <h2 className="font-terminal text-2xl text-terminal-cyan mb-8">
                The Secret Weapon
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-red">## Problem</span>
                  <p className="text-terminal-secondary mt-3 leading-relaxed">
                    Most AI tools ignore how humans actually behave. They optimise for metrics
                    that don&apos;t matter, create friction where there should be flow, and break
                    when humans do what humans do: make mistakes, change their minds, resist
                    what&apos;s good for them.
                  </p>
                </div>

                <div className="p-6 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-green">## Solution</span>
                  <p className="text-terminal-secondary mt-3 leading-relaxed">
                    I build systems with psychological intelligence. 15 years in therapy taught me:
                    people resist change, need psychological safety, and respond to systems that meet
                    them where they are. I encode that understanding into every system I create.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="py-16 px-6 bg-terminal-bg-secondary">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> cat ./stack.yml
              </p>
              <h2 className="font-terminal text-2xl text-terminal-purple mb-8">
                Technical Approach
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-terminal-bg border border-white/5 rounded-sm">
                  <h3 className="font-terminal text-sm text-terminal-cyan mb-3">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "Vue/Nuxt", "TypeScript", "Tailwind", "Framer Motion"].map((tech) => (
                      <span
                        key={tech}
                        className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-terminal-bg border border-white/5 rounded-sm">
                  <h3 className="font-terminal text-sm text-terminal-green mb-3">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "FastAPI", "Go", "Rails", "Node.js", "PostgreSQL"].map((tech) => (
                      <span
                        key={tech}
                        className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-terminal-bg border border-white/5 rounded-sm">
                  <h3 className="font-terminal text-sm text-terminal-purple mb-3">AI/ML</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Claude", "GPT-4", "LangChain", "RAG", "Embeddings", "Fine-tuning"].map((tech) => (
                      <span
                        key={tech}
                        className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-5 bg-terminal-bg border border-white/5 rounded-sm">
                <h3 className="font-terminal text-sm text-terminal-orange mb-3">Philosophy</h3>
                <ul className="space-y-2 text-terminal-secondary text-sm">
                  <li><span className="text-terminal-green mr-2">→</span> Ship fast, iterate faster. Every prototype should be deployable.</li>
                  <li><span className="text-terminal-green mr-2">→</span> Design for the failure case. Humans make mistakes; systems should handle them gracefully.</li>
                  <li><span className="text-terminal-green mr-2">→</span> Infrastructure matters. A beautiful interface on shaky foundations will collapse.</li>
                  <li><span className="text-terminal-green mr-2">→</span> AI should augment, not replace. Build tools that make humans more capable.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Proof Points */}
        <section className="py-16 px-6 bg-terminal-bg">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> ls ./shipped/
              </p>
              <h2 className="font-terminal text-2xl text-terminal-green mb-8">
                Proof Points
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-green">[production]</span>
                  <h3 className="font-terminal text-lg text-terminal mt-2 mb-2">Swanage Traffic Alliance</h3>
                  <p className="text-terminal-secondary text-sm mb-3">
                    Brutalist activism site with real-time traffic data, live analytics, and CMS.
                  </p>
                  <span className="font-terminal text-xs text-terminal-cyan">500+ community members</span>
                </div>

                <div className="p-5 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-green">[production]</span>
                  <h3 className="font-terminal text-lg text-terminal mt-2 mb-2">Becoming Diamond</h3>
                  <p className="text-terminal-secondary text-sm mb-3">
                    Premium coaching platform with 3D globe visualizations and member authentication.
                  </p>
                  <span className="font-terminal text-xs text-terminal-cyan">Next.js 15 + Aceternity UI</span>
                </div>

                <div className="p-5 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-blue">[prototype]</span>
                  <h3 className="font-terminal text-lg text-terminal mt-2 mb-2">Preflight</h3>
                  <p className="text-terminal-secondary text-sm mb-3">
                    AI readiness assessment for clinicians. Dynamic JSON forms with personalized roadmaps.
                  </p>
                  <span className="font-terminal text-xs text-terminal-orange">currently building</span>
                </div>

                <div className="p-5 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-blue">[prototype]</span>
                  <h3 className="font-terminal text-lg text-terminal mt-2 mb-2">Watson</h3>
                  <p className="text-terminal-secondary text-sm mb-3">
                    Collaborative LLM output review with real-time diff tracking and labeling.
                  </p>
                  <span className="font-terminal text-xs text-terminal-cyan">TipTap + Django</span>
                </div>
              </div>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 font-terminal text-sm text-terminal-cyan hover:text-terminal-blue transition-colors"
              >
                <span className="text-terminal-green">$</span> view_full_portfolio →
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
                <span className="text-terminal-green">$</span> cat ./contact/lets-talk.md
              </p>
              <h2 className="font-terminal text-2xl md:text-3xl text-terminal mb-6">
                Need something <span className="text-terminal-cyan">built</span>?
              </h2>
              <p className="text-terminal-secondary leading-relaxed mb-8">
                I build AI-powered tools for human domains. Whether you need a custom system,
                technical consulting, or just want to talk about the intersection of psychology
                and engineering—let&apos;s connect.
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
                  <span className="text-terminal-green mr-2">$</span> view_services
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
