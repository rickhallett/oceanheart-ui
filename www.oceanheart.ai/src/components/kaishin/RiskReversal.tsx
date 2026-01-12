import { motion } from "framer-motion";
import { IconShieldCheck } from "@tabler/icons-react";

export function RiskReversal() {
  return (
    <section className="py-16 px-6 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-jade/5 to-gold/5" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-void border border-gold/20 p-8 md:p-12 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gold/10 border border-gold/30 rounded-full">
              <IconShieldCheck size={48} className="text-gold" stroke={1.5} />
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-4">
            30-Day <span className="text-gold">Money-Back Guarantee</span>
          </h3>

          <p className="text-lg text-zinc-400 font-light leading-relaxed mb-6 max-w-2xl mx-auto">
            Complete the practices for 30 days. If you don&apos;t see measurable progress across your Mental, Emotional, Physical, Energetic, and Spiritual bodies, we&apos;ll refund your investment—no questions asked.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-sm text-zinc-400 font-light">
            <div>
              <div className="text-gold font-medium mb-2">Try Risk-Free</div>
              <p>Full 30 days to experience the method</p>
            </div>
            <div>
              <div className="text-jade font-medium mb-2">Simple Process</div>
              <p>Email us anytime within 30 days</p>
            </div>
            <div>
              <div className="text-gold font-medium mb-2">No Questions</div>
              <p>If it&apos;s not working for you, you get your money back</p>
            </div>
          </div>

          <p className="mt-8 text-zinc-500 italic text-sm">
            We&apos;re confident in the Kaishin Method because it works. And we want you to experience that transformation yourself.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
