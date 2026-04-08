"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { InheritanceResult } from "@/lib/calculations/inheritance";

interface Props {
  result: InheritanceResult;
}

const COLORS = [
  "#059669", "#0891b2", "#7c3aed", "#dc2626", "#ea580c",
  "#ca8a04", "#0d9488", "#4f46e5", "#be185d", "#65a30d",
  "#2563eb", "#c026d3", "#854d0e", "#475569",
];

const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

export default function ResultsDisplay({ result }: Props) {
  const activeHeirs = useMemo(() => result.heirs.filter((h) => !h.isBlocked && h.totalAmount > 0), [result.heirs]);
  const blockedHeirs = useMemo(() => result.heirs.filter((h) => h.isBlocked), [result.heirs]);

  const chartData = useMemo(
    () =>
      activeHeirs.map((h, i) => ({
        name: h.labelAr + (h.count > 1 ? ` (${h.count})` : ""),
        value: h.totalAmount,
        color: COLORS[i % COLORS.length],
      })),
    [activeHeirs]
  );

  if (activeHeirs.length === 0) return null;

  return (
    <div className="space-y-6 mt-8">
      {/* Warnings */}
      {result.warnings.map((w, i) => (
        <div key={i} className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-400">
          ⚠️ {w}
        </div>
      ))}

      {/* Awl / Radd notice */}
      {result.hasAwl && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/40 rounded-xl p-4 text-sm text-red-700 dark:text-red-400">
          ⚖️ <strong>عول:</strong> مجموع الأنصبة تجاوز التركة، لذا تم تخفيض جميع الأنصبة بنسبة متساوية حسب أحكام العول.
        </div>
      )}
      {result.hasRadd && (
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-400">
          ↩️ <strong>رد:</strong> يوجد فائض في التركة بعد توزيع الفروض، تم رده على أصحاب الفروض (عدا الزوجين).
        </div>
      )}

      {/* Summary + Chart */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Summary Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-200 dark:border-green-800/40 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4">ملخص التوزيع</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">إجمالي التركة</span>
              <span className="font-bold text-gray-800 dark:text-white tabular-nums">{fmt(result.grossEstate)} ريال</span>
            </div>
            {result.debts > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-red-600 dark:text-red-400">(-) الديون</span>
                <span className="font-bold text-red-600 dark:text-red-400 tabular-nums">{fmt(result.debts)} ريال</span>
              </div>
            )}
            {result.wasiyyah > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-amber-600 dark:text-amber-400">(-) الوصية</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 tabular-nums">{fmt(result.wasiyyah)} ريال</span>
              </div>
            )}
            <div className="border-t border-green-200 dark:border-green-800/40 pt-3">
              <div className="flex justify-between">
                <span className="font-bold text-green-700 dark:text-green-400">صافي التركة</span>
                <span className="text-xl font-bold text-green-700 dark:text-green-400 tabular-nums">{fmt(result.netEstate)} ريال</span>
              </div>
            </div>
            <div className="border-t border-green-200 dark:border-green-800/40 pt-3 text-sm text-gray-500 dark:text-gray-400">
              عدد الورثة المستحقين: <strong className="text-gray-800 dark:text-white">{activeHeirs.reduce((sum, h) => sum + h.count, 0)}</strong>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${fmt(Number(value))} ريال`, ""]}
                contentStyle={{
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  direction: "rtl",
                  fontSize: "13px",
                }}
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
      </div>

      {/* Detailed Table */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg">
          <h3 className="font-bold text-gray-800 dark:text-white text-sm">📋 تفصيل أنصبة الورثة</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                <th className="px-4 py-3 text-right">الوارث</th>
                <th className="px-4 py-3 text-right">العدد</th>
                <th className="px-4 py-3 text-right">النصيب</th>
                <th className="px-4 py-3 text-right">النوع</th>
                <th className="px-4 py-3 text-right">النسبة</th>
                <th className="px-4 py-3 text-right">الإجمالي</th>
                <th className="px-4 py-3 text-right">للفرد</th>
              </tr>
            </thead>
            <tbody>
              {activeHeirs.map((heir, i) => (
                <tr
                  key={heir.heirId}
                  className={i % 2 === 0 ? "bg-white dark:bg-dark-surface" : "bg-gray-50 dark:bg-dark-bg/50"}
                >
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                    <span className="ml-2">{heir.icon}</span>
                    {heir.labelAr}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 tabular-nums">{heir.count}</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-lg">
                      {heir.shareFraction}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{heir.shareType}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 tabular-nums">{heir.percentage.toFixed(1)}%</td>
                  <td className="px-4 py-3 font-bold text-green-700 dark:text-green-400 tabular-nums">{fmt(heir.totalAmount)} ريال</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 tabular-nums">{fmt(heir.perPersonAmount)} ريال</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blocked Heirs */}
      {blockedHeirs.length > 0 && (
        <div className="bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 text-sm">🚫 الورثة المحجوبون</h4>
          <div className="space-y-2">
            {blockedHeirs.map((heir) => (
              <div key={heir.heirId} className="flex items-center justify-between text-sm bg-white dark:bg-dark-surface rounded-lg px-4 py-3 border border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="ml-2">{heir.icon}</span>
                  {heir.labelAr} {heir.count > 1 ? `(${heir.count})` : ""}
                </span>
                <span className="text-red-500 dark:text-red-400 text-xs font-medium">{heir.blockReason}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step-by-step Calculation */}
      <details className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group">
        <summary className="px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors flex items-center justify-between text-sm font-bold text-gray-700 dark:text-gray-300">
          <span>📐 خطوات الحساب التفصيلية</span>
          <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="space-y-1.5 font-mono text-sm text-gray-600 dark:text-gray-400 leading-relaxed" dir="rtl">
            {result.steps.map((step, i) => (
              <p key={i} className={step.includes("──") ? "border-t border-gray-200 dark:border-gray-700 pt-2 mt-2" : ""}>
                {step}
              </p>
            ))}
          </div>
        </div>
      </details>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4 text-center">
        <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
          ⚠️ هذه الحاسبة للاسترشاد فقط وتعتمد على المذهب الحنبلي المعمول به في المملكة العربية السعودية.
          <br />
          يُرجى مراجعة <strong>المحكمة الشرعية</strong> أو <strong>عالم شرعي مختص</strong> للتأكد من صحة التوزيع في حالتك.
        </p>
      </div>
    </div>
  );
}
