"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HDIPage() {
  const targetTimestamp = 1741129521485 + (7 * 24 * 60 * 60 * 1000) + (7 * 60 * 60 * 1000) + (7 * 60 * 1000) + (7 * 1000);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  });

  // HDI definitions for the carousel
  const hdiDefinitions = [
    "Human Digital Interface",
    "Higher Defiance Institute",
    "Hyperconsciousness Design Initiative",
    "Heart Data Integrated"
  ];

  // State for the carousel
  const [currentDefinitionIndex, setCurrentDefinitionIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right to left, -1 for left to right

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Date.now();
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        expired: false
      });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  // Effect for the carousel
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setDirection(1);
      setCurrentDefinitionIndex((prevIndex) => 
        prevIndex === hdiDefinitions.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(carouselInterval);
  }, [hdiDefinitions.length]);

  const handleDownload = async () => {
    try {
      window.location.href = "/api/hdi/download";
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Animation variants for the carousel
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <div className="container mx-auto px-4 font-mono">
      <section className="text-center max-w-xl mx-auto mt-12 mb-16 md:mb-24">
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
          HDI
        </h1>
        
        {/* Carousel for h2 with id="hdi-carousel" */}
        <div id="hdi-carousel" className="h-12 relative overflow-hidden mb-6">
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
              className="text-2xl font-bold absolute w-full"
            >
              {hdiDefinitions[currentDefinitionIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>
        <p className="text-lg opacity-80 leading-relaxed mb-4">
          The next generation of human-computer interaction is almost here.
        </p>
        <p className="text-lg opacity-80 leading-relaxed mb-4">
          The future is coming and soon the old world of the analogue and digital will become one.
        </p>
        <p className="text-lg opacity-80 leading-relaxed mb-4">
          There's every chance you'll survive this transition. But then again, there's a chance you won't.
        </p>
        <p className="text-lg opacity-80 leading-relaxed mb-4">
          It's really just a question of bandwidth. <em>How much data can you handle?</em>
        </p>
        <hr className="my-16 border-base-300" />
        <p className="text-lg opacity-80 leading-relaxed mb-8">
          HDI will rewire your fundamental relationship with the machine <span className="font-bold">forever</span>.
        </p>
        <p className="text-lg opacity-80 leading-relaxed mb-2 max-w-sm mx-auto">
          But to get to the root of the problem, we need to update the most important operating system of all: <span className="font-bold">your brain</span>.
        </p>
        <p className="text-sm opacity-80 leading-relaxed mb-2 max-w-sm mx-auto mt-8">
          Is this air you are breathing?
        </p>
      </section>

      <section className="mb-16 md:mb-24">
        <h3 className="font-bold text-2xl lg:text-3xl tracking-tight mb-6 text-center">
          Countdown to v<span className="text-secondary">0.1</span>
        </h3>

        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold">{timeRemaining.days}</div>
            <div className="text-sm opacity-70">Days</div>
          </div>
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold">{timeRemaining.hours}</div>
            <div className="text-sm opacity-70">Hours</div>
          </div>
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold">{timeRemaining.minutes}</div>
            <div className="text-sm opacity-70">Minutes</div>
          </div>
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold">{timeRemaining.seconds}</div>
            <div className="text-sm opacity-70">Seconds</div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleDownload}
            disabled={!timeRemaining.expired}
            className={`btn btn-md text-md ${timeRemaining.expired ? 'btn-primary' : 'btn-disabled'}`}
          >
            download
          </button>
        </div>
      </section>

      <section className="max-w-xl mx-auto">
        <h3 className="font-bold text-2xl lg:text-3xl tracking-tight mb-6 text-center">
          What is HDI?
        </h3>
        <p className="text-lg opacity-80 leading-relaxed mb-8 mx-auto text-center">
          Human Digital Interface (HDI) is a revolutionary technology of the mind, body and heart. Dilligently applied, it bridges the gap between human cognition, digital systems and beyond.
        </p>
        <p className="text-lg opacity-80 leading-relaxed mb-8 max-w-sm mx-auto text-center">
          <em>Digital actions will be the fundamental unit of all knowledge work. It all starts with the prompt - the prompt <em>is</em> <strong>you</strong>.</em>
        </p>
      </section>
    </div>
  );
}
