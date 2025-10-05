'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconLock, IconCheck, IconClock } from '@tabler/icons-react';

interface DayCardProps {
  day: number;
  title: string;
  subtitle: string;
  duration: string;
  isCompleted: boolean;
  isAccessible: boolean;
  index: number;
}

export default function DayCard({
  day,
  title,
  subtitle,
  duration,
  isCompleted,
  isAccessible,
  index,
}: DayCardProps) {
  const cardClassName = `
    group relative bg-black border overflow-hidden transition-all
    ${isAccessible
      ? 'border-white/[0.1] hover:border-gold/30 cursor-pointer hover:shadow-[0_0_20px_rgba(242,204,143,0.2)]'
      : 'border-white/[0.05] cursor-not-allowed opacity-60'
    }
    ${isCompleted ? 'border-gold/30 bg-gold/[0.02]' : ''}
  `;

  const cardContent = (
    <div className="p-4 sm:p-6">
      {/* Header with Day Number and Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`
              w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm font-medium border transition-all
              ${isCompleted
                ? 'bg-gold/20 text-gold border-gold/50 shadow-[0_0_15px_rgba(242,204,143,0.3)]'
                : isAccessible
                  ? 'bg-white/[0.05] text-zinc-300 border-white/[0.2]'
                  : 'bg-white/[0.02] text-zinc-600 border-white/[0.1]'
              }
            `}
          >
            {isCompleted ? (
              <IconCheck size={18} />
            ) : isAccessible ? (
              day
            ) : (
              <IconLock size={16} />
            )}
          </div>
          <div>
            <h3 className={`text-sm font-medium ${isAccessible ? 'text-zinc-100' : 'text-zinc-600'}`}>
              Day {day}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <IconClock size={12} />
              <span>{duration}</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {isCompleted && (
          <div className="bg-gold/20 border border-gold/50 text-gold px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
            Complete
          </div>
        )}
      </div>

      {/* Title and Subtitle */}
      <h4 className={`text-base font-serif font-light mb-2 group-hover:text-gold transition-colors ${isAccessible ? 'text-zinc-100' : 'text-zinc-600'}`}>
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-zinc-500 line-clamp-2">{subtitle}</p>

      {/* Locked State Message */}
      {!isAccessible && !isCompleted && (
        <div className="mt-3 pt-3 border-t border-white/[0.05]">
          <p className="text-xs text-zinc-600 flex items-center gap-1.5">
            <IconLock size={12} />
            Complete Day {day - 1} to unlock
          </p>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={isAccessible ? { scale: 1.02 } : {}}
    >
      {isAccessible ? (
        <Link href={`/app/sprint/day/${day}`} className={cardClassName}>
          {cardContent}
        </Link>
      ) : (
        <div className={cardClassName}>
          {cardContent}
        </div>
      )}
    </motion.div>
  );
}
