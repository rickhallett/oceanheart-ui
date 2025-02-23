"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CumulativePointsAreaChartProps {
  dailyPoints: number[]; // Array of daily points (length = 7)
}

const CumulativePointsAreaChart: React.FC<CumulativePointsAreaChartProps> = ({ dailyPoints }) => {
  // Create chart data with cumulative sum.
  const chartData = dailyPoints.reduce((acc: { day: string; cumulative: number }[], points, index) => {
    // Calculate day label based on index.
    const date = new Date();
    date.setDate(date.getDate() - (dailyPoints.length - 1 - index));
    const dayLabel = date.toLocaleDateString("en-US", { weekday: "short" });

    // Accumulate points.
    const cumulative = (acc[index - 1]?.cumulative || 0) + points;
    acc.push({ day: dayLabel, cumulative });
    return acc;
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="text-center font-semibold mb-4 text-white">
        Cumulative Practice Points (Past Week)
      </div>
      <div className="h-[300px] w-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#F3F4F6" />
            <YAxis stroke="#F3F4F6" />
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
            <Area type="monotone" dataKey="cumulative" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CumulativePointsAreaChart;
