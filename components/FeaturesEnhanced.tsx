"use client";

import React from 'react';
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";
import { FaUserTie, FaUsers, FaBook, FaCompass, FaMicrophone } from "react-icons/fa";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const FeaturesEnhanced = () => {
  const content = [
    {
      title: "Your Guide: Conscious AI Integration",
      description:
        "I'm Kai, your specialist in Conscious AI Integration. With 15 years as a psychotherapist, 5 as a software engineer, and two decades of contemplative practice, I bridge the technical with the deeply human. 'The Art of Personal AI' isn't another course; it's my framework to help you intuitively understand and master AI.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <div className="relative w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-lg p-8">
            <div className="absolute inset-0 bg-gradient-to-t from-base-100/50 to-transparent rounded-lg" />
            <div className="relative flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <FaUserTie className="w-24 h-24 mx-auto text-primary" />
                <p className="text-2xl font-bold">15+ Years Experience</p>
                <p className="text-lg opacity-90">Bridging Tech & Human</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "The Framework: The Art of Personal AI",
      description:
        "Unlock your potential with a 3-layer model:\n• Story · Spirit · Science → Amplified Consciousness\n• Prompt · Context · Model → Amplified Sensitivity\n• IQ · EQ · AI → Amplified Intelligence",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <div className="relative w-full h-full bg-gradient-to-br from-secondary/20 via-info/10 to-success/20 rounded-lg p-8">
            <div className="grid grid-cols-1 gap-6 h-full">
              <div className="flex items-center justify-center bg-base-100/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-center">
                  <p className="font-semibold text-lg text-primary">Story · Spirit · Science</p>
                  <p className="text-sm opacity-90 mt-2">Amplified Consciousness</p>
                </div>
              </div>
              <div className="flex items-center justify-center bg-base-100/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-center">
                  <p className="font-semibold text-lg text-secondary">Prompt · Context · Model</p>
                  <p className="text-sm opacity-90 mt-2">Amplified Sensitivity</p>
                </div>
              </div>
              <div className="flex items-center justify-center bg-base-100/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-center">
                  <p className="font-semibold text-lg text-accent">IQ · EQ · AI</p>
                  <p className="text-sm opacity-90 mt-2">Amplified Intelligence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Executive Guidance Partnership",
      description:
        "1:1 strategic partnership for wellbeing leaders. Personalized AI strategy with ethical framework integration and transformative coaching to create your roadmap for conscious AI integration that amplifies your human edge.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <div className="relative w-full h-full bg-gradient-to-br from-info/20 via-primary/10 to-secondary/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
            <div className="relative p-8 h-full flex items-center justify-center">
              <div className="space-y-6">
                <div className="bg-base-100/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary">Strategic Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-success mr-2">✓</span>
                      <span>Personalized AI Strategy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">✓</span>
                      <span>Ethical Framework Integration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">✓</span>
                      <span>Transformative Coaching</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success mr-2">✓</span>
                      <span>Human Edge Amplification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "First Principles AI Course",
      description:
        "Self-paced foundational AI learning with lifetime access. Master core AI concepts, ethical integration practices, and the Story, Spirit, Science framework that transcends trending tools and platforms.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <div className="relative w-full h-full bg-gradient-to-br from-success/20 via-accent/10 to-primary/20 rounded-lg p-8">
            <div className="h-full flex flex-col justify-center">
              <div className="text-center space-y-6">
                <FaBook className="w-20 h-20 mx-auto text-success" />
                <div className="bg-base-100/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Course Features</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-primary">Self-Paced</p>
                      <p className="opacity-90">Learn on your schedule</p>
                    </div>
                    <div>
                      <p className="font-semibold text-secondary">Lifetime Access</p>
                      <p className="opacity-90">Always available</p>
                    </div>
                    <div>
                      <p className="font-semibold text-accent">Core Concepts</p>
                      <p className="opacity-90">Foundation first</p>
                    </div>
                    <div>
                      <p className="font-semibold text-info">Ethical Focus</p>
                      <p className="opacity-90">Values-driven</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-base-100" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-extrabold text-3xl lg:text-6xl tracking-tight mb-4">
            The Art of Personal AI: <span className="text-primary">Your Path to Conscious Integration</span>
          </h2>
          <p className="text-xl opacity-90">
            Where Human Wisdom Meets Technical Fluency
          </p>
        </motion.div>

        {/* Sticky Scroll Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <StickyScroll content={content} />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesEnhanced;