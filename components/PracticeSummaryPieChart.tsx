"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PracticeData {
  type: string;
  totalPoints: number;
}

import { PRACTICE_TYPES_COLORS } from "@/libs/chartColors";

interface PracticeSummaryPieChartProps {
  data: PracticeData[];
  colors?: string[];
}

const PracticeSummaryPieChart: React.FC<PracticeSummaryPieChartProps> = ({ data, colors }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-center font-semibold text-white mb-4">
        Practice Summary Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="totalPoints"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#82ca9d"
            label
          >
            {data.map((entry) => {
              const colorObj = PRACTICE_TYPES_COLORS.find((item) => item.type === entry.type);
              const fillColor = colorObj ? colorObj.color : "#000000";
              return <Cell key={entry.type} fill={fillColor} />;
            })}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "0.5rem",
              color: "#F3F4F6",
            }}
            itemStyle={{ color: "#F3F4F6" }}
            labelStyle={{ color: "#F3F4F6" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PracticeSummaryPieChart;
