"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { ContextPanel } from "./ContextPanel";
import type { CVExperience } from "@/lib/cv-data";

interface ExperienceCardProps {
  experience: CVExperience;
  className?: string;
}

export function ExperienceCard({ experience, className }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("bg-terminal-bg-secondary border border-white/10 rounded-sm overflow-hidden", className)}>
      {/* Header */}
      <div className="p-3 sm:p-4 md:p-5">
        <div className="font-terminal text-xs text-terminal-muted mb-2 sm:mb-3 truncate">
          <span className="text-terminal-green">$</span> cat ./experience/{experience.id}/readme.md
        </div>

        <div className="flex flex-col gap-2 mb-3">
          <div className="min-w-0">
            <h3 className="font-terminal text-base sm:text-lg text-terminal">
              {experience.role}
            </h3>
            <p className={cn(
              "font-terminal text-xs sm:text-sm",
              experience.highlight ? "text-terminal-cyan" : "text-terminal-secondary"
            )}>
              {experience.company}
              {experience.companyDescription && (
                <span className="text-terminal-muted block sm:inline sm:ml-2">({experience.companyDescription})</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {experience.highlight && (
              <span className="font-terminal text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 border border-terminal-cyan/30 text-terminal-cyan rounded-sm">
                [featured]
              </span>
            )}
            <span className="font-terminal text-xs text-terminal-muted">
              {experience.period}
            </span>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          {experience.bullets.map((bullet, index) => (
            <li key={index} className="flex gap-2 font-terminal text-xs sm:text-sm text-terminal-secondary">
              <span className={cn("flex-shrink-0", experience.highlight ? "text-terminal-cyan" : "text-terminal-muted")}>-</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {experience.techStack.map((tech) => (
            <span
              key={tech}
              className="font-terminal text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Context Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex items-center gap-1.5 sm:gap-2 font-terminal text-xs transition-colors py-1",
            isExpanded ? "text-terminal-cyan" : "text-terminal-muted hover:text-terminal-cyan"
          )}
        >
          <span>[{isExpanded ? "hide" : "view"} context]</span>
          <IconChevronDown
            className={cn(
              "w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Expandable Context */}
      {isExpanded && (
        <div className="border-t border-white/10 p-3 sm:p-4 md:p-5 bg-terminal-bg">
          <ContextPanel context={experience.context} />
        </div>
      )}
    </div>
  );
}
