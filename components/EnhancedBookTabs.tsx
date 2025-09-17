"use client";

import { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";

type Section = {
  id: string;
  title: string;
  description: string;
  projects: {
    id: number;
    title: string;
    description: string;
    image: string;
    tech: string[];
    externalUrl?: string;
    slug?: string;
  }[];
};

interface EnhancedBookTabsProps {
  sections: Section[];
}

export default function EnhancedBookTabs({ sections }: EnhancedBookTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Portfolio Collection
        </h2>
        <p className="text-base-content/80 max-w-3xl mx-auto mt-3">
          Explore my complete portfolio organized by domain
        </p>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {sections.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              i === active
                ? "bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg"
                : "bg-base-200 hover:bg-base-300 text-base-content"
            }`}
          >
            {i === active && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{s.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Enhanced Content Area with Background Effects */}
      <div className="relative rounded-3xl bg-base-200/50 backdrop-blur-sm shadow-2xl overflow-hidden">
        <BackgroundBeams className="absolute inset-0 opacity-20" />
        
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 p-8 md:p-10"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-base-content mb-2">
              {sections[active]?.title}
            </h3>
            <p className="text-base-content/70 text-lg">
              {sections[active]?.description}
            </p>
          </div>

          {sections[active] && sections[active].projects.length > 0 ? (
            <BentoGrid className="max-w-full mx-auto">
              {sections[active].projects.map((project, idx) => {
                const isLarge = idx === 0 || idx === 3; // Make first and fourth items larger
                return (
                  <BentoGridItem
                    key={`${sections[active].id}-${project.id}`}
                    className={`${
                      isLarge ? "md:col-span-2" : ""
                    } group relative bg-base-100/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}
                    title={
                      <div className="flex items-center justify-between">
                        <span className="group-hover:text-primary transition-colors">
                          {project.title}
                        </span>
                        {project.externalUrl && (
                          <a
                            href={project.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    }
                    description={
                      <div className="space-y-3">
                        <p className="text-sm line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 4).map((tech, techIdx) => (
                            <span
                              key={techIdx}
                              className="inline-block px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    }
                    header={
                      <div className="relative w-full h-40 overflow-hidden rounded-xl">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    }
                    icon={
                      <Link
                        href={project.slug ? `/portfolio/${project.slug}` : "#"}
                        className="inline-block mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View Details →
                      </Link>
                    }
                  />
                );
              })}
            </BentoGrid>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="text-7xl mb-6 opacity-20">🚀</div>
              <h4 className="text-2xl font-semibold text-base-content/70 mb-3">
                Coming Soon
              </h4>
              <p className="text-base-content/50 max-w-md text-lg">
                Exciting projects in this category are currently in development.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}