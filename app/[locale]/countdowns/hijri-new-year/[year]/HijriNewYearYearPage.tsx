"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ShareButtons from "@/components/shared/ShareButtons";
import AdSlot from "@/components/ads/AdSlot";
import { HIJRI_NEW_YEAR_DATA, HIJRI_NEW_YEAR_YEARS, formatDateAr, getTimeUntilHijriNewYear, type HijriNewYearData } from "@/lib/data/hijriNewYearData";
import HijriNewYearSidebar from "../components/HijriNewYearSidebar";
import { lp } from "@/lib/utils/locale";

function toArabicDigits(num: number): string {
  return num.toString().replace(/\d/g, (d) => "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669"[parseInt(d)]);
}

interface Props {
  year: number;
  locale: string;
}

export default function HijriNewYearYearPage({ year, locale }: Props) {
  const data = HIJRI_NEW_YEAR_DATA[year];
  if (!data) return null;

  const yearIndex = HIJRI_NEW_YEAR_YEARS.indexOf(year);
  const prevYear = yearIndex > 0 ? HIJRI_NEW_YEAR_YEARS[yearIndex - 1] : null;
  const nextYear = yearIndex < HIJRI_NEW_YEAR_YEARS.length - 1 ? HIJRI_NEW_YEAR_YEARS[yearIndex + 1] : null;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero */}
      <YearHero data={data} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "رأس السنة الهجرية", labelEn: "Hijri New Year", href: "/countdowns/hijri-new-year" },
          { labelAr: "جميع السنوات", labelEn: "All Years", href: "/countdowns/hijri-new-year/years" },
          { labelAr: `رأس السنة الهجرية ${year}`, labelEn: `Hijri New Year ${year}` },
        ]} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-8">
            <ShareButtons title={`كم باقي على رأس السنة الهجرية ${data.hijri}؟`} />

            <AdSlot id={`hijri-new-year-${year}-top`} size="leaderboard" />

            {/* Info Cards */}
            <InfoCards data={data} />

            {/* Main Content */}
            <section className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                رأس السنة الهجرية {toArabicDigits(data.hijriYear)}
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {data.content.mainContent}
              </div>
            </section>

            {/* Worship Tip */}
            <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/30 rounded-2xl p-5">
              <div className="flex gap-3">
                <span className="text-2xl">🤲</span>
                <div>
                  <h3 className="font-bold text-indigo-800 dark:text-indigo-300 mb-1">نصيحة للعبادة</h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300/80">{data.content.worshipTip}</p>
                </div>
              </div>
            </div>

            {/* Unique Fact */}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-2xl p-5">
              <div className="flex gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-1">هل تعلم؟</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300/80">{data.content.uniqueFact}</p>
                </div>
              </div>
            </div>

            <AdSlot id={`hijri-new-year-${year}-mid`} size="rectangle" />

            {/* FAQ */}
            <YearFAQ data={data} />

            {/* Year Navigation */}
            <div className="flex items-center justify-between gap-4">
              {prevYear ? (
                <Link
                  href={lp(locale, `/countdowns/hijri-new-year/${prevYear}`)}
                  className="flex-1 flex items-center gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg">{"\u2192"}</span>
                  <div>
                    <div className="text-xs text-gray-400">السابق</div>
                    <div className="font-bold text-gray-800 dark:text-white">رأس السنة الهجرية {toArabicDigits(prevYear)}</div>
                  </div>
                </Link>
              ) : <div className="flex-1" />}

              <Link
                href={lp(locale, "/countdowns/hijri-new-year/years")}
                className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors text-center"
              >
                جميع السنوات
              </Link>

              {nextYear ? (
                <Link
                  href={lp(locale, `/countdowns/hijri-new-year/${nextYear}`)}
                  className="flex-1 flex items-center justify-end gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="text-left">
                    <div className="text-xs text-gray-400">التالي</div>
                    <div className="font-bold text-gray-800 dark:text-white">رأس السنة الهجرية {toArabicDigits(nextYear)}</div>
                  </div>
                  <span className="text-lg">{"\u2190"}</span>
                </Link>
              ) : <div className="flex-1" />}
            </div>

            {/* Links back */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={lp(locale, "/countdowns/hijri-new-year")}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {"\u2190"} العودة لعداد رأس السنة الهجرية
              </Link>
              <Link
                href={lp(locale, "/countdowns/hijri-new-year/years")}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {"\u2190"} جميع مواعيد رأس السنة الهجرية
              </Link>
            </div>

            <AdSlot id={`hijri-new-year-${year}-bottom`} size="leaderboard" />
          </div>

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <HijriNewYearSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* --- Info Cards --- */
function InfoCards({ data }: { data: HijriNewYearData }) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center">
        <span className="text-2xl mb-2 block">🗓️</span>
        <div className="text-xs text-gray-400 mb-1">١ محرم</div>
        <div className="font-bold text-gray-800 dark:text-white text-sm">{formatDateAr(data.newYearDate)}</div>
      </div>
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center">
        <span className="text-2xl mb-2 block">📿</span>
        <div className="text-xs text-gray-400 mb-1">عاشوراء</div>
        <div className="font-bold text-gray-800 dark:text-white text-sm">{formatDateAr(data.ashuraDate)}</div>
      </div>
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center">
        <span className="text-2xl mb-2 block">📅</span>
        <div className="text-xs text-gray-400 mb-1">اليوم</div>
        <div className="font-bold text-gray-800 dark:text-white text-sm">{data.dayOfWeek}</div>
      </div>
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center">
        <span className="text-2xl mb-2 block">🌤️</span>
        <div className="text-xs text-gray-400 mb-1">الفصل</div>
        <div className="font-bold text-gray-800 dark:text-white text-sm">{data.season}</div>
      </div>
    </section>
  );
}

