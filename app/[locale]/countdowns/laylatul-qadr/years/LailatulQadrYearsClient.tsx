"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LAILATUL_QADR_DATA, LAILATUL_QADR_YEARS, formatDateAr, type LailatulQadrYearData } from "@/lib/data/lailatulQadrData";
import { lp } from "@/lib/utils/locale";

type FilterTab = "all" | "past" | "upcoming" | "future";

function toArabicDigits(num: number): string {
  return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

const SEASON_ICONS: Record<string, string> = {
  "شتاء": "❄️",
  "ربيع": "🌸",
  "صيف": "☀️",
  "خريف": "🍂",
};

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  past: { label: "انتهت", color: "text-gray-500", bg: "bg-gray-100 dark:bg-gray-800" },
  upcoming: { label: "قريباً", color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
  future: { label: "مستقبلي", color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-900/20" },
};

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "upcoming", label: "القادمة" },
  { key: "past", label: "الماضية" },
  { key: "future", label: "المستقبلية" },
];

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T00:00:00").getTime();
  const now = new Date().getTime();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

export default function LailatulQadrYearsClient({ locale }: { locale: string }) {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [, setTick] = useState(0);

  // Update mini-countdowns every 60s
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const allYears = LAILATUL_QADR_YEARS.map((y) => LAILATUL_QADR_DATA[y]);

  const filtered = allYears.filter((d) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return d.status === "upcoming";
    return d.status === filter;
  });

  // Stats
  const totalYears = allYears.length;
  const pastCount = allYears.filter((d) => d.status === "past").length;
  const futureCount = allYears.filter((d) => d.status === "future" || d.status === "upcoming").length;
  const nextLailatulQadr = allYears.find((d) => d.status === "upcoming");

  return (
    <div dir="rtl">
      {/* Hero Stats */}
      <div className="bg-gradient-to-bl from-violet-900 via-purple-800 to-indigo-900 rounded-2xl p-6 sm:p-8 mb-8 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          مواعيد ليلة القدر من 2025 إلى 2050
        </h2>
        <p className="text-violet-200 mb-6 text-sm sm:text-base">
          {toArabicDigits(totalYears)} عاماً من مواعيد ليلة القدر الدقيقة مع تواريخ الليالي الوترية
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold">{toArabicDigits(totalYears)}</div>
            <div className="text-violet-200 text-xs sm:text-sm mt-1">إجمالي السنوات</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold">{toArabicDigits(pastCount)}</div>
            <div className="text-violet-200 text-xs sm:text-sm mt-1">سنوات ماضية</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold">{toArabicDigits(futureCount)}</div>
            <div className="text-violet-200 text-xs sm:text-sm mt-1">سنوات قادمة</div>
          </div>
        </div>
        {nextLailatulQadr && (
          <div className="mt-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
            <span className="text-violet-200 text-sm">أقرب ليلة قدر: </span>
            <span className="font-bold text-lg">ليلة ٢٧ رمضان {toArabicDigits(nextLailatulQadr.year)}</span>
            <span className="text-violet-200 text-sm mx-2">—</span>
            <span className="text-sm">
              باقي {toArabicDigits(Math.max(0, getDaysUntil(nextLailatulQadr.night27Date)))} يوم
            </span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-none pb-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === tab.key
                ? "bg-violet-600 text-white shadow-md"
                : "bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            {tab.label}
            <span className="mr-1.5 text-xs opacity-70">
              ({toArabicDigits(
                tab.key === "all" ? totalYears :
                tab.key === "upcoming" ? allYears.filter((d) => d.status === "upcoming").length :
                allYears.filter((d) => d.status === tab.key).length
              )})
            </span>
          </button>
        ))}
      </div>

      {/* Years Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((data) => (
          <YearCard key={data.year} data={data} locale={locale} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          لا توجد نتائج لهذا الفلتر
        </div>
      )}

      {/* Fun Facts */}
      <div className="mt-12 bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-violet-800 dark:text-violet-300 mb-4">
          ✨ حقائق عن ليلة القدر
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-violet-700 dark:text-violet-300/80">
          <div className="flex gap-2">
            <span>📖</span>
            <p>في ليلة القدر أُنزل القرآن الكريم جملة واحدة إلى السماء الدنيا</p>
          </div>
          <div className="flex gap-2">
            <span>🌙</span>
            <p>العبادة فيها خير من عبادة ألف شهر — أي أكثر من 83 سنة</p>
          </div>
          <div className="flex gap-2">
            <span>🤲</span>
            <p>دعاء ليلة القدر: اللهم إنك عفو تحب العفو فاعفُ عني</p>
          </div>
          <div className="flex gap-2">
            <span>🔢</span>
            <p>تُلتمس في الليالي الوترية: 21، 23، 25، 27، 29 من رمضان</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function YearCard({ data, locale }: { data: LailatulQadrYearData; locale: string }) {
  const status = STATUS_LABELS[data.status];
  const daysUntil = getDaysUntil(data.night27Date);
  const isPast = data.status === "past";

  return (
    <Link
      href={lp(locale, `/countdowns/laylatul-qadr/${data.year}`)}
      className={`group block bg-white dark:bg-dark-surface rounded-2xl border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${
        isPast
          ? "border-gray-200 dark:border-gray-700 opacity-75 hover:opacity-100"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {/* Top color bar */}
      <div
        className="h-1.5"
        style={{
          background: isPast
            ? "linear-gradient(to left, #9ca3af, #d1d5db)"
            : "linear-gradient(to left, #7c3aed, #a78bfa)",
        }}
      />

      <div className="p-4">
        {/* Header: Year + Status */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {toArabicDigits(data.year)}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 mr-2">
              {toArabicDigits(data.hijriYear)} هـ
            </span>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${status.color} ${status.bg}`}>
            {status.label}
          </span>
        </div>

        {/* Date info */}
        <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">✨</span>
            <span>ليلة ٢٧: {formatDateAr(data.night27Date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">📅</span>
            <span>{data.night27DayOfWeek}</span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span>{SEASON_ICONS[data.season]} {data.season}</span>
          </div>
        </div>

        {/* Mini countdown or status */}
        {!isPast && daysUntil > 0 ? (
          <div className="text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 rounded-lg px-3 py-1.5 inline-block">
            باقي {toArabicDigits(daysUntil)} يوم
          </div>
        ) : (
          <div className="text-xs text-gray-400 dark:text-gray-500">
            عرض التفاصيل &larr;
          </div>
        )}
      </div>
    </Link>
  );
}
