"use client";

import React from 'react';
import { motion } from "motion/react";
import { FaUserTie, FaBook, FaCompass } from "react-icons/fa";

const FeaturesSimplified = () => {
  const features = [
    {
      title: "Your Guide: Human-Centred Transformation",
      description: "I'm Kai, your specialist in Human-Centred Transformation. With 15 years as a psychotherapist, 5 as a software engineer, and two decades of contemplative practice, I bridge the technical with the deeply human.",
      icon: <FaUserTie className="w-8 h-8 text-primary" />,
      highlights: ["15+ Years Experience", "Bridging Tech & Human"],
    },
    {
      title: "The Framework: The Art of Personal AI",
      description: "Unlock your potential with a 3-layer model designed for conscious integration:",
      icon: <FaCompass className="w-8 h-8 text-secondary" />,
      highlights: [
        "Story · Spirit · Science → Amplified Consciousness",
        "Prompt · Context · Model → Amplified Sensitivity",
        "IQ · EQ · AI → Amplified Intelligence",
      ],
    },
    {
      title: "Executive Guidance Partnership",
      description: "1:1 strategic partnership for wellbeing leaders. Personalized AI strategy with ethical framework integration and transformative coaching.",
      icon: <FaUserTie className="w-8 h-8 text-accent" />,
      highlights: ["Personalized Strategy", "Ethical Integration", "Human Edge Amplification"],
    },
    {
      title: "First Principles AI Course",
      description: "Self-paced foundational AI learning with lifetime access. Master core concepts and ethical integration practices that transcend trending tools.",
      icon: <FaBook className="w-8 h-8 text-info" />,
      highlights: ["Self-Paced Learning", "Lifetime Access", "Foundation First"],
    },
  ];

  return (
    <section className="py-20 bg-base-100" id="features">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-extrabold text-4xl lg:text-5xl tracking-tight mb-4">
            The Art of Personal AI: <span className="text-primary">Your Path to Conscious Integration</span>
          </h2>
          <p className="text-xl text-base-content/70">
            Where Human Wisdom Meets Technical Fluency
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-base-200/50 rounded-xl p-8 hover:bg-base-200 transition-colors"
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-base-100 rounded-lg p-3 shadow-sm">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-6 space-y-2">
                {feature.highlights.map((highlight, hidx) => (
                  <div
                    key={hidx}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="text-success">✓</span>
                    <span className="text-base-content/80">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSimplified;