"use client";
import { motion } from "framer-motion";
import { Navigation, Footer, LeadMagnetForm, PageTransition, TestimonialsCarousel } from "@/components/kaishin";

// Content components for LayoutGrid
const ViewContent = () => (
  <div className="p-6">
    <p className="font-serif text-3xl md:text-4xl text-zinc-100 mb-3">
      The View
    </p>
    <p className="text-gold text-sm mb-4">(Zen & Non-Duality)</p>
    <p className="text-zinc-300 text-base leading-relaxed">
      The practice of seeing what is already here. We shift our identity from the content of experience
      to the silent, aware context in which it arises.
    </p>
  </div>
);

const CompassContent = () => (
  <div className="p-6">
    <p className="font-serif text-3xl md:text-4xl text-zinc-100 mb-3">
      The Compass
    </p>
    <p className="text-gold text-sm mb-4">(ACT Psychology)</p>
    <p className="text-zinc-300 text-base leading-relaxed">
      The science-backed skills for a meaningful life. We learn to unhook from difficult thoughts,
      clarify our values, and take committed action.
    </p>
  </div>
);

const GroundContent = () => (
  <div className="p-6">
    <p className="font-serif text-3xl md:text-4xl text-zinc-100 mb-3">
      The Ground
    </p>
    <p className="text-gold text-sm mb-4">(Somatic Work & Physical Therapy)</p>
    <p className="text-zinc-300 text-base leading-relaxed">
      The practice of coming home to a strengthened body. We release stored tension from the nervous system,
      building capacity to handle life.
    </p>
  </div>
);

// Pillar cards configuration for asymmetric grid
const _pillarCards = [
  {
    id: 1,
    content: <ViewContent />,
    className: "md:col-span-2 h-full",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23000000' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='120' fill='%234fc3f7' opacity='0.1'%3E心%3C/text%3E%3C/svg%3E",
  },
  {
    id: 2,
    content: <CompassContent />,
    className: "col-span-1 h-full",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect fill='%23000000' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='80' fill='%234fc3f7' opacity='0.1'%3E道%3C/text%3E%3C/svg%3E",
  },
  {
    id: 3,
    content: <GroundContent />,
    className: "md:col-span-3 h-full",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='300'%3E%3Crect fill='%23000000' width='1200' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='100' fill='%234fc3f7' opacity='0.1'%3E地%3C/text%3E%3C/svg%3E",
  },
];

