"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PRACTICE_TYPES_COLORS } from "@/libs/chartColors";

interface StackedBarChartData {
  day: string;
  [practiceType: string]: number | string;
}

interface PracticeTypesStackedBarChartProps {
  data: StackedBarChartData[];
  practiceTypes: string[];
  colors?: string[];
}

const PracticeTypesStackedBarChart: React.FC<PracticeTypesStackedBarChartProps> = ({
  data,
  practiceTypes,
}) => {
  return (
    <>
      <h3 className="text-center font-semibold mb-4 text-white">
        Daily Breakdown by Practice Type
      </h3>
      <ResponsiveContainer width="100%" height={300} minWidth={300} minHeight={300} aspect={2}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} title="Daily Breakdown by Practice Type">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="#F3F4F6" />
          <YAxis stroke="#F3F4F6" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "0.5rem", color: "#F3F4F6" }}
            itemStyle={{ color: "#F3F4F6" }}
            labelStyle={{ color: "#F3F4F6" }}
          />
          <Legend />
          {practiceTypes.map((type) => {
            const colorObj = PRACTICE_TYPES_COLORS.find((item) => item.type === type);
            const fillColor = colorObj ? colorObj.color : "#000000";
            return <Bar key={type} dataKey={type} stackId="a" fill={fillColor} />;
          })}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PracticeTypesStackedBarChart;
