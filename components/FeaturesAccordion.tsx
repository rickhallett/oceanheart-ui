"use client";

import { useState, useRef } from "react";
import type { JSX } from "react";
import Image from "next/image";
import { FaBook, FaBrain, FaChartLine, FaCloud, FaFile, FaLock, FaLaptop, FaFileAlt, FaUserShield, FaMoneyBillWave } from "react-icons/fa"

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
    title: "100% Offline Processing",
    description:
      "All processing happens on your device. No data leaves your control, ensuring maximum security and confidentiality for your clients.",
    svg: <FaLaptop />,
    type: "image",
    format: "webp",
    path: "/images/keyboard.webp"
  },
  {
    title: "AI-Powered Note Taking",
    description:
      "Transcribe sessions in real time, auto-generate summaries and wellness plans, and format progress notes in your voice—all offline.",
    svg: <FaFileAlt />,
    type: "image",
    format: "avif",
    path: "/images/noid.avif"
  },
  {
    title: "Built for Compliance",
    description:
      "Designed from the ground up for privacy, aligning with GDPR/HIPAA principles without complex cloud setups or ongoing compliance costs.",
    svg: <FaUserShield />,
    type: "image",
    format: "jpg",
    path: "/images/handshake.jpg"
  },
  {
    title: "Custom Templates",
    description:
      "Structure your notes, summaries, and reports your way—automatically and consistent with your practice style.",
    svg: <FaFile />,
    type: "image",
    format: "webp",
    path: "/images/phonelock.webp"
  },
  {
    title: "Cost Effective",
    description:
      "One-time payment options save you from expensive monthly subscriptions. On average, clinicians save £600/year by switching to local processing.",
    svg: <FaMoneyBillWave />,
    type: "image",
    format: "avif",
    path: "/images/mind-cloud.avif"
  },
  {
    title: "Premium Add-ons",
    description:
      "Enhance your experience with optional features like On-Device Data Cleaning, Premium Desktop App, and Your Digital Clone for personalized AI.",
    svg: <FaBook />,
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
        alt={alt}
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
      className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100 "
      id="features"
    >
      <div className="px-8">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
          AI for wellbeing professionals, <span className="text-blue-400">your way</span>
          <span className="bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed">
            Private. Practical. <span className="text-blue-400">Local-first.</span>
          </span>
        </h2>
        <div className=" flex flex-col md:flex-row gap-12 md:gap-24">
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
