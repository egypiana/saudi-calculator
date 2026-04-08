"use client";

import { useState, useMemo } from "react";
import ResultCard from "../components/ResultCard";
import DonutChart from "../components/DonutChart";
import FormulaDisplay from "../components/FormulaDisplay";

export default function WhatPercent() {
  const [part, setPart] = useState(150);
  const [whole, setWhole] = useState(1000);

  const percentage = useMemo(() => (whole > 0 ? (part / whole) * 100 : 0), [part, whole]);
  const formula = `(${part.toLocaleString("ar-SA")} ÷ ${whole.toLocaleString("ar-SA")}) × 100 = ${percentage.toFixed(2)}%`;

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">الجزء (الرقم الأول)</label>
            <input
              type="number"
              value={part || ""}
              onChange={(e) => setPart(Number(e.target.value))}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="150"
            />
          </div>
          <div className="text-center text-gray-400 text-sm font-medium">من</div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">الكل (الأصل)</label>
            <input
              type="number"
              value={whole || ""}
              onChange={(e) => setWhole(Number(e.target.value))}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="1,000"
            />
          </div>
        </div>

        <div className="space-y-4">
          <ResultCard label="النسبة المئوية" value={percentage} currency="%" />
          <DonutChart percent={Math.min(100, percentage)} color="#2563eb" label="النسبة" />
        </div>
      </div>

      <FormulaDisplay formula={formula} />

      {/* Visual progress bar */}
      <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>0%</span>
          <span>{percentage.toFixed(1)}%</span>
          <span>100%</span>
        </div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 text-center">
          {part.toLocaleString("ar-SA")} يمثل <strong>{percentage.toFixed(2)}%</strong> من {whole.toLocaleString("ar-SA")}
        </p>
      </div>
    </div>
  );
}
