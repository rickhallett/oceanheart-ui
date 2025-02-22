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

interface PracticeSummaryPieChartProps {
  data: PracticeData[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#F39C12"];

const PracticeSummaryPieChart: React.FC<PracticeSummaryPieChartProps> = ({ data }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-center font-semibold text-gray-700 mb-4">
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
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
