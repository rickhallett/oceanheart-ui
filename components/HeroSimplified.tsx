"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const HeroSimplified = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-base-300 via-base-100 to-base-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 px-8 py-16"
      >
        {/* Text Content */}
        <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight text-base-content">
              Conscious AI Integration
            </h1>
            <h2 className="font-semibold text-2xl lg:text-3xl text-base-content/80">
              Your Human Edge, <span className="text-primary">Amplified</span>
            </h2>
          </div>

          {/* Subheadline */}
          <p className="text-lg text-base-content/70 leading-relaxed max-w-xl">
            Overwhelmed by AI's pace? Master it with heart, clarity, and Kai's unique guidance.
          </p>

          {/* Simple Value Proposition */}
          <p className="text-xl font-medium text-base-content">
            Amplifying Your <span className="text-primary">Intelligence</span> Through Conscious Integration
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Book a Discovery Call
            </Link>
            <Link 
              href="/about-alt" 
              className="link link-hover text-base-content/80"
            >
              Learn about Kai →
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-1/2 flex justify-center items-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50"></div>
            <Image
              src="/images/kai_profile.jpeg"
              alt="Kai - Conscious AI Integration Specialist"
              className="relative rounded-full object-cover shadow-2xl"
              priority={true}
              width={450}
              height={450}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSimplified;