"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HAJJ_DATA, HAJJ_YEARS, formatDateAr } from "@/lib/data/hajjData";
import { lp } from "@/lib/utils/locale";

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

function getDaysUntil(dateStr: string): number {
  return Math.max(0, Math.ceil((new Date(dateStr + "T00:00:00").getTime() - Date.now()) / 86400000));
}

export default function UpcomingHajj({ locale }: { locale: string }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(i);
  }, []);

  const now = new Date();
  const upcoming = HAJJ_YEARS
    .filter((y) => {
      const d = HAJJ_DATA[y];
      return d && new Date(d.date) > now;
    })
    .slice(0, 6);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <span>📅</span> متى موسم الحج في السنوات القادمة
      </h2>
      <div className="space-y-2">
        {upcoming.map((year, idx) => {
          const data = HAJJ_DATA[year];
          if (!data) return null;
          const days = getDaysUntil(data.date);
          const isArafaFriday = data.arafaDay ? new Date(data.arafaDay + "T00:00:00").getDay() === 5 : false;
          const isNext = idx === 0;

          return (
            <Link
              key={year}
              href={lp(locale, `/countdowns/hajj/${year}`)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5 group ${
                isNext
                  ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/40"
                  : "bg-white dark:bg-dark-surface border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🕋</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      موسم الحج {toAr(year)}
                    </span>
                    {isNext && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        قادم قريباً
                      </span>
                    )}
                    {isArafaFriday && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        🌟 يوم عرفة يوم الجمعة!
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {data.dayOfWeek} {formatDateAr(data.date)} &middot; {toAr(data.hijriYear)} هـ
                  </div>
                </div>
              </div>
              <div className="text-left flex-shrink-0">
                <div className="text-sm font-bold text-primary-600 dark:text-primary-400">
                  {toAr(days)} يوم
                </div>
                <div className="text-[10px] text-gray-400">←</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
