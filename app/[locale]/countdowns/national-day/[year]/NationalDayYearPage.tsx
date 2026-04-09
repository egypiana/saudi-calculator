"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ShareButtons from "@/components/shared/ShareButtons";
import AdSlot from "@/components/ads/AdSlot";
import NationalDaySidebar from "../components/NationalDaySidebar";
import { NATIONAL_DAY_DATA, NATIONAL_DAY_YEARS, formatDateAr, getTimeUntilNationalDay, type NationalDayYearData } from "@/lib/data/nationalDayData";
import { lp } from "@/lib/utils/locale";

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

interface Props {
  year: number;
  locale: string;
}

export default function NationalDayYearPage({ year, locale }: Props) {
  const data = NATIONAL_DAY_DATA[year];
  if (!data) return null;

  const yearIndex = NATIONAL_DAY_YEARS.indexOf(year);
  const prevYear = yearIndex > 0 ? NATIONAL_DAY_YEARS[yearIndex - 1] : null;
  const nextYear = yearIndex < NATIONAL_DAY_YEARS.length - 1 ? NATIONAL_DAY_YEARS[yearIndex + 1] : null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <YearHero data={data} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "اليوم الوطني", labelEn: "National Day", href: "/countdowns/national-day" },
          { labelAr: "جميع السنوات", labelEn: "All Years", href: "/countdowns/national-day/years" },
          { labelAr: `اليوم الوطني ${data.nationalDayNumber}`, labelEn: `National Day ${data.nationalDayNumber}` },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-8">
            <ShareButtons title={`كم باقي على اليوم الوطني السعودي ${year}؟`} />

            <AdSlot id={`national-day-${year}-top`} size="leaderboard" />

            {/* Year Info */}
            <YearInfoBlock data={data} />

            {/* Main Content */}
            <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                معلومات اليوم الوطني {toAr(data.nationalDayNumber)} — {toAr(year)}
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {data.content.mainContent}
              </div>
            </section>

            {/* Theme highlight */}
            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-2xl p-5">
              <div className="flex gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-bold text-green-800 dark:text-green-300 mb-1">شعار اليوم الوطني {toAr(data.nationalDayNumber)}</h3>
                  <p className="text-sm text-green-700 dark:text-green-300/80">{data.theme}</p>
                </div>
              </div>
            </div>

            <AdSlot id={`national-day-${year}-mid`} size="rectangle" />

            {/* FAQ */}
            <YearFAQ data={data} year={year} />

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              {prevYear ? (
                <Link
                  href={lp(locale, `/countdowns/national-day/${prevYear}`)}
                  className="flex-1 flex items-center gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg">→</span>
                  <div>
                    <div className="text-xs text-gray-400">السابق</div>
                    <div className="font-bold text-gray-800 dark:text-white">اليوم الوطني {toAr(NATIONAL_DAY_DATA[prevYear]?.nationalDayNumber || prevYear - 1932)}</div>
                  </div>
                </Link>
              ) : <div className="flex-1" />}

              <Link
                href={lp(locale, "/countdowns/national-day/years")}
                className="px-4 py-3 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors text-center"
              >
                جميع السنوات
              </Link>

              {nextYear ? (
                <Link
                  href={lp(locale, `/countdowns/national-day/${nextYear}`)}
                  className="flex-1 flex items-center justify-end gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="text-left">
                    <div className="text-xs text-gray-400">التالي</div>
                    <div className="font-bold text-gray-800 dark:text-white">اليوم الوطني {toAr(NATIONAL_DAY_DATA[nextYear]?.nationalDayNumber || nextYear - 1932)}</div>
                  </div>
                  <span className="text-lg">←</span>
                </Link>
              ) : <div className="flex-1" />}
            </div>

            <AdSlot id={`national-day-${year}-bottom`} size="leaderboard" />
          </div>

          <div className="hidden lg:block">
            <NationalDaySidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* --- Hero --- */
