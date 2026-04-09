"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HAJJ_DATA, HAJJ_YEARS, formatDateAr, type HajjYearData } from "@/lib/data/hajjData";
import { lp } from "@/lib/utils/locale";

type FilterTab = "all" | "past" | "upcoming";

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

function getDaysUntil(dateStr: string): number {
  return Math.max(0, Math.ceil((new Date(dateStr + "T00:00:00").getTime() - Date.now()) / 86400000));
}

const STATUS_STYLES: Record<string, { label: string; border: string; bg: string; text: string }> = {
  past: { label: "انتهى", border: "border-gray-200 dark:border-gray-700", bg: "bg-gray-50 dark:bg-gray-800/50", text: "text-gray-500" },
  current: { label: "الآن 🕋", border: "border-emerald-500 ring-2 ring-emerald-300 dark:ring-emerald-800/50", bg: "bg-emerald-50 dark:bg-emerald-900/10", text: "text-emerald-600" },
  upcoming: { label: "قادم قريباً", border: "border-amber-400 dark:border-amber-700", bg: "bg-amber-50 dark:bg-amber-900/10", text: "text-amber-600" },
  future: { label: "مستقبلي", border: "border-gray-200 dark:border-gray-700", bg: "bg-white dark:bg-dark-surface", text: "text-blue-500" },
};

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "upcoming", label: "القادمة" },
  { key: "past", label: "المضت" },
];

export default function HajjYearsClient({ locale }: { locale: string }) {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(i);
  }, []);

  const allData = HAJJ_YEARS.map((y) => HAJJ_DATA[y]).filter(Boolean) as HajjYearData[];

  const filtered = allData.filter((d) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return d.status !== "past";
    return d.status === "past";
  });

  const totalYears = allData.length;
  const pastCount = allData.filter((d) => d.status === "past").length;
  const futureCount = totalYears - pastCount;

  return (
    <div dir="rtl">
      {/* Hero Stats */}
      <div className="bg-gradient-to-bl from-[#0a1a14] via-[#0d2818] to-[#1a0a14] rounded-2xl p-6 sm:p-8 mb-8 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          🕋 جميع مواسم الحج (2025–2050)
        </h2>
        <p className="text-gray-300 mb-5 text-sm sm:text-base">
          اختر أي عام لمعرفة الوقت المتبقي والمعلومات الكاملة
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-300">{toAr(totalYears)}</div>
            <div className="text-gray-300 text-xs sm:text-sm mt-1">إجمالي السنوات</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold">{toAr(pastCount)}</div>
            <div className="text-gray-300 text-xs sm:text-sm mt-1">سنوات مضت</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-300">{toAr(futureCount)}</div>
            <div className="text-gray-300 text-xs sm:text-sm mt-1">سنوات قادمة</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-none pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === tab.key
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((data) => {
          const style = STATUS_STYLES[data.status];
          const days = getDaysUntil(data.date);
          const isPast = data.status === "past";
          const isArafaFriday = data.arafaDay ? new Date(data.arafaDay + "T00:00:00").getDay() === 5 : false;

          return (
            <Link
              key={data.year}
              href={lp(locale, `/countdowns/hajj/${data.year}`)}
              className={`block rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 ${style.border} ${style.bg} ${isPast ? "opacity-75 hover:opacity-100" : ""}`}
            >
              <div className="h-1 bg-gradient-to-l from-emerald-400 to-teal-500" />
              <div className="p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span>🕋</span>
                    <span className="font-bold text-gray-800 dark:text-white">{toAr(data.year)}</span>
                  </div>
                  {isArafaFriday && <span className="text-[9px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded-full font-bold">عرفة الجمعة ⭐</span>}
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{toAr(data.hijriYear)} هـ &middot; {data.dayOfWeek}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{formatDateAr(data.date).split(" ").slice(0, 2).join(" ")}</p>
                {!isPast && days > 0 ? (
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mt-2">{toAr(days)} يوم</p>
                ) : isPast ? (
                  <p className={`text-[11px] mt-2 ${style.text}`}>{style.label}</p>
                ) : (
                  <p className={`text-[11px] mt-2 font-bold ${style.text}`}>{style.label}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Fun Facts */}
      <div className="mt-10 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-4">
          💡 حقائق ممتعة عن الحج
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-emerald-700 dark:text-emerald-300/80">
          <div className="flex gap-2"><span>📅</span><p>كل 33 سنة يعود الحج لنفس الشهر الميلادي تقريباً</p></div>
          <div className="flex gap-2"><span>⛰️</span><p>يوم عرفة أعظم يوم عند الله — صومه يكفّر سنتين</p></div>
          <div className="flex gap-2"><span>🕋</span><p>يزور الحرم المكي أكثر من 2 مليون حاج سنوياً</p></div>
          <div className="flex gap-2"><span>❄️</span><p>الحج في الشتاء (2035-2042) يكون الطقس أبرد وأسهل للحجاج</p></div>
        </div>
      </div>
    </div>
  );
}
