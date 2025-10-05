"use client";

import { useState } from "react";
import ProjectGrid from "@/components/ProjectGrid";

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
  }[];
};

interface BookTabsProps {
  sections: Section[];
}

export default function BookTabs({ sections }: BookTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Portfolio Book
        </h2>
        <p className="text-base-content/80 max-w-3xl mx-auto mt-3">
          Browse the rest of my work by theme
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-6">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            className={`tab tab-lifted px-4 py-2 rounded-t-xl border-b-0 transition-transform duration-200 ${
              i === active
                ? "tab-active text-primary font-semibold"
                : "opacity-70 hover:opacity-100 hover:-translate-y-0.5"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="relative rounded-2xl bg-base-200 shadow-xl overflow-hidden">
        {/* Book page styling */}
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-base-300 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-base-300 to-transparent pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-0 md:opacity-100 [mask-image:radial-gradient(80%_60%_at_50%_-10%,black,transparent)] bg-gradient-to-b from-secondary/10 to-transparent" />

        <div className="p-6 md:p-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-base-content/90">{sections[active]?.title}</h3>
            <p className="text-base-content/70 mt-1">{sections[active]?.description}</p>
          </div>
          {sections[active] && sections[active].projects.length > 0 ? (
            <ProjectGrid projects={sections[active].projects} sectionId={sections[active].id} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4 opacity-30">📚</div>
              <h4 className="text-xl font-semibold text-base-content/70 mb-2">Coming Soon</h4>
              <p className="text-base-content/50 max-w-md">
                This chapter is being written. Check back soon for new projects in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
