"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BarChartItem {
  name: string;
  amount: number;
  color: string;
}

interface ExpenseBarChartProps {
  data: BarChartItem[];
}

export default function ExpenseBarChart({ data }: ExpenseBarChartProps) {
  const filtered = data.filter((d) => d.amount > 0);
  if (filtered.length === 0) return null;

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">المصروفات بالتفصيل</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={filtered} layout="vertical" margin={{ left: 10, right: 20 }}>
          <XAxis
            type="number"
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={90}
            tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: "IBM Plex Sans Arabic" }}
          />
          <Tooltip
            formatter={(value) => [`${Number(value).toLocaleString("ar-SA")} ريال`]}
            contentStyle={{ fontFamily: "IBM Plex Sans Arabic", direction: "rtl", borderRadius: 12 }}
          />
          <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
            {filtered.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
