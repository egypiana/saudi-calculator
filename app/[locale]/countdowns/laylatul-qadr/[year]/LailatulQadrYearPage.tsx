"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ShareButtons from "@/components/shared/ShareButtons";
import AdSlot from "@/components/ads/AdSlot";
import { LAILATUL_QADR_DATA, LAILATUL_QADR_YEARS, formatDateAr, getTimeUntilLailatulQadr, type LailatulQadrYearData } from "@/lib/data/lailatulQadrData";
import LailatulQadrSidebar from "../components/LailatulQadrSidebar";
import { lp } from "@/lib/utils/locale";

function toArabicDigits(num: number): string {
  return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

interface Props {
  year: number;
  locale: string;
}

export default function LailatulQadrYearPage({ year, locale }: Props) {
  const data = LAILATUL_QADR_DATA[year];
  if (!data) return null;

  const yearIndex = LAILATUL_QADR_YEARS.indexOf(year);
  const prevYear = yearIndex > 0 ? LAILATUL_QADR_YEARS[yearIndex - 1] : null;
  const nextYear = yearIndex < LAILATUL_QADR_YEARS.length - 1 ? LAILATUL_QADR_YEARS[yearIndex + 1] : null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero */}
      <YearHero data={data} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "ليلة القدر", labelEn: "Laylatul Qadr", href: "/countdowns/laylatul-qadr" },
          { labelAr: "جميع السنوات", labelEn: "All Years", href: "/countdowns/laylatul-qadr/years" },
          { labelAr: `ليلة القدر ${year}`, labelEn: `Laylatul Qadr ${year}` },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <ShareButtons title={`كم باقي على ليلة القدر ${year}؟`} />

            <AdSlot id={`lailatul-qadr-${year}-top`} size="leaderboard" />

            {/* Odd Nights Table */}
            <OddNightsTable data={data} />

            {/* Main Content */}
            <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                ليلة القدر {toArabicDigits(year)}
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {data.content.mainContent}
              </div>
            </section>

            {/* Worship Tip */}
            <div className="bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800/30 rounded-2xl p-5">
              <div className="flex gap-3">
                <span className="text-2xl">🤲</span>
                <div>
                  <h3 className="font-bold text-violet-800 dark:text-violet-300 mb-1">نصيحة للعبادة</h3>
                  <p className="text-sm text-violet-700 dark:text-violet-300/80">{data.content.worshipTip}</p>
                </div>
              </div>
            </div>

            {/* Unique Fact */}
            <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/30 rounded-2xl p-5">
              <div className="flex gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-1">هل تعلم؟</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300/80">{data.content.uniqueFact}</p>
                </div>
              </div>
            </div>

            <AdSlot id={`lailatul-qadr-${year}-mid`} size="rectangle" />

            {/* FAQ */}
            <YearFAQ data={data} year={year} />

            {/* Year Navigation */}
            <div className="flex items-center justify-between gap-4">
              {prevYear ? (
                <Link
                  href={lp(locale, `/countdowns/laylatul-qadr/${prevYear}`)}
                  className="flex-1 flex items-center gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg">→</span>
                  <div>
                    <div className="text-xs text-gray-400">السابق</div>
                    <div className="font-bold text-gray-800 dark:text-white">ليلة القدر {toArabicDigits(prevYear)}</div>
                  </div>
                </Link>
              ) : <div className="flex-1" />}

              <Link
                href={lp(locale, "/countdowns/laylatul-qadr/years")}
                className="px-4 py-3 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors text-center"
              >
                جميع السنوات
              </Link>

              {nextYear ? (
                <Link
                  href={lp(locale, `/countdowns/laylatul-qadr/${nextYear}`)}
                  className="flex-1 flex items-center justify-end gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="text-left">
                    <div className="text-xs text-gray-400">التالي</div>
                    <div className="font-bold text-gray-800 dark:text-white">ليلة القدر {toArabicDigits(nextYear)}</div>
                  </div>
                  <span className="text-lg">←</span>
                </Link>
              ) : <div className="flex-1" />}
            </div>

            {/* Links back */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={lp(locale, "/countdowns/laylatul-qadr")}
                className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
              >
                ← العودة لعداد ليلة القدر
              </Link>
              <Link
                href={lp(locale, "/countdowns/laylatul-qadr/years")}
                className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
              >
                ← جميع مواعيد ليلة القدر
              </Link>
            </div>

            <AdSlot id={`lailatul-qadr-${year}-bottom`} size="leaderboard" />
          </div>

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <LailatulQadrSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─── Hero Component ─── */
function YearHero({ data }: { data: LailatulQadrYearData }) {
  const [time, setTime] = useState(getTimeUntilLailatulQadr(data.year));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilLailatulQadr(data.year));
    }, 1000);
    return () => clearInterval(interval);
  }, [data.year]);

  const isPast = data.status === "past";

  return (
    <div className={`relative overflow-hidden ${
      isPast
        ? "bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900"
        : "bg-gradient-to-bl from-violet-900 via-purple-950 to-indigo-950"
    }`}>
      {/* Stars */}
      {!isPast && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                width: `${2 + Math.random() * 2}px`,
                height: `${2 + Math.random() * 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                ["--delay" as string]: `${Math.random() * 3}s`,
                ["--duration" as string]: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center" dir="rtl">
        {/* Year title */}
        <div className="mb-2">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-sm text-violet-200">
            {data.content.heroSubtitle}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
          {isPast ? "ليلة القدر" : "✨ العد التنازلي لليلة القدر"} {toArabicDigits(data.year)}
        </h1>
        <p className="text-violet-200/80 text-sm sm:text-base mb-6">
          {toArabicDigits(data.hijriYear)} هـ &middot; ليلة ٢٧ رمضان &middot; {formatDateAr(data.night27Date)}
        </p>

        {/* Countdown or Status */}
        {isPast ? (
          <div className="countdown-glass inline-block px-8 py-4">
            <p className="text-white/80 text-lg">انتهت ليلة القدر {toArabicDigits(data.year)}</p>
            <p className="text-white/50 text-sm mt-1">ليلة خير من ألف شهر</p>
          </div>
        ) : (
          <div className="flex justify-center gap-3 sm:gap-4">
            {[
              { value: time.days, label: "يوم" },
              { value: time.hours, label: "ساعة" },
              { value: time.minutes, label: "دقيقة" },
              { value: time.seconds, label: "ثانية" },
            ].map((unit) => (
              <div key={unit.label} className="countdown-glass px-3 sm:px-5 py-3 sm:py-4 min-w-[60px] sm:min-w-[80px]">
                <div className="countdown-digit text-2xl sm:text-4xl">
                  {toArabicDigits(unit.value)}
                </div>
                <div className="text-white/50 text-[10px] sm:text-xs mt-1">{unit.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Odd Nights Table ─── */
function OddNightsTable({ data }: { data: LailatulQadrYearData }) {
  const nights = [
    { night: 21, date: data.night21Date, day: data.night21DayOfWeek },
    { night: 23, date: data.night23Date, day: data.night23DayOfWeek },
    { night: 25, date: data.night25Date, day: data.night25DayOfWeek },
    { night: 27, date: data.night27Date, day: data.night27DayOfWeek },
    { night: 29, date: data.night29Date, day: data.night29DayOfWeek },
  ];

  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        الليالي الوترية — العشر الأواخر {toArabicDigits(data.year)}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        ليلة القدر في إحدى هذه الليالي الخمس، وأرجحها ليلة ٢٧
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">الليلة</th>
              <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">التاريخ الميلادي</th>
              <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">اليوم</th>
            </tr>
          </thead>
          <tbody>
            {nights.map((n) => (
              <tr
                key={n.night}
                className={`border-b border-gray-100 dark:border-gray-800 ${
                  n.night === 27
                    ? "bg-violet-50 dark:bg-violet-900/20 font-bold"
                    : ""
                }`}
              >
                <td className="py-3 px-4 text-gray-800 dark:text-white">
                  ليلة {toArabicDigits(n.night)} رمضان
                  {n.night === 27 && (
                    <span className="mr-2 text-xs bg-violet-100 dark:bg-violet-800/30 text-violet-600 dark:text-violet-300 px-2 py-0.5 rounded-full">
                      الأرجح
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{formatDateAr(n.date)}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{n.day}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─── Year FAQ ─── */
function YearFAQ({ data, year }: { data: LailatulQadrYearData; year: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const baseFAQ = [
    {
      q: `متى ليلة القدر ${toArabicDigits(year)}؟`,
      a: `ليلة القدر ${toArabicDigits(year)} (${toArabicDigits(data.hijriYear)} هـ) في إحدى الليالي الوترية من العشر الأواخر من رمضان. أرجح الأقوال ليلة ٢٧ رمضان الموافق ${formatDateAr(data.night27Date)}.`,
    },
    {
      q: `ما فضل ليلة القدر؟`,
      a: `ليلة القدر خير من ألف شهر (أي ما يزيد عن 83 سنة). العمل الصالح فيها أفضل من العمل في ألف شهر ليس فيها ليلة القدر.`,
    },
    {
      q: `ما هو دعاء ليلة القدر؟`,
      a: `الدعاء المأثور: اللهم إنك عفو تحب العفو فاعفُ عني. رواه الترمذي عن عائشة رضي الله عنها.`,
    },
    {
      q: `كيف أعرف ليلة القدر؟`,
      a: `من علاماتها: ليلة هادئة معتدلة لا حارة ولا باردة، والشمس تطلع صبيحتها بيضاء لا شعاع لها.`,
    },
  ];

  const allFAQ = [...baseFAQ, ...data.content.faqExtra];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFAQ.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        أسئلة شائعة عن ليلة القدر {toArabicDigits(year)}
      </h2>
      <div className="space-y-2">
        {allFAQ.map((faq, i) => (
          <div
            key={i}
            className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-right hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <span className="font-medium text-gray-800 dark:text-white text-sm">{faq.q}</span>
              <span className={`text-gray-400 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