function YearHero({ data }: { data: NationalDayYearData }) {
  const [time, setTime] = useState(getTimeUntilNationalDay(data.year));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeUntilNationalDay(data.year)), 1000);
    return () => clearInterval(interval);
  }, [data.year]);

  const isPast = data.status === "past";
  const isCurrent = data.status === "current";

  return (
    <div className={`relative overflow-hidden ${
      isPast
        ? "bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900"
        : "bg-gradient-to-br from-[#003c1f] via-[#006633] to-[#004d2a]"
    }`}>
      {!isPast && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${1.5 + Math.random() * 2.5}px`,
                height: `${1.5 + Math.random() * 2.5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `pulse ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center" dir="rtl">
        <div className="mb-2">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-sm text-green-200">
            اليوم الوطني {toAr(data.nationalDayNumber)} — {data.theme}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
          {isPast ? "اليوم الوطني" : isCurrent ? "🇸🇦 اليوم الوطني" : "العد التنازلي لليوم الوطني"} {toAr(data.nationalDayNumber)}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base mb-6">
          {data.dayOfWeek} &middot; {formatDateAr(data.date)}
        </p>

        {isPast ? (
          <div className="countdown-glass inline-block px-8 py-4">
            <p className="text-white/80 text-lg">انتهى اليوم الوطني {toAr(data.nationalDayNumber)}</p>
            <p className="text-white/50 text-sm mt-1">عمر المملكة {toAr(data.nationalDayNumber)} عام</p>
          </div>
        ) : isCurrent ? (
          <div className="countdown-glass inline-block px-8 py-4">
            <p className="text-green-300 text-xl font-bold">🇸🇦 كل عام والوطن بخير!</p>
            <p className="text-white/60 text-sm mt-1">اليوم الوطني السعودي {toAr(data.nationalDayNumber)}</p>
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

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-l from-transparent via-green-500 to-transparent" />
    </div>
  );
}

/* --- Year Info --- */
function YearInfoBlock({ data }: { data: NationalDayYearData }) {
  const SEASON_ICONS: Record<string, string> = { "شتاء": "❄️", "ربيع": "🌸", "صيف": "☀️", "خريف": "🍂" };

  const items = [
    { icon: "🇸🇦", label: "اليوم الوطني", value: `اليوم الوطني ${toAr(data.nationalDayNumber)}` },
    { icon: "📅", label: "التاريخ", value: `${formatDateAr(data.date)} — ${data.dayOfWeek}` },
    { icon: "🎯", label: "الشعار", value: data.theme },
    { icon: "🗓️", label: "نهاية أسبوع؟", value: data.isWeekend ? "نعم — إجازة ممتدة" : "لا" },
    { icon: "📊", label: "عمر المملكة", value: `${toAr(data.nationalDayNumber)} عام` },
    { icon: SEASON_ICONS[data.season] || "🏰", label: "الفصل", value: data.season },
  ];

  return (
    <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        بيانات اليوم الوطني {toAr(data.nationalDayNumber)}
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

/* --- Year FAQ --- */
function YearFAQ({ data, year }: { data: NationalDayYearData; year: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: `متى اليوم الوطني السعودي ${toAr(year)}؟`, a: `اليوم الوطني السعودي ${toAr(year)} يوم ${data.dayOfWeek} ${formatDateAr(data.date)}، وهو اليوم الوطني رقم ${toAr(data.nationalDayNumber)}.` },
    { q: `ما هو رقم اليوم الوطني ${toAr(year)}؟`, a: `اليوم الوطني ${toAr(year)} هو اليوم الوطني رقم ${toAr(data.nationalDayNumber)} منذ تأسيس المملكة عام 1932م.` },
    { q: `ما شعار اليوم الوطني ${toAr(data.nationalDayNumber)}؟`, a: `شعار اليوم الوطني ${toAr(data.nationalDayNumber)} هو: "${data.theme}".` },
    { q: `هل يصادف اليوم الوطني ${toAr(year)} نهاية أسبوع؟`, a: data.isWeekend ? `نعم، اليوم الوطني ${toAr(year)} يصادف ${data.dayOfWeek} وهو نهاية أسبوع، مما قد يعني إجازة ممتدة.` : `لا، اليوم الوطني ${toAr(year)} يصادف ${data.dayOfWeek} وهو يوم عمل.` },
    { q: `في أي فصل اليوم الوطني ${toAr(year)}؟`, a: `اليوم الوطني ${toAr(year)} في فصل ${data.season}. اليوم الوطني دائماً في 23 سبتمبر وهو بداية فصل الخريف.` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        أسئلة شائعة عن اليوم الوطني {toAr(data.nationalDayNumber)}
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
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
