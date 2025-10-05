"use client";

/**
 * CategoryFilter Component
 * Tabs for filtering audio recordings by category
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type AudioCategory = 'all' | 'meditation' | 'talk' | 'teaching' | 'practice';

interface CategoryFilterProps {
  activeCategory: AudioCategory;
  onCategoryChange: (category: AudioCategory) => void;
  className?: string;
}

const categories: { value: AudioCategory; label: string; shortLabel: string; color: string }[] = [
  { value: 'all', label: 'All', shortLabel: 'All', color: 'zinc' },
  { value: 'meditation', label: 'Guided Meditation', shortLabel: 'Meditation', color: 'ocean-blue' },
  { value: 'talk', label: 'Dharma Talks', shortLabel: 'Talks', color: 'plum' },
  { value: 'teaching', label: 'Teachings', shortLabel: 'Teachings', color: 'jade' },
  { value: 'practice', label: 'Practices', shortLabel: 'Practices', color: 'gold' },
];

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {categories.map((category) => {
        const isActive = activeCategory === category.value;

        return (
          <motion.button
            key={category.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategoryChange(category.value)}
            className={cn(
              'relative px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm font-medium transition-all border',
              isActive
                ? category.value === 'all'
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : `bg-${category.color} text-black border-${category.color} shadow-[0_0_20px_rgba(79,195,247,0.3)]`
                : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-zinc-300 hover:border-white/20'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className={cn(
                  'absolute inset-0 rounded-full',
                  category.value === 'all'
                    ? 'bg-white'
                    : `bg-${category.color}`
                )}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">
              <span className="hidden sm:inline">{category.label}</span>
              <span className="sm:hidden">{category.shortLabel}</span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
