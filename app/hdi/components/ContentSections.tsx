"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ContentSectionsProps {
  hdiDefinitions: string[];
  currentDefinitionIndex: number;
}

export default function ContentSections({ hdiDefinitions, currentDefinitionIndex }: ContentSectionsProps) {
  console.log(currentDefinitionIndex);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
    >
      <section className="text-center max-w-xl mx-auto mt-6 md:mt-12 mb-16 md:mb-24">
        <p className="text-md md:text-lg opacity-80 leading-relaxed mb-4">
          The next generation of human-computer interaction is almost here.
        </p>
        <p className="text-md md:text-lg opacity-80 leading-relaxed mb-4">
          The future is coming and soon the old world of the analogue and digital will become one.
        </p>
        <p className="text-md md:text-lg opacity-80 leading-relaxed mb-4">
          There's every chance you'll survive this transition. But then again, there's a chance you won't.
        </p>
        <p className="text-md md:text-lg opacity-80 leading-relaxed mb-4">
          It's really just a question of bandwidth. <em>How much data can you handle?</em>
        </p>
        <hr className="my-16 border-base-300" />
        <p className="text-md md:text-lg opacity-80 leading-relaxed mb-8">
          HDI will rewire your fundamental relationship with the machine <span className="font-bold">forever</span>.
        </p>
        <p className="text-md md:text-lg opacity-80 leading-relaxed mb-2 max-w-sm mx-auto">
          But to get to the root of the problem, we need to update the most important operating system of all: <span className="font-bold">your brain</span>.
        </p>
        <p className="text-sm md:text-md opacity-20 leading-relaxed mb-2 max-w-sm mx-auto mt-8">
          Do you think that's air you're breathing now?
        </p>
      </section>

      <section className="max-w-xl mx-auto">
        <h3 className="font-bold text-2xl lg:text-3xl tracking-tight mb-6 text-center">
          What is HDI?
        </h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDefinitionIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-md md:text-lg opacity-80 leading-relaxed mb-6 mx-auto text-center">
              {hdiDefinitions[currentDefinitionIndex]} (HDI)
            </p>
          </motion.div>
        </AnimatePresence>
        <p className="text-md md:text-lg opacity-80 leading-relaxed mb-12 mx-auto text-center">
          is a revolutionary technology of the mind, body and heart. Dilligently applied, it bridges the gap between human cognition, digital systems and beyond.
        </p>
        <p className="text-md md:text-lg opacity-80 leading-relaxed mb-20 max-w-sm mx-auto text-center">
          <em>"Digital actions will be the fundamental unit of all knowledge work. It all starts with the prompt - the prompt <em>is</em> <strong>you</strong>."</em>
        </p>
        <p className="text-md md:text-lg opacity-80 leading-relaxed mb-24 max-w-sm mx-auto text-center">
          <strong><em>In the end, it comes down to the man in the box.</em></strong>
        </p>
      </section>
    </motion.div>
  );
}
