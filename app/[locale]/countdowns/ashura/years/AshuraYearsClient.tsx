"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ASHURA_LIST, formatDateAr, type AshuraYearData } from "@/lib/data/ashuraData";
import { lp } from "@/lib/utils/locale";

type FilterTab = "all" | "past" | "upcoming" | "future";

function toArabicDigits(num: number): string {
  return num.toString().replace(/\d/g, (d) => "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669"[parseInt(d)]);
}

const SEASON_ICONS: Record<string, string> = {
  "\u0634\u062A\u0627\u0621": "\u2744\uFE0F",
  "\u0631\u0628\u064A\u0639": "\uD83C\uDF38",
  "\u0635\u064A\u0641": "\u2600\uFE0F",
  "\u062E\u0631\u064A\u0641": "\uD83C\uDF42",
};

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  past: { label: "\u0627\u0646\u062A\u0647\u062A", color: "text-gray-500", bg: "bg-gray-100 dark:bg-gray-800" },
  current: { label: "\u0627\u0644\u064A\u0648\u0645", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
  upcoming: { label: "\u0642\u0631\u064A\u0628\u0627\u064B", color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  future: { label: "\u0645\u0633\u062A\u0642\u0628\u0644\u064A", color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-900/20" },
};

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "\u0627\u0644\u0643\u0644" },
  { key: "upcoming", label: "\u0627\u0644\u0642\u0627\u062F\u0645\u0629" },
  { key: "past", label: "\u0627\u0644\u0645\u0627\u0636\u064A\u0629" },
  { key: "future", label: "\u0627\u0644\u0645\u0633\u062A\u0642\u0628\u0644\u064A\u0629" },
];

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T00:00:00").getTime();
  const now = new Date().getTime();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

export default function AshuraYearsClient({ locale }: { locale: string }) {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [, setTick] = useState(0);

  // Update mini-countdowns every 60s
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const allYears = ASHURA_LIST;

  const filtered = allYears.filter((d) => {
    if (filter === "all") return true;
    if (filter === "upcoming") return d.status === "upcoming" || d.status === "current";
    return d.status === filter;
  });

  // Stats
  const totalYears = allYears.length;
  const pastCount = allYears.filter((d) => d.status === "past").length;
  const futureCount = allYears.filter((d) => d.status === "future" || d.status === "upcoming" || d.status === "current").length;
  const nextAshura = allYears.find((d) => d.status === "upcoming" || d.status === "current");

  return (
    <div dir="rtl">
      {/* Hero Stats */}
      <div className="bg-gradient-to-bl from-emerald-600 via-teal-700 to-teal-800 rounded-2xl p-6 sm:p-8 mb-8 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          مواعيد يوم عاشوراء من 2025 إلى 2050
        </h2>
        <p className="text-emerald-100 mb-6 text-sm sm:text-base">
          {toArabicDigits(totalYears)} عاماً من مواعيد يوم عاشوراء الدقيقة مع تواريخ تاسوعاء والحادي عشر من محرم
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold">{toArabicDigits(totalYears)}</div>
            <div className="text-emerald-100 text-xs sm:text-sm mt-1">إجمالي السنوات</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold">{toArabicDigits(pastCount)}</div>
            <div className="text-emerald-100 text-xs sm:text-sm mt-1">سنوات ماضية</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-bold">{toArabicDigits(futureCount)}</div>
            <div className="text-emerald-100 text-xs sm:text-sm mt-1">سنوات قادمة</div>
          </div>
        </div>
        {nextAshura && (
          <div className="mt-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
            <span className="text-emerald-100 text-sm">أقرب يوم عاشوراء: </span>
            <span className="font-bold text-lg">١٠ محرم {toArabicDigits(nextAshura.year)}</span>
            <span className="text-emerald-100 text-sm mx-2">—</span>
            <span className="text-sm">
              باقي {toArabicDigits(Math.max(0, getDaysUntil(nextAshura.ashuraDate)))} يوم
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
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            {tab.label}
            <span className="mr-1.5 text-xs opacity-70">
              ({toArabicDigits(
                tab.key === "all" ? totalYears :
                tab.key === "upcoming" ? allYears.filter((d) => d.status === "upcoming" || d.status === "current").length :
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
      <div className="mt-12 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-4">
          🕌 حقائق عن يوم عاشوراء
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-emerald-700 dark:text-emerald-300/80">
          <div className="flex gap-2">
            <span>📿</span>
            <p>صيام عاشوراء يكفّر ذنوب سنة ماضية كما في صحيح مسلم</p>
          </div>
          <div className="flex gap-2">
            <span>🌊</span>
            <p>هو اليوم الذي نجّى الله فيه موسى عليه السلام من فرعون</p>
          </div>
          <div className="flex gap-2">
            <span>🤲</span>
            <p>يُستحب صيام تاسوعاء (٩ محرم) مع عاشوراء لمخالفة أهل الكتاب</p>
          </div>
          <div className="flex gap-2">
            <span>📅</span>
            <p>عاشوراء هو العاشر من محرم — أول شهور السنة الهجرية</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function YearCard({ data, locale }: { data: AshuraYearData; locale: string }) {
  const status = STATUS_LABELS[data.status] || STATUS_LABELS.future;
  const daysUntil = getDaysUntil(data.ashuraDate);
  const isPast = data.status === "past";

  return (
    <Link
      href={lp(locale, `/countdowns/ashura/${data.year}`)}
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
            : "linear-gradient(to left, #047857, #10b981)",
        }}
      />

      <div className="p-4">
        {/* Header: Year + Status */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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
            <span className="text-gray-400">🕌</span>
            <span>عاشوراء: {formatDateAr(data.ashuraDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">📿</span>
            <span>تاسوعاء: {formatDateAr(data.tasua)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">📅</span>
            <span>{data.dayOfWeek}</span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <span>{SEASON_ICONS[data.season]} {data.season}</span>
          </div>
        </div>

        {/* Mini countdown or status */}
        {!isPast && daysUntil > 0 ? (
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg px-3 py-1.5 inline-block">
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
