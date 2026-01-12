"use client";
import { motion } from "framer-motion";
import type { Icon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface VisitorCardProps {
  title: string;
  description: string;
  icon: Icon;
  gradient: string;
  href?: string;
  onClick?: () => void;
}

export function VisitorCard({
  title,
  description,
  icon: IconComponent,
  gradient,
  href,
  onClick
}: VisitorCardProps) {
  const cardContent = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "relative p-6 md:p-8 border border-white/[0.1] cursor-pointer overflow-hidden group min-h-[280px] flex flex-col",
        gradient
      )}
      onClick={onClick}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/[0.05] to-transparent" />

      {/* Icon */}
      <div className="mb-4 relative z-10">
        <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-zinc-100" />
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-serif font-light text-zinc-100 mb-3 relative z-10">
        {title}
      </h3>

      {/* Description */}
      <p className="text-zinc-300 text-sm leading-relaxed mb-6 relative z-10 flex-grow">
        {description}
      </p>

      {/* CTA */}
      <div className="relative z-10">
        <span className="text-zinc-100 text-sm font-medium group-hover:text-gold transition-colors">
          Explore {title} →
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
