"use client";

/**
 * AudioCard Component
 * Card component for displaying audio recordings in grid/list view
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  IconHeadphones,
  IconPlayerPlayFilled,
  IconCheck,
  IconEye,
} from '@tabler/icons-react';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import {
  formatDuration,
  parseTags,
  getCategoryDisplayName,
  getCategoryColor,
  type AudioWithProgress,
} from '@/lib/audio';
import { cn } from '@/lib/utils';

interface AudioCardProps {
  recording: AudioWithProgress;
  className?: string;
}

export function AudioCard({ recording, className }: AudioCardProps) {
  const tags = parseTags(recording.tags);
  const categoryColor = getCategoryColor(recording.category);
  const progress = recording.user_progress;
  const progressPercentage = progress && recording.duration
    ? (progress.progress_seconds / recording.duration) * 100
    : 0;

  return (
    <Link href={`/app/audio/${recording.id}`}>
      <CardSpotlight className={cn('h-80 w-full cursor-pointer', className)}>
        <div className="relative h-full p-2 pb-5 flex flex-col overflow-hidden">
          {/* Category Icon */}
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center mb-3 flex-shrink-0',
            `bg-${categoryColor}/20 border border-${categoryColor}/30`
          )}>
            <IconHeadphones className={cn('w-5 h-5', `text-${categoryColor}`)} />
          </div>

          {/* Category Badge */}
          <div className="mb-2 flex-shrink-0">
            <span className={cn(
              'inline-block px-2 py-0.5 rounded-full text-xs font-medium border',
              `bg-${categoryColor}/10 text-${categoryColor} border-${categoryColor}/30`
            )}>
              {getCategoryDisplayName(recording.category)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-zinc-100 mb-1.5 line-clamp-2 break-words flex-shrink-0">
            {recording.title}
          </h3>

          {/* Description */}
          {recording.description && (
            <p className="text-xs text-zinc-400  mb-3 flex-1">
              {recording.description}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2">
            {recording.duration && (
              <span className="flex items-center gap-1">
                <IconHeadphones className="w-3 h-3" />
                {formatDuration(recording.duration)}
              </span>
            )}
            <span>•</span>
            <span className="flex items-center gap-1">
              <IconEye className="w-3 h-3" />
              {recording.listen_count}
            </span>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-white/5 rounded text-xs text-zinc-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="px-1.5 py-0.5 text-xs text-zinc-400">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {progress && progressPercentage > 0 && (
            <div className="mb-2">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gold shadow-[0_0_8px_rgba(242,204,143,0.5)]"
                />
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {Math.round(progressPercentage)}%
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center gap-2 mt-auto flex-shrink-0 max-w-1/3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <button
                className={cn(
                  'w-full py-2 rounded text-sm font-medium transition-all flex items-center justify-center gap-1.5',
                  `bg-${categoryColor} opacity-70 text-black hover:bg-${categoryColor}/90 hover:opacity-100`
                )}
              >
                <IconPlayerPlayFilled className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{progress && progressPercentage > 0 ? 'Continue' : 'Play Now'}</span>
              </button>
            </motion.div>

            {/* Completed Badge */}
            {progress?.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center w-8 h-8 bg-jade/20 border border-jade/50 rounded-full"
                title="Completed"
              >
                <IconCheck className="w-4 h-4 text-jade" />
              </motion.div>
            )}
          </div>
        </div>
      </CardSpotlight>
    </Link>
  );
}
