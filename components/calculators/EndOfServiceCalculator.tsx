"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calculator, RotateCcw } from "lucide-react";
import { formatNumber } from "@/lib/utils";

type TerminationType = "resignation" | "termination" | "retirement" | "contract-end";

export default function EndOfServiceCalculator() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [salary, setSalary] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [terminationType, setTerminationType] = useState<TerminationType>("resignation");
  const [result, setResult] = useState<{ amount: number; details: string } | null>(null);

  const calculate = () => {
    const monthlySalary = parseFloat(salary) || 0;
    const totalYears = (parseFloat(years) || 0) + (parseFloat(months) || 0) / 12;

    if (monthlySalary <= 0 || totalYears <= 0) return;

    let amount = 0;

    // حساب المكافأة حسب نظام العمل السعودي
    const first5 = Math.min(totalYears, 5);
    const after5 = Math.max(totalYears - 5, 0);

    const baseReward = (first5 * monthlySalary / 3) + (after5 * monthlySalary / 2);

    switch (terminationType) {
      case "resignation":
        if (totalYears < 2) {
          amount = 0;
        } else if (totalYears <= 5) {
          amount = baseReward / 3;
        } else if (totalYears <= 10) {
          amount = baseReward * 2 / 3;
        } else {
          amount = baseReward;
        }
        break;
      case "termination":
      case "contract-end":
      case "retirement":
        amount = baseReward;
        break;
    }

    const details = terminationType === "resignation" && totalYears < 2
      ? (isAr ? "لا يستحق مكافأة — الخدمة أقل من سنتين" : "No reward — service less than 2 years")
      : "";

    setResult({ amount, details });
  };

  const reset = () => {
    setSalary(""); setYears(""); setMonths(""); setTerminationType("resignation");
    setResult(null);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500";
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  const terminationOptions: { value: TerminationType; labelAr: string; labelEn: string }[] = [
    { value: "resignation", labelAr: "استقالة", labelEn: "Resignation" },
    { value: "termination", labelAr: "فصل / إنهاء خدمات", labelEn: "Termination" },
    { value: "retirement", labelAr: "تقاعد", labelEn: "Retirement" },
    { value: "contract-end", labelAr: "انتهاء العقد", labelEn: "Contract End" },
  ];

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
          <Calculator className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isAr ? "حاسبة مكافأة نهاية الخدمة" : "End of Service Calculator"}
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className={labelClass}>{isAr ? "الراتب الشهري (ريال)" : "Monthly Salary (SAR)"}</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{isAr ? "سنوات الخدمة" : "Years of Service"}</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className={inputClass} placeholder="0" />
          </div>
          <div>
            <label className={labelClass}>{isAr ? "أشهر إضافية" : "Additional Months"}</label>
            <input type="number" value={months} onChange={(e) => setMonths(e.target.value)} className={inputClass} placeholder="0" max="11" />
          </div>
        </div>
        <div>
          <label className={labelClass}>{isAr ? "سبب ترك العمل" : "Reason for Leaving"}</label>
          <select
            value={terminationType}
            onChange={(e) => setTerminationType(e.target.value as TerminationType)}
            className={inputClass}
          >
            {terminationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {isAr ? opt.labelAr : opt.labelEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
          {isAr ? "احسب المكافأة" : "Calculate Reward"}
        </button>
        <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700">
          {result.details ? (
            <p className="text-center text-amber-600 dark:text-amber-400 font-bold">{result.details}</p>
          ) : (
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800 dark:text-white">
                {isAr ? "مكافأة نهاية الخدمة:" : "End of Service Reward:"}
              </span>
              <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">
                {formatNumber(result.amount)} {isAr ? "ريال" : "SAR"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
