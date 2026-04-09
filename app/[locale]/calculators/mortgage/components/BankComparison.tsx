"use client";

import { useState, useMemo } from "react";
import {
  SAUDI_BANKS,
  type BankInfo,
  calculateMortgage,
  fmt,
  type FinanceType,
} from "@/lib/calculations/mortgage";

type SortOption =
  | "subsidized"
  | "unsubsidized"
  | "maxFinancing"
  | "maxTenure";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "subsidized", label: "أقل نسبة مدعومة" },
  { value: "unsubsidized", label: "أقل نسبة غير مدعومة" },
  { value: "maxFinancing", label: "أعلى سقف تمويل" },
  { value: "maxTenure", label: "أطول مدة" },
];

const FINANCE_TYPE_AR: Record<FinanceType, string> = {
  murabaha: "مرابحة",
  ijara: "إجارة",
  conventional: "تورّق",
};

function getMonthlyPayment(
  bank: BankInfo,
  propertyPrice: number,
  years: number
): number {
  const result = calculateMortgage({
    propertyPrice,
    downPaymentPercent: bank.minDownPayment,
    annualRate: bank.subsidizedMin,
    years: Math.min(years, bank.maxTenure),
    financeType: bank.financeTypes[0],
    redfSupport: false,
    redfSupportPercent: 0,
  });
  return result.monthlyPayment;
}

interface BankComparisonProps {
  propertyPrice?: number;
  years?: number;
}

export default function BankComparison({
  propertyPrice = 1000000,
  years = 25,
}: BankComparisonProps) {
  const [sortBy, setSortBy] = useState<SortOption>("subsidized");

  const sortedBanks = useMemo(() => {
    const banks = [...SAUDI_BANKS];
    switch (sortBy) {
      case "subsidized":
        banks.sort((a, b) => a.subsidizedMin - b.subsidizedMin);
        break;
      case "unsubsidized":
        banks.sort((a, b) => a.unsubsidizedMin - b.unsubsidizedMin);
        break;
      case "maxFinancing":
        banks.sort((a, b) => b.maxFinancing - a.maxFinancing);
        break;
      case "maxTenure":
        banks.sort((a, b) => b.maxTenure - a.maxTenure);
        break;
    }
    return banks;
  }, [sortBy]);

  const cheapestBankId = useMemo(() => {
    if (!propertyPrice) return null;
    let minPayment = Infinity;
    let cheapestId = "";
    for (const bank of SAUDI_BANKS) {
      const payment = getMonthlyPayment(bank, propertyPrice, years);
      if (payment < minPayment) {
        minPayment = payment;
        cheapestId = bank.id;
      }
    }
    return cheapestId;
  }, [propertyPrice, years]);

  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
          <span className="text-2xl" role="img" aria-label="بنك">🏦</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            مقارنة البنوك السعودية
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            أسعار التمويل العقاري المحدّثة لعام 2025-2026
          </p>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 self-center ml-2">
          ترتيب حسب:
        </span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSortBy(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              sortBy === opt.value
                ? "bg-primary-600 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-right py-3 px-3 font-semibold text-gray-600 dark:text-gray-400">البنك</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600 dark:text-gray-400">نسبة مدعومة</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600 dark:text-gray-400">غير مدعومة</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600 dark:text-gray-400">أقصى مدة</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600 dark:text-gray-400">أعلى تمويل</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600 dark:text-gray-400">الدفعة الأولى</th>
              <th className="text-right py-3 px-3 font-semibold text-gray-600 dark:text-gray-400">النوع</th>
              {propertyPrice > 0 && (
                <th className="text-right py-3 px-3 font-semibold text-gray-600 dark:text-gray-400">القسط المتوقع</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedBanks.map((bank) => {
              const isCheapest = bank.id === cheapestBankId;
              const monthly = propertyPrice > 0
                ? getMonthlyPayment(bank, propertyPrice, years)
                : 0;
              return (
                <tr
                  key={bank.id}
                  className={`border-b border-gray-100 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                    isCheapest ? "bg-green-50/50 dark:bg-green-900/10" : ""
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{bank.logo}</span>
                      <div>
                        <span className="font-semibold text-gray-800 dark:text-white">{bank.nameAr}</span>
                        {isCheapest && (
                          <span className="block text-xs text-green-600 dark:text-green-400 font-medium">
                            الأقل تكلفة
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-primary-600 dark:text-primary-400 font-medium">{bank.subsidizedRate}</td>
                  <td className="py-3 px-3 text-gray-600 dark:text-gray-400">{bank.unsubsidizedRate}</td>
                  <td className="py-3 px-3 text-gray-700 dark:text-gray-300">{bank.maxTenure} سنة</td>
                  <td className="py-3 px-3 text-gray-700 dark:text-gray-300">{fmt(bank.maxFinancing)} ريال</td>
                  <td className="py-3 px-3 text-gray-700 dark:text-gray-300">{bank.minDownPayment}% فأكثر</td>
                  <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                    {bank.financeTypes.map((ft) => FINANCE_TYPE_AR[ft]).join("، ")}
                  </td>
                  {propertyPrice > 0 && (
                    <td className="py-3 px-3">
                      <span className={`font-bold ${isCheapest ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-white"}`}>
                        {fmt(Math.round(monthly))} ريال
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {sortedBanks.map((bank) => {
          const isCheapest = bank.id === cheapestBankId;
          const monthly = propertyPrice > 0
            ? getMonthlyPayment(bank, propertyPrice, years)
            : 0;
          return (
            <div
              key={bank.id}
              className={`rounded-xl border p-4 transition-colors ${
                isCheapest
                  ? "border-green-500 dark:border-green-600 bg-green-50/50 dark:bg-green-900/10 shadow-sm"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-bg"
              }`}
            >
              {/* Bank Name */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{bank.logo}</span>
                <h3 className="font-bold text-gray-800 dark:text-white">{bank.nameAr}</h3>
                {isCheapest && (
                  <span className="mr-auto text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                    الأقل تكلفة
                  </span>
                )}
              </div>

              {/* Rates */}
              <div className="text-sm space-y-1.5 mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">مدعوم:</span>
                  <span className="text-primary-600 dark:text-primary-400 font-medium">{bank.subsidizedRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">غير مدعوم:</span>
                  <span className="text-gray-700 dark:text-gray-300">{bank.unsubsidizedRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">أقصى مدة:</span>
                  <span className="text-gray-700 dark:text-gray-300">{bank.maxTenure} سنة</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">أعلى تمويل:</span>
                  <span className="text-gray-700 dark:text-gray-300">{fmt(bank.maxFinancing)} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">الدفعة الأولى:</span>
                  <span className="text-gray-700 dark:text-gray-300">{bank.minDownPayment}% فأكثر</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">النوع:</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {bank.financeTypes.map((ft) => FINANCE_TYPE_AR[ft]).join("، ")}
                  </span>
                </div>
              </div>

              {/* Special Feature */}
              <div className="text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg px-3 py-1.5 mb-3">
                <span className="ml-1">&#10024;</span>
                {bank.specialAr}
              </div>

              {/* Monthly Payment */}
              {propertyPrice > 0 && (
                <div className={`text-center rounded-lg py-2 font-bold text-sm ${
                  isCheapest
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                }`}>
                  القسط المتوقع: {fmt(Math.round(monthly))} ريال/شهر
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 text-center">
        * الأسعار استرشادية وقد تختلف حسب الملف الائتماني والدخل. آخر تحديث: 2025-2026
      </p>
    </section>
  );
}
