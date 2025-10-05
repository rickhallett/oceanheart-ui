"use client";

import React from 'react';
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const ProblemEnhanced = () => {
  const problemCards = [
    {
      title: "AI Overwhelm",
      description: "Endless tools, shifting jargon, and pressure to adapt",
      header: (
        <div className="flex items-center justify-center h-full text-6xl">
          🌊
        </div>
      ),
      className: "md:col-span-1",
      icon: <span className="text-primary">→</span>,
    },
    {
      title: "Ethical Fog",
      description: "Navigating moral implications without clear guidance",
      header: (
        <div className="flex items-center justify-center h-full text-6xl">
          ⚖️
        </div>
      ),
      className: "md:col-span-1",
      icon: <span className="text-primary">→</span>,
    },
    {
      title: "Human Disconnect",
      description: "Tech-first approaches overlook human complexity",
      header: (
        <div className="flex items-center justify-center h-full text-6xl">
          🤖
        </div>
      ),
      className: "md:col-span-1",
      icon: <span className="text-primary">→</span>,
    },
  ];

  const hoverCards = [
    {
      title: "The Speed Problem",
      description: "AI evolves daily while humans need time to process and integrate changes meaningfully",
      link: "#",
    },
    {
      title: "The Language Gap",
      description: "Most experts speak either tech or human—rarely both fluently",
      link: "#",
    },
    {
      title: "The Values Crisis",
      description: "How do we maintain our humanity while embracing transformative technology?",
      link: "#",
    },
  ];

  const experts = [
    {
      id: 1,
      name: "Tech Experts",
      designation: "Technical fluency",
      image: "/images/tech-icon.png",
    },
    {
      id: 2,
      name: "Human Experts",
      designation: "Emotional intelligence",
      image: "/images/human-icon.png",
    },
    {
      id: 3,
      name: "The Gap",
      designation: "Who bridges both?",
      image: "/images/gap-icon.png",
    },
  ];

  return (
    <section className="bg-neutral text-neutral-content relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral via-neutral to-base-300 opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-8 py-16 md:py-24">
        {/* Animated Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="max-w-4xl mx-auto font-extrabold text-4xl md:text-5xl tracking-tight mb-6">
            We Need <span className="text-primary">Big Heart</span> to Meet <span className="text-secondary">Big Tech</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-xl opacity-90">
            Tired of simplistic, tech-first approaches that overlook the{" "}
            <span className="text-error font-semibold">complexity of human connection</span>?
          </p>
        </motion.div>

        {/* Problem Statement with Text Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-lg opacity-90 leading-relaxed mb-6">
            The AI revolution is here—fast, furious, and often confusing. 
            Endless tools, shifting jargon, and the pressure to adapt can feel like drowning.
          </p>
          <p className="text-lg opacity-90 leading-relaxed">
            You know AI is vital, but how do you engage meaningfully without losing your 
            <span className="text-info font-semibold"> human core</span> or your 
            <span className="text-success font-semibold"> sanity</span>?
          </p>
        </motion.div>

        {/* Bento Grid for Problem Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <BentoGrid className="max-w-4xl mx-auto">
            {problemCards.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={`${item.className} bg-base-100/10 backdrop-blur-sm border-white/10 hover:bg-base-100/20 transition-all duration-300`}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </motion.div>

        {/* Hover Cards for Deep Problems */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">The Real Challenges</h3>
          <HoverEffect items={hoverCards} className="max-w-5xl mx-auto" />
        </motion.div>

        {/* Expert Gap Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg opacity-90 mb-8">
            Finding guidance that truly spans both{" "}
            <span className="text-info font-semibold">technological fluency</span> and{" "}
            <span className="text-success font-semibold">depth of human understanding</span> is nearly impossible.
          </p>
          <p className="text-xl font-semibold opacity-90">
            Most "experts" only speak one language, leaving you to navigate the chasm alone.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemEnhanced;