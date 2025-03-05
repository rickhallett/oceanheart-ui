"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HDIHeaderProps {
  hdiDefinitions: string[];
  isLoading: boolean;
}

export default function HDIHeader({ hdiDefinitions, isLoading }: HDIHeaderProps) {
  const [currentDefinitionIndex, setCurrentDefinitionIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right to left, -1 for left to right

  // Effect for the carousel
  useEffect(() => {
    if (hdiDefinitions.length === 0) return;

    const carouselInterval = setInterval(() => {
      setDirection(1);
      setCurrentDefinitionIndex((prevIndex) =>
        prevIndex === hdiDefinitions.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(carouselInterval);
  }, [hdiDefinitions.length]);

  // Animation variants for the carousel
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0
    })
  };

  const loadingText = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
      >
        <div className="text-2xl font-bold opacity-50">Loading...</div>
      </motion.div>
    )
  }

  return (
    <section className="text-center max-w-xl mx-auto mt-6 md:mt-12 mb-16 md:mb-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
      >
        <h1 className="font-extrabold lg:text-5xl opacity-60 tracking-tight mb-6 tracking-wide" style={{ fontSize: '5rem' }}>
          HDI
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
      >
        <Image src="/images/hdi_logo_v01-2.png" alt="HDI Logo" width={300} height={300} className="mx-auto my-4" />
      </motion.div>

      {/* Carousel for h2 with id="hdi-carousel" */}
      <div id="hdi-carousel" className="h-12 relative mb-12">
        {isLoading ? (
          loadingText()
        ) : (
          <AnimatePresence initial={false} custom={direction}>
            <motion.h2
              key={currentDefinitionIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="text-2xl absolute w-full"
            >
              {hdiDefinitions[currentDefinitionIndex]}
            </motion.h2>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
