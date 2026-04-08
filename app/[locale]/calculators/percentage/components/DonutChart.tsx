"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface Props {
  percent: number;
  color: string;
  label?: string;
}

export default function DonutChart({ percent, color, label }: Props) {
  const safePercent = Math.min(100, Math.max(0, percent));
  const data = [
    { name: "value", value: safePercent },
    { name: "rest", value: 100 - safePercent },
  ];

  return (
    <div className="relative w-[180px] h-[180px] mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            animationDuration={600}
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-800 dark:text-white" dir="ltr">
          {safePercent.toFixed(1)}%
        </span>
        {label && <span className="text-xs text-gray-400 mt-0.5">{label}</span>}
      </div>
    </div>
  );
}
