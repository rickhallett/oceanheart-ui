import React from 'react';

interface CircleProgressProps {
  currentCircle: number;
  totalCircles?: number;
  size?: 'sm' | 'md' | 'lg' | number;
  showLabels?: boolean;
  className?: string;
}

const circleNames = [
  'Foundation',
  'Guided Practice',
  'Independence',
  'Internalisation',
  'Optimisation',
  'Integration',
  'Subtle Mastery',
  'Effortless Being',
  'Embodied Wisdom',
];

const sizeConfig = {
  sm: { circle: 28, gap: -8, font: 'text-xs' },
  md: { circle: 40, gap: -12, font: 'text-sm' },
  lg: { circle: 52, gap: -16, font: 'text-base' },
};

export function CircleProgress({
  currentCircle,
  totalCircles = 8,
  size = 'md',
  showLabels = true,
  className = '',
}: CircleProgressProps) {
  // Handle numeric size or preset size
  const config = typeof size === 'number'
    ? { circle: size, gap: -size / 3, font: size < 40 ? 'text-xs' : size < 56 ? 'text-sm' : 'text-base' }
    : sizeConfig[size];
  const circles = Array.from({ length: totalCircles + 1 }, (_, i) => i);

  // Use overlap for compact display (no labels), even spacing for full display (with labels)
  const useOverlap = !showLabels;

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Visual Progress */}
      <div className="relative w-full">
        {/* Connection Line - Only show on desktop when not overlapping */}
        {!useOverlap && (
          <>
            <div
              className="absolute top-1/2 h-0.5 bg-[var(--cloud)] -translate-y-1/2 hidden sm:block"
              style={{
                left: `${config.circle / 2}px`,
                right: `${config.circle / 2}px`,
                zIndex: 0
              }}
            />
            <div
              className="absolute top-1/2 h-0.5 bg-[var(--gold)] -translate-y-1/2 transition-all duration-1000 hidden sm:block"
              style={{
                left: `${config.circle / 2}px`,
                width: `calc(${(currentCircle / totalCircles) * 100}% - ${config.circle}px)`,
                zIndex: 1,
              }}
            />
          </>
        )}

        {/* Circles */}
        <div className="relative">
          {/* Circle row */}
          <div
            className={`relative flex flex-wrap items-start justify-center gap-x-3 gap-y-6 sm:gap-y-2 mb-2 ${useOverlap ? '' : 'sm:justify-between sm:flex-nowrap'}`}
            style={useOverlap ? { gap: `${config.gap}px` } : {}}
          >
            {circles.map((circle, index) => {
              const isCompleted = circle < currentCircle;
              const isCurrent = circle === currentCircle;
              const _isPending = circle > currentCircle;

              return (
                <div
                  key={`circle-${circle}`}
                  className={useOverlap ? "flex-shrink-0" : "flex flex-col items-center gap-2 min-w-[70px] sm:min-w-0"}
                  style={{
                    zIndex: isCurrent ? 30 : isCompleted ? 20 - index : 10 - index,
                  }}
                >
                  <div
                    className={`rounded-full flex items-center justify-center font-medium transition-all duration-500 ${config.font}`}
                    style={{
                      width: config.circle,
                      height: config.circle,
                      backgroundColor: isCurrent ? 'var(--gold)' : isCompleted ? 'var(--jade)' : 'var(--cloud)',
                      color: isCompleted || isCurrent ? 'var(--paper)' : 'var(--stone)',
                      transform: isCurrent ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: isCurrent
                        ? '0 0 20px rgba(212, 165, 116, 0.5), 0 0 0 3px var(--paper), 0 0 0 4px var(--gold)'
                        : isCompleted
                          ? '0 2px 4px rgba(0, 0, 0, 0.1)'
                          : 'none',
                      border: isCurrent ? '2px solid var(--paper)' : 'none',
                    }}
                  >
                    {circle}
                  </div>

                  {/* Labels inline when showing labels */}
                  {showLabels && (
                    <span
                      className={`text-xs text-center transition-colors leading-tight ${isCurrent ? 'text-[var(--gold)] font-medium' : 'text-[var(--stone)]'
                        }`}
                      style={{
                        maxWidth: '80px'
                      }}
                    >
                      {circleNames[circle]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Status */}
      {showLabels && (
        <div className="text-center mt-4">
          <p className="text-sm text-[var(--stone)]">Current Circle</p>
          <p className="text-xl font-light font-serif text-[var(--ink)]">
            Circle {currentCircle}: <span className="text-[var(--gold)]">{circleNames[currentCircle]}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export function CircleBadge({ circle }: { circle: number }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        backgroundColor: 'var(--gold)',
        color: 'var(--paper)',
      }}
    >
      <span className="text-xs font-medium uppercase tracking-wider">
        Circle {circle}
      </span>
    </div>
  );
}
