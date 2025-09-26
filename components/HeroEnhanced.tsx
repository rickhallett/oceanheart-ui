"use client";

import Image from "next/image";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FlipWords } from "@/components/ui/flip-words";
import { motion } from "motion/react";

const HeroEnhanced = () => {
  const words = ["Consciousness", "Sensitivity", "Intelligence"];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut"
          }}
          className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20"
        >
          <div className="flex flex-col gap-10 items-center justify-center text-center w-full lg:w-1/2">

            {/* Animated Headline */}
            <div className="space-y-4">
              <TextGenerateEffect
                words="Human-Centred Transformation"
                className="font-extrabold text-4xl lg:text-6xl tracking-tight text-base-content"
                duration={0.5}
              />
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="font-bold text-2xl lg:text-3xl"
              >
                Your Human Edge, <span className="text-primary">Amplified</span>
              </motion.h2>
            </div>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-lg opacity-90 leading-relaxed max-w-xl"
            >
              Overwhelmed by AI&apos;s pace? Master it with heart, clarity, and Kai&apos;s unique guidance.
            </motion.p>

            {/* Framework with Flip Words */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex flex-col gap-2 items-center w-full"
            >
              <div className="text-xl lg:text-2xl font-semibold">
                Amplified{" "}
                <FlipWords
                  words={words}
                  className="text-primary font-bold"
                  duration={3000}
                />
              </div>
            </motion.div>

            {/* Primary CTA with HoverBorderGradient */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <a
                href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="bg-base-100 text-base-content flex items-center space-x-2 px-8 py-4 font-bold text-lg"
                >
                  <span>Integrate AI Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </HoverBorderGradient>
              </a>

              {/* Secondary CTA */}
              <Link
                href="/about-alt"
                className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
              >
                Learn about Kai
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Image Section with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: "easeOut"
            }}
            className="lg:w-1/2 flex justify-center items-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-full overflow-hidden">
                <Image
                  src="/images/kai_profile.jpeg"
                  alt="Kai - Human-Centred Transformation Specialist"
                  className="rounded-full object-cover"
                  priority={true}
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AuroraBackground>

      {/* Fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-100 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroEnhanced;