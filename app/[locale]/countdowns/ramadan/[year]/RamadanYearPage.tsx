"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ShareButtons from "@/components/shared/ShareButtons";
import AdSlot from "@/components/ads/AdSlot";
import { RAMADAN_DATA, AVAILABLE_YEARS, formatDateAr, getTimeUntilRamadan, type RamadanYearData } from "@/lib/data/ramadanData";

function toArabicDigits(num: number): string {
  return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

interface Props {
  year: number;
  locale: string;
}

export default function RamadanYearPage({ year, locale }: Props) {
  const data = RAMADAN_DATA[year];
  if (!data) return null;

  const yearIndex = AVAILABLE_YEARS.indexOf(year);
  const prevYear = yearIndex > 0 ? AVAILABLE_YEARS[yearIndex - 1] : null;
  const nextYear = yearIndex < AVAILABLE_YEARS.length - 1 ? AVAILABLE_YEARS[yearIndex + 1] : null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero */}
      <YearHero data={data} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "رمضان", labelEn: "Ramadan", href: "/countdowns/ramadan" },
          { labelAr: "جميع السنوات", labelEn: "All Years", href: "/countdowns/ramadan/years" },
          { labelAr: `رمضان ${year}`, labelEn: `Ramadan ${year}` },
        ]} />

        <div className="mt-6 space-y-8">
          <ShareButtons title={`كم باقي على رمضان ${year}؟`} />

          <AdSlot id={`ramadan-${year}-top`} size="leaderboard" />

          {/* Year Info Block */}
          <YearInfoBlock data={data} />

          {/* Main Content */}
          <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              معلومات رمضان {toArabicDigits(year)}
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {data.content.mainContent}
            </div>
          </section>

          {/* Unique Fact */}
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-5">
            <div className="flex gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-1">هل تعلم؟</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300/80">{data.content.uniqueFact}</p>
              </div>
            </div>
          </div>

          {/* Preparation Tip */}
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-2xl p-5">
            <div className="flex gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-1">نصيحة للاستعداد</h3>
                <p className="text-sm text-green-700 dark:text-green-300/80">{data.content.preparationTip}</p>
              </div>
            </div>
          </div>

          {/* Eid Message */}
          <div className="bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-800/30 rounded-2xl p-5 text-center">
            <span className="text-3xl mb-2 block">🎉</span>
            <p className="font-bold text-primary-800 dark:text-primary-300">{data.content.eidMessage}</p>
          </div>

          <AdSlot id={`ramadan-${year}-mid`} size="rectangle" />

          {/* FAQ */}
          <YearFAQ data={data} year={year} />

          {/* Year Navigation */}
          <div className="flex items-center justify-between gap-4">
            {prevYear ? (
              <Link
                href={`/${locale}/countdowns/ramadan/${prevYear}`}
                className="flex-1 flex items-center gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="text-lg">→</span>
                <div>
                  <div className="text-xs text-gray-400">السابق</div>
                  <div className="font-bold text-gray-800 dark:text-white">رمضان {toArabicDigits(prevYear)}</div>
                </div>
              </Link>
            ) : <div className="flex-1" />}

            <Link
              href={`/${locale}/countdowns/ramadan/years`}
              className="px-4 py-3 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors text-center"
            >
              جميع السنوات
            </Link>

            {nextYear ? (
              <Link
                href={`/${locale}/countdowns/ramadan/${nextYear}`}
                className="flex-1 flex items-center justify-end gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="text-left">
                  <div className="text-xs text-gray-400">التالي</div>
                  <div className="font-bold text-gray-800 dark:text-white">رمضان {toArabicDigits(nextYear)}</div>
                </div>
                <span className="text-lg">←</span>
              </Link>
            ) : <div className="flex-1" />}
          </div>

          <AdSlot id={`ramadan-${year}-bottom`} size="leaderboard" />
        </div>
      </div>
    </main>
  );
}

