"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calculator, RotateCcw } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function VATCalculator() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [result, setResult] = useState<{ before: number; vat: number; after: number } | null>(null);

  const VAT_RATE = 0.15;

  const calculate = () => {
    const val = parseFloat(amount) || 0;
    if (val <= 0) return;

    if (mode === "add") {
      const vat = val * VAT_RATE;
      setResult({ before: val, vat, after: val + vat });
    } else {
      const before = val / (1 + VAT_RATE);
      const vat = val - before;
      setResult({ before, vat, after: val });
    }
  };

  const reset = () => { setAmount(""); setResult(null); };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
          <Calculator className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isAr ? "حاسبة ضريبة القيمة المضافة (15%)" : "VAT Calculator (15%)"}
        </h2>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setMode("add"); setResult(null); }}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${mode === "add" ? "bg-primary-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400"}`}
        >
          {isAr ? "إضافة الضريبة" : "Add VAT"}
        </button>
        <button
          onClick={() => { setMode("remove"); setResult(null); }}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${mode === "remove" ? "bg-primary-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400"}`}
        >
          {isAr ? "حذف الضريبة" : "Remove VAT"}
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          {mode === "add" ? (isAr ? "المبلغ قبل الضريبة (ريال)" : "Amount before VAT (SAR)") : (isAr ? "المبلغ شامل الضريبة (ريال)" : "Amount including VAT (SAR)")}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="0"
        />
      </div>

      <div className="flex gap-3 mb-4">
        <button onClick={calculate} className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
          {isAr ? "احسب" : "Calculate"}
        </button>
        <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div className="p-6 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "المبلغ قبل الضريبة:" : "Before VAT:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{formatNumber(result.before)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "مبلغ الضريبة (15%):" : "VAT (15%):"}</span>
            <span className="font-bold text-red-600 dark:text-red-400">{formatNumber(result.vat)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{isAr ? "الإجمالي شامل الضريبة:" : "Total with VAT:"}</span>
            <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">{formatNumber(result.after)} {isAr ? "ريال" : "SAR"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
