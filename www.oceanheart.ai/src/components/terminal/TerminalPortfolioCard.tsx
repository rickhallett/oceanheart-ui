"use client";
import { motion } from "framer-motion";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { PortfolioProject, ProjectStatus } from "@/lib/portfolio";

interface TerminalPortfolioCardProps {
  project: PortfolioProject & { sectionTitle?: string };
  index?: number;
  showProblemSolution?: boolean;
}

const statusColors: Record<ProjectStatus, string> = {
  production: "text-terminal-green",
  prototype: "text-terminal-blue",
  experiment: "text-terminal-purple",
  archived: "text-terminal-muted",
};

const statusBadgeColors: Record<ProjectStatus, string> = {
  production: "border-terminal-green/30 text-terminal-green",
  prototype: "border-terminal-blue/30 text-terminal-blue",
  experiment: "border-terminal-purple/30 text-terminal-purple",
  archived: "border-white/10 text-terminal-muted",
};

export function TerminalPortfolioCard({
  project,
  index = 0,
  showProblemSolution = false,
}: TerminalPortfolioCardProps) {
  const status = project.status || "prototype";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-terminal-bg-secondary border border-white/10 rounded-sm overflow-hidden hover:border-terminal-cyan/30 hover:shadow-[0_0_20px_rgba(125,207,255,0.1)] transition-all duration-200"
    >
      {/* Project Image */}
      <div className="relative h-40 overflow-hidden bg-terminal-bg-tertiary">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />
        )}
        {!project.image && (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-terminal text-terminal-muted opacity-30">&gt;_</span>
          </div>
        )}

        {/* Status badge overlay */}
        <div className="absolute top-3 left-3">
          <span className={`font-terminal text-xs px-2 py-1 border rounded-sm bg-terminal-bg/80 backdrop-blur-sm ${statusBadgeColors[status]}`}>
            [{status}]
          </span>
        </div>

        {/* Currently building indicator */}
        {project.currentlyBuilding && (
          <div className="absolute top-3 right-3">
            <span className="font-terminal text-xs px-2 py-1 bg-terminal-orange/20 border border-terminal-orange/30 text-terminal-orange rounded-sm">
              building...
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Terminal header */}
        <div className="font-terminal text-terminal-muted text-xs mb-3">
          <span className="text-terminal-green">$</span> cat ./projects/{project.title.toLowerCase().replace(/\s+/g, '-')}/readme.md
        </div>

        {/* Title */}
        <h3 className={`font-terminal text-lg text-terminal mb-2 group-hover:text-terminal-cyan transition-colors`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-terminal text-sm text-terminal-secondary leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Problem/Solution (optional) */}
        {showProblemSolution && (project.problem || project.solution) && (
          <div className="mb-4 p-3 bg-terminal-bg border border-white/5 rounded-sm text-xs">
            {project.problem && (
              <div className="mb-2">
                <span className="text-terminal-red font-terminal">Problem:</span>
                <span className="font-terminal text-terminal-muted ml-2">{project.problem}</span>
              </div>
            )}
            {project.solution && (
              <div>
                <span className="text-terminal-green font-terminal">Solution:</span>
                <span className="font-terminal text-terminal-muted ml-2">{project.solution}</span>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="font-terminal text-xs px-2 py-1 text-terminal-muted">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Impact metric */}
        {project.impact && (
          <div className="mb-4 font-terminal text-xs text-terminal-green">
            <span className="text-terminal-muted">impact:</span> {project.impact}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-3 border-t border-white/5">
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-terminal text-xs text-terminal-cyan hover:text-terminal-blue transition-colors"
            >
              <IconExternalLink className="w-4 h-4" />
              <span>live</span>
            </a>
          )}
          {project.githubRepo && (
            <a
              href={`https://github.com/${project.githubRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-terminal text-xs text-terminal-secondary hover:text-terminal-cyan transition-colors"
            >
              <IconBrandGithub className="w-4 h-4" />
              <span>source</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
