"use client";
import { Navigation, PageTransition } from "@/components/kaishin";
import { TerminalFooter } from "@/components/terminal";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconCode, IconRobot, IconUsers, IconBuildingSkyscraper, IconBrain, IconArrowRight } from "@tabler/icons-react";

export default function ConsultingPage() {
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
          <div className="absolute top-10 right-0 w-96 h-96 bg-terminal-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-0 w-80 h-80 bg-terminal-purple/10 rounded-full blur-3xl" />

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-4">
                <span className="text-terminal-green">$</span> cat ./services/engineering-consulting.md
              </p>
              <h1 className="font-terminal text-3xl sm:text-4xl md:text-5xl text-terminal mb-4">
                Engineering <span className="text-terminal-cyan">Consulting</span>
              </h1>
              <p className="text-lg text-terminal-secondary font-light leading-relaxed max-w-2xl mb-8">
                I build AI-powered systems that work for humans. Not generic advice—actual
                engineering from someone who understands both the code and the psychology.
              </p>
              <div className="flex flex-wrap gap-4">
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
                  <span className="text-terminal-green mr-2">$</span> send_email
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-6 bg-terminal-bg-secondary" id="services">
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
              <h2 className="font-terminal text-2xl text-terminal-green mb-8">
                What I Build
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-terminal-bg border border-white/10 rounded-sm hover:border-terminal-cyan/30 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <IconRobot className="w-6 h-6 text-terminal-cyan" />
                    <h3 className="font-terminal text-lg text-terminal">Custom AI Tools</h3>
                  </div>
                  <p className="text-terminal-secondary text-sm leading-relaxed mb-4">
                    Bespoke AI applications designed for your specific domain. Not off-the-shelf
                    wrappers—purpose-built systems that understand your workflows and users.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["RAG Systems", "LLM Integration", "Custom UIs", "API Design"].map((tag) => (
                      <span key={tag} className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-terminal-bg border border-white/10 rounded-sm hover:border-terminal-cyan/30 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <IconCode className="w-6 h-6 text-terminal-purple" />
                    <h3 className="font-terminal text-lg text-terminal">Web Applications</h3>
                  </div>
                  <p className="text-terminal-secondary text-sm leading-relaxed mb-4">
                    Production-grade web applications built with modern stacks. From prototypes
                    that ship fast to systems that scale.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "Python", "PostgreSQL"].map((tag) => (
                      <span key={tag} className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-terminal-bg border border-white/10 rounded-sm hover:border-terminal-cyan/30 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <IconBrain className="w-6 h-6 text-terminal-orange" />
                    <h3 className="font-terminal text-lg text-terminal">AI Strategy</h3>
                  </div>
                  <p className="text-terminal-secondary text-sm leading-relaxed mb-4">
                    Technical guidance on AI adoption that&apos;s grounded in reality. Where to
                    invest, what to avoid, and how to implement without breaking what works.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Architecture", "Evaluation", "Roadmapping", "Training"].map((tag) => (
                      <span key={tag} className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-terminal-bg border border-white/10 rounded-sm hover:border-terminal-cyan/30 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <IconUsers className="w-6 h-6 text-terminal-green" />
                    <h3 className="font-terminal text-lg text-terminal">Team Augmentation</h3>
                  </div>
                  <p className="text-terminal-secondary text-sm leading-relaxed mb-4">
                    Embedded engineering support for teams building AI features. I join your
                    team temporarily to accelerate delivery and transfer knowledge.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Pairing", "Code Review", "Architecture", "Mentoring"].map((tag) => (
                      <span key={tag} className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who I Work With */}
        <section className="py-16 px-6 bg-terminal-bg">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> cat ./clients/target-audiences.md
              </p>
              <h2 className="font-terminal text-2xl text-terminal-cyan mb-8">
                Who I Work With
              </h2>

              <div className="space-y-6">
                <div className="p-6 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <div className="flex items-start gap-4">
                    <IconBuildingSkyscraper className="w-6 h-6 text-terminal-purple flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-terminal text-lg text-terminal mb-2">
                        Healthcare & Mental Health Organisations
                      </h3>
                      <p className="text-terminal-secondary text-sm leading-relaxed mb-3">
                        Teams building AI tools for clinicians, patients, or care systems. I bring
                        15 years of direct clinical experience—I understand the constraints of
                        therapeutic relationships, confidentiality, and clinical workflows.
                      </p>
                      <div className="font-terminal text-xs text-terminal-green">
                        Built: Assessment engines, session note automation, patient-facing chatbots
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <div className="flex items-start gap-4">
                    <IconRobot className="w-6 h-6 text-terminal-cyan flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-terminal text-lg text-terminal mb-2">
                        Startups Integrating AI
                      </h3>
                      <p className="text-terminal-secondary text-sm leading-relaxed mb-3">
                        Early-stage teams who need to move fast without accumulating technical debt.
                        I help you ship AI features that work now and scale later.
                      </p>
                      <div className="font-terminal text-xs text-terminal-green">
                        Built: LLM integrations, RAG systems, conversational interfaces
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <div className="flex items-start gap-4">
                    <IconUsers className="w-6 h-6 text-terminal-orange flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-terminal text-lg text-terminal mb-2">
                        Coaches, Consultants & Course Creators
                      </h3>
                      <p className="text-terminal-secondary text-sm leading-relaxed mb-3">
                        Solo practitioners and small teams who need custom technology without
                        enterprise budgets. I build systems that fit your practice, not the other way around.
                      </p>
                      <div className="font-terminal text-xs text-terminal-green">
                        Built: Member portals, content delivery platforms, booking integrations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Proof Section */}
        <section className="py-16 px-6 bg-terminal-bg-secondary">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> ls ./shipped/ | head -4
              </p>
              <h2 className="font-terminal text-2xl text-terminal-green mb-8">
                Recent Work
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-terminal-bg border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-green">[production]</span>
                  <h3 className="font-terminal text-lg text-terminal mt-2 mb-2">Swanage Traffic Alliance</h3>
                  <p className="text-terminal-secondary text-sm mb-3">
                    Activism site with real-time traffic data, analytics, and CMS for a coastal
                    town&apos;s traffic campaign.
                  </p>
                  <span className="font-terminal text-xs text-terminal-cyan">500+ community members</span>
                </div>

                <div className="p-5 bg-terminal-bg border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-green">[production]</span>
                  <h3 className="font-terminal text-lg text-terminal mt-2 mb-2">Becoming Diamond</h3>
                  <p className="text-terminal-secondary text-sm mb-3">
                    Premium coaching platform with 3D globe visualizations and protected
                    member content.
                  </p>
                  <span className="font-terminal text-xs text-terminal-cyan">Next.js 15 + Aceternity UI</span>
                </div>

                <div className="p-5 bg-terminal-bg border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-blue">[prototype]</span>
                  <h3 className="font-terminal text-lg text-terminal mt-2 mb-2">Preflight</h3>
                  <p className="text-terminal-secondary text-sm mb-3">
                    AI readiness assessment engine for healthcare. Dynamic forms with
                    personalized adoption roadmaps.
                  </p>
                  <span className="font-terminal text-xs text-terminal-orange">currently building</span>
                </div>

                <div className="p-5 bg-terminal-bg border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-blue">[prototype]</span>
                  <h3 className="font-terminal text-lg text-terminal mt-2 mb-2">Watson</h3>
                  <p className="text-terminal-secondary text-sm mb-3">
                    Collaborative LLM output review with real-time diff tracking and
                    quality labeling.
                  </p>
                  <span className="font-terminal text-xs text-terminal-cyan">TipTap + Django</span>
                </div>
              </div>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 font-terminal text-sm text-terminal-cyan hover:text-terminal-blue transition-colors"
              >
                <span className="text-terminal-green">$</span> view_full_portfolio
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-6 bg-terminal-bg">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-terminal text-terminal-muted text-sm mb-2">
                <span className="text-terminal-green">$</span> explain --process
              </p>
              <h2 className="font-terminal text-2xl text-terminal-purple mb-8">
                How It Works
              </h2>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-5 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <div className="font-terminal text-xs text-terminal-cyan mb-2">01</div>
                  <h3 className="font-terminal text-sm text-terminal mb-2">Discovery Call</h3>
                  <p className="text-terminal-muted text-xs leading-relaxed">
                    30-min call to understand what you&apos;re building, why, and where you&apos;re stuck.
                  </p>
                </div>

                <div className="p-5 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <div className="font-terminal text-xs text-terminal-cyan mb-2">02</div>
                  <h3 className="font-terminal text-sm text-terminal mb-2">Proposal</h3>
                  <p className="text-terminal-muted text-xs leading-relaxed">
                    Clear scope, timeline, and price. No hourly billing surprises.
                  </p>
                </div>

                <div className="p-5 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <div className="font-terminal text-xs text-terminal-cyan mb-2">03</div>
                  <h3 className="font-terminal text-sm text-terminal mb-2">Build</h3>
                  <p className="text-terminal-muted text-xs leading-relaxed">
                    Regular updates, working demos, and async communication via Slack/Discord.
                  </p>
                </div>

                <div className="p-5 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <div className="font-terminal text-xs text-terminal-cyan mb-2">04</div>
                  <h3 className="font-terminal text-sm text-terminal mb-2">Ship</h3>
                  <p className="text-terminal-muted text-xs leading-relaxed">
                    Deployed to production with documentation and handoff support.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
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
                Book a discovery call to discuss your project. No sales pitch—just a
                conversation about what you&apos;re building and whether I can help.
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
