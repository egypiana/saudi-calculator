"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ChartItem {
  name: string;
  value: number;
  color: string;
}

interface ExpenseDonutChartProps {
  data: ChartItem[];
  savingsRate: number;
}

export default function ExpenseDonutChart({ data, savingsRate }: ExpenseDonutChartProps) {
  const filtered = data.filter((d) => d.value > 0);

  if (filtered.length === 0) return null;

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">توزيع النفقات</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={filtered}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {filtered.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${Number(value).toLocaleString("ar-SA")} ريال`]}
              contentStyle={{ fontFamily: "IBM Plex Sans Arabic", direction: "rtl", borderRadius: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {savingsRate.toFixed(0)}%
          </span>
          <span className="text-xs text-gray-400">ادخار</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {filtered.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
