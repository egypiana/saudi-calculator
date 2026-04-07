"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calculator, RotateCcw } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function MortgageCalculator() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [propertyPrice, setPropertyPrice] = useState("");
  const [downPayment, setDownPayment] = useState("30");
  const [annualRate, setAnnualRate] = useState("5.5");
  const [loanYears, setLoanYears] = useState("25");
  const [result, setResult] = useState<{
    loanAmount: number; monthlyPayment: number; totalPayment: number; totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(propertyPrice) || 0;
    const dp = (parseFloat(downPayment) || 0) / 100;
    const rate = (parseFloat(annualRate) || 0) / 100 / 12;
    const months = (parseFloat(loanYears) || 0) * 12;

    if (price <= 0 || months <= 0) return;

    const loanAmount = price * (1 - dp);

    let monthlyPayment: number;
    if (rate === 0) {
      monthlyPayment = loanAmount / months;
    } else {
      monthlyPayment = loanAmount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    }

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - loanAmount;

    setResult({ loanAmount, monthlyPayment, totalPayment, totalInterest });
  };

  const reset = () => {
    setPropertyPrice(""); setDownPayment("30"); setAnnualRate("5.5"); setLoanYears("25");
    setResult(null);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500";
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
          <Calculator className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isAr ? "حاسبة التمويل العقاري" : "Mortgage Calculator"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>{isAr ? "سعر العقار (ريال)" : "Property Price (SAR)"}</label>
          <input type="number" value={propertyPrice} onChange={(e) => setPropertyPrice(e.target.value)} className={inputClass} placeholder="1000000" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "الدفعة الأولى (%)" : "Down Payment (%)"}</label>
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className={inputClass} placeholder="30" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "معدل الربح السنوي (%)" : "Annual Rate (%)"}</label>
          <input type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} className={inputClass} placeholder="5.5" step="0.1" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "مدة التمويل (سنة)" : "Loan Period (years)"}</label>
          <input type="number" value={loanYears} onChange={(e) => setLoanYears(e.target.value)} className={inputClass} placeholder="25" />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
          {isAr ? "احسب القسط" : "Calculate Payment"}
        </button>
        <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "مبلغ التمويل:" : "Loan Amount:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{formatNumber(result.loanAmount)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "إجمالي الأرباح:" : "Total Interest:"}</span>
            <span className="font-bold text-red-600 dark:text-red-400">{formatNumber(result.totalInterest)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "إجمالي المبلغ:" : "Total Payment:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{formatNumber(result.totalPayment)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-gray-800 dark:text-white">{isAr ? "القسط الشهري:" : "Monthly Payment:"}</span>
            <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">{formatNumber(result.monthlyPayment)} {isAr ? "ريال" : "SAR"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
