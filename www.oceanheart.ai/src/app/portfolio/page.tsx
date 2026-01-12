"use client";
import { Navigation, Footer, PageTransition, PortfolioCard } from "@/components/kaishin";
import { motion } from "framer-motion";
import { portfolioSections } from "@/lib/portfolio";

export default function PortfolioPage() {

  return (
    <PageTransition>
      <main className="relative bg-black antialiased">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center relative pt-32 pb-20 px-6 sm:px-4">
          <div className="absolute top-10 left-0 w-96 h-96 bg-ocean-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-0 w-80 h-80 bg-plum/10 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-ocean-blue/10 rounded-full border border-ocean-blue/20 mb-6">
                <span className="text-ocean-blue font-semibold text-sm tracking-wide">Live Design Studies</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-zinc-100 mb-6">
                Oceanheart Labs
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
                Prototypes at the frontier of AI, wellbeing, and web engineering. Production quality websites that I build and maintain. From architecture demos to full products, watch them grow in real-time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects by Section */}
        {portfolioSections
          .filter((section) => !section.hidden)
          .map((section) => (
            <section key={section.id} className="py-16 px-6 sm:px-4">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-zinc-400 font-light leading-relaxed max-w-3xl">
                    {section.description}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.projects.map((project, index) => (
                    <PortfolioCard
                      key={project.id}
                      project={{ ...project, sectionTitle: section.title }}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}

        {/* Call to Action */}
        <section className="py-20 px-6 sm:px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-blue/5 to-transparent" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-6">
                Ready to <span className="text-ocean-blue">drive results</span>?
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-8">
                For hiring teams: See a human-centered engineer who delivers technical excellence with proven business impact.<br />
                For clients: Get measurable ROI through psychology-informed software that solves real problems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendar.app.google/RMwsbtUZ76G6VZzb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-ocean-blue text-black border border-ocean-blue hover:bg-ocean-blue/90 hover:shadow-[0_0_20px_rgba(79,195,247,0.8)] transition-all duration-300 font-semibold rounded-full"
                >
                  Schedule a Call
                </a>
                <a
                  href="/path"
                  className="px-8 py-3 bg-white/20 text-zinc-100 border border-white/40 hover:bg-white/30 transition-all duration-300 font-semibold rounded-full"
                >
                  Learn More About The Method
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
