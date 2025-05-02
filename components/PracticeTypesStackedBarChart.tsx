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
  // Only show practice types that have data in at least one day
  const activeTypes = practiceTypes.filter(type =>
    data.some(day => typeof day[type] === 'number' && day[type] > 0)
  );

  return (
    <>
      <h3 className="text-center font-semibold mb-4 text-white">
        Daily Practice Breakdown
      </h3>
      <div className="w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height={350} minHeight={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#F3F4F6" />
            <YAxis stroke="#F3F4F6" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "0.5rem",
                color: "#F3F4F6"
              }}
              itemStyle={{ color: "#F3F4F6" }}
              labelStyle={{ color: "#F3F4F6" }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop: 10,
                fontSize: '0.75rem',
                maxHeight: '100px',
                overflowY: 'auto'
              }}
            />
            {activeTypes.map((type) => {
              const colorObj = PRACTICE_TYPES_COLORS.find((item) => item.type === type);
              const fillColor = colorObj ? colorObj.color : "#000000";
              return <Bar key={type} dataKey={type} stackId="a" fill={fillColor} />;
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default PracticeTypesStackedBarChart;
