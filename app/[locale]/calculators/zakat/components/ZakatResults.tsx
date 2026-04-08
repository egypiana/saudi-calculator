"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { ZakatResult } from "@/lib/calculations/zakat";
import { fmt } from "@/lib/calculations/zakat";

interface Props {
  result: ZakatResult;
}

// Colors are provided by each category's color property

export default function ZakatResults({ result }: Props) {
  const activeCategories = useMemo(
    () => result.categories.filter((c) => c.zakatAmount > 0),
    [result.categories]
  );

  const chartData = useMemo(
    () => activeCategories.map((c) => ({ name: c.labelAr, value: c.zakatAmount, color: c.color })),
    [activeCategories]
  );

  if (result.totalZakat <= 0) return null;

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="text-center">
          <p className="text-green-200 text-sm mb-2">🌙 إجمالي الزكاة المستحقة</p>
          <p className="text-4xl sm:text-5xl font-bold tabular-nums mb-1">{fmt(result.totalZakat)}</p>
          <p className="text-green-200 text-lg">ريال سعودي</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="text-center">
            <p className="text-green-200 text-xs mb-1">إجمالي الأصول</p>
            <p className="font-bold tabular-nums">{fmt(result.totalAssets)}</p>
          </div>
          <div className="text-center">
            <p className="text-green-200 text-xs mb-1">الخصومات</p>
            <p className="font-bold tabular-nums text-red-200">{fmt(result.totalDeductions)}</p>
          </div>
          <div className="text-center">
            <p className="text-green-200 text-xs mb-1">صافي الثروة</p>
            <p className="font-bold tabular-nums">{fmt(result.netWealth)}</p>
          </div>
          <div className="text-center">
            <p className="text-green-200 text-xs mb-1">نصاب الذهب</p>
            <p className="font-bold tabular-nums">{fmt(result.nisabGold)}</p>
          </div>
        </div>

        {!result.isAboveNisab && (
          <div className="mt-4 bg-white/10 rounded-xl px-4 py-3 text-center">
            <p className="text-sm text-yellow-200">
              ⚠️ صافي ثروتك النقدية أقل من النصاب — الزكاة المعروضة تشمل فقط الأصناف ذات النصاب المستقل (الذهب، الفضة، الزروع، الأنعام)
            </p>
          </div>
        )}
      </div>

      {/* Chart + Breakdown */}
      {activeCategories.length > 1 && (
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📊 توزيع الزكاة حسب النوع</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${fmt(Number(value))} ريال`, ""]}
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb", borderRadius: "12px", direction: "rtl", fontSize: "13px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {chartData.map((entry, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📋 تفصيل الزكاة</h3>
            <div className="space-y-2">
              {activeCategories.map((cat) => (
                <div key={cat.categoryId} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{cat.labelAr}</span>
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-sm text-green-600 dark:text-green-400 tabular-nums">{fmt(cat.zakatAmount)}</span>
                    <span className="text-xs text-gray-400 mr-1">ريال</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 mt-2 border-t-2 border-green-200 dark:border-green-800/40">
                <span className="font-bold text-gray-800 dark:text-white">الإجمالي</span>
                <span className="font-bold text-lg text-green-600 dark:text-green-400 tabular-nums">{fmt(result.totalZakat)} ريال</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Table */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg">
          <h3 className="font-bold text-gray-800 dark:text-white text-sm">📐 تقرير الزكاة المفصّل</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                <th className="px-4 py-3 text-right">النوع</th>
                <th className="px-4 py-3 text-right">الأصول</th>
                <th className="px-4 py-3 text-right">الخصومات</th>
                <th className="px-4 py-3 text-right">النسبة</th>
                <th className="px-4 py-3 text-right">الزكاة</th>
              </tr>
            </thead>
            <tbody>
              {result.categories
                .filter((c) => c.totalAssets > 0 || c.totalDeductions > 0)
                .map((cat, i) => (
                  <tr key={cat.categoryId} className={i % 2 === 0 ? "" : "bg-gray-50 dark:bg-dark-bg/50"}>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                      <span className="ml-1">{cat.icon}</span>{cat.labelAr}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 tabular-nums">{cat.totalAssets > 0 ? fmt(cat.totalAssets) : "—"}</td>
                    <td className="px-4 py-3 text-red-500 tabular-nums">{cat.totalDeductions > 0 ? fmt(cat.totalDeductions) : "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{cat.zakatRate > 0 ? `${(cat.zakatRate * 100)}%` : "—"}</td>
                    <td className="px-4 py-3 font-bold text-green-600 dark:text-green-400 tabular-nums">{cat.zakatAmount > 0 ? fmt(cat.zakatAmount) : "—"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4 text-center">
        <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
          ⚠️ هذه الحاسبة للاسترشاد فقط. يُرجى استشارة عالم شرعي أو هيئة الزكاة والضريبة والجمارك للتأكد من صحة الحساب في حالتك.
        </p>
      </div>
    </div>
  );
}
