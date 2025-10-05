'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-black border border-white/[0.1] rounded-lg p-6 hover:border-gold/30 hover:shadow-[0_0_20px_rgba(242,204,143,0.1)] transition-all backdrop-blur-xl"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-zinc-400 mb-2">{title}</p>
          <p className="text-3xl font-serif font-light text-zinc-100 mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-zinc-500">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-gold/70">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
