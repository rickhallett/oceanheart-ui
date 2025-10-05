"use client";
import { motion } from "framer-motion";
import { Navigation, Footer, PillarCard, CircleProgress, PageTransition, FAQSection } from "@/components/kaishin";
import { FiveBodiesCard } from "@/components/FiveBodiesCard";
import { IconBrain, IconHeart, IconUsers, IconTarget, IconBooks } from "@tabler/icons-react";

export default function PathPage() {
  return (
    <PageTransition>
      <main className="relative bg-black antialiased">
        <Navigation />

      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center relative pt-24 pb-12 px-6">
        {/* Ambient background effects - Ocean Blue only */}
        <div className="absolute -top-20 left-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

        {/* Decorative Kanji */}
        <span className="absolute top-20 right-10 text-[12rem] font-serif-jp text-white/[0.03] pointer-events-none select-none">道</span>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-zinc-100 mb-6 leading-tight">
              Choose Your <span className="text-gold">Path</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
              The Kaishin Method is a complete framework for transformation, integrating View, Compass, and Ground
              to develop all five bodies across eight circles of mastery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Framework Section - The 3 Pillars */}
      <section id="framework" className="py-16 px-6 bg-void relative">
        {/* Background blur orbs - Ocean Blue only */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4">
              The Integrated Framework
            </h2>
            <p className="text-lg text-zinc-400 font-light max-w-2xl mx-auto">
              View, Compass, Ground. A complete method for lasting transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PillarCard
              pillar="view"
              title="The View"
              subtitle="Zen & Non-Duality"
              description="The practice of seeing what is already here. We shift our identity from the content of experience to the silent, aware context in which it arises."
            />

            <PillarCard
              pillar="compass"
              title="The Compass"
              subtitle="Acceptance & Commitment (ACT)"
              description="The science-backed skills for a meaningful life. We learn to unhook from difficult thoughts, clarify our values, and take committed action."
              delay={0.1}
            />

            <PillarCard
              pillar="ground"
              title="The Ground"
              subtitle="Somatic Work & Physical Therapy"
              description="The practice of coming home to a strengthened body. We release stored tension from the nervous system, building capacity to handle life."
              delay={0.2}
            />
          </div>

          {/* Integration Statement */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-zinc-400 font-light leading-relaxed italic">
              View without Ground = Spiritual bypass. Compass without View = Behavioral change without peace.
              Ground without Compass = Regulation without direction.
              <span className="text-gold font-normal not-italic"> All three integrated = Complete transformation.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The 5 Bodies Section */}
      <section className="py-16 px-6 bg-black relative">
        {/* Background blur orb - Ocean Blue only */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4">
              The Five Bodies: Where Transformation Manifests
            </h2>
            <p className="text-lg text-zinc-400 font-light max-w-3xl mx-auto">
              Your development happens across five interconnected dimensions. Master one in isolation,
              and the others remain underdeveloped. Integrate all five, and transformation is complete.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <FiveBodiesCard
              color="#a1a1aa"
              colorRgb="161, 161, 170"
              icon={<IconBrain size={32} stroke={1.5} />}
              title="Mental Body"
              description="Your thoughts, beliefs, cognitive patterns, and mental clarity"
            />
            <FiveBodiesCard
              color="#a1a1aa"
              colorRgb="161, 161, 170"
              icon={<IconHeart size={32} stroke={1.5} />}
              title="Emotional Body"
              description="Your feelings, emotional regulation, and nervous system state"
            />
            <FiveBodiesCard
              color="#a1a1aa"
              colorRgb="161, 161, 170"
              icon={<IconUsers size={32} stroke={1.5} />}
              title="Physical Body"
              description="Your strength, vitality, nutrition, and movement capacity"
            />
            <FiveBodiesCard
              color="#a1a1aa"
              colorRgb="161, 161, 170"
              icon={<IconTarget size={32} stroke={1.5} />}
              title="Energetic Body"
              description="Your life force (Qi/Prana), energy centers, and subtle vitality"
            />
            <FiveBodiesCard
              color="#a1a1aa"
              colorRgb="161, 161, 170"
              icon={<IconBooks size={32} stroke={1.5} />}
              title="Spiritual Body"
              description="Your awareness, presence, and connection to Being"
            />
          </div>

          <div className="text-center">
            <p className="text-zinc-400 font-light italic max-w-3xl mx-auto">
              The Kaishin Method develops all five bodies simultaneously through the integrated practice of the three pillars.
              <span className="text-gold font-normal not-italic"> This is wholeness, not just improvement.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The 8 Circles Section */}
      <section className="py-24 px-6 bg-void relative">
        {/* Background blur orbs - Ocean Blue only */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4">
              The Eight Circles: Your Roadmap to Mastery
            </h2>
            <p className="text-lg text-zinc-400 font-light max-w-3xl mx-auto">
              Transformation follows a predictable path. These circles measure your depth of integration across all five bodies.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <CircleProgress currentCircle={3} showLabels={true} totalCircles={8} size="md" />
          </div>

          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-lg text-zinc-400 font-light mb-6">
              Our 30-Day Challenge takes you from <span className="text-gold font-normal">Circle 0 to Circle 1</span>.
              Our flagship 90-Day Transformation takes you from <span className="text-gold font-normal">Circle 1 to Circle 3</span>.
            </p>
            <p className="text-zinc-400 font-light italic mb-8">
              Circle 3 is the threshold most programs never cross. The Kaishin Method gets you there in 90 days.
            </p>

            {/* CTA */}
            <motion.a
              href="/program"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-block"
            >
              See Your Recommended Journey
            </motion.a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection variant="path" />

      <Footer />
    </main>
    </PageTransition>
  );
}
