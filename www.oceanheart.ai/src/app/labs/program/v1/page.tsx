"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation, Footer, PageTransition } from "@/components/kaishin";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { TracingBeam } from "@/components/ui/tracing-beam";

const tiers = [
  {
    level: "I",
    title: "Initiate",
    cost: "£90",
    timePerDay: "30 min",
    totalHours: "45 hours",
    completion: "New accessible entry point",
    description: "Your first step into systematic change. Build the foundation habit with minimal time commitment.",
    color: "zinc",
    entryPoint: true,
  },
  {
    level: "II",
    title: "Foundation",
    cost: "£180",
    timePerDay: "1 hour",
    totalHours: "90 hours",
    completion: "85% complete - manageable for most",
    description: "Double down on the fundamentals. Establish consistent daily practice across all core systems.",
    color: "jade",
    entryPoint: true,
  },
  {
    level: "III",
    title: "Practitioner",
    cost: "£360",
    timePerDay: "1.5 hours",
    totalHours: "135 hours",
    completion: "60% complete - solid daily habit",
    description: "The inflection point. This is where casual learners fall away and true practitioners emerge.",
    color: "ocean-blue",
    entryPoint: true,
    popular: true,
  },
  {
    level: "IV",
    title: "Advanced Practitioner",
    cost: "£720",
    timePerDay: "2 hours",
    totalHours: "180 hours",
    completion: "35% complete - first serious commitment",
    description: "Prerequisite: Practitioner tier. Significant time investment. Expect serious transformation.",
    color: "gold",
    prerequisite: "Practitioner",
  },
  {
    level: "V",
    title: "Master Practitioner",
    cost: "£1,440",
    timePerDay: "2.5 hours",
    totalHours: "225 hours",
    completion: "15% complete - dedicated practitioners only",
    description: "For those who've proven their commitment. Elite-level training and accountability.",
    color: "plum",
    prerequisite: "Practitioner",
  },
  {
    level: "VI",
    title: "Mentor",
    cost: "£2,880",
    timePerDay: "3 hours",
    totalHours: "270 hours",
    completion: "5% complete - semi-professional commitment",
    description: "Prepare to guide others. This is professional-level development work.",
    color: "rust",
    prerequisite: "Practitioner",
  },
  {
    level: "VII",
    title: "Teacher",
    cost: "£5,760",
    timePerDay: "3.5 hours",
    totalHours: "315 hours",
    completion: "1-2% complete - elite achievers only",
    description: "The pinnacle. Master the complete system and earn the right to teach it.",
    color: "gold",
    prerequisite: "Practitioner",
  },
];

const coreComponents = [
  {
    category: "Daily Practices",
    items: [
      "Daily video/audio teachings",
      "Morning journal ritual",
      "Evening reflection journal",
      "Daily quote from masters",
      "3 pages from Great Literature",
      "One new idea on change mechanics",
      "Zazen meditation (incremental)",
      "Energy movements / Naikan",
      "Guided meditations with logs",
      "Self authoring (one question daily)",
      "Cold showers (progressive)",
    ],
  },
  {
    category: "Weekly Practices",
    items: [
      "Weekly check-in calls",
      "Weekly Sanzen with Kai",
      '"Cliff jumps" - pain tolerance exercises',
    ],
  },
  {
    category: "Core Training",
    items: [
      "Breathwork fundamentals (all styles)",
      "Core mobility drills",
      "Core strength exercises",
      "Core conditioning drills",
      "Accountability buddying (in-app)",
      "3-tier dietary inflammation reduction",
    ],
  },
  {
    category: "Milestones",
    items: [
      "Monthly reviews",
      "Introductory meeting with Kai",
      "End of program exam",
      "Final blueprint session with Kai",
    ],
  },
];

const principles = [
  { text: "There is no one size fits all", emphasis: true },
  { text: "Pain is necessary" },
  { text: "There are no shortcuts" },
  { text: "Change takes time" },
  { text: "You get out what you put in" },
  { text: "Repetition is everything" },
  { text: "Knock, and the door will be opened" },
  { text: "Discipline is freedom", emphasis: true },
];

