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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
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

  // Simple continuous scroll with setInterval
  useEffect(() => {
    if (isPlaying && projects.length > 1) {
      intervalRef.current = setInterval(() => {
        setTranslateX(prev => {
          const projectWidth = 320;
          const totalWidth = projectWidth * projects.length;
          const speed = isReversed ? 0.5 : -0.5; // pixels per interval (slower)
          let next = prev + speed;
          
          // Reset for infinite scroll
          if (isReversed) {
            if (next >= 0) next = -totalWidth;
          } else {
            if (next <= -totalWidth) next = 0;
          }
          
          return next;
        });
      }, 32); // ~30fps for smoother, slower movement
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, projects.length, isReversed]);
  
  // Cleanup effect to reset position when it gets too far out of bounds
  useEffect(() => {
    const projectWidth = 320;
    const totalWidth = projectWidth * projects.length;
    
    // If position gets too far in either direction, reset to equivalent position
    if (translateX > totalWidth) {
      setTranslateX(translateX - totalWidth * 2);
    } else if (translateX < -totalWidth * 2) {
      setTranslateX(translateX + totalWidth * 2);
    }
  }, [translateX, projects.length]);

  const handlePrevious = () => {
    // Temporarily pause auto-scroll for manual control
    setIsPlaying(false);
    setIsTransitioning(true);
    
    const projectWidth = 320;
    setTranslateX(prev => {
      // Always move backward (to the right/positive direction)
      // This preserves the user's backward navigation intent
      return prev + projectWidth;
    });
    
    // Resume after transition
    setTimeout(() => {
      setIsTransitioning(false);
      setIsPlaying(true);
    }, 500);
  };

  const handleNext = () => {
    // Temporarily pause auto-scroll for manual control
    setIsPlaying(false);
    setIsTransitioning(true);
    
    const projectWidth = 320;
    setTranslateX(prev => {
      // Always move forward (to the left/negative direction)
      // This preserves the user's forward navigation intent
      return prev - projectWidth;
    });
    
    // Resume after transition
    setTimeout(() => {
      setIsTransitioning(false);
      setIsPlaying(true);
    }, 500);
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
      <div className="relative overflow-hidden">
        {/* Left fade gradient */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, hsl(var(--b1)), transparent)'
          }}
        ></div>
        
        {/* Right fade gradient */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, hsl(var(--b1)), transparent)'
          }}
        ></div>
        
        <div 
          ref={containerRef}
          className="flex gap-6"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning ? 'transform 0.3s ease-out' : 'none',
            willChange: 'transform'
          }}
        >
          {infiniteProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="group bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-shrink-0 flex flex-col"
                style={{ width: '300px', flexShrink: 0, minHeight: '520px' }}
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
                <div className="p-6 space-y-4 flex-1 flex flex-col">
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

                  {/* Action Button - positioned at bottom */}
                  <div className="pt-2 mt-auto">
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