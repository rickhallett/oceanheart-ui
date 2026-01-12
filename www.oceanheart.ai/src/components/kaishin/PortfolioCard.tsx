"use client";
import { motion } from "framer-motion";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { PortfolioProject } from "@/lib/portfolio";

interface PortfolioCardProps {
  project: PortfolioProject & { sectionTitle?: string };
  index?: number;
}

export function PortfolioCard({ project, index = 0 }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-charcoal/50 backdrop-blur-sm border border-white/[0.1] rounded-xl overflow-hidden hover:border-ocean-blue/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,195,247,0.15)]"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-ocean-blue/5">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {!project.image && (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-20">心</span>
          </div>
        )}

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Category Badge */}
        {project.sectionTitle && (
          <span className="inline-block text-xs font-light tracking-wide text-ocean-blue/70 bg-ocean-blue/10 px-3 py-1 rounded-full mb-3">
            {project.sectionTitle}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-serif font-light text-zinc-100 mb-3 group-hover:text-ocean-blue transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/[0.05]">
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-ocean-blue transition-colors"
            >
              <IconExternalLink className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Live Demo</span>
              <span className="xs:hidden sm:hidden">Demo</span>
            </a>
          )}
          {project.githubRepo && (
            <a
              href={`https://github.com/${project.githubRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-ocean-blue transition-colors"
            >
              <IconBrandGithub className="w-4 h-4" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
