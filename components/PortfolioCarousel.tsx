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
  const [speed, setSpeed] = useState(1); // 0 = paused, 1 = 1x, 2 = 2x, 3 = 3x
  const [visibleProjects, setVisibleProjects] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Touch gesture state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

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

  // Continuous scroll with variable speed
  useEffect(() => {
    if (speed > 0 && projects.length > 1 && !isDragging) {
      intervalRef.current = setInterval(() => {
        setTranslateX(prev => {
          const projectWidth = 320;
          const totalWidth = projectWidth * projects.length;
          const pixelsPerFrame = (isReversed ? 0.5 : -0.5) * speed; // multiply by speed
          let next = prev + pixelsPerFrame;
          
          // Reset for infinite scroll
          if (isReversed) {
            if (next >= 0) next = -totalWidth;
          } else {
            if (next <= -totalWidth) next = 0;
          }
          
          return next;
        });
      }, 32); // ~30fps
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
  }, [speed, projects.length, isReversed, isDragging]);
  
  // Enhanced cleanup effect - applies same boundary logic as auto-scroll
  useEffect(() => {
    if (isDragging) return; // Don't interfere during drag interactions
    
    const projectWidth = 320;
    const totalWidth = projectWidth * projects.length;
    
    // Apply the SAME boundary logic as auto-scroll for consistency
    if (translateX >= 0) {
      setTranslateX(-totalWidth);
    } else if (translateX <= -totalWidth) {
      setTranslateX(0);
    }
  }, [translateX, projects.length, isDragging]);


  const handleSpeedCycle = () => {
    setSpeed(prev => (prev + 1) % 4); // Cycles: 0 → 1 → 2 → 3 → 0
  };
  
  // Touch/Mouse gesture handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
    setDragOffset(0);
  };
  
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStart;
    
    // Constrain drag offset to prevent visual boundary issues
    const maxDrag = 640; // Allow dragging up to 2 project widths
    const constrainedOffset = Math.max(-maxDrag, Math.min(maxDrag, offset));
    
    setDragOffset(constrainedOffset);
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // If swipe/drag distance > 75px, move carousel
    if (Math.abs(dragOffset) > 75) {
      const projectWidth = 320;
      setTranslateX(prev => {
        const direction = dragOffset > 0 ? 1 : -1; // positive = right drag, negative = left drag
        return prev + (direction * projectWidth);
      });
    }
    
    setDragOffset(0);
  };
  
  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragMove(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragEnd();
  };
  
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };
  
  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragEnd();
  };

  // Create infinite scroll by duplicating projects (5 copies for better drag support)
  const infiniteProjects = [...projects, ...projects, ...projects, ...projects, ...projects];
  

  return (
    <div className="relative">
      {/* Speed Control */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleSpeedCycle}
          className="btn btn-circle btn-outline hover:btn-secondary transition-all duration-300 relative"
          aria-label={`Current speed: ${speed === 0 ? 'Paused' : speed + 'x'}`}
        >
          {speed === 0 ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <span className="font-bold text-sm">{speed}x</span>
          )}
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
          className="flex gap-6 touch-pan-y select-none cursor-grab active:cursor-grabbing" 
          style={{
            transform: `translateX(${translateX + dragOffset}px)`,
            transition: isTransitioning ? 'transform 0.3s ease-out' : 'none', // No transition during drag
            willChange: 'transform'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {infiniteProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="group bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-shrink-0 flex flex-col"
                style={{ width: '300px', flexShrink: 0, minHeight: '580px' }}
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
                <div className="p-6 flex-1 flex flex-col">
                  {/* Main Content Area */}
                  <div className="flex-1 space-y-4">
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
                  </div>

                  {/* Action Button - Always at bottom */}
                  <div className="pt-6">
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