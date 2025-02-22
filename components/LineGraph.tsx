"use client";

import React from "react";

interface LineGraphProps {
  data: number[]; // Array of 7 numbers representing points per day.
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  // Graph dimensions and padding
  const width = 300;
  const height = 150;
  const padding = 20;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);

  // Convert a data value to a vertical SVG coordinate
  const mapY = (value: number) =>
    padding + ((maxValue - value) / (maxValue - minValue || 1)) * (height - 2 * padding);

  // Calculate horizontal spacing between points
  const xStep = (width - 2 * padding) / (data.length - 1);

  // Build the points string for the polyline
  const points = data
    .map((point, index) => {
      const x = padding + index * xStep;
      const y = mapY(point);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="text-center font-semibold mb-2 text-gray-700">
        Points per Day (Past Week)
      </div>
      <svg width={width} height={height} className="mx-auto">
        {/* Base grid lines (optional) */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#d1d5db"
          strokeWidth="1"
        />
        <line
          x1={padding}
          y1={padding}
          x2={width - padding}
          y2={padding}
          stroke="#d1d5db"
          strokeWidth="1"
        />
        {/* Draw the line */}
        <polyline
          fill="none"
          stroke="#4f46e5"
          strokeWidth="3"
          points={points}
          className="transition-all duration-300"
        />
        {/* Render a circle for each data point */}
        {data.map((point, index) => {
          const x = padding + index * xStep;
          const y = mapY(point);
          return <circle key={index} cx={x} cy={y} r="4" fill="#4f46e5" />;
        })}
      </svg>
    </div>
  );
};

export default LineGraph;
