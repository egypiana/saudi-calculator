"use client";

import { useState } from "react";
import { Target } from "lucide-react";

interface SavingsProjectionProps {
  monthlySavings: number;
}

export default function SavingsProjection({ monthlySavings }: SavingsProjectionProps) {
  const [savingsGoal, setSavingsGoal] = useState(0);

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

  const monthsToGoal = monthlySavings > 0 && savingsGoal > 0
    ? Math.ceil(savingsGoal / monthlySavings)
    : 0;

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📅 توقعات الادخار السنوية</h3>

      {monthlySavings <= 0 ? (
        <p className="text-amber-600 dark:text-amber-400 text-sm text-center py-4">
          لا يوجد ادخار حالياً. قلّل مصروفاتك لبدء الادخار.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
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
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
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
