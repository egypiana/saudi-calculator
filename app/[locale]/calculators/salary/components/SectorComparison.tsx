"use client";

import { useMemo } from "react";
import { SECTOR_SUMMARIES, fmtSalary } from "@/lib/data/salaryScales";

const BAR_COLORS = [
  "from-blue-500 to-blue-700",
  "from-emerald-500 to-emerald-700",
  "from-rose-500 to-rose-700",
  "from-amber-500 to-amber-700",
  "from-purple-500 to-purple-700",
];

const SCALE_MARKS = [0, 10000, 20000, 30000, 40000];

export default function SectorComparison() {
  const globalMax = useMemo(
    () => Math.max(...SECTOR_SUMMARIES.map((s) => s.maxSalary)),
    []
  );

  const insights = useMemo(() => {
    const highestMax = SECTOR_SUMMARIES.reduce((prev, curr) =>
      curr.maxSalary > prev.maxSalary ? curr : prev
    );
    const highestEntry = SECTOR_SUMMARIES.reduce((prev, curr) =>
      curr.avgEntry > prev.avgEntry ? curr : prev
    );

    // Parse transport allowance to find highest
    const parseTransport = (range: string): number => {
      const nums = range.replace(/,/g, "").match(/\d+/g);
      if (!nums) return 0;
      return Math.max(...nums.map(Number));
    };
    const highestTransport = SECTOR_SUMMARIES.reduce((prev, curr) =>
      parseTransport(curr.transportRange) > parseTransport(prev.transportRange)
        ? curr
        : prev
    );

    return {
      highestMax: {
        sector: highestMax.labelAr,
        value: highestMax.maxSalary,
      },
      highestEntry: {
        sector: highestEntry.labelAr,
        value: highestEntry.avgEntry,
      },
      highestTransport: {
        sector: highestTransport.labelAr,
        value: parseTransport(highestTransport.transportRange),
      },
    };
  }, []);

  // For color-coding table cells
  const columnValues = useMemo(() => {
    const cols = {
      min: SECTOR_SUMMARIES.map((s) => s.minSalary),
      entry: SECTOR_SUMMARIES.map((s) => s.avgEntry),
      mid: SECTOR_SUMMARIES.map((s) => s.avgMid),
      senior: SECTOR_SUMMARIES.map((s) => s.avgSenior),
      max: SECTOR_SUMMARIES.map((s) => s.maxSalary),
    };
    return {
      min: { highest: Math.max(...cols.min), lowest: Math.min(...cols.min) },
      entry: { highest: Math.max(...cols.entry), lowest: Math.min(...cols.entry) },
      mid: { highest: Math.max(...cols.mid), lowest: Math.min(...cols.mid) },
      senior: { highest: Math.max(...cols.senior), lowest: Math.min(...cols.senior) },
      max: { highest: Math.max(...cols.max), lowest: Math.min(...cols.max) },
    };
  }, []);

  const cellColor = (value: number, col: keyof typeof columnValues) => {
    const { highest, lowest } = columnValues[col];
    if (value === highest)
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 font-bold";
    if (value === lowest)
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    return "";
  };

  return (
    <section
      dir="rtl"
      className="w-full rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-700 dark:bg-gray-900"
    >
      {/* Header */}
      <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
        📊 مقارنة الرواتب بين القطاعات الحكومية
      </h2>

      {/* Bar Chart */}
      <div className="mb-8 space-y-4">
        {SECTOR_SUMMARIES.map((sector, idx) => {
          const barWidth = (sector.maxSalary / globalMax) * 100;
          const minOffset = (sector.minSalary / globalMax) * 100;
          const rangeWidth = barWidth - minOffset;

          return (
            <div key={sector.id} className="space-y-1">
              {/* Sector label */}
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                <span>{sector.icon}</span>
                <span>{sector.labelAr}</span>
              </div>

              {/* Bar */}
              <div className="relative h-8 w-full rounded-lg bg-gray-100 dark:bg-gray-800">
                <div
                  className={`absolute top-0 h-full rounded-lg bg-gradient-to-l ${BAR_COLORS[idx]}`}
                  style={{
                    right: `${minOffset}%`,
                    width: `${rangeWidth}%`,
                  }}
                />
                {/* Min label */}
                <span
                  className="absolute top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-600 sm:text-xs dark:text-gray-400"
                  style={{ right: `${Math.max(minOffset - 1, 0)}%`, transform: `translateY(-50%) translateX(50%)` }}
                >
                  {fmtSalary(sector.minSalary)}
                </span>
                {/* Max label */}
                <span
                  className="absolute top-1/2 text-[10px] font-bold text-white sm:text-xs"
                  style={{
                    right: `${minOffset + rangeWidth / 2}%`,
                    transform: "translateY(-50%) translateX(50%)",
                  }}
                >
                  {fmtSalary(sector.maxSalary)}
                </span>
              </div>
            </div>
          );
        })}

        {/* Scale marks */}
        <div className="relative mt-2 flex h-6 w-full items-end justify-between border-t border-gray-300 dark:border-gray-600">
          {SCALE_MARKS.map((mark) => (
            <span
              key={mark}
              className="text-[10px] text-gray-500 sm:text-xs dark:text-gray-400"
            >
              {mark === 0 ? "٠" : `${fmtSalary(mark / 1000)}K`}
            </span>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
              <th className="px-3 py-2 text-right font-bold text-gray-700 dark:text-gray-300">
                القطاع
              </th>
              <th className="px-3 py-2 text-center font-bold text-gray-700 dark:text-gray-300">
                الحد الأدنى
              </th>
              <th className="px-3 py-2 text-center font-bold text-gray-700 dark:text-gray-300">
                متوسط مبتدئ
              </th>
              <th className="px-3 py-2 text-center font-bold text-gray-700 dark:text-gray-300">
                متوسط وسط
              </th>
              <th className="px-3 py-2 text-center font-bold text-gray-700 dark:text-gray-300">
                متوسط أعلى
              </th>
              <th className="px-3 py-2 text-center font-bold text-gray-700 dark:text-gray-300">
                الحد الأقصى
              </th>
              <th className="px-3 py-2 text-center font-bold text-gray-700 dark:text-gray-300">
                بدل النقل
              </th>
            </tr>
          </thead>
          <tbody>
            {SECTOR_SUMMARIES.map((sector, idx) => (
              <tr
                key={sector.id}
                className={`border-b border-gray-100 dark:border-gray-800 ${
                  idx % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-800/30" : ""
                }`}
              >
                <td className="px-3 py-2.5 text-right font-semibold text-gray-800 dark:text-gray-200">
                  <span className="ml-1">{sector.icon}</span>
                  {sector.labelAr}
                </td>
                <td
                  className={`px-3 py-2.5 text-center ${cellColor(sector.minSalary, "min")}`}
                >
                  {fmtSalary(sector.minSalary)}
                </td>
                <td
                  className={`px-3 py-2.5 text-center ${cellColor(sector.avgEntry, "entry")}`}
                >
                  {fmtSalary(sector.avgEntry)}
                </td>
                <td
                  className={`px-3 py-2.5 text-center ${cellColor(sector.avgMid, "mid")}`}
                >
                  {fmtSalary(sector.avgMid)}
                </td>
                <td
                  className={`px-3 py-2.5 text-center ${cellColor(sector.avgSenior, "senior")}`}
                >
                  {fmtSalary(sector.avgSenior)}
                </td>
                <td
                  className={`px-3 py-2.5 text-center ${cellColor(sector.maxSalary, "max")}`}
                >
                  {fmtSalary(sector.maxSalary)}
                </td>
                <td className="px-3 py-2.5 text-center text-gray-700 dark:text-gray-300">
                  {sector.transportRange}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Insights */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <h3 className="mb-3 text-lg font-bold text-amber-900 dark:text-amber-300">
          💡 أبرز المعلومات
        </h3>
        <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">🔹</span>
            <span>
              أعلى راتب أساسي: {insights.highestMax.sector} (
              {fmtSalary(insights.highestMax.value)} ريال)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">🔹</span>
            <span>
              أعلى راتب مبتدئ: {insights.highestEntry.sector} (
              {fmtSalary(insights.highestEntry.value)} ريال)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0">🔹</span>
            <span>
              أعلى بدل نقل: {insights.highestTransport.sector} (
              {fmtSalary(insights.highestTransport.value)} ريال)
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
