"use client";

import React from 'react';
import { motion } from "motion/react";

const ProblemSimplified = () => {
  const problemCards = [
    {
      title: "AI Overwhelm",
      description: "Endless tools, shifting jargon, and pressure to adapt",
      icon: "🌊",
    },
    {
      title: "Ethical Fog",
      description: "Navigating moral implications without clear guidance",
      icon: "⚖️",
    },
    {
      title: "Human Disconnect",
      description: "Tech-first approaches overlook human complexity",
      icon: "🤖",
    },
  ];

  const challenges = [
    {
      title: "The Speed Problem",
      description: "AI evolves daily while humans need time to process and integrate changes meaningfully",
    },
    {
      title: "The Language Gap",
      description: "Most experts speak either tech or human—rarely both fluently",
    },
    {
      title: "The Values Crisis",
      description: "How do we maintain our humanity while embracing transformative technology?",
    },
  ];

  return (
    <section className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight mb-6">
            We Need <span className="text-primary">Big Heart</span> to Meet <span className="text-secondary">Big Tech</span>
          </h2>
          
          <p className="text-xl text-base-content/80 max-w-2xl mx-auto mb-6">
            Tired of simplistic, tech-first approaches that overlook the complexity of human connection?
          </p>
          
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            The AI revolution is here—fast, furious, and often confusing. 
            You know AI is vital, but how do you engage meaningfully without losing your human core or your sanity?
          </p>
        </motion.div>

        {/* Problem Cards - Simple Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {problemCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-base-100 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-base-content/70">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Real Challenges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">The Real Challenges</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {challenges.map((challenge, idx) => (
              <div
                key={challenge.title}
                className="bg-base-300/50 rounded-lg p-6 border border-base-content/10"
              >
                <h4 className="font-semibold text-lg mb-3">{challenge.title}</h4>
                <p className="text-base-content/70 text-sm">{challenge.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg text-base-content/70">
            Finding guidance that truly spans both <span className="text-primary">technological fluency</span> and{" "}
            <span className="text-secondary">depth of human understanding</span> is nearly impossible.
          </p>
          <p className="text-lg font-medium text-base-content/80 mt-4">
            Most "experts" only speak one language, leaving you to navigate the chasm alone.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSimplified;