"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navigation, Footer, PageTransition, PopularBadge, RiskReversal, FAQSection } from "@/components/kaishin";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function ProgramPage() {
  return (
    <PageTransition>
      <main className="relative bg-black antialiased">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center relative pt-32 pb-20 px-6">
          {/* Ambient background effects - Ocean Blue only */}
          <div className="absolute -top-20 left-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

          {/* Decorative Kanji */}
          <span className="absolute top-20 right-10 text-[12rem] font-serif-jp text-white/[0.03] pointer-events-none select-none">旅</span>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-zinc-100 mb-6 leading-tight">
                Your Transformation <span className="text-gold">Journey</span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
                A proven progression from foundation to mastery. Each step builds upon the last,
                creating lasting transformation across all five bodies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Recommended Journey Section */}
        <section id="journey" className="py- px-6 bg-black relative overflow-hidden">
          {/* Background blur orbs - Ocean Blue only */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
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
                  YOUR TRANSFORMATION PATH
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4">
                  The Recommended Journey
                </h2>
                <p className="text-lg text-zinc-400 font-light max-w-3xl mx-auto">
                  Most students begin with the 30-Day Challenge, then progress through this proven path.
                </p>
              </motion.div>
            </div>

            {/* Journey Steps with Tracing Beam */}
            <TracingBeam className="px-6">
              <div className="space-y-20">
                {/* Step 1: 30-Day Challenge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <CardSpotlight
                    radius={400}
                    color="rgba(79, 195, 247, 0.3)"
                    className="border-gold/40 hover:border-gold/60 transition-all duration-500 h-full"
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                            <span className="text-2xl font-serif font-light text-gold">1</span>
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-serif font-light text-zinc-100">Start Here</h3>
                            <p className="text-sm text-gold/90 font-light tracking-wide mt-1">30-Day Challenge</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-serif font-light text-zinc-100">£47</div>
                          <div className="text-xs text-zinc-500 mt-1">One-time</div>
                        </div>
                      </div>

                      <p className="text-zinc-400 font-light leading-relaxed mb-6">
                        Build your unshakable daily practice in just 15 minutes a day. Master the foundations
                        of all three pillars and achieve Circle 1 across all five bodies.
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-black/50 p-4 border border-gold/10 backdrop-blur-sm">
                          <div className="text-gold text-sm font-medium mb-2">What You Get</div>
                          <ul className="text-xs text-zinc-400 font-light space-y-1">
                            <li>• 30 daily guided practices</li>
                            <li>• Foundation across all 3 pillars</li>
                            <li>• Progress tracker & certificate</li>
                          </ul>
                        </div>
                        <div className="bg-black/50 p-4 border border-gold/10 backdrop-blur-sm">
                          <div className="text-gold text-sm font-medium mb-2">You&apos;ll Achieve</div>
                          <ul className="text-xs text-zinc-400 font-light space-y-1">
                            <li>• Circle 1 mastery</li>
                            <li>• Daily practice habit</li>
                            <li>• Ready for 90-day transformation</li>
                          </ul>
                        </div>
                      </div>

                      <Link
                        href="/app/courses#challenge"
                        className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors text-sm font-medium"
                      >
                        Begin Challenge →
                      </Link>
                    </div>
                  </CardSpotlight>
                </motion.div>

                {/* Step 2: 90-Day Transformation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative"
                >
                  <PopularBadge />
                  <CardSpotlight
                    radius={400}
                    color="rgba(93, 214, 174, 0.3)"
                    className="border-jade/40 hover:border-jade/60 transition-all duration-500 h-full"
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-jade/20 border border-jade/40 flex items-center justify-center">
                            <span className="text-2xl font-serif font-light text-jade">2</span>
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-serif font-light text-zinc-100">Transform</h3>
                            <p className="text-sm text-jade/90 font-light tracking-wide mt-1">90-Day Transformation</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-serif font-light text-zinc-100">£497</div>
                          <div className="text-xs text-zinc-500 mt-1">or 3x £177</div>
                        </div>
                      </div>

                      <p className="text-zinc-400 font-light leading-relaxed mb-6">
                        The complete immersion. Move from Circle 1 to Circle 3 mastery through structured
                        progression across Ground, Compass, and View. Our flagship transformation program.
                      </p>

                      <div className="grid md:grid-cols-3 gap-3 mb-6">
                        <div className="bg-black/50 p-4 border border-white/10 backdrop-blur-sm">
                          <div className="text-zinc-100 text-sm font-medium mb-1">Month 1: Ground</div>
                          <p className="text-xs text-zinc-400 font-light">Build foundation & regulation</p>
                        </div>
                        <div className="bg-black/50 p-4 border border-white/10 backdrop-blur-sm">
                          <div className="text-zinc-100 text-sm font-medium mb-1">Month 2: Compass</div>
                          <p className="text-xs text-zinc-400 font-light">Master psychological flexibility</p>
                        </div>
                        <div className="bg-black/50 p-4 border border-white/10 backdrop-blur-sm">
                          <div className="text-zinc-100 text-sm font-medium mb-1">Month 3: View</div>
                          <p className="text-xs text-zinc-400 font-light">Integrate true nature</p>
                        </div>
                      </div>

                      <Link
                        href="/app/courses#transformation"
                        className="inline-flex items-center gap-2 text-jade hover:text-jade/80 transition-colors text-sm font-medium"
                      >
                        Begin Transformation →
                      </Link>
                    </div>
                  </CardSpotlight>
                </motion.div>

                {/* Step 3: Choose Your Pillar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <CardSpotlight
                    radius={400}
                    color="rgba(255, 255, 255, 0.1)"
                    className="border-white/20 hover:border-white/30 transition-all duration-500 h-full"
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <span className="text-2xl font-serif font-light text-zinc-100">3</span>
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-serif font-light text-zinc-100">Deepen</h3>
                            <p className="text-sm text-zinc-100/90 font-light tracking-wide mt-1">Choose Your Pillar</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-serif font-light text-zinc-100">£497-597</div>
                          <div className="text-xs text-zinc-500 mt-1">Per course</div>
                        </div>
                      </div>

                      <p className="text-zinc-400 font-light leading-relaxed mb-6">
                        Specialize in your chosen pillar. Deep-dive programs for The View, The Compass, or The Ground.
                        Progress from Circle 3 to Circle 5 with advanced practices and deeper integration.
                      </p>

                      <div className="grid md:grid-cols-3 gap-3 mb-6">
                        <div className="bg-black/50 p-4 border border-white/10 backdrop-blur-sm">
                          <div className="text-zinc-100 text-sm font-medium mb-2">The View</div>
                          <p className="text-xs text-zinc-400 font-light">Non-dual awareness & Zen practice</p>
                        </div>
                        <div className="bg-black/50 p-4 border border-white/10 backdrop-blur-sm">
                          <div className="text-zinc-100 text-sm font-medium mb-2">The Compass</div>
                          <p className="text-xs text-zinc-400 font-light">Advanced ACT & psychological work</p>
                        </div>
                        <div className="bg-black/50 p-4 border border-white/10 backdrop-blur-sm">
                          <div className="text-zinc-100 text-sm font-medium mb-2">The Ground</div>
                          <p className="text-xs text-zinc-400 font-light">Somatic mastery & embodiment</p>
                        </div>
                      </div>

                      <Link
                        href="/app/courses"
                        className="inline-flex items-center gap-2 text-zinc-100 hover:text-gold transition-colors text-sm font-medium"
                      >
                        Explore Pillar Courses →
                      </Link>
                    </div>
                  </CardSpotlight>
                </motion.div>

                {/* Step 4: Master */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <CardSpotlight
                    radius={400}
                    color="rgba(186, 104, 200, 0.3)"
                    className="border-plum/40 hover:border-plum/60 transition-all duration-500 h-full"
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-plum/20 border border-plum/40 flex items-center justify-center">
                            <span className="text-2xl font-serif font-light text-plum">4</span>
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-serif font-light text-zinc-100">Master</h3>
                            <p className="text-sm text-plum/90 font-light tracking-wide mt-1">Applied or Certification</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-serif font-light text-zinc-100">£997-5,997</div>
                          <div className="text-xs text-zinc-500 mt-1">Varies by path</div>
                        </div>
                      </div>

                      <p className="text-zinc-400 font-light leading-relaxed mb-6">
                        Complete mastery and professional application. Choose Applied Mastery for personal integration
                        to Circle 8, or Certification to guide others through the method.
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-black/50 p-4 border border-plum/10 backdrop-blur-sm">
                          <div className="text-plum text-sm font-medium mb-2">Applied Mastery</div>
                          <ul className="text-xs text-zinc-400 font-light space-y-1">
                            <li>• Personal retreat intensives</li>
                            <li>• 1-on-1 mentorship</li>
                            <li>• Circle 5-8 progression</li>
                          </ul>
                        </div>
                        <div className="bg-black/50 p-4 border border-plum/10 backdrop-blur-sm">
                          <div className="text-plum text-sm font-medium mb-2">Certification</div>
                          <ul className="text-xs text-zinc-400 font-light space-y-1">
                            <li>• Teach the method professionally</li>
                            <li>• Supervised practice hours</li>
                            <li>• Ongoing professional development</li>
                          </ul>
                        </div>
                      </div>

                      <Link
                        href="/app/courses"
                        className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors text-sm font-medium"
                      >
                        Explore Mastery Paths →
                      </Link>
                    </div>
                  </CardSpotlight>
                </motion.div>
              </div>
            </TracingBeam>

            {/* Journey Note */}
            <div className="mt-20 text-center max-w-3xl mx-auto">
              <p className="text-zinc-400 font-light italic leading-relaxed">
                Most students begin with the 30-Day Challenge, then progress to the 90-Day Transformation.
                <span className="text-gold font-normal not-italic"> This proven path ensures solid foundations
                  before advancing to deeper work.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Risk Reversal */}
        <RiskReversal />

        {/* FAQ Section */}
        <FAQSection variant="program" />

        {/* CTA Section */}
        <section id="start" className="py-24 px-6 bg-void relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
              Ready to Begin?
            </h2>
            <p className="text-lg text-zinc-400 font-light mb-12 max-w-2xl mx-auto">
              Start with the 30-Day Challenge and build your foundation, or explore all courses in the member area.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/app/courses#challenge"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gold text-black border border-gold hover:bg-gold/90 hover:shadow-[0_0_20px_rgba(79,195,247,0.8),0_0_40px_rgba(79,195,247,0.4)] transition-all duration-300 font-semibold"
              >
                Start 30-Day Challenge
              </motion.a>
              <motion.a
                href="/app/courses"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white/20 text-zinc-100 border border-white/40 hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 font-semibold"
              >
                View All Courses
              </motion.a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
