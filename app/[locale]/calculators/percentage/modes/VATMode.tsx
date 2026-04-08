"use client";

import { useState, useMemo } from "react";
import ResultCard, { fmt } from "../components/ResultCard";
import FormulaDisplay from "../components/FormulaDisplay";
import BreakdownTable from "../components/BreakdownTable";
import DonutChart from "../components/DonutChart";

export default function VATMode() {
  const [amount, setAmount] = useState(1000);
  const [isAdd, setIsAdd] = useState(true);

  const vatAmount = useMemo(() => isAdd ? amount * 0.15 : amount - (amount / 1.15), [amount, isAdd]);
  const result = useMemo(() => isAdd ? amount + amount * 0.15 : amount / 1.15, [amount, isAdd]);

  const formula = isAdd
    ? `${fmt(amount)} + (${fmt(amount)} × 15%) = ${fmt(result)}`
    : `${fmt(amount)} ÷ 1.15 = ${fmt(result)} (الأصلي) + ${fmt(vatAmount)} (الضريبة)`;

  return (
    <div className="space-y-5">
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit">
        <button
          onClick={() => setIsAdd(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isAdd ? "bg-amber-600 text-white shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
        >
          إضافة VAT
        </button>
        <button
          onClick={() => setIsAdd(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!isAdd ? "bg-amber-600 text-white shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
        >
          استخراج VAT
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {isAdd ? "المبلغ قبل الضريبة (ريال)" : "المبلغ الشامل للضريبة (ريال)"}
            </label>
            <input
              type="number"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl px-4 py-3">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              🧾 ضريبة القيمة المضافة في السعودية <strong>15%</strong> منذ يوليو 2020
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ResultCard
            label={isAdd ? "المبلغ الإجمالي (شامل الضريبة)" : "السعر الأصلي (قبل الضريبة)"}
            value={result}
            color="#d97706"
          />
          <DonutChart percent={15} color="#d97706" label="الضريبة 15%" />
        </div>
      </div>

      <FormulaDisplay formula={formula} />

      <BreakdownTable rows={
        isAdd
          ? [
              { label: "السعر قبل الضريبة", value: amount },
              { label: "قيمة الضريبة (15%)", value: vatAmount },
              { label: "المبلغ الإجمالي", value: result, highlight: true },
            ]
          : [
              { label: "المبلغ الشامل", value: amount },
              { label: "السعر الأصلي", value: result, highlight: true },
              { label: "قيمة الضريبة (15%)", value: vatAmount },
            ]
      } />
    </div>
  );
}
