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

// The Art of Personal AI framework and offerings
const features: Feature[] = [
  {
    title: "Your Guide: Conscious AI Integration with Kai",
    description:
      "I'm Kai, your specialist in Conscious AI Integration. With 15 years as a psychotherapist, 5 as a software engineer, and two decades of contemplative practice, I bridge the technical with the deeply human. 'The Art of Personal AI' isn't another course; it's my framework to help you intuitively understand and master AI.",
    svg: <FaUserTie className="w-6 h-6" />,
  },
  {
    title: "The Framework: The Art of Personal AI",
    description:
      "Unlock your potential with a 3-layer model:\n• Story · Spirit · Science → Amplified Consciousness\n• Prompt · Context · Model → Amplified Sensitivity\n• IQ · EQ · AI → Amplified Intelligence",
    svg: <FaCompass className="w-6 h-6" />,
  },
  {
    title: "Executive Guidance Partnership",
    description:
      "1:1 strategic partnership for wellbeing leaders. Personalized AI strategy with ethical framework integration and transformative coaching to create your roadmap for conscious AI integration that amplifies your human edge.",
    svg: <FaUserTie className="w-6 h-6" />,
  },
  // {
  //   title: "'Bridging Worlds' Workshop",
  //   description:
  //     "Immersive group learning for AI discernment. Connect with peers while integrating technology and wisdom traditions in a transformative setting. Build confidence and clarity in your relationship with AI.",
  //   svg: <FaUsers className="w-6 h-6" />,
  // },
  {
    title: "First Principles AI Course",
    description:
      "Self-paced foundational AI learning with lifetime access. Master core AI concepts, ethical integration practices, and the Story, Spirit, Science framework that transcends trending tools and platforms.",
    svg: <FaBook className="w-6 h-6" />,
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
    <li className="py-4 border-b border-base-content/10 last:border-none">
      <button
        className="flex items-center w-full group py-2"
        onClick={onClick}
      >
        <div className="flex items-center justify-center shrink-0 mr-4 w-10 h-10 rounded-full bg-base-300 text-primary">
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
        <div className="pb-2 pl-14">
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
      className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100"
      id="features"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
          The Art of Personal AI: <span className="text-blue-400">Your Path to Conscious Integration</span>
          <span className="bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed block sm:inline-block mt-2 sm:mt-0">
            Where Human Wisdom Meets Technical Fluency
          </span>
        </h2>
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