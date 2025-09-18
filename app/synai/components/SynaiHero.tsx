"use client";

import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function SynaiHero() {
  return (
    <AuroraBackground>
      <motion.section 
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 min-h-screen"
      >

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white dark:text-white">
            Meet Synai
          </h1>
          
          <TextGenerateEffect 
            words="Your Personal AI Coach, Engineered for You"
            className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 text-white/90 dark:text-white/90"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-base md:text-xl lg:text-2xl mb-12 text-white/80 dark:text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            What if you had an AI that truly understood your unique patterns, values, and goals?
            Not generic advice, but deeply personalized guidance built from a clinical assessment of who you are.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <Link
              href="/#pricing"
              className="inline-block bg-white text-primary px-8 py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/20"
            >
              Discover Your Personal AI
            </Link>
          </motion.div>
        </div>

      </motion.section>
    </AuroraBackground>
  );
}