export default function ProgramV1Page() {
  return (
    <PageTransition>
      <main className="relative bg-black antialiased">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center relative pt-32 pb-20 px-6">
          <div className="absolute -top-20 left-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-0 w-80 h-80 bg-rust/10 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-gold/10 text-gold text-xs font-medium px-4 py-2 mb-6 tracking-wider border border-gold/20">
                LABS EXPERIMENTAL PROGRAM
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-zinc-100 mb-6 leading-tight">
                90 Days: The Core <span className="text-gold">Systems of Change</span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
                A data-driven transformation program. Seven progressive tiers.
                90 days per tier. Every exercise recorded and measured.
              </p>

              <div className="flex flex-col gap-2 text-sm text-zinc-500 font-light max-w-2xl mx-auto">
                <p>Total journey: 630 days (1.7 years)</p>
                <p>Total hours: 1,260 hours</p>
                <p className="text-gold">Number go up. Lizard brain get excite.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Philosophy */}
        <section className="py-20 px-6 bg-black relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-8 text-center">
                Core Philosophy
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {principles.map((principle, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`p-4 border ${
                      principle.emphasis
                        ? 'border-gold/30 bg-gold/5'
                        : 'border-white/10 bg-white/[0.02]'
                    } backdrop-blur-sm`}
                  >
                    <p className={`text-sm font-light ${
                      principle.emphasis ? 'text-gold' : 'text-zinc-300'
                    }`}>
                      {principle.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-black/50 p-6 border border-gold/20 backdrop-blur-sm">
                <p className="text-zinc-300 font-light leading-relaxed mb-4">
                  Join the countless men and women who found the truth; and the truth set them free.
                </p>
                <p className="text-zinc-400 font-light text-sm italic">
                  In the age of AI, what doesn&apos;t change? Adaptation is limited by biology, time, energy and entropy.
                  You get as strong as you embrace challenge. You only truly know what you become.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7-Tier System */}
        <section id="tiers" className="py-20 px-6 bg-black relative overflow-hidden">
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block bg-gold/10 text-gold text-xs font-medium px-4 py-2 mb-6 tracking-wider border border-gold/20">
                  THE SEVEN TIERS
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4">
                  Progressive Mastery System
                </h2>
                <p className="text-lg text-zinc-400 font-light max-w-3xl mx-auto mb-6">
                  Start at Initiate, Foundation, or Practitioner. Advanced tiers require Practitioner completion.
                </p>
                <p className="text-sm text-zinc-500 font-light">
                  All program elements grow in duration and intensity. Components added incrementally
                  to prevent overload while stimulating continual adaptation and learning.
                </p>
              </motion.div>
            </div>

            <TracingBeam className="px-6">
              <div className="space-y-16">
                {tiers.map((tier, idx) => (
                  <motion.div
                    key={tier.level}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className="relative"
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <div className="bg-jade text-black text-xs font-bold px-4 py-1 tracking-wider">
                          MOST POPULAR
                        </div>
                      </div>
                    )}

                    <CardSpotlight
                      radius={400}
                      color={
                        tier.color === "zinc" ? "rgba(255, 255, 255, 0.1)" :
                        tier.color === "jade" ? "rgba(93, 214, 174, 0.3)" :
                        tier.color === "ocean-blue" ? "rgba(79, 195, 247, 0.3)" :
                        tier.color === "gold" ? "rgba(242, 204, 143, 0.3)" :
                        tier.color === "plum" ? "rgba(186, 104, 200, 0.3)" :
                        "rgba(212, 106, 93, 0.3)"
                      }
                      className={`border-${tier.color}/40 hover:border-${tier.color}/60 transition-all duration-500 h-full`}
                    >
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-full bg-${tier.color}/20 border-2 border-${tier.color}/40 flex items-center justify-center`}>
                              <span className={`text-3xl font-serif font-light text-${tier.color === 'zinc' ? 'zinc-100' : tier.color}`}>
                                {tier.level}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-2xl md:text-3xl font-serif font-light text-zinc-100">
                                {tier.title}
                              </h3>
                              {tier.entryPoint && (
                                <p className="text-xs text-jade mt-1 font-medium tracking-wide">ENTRY POINT</p>
                              )}
                              {tier.prerequisite && (
                                <p className="text-xs text-rust mt-1 font-medium tracking-wide">
                                  REQUIRES {tier.prerequisite.toUpperCase()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-4xl font-serif font-light text-zinc-100">{tier.cost}</div>
                            <div className="text-xs text-zinc-500 mt-1">90 days</div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-zinc-400 font-light leading-relaxed mb-6">
                          {tier.description}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-3 gap-3 mb-4">
                          <div className="bg-black/50 p-4 border border-white/10 backdrop-blur-sm">
                            <div className="text-xs text-zinc-500 mb-1">Time/Day</div>
                            <div className="text-lg font-medium text-zinc-100">{tier.timePerDay}</div>
                          </div>
                          <div className="bg-black/50 p-4 border border-white/10 backdrop-blur-sm">
                            <div className="text-xs text-zinc-500 mb-1">Total Hours</div>
                            <div className="text-lg font-medium text-zinc-100">{tier.totalHours}</div>
                          </div>
                          <div className="bg-black/50 p-4 border border-white/10 backdrop-blur-sm">
                            <div className="text-xs text-zinc-500 mb-1">Completion</div>
                            <div className="text-sm font-medium text-zinc-100">{tier.completion}</div>
                          </div>
                        </div>
                      </div>
                    </CardSpotlight>
                  </motion.div>
                ))}
              </div>
            </TracingBeam>
          </div>
        </section>

        {/* Program Components */}
        <section className="py-20 px-6 bg-black relative overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-jade/10 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4">
                  What You&apos;ll Do
                </h2>
                <p className="text-lg text-zinc-400 font-light max-w-3xl mx-auto">
                  Every exercise recorded. Every metric tracked. This is spiritual engineering.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {coreComponents.map((section, idx) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-black/50 p-6 border border-white/10 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-serif font-light text-gold mb-4 border-b border-gold/20 pb-2">
                    {section.category}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-sm text-zinc-400 font-light flex items-start">
                        <span className="text-gold mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mt-12 bg-gold/5 p-8 border border-gold/20 backdrop-blur-sm text-center"
            >
              <p className="text-lg text-gold font-light mb-4">
                By the end, we find the optimal algorithm for YOU.
              </p>
              <p className="text-sm text-zinc-400 font-light">
                All true development is idiosyncratic. 99% of systems fail because they over-simplify,
                over-promise, and under-deliver. Not this one.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="start" className="py-24 px-6 bg-black relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
              Ready to Begin?
            </h2>
            <p className="text-lg text-zinc-400 font-light mb-12 max-w-2xl mx-auto">
              Choose your entry point. Start building the system that will transform you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/app"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gold text-black border border-gold hover:bg-gold/90 hover:shadow-[0_0_20px_rgba(242,204,143,0.8),0_0_40px_rgba(242,204,143,0.4)] transition-all duration-300 font-semibold"
              >
                Enter Member Portal
              </motion.a>
              <motion.a
                href="/program"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white/20 text-zinc-100 border border-white/40 hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 font-semibold"
              >
                View Standard Program
              </motion.a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
