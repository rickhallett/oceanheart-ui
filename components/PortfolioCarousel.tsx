"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { makeProjectSlug } from "@/libs/portfolio";

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
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  // Calculate total width for animation
  const cardWidth = 320;
  const gap = 24;
  const isSingle = projects.length === 1;
  const spacerWidth = isSingle ? 800 : 0; // gap after the single card to avoid duplicates being visible
  const totalWidth = isSingle
    ? cardWidth + gap + spacerWidth
    : (cardWidth + gap) * projects.length;
  const animationDuration = Math.max(20, totalWidth / 50); // Slower for longer content

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

      {/* Continuous Scroll Carousel */}
      <div className="relative overflow-hidden">
        {/* Vertical fade gradients on left/right edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-base-100 via-base-100/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-base-100 via-base-100/50 to-transparent z-10 pointer-events-none"></div>

        <div 
          className="flex gap-6"
          style={{
            animation: `scroll-${isReversed ? 'right' : 'left'} ${animationDuration}s linear infinite`,
            animationPlayState: isPlaying ? 'running' : 'paused',
          }}
        >
          {isSingle ? (
            <>
              {/* Single card only: no visual duplicate; spacer creates the loop distance */}
              {projects.map((project) => (
                <div
                  key={`${project.id}-single`}
                  className="group bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-shrink-0 flex flex-col"
                  style={{ width: `${cardWidth}px`, height: '580px' }}
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
                            key={`${tech}-single-${techIndex}`}
                            className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button - Always at bottom */}
                    <div className="pt-6">
                      <Link
                        href={project.externalUrl || `/portfolio/${makeProjectSlug(sectionId, project.title)}`}
                        target={project.externalUrl ? "_blank" : undefined}
                        rel={project.externalUrl ? "noopener noreferrer" : undefined}
                        className="w-full btn btn-outline btn-sm group-hover:btn-primary transition-all duration-300"
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">View Details</span>
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {/* Spacer to maintain continuous scroll without showing a duplicate card */}
              <div style={{ width: `${spacerWidth}px` }} aria-hidden />
            </>
          ) : (
            // Duplicate content twice for seamless loop when multiple cards exist
            [...projects, ...projects].map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="group bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-shrink-0 flex flex-col"
                style={{ width: `${cardWidth}px`, height: '580px' }}
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
                          key={`${tech}-${index}-${techIndex}`}
                          className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button - Always at bottom */}
                  <div className="pt-6">
                    <Link
                      href={project.externalUrl || `/portfolio/${makeProjectSlug(sectionId, project.title)}`}
                      target={project.externalUrl ? "_blank" : undefined}
                      rel={project.externalUrl ? "noopener noreferrer" : undefined}
                      className="w-full btn btn-outline btn-sm group-hover:btn-primary transition-all duration-300"
                    >
                      <span className="group-hover:scale-110 transition-transform duration-300">View Details</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${totalWidth}px);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-${totalWidth}px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
