'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  completed: number;
  total: number;
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  completed,
  total,
  showLabel = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-zinc-400">Progress</span>
          <span className="text-sm font-medium text-gold">
            {completed}/{total} days ({percentage}%)
          </span>
        </div>
      )}

      <div className="relative h-2 bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold to-jade rounded-full shadow-[0_0_15px_rgba(242,204,143,0.4)]"
        />
      </div>
    </div>
  );
}
