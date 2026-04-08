"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Target } from "lucide-react";

interface SavingsProjectionProps {
  monthlySavings: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export default function SavingsProjection({ monthlySavings, monthlyIncome, monthlyExpenses }: SavingsProjectionProps) {
  const [savingsGoal, setSavingsGoal] = useState(0);

  // Generate 12-month projection data
  const chartData = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const labels = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const cumulativeSavings = monthlySavings > 0 ? monthlySavings * month : 0;
    return {
      name: labels[i],
      الدخل: monthlyIncome * month,
      النفقات: monthlyExpenses * month,
      الادخار: cumulativeSavings,
    };
  });

  const monthsToGoal = monthlySavings > 0 && savingsGoal > 0
    ? Math.ceil(savingsGoal / monthlySavings)
    : 0;

  // Yearly projections table
  const projectionYears = [1, 2, 3, 5, 10];
  const annualReturn = 0.04;
  const projections = projectionYears.map((year) => {
    const months = year * 12;
    const conservative = monthlySavings > 0 ? monthlySavings * months : 0;
    const r = annualReturn / 12;
    const withReturn = monthlySavings > 0 && r > 0
      ? monthlySavings * ((Math.pow(1 + r, months) - 1) / r)
      : conservative;
    return { year, conservative: Math.round(conservative), optimistic: Math.round(withReturn) };
  });

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">📈 التوقعات المالية السنوية</h3>
      <p className="text-xs text-gray-400 mb-5">توقعات الـ 12 شهر القادمة بناءً على ميزانيتك الحالية</p>

      {monthlySavings <= 0 ? (
        <div className="text-center py-8">
          <p className="text-amber-600 dark:text-amber-400 text-sm font-medium">
            ⚠️ لا يوجد ادخار حالياً. قلّل مصروفاتك لبدء الادخار.
          </p>
        </div>
      ) : (
        <>
          {/* Line Chart */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "IBM Plex Sans Arabic" }}
                />
                <YAxis
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                />
                <Tooltip
                  formatter={(value) => [`${Number(value).toLocaleString("ar-SA")} ريال`]}
                  contentStyle={{ fontFamily: "IBM Plex Sans Arabic", direction: "rtl", borderRadius: 12, fontSize: 12 }}
                />
                <Legend
                  wrapperStyle={{ fontFamily: "IBM Plex Sans Arabic", fontSize: 12 }}
                />
                <Line type="monotone" dataKey="الدخل" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="النفقات" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="الادخار" stroke="#06b6d4" strokeWidth={2.5} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Projections Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 text-right font-semibold text-gray-600 dark:text-gray-400">المدة</th>
                  <th className="py-2 text-right font-semibold text-gray-600 dark:text-gray-400">بدون عائد</th>
                  <th className="py-2 text-right font-semibold text-gray-600 dark:text-gray-400">مع عائد 4%</th>
                </tr>
              </thead>
              <tbody>
                {projections.map((p) => (
                  <tr key={p.year} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2.5 text-gray-700 dark:text-gray-300">{p.year} {p.year === 1 ? "سنة" : "سنوات"}</td>
                    <td className="py-2.5 font-semibold text-gray-800 dark:text-white">
                      {p.conservative.toLocaleString("ar-SA")} ريال
                    </td>
                    <td className="py-2.5 font-semibold text-primary-600 dark:text-primary-400">
                      {p.optimistic.toLocaleString("ar-SA")} ريال
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Savings Goal */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h4 className="font-bold text-gray-800 dark:text-white text-sm">حدد هدفك المالي</h4>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={savingsGoal || ""}
                onChange={(e) => setSavingsGoal(+e.target.value)}
                placeholder="مثال: 100000"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">ريال</span>
            </div>
            {monthsToGoal > 0 && (
              <p className="mt-3 text-sm text-primary-600 dark:text-primary-400 font-medium">
                🎯 ستصل لهدفك خلال{" "}
                <span className="font-bold">
                  {monthsToGoal >= 12
                    ? `${Math.floor(monthsToGoal / 12)} سنة و ${monthsToGoal % 12} شهر`
                    : `${monthsToGoal} شهر`}
                </span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
