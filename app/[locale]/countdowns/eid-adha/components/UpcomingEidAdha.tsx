"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EID_ADHA_DATA, EID_ADHA_YEARS, formatDateAr } from "@/lib/data/eidAdhaData";
import { lp } from "@/lib/utils/locale";

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

function getDaysUntil(dateStr: string): number {
  return Math.max(0, Math.ceil((new Date(dateStr + "T00:00:00").getTime() - Date.now()) / 86400000));
}

export default function UpcomingEidAdha({ locale }: { locale: string }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(i);
  }, []);

  const now = new Date();
  const upcoming = EID_ADHA_YEARS
    .filter((y) => {
      const d = EID_ADHA_DATA[y];
      return d && new Date(d.date) > now;
    })
    .slice(0, 6);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <span>📅</span> متى عيد الأضحى في السنوات القادمة
      </h2>
      <div className="space-y-2">
        {upcoming.map((year, idx) => {
          const data = EID_ADHA_DATA[year];
          if (!data) return null;
          const days = getDaysUntil(data.date);
          const isFriday = data.dayOfWeek === "الجمعة";
          const isNext = idx === 0;

          return (
            <Link
              key={year}
              href={lp(locale, `/countdowns/eid-adha/${year}`)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5 group ${
                isNext
                  ? "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/40"
                  : "bg-white dark:bg-dark-surface border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐑</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      عيد الأضحى {toAr(year)}
                    </span>
                    {isNext && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        قادم قريباً
                      </span>
                    )}
                    {isFriday && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        🌟 يوم الجمعة!
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {data.dayOfWeek} {formatDateAr(data.date)} &middot; {toAr(data.hijriYear)} هـ
                  </div>
                </div>
              </div>
              <div className="text-left flex-shrink-0">
                <div className="text-sm font-bold text-amber-600 dark:text-amber-400">
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
