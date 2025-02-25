"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface LineGraphProps {
  data: number[]; // Array of 7 numbers representing points per day
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  // Convert data array into format expected by Recharts
  const chartData = data.map((value, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index)); // Calculate dates for last 7 days
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      points: value
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-0 bg-gray-800 rounded-lg shadow-md">
      <div className="text-center font-semibold mb-4 text-gray-200">
        Points per Day (Past Week)
      </div>
      <div className="w-full h-94 md:h-64 md:h-96 p-0 md:p-6">
        <ResponsiveContainer width="100%" height={300} minWidth={300} aspect={0} style={{ padding: 0 }}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              stroke="#F3F4F6"
            />
            <YAxis
              stroke="#F3F4F6"
              tickFormatter={(value) => Math.round(value).toString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F3F4F6'
              }}
              itemStyle={{ color: '#F3F4F6' }}
              labelStyle={{ color: '#F3F4F6' }}
            />
            <Line
              type="monotone"
              dataKey="points"
              stroke="#0088FE"
              strokeWidth={3}
              dot={{
                stroke: '#0088FE',
                strokeWidth: 2,
                r: 4,
                fill: '#fff'
              }}
              activeDot={{
                stroke: '#4F46E5',
                strokeWidth: 2,
                r: 6,
                fill: '#fff'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineGraph;
