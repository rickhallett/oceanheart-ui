import React from 'react';

export type BodyType = 'mental' | 'emotional' | 'physical' | 'energetic' | 'spiritual';

interface BodyProgress {
  mental: number;
  emotional: number;
  physical: number;
  energetic: number;
  spiritual: number;
}

interface FiveBodiesVisualizerProps {
  progress: BodyProgress;
  layout?: 'radial' | 'bars';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

const bodyConfig = {
  mental: {
    name: 'Mental Body',
    color: 'var(--ocean-blue)',
    description: 'Thoughts, beliefs, clarity',
  },
  emotional: {
    name: 'Emotional Body',
    color: 'var(--jade)',
    description: 'Feelings, regulation, nervous system',
  },
  physical: {
    name: 'Physical Body',
    color: 'var(--plum)',
    description: 'Strength, vitality, health',
  },
  energetic: {
    name: 'Energetic Body',
    color: 'var(--gold)',
    description: 'Life force, subtle vitality',
  },
  spiritual: {
    name: 'Spiritual Body',
    color: 'var(--rust)',
    description: 'Awareness, presence, being',
  },
};

export function FiveBodiesVisualizer({
  progress,
  layout = 'bars',
  size = 'md',
  showLabels = true,
  className = '',
}: FiveBodiesVisualizerProps) {
  if (layout === 'radial') {
    return <RadialLayout progress={progress} size={size} showLabels={showLabels} className={className} />;
  }

  return <BarsLayout progress={progress} size={size} showLabels={showLabels} className={className} />;
}

function BarsLayout({
  progress,
  size: _size,
  showLabels,
  className,
}: Omit<FiveBodiesVisualizerProps, 'layout'>) {
  const bodies = Object.keys(bodyConfig) as BodyType[];

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {bodies.map((body) => {
        const config = bodyConfig[body];
        const value = progress[body];

        return (
          <div key={body} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                {showLabels && (
                  <div>
                    <p className="text-sm font-medium text-[var(--ink)]">{config.name}</p>
                    <p className="text-xs text-[var(--stone)]">{config.description}</p>
                  </div>
                )}
              </div>
              <span className="text-sm font-medium" style={{ color: config.color }}>
                {value}%
              </span>
            </div>
            <div className="h-2 bg-[var(--cloud)] rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{
                  width: `${value}%`,
                  backgroundColor: config.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RadialLayout({
  progress,
  size: _size,
  showLabels,
  className,
}: Omit<FiveBodiesVisualizerProps, 'layout'>) {
  const bodies = Object.keys(bodyConfig) as BodyType[];
  const center = 120;
  const baseRadius = 80;
  const maxRadius = 110;

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      <svg width="240" height="240" className="transform -rotate-90">
        {/* Background circles */}
        {bodies.map((body, index) => {
          const config = bodyConfig[body];
          const angle = (index * 2 * Math.PI) / bodies.length;
          const radius = baseRadius + (maxRadius - baseRadius) * (progress[body] / 100);
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);

          return (
            <g key={body}>
              {/* Connection line */}
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={config.color}
                strokeWidth="2"
                opacity="0.3"
              />
              {/* Progress circle */}
              <circle
                cx={x}
                cy={y}
                r="8"
                fill={config.color}
                opacity="0.8"
              />
            </g>
          );
        })}
        {/* Center circle */}
        <circle
          cx={center}
          cy={center}
          r="20"
          fill="var(--ocean-blue)"
          opacity="0.2"
        />
      </svg>

      {showLabels && (
        <div className="grid grid-cols-1 gap-2 text-center">
          {bodies.map((body) => {
            const config = bodyConfig[body];
            return (
              <div key={body} className="flex items-center gap-2 justify-center">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-xs text-[var(--stone)]">
                  {config.name}: {progress[body]}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function BodyBadge({ body }: { body: BodyType }) {
  const config = bodyConfig[body];
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
      style={{
        borderColor: config.color,
        backgroundColor: `${config.color}15`,
        color: config.color,
      }}
    >
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
      {config.name}
    </div>
  );
}
