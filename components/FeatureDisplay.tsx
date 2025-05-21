"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import type { JSX, ReactNode } from "react";
import Image from "next/image";

// Common interface for all feature types
export interface Feature {
  title: string;
  description: string | ReactNode;
  svg?: JSX.Element;
  type?: "video" | "image" | "svg";
  path?: string;
  format?: string;
  alt?: string;
  styles?: string;
  demo?: ReactNode;
}

export interface FeatureDisplayProps {
  /**
   * Layout style for displaying features
   * - 'accordion': Expandable list with media display (FeaturesAccordion)
   * - 'grid': Card-based grid layout (FeaturesGrid)
   * - 'listicle': Interactive tab-style list (FeaturesListicle)
   */
  layout: 'accordion' | 'grid' | 'listicle';
  
  /**
   * Array of features to display
   */
  features: Feature[];
  
  /**
   * Optional section title
   */
  sectionTitle?: string | ReactNode;
  
  /**
   * Optional section description
   */
  sectionDescription?: string | ReactNode;
  
  /**
   * Additional CSS classes for the section container
   */
  className?: string;
  
  /**
   * Enable auto-scrolling through features in listicle mode
   */
  autoScroll?: boolean;
  
  /**
   * Interval in ms for auto-scrolling (default: 5000)
   */
  autoScrollInterval?: number;
}

// Media component for displaying feature media (used in accordion and potentially other layouts)
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

// Accordion item component (used in accordion layout)
const AccordionItem = ({
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
          {svg ? svg : <span className="text-2xl">{index + 1}</span>}
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 ml-auto transition-transform duration-300 shrink-0 ${
            isOpen ? "transform rotate-90" : ""
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
          {typeof description === 'string' ? (
            <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          ) : (
            description
          )}
        </div>
      </div>
    </li>
  );
};

/**
 * Unified FeatureDisplay component that can render features in multiple layout styles
 */
const FeatureDisplay: React.FC<FeatureDisplayProps> = ({
  layout = 'accordion',
  features,
  sectionTitle,
  sectionDescription,
  className = '',
  autoScroll = false,
  autoScrollInterval = 5000
}) => {
  const [featureSelected, setFeatureSelected] = useState<number | string>(
    layout === 'listicle' ? features[0].title : 0
  );
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const featuresEndRef = useRef<null>(null);

  // Auto-scrolling for listicle mode
  useEffect(() => {
    if (!autoScroll || layout !== 'listicle') return;

    const interval = setInterval(() => {
      if (!hasClicked) {
        const index = features.findIndex(
          (feature) => feature.title === featureSelected
        );
        const nextIndex = (index + 1) % features.length;
        setFeatureSelected(features[nextIndex].title);
      }
    }, autoScrollInterval);

    try {
      // Stop the interval when the user scrolls after the featuresRef element
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            clearInterval(interval);
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.5,
        }
      );
      if (featuresEndRef.current) {
        observer.observe(featuresEndRef.current);
      }
    } catch (e) {
      console.error(e);
    }

    return () => clearInterval(interval);
  }, [featureSelected, hasClicked, autoScroll, autoScrollInterval, features, layout]);

  // Render Accordion Layout
  if (layout === 'accordion') {
    return (
      <section
        className={`py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100 ${className}`}
        id="features"
      >
        <div className="px-8">
          {/* Headline */}
          {sectionTitle && (
            <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
              {sectionTitle}
            </h2>
          )}
          {sectionDescription && (
            <div className="text-base-content/80 leading-relaxed mb-8 lg:text-lg">
              {sectionDescription}
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
              <ul className="w-full">
                {features.map((feature, i) => (
                  <AccordionItem
                    key={feature.title}
                    index={i}
                    feature={feature}
                    isOpen={featureSelected === i}
                    setFeatureSelected={() => setFeatureSelected(i)}
                  />
                ))}
              </ul>
              <Media 
                feature={features[featureSelected as number]} 
                key={featureSelected as number} 
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  // Render Grid Layout
  if (layout === 'grid') {
    return (
      <section className={`flex justify-center items-center w-full bg-base-200/50 text-base-content py-20 lg:py-32 ${className}`}>
        <div className="flex flex-col max-w-[82rem] gap-16 md:gap-20 px-4">
          {sectionTitle && (
            <h2 className="max-w-3xl font-black text-4xl md:text-6xl tracking-[-0.01em]">
              {sectionTitle}
            </h2>
          )}
          {sectionDescription && (
            <div className="text-base-content/80 leading-relaxed mb-8 lg:text-lg">
              {sectionDescription}
            </div>
          )}
          
          <div className="flex flex-col w-full h-fit gap-4 lg:gap-10 text-text-default max-w-[82rem]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className={`${feature.styles || 'bg-base-100'} rounded-3xl flex flex-col gap-6 w-full h-[22rem] lg:h-[25rem] pt-6 overflow-hidden group`}
                >
                  <div className="px-6 space-y-2">
                    <h3 className="font-bold text-xl lg:text-3xl tracking-tight">
                      {feature.title}
                    </h3>
                    {typeof feature.description === 'string' ? (
                      <p className="opacity-80">{feature.description}</p>
                    ) : (
                      feature.description
                    )}
                  </div>
                  {feature.demo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  // Render Listicle Layout
  if (layout === 'listicle') {
    return (
      <section className={`py-24 ${className}`} id="features">
        <div className="max-w-3xl mx-auto">
          <div className="bg-base-100 max-md:px-8 max-w-3xl">
            {sectionTitle && (
              <h2 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-8">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <div className="text-base-content/80 leading-relaxed mb-8 lg:text-lg">
                {sectionDescription}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-4 md:flex justify-start gap-4 md:gap-12 max-md:px-8 max-w-3xl mx-auto mb-8">
            {features.map((feature) => (
              <span
                key={feature.title}
                onClick={() => {
                  if (!hasClicked) setHasClicked(true);
                  setFeatureSelected(feature.title);
                }}
                className={`flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-200 group`}
              >
                <span
                  className={`duration-100 ${
                    featureSelected === feature.title
                      ? "text-primary"
                      : "text-base-content/30 group-hover:text-base-content/50"
                  }`}
                >
                  {feature.svg}
                </span>
                <span
                  className={`font-semibold text-sm ${
                    featureSelected === feature.title
                      ? "text-primary"
                      : "text-base-content/50"
                  }`}
                >
                  {feature.title}
                </span>
              </span>
            ))}
          </div>
          <div className="bg-base-200">
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-center md:justify-start md:items-center gap-12">
              <div
                className="text-base-content/80 leading-relaxed space-y-4 px-12 md:px-0 py-12 max-w-xl animate-opacity"
                key={featureSelected as string}
              >
                <h3 className="font-semibold text-base-content text-lg">
                  {features.find((f) => f.title === featureSelected)?.title}
                </h3>

                {features.find((f) => f.title === featureSelected)?.description}
              </div>
            </div>
          </div>
        </div>
        {/* Reference for auto-scrolling */}
        {autoScroll && <p className="opacity-0" ref={featuresEndRef}></p>}
      </section>
    );
  }

  // Default fallback if invalid layout provided
  return (
    <div className="p-8 text-center">
      <p>Invalid layout type. Please use 'accordion', 'grid', or 'listicle'.</p>
    </div>
  );
};

export default FeatureDisplay;