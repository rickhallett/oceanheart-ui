"use client";

import { useState, useRef } from "react";
import type { JSX } from "react";
// Updated Icons to better reflect the new offerings
import { FaUserTie, FaUsers, FaBook, FaCompass, FaMicrophone } from "react-icons/fa";

interface Feature {
  title: string;
  description: string;
  svg?: JSX.Element;
}

// Dual services - therapy and AI strategy
const features: Feature[] = [
  {
    title: "Individual Therapy & Coaching",
    description:
      "Personal sessions for life transitions, emotional resilience, and growth. Drawing on 15 years of psychotherapy experience and contemplative practice to help you navigate inner change with clarity and compassion. Available through awake.oceanheart.ai",
    svg: <FaUserTie className="w-6 h-6" />,
  },
  {
    title: "AI Strategy & Consultation",
    description:
      "Help organizations adopt AI safely and effectively. Strategic consulting that bridges technical implementation with human-centered design, ensuring your technology serves your mission while maintaining your values.",
    svg: <FaCompass className="w-6 h-6" />,
  },
  {
    title: "The Art of Personal AI Framework",
    description:
      "A unified approach that works for both individuals and organizations:\n• Story · Spirit · Science → Understanding human narratives\n• Prompt · Context · Model → Mastering interaction dynamics\n• IQ · EQ · AI → Balancing multiple intelligences",
    svg: <FaBook className="w-6 h-6" />,
  },
  {
    title: "Your Guide: Kai",
    description:
      "With 15 years as a psychotherapist, 5 as a software engineer, and two decades of contemplative practice, I bring a unique perspective. Whether supporting personal transformation or organizational change, I help you navigate complexity with both technical fluency and deep human understanding.",
    svg: <FaUserTie className="w-6 h-6" />,
  },
];

// The component to display the feature accordion item
const Item = ({
  feature,
  isOpen,
  onClick,
  index,
}: {
  feature: Feature;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) => {
  const accordion = useRef<HTMLDivElement>(null);
  const { title, description, svg } = feature;

  return (
    <li className="border-b border-white/10 last:border-none">
      <button
        className="flex items-center w-full py-6 group"
        onClick={onClick}
      >
        <div className="flex items-center justify-center shrink-0 mr-4 w-10 h-10 text-pink-400">
          {svg ? (
            svg
          ) : (
            <span className="text-2xl">{index + 1}</span>
          )}
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 ml-auto transition-transform duration-300 shrink-0 ${isOpen ? "transform rotate-90" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        ref={accordion}
        className="transition-all duration-300 overflow-hidden"
        style={
          isOpen
            ? { maxHeight: accordion.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-6 pl-14">
          <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </li>
  );
};

// A component to display features in an accordion
const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState<number>(0);

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-base-100 via-purple-900/20 to-base-100"
      id="features"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <h2 className="font-bold text-4xl lg:text-6xl tracking-tight mb-4 text-center">
          How I Can Help:{" "}
          <span className="text-blue-400">Services & Approach</span>
        </h2>
        <p className="text-xl lg:text-2xl text-center mb-12 md:mb-16 text-white/90">
          Bridging Human Wisdom & Technological Change
        </p>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <ul className="w-full">
              {features.map((feature, i) => (
                <Item
                  key={feature.title}
                  index={i}
                  feature={feature}
                  isOpen={featureSelected === i}
                  onClick={() => setFeatureSelected(i)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion; 