export default function KaishinMethodLanding() {
  return (
    <PageTransition>
      <main className="relative bg-black antialiased">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative pt-20 sm:pt-24 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
          {/* Ambient background effects - Gold primary */}
          <div className="absolute -top-10 sm:-top-20 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-gold/20 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute top-20 sm:top-40 right-0 w-56 sm:w-80 h-56 sm:h-80 bg-gold/10 rounded-full blur-2xl sm:blur-3xl" />

          {/* Decorative Kanji */}
          <span className="absolute top-20 right-10 text-[12rem] font-serif-jp text-white/[0.03] pointer-events-none select-none">心</span>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light text-zinc-100 mb-6 leading-tight">
                Stop Chasing Fragments.<br />
                <span className="text-gold">Master the Whole.</span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
                A <span className="text-gold">90-day transformation</span> that integrates your Mental, Emotional, Physical, Energetic, and Spiritual bodies
                into a unified system for <span className="text-gold">lasting change</span>.
              </p>

              <p className="text-base md:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
                <span className="text-gold">The Kaishin Method:</span> Where scientific rigour meets the ease of Zen, grounded in the body you already have.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <motion.a
                  href="/path"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  <span className="relative z-10">Understand the Method</span>
                </motion.a>
                <motion.a
                  href="/app/courses"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Start 30-Day Challenge
                </motion.a>
              </div>

              {/* Micro Social Proof */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center text-xs sm:text-sm text-zinc-500 italic px-4">
                <p className="max-w-xs sm:max-w-sm">&quot;In 90 days, I went from understanding concepts to living them. The 5 bodies framework changed everything.&quot; <span className="text-gold font-bold">~ Buddha</span></p>
                <p className="max-w-xs sm:max-w-sm hidden sm:block">&quot;Circle 1 to Circle 3 in three months. I can feel the difference in every aspect of my life.&quot;</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Kaishin Section - Unique Value Proposition */}
        <section className="py-24 px-6 bg-void relative">
          {/* Background blur orb - Ocean Blue only */}
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4">
                Why Kaishin Is <span className="text-gold">Different</span>
              </h2>
              <p className="text-base sm:text-lg text-zinc-400 font-light max-w-3xl mx-auto">
                Credentials—<span className="text-gold"> and integration</span>. Three domains of expertise unified into one complete method.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div>
                <h3 className="text-3xl font-serif font-light text-zinc-100 mb-6">
                  From <span className="text-zinc-400">Fragmentation</span> to <span className="text-gold">Integration</span>
                </h3>
                <p className="text-zinc-400 font-light leading-relaxed mb-6">
                  My journey didn&apos;t begin with mastery—it began with a complete breakdown at sixteen.
                  Depression hit like a system crash, and I spent years collecting tools to patch myself together:
                  therapy for the mind, meditation for the spirit, exercise for the body.
                </p>
                <p className="text-zinc-400 font-light leading-relaxed mb-6">
                  Each helped. None was enough. The problem wasn&apos;t the practices—it was that <span className="text-zinc-300">they were fragmented</span>.
                  I had a regulated nervous system in therapy but spiritual emptiness. I had profound insights in meditation
                  but behavioral patterns that wouldn&apos;t shift.
                </p>
                <p className="text-zinc-400 font-light leading-relaxed mb-6">
                  <span className="text-gold font-normal">The breakthrough:</span> I stopped trying to master each domain
                  separately and started asking: <span className="text-gold">How do these five dimensions of being human develop together?</span>
                </p>
                <p className="text-zinc-400 font-light leading-relaxed">
                  That question became The Kaishin Method. <span className="text-gold font-normal">This is integration, not just credentials.</span>
                </p>
              </div>

              <div className="card-featured p-8 transition-all duration-300">
                <div className="mb-6 relative z-10">
                  <div className="text-sm text-gold font-medium tracking-wide mb-2">THE INTEGRATION</div>
                  <h3 className="text-2xl font-serif font-light text-zinc-100 mb-4"><span className="text-gold">Three Worlds</span>, One Method</h3>
                </div>

                <div className="space-y-6 relative z-10">
                  <div>
                    <div className="font-sans font-medium text-zinc-100 mb-2">20 Years: Contemplative Practice</div>
                    <p className="text-sm text-zinc-400 font-light">Zen, Vipassana, non-dual traditions. Extended retreats. Direct transmission from multiple lineages.</p>
                  </div>

                  <div>
                    <div className="font-sans font-medium text-zinc-100 mb-2">15 Years: Psychotherapy</div>
                    <p className="text-sm text-zinc-400 font-light">CBT, ACT, trauma-informed care. Deep understanding of human suffering and what creates lasting change.</p>
                  </div>

                  <div>
                    <div className="font-sans font-medium text-zinc-100 mb-2">10 Years: Software Engineering</div>
                    <p className="text-sm text-zinc-400 font-light">AI/ML systems, human-computer interaction. Bridging code and consciousness for the age of AI.</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.1] relative z-10">
                  <p className="text-sm text-zinc-400 font-light italic">
                    &quot;Kaishin helped me move from knowing about presence to actually living it. This integration changed everything.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Framework Teaser */}
        <section className="py-24 px-6 relative overflow-hidden bg-black">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-serif font-light text-zinc-100 mb-6">
                {/* What Makes <span className="text-gold">This</span> Different */}
              </h2>
              <p className="text-lg text-zinc-400 font-light max-w-2xl mx-auto mb-12 text-left">
                <span className="text-gold">Not another </span>meditation app...
              </p>
              <p className="text-lg text-zinc-400 font-light max-w-2xl mx-auto mb-12">
                <span className="text-gold">Not another </span>therapy model...
              </p>
              <p className="text-lg text-zinc-400 font-light max-w-2xl mx-auto mb-12 text-right">
                The Kaishin Method integrates <br />
                three fundamental domains <br />
                of powerful practice
              </p>
            </div>

            {/* Three Pillars - Asymmetric LayoutGrid */}


            <div className="text-center">
              <motion.a
                href="/path"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-block"
              >
                Learn the Complete Framework →
              </motion.a>
            </div>
          </div>
        </section>

        {/* Transformation Journey Preview */}
        <section className="py-20 px-6 bg-black relative">
          {/* Background blur orb - Ocean Blue only */}
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
              From Fragmented to <span className="text-gold">Whole</span> in 90 Days
            </h2>
            <p className="text-lg text-zinc-400 font-light max-w-3xl mx-auto mb-12">
              The Kaishin Method develops all five dimensions of being human simultaneously—Mental, Emotional, Physical, Energetic, and Spiritual. <span className="text-gold">This is wholeness, not just improvement.</span>
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
              <div className="bg-void border border-gold/30 p-8 text-left glow-ocean-blue">
                <div className="text-gold text-sm font-medium mb-2">30-DAY CHALLENGE</div>
                <h3 className="text-2xl font-serif font-light text-zinc-100 mb-3">Build Your Foundation</h3>
                <p className="text-zinc-400 font-light mb-4">
                  Master the fundamentals across all three pillars. Achieve Circle 1 and establish your unshakable daily practice.
                </p>
                <div className="text-gold font-medium">£47 · Start Here</div>
              </div>

              <div className="bg-void border border-jade/30 p-8 text-left glow-jade">
                <div className="text-jade text-sm font-medium mb-2">90-DAY TRANSFORMATION</div>
                <h3 className="text-2xl font-serif font-light text-zinc-100 mb-3">Complete Integration</h3>
                <p className="text-zinc-400 font-light mb-4">
                  Progress from Circle 1 to Circle 3 mastery. The threshold most programs never cross—reached in 90 days.
                </p>
                <div className="text-jade font-medium">£497 · Most Popular</div>
              </div>
            </div>

            <motion.a
              href="/program"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-block"
            >
              See Your Complete Journey →
            </motion.a>
          </div>
        </section>

        {/* Testimonials - Dynamic from Trustpilot */}
        <TestimonialsCarousel />

        {/* Lead Magnet */}
        <LeadMagnetForm />

        <Footer />
      </main>
    </PageTransition>
  );
}
