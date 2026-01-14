"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IconBrandGithub, IconExternalLink, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { PortfolioProject, ProjectStatus, makeProjectSlug } from "@/lib/portfolio";
import { TerminalModal } from "./TerminalModal";

interface TerminalPortfolioCardWithModalProps {
  project: PortfolioProject & { sectionId: string; slug?: string };
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

export function TerminalPortfolioCardWithModal({
  project,
  index = 0,
  showProblemSolution = false,
}: TerminalPortfolioCardWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const status = project.status || "prototype";
  const slug = project.slug || makeProjectSlug(project.sectionId, project.title);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        onClick={() => setIsModalOpen(true)}
        className="group relative bg-terminal-bg-secondary border border-white/10 rounded-sm overflow-hidden hover:border-terminal-cyan/30 hover:shadow-[0_0_20px_rgba(125,207,255,0.1)] transition-all duration-200 cursor-pointer"
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

          {/* Tech Stack Preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="font-terminal text-xs px-2 py-1 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="font-terminal text-xs px-2 py-1 text-terminal-muted">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Click to expand hint */}
          <div className="flex items-center gap-2 pt-3 border-t border-white/5 font-terminal text-xs text-terminal-muted group-hover:text-terminal-cyan transition-colors">
            <span>click to expand</span>
            <IconArrowRight className="w-3 h-3" />
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <TerminalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`~/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="p-6">
          {/* Project Image */}
          {project.image && (
            <div className="relative h-48 sm:h-64 -mx-6 -mt-6 mb-6 overflow-hidden bg-terminal-bg-tertiary">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className={`font-terminal text-xs px-2 py-1 border rounded-sm bg-terminal-bg/80 backdrop-blur-sm ${statusBadgeColors[status]}`}>
                  [{status}]
                </span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-6">
            <h2 className="font-terminal text-2xl text-terminal mb-2">
              {project.title}
            </h2>
            <p className="font-terminal text-terminal-secondary leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem/Solution */}
          {(project.problem || project.solution) && (
            <div className="mb-6 p-4 bg-terminal-bg-secondary border border-white/5 rounded-sm space-y-4">
              {project.problem && (
                <div>
                  <span className="font-terminal text-xs text-terminal-red">## Problem</span>
                  <p className="font-terminal text-terminal-muted text-sm mt-1">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <span className="font-terminal text-xs text-terminal-green">## Solution</span>
                  <p className="font-terminal text-terminal-muted text-sm mt-1">{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Impact */}
          {project.impact && (
            <div className="mb-6 p-4 bg-terminal-cyan/5 border border-terminal-cyan/20 rounded-sm">
              <span className="font-terminal text-xs text-terminal-cyan">## Impact</span>
              <p className="text-terminal-cyan text-sm mt-1 font-terminal">{project.impact}</p>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-6">
            <span className="font-terminal text-xs text-terminal-muted block mb-3">## Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-terminal text-xs px-3 py-1.5 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 font-terminal text-sm bg-terminal-cyan/10 border border-terminal-cyan/30 text-terminal-cyan hover:bg-terminal-cyan/20 transition-colors rounded-sm"
              >
                <IconExternalLink className="w-4 h-4" />
                <span>Live Site</span>
              </a>
            )}
            {project.githubRepo && (
              <a
                href={`https://github.com/${project.githubRepo}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 font-terminal text-sm bg-transparent border border-white/20 text-terminal-secondary hover:border-white/40 hover:text-terminal transition-colors rounded-sm"
              >
                <IconBrandGithub className="w-4 h-4" />
                <span>Source</span>
              </a>
            )}
            <Link
              href={`/portfolio/${slug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 font-terminal text-sm bg-transparent border border-terminal-purple/30 text-terminal-purple hover:bg-terminal-purple/10 transition-colors rounded-sm"
            >
              <span>Full Case Study</span>
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </TerminalModal>
    </>
  );
}
