"use client";

import { useState, useMemo } from "react";
import ResultCard, { fmt } from "../components/ResultCard";
import DonutChart from "../components/DonutChart";
import FormulaDisplay from "../components/FormulaDisplay";
import QuickPresets from "../components/QuickPresets";
import BreakdownTable from "../components/BreakdownTable";

export default function AmountAfterPercent() {
  const [amount, setAmount] = useState(1000);
  const [percent, setPercent] = useState(15);
  const [isAdd, setIsAdd] = useState(true);

  const diff = useMemo(() => (amount * percent) / 100, [amount, percent]);
  const result = useMemo(() => (isAdd ? amount + diff : amount - diff), [amount, diff, isAdd]);

  const formula = isAdd
    ? `${fmt(amount)} + (${fmt(amount)} × ${percent}%) = ${fmt(result)}`
    : `${fmt(amount)} - (${fmt(amount)} × ${percent}%) = ${fmt(result)}`;

  return (
    <div className="space-y-5">
      {/* Toggle */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit">
        <button
          onClick={() => setIsAdd(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isAdd ? "bg-green-600 text-white shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
        >
          ➕ إضافة
        </button>
        <button
          onClick={() => setIsAdd(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!isAdd ? "bg-red-600 text-white shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
        >
          ➖ طرح
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">المبلغ الأصلي (ريال)</label>
            <input
              type="number"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <QuickPresets values={[1000, 5000, 10000, 50000]} onSelect={setAmount} suffix=" ريال" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">النسبة (%)</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={percent || ""}
                onChange={(e) => setPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-20 h-[52px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg text-center focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input type="range" min={0} max={100} value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="flex-1 accent-teal-600" />
            </div>
            <QuickPresets values={[5, 10, 15, 20, 25, 50]} onSelect={setPercent} />
          </div>
        </div>

        <div className="space-y-4">
          <ResultCard
            label={isAdd ? `المبلغ بعد الإضافة (+${percent}%)` : `المبلغ بعد الطرح (-${percent}%)`}
            value={result}
            isPositive={isAdd}
            isNegative={!isAdd}
          />
          <DonutChart percent={isAdd ? (diff / result) * 100 : percent} color={isAdd ? "#0d9488" : "#dc2626"} label={isAdd ? "المُضاف" : "المطروح"} />
        </div>
      </div>

      <FormulaDisplay formula={formula} />

      <BreakdownTable rows={[
        { label: "المبلغ الأصلي", value: amount },
        { label: isAdd ? "القيمة المُضافة" : "القيمة المطروحة", value: diff },
        { label: "المبلغ النهائي", value: result, highlight: true },
      ]} />
    </div>
  );
}