/* ─── Hero Component ─── */
function YearHero({ data }: { data: RamadanYearData }) {
  const [time, setTime] = useState(getTimeUntilRamadan(data.year));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilRamadan(data.year));
    }, 1000);
    return () => clearInterval(interval);
  }, [data.year]);

  const isPast = data.status === "past";
  const isCurrent = data.status === "current";

  return (
    <div className={`relative overflow-hidden ${
      isPast
        ? "bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900"
        : isCurrent
          ? "bg-gradient-to-bl from-green-800 via-emerald-900 to-green-950"
          : "bg-gradient-to-bl from-green-900 via-[#0f2b1a] to-[#0a1f12]"
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
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-sm text-green-200">
            {data.content.heroSubtitle}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
          {isPast ? "رمضان" : isCurrent ? "🌙 رمضان" : "العد التنازلي لرمضان"} {toArabicDigits(data.year)}
        </h1>
        <p className="text-green-200/80 text-sm sm:text-base mb-6">
          {toArabicDigits(data.hijriYear)} هـ &middot; {data.startDayOfWeek} &middot; {formatDateAr(data.startDate)}
        </p>

        {/* Countdown or Status */}
        {isPast ? (
          <div className="countdown-glass inline-block px-8 py-4">
            <p className="text-white/80 text-lg">انتهى رمضان {toArabicDigits(data.year)}</p>
            <p className="text-white/50 text-sm mt-1">استمر {toArabicDigits(data.days)} يوماً</p>
          </div>
        ) : isCurrent ? (
          <div className="countdown-glass inline-block px-8 py-4">
            <p className="text-green-300 text-xl font-bold">🌙 رمضان مبارك!</p>
            <p className="text-white/60 text-sm mt-1">نسأل الله القبول</p>
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

/* ─── Year Info Block ─── */
function YearInfoBlock({ data }: { data: RamadanYearData }) {
  const SEASON_ICONS: Record<string, string> = {
    "شتاء": "❄️", "ربيع": "🌸", "صيف": "☀️", "خريف": "🍂",
  };

  const items = [
    { icon: "📅", label: "بداية رمضان", value: `${formatDateAr(data.startDate)} — ${data.startDayOfWeek}` },
    { icon: "🏁", label: "نهاية رمضان", value: formatDateAr(data.endDate) },
    { icon: "🎉", label: "عيد الفطر", value: formatDateAr(data.eidFitrDate) },
    { icon: "⏳", label: "عدد أيام الصيام", value: `${toArabicDigits(data.days)} يوم` },
    { icon: SEASON_ICONS[data.season] || "🌤️", label: "الفصل", value: data.season },
    { icon: "🕐", label: "ساعات الصيام (الرياض)", value: `~${toArabicDigits(data.fastingHoursRiyadh)} ساعة` },
    { icon: "🗓️", label: "السنة الهجرية", value: `${toArabicDigits(data.hijriYear)} هـ` },
  ];

  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        بيانات رمضان {toArabicDigits(data.year)}
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3"
          >
            <span className="text-xl">{item.icon}</span>
            <div>
              <div className="text-xs text-gray-400 dark:text-gray-500">{item.label}</div>
              <div className="text-sm font-medium text-gray-800 dark:text-white">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Year FAQ ─── */
function YearFAQ({ data, year }: { data: RamadanYearData; year: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const baseFAQ = [
    {
      q: `متى يبدأ رمضان ${toArabicDigits(year)}؟`,
      a: `يبدأ رمضان ${toArabicDigits(year)} (${toArabicDigits(data.hijriYear)} هـ) يوم ${data.startDayOfWeek} الموافق ${formatDateAr(data.startDate)}.`,
    },
    {
      q: `كم يوم رمضان ${toArabicDigits(year)}؟`,
      a: `رمضان ${toArabicDigits(year)} يستمر ${toArabicDigits(data.days)} يوماً.`,
    },
    {
      q: `كم ساعة الصيام في رمضان ${toArabicDigits(year)}؟`,
      a: `ساعات الصيام في الرياض حوالي ${toArabicDigits(data.fastingHoursRiyadh)} ساعة يومياً (فصل ${data.season}).`,
    },
    {
      q: `متى عيد الفطر ${toArabicDigits(year)}؟`,
      a: `عيد الفطر ${toArabicDigits(year)} — ${formatDateAr(data.eidFitrDate)} / 1 شوال ${toArabicDigits(data.hijriYear)} هـ.`,
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
        أسئلة شائعة عن رمضان {toArabicDigits(year)}
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
