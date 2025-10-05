import { motion } from "framer-motion";

export function ProblemAmplification() {
  return (
    <section className="py-20 px-6 bg-black relative">
      {/* Background blur orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-plum/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-8 text-center">
            You&apos;ve Tried Everything. <br />
            <span className="text-zinc-400">Why Are You Still Incomplete?</span>
          </h2>

          <div className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed">
            <p>
              You&apos;ve tried <span className="text-zinc-300">meditation</span>. You&apos;ve done <span className="text-zinc-300">therapy</span>. You&apos;ve worked on <span className="text-zinc-300">your body</span>. Each practice helped—for a while. The meditation brought calm. The therapy brought insight. The exercise brought energy.
            </p>

            <p>
              But something still feels <span className="text-plum">incomplete</span>.
            </p>

            <p>
              You have moments of peace in meditation, but your behavioral patterns don&apos;t shift. You gain insights in therapy, but your body still holds tension. You strengthen your body, but the existential questions remain unanswered.
            </p>

            <p className="text-xl text-zinc-300 font-normal">
              The problem isn&apos;t you. The problem is that most approaches treat you as separate parts, not an integrated whole.
            </p>

            <p>
              Meditation apps focus on the mind. Therapy focuses on emotions and behavior. Fitness programs focus on the body. <span className="text-gold">But you&apos;re not separate parts—you&apos;re a unified system</span>.
            </p>

            <p className="border-l-2 border-gold/40 pl-6 italic text-zinc-400">
              View without Ground = Spiritual bypass. Compass without View = Behavioral change without peace. Ground without Compass = Regulation without direction. <span className="text-gold font-normal not-italic">The result? Temporary relief, but no lasting transformation.</span>
            </p>

            <p className="text-center text-lg text-zinc-300 font-normal pt-4">
              There&apos;s a reason other approaches haven&apos;t worked. You need <span className="text-gold">complete integration</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
