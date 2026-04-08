import Link from "next/link";
import { RAMADAN_DATES, formatArabicDate } from "@/lib/data/ramadanDates";

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T00:00:00").getTime();
  const now = new Date().getTime();
  return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
}

export default function AllRamadanYears() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const displayYears = RAMADAN_DATES.slice(0, 12);

  return (
    <section dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        جميع مواعيد رمضان
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayYears.map((ramadan) => {
          const yearDiff = ramadan.year - currentYear;
          const isClose = yearDiff >= 0 && yearDiff <= 2;
          const isPast = new Date(ramadan.endDate) < now;
          const daysUntil = getDaysUntil(ramadan.startDate);

          return (
            <Link
              key={ramadan.year}
              href={`/ar/countdowns/ramadan/${ramadan.year}`}
              className={`block bg-white dark:bg-dark-surface rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${
                isClose && !isPast
                  ? "border-green-200 dark:border-green-800/40 bg-green-50/30 dark:bg-green-900/10"
                  : "border-gray-200 dark:border-gray-700"
              } ${isPast ? "opacity-60 hover:opacity-100" : ""}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                  {ramadan.year}
                </span>
                {isClose && !isPast && (
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {ramadan.hijri}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                {formatArabicDate(ramadan.startDate)}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                {ramadan.days} يوم &middot; {ramadan.dayOfWeek}
              </p>
              {!isPast && daysUntil > 0 && (
                <p className="text-xs font-medium text-primary-600 dark:text-primary-400">
                  باقي {daysUntil} يوم
                </p>
              )}
              {isPast && (
                <p className="text-xs text-gray-400 dark:text-gray-500">انتهى</p>
              )}
            </Link>
          );
        })}
      </div>

      {/* Show All Button */}
      <div className="mt-6 text-center">
        <Link
          href="/ar/countdowns/ramadan/years"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-primary-600 dark:text-primary-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          عرض جميع السنوات حتى 2050 &larr;
        </Link>
      </div>
    </section>
  );
}
