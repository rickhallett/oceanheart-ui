"use client";
import { Navigation, Footer, PageTransition, FAQSection } from "@/components/kaishin";
import { motion } from "framer-motion";
import { IconHeart, IconBrain, IconLeaf, IconWaveSine, IconActivity, IconUser } from "@tabler/icons-react";

export default function SomaticPage() {
  return (
    <PageTransition>
      <main className="relative bg-black antialiased">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-[70vh] flex items-center justify-center relative pt-32 pb-20 px-4">
          <div className="absolute top-10 left-0 w-96 h-96 bg-jade/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-0 w-80 h-80 bg-ocean-blue/10 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-zinc-100 mb-6">
                Somatic Sessions
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto mb-4">
                Embodied practice to release tension and build nervous system capacity.
              </p>
              <p className="text-sm text-zinc-500">
                Formerly &ldquo;Somatic Bournemouth&rdquo; — now serving practitioners globally
              </p>
            </motion.div>
          </div>
        </section>

        {/* What is Somatic Work */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
                What is <span className="text-jade">Somatic Work</span>?
              </h2>
              <p className="text-lg text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed">
                Somatic practice is the art of listening to your body. Through gentle movement, breathwork, and embodied awareness, we create space for your nervous system to regulate, release stored tension, and return to balance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <IconActivity className="w-10 h-10" />,
                  title: "Nervous System Regulation",
                  description: "Learn to recognize and shift your nervous system states, building resilience and capacity to stay present with difficult emotions and sensations."
                },
                {
                  icon: <IconWaveSine className="w-10 h-10" />,
                  title: "Tension Release",
                  description: "Gentle, body-led practices help release chronic holding patterns and muscular tension, creating more ease and freedom in movement and daily life."
                },
                {
                  icon: <IconBrain className="w-10 h-10" />,
                  title: "Mind-Body Integration",
                  description: "Develop greater awareness of the connection between thoughts, emotions, and physical sensations, fostering deeper self-understanding and presence."
                },
                {
                  icon: <IconLeaf className="w-10 h-10" />,
                  title: "Grounding & Centering",
                  description: "Practices to help you feel more anchored in your body, present in the moment, and connected to a sense of inner stability and safety."
                },
                {
                  icon: <IconHeart className="w-10 h-10" />,
                  title: "Emotional Processing",
                  description: "Work with emotions as embodied experiences, learning to stay with and move through feelings rather than avoiding or being overwhelmed by them."
                },
                {
                  icon: <IconUser className="w-10 h-10" />,
                  title: "Authentic Expression",
                  description: "Discover how your body wants to move and express, reconnecting with spontaneity, creativity, and your innate somatic intelligence."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 bg-charcoal/50 backdrop-blur-sm border border-white/[0.1] rounded-xl hover:border-jade/50 transition-all duration-300"
                >
                  <div className="text-jade mb-4">{item.icon}</div>
                  <h3 className="font-serif font-light text-xl text-zinc-100 mb-3">{item.title}</h3>
                  <p className="text-zinc-400 font-light leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Benefits */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-charcoal/30 to-transparent">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
                Who <span className="text-jade">Benefits</span> from Somatic Work?
              </h2>
              <p className="text-lg text-zinc-400 font-light">
                Somatic sessions are particularly valuable for:
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  title: "Highly Sensitive People",
                  description: "Those who feel overwhelmed by external stimuli and need tools to regulate their nervous system and create more internal space."
                },
                {
                  title: "Trauma Survivors",
                  description: "Individuals working through trauma who want to rebuild safety in their bodies and develop greater capacity for self-regulation (complementing trauma therapy)."
                },
                {
                  title: "Chronic Pain & Tension",
                  description: "People experiencing persistent physical holding patterns, stress-related pain, or tension that doesn't respond to traditional approaches."
                },
                {
                  title: "Meditation & Mindfulness Practitioners",
                  description: "Those deepening their practice who want to work more directly with embodied awareness and somatic meditation techniques."
                },
                {
                  title: "Therapists & Healers",
                  description: "Practitioners seeking their own embodiment practices to prevent burnout, regulate after difficult sessions, and deepen their capacity to hold space."
                },
                {
                  title: "Anyone Seeking Embodiment",
                  description: "People who feel disconnected from their bodies, live primarily in their heads, and want to cultivate a more grounded, present way of being."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 bg-charcoal/50 backdrop-blur-sm border border-white/[0.1] rounded-xl border-l-4 border-l-jade/50"
                >
                  <h3 className="font-serif font-light text-xl text-zinc-100 mb-2">{item.title}</h3>
                  <p className="text-zinc-400 font-light leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-jade/10 via-transparent to-jade/10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-6">
                Begin Your <span className="text-jade">Embodiment Journey</span>
              </h2>
              <p className="text-lg text-zinc-400 font-light mb-8 max-w-2xl mx-auto">
                Whether you&apos;re seeking relief from chronic tension, deeper connection with your body, or tools to regulate your nervous system, somatic practice offers a gentle, body-led path forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:kai@oceanheart.ai"
                  className="px-8 py-3 bg-jade text-black border border-jade hover:bg-jade/90 hover:shadow-[0_0_20px_rgba(93,214,174,0.8)] transition-all duration-300 font-semibold rounded-full"
                >
                  Book a Session
                </a>
                <a
                  href="/program"
                  className="px-8 py-3 bg-white/20 text-zinc-100 border border-white/40 hover:bg-white/30 transition-all duration-300 font-semibold rounded-full"
                >
                  Explore The Program
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection variant="path" />

        <Footer />
      </main>
    </PageTransition>
  );
}
