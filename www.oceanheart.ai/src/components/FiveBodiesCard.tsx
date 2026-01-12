"use client";
import { useRef, useState } from "react";

interface FiveBodiesCardProps {
  color: string;
  colorRgb: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FiveBodiesCard({ color, colorRgb, icon, title, description }: FiveBodiesCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-black border p-6 transition-all duration-300 overflow-hidden"
      style={{
        borderColor: `rgba(${colorRgb}, 0.2)`,
        boxShadow: isHovered ? `0 0 30px rgba(${colorRgb}, 0.4)` : 'none',
      }}
    >
      {/* Mouse-position radial gradient */}
      {isHovered && (
        <div
          className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${colorRgb}, 0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Static colored icon */}
      <div className="mb-3 relative z-10" style={{ color }}>
        {icon}
      </div>

      {/* Title with color */}
      <h3 className="text-base font-sans font-medium mb-2 relative z-10" style={{ color }}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-zinc-400 font-light leading-relaxed relative z-10">
        {description}
      </p>
    </div>
  );
}
