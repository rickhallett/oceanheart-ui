"use client";

import { useState, useRef, useMemo } from "react";
import type { JSX } from "react";
import Image from "next/image";
// Updated Icons to better reflect the new offerings
import { FaUserTie, FaUsers, FaBook, FaCompass, FaMicrophone } from "react-icons/fa";

interface Feature {
  title: string;
  description: string;
  type?: "video" | "image" | "svg";
  path?: string;
  format?: string;
  alt?: string;
  svg?: JSX.Element;
}

// Updated offerings to reflect Kai's new positioning
const features: Feature[] = [
  {
    title: "Executive Guidance Partnership",
    description:
      "One-on-one strategic partnership for wellbeing leaders navigating complex AI implementation. Combines technical assessment, ethical frameworks, and transformative coaching to create your personalized roadmap for AI integration with integrity.",
    svg: <FaUserTie className="w-6 h-6" />,
    type: "image",
    path: "/images/placeholder_guidance.jpg",
    alt: "Strategic partnership for wellbeing leaders",
  },
  {
    title: "'Bridging Worlds' Immersive Workshop",
    description:
      "Experience the integration of technology and wisdom traditions in this transformative group setting. Learn to speak both languages—technical and human-centered—building discernment and confidence across the divide, while connecting with like-minded practitioners.",
    svg: <FaUsers className="w-6 h-6" />,
    type: "image",
    path: "/images/placeholder_workshop.jpg",
    alt: "Group transformation through integrated learning",
  },
  {
    title: "First Principles AI Framework",
    description:
      "Master the foundational concepts that transcend trending tools and platforms. This educational journey equips you with timeless understanding of AI's capabilities, limitations, and ethical integration with therapeutic and coaching practices.",
    svg: <FaCompass className="w-6 h-6" />,
    type: "image",
    path: "/images/placeholder_course.jpg",
    alt: "First principles educational framework",
  },
  {
    title: "Translational Speaking & Consulting",
    description:
      "Invite Kai to your organization or event to bridge the language gap between technological innovation and human-centered practice. Custom presentations designed to make complex concepts accessible while honoring the depth of both worlds.",
    svg: <FaMicrophone className="w-6 h-6" />,
    type: "image",
    path: "/images/placeholder_framework.jpg",
    alt: "Professional speaking and consulting services",
  },
  {
    title: "Deep Dive Resources & Community",
    description:
      "Join a growing ecosystem of thoughtful practitioners exploring the frontier where technology meets human wisdom. Access curated articles, research summaries, and reflection practices that foster discernment in an increasingly AI-driven world.",
    svg: <FaBook className="w-6 h-6" />,
    type: "image",
    path: "/images/placeholder_content.jpg",
    alt: "Educational resources and community connection",
  },
];


// The component to display the media on large screen. It remains the same structurally.
const Media = ({ feature, key }: { feature: Feature; key: number }): JSX.Element => {
  const { type, path, format, alt, svg } = feature;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="relative w-full h-96 lg:h-auto lg:aspect-square bg-base-300 rounded-2xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={key}
    >
      {type === "video" && path ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={path}
          muted
          loop
          playsInline
        >
          {format && <source src={path} type={format} />}
        </video>
      ) : type === "image" && path ? (
        <Image
          src={path}
          alt={alt || "Feature image"}
          className="absolute inset-0 w-full h-full object-cover object-center"
          fill={true}
        />
      ) : svg ? (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <span className="text-5xl opacity-50">{svg}</span>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-base-300"></div> // Fallback placeholder
      )}
    </div>
  );
};


// The component to display the feature accordion item. It remains the same structurally.
const Item = ({
  feature,
  isOpen,
  setFeatureSelected,
  index,
}: {
  feature: Feature;
  isOpen: boolean;
  setFeatureSelected: () => void;
  index: number;
}) => {
  const accordion = useRef<HTMLDivElement>(null);
  const { title, description, svg } = feature;

  return (
    <li className="py-4 border-b border-base-content/10 last:border-none">
      <button
        className="flex items-center w-full group py-2"
        onClick={setFeatureSelected}
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
          className={`w-5 h-5 ml-auto transition-transform duration-300 shrink-0 ${isOpen ? "transform rotate-90" : ""
            }`}
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
          <p className="text-base-content/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </li>
  );
};

// A component to display 2 to 5 features in an accordion.
const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState<number>(0);

  return (
    <section
      className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100"
      id="features"
    >
      <div className="px-8">
        {/* Updated Headline */}
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
          Navigating AI with <span className="text-blue-400">Wisdom & Integrity</span>
          <span className="bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed block sm:inline-block mt-2 sm:mt-0">
            Where Technical Fluency Meets Human Depth
          </span>
        </h2>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
            <ul className="w-full">
              {features.map((feature, i) => (
                <Item
                  key={feature.title}
                  index={i}
                  feature={feature}
                  isOpen={featureSelected === i}
                  setFeatureSelected={() => setFeatureSelected(i)}
                />
              ))}
            </ul>
            <Media feature={features[featureSelected]} key={featureSelected} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion; 