/* --- Hero Component --- */
function YearHero({ data }: { data: HijriNewYearData }) {
  const [time, setTime] = useState(getTimeUntilHijriNewYear(data.year));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntilHijriNewYear(data.year));
    }, 1000);
    return () => clearInterval(interval);
  }, [data.year]);

  const isPast = data.status === "past";

  return (
    <div className={`relative overflow-hidden ${
      isPast
        ? "bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900"
        : "bg-gradient-to-bl from-indigo-600 via-indigo-700 to-indigo-800"
    }`}>
      {/* Decorative elements */}
      {!isPast && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.3,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center" dir="rtl">
        {/* Year title */}
        <div className="mb-2">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 text-sm text-indigo-100">
            {data.content.heroSubtitle}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
          {isPast ? "رأس السنة الهجرية" : "\uD83D\uDCC5 العد التنازلي لرأس السنة الهجرية"} {toArabicDigits(data.hijriYear)}
        </h1>
        <p className="text-indigo-100/80 text-sm sm:text-base mb-6">
          {toArabicDigits(data.hijriYear)} هـ &middot; ١ محرم &middot; {formatDateAr(data.newYearDate)}
        </p>

        {/* Countdown or Status */}
        {isPast ? (
          <div className="countdown-glass inline-block px-8 py-4">
            <p className="text-white/80 text-lg">انتهى رأس السنة الهجرية {toArabicDigits(data.hijriYear)}</p>
            <p className="text-white/50 text-sm mt-1">بداية عام هجري جديد</p>
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

/* --- Year FAQ --- */
function YearFAQ({ data }: { data: HijriNewYearData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const baseFAQ = [
    {
      q: `متى رأس السنة الهجرية ${toArabicDigits(data.hijriYear)}؟`,
      a: `رأس السنة الهجرية ${toArabicDigits(data.hijriYear)} (١ محرم) يوافق ${formatDateAr(data.newYearDate)}. وعاشوراء (١٠ محرم) يوافق ${formatDateAr(data.ashuraDate)}.`,
    },
    {
      q: `ما فضل صيام شهر محرم؟`,
      a: `قال النبي ﷺ: "أفضل الصيام بعد رمضان شهر الله المحرم". رواه مسلم. وصيام عاشوراء يكفّر ذنوب سنة ماضية.`,
    },
    {
      q: `ما هو يوم عاشوراء؟`,
      a: `يوم عاشوراء هو العاشر من محرم، نجّى الله فيه موسى عليه السلام وقومه من فرعون. صامه النبي ﷺ شكراً لله وأمر بصيامه.`,
    },
    {
      q: `هل يُستحب صيام التاسع مع عاشوراء؟`,
      a: `نعم، يُستحب صيام التاسع والعاشر من محرم. قال النبي ﷺ: "لئن بقيت إلى قابل لأصومن التاسع" مخالفةً لأهل الكتاب.`,
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
        أسئلة شائعة عن رأس السنة الهجرية {toArabicDigits(data.hijriYear)}
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
                {"\u25BC"}
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
