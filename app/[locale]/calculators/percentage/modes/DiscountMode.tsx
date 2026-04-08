"use client";

import { useState, useMemo } from "react";
import { fmt } from "../components/ResultCard";
import FormulaDisplay from "../components/FormulaDisplay";
import QuickPresets from "../components/QuickPresets";
import DonutChart from "../components/DonutChart";

export default function DiscountMode() {
  const [originalPrice, setOriginalPrice] = useState(500);
  const [discountRate, setDiscountRate] = useState(30);

  const saving = useMemo(() => (originalPrice * discountRate) / 100, [originalPrice, discountRate]);
  const finalPrice = useMemo(() => originalPrice - saving, [originalPrice, saving]);

  const formula = `${fmt(originalPrice)} - (${fmt(originalPrice)} × ${discountRate}%) = ${fmt(finalPrice)}`;

  const comparison = useMemo(() =>
    [10, 20, 30, 40, 50, 60, 70].map((d) => ({
      discount: d,
      final: originalPrice - (originalPrice * d) / 100,
      saving: (originalPrice * d) / 100,
    })),
  [originalPrice]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">السعر الأصلي (ريال)</label>
            <input
              type="number"
              value={originalPrice || ""}
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
            <QuickPresets values={[100, 500, 1000, 1500, 2000, 5000]} onSelect={setOriginalPrice} suffix=" ريال" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">نسبة الخصم (%)</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={discountRate || ""}
                onChange={(e) => setDiscountRate(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-20 h-[52px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg text-center focus:ring-2 focus:ring-red-500 outline-none"
              />
              <input type="range" min={0} max={100} value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))} className="flex-1 accent-red-600" />
            </div>
            <QuickPresets values={[5, 10, 15, 20, 25, 30, 50, 70]} onSelect={setDiscountRate} active={discountRate} />
          </div>
        </div>

        <div className="space-y-4">
          {/* Main result card */}
          <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800/40 rounded-2xl p-5 text-center">
            <p className="text-sm text-red-600 dark:text-red-400 mb-1">🏷️ وفّرت</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400 tabular-nums mb-3">{fmt(saving)} ريال</p>
            <div className="border-t border-red-200 dark:border-red-800/30 pt-3">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">السعر بعد الخصم</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 tabular-nums">{fmt(finalPrice)} ريال</p>
              <p className="text-sm text-gray-400 line-through mt-1">{fmt(originalPrice)} ريال</p>
            </div>
          </div>
          <DonutChart percent={discountRate} color="#dc2626" label="الخصم" />
        </div>
      </div>

      <FormulaDisplay formula={formula} />

      {/* Discount comparison table */}
      <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">📊 مقارنة الخصومات لسعر {fmt(originalPrice)} ريال</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <th className="px-4 py-2 text-right">الخصم</th>
              <th className="px-4 py-2 text-right">السعر النهائي</th>
              <th className="px-4 py-2 text-right">التوفير</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr
                key={row.discount}
                className={row.discount === discountRate
                  ? "bg-red-50 dark:bg-red-900/10 font-bold"
                  : "hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                }
              >
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-300">{row.discount}%</td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-white tabular-nums">{fmt(row.final)} ريال</td>
                <td className="px-4 py-2.5 text-red-600 dark:text-red-400 tabular-nums">{fmt(row.saving)} ريال</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
