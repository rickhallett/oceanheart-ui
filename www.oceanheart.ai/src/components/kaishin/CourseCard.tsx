import React from 'react';
import Link from 'next/link';
import { PillarBadge, PillarType } from './PillarIcon';
import { IconClock, IconUsers, IconStar } from '@tabler/icons-react';

export type CourseTier = 1 | 2 | 3 | 4;

export interface CourseCardProps {
  id: string;
  title: string;
  tagline: string;
  pillars: PillarType[];
  duration: string;
  format: string;
  price: string;
  tier: CourseTier;
  imageGradient?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  students?: number;
  isEnrolled?: boolean;
  progress?: number;
  className?: string;
}

const tierConfig = {
  1: { name: 'Foundations', color: 'var(--jade)' },
  2: { name: 'Deepening', color: 'var(--ocean-blue)' },
  3: { name: 'Mastery', color: 'var(--plum)' },
  4: { name: 'Certification', color: 'var(--gold)' },
};

export function CourseCard({
  id,
  title,
  tagline,
  pillars,
  duration,
  format,
  price,
  tier,
  imageGradient = 'linear-gradient(135deg, var(--ocean-blue) 0%, var(--jade) 100%)',
  difficulty = 'Beginner',
  students,
  isEnrolled = false,
  progress,
  className = '',
}: CourseCardProps) {
  const tierInfo = tierConfig[tier];

  return (
    <Link href={`/app/courses/${id}`} className={`block group ${className}`}>
      <div className="h-full bg-[var(--paper)] border border-[var(--cloud)] rounded-none overflow-hidden transition-all duration-400 hover:shadow-xl relative">
        {/* Accent border on hover */}
        <div
          className="absolute top-0 left-0 w-1 h-full transition-transform duration-400 transform scale-y-0 group-hover:scale-y-100 origin-top"
          style={{ backgroundColor: tierInfo.color }}
        />

        {/* Course Image/Gradient */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
            style={{ background: imageGradient }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper)] via-transparent to-transparent" />

          {/* Tier Badge */}
          <div className="absolute top-4 left-4 z-10">
            <div
              className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider border"
              style={{
                backgroundColor: `${tierInfo.color}15`,
                borderColor: tierInfo.color,
                color: tierInfo.color,
              }}
            >
              Tier {tier}: {tierInfo.name}
            </div>
          </div>

          {/* Enrollment Status */}
          {isEnrolled && (
            <div className="absolute top-4 right-4 z-10">
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--ocean-blue)] text-[var(--paper)]">
                Enrolled
              </div>
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-xl font-light font-serif text-[var(--ink)] mb-2 group-hover:text-[var(--ocean-blue)] transition-colors">
              {title}
            </h3>
            <p className="text-sm text-[var(--stone)] line-clamp-2">{tagline}</p>
          </div>

          {/* Pillars */}
          <div className="flex flex-wrap gap-2">
            {pillars.map((pillar) => (
              <PillarBadge key={pillar} pillar={pillar} showLabel={false} />
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--stone)]">
            <div className="flex items-center gap-1">
              <IconClock size={16} />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconStar size={16} style={{ color: tierInfo.color }} />
              <span>{difficulty}</span>
            </div>
            {students && (
              <div className="flex items-center gap-1">
                <IconUsers size={16} />
                <span>{students}+ students</span>
              </div>
            )}
          </div>

          {/* Format */}
          <div className="pt-4 border-t border-[var(--cloud)]">
            <p className="text-xs text-[var(--stone)] mb-2">Format</p>
            <p className="text-sm text-[var(--ink)]">{format}</p>
          </div>

          {/* Progress Bar (if enrolled) */}
          {isEnrolled && typeof progress === 'number' && (
            <div className="pt-4 border-t border-[var(--cloud)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--stone)]">Progress</span>
                <span className="text-xs font-medium" style={{ color: tierInfo.color }}>
                  {progress}%
                </span>
              </div>
              <div className="h-2 bg-[var(--cloud)] rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: tierInfo.color,
                  }}
                />
              </div>
            </div>
          )}

          {/* Price & CTA */}
          <div className="pt-4 border-t border-[var(--cloud)] flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--stone)]">Price</p>
              <p className="text-2xl font-light font-serif" style={{ color: tierInfo.color }}>
                {price}
              </p>
            </div>
            <button
              className="px-6 py-2 border-2 transition-all duration-400 font-medium text-sm uppercase tracking-wider"
              style={{
                borderColor: tierInfo.color,
                color: tierInfo.color,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tierInfo.color;
                e.currentTarget.style.color = 'var(--paper)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = tierInfo.color;
              }}
            >
              {isEnrolled ? 'Continue' : 'Learn More'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Grid container for course cards
export function CourseGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
}
