import React from 'react';

export type PillarType = 'view' | 'compass' | 'ground';

interface PillarIconProps {
  pillar: PillarType;
  size?: number;
  className?: string;
}

const pillarColors = {
  view: 'var(--ocean-blue)',
  compass: 'var(--jade)',
  ground: 'var(--plum)',
};

const pillarNames = {
  view: 'The View',
  compass: 'The Compass',
  ground: 'The Ground',
};

export function PillarIcon({ pillar, size = 24, className = '' }: PillarIconProps) {
  const color = pillarColors[pillar];

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {pillar === 'view' && (
          // Eye/Awareness symbol
          <g>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="12" r="4" fill={color} opacity="0.3" />
            <circle cx="12" cy="12" r="2" fill={color} />
          </g>
        )}
        {pillar === 'compass' && (
          // Compass/Navigation symbol
          <g>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
            <path d="M12 2 L12 22 M2 12 L22 12" stroke={color} strokeWidth="1.5" opacity="0.3" />
            <path d="M12 2 L16 12 L12 22 L8 12 Z" fill={color} opacity="0.5" />
          </g>
        )}
        {pillar === 'ground' && (
          // Mountain/Foundation symbol
          <g>
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
            <path d="M4 18 L8 10 L12 14 L16 8 L20 18 Z" fill={color} opacity="0.5" />
            <path d="M4 18 L20 18" stroke={color} strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  );
}

export function PillarBadge({ pillar, showLabel = true }: { pillar: PillarType; showLabel?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all"
      style={{
        borderColor: pillarColors[pillar],
        backgroundColor: `${pillarColors[pillar]}15`,
        color: pillarColors[pillar],
      }}
    >
      <PillarIcon pillar={pillar} size={16} />
      {showLabel && (
        <span className="text-xs font-medium uppercase tracking-wider">
          {pillarNames[pillar]}
        </span>
      )}
    </div>
  );
}
