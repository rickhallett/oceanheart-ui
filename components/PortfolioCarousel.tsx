"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';

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
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Custom continuous scroll since Swiper autoplay doesn't loop properly
  useEffect(() => {
    if (!isPlaying || !swiperRef.current) return;
    
    intervalRef.current = setInterval(() => {
      if (swiperRef.current) {
        if (isReversed) {
          swiperRef.current.slidePrev();
        } else {
          swiperRef.current.slideNext();
        }
      }
    }, 3000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, isReversed]);

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative">
      {/* Play/Pause Control */}
      <div className="flex justify-center mb-8">
        <button
          onClick={toggleAutoplay}
          className="btn btn-circle btn-outline hover:btn-secondary transition-all duration-300"
          aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </button>
      </div>

      {/* Swiper Carousel */}
      <div className="relative">
        {/* Fade gradients */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, hsl(var(--b1)), transparent)'
          }}
        ></div>
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, hsl(var(--b1)), transparent)'
          }}
        ></div>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[FreeMode]}
          spaceBetween={24}
          slidesPerView="auto"
          loop={true}
          loopAdditionalSlides={3}
          speed={1000}
          grabCursor={true}
          allowTouchMove={true}
          className="!overflow-visible"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id} className="!w-[320px]">
              <div className="group bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-[580px]">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}