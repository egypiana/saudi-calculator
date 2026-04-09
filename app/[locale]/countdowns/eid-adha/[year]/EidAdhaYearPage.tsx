"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ShareButtons from "@/components/shared/ShareButtons";
import AdSlot from "@/components/ads/AdSlot";
import EidAdhaSidebar from "../components/EidAdhaSidebar";
import { EID_ADHA_DATA, EID_ADHA_YEARS, formatDateAr, getTimeUntilEidAdha, type EidAdhaYearData } from "@/lib/data/eidAdhaData";
import { lp } from "@/lib/utils/locale";

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

interface Props {
  year: number;
  locale: string;
}

export default function EidAdhaYearPage({ year, locale }: Props) {
  const data = EID_ADHA_DATA[year];
  if (!data) return null;

  const yearIndex = EID_ADHA_YEARS.indexOf(year);
  const prevYear = yearIndex > 0 ? EID_ADHA_YEARS[yearIndex - 1] : null;
  const nextYear = yearIndex < EID_ADHA_YEARS.length - 1 ? EID_ADHA_YEARS[yearIndex + 1] : null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <YearHero data={data} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "عيد الأضحى", labelEn: "Eid Al-Adha", href: "/countdowns/eid-adha" },
          { labelAr: "جميع السنوات", labelEn: "All Years", href: "/countdowns/eid-adha/years" },
          { labelAr: `عيد الأضحى ${year}`, labelEn: `Eid Al-Adha ${year}` },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-8">
            <ShareButtons title={`كم باقي على عيد الأضحى ${year}؟`} />

            <AdSlot id={`eid-adha-${year}-top`} size="leaderboard" />

            {/* Year Info */}
            <YearInfoBlock data={data} />

            {/* Main Content */}
            <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                معلومات عيد الأضحى {toAr(year)}
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {data.content.mainContent}
              </div>
            </section>

            {/* Unique Fact */}
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-5">
              <div className="flex gap-3">
                <span className="text-2xl">🐑</span>
                <div>
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-1">هل تعلم؟</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300/80">{data.content.uniqueFact}</p>
                </div>
              </div>
            </div>

            {/* Preparations */}
            {data.content.preparations.length > 0 && (
              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-2xl p-5">
                <h3 className="font-bold text-orange-800 dark:text-orange-300 mb-3 flex items-center gap-2">
                  <span>🎯</span> نصائح الاستعداد لعيد الأضحى {toAr(year)}
                </h3>
                <ul className="space-y-2">
                  {data.content.preparations.map((prep, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-orange-700 dark:text-orange-300/80">
                      <span className="text-orange-500 mt-0.5">•</span>
                      <span>{prep}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <AdSlot id={`eid-adha-${year}-mid`} size="rectangle" />

            {/* FAQ */}
            <YearFAQ data={data} year={year} />

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              {prevYear ? (
                <Link
                  href={lp(locale, `/countdowns/eid-adha/${prevYear}`)}
                  className="flex-1 flex items-center gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg">→</span>
                  <div>
                    <div className="text-xs text-gray-400">السابق</div>
                    <div className="font-bold text-gray-800 dark:text-white">عيد الأضحى {toAr(prevYear)}</div>
                  </div>
                </Link>
              ) : <div className="flex-1" />}

              <Link
                href={lp(locale, "/countdowns/eid-adha/years")}
                className="px-4 py-3 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700 transition-colors text-center"
              >
                جميع السنوات
              </Link>

              {nextYear ? (
                <Link
                  href={lp(locale, `/countdowns/eid-adha/${nextYear}`)}
                  className="flex-1 flex items-center justify-end gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="text-left">
                    <div className="text-xs text-gray-400">التالي</div>
                    <div className="font-bold text-gray-800 dark:text-white">عيد الأضحى {toAr(nextYear)}</div>
                  </div>
                  <span className="text-lg">←</span>
                </Link>
              ) : <div className="flex-1" />}
            </div>

            <AdSlot id={`eid-adha-${year}-bottom`} size="leaderboard" />
          </div>

          <div className="hidden lg:block">
            <EidAdhaSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─── Hero ─── */
function YearHero({ data }: { data: EidAdhaYearData }) {
  const [time, setTime] = useState(getTimeUntilEidAdha(data.year));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeUntilEidAdha(data.year)), 1000);
    return () => clearInterval(interval);
  }, [data.year]);

  const isPast = data.status === "past";
  const isCurrent = data.status === "current";

  return (
    <div className={`relative overflow-hidden ${
      isPast
        ? "bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-[#1a0f00] via-[#2a1500] to-[#1a0a00]"
    }`}>
      {!isPast && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                width: `${1.5 + Math.random() * 2.5}px`,
                height: `${1.5 + Math.random() * 2.5}px`,
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
        <div className="mb-2">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-sm text-amber-200">
            {data.content.heroSubtitle}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
          {isPast ? "عيد الأضحى" : isCurrent ? "🐑 عيد الأضحى" : "العد التنازلي لعيد الأضحى"} {toAr(data.year)}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base mb-6">
          {data.hijriMonth} {toAr(data.hijriYear)} هـ &middot; {data.dayOfWeek} &middot; {formatDateAr(data.date)}
        </p>

        {isPast ? (
          <div className="countdown-glass inline-block px-8 py-4">
            <p className="text-white/80 text-lg">انتهى عيد الأضحى {toAr(data.year)}</p>
            <p className="text-white/50 text-sm mt-1">يوم عرفة: {formatDateAr(data.arafaDay)}</p>
          </div>
        ) : isCurrent ? (
          <div className="countdown-glass inline-block px-8 py-4">
            <p className="text-amber-300 text-xl font-bold">🐑 عيد مبارك!</p>
            <p className="text-white/60 text-sm mt-1">كل عام وأنتم بخير</p>
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
                <div className="text-2xl sm:text-4xl font-bold text-white tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-white/50 text-[10px] sm:text-xs mt-1">{unit.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-l from-transparent via-amber-500 to-transparent" />
    </div>
  );
}

/* ─── Year Info ─── */
function YearInfoBlock({ data }: { data: EidAdhaYearData }) {
  const SEASON_ICONS: Record<string, string> = { "شتاء": "❄️", "ربيع": "🌸", "صيف": "☀️", "خريف": "🍂" };

  const items = [
    { icon: "🐑", label: "تاريخ عيد الأضحى", value: `${formatDateAr(data.date)} — ${data.dayOfWeek}` },
    { icon: "🕋", label: "بداية موسم الحج", value: formatDateAr(data.hajjStart) },
    { icon: "🤲", label: "يوم عرفة", value: formatDateAr(data.arafaDay) },
    { icon: SEASON_ICONS[data.season] || "🌤️", label: "الفصل", value: data.season },
    { icon: "🗓️", label: "السنة الهجرية", value: `${toAr(data.hijriYear)} هـ` },
    { icon: "📿", label: "المناسبة", value: `${data.hijriMonth} ${toAr(data.hijriYear)} هـ` },
  ];

  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        بيانات عيد الأضحى {toAr(data.year)}
      </h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3">
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
function YearFAQ({ data, year }: { data: EidAdhaYearData; year: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const baseFAQ = [
    { q: `متى عيد الأضحى ${toAr(year)}؟`, a: `عيد الأضحى ${toAr(year)} يوم ${data.dayOfWeek} ${formatDateAr(data.date)}، الموافق ${data.hijriMonth} ${toAr(data.hijriYear)} هـ.` },
    { q: `متى يوم عرفة ${toAr(year)}؟`, a: `يوم عرفة ${toAr(year)} يوافق ${formatDateAr(data.arafaDay)}.` },
    { q: `في أي فصل عيد الأضحى ${toAr(year)}؟`, a: `عيد الأضحى ${toAr(year)} في فصل ${data.season}.` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        أسئلة شائعة عن عيد الأضحى {toAr(year)}
      </h2>
      <div className="space-y-2">
        {allFAQ.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-right hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <span className="font-medium text-gray-800 dark:text-white text-sm">{faq.q}</span>
              <span className={`text-gray-400 transition-transform duration-200 flex-shrink-0 mr-3 ${openIndex === i ? "rotate-180" : ""}`}>▼</span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
