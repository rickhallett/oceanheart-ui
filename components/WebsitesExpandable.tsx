"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";
import Image from "next/image";
import { LinkPreview } from "@/components/ui/link-preview";

type WebsiteProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  externalUrl?: string;
  sectionId: string;
  slug: string;
};

interface WebsitesExpandableProps {
  projects: WebsiteProject[];
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black dark:text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default function WebsitesExpandable({ projects }: WebsitesExpandableProps) {
  const [active, setActive] = useState<WebsiteProject | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // Reset overflow when component unmounts
      document.body.style.overflow = "auto";
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-8 space-y-12 pt-12 pb-12 relative z-10">
      <div className="text-center mb-10">
        <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Featured Websites
        </h2>
        <p className="text-base-content/80 max-w-3xl mx-auto mt-3">
          Premium client websites showcasing modern web architectures, design excellence, and production-grade delivery.
        </p>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] px-4 py-4">
            <motion.button
              key={`button-close-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex fixed top-4 right-4 z-[110] items-center justify-center bg-base-100 rounded-full h-10 w-10 shadow-xl border border-base-300"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full max-h-[90vh] flex flex-col bg-base-100 rounded-2xl md:rounded-3xl shadow-2xl mx-auto my-auto border border-base-300"
            >
              {/* Scrollable container */}
              <div className="flex flex-col h-full overflow-y-auto">
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <div className="relative w-full h-48 sm:h-64 md:h-80 flex-shrink-0">
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      className="object-cover object-center rounded-t-2xl md:rounded-t-3xl"
                      sizes="(max-width: 640px) 100vw, 600px"
                      priority
                    />
                  </div>
                </motion.div>

                <div className="p-5 sm:p-6 flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-lg sm:text-2xl text-base-content pr-2"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.div layoutId={`button-${active.title}-${id}`} className="flex-shrink-0">
                      <Link
                        href={`/portfolio/${active.slug}`}
                        className="btn btn-primary btn-sm w-full sm:w-auto text-sm"
                      >
                        Full Case Study
                      </Link>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <p className="text-sm sm:text-base leading-relaxed text-base-content/90">
                      {active.description}
                    </p>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-base-content mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {active.tech.map((t, i) => (
                          <span
                            key={i}
                            className="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium border border-primary/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {active.externalUrl && (
                      <div className="pt-2">
                        <a
                          href={active.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm w-full sm:w-auto text-sm"
                        >
                          View Live Website
                        </a>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card Grid (Collapsed State) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            layoutId={`card-${project.title}-${id}`}
            key={`${project.sectionId}-${project.id}`}
            onClick={() => setActive(project)}
            className="group cursor-pointer h-full"
          >
            <div className="bg-base-200/95 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
              <motion.div layoutId={`image-${project.title}-${id}`}>
                <div className="relative w-full h-64 overflow-hidden bg-base-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </motion.div>
              <div className="p-6 flex flex-col flex-grow">
                <motion.h3
                  layoutId={`title-${project.title}-${id}`}
                  className="font-bold text-lg mb-2 group-hover:text-primary transition-colors"
                >
                  {project.externalUrl ? (
                    <LinkPreview
                      url={project.externalUrl}
                      className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary hover:from-secondary hover:to-primary transition-all"
                      width={400}
                      height={250}
                    >
                      {project.title}
                    </LinkPreview>
                  ) : (
                    project.title
                  )}
                </motion.h3>
                <p className="text-base-content/70 mb-4 line-clamp-2 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={`${tech}-${project.id}-${techIndex}`}
                      className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs font-medium text-base-content/60">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
                <motion.button
                  layoutId={`button-${project.title}-${id}`}
                  className="btn btn-outline btn-sm group-hover:btn-primary transition-all w-full mt-auto"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
