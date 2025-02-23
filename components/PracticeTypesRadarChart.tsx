"use client";

import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PracticeTypesRadarChartProps {
  data: { type: string; totalPoints: number }[];
}

const PracticeTypesRadarChart: React.FC<PracticeTypesRadarChartProps> = ({ data }) => {
  // Determine the maximum points for the domain of the radius axis.
  const maxPoints = Math.max(...data.map(d => d.totalPoints)) || 100;

  return (
    <>
      <h3 className="text-center font-semibold mb-4 text-white">
        Practice Types Radar Chart
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="type" stroke="#F3F4F6" />
          <PolarRadiusAxis angle={30} domain={[0, maxPoints]} stroke="#F3F4F6" />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderRadius: "0.5rem", color: "#F3F4F6" }} />
          <Radar
            name="Total Points"
            dataKey="totalPoints"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PracticeTypesRadarChart;
