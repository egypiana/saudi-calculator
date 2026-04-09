"use client";

import Link from "next/link";
import { MAWLID_LIST, formatArabicDate } from "@/lib/data/mawlidData";
import { lp } from "@/lib/utils/locale";

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T00:00:00").getTime();
  const now = new Date().getTime();
  return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
}

interface UpcomingMawlidProps {
  locale: string;
}

export default function UpcomingMawlid({ locale }: UpcomingMawlidProps) {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  const futureDates = MAWLID_LIST.filter((d) => d.mawlidDate >= todayStr).slice(0, 5);

  if (futureDates.length === 0) return null;

  const nearestYear = futureDates[0].year;

  return (
    <section dir="rtl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        مواعيد المولد النبوي القادمة
      </h2>
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-gray-700">
                <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                  السنة الميلادية
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                  السنة الهجرية
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                  تاريخ المولد
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                  اليوم
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                  الموسم
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">
                  التفاصيل
                </th>
              </tr>
            </thead>
            <tbody>
              {futureDates.map((entry) => {
                const isNearest = entry.year === nearestYear;
                const daysUntil = getDaysUntil(entry.mawlidDate);

                return (
                  <tr
                    key={entry.year}
                    className={`border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${
                      isNearest ? "bg-teal-50/50 dark:bg-teal-900/10" : ""
                    }`}
                  >
                    <td className="px-4 py-3.5 text-gray-800 dark:text-white font-medium">
                      <span className="flex items-center gap-2">
                        {entry.year}
                        {isNearest && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                            القادمة
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 dark:text-gray-300">
                      {entry.hijriYear}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 dark:text-gray-300">
                      {formatArabicDate(entry.mawlidDate)}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 dark:text-gray-300">
                      {entry.dayOfWeek}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                        {entry.season}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={lp(locale, `/countdowns/mawlid/${entry.year}`)}
                        className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-xs font-medium transition-colors"
                      >
                        عرض التفاصيل
                        {isNearest && daysUntil > 0 && (
                          <span className="text-xs text-gray-400 dark:text-gray-500 mr-2">
                            (باقي {daysUntil} يوم)
                          </span>
                        )}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
