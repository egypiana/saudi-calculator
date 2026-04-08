"use client";

import { useState, useMemo } from "react";
import ResultCard, { fmt } from "../components/ResultCard";
import DonutChart from "../components/DonutChart";
import FormulaDisplay from "../components/FormulaDisplay";
import QuickPresets from "../components/QuickPresets";
import BreakdownTable from "../components/BreakdownTable";

export default function PercentOfAmount() {
  const [amount, setAmount] = useState(1000);
  const [percent, setPercent] = useState(15);

  const result = useMemo(() => (amount * percent) / 100, [amount, percent]);
  const remaining = useMemo(() => amount - result, [amount, result]);

  const formula = `${fmt(amount)} × ${percent} ÷ 100 = ${fmt(result)}`;

  const comparison = useMemo(() =>
    [5, 10, 15, 20, 25, 30, 50].map((p) => ({
      percent: p,
      value: (amount * p) / 100,
      remaining: amount - (amount * p) / 100,
    })),
  [amount]);

  return (
    <div className="space-y-5">
      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">المبلغ الأساسي (ريال)</label>
            <input
              type="number"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="1,000"
            />
            <QuickPresets values={[1000, 5000, 10000, 50000, 100000]} onSelect={setAmount} suffix=" ريال" active={amount} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">النسبة المئوية (%)</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={percent || ""}
                onChange={(e) => setPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-20 h-[52px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg text-center focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={percent}
                onChange={(e) => setPercent(Number(e.target.value))}
                className="flex-1 accent-green-600"
              />
            </div>
            <QuickPresets values={[5, 10, 15, 20, 25, 50]} onSelect={setPercent} active={percent} />
          </div>
        </div>

        {/* Result + Chart */}
        <div className="space-y-4">
          <ResultCard label={`قيمة النسبة (${percent}%)`} value={result} />
          <DonutChart percent={percent} color="#1a6b3c" label="النسبة" />
        </div>
      </div>

      <FormulaDisplay formula={formula} />

      <BreakdownTable rows={[
        { label: "قيمة النسبة", value: result },
        { label: "المبلغ المتبقي", value: remaining },
        { label: "المبلغ الكامل", value: amount, highlight: true },
      ]} />

      {/* Comparison table */}
      <details className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700">
        <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">
          📊 قارن عدة نسب من {fmt(amount)} ريال
        </summary>
        <div className="px-4 pb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400">
                <th className="py-2 text-right">النسبة</th>
                <th className="py-2 text-right">القيمة</th>
                <th className="py-2 text-right">المتبقي</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.percent} className={row.percent === percent ? "bg-green-50 dark:bg-green-900/10 font-bold" : ""}>
                  <td className="py-2 text-gray-600 dark:text-gray-300">{row.percent}%</td>
                  <td className="py-2 text-gray-800 dark:text-white tabular-nums">{fmt(row.value)}</td>
                  <td className="py-2 text-gray-800 dark:text-white tabular-nums">{fmt(row.remaining)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
