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
  const [translateX, setTranslateX] = useState(0);
  
  // Initialize translateX for reversed carousels
  useEffect(() => {
    if (isReversed && projects.length > 1) {
      const projectWidth = 320;
      const totalWidth = projectWidth * projects.length;
      setTranslateX(-totalWidth);
    }
  }, [isReversed, projects.length]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  // Smooth continuous scroll functionality
  useEffect(() => {
    if (!isPlaying || projects.length <= 1) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    // Small delay to ensure component is mounted
    const timeoutId = setTimeout(() => {
      const projectWidth = 320; // Fixed width + gap
      const speed = isReversed ? -0.8 : 0.8; // pixels per frame
      const totalWidth = projectWidth * projects.length;
      
      const animate = () => {
        setTranslateX((prev) => {
          let next = prev + speed;
          
          // Reset position for infinite scroll
          if (!isReversed) {
            if (next <= -totalWidth) {
              next = 0;
            }
          } else {
            if (next >= 0) {
              next = -totalWidth;
            }
          }
          
          return next;
        });
        
        if (isPlaying) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPlaying, projects.length, isReversed]);

  const handlePrevious = () => {
    const projectWidth = 320;
    setTranslateX(prev => prev + projectWidth);
  };

  const handleNext = () => {
    const projectWidth = 320;
    setTranslateX(prev => prev - projectWidth);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Create infinite scroll by duplicating projects
  const infiniteProjects = [...projects, ...projects, ...projects];

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
        <div 
          ref={containerRef}
          className="flex gap-6"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: 'none',
          }}
        >
          {infiniteProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="group bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-shrink-0"
                style={{ width: '300px', flexShrink: 0 }}
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
              </div>
            ))}
        </div>
      </div>

      {/* Progress Indicators - Visual only for continuous scroll */}
      <div className="flex justify-center mt-8 space-x-2">
        {projects.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-base-300 opacity-50"
          />
        ))}
      </div>
    </div>
  );
}