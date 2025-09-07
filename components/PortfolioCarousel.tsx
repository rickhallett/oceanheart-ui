"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
}

interface PortfolioCarouselProps {
  projects: Project[];
  sectionId: string;
  isReversed?: boolean;
}

export default function PortfolioCarousel({ 
  projects, 
  sectionId, 
  isReversed = false 
}: PortfolioCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive visible projects
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleProjects(3);
      } else if (window.innerWidth >= 768) {
        setVisibleProjects(2);
      } else {
        setVisibleProjects(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && projects.length > visibleProjects) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const direction = isReversed ? -1 : 1;
          const maxIndex = projects.length - visibleProjects;
          let next = prev + direction;
          
          if (next > maxIndex) next = 0;
          if (next < 0) next = maxIndex;
          
          return next;
        });
      }, 8000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, projects.length, visibleProjects, isReversed]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const maxIndex = projects.length - visibleProjects;
      return prev > 0 ? prev - 1 : maxIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = projects.length - visibleProjects;
      return prev < maxIndex ? prev + 1 : 0;
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const visibleProjectsArray = projects.slice(currentIndex, currentIndex + visibleProjects);
  
  // Fill array if we're at the end and need to wrap around
  if (visibleProjectsArray.length < visibleProjects) {
    const remaining = visibleProjects - visibleProjectsArray.length;
    visibleProjectsArray.push(...projects.slice(0, remaining));
  }

  return (
    <div className="relative">
      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={handlePrevious}
          className="btn btn-circle btn-outline hover:btn-primary transition-all duration-300"
          aria-label="Previous project"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={handlePlayPause}
          className="btn btn-circle btn-outline hover:btn-secondary transition-all duration-300"
          aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h6" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        <button
          onClick={handleNext}
          className="btn btn-circle btn-outline hover:btn-primary transition-all duration-300"
          aria-label="Next project"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: isReversed ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isReversed ? 100 : -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`grid gap-6 ${
              visibleProjects === 3 
                ? 'grid-cols-1 lg:grid-cols-3' 
                : visibleProjects === 2 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1'
            }`}
          >
            {visibleProjectsArray.map((project, index) => (
              <motion.div
                key={`${project.id}-${currentIndex}-${index}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-bold text-xl text-base-content group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-base-content/80 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button className="w-full btn btn-outline btn-sm group-hover:btn-primary transition-all duration-300">
                      <span className="group-hover:scale-110 transition-transform duration-300">
                        View Details
                      </span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(projects.length / visibleProjects) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * visibleProjects)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / visibleProjects) === index
                ? 'bg-primary scale-125'
                : 'bg-base-300 hover:bg-base-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}