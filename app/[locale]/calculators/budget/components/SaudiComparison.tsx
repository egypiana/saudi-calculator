"use client";

import { ArrowUp, ArrowDown, Minus } from "lucide-react";

const SAUDI_AVERAGE: Record<string, number> = {
  housing: 32,
  food: 22,
  transport: 14,
  education: 6,
  health: 4,
  entertainment: 4,
  clothing: 5,
  savings: 8,
  other: 5,
};

const CATEGORY_NAMES: Record<string, string> = {
  housing: "السكن",
  food: "الطعام",
  transport: "النقل",
  education: "التعليم",
  health: "الصحة",
  entertainment: "الترفيه",
  clothing: "الملابس",
  savings: "الادخار",
  other: "أخرى",
};

interface SaudiComparisonProps {
  expenses: Record<string, number>;
  income: number;
}

export default function SaudiComparison({ expenses, income }: SaudiComparisonProps) {
  if (income <= 0) return null;

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📊 مقارنة بالمتوسط السعودي</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 text-right font-semibold text-gray-600 dark:text-gray-400">الفئة</th>
              <th className="py-2 text-right font-semibold text-gray-600 dark:text-gray-400">نفقتك</th>
              <th className="py-2 text-right font-semibold text-gray-600 dark:text-gray-400">المتوسط</th>
              <th className="py-2 text-right font-semibold text-gray-600 dark:text-gray-400">الفرق</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(SAUDI_AVERAGE).map(([id, avgPct]) => {
              const userPct = (expenses[id] || 0) / income * 100;
              const diff = userPct - avgPct;
              return (
                <tr key={id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2.5 text-gray-700 dark:text-gray-300">{CATEGORY_NAMES[id]}</td>
                  <td className="py-2.5 font-medium text-gray-800 dark:text-white">{userPct.toFixed(0)}%</td>
                  <td className="py-2.5 text-gray-500 dark:text-gray-400">{avgPct}%</td>
                  <td className="py-2.5">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                      Math.abs(diff) < 2 ? "text-gray-400" :
                      (id === "savings" ? (diff > 0 ? "text-green-600" : "text-red-500") :
                      (diff > 0 ? "text-red-500" : "text-green-600"))
                    }`}>
                      {Math.abs(diff) < 2 ? (
                        <><Minus className="h-3 w-3" /> متساوي</>
                      ) : diff > 0 ? (
                        <><ArrowUp className="h-3 w-3" /> +{diff.toFixed(0)}%</>
                      ) : (
                        <><ArrowDown className="h-3 w-3" /> {diff.toFixed(0)}%</>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
        المصدر: الهيئة العامة للإحصاء (GASTAT) — بيانات تقريبية 2024
      </p>
    </div>
  );
}
