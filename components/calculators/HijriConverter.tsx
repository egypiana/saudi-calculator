"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calendar, RotateCcw } from "lucide-react";
import { gregorianToHijri, getHijriMonthName } from "@/lib/hijri";

export default function HijriConverter() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [gregorianDate, setGregorianDate] = useState("");
  const [result, setResult] = useState<{ hijriDay: number; hijriMonth: number; hijriMonthName: string; hijriYear: number } | null>(null);

  const today = new Date();
  const todayHijri = gregorianToHijri(today);

  const convert = () => {
    if (!gregorianDate) return;
    const date = new Date(gregorianDate);
    const hijri = gregorianToHijri(date);
    setResult({
      hijriDay: hijri.day,
      hijriMonth: hijri.month,
      hijriMonthName: getHijriMonthName(hijri.month, isAr ? "ar" : "en"),
      hijriYear: hijri.year,
    });
  };

  const reset = () => { setGregorianDate(""); setResult(null); };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
          <Calendar className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isAr ? "محول التاريخ الهجري" : "Hijri Date Converter"}
        </h2>
      </div>

      {/* Today's Hijri date */}
      <div className="mb-6 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-800">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{isAr ? "التاريخ الهجري اليوم:" : "Today's Hijri Date:"}</p>
        <p className="text-lg font-bold text-primary-700 dark:text-primary-400" dir="ltr">
          {todayHijri.day} {getHijriMonthName(todayHijri.month, isAr ? "ar" : "en")} {todayHijri.year} {isAr ? "هـ" : "AH"}
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          {isAr ? "أدخل التاريخ الميلادي" : "Enter Gregorian Date"}
        </label>
        <input
          type="date"
          value={gregorianDate}
          onChange={(e) => setGregorianDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex gap-3">
        <button onClick={convert} className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
          {isAr ? "تحويل إلى هجري" : "Convert to Hijri"}
        </button>
        <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{isAr ? "التاريخ الهجري:" : "Hijri Date:"}</p>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {result.hijriDay} {result.hijriMonthName} {result.hijriYear} {isAr ? "هـ" : "AH"}
            </p>
          </div>
        </div>
      )}

      {/* Hijri months reference */}
      <div className="mt-6">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3">{isAr ? "الأشهر الهجرية" : "Hijri Months"}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-dark-bg text-sm">
              <span className="text-primary-600 dark:text-primary-400 font-bold w-5">{i + 1}</span>
              <span className="text-gray-700 dark:text-gray-300">{getHijriMonthName(i + 1, isAr ? "ar" : "en")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
