"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NATIONAL_DAY_DATA, NATIONAL_DAY_YEARS, formatDateAr } from "@/lib/data/nationalDayData";
import { lp } from "@/lib/utils/locale";

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

function getDaysUntil(dateStr: string): number {
  return Math.max(0, Math.ceil((new Date(dateStr + "T00:00:00").getTime() - Date.now()) / 86400000));
}

export default function AllNationalDayYears({ locale }: { locale: string }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(i);
  }, []);

  const preview = NATIONAL_DAY_YEARS.slice(0, 8);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <span>🗓️</span> استكشف جميع أعوام اليوم الوطني
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        من 2025 إلى 2050 مع عدادات تنازلية لكل عام
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {preview.map((year) => {
          const data = NATIONAL_DAY_DATA[year];
          if (!data) return null;
          const isPast = data.status === "past";
          const days = getDaysUntil(data.date);

          return (
            <Link
              key={year}
              href={lp(locale, `/countdowns/national-day/${year}`)}
              className={`block bg-white dark:bg-dark-surface rounded-xl border p-3.5 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                isPast ? "border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100" : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-lg">🇸🇦</span>
                <span className="text-base font-bold text-gray-800 dark:text-white">{toAr(year)}</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">اليوم الوطني {toAr(data.nationalDayNumber)}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{formatDateAr(data.date).split(" ").slice(0, 2).join(" ")}</p>
              {!isPast && days > 0 ? (
                <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-1.5">
                  {toAr(days)} يوم متبقياً
                </p>
              ) : isPast ? (
                <p className="text-[11px] text-gray-400 mt-1.5">انتهى</p>
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className="mt-5 text-center">
        <Link
          href={lp(locale, "/countdowns/national-day/years")}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-700 text-white rounded-xl font-bold text-sm hover:bg-green-800 transition-all shadow-lg"
        >
          عرض جميع السنوات حتى 2050 &larr;
        </Link>
      </div>
    </section>
  );
}
