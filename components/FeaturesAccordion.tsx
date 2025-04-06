"use client";

import { useState, useRef } from "react";
import type { JSX } from "react";
import Image from "next/image";
import { FaBook, FaBrain, FaChartLine, FaCloud, FaFile, FaLock, FaLaptop, FaFileAlt, FaUserShield, FaMoneyBillWave, FaHandHoldingHeart, FaCompass, FaRegLightbulb, FaEthernet, FaUserGraduate } from "react-icons/fa";

interface Feature {
  title: string;
  description: string;
  type?: "video" | "image" | "svg";
  path?: string;
  format?: string;
  alt?: string;
  svg?: JSX.Element;
}

const features = [
  {
    title: "Mission & Vision",
    description:
      "My mission is to educate, guide and inspire fellow wellbeing professionals – therapists, coaches, healers, leaders – in navigating AI not just effectively, but ethically and authentically. It's about moving beyond the hype and fear to find ways AI can genuinely support, not supplant, our work and values.",
    svg: <FaHandHoldingHeart />,
    type: "image",
    format: "webp",
    path: "/images/keyboard.webp"
  },
  {
    title: "Big Tech meets Big Heart",
    description:
      "While \"Big Tech\" isn't going anywhere soon, I want to make sure we meet it with \"Big Heart\" too. By integrating technical expertise with deep human understanding, we can harness AI's potential in service of genuine human flourishing.",
    svg: <FaRegLightbulb />,
    type: "image",
    format: "avif",
    path: "/images/noid.avif"
  },
  {
    title: "First Principles Approach",
    description:
      "My approach involves cutting through the noise to focus on the signal – understanding AI through lived experience, critical reflection, and developing our human capacity. Stop chasing trends, learn from first principles and keep your hard-won expertise on the steering wheel.",
    svg: <FaCompass />,
    type: "image",
    format: "jpg",
    path: "/images/handshake.jpg"
  },
  {
    title: "Ethical Integration",
    description:
      "Navigate this new territory with courage, discernment and trusted guidance. If you're a wellbeing leader looking to integrate AI with integrity and wisdom, seeking clarity beyond surface-level solutions, I can help you build an ethical framework that honors your values.",
    svg: <FaEthernet />,
    type: "image",
    format: "webp",
    path: "/images/phonelock.webp"
  },
  {
    title: "Tailored Leadership Development",
    description:
      "Develop your capacity to lead in the AI era with personalized support that combines technical literacy, ethical frameworks, and practical implementation strategies specific to wellbeing contexts.",
    svg: <FaUserGraduate />,
    type: "image",
    format: "avif",
    path: "/images/mind-cloud.avif"
  },
  {
    title: "Human-Centered Design",
    description:
      "Explore how AI can enhance rather than replace human connection, with methodologies that prioritize the therapeutic relationship, ethical practice, and authentic engagement in all digital innovations.",
    svg: <FaBrain />,
    type: "image",
    format: "jpg",
    path: "/images/universe.jpg"
  },
] as Feature[];


// An SEO-friendly accordion component including the title and a description (when clicked.)
const Item = ({
  feature,
  isOpen,
  setFeatureSelected,
}: {
  index: number;
  feature: Feature;
  isOpen: boolean;
  setFeatureSelected: () => void;
}) => {
  const accordion = useRef(null);
  const { title, description, svg } = feature;

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setFeatureSelected();
        }}
        aria-expanded={isOpen}
      >
        <span className={`duration-100 ${isOpen ? "text-primary" : ""}`}>
          {svg}
        </span>
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary font-semibold" : ""
            }`}
        >
          <h3 className="inline">{title}</h3>
        </span>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out text-base-content-secondary overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{description}</div>
      </div>
    </li>
  );
};

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }: { feature: Feature }) => {
  const { type, path, format, alt } = feature;
  const style = "rounded-2xl aspect-square w-full sm:w-[26rem]";
  const size = {
    width: 500,
    height: 500,
  };

  if (type === "video") {
    return (
      <video
        className={style}
        autoPlay
        muted
        loop
        playsInline
        controls
        width={size.width}
        height={size.height}
      >
        <source src={path} type={format} />
      </video>
    );
  } else if (type === "image") {
    return (
      <Image
        src={path}
        alt={alt || "Feature illustration"}
        className={`${style} object-cover object-center`}
        width={size.width}
        height={size.height}
      />
    );
  } else if (type === "svg") {
    return <div className={`${style} !border-none`}><FaBrain /></div>;
  } else {
    return <div className={`${style} !border-none`}></div>;
  }
};

// A component to display 2 to 5 features in an accordion.
// By default, the first feature is selected. When a feature is clicked, the others are closed.
const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState<number>(0);

  return (
    <section
      className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100"
      id="features"
    >
      <div className="px-8">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
          Oceanheart.ai <span className="text-blue-400">Approach</span>
          <span className="bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed">
            Ethical. <span className="text-blue-400">Authentic.</span> Human-Centered.
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
