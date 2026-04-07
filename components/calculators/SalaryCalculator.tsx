"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calculator, RotateCcw } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function SalaryCalculator() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [basicSalary, setBasicSalary] = useState("");
  const [housingAllowance, setHousingAllowance] = useState("");
  const [transportAllowance, setTransportAllowance] = useState("");
  const [otherAllowances, setOtherAllowances] = useState("");
  const [result, setResult] = useState<{
    gross: number; gosi: number; net: number;
    basicVal: number; housingVal: number; transportVal: number; otherVal: number;
  } | null>(null);

  const GOSI_RATE = 0.0975;

  const calculate = () => {
    const basic = parseFloat(basicSalary) || 0;
    const housing = parseFloat(housingAllowance) || 0;
    const transport = parseFloat(transportAllowance) || 0;
    const other = parseFloat(otherAllowances) || 0;

    const gross = basic + housing + transport + other;
    const gosi = basic * GOSI_RATE;
    const net = gross - gosi;

    setResult({ gross, gosi, net, basicVal: basic, housingVal: housing, transportVal: transport, otherVal: other });
  };

  const reset = () => {
    setBasicSalary(""); setHousingAllowance(""); setTransportAllowance(""); setOtherAllowances("");
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
          {isAr ? "حاسبة الراتب" : "Salary Calculator"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>{isAr ? "الراتب الأساسي (ريال)" : "Basic Salary (SAR)"}</label>
          <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "بدل السكن (ريال)" : "Housing Allowance (SAR)"}</label>
          <input type="number" value={housingAllowance} onChange={(e) => setHousingAllowance(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "بدل النقل (ريال)" : "Transport Allowance (SAR)"}</label>
          <input type="number" value={transportAllowance} onChange={(e) => setTransportAllowance(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "بدلات أخرى (ريال)" : "Other Allowances (SAR)"}</label>
          <input type="number" value={otherAllowances} onChange={(e) => setOtherAllowances(e.target.value)} className={inputClass} placeholder="0" />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
          {isAr ? "احسب الراتب" : "Calculate Salary"}
        </button>
        <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "الراتب الأساسي:" : "Basic Salary:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{formatNumber(result.basicVal)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "البدلات:" : "Allowances:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{formatNumber(result.housingVal + result.transportVal + result.otherVal)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "الإجمالي:" : "Gross:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{formatNumber(result.gross)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "خصم التأمينات (9.75%):" : "GOSI Deduction (9.75%):"}</span>
            <span className="font-bold text-red-600 dark:text-red-400">-{formatNumber(result.gosi)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{isAr ? "صافي الراتب:" : "Net Salary:"}</span>
            <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">{formatNumber(result.net)} {isAr ? "ريال" : "SAR"}</span>
          </div>
        </div>
      )}
    </div>
  );
}
