"use client";

import { useState, useMemo } from "react";
import ResultCard, { fmt } from "../components/ResultCard";
import FormulaDisplay from "../components/FormulaDisplay";
import BreakdownTable from "../components/BreakdownTable";

export default function PercentChange() {
  const [oldVal, setOldVal] = useState(800);
  const [newVal, setNewVal] = useState(1000);

  const change = useMemo(() => (oldVal > 0 ? ((newVal - oldVal) / oldVal) * 100 : 0), [oldVal, newVal]);
  const diff = useMemo(() => newVal - oldVal, [oldVal, newVal]);
  const isIncrease = change >= 0;

  const formula = `((${fmt(newVal)} - ${fmt(oldVal)}) ÷ ${fmt(oldVal)}) × 100 = ${change.toFixed(2)}%`;

  const PRESETS = [
    { label: "🛢️ سعر البنزين", old: 2.18, new: 2.33 },
    { label: "💼 الراتب", old: 8000, new: 9200 },
    { label: "🏠 سعر المنزل", old: 800000, new: 950000 },
    { label: "📈 سعر السهم", old: 120, new: 95 },
  ];

  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => { setOldVal(p.old); setNewVal(p.new); }}
            className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 whitespace-nowrap transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">المبلغ القديم</label>
            <input
              type="number"
              value={oldVal || ""}
              onChange={(e) => setOldVal(Number(e.target.value))}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">المبلغ الجديد</label>
            <input
              type="number"
              value={newVal || ""}
              onChange={(e) => setNewVal(Number(e.target.value))}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <ResultCard
            label={isIncrease ? "ارتفاع ↑" : "انخفاض ↓"}
            value={Math.abs(change)}
            currency="%"
            isPositive={isIncrease}
            isNegative={!isIncrease}
          />
          <div className={`text-center text-lg font-bold ${isIncrease ? "text-green-600" : "text-red-600"}`}>
            {isIncrease ? "+" : ""}{fmt(diff)} ريال
          </div>
        </div>
      </div>

      <FormulaDisplay formula={formula} />

      <BreakdownTable rows={[
        { label: "المبلغ القديم", value: oldVal },
        { label: "المبلغ الجديد", value: newVal },
        { label: "فرق القيمة", value: Math.abs(diff) },
        { label: "نسبة التغيير", value: Math.abs(change), highlight: true },
      ]} currency="" />
    </div>
  );
}
