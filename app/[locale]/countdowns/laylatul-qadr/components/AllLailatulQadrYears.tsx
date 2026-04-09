"use client";

import Link from "next/link";
import { LAILATUL_QADR_LIST, formatArabicDate } from "@/lib/data/lailatulQadrData";
import { lp } from "@/lib/utils/locale";

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T00:00:00").getTime();
  const now = new Date().getTime();
  return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
}

interface AllLailatulQadrYearsProps {
  locale: string;
}

export default function AllLailatulQadrYears({ locale }: AllLailatulQadrYearsProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const displayYears = LAILATUL_QADR_LIST.slice(0, 12);

  return (
    <section dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        جميع مواعيد ليلة القدر
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayYears.map((entry) => {
          const yearDiff = entry.year - currentYear;
          const isClose = yearDiff >= 0 && yearDiff <= 2;
          const isPast = new Date(entry.night29Date) < now;
          const daysUntil = getDaysUntil(entry.night27Date);

          return (
            <Link
              key={entry.year}
              href={lp(locale, `/countdowns/laylatul-qadr/${entry.year}`)}
              className={`block bg-white dark:bg-dark-surface rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                isClose && !isPast
                  ? "border-violet-200 dark:border-violet-800/40 bg-violet-50/30 dark:bg-violet-900/10"
                  : "border-gray-200 dark:border-gray-700"
              } ${isPast ? "opacity-60 hover:opacity-100" : ""}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                  {entry.year}
                </span>
                {isClose && !isPast && (
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {entry.hijri}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                ليلة 27: {formatArabicDate(entry.night27Date)}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                {entry.season}
              </p>
              {!isPast && daysUntil > 0 && (
                <p className="text-xs font-medium text-violet-600 dark:text-violet-400">
                  باقي {daysUntil} يوم
                </p>
              )}
              {isPast && (
                <p className="text-xs text-gray-400 dark:text-gray-500">انتهت</p>
              )}
            </Link>
          );
        })}
      </div>

      {/* Show All Button */}
      <div className="mt-6 text-center">
        <Link
          href={lp(locale, "/countdowns/laylatul-qadr/years")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-violet-600 dark:text-violet-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          عرض جميع السنوات حتى 2050 &larr;
        </Link>
      </div>
    </section>
  );
}
