"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calculator, RotateCcw } from "lucide-react";

export default function PregnancyCalculator() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [lastPeriod, setLastPeriod] = useState("");
  const [result, setResult] = useState<{
    dueDate: Date; currentWeek: number; trimester: string; daysLeft: number;
  } | null>(null);

  const calculate = () => {
    if (!lastPeriod) return;
    const lmp = new Date(lastPeriod);
    const today = new Date();

    // Naegele's rule: LMP + 280 days
    const dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    const daysPassed = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysPassed / 7);
    const daysLeft = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    let trimester: string;
    if (currentWeek <= 12) {
      trimester = isAr ? "الثلث الأول" : "First Trimester";
    } else if (currentWeek <= 27) {
      trimester = isAr ? "الثلث الثاني" : "Second Trimester";
    } else {
      trimester = isAr ? "الثلث الثالث" : "Third Trimester";
    }

    setResult({ dueDate, currentWeek, trimester, daysLeft });
  };

  const reset = () => { setLastPeriod(""); setResult(null); };

  const formatDate = (d: Date) => d.toLocaleDateString(isAr ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
          <Calculator className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isAr ? "حاسبة الحمل والولادة" : "Pregnancy Due Date Calculator"}
        </h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          {isAr ? "تاريخ أول يوم من آخر دورة شهرية" : "First Day of Last Menstrual Period"}
        </label>
        <input
          type="date"
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
          {isAr ? "احسب موعد الولادة" : "Calculate Due Date"}
        </button>
        <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-gray-800 dark:text-white">{isAr ? "موعد الولادة المتوقع:" : "Expected Due Date:"}</span>
            <span className="font-bold text-xl text-primary-600 dark:text-primary-400">{formatDate(result.dueDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "الأسبوع الحالي:" : "Current Week:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{isAr ? `الأسبوع ${result.currentWeek}` : `Week ${result.currentWeek}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "المرحلة:" : "Trimester:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{result.trimester}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "الأيام المتبقية:" : "Days Remaining:"}</span>
            <span className="font-bold text-primary-600 dark:text-primary-400">{result.daysLeft} {isAr ? "يوم" : "days"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
