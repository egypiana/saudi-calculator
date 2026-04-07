"use client";

import { useLocale, useTranslations } from "next-intl";
import CountdownTimer from "@/components/countdown/CountdownTimer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import AdSlot from "@/components/ads/AdSlot";
import { getNextEventDate } from "@/lib/events/islamic-events";
import Link from "next/link";

const ramadanFaqsAr = [
  {
    question: "متى يبدأ رمضان 2026؟",
    answer: "من المتوقع أن يبدأ شهر رمضان 1447 هـ في يوم 18 فبراير 2026 ميلادي، وذلك بحسب الحسابات الفلكية. يعتمد التحديد النهائي على رؤية الهلال في المملكة العربية السعودية.",
  },
  {
    question: "كم عدد أيام رمضان؟",
    answer: "يكون شهر رمضان إما 29 أو 30 يوماً، ويعتمد ذلك على رؤية هلال شهر شوال. في معظم السنوات يكون 30 يوماً.",
  },
  {
    question: "كيف يتم تحديد بداية رمضان في السعودية؟",
    answer: "يتم تحديد بداية شهر رمضان في المملكة العربية السعودية من خلال استطلاع رؤية هلال شهر رمضان في اليوم التاسع والعشرين من شعبان. تتولى المحكمة العليا إعلان النتيجة.",
  },
  {
    question: "ما الفرق بين رمضان في السعودية والدول الأخرى؟",
    answer: "قد يختلف موعد بداية رمضان بين الدول بيوم أو يومين، وذلك بسبب اختلاف مواقع رصد الهلال والتقويمات المعتمدة. السعودية تعتمد على الرؤية الشرعية.",
  },
  {
    question: "هل العداد دقيق؟",
    answer: "العداد مبني على الحسابات الفلكية التقريبية وتقويم أم القرى. قد يختلف الموعد الفعلي بيوم أو يومين بناءً على رؤية الهلال الرسمية.",
  },
];

const ramadanFaqsEn = [
  {
    question: "When does Ramadan 2026 start?",
    answer: "Ramadan 1447 AH is expected to begin around February 18, 2026, based on astronomical calculations. The final date depends on the moon sighting in Saudi Arabia.",
  },
  {
    question: "How many days is Ramadan?",
    answer: "Ramadan lasts either 29 or 30 days, depending on the sighting of the Shawwal crescent moon.",
  },
  {
    question: "How is the start of Ramadan determined in Saudi Arabia?",
    answer: "The Supreme Court of Saudi Arabia announces the start of Ramadan based on the sighting of the crescent moon on the 29th of Sha'ban.",
  },
  {
    question: "Is the countdown accurate?",
    answer: "The countdown is based on astronomical calculations and the Umm Al-Qura calendar. The actual date may vary by 1-2 days based on the official moon sighting.",
  },
];

export default function RamadanCountdown() {
  const locale = useLocale();
  const t = useTranslations("events");
  const isAr = locale === "ar";

  const targetDate = getNextEventDate("ramadan") || new Date("2026-02-18");
  const faqs = isAr ? ramadanFaqsAr : ramadanFaqsEn;

  const relatedCountdowns = [
    { label: isAr ? "عداد عيد الفطر" : "Eid Al-Fitr", href: `/${locale}/countdowns/eid-fitr` },
    { label: isAr ? "عداد عيد الأضحى" : "Eid Al-Adha", href: `/${locale}/countdowns/eid-adha` },
    { label: isAr ? "ليلة القدر" : "Laylatul Qadr", href: `/${locale}/countdowns/laylatul-qadr` },
    { label: isAr ? "عداد الحج" : "Hajj", href: `/${locale}/countdowns/hajj` },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isAr ? "عداد رمضان 2026" : "Ramadan 2026 Countdown",
    description: isAr
      ? "عداد تنازلي دقيق لشهر رمضان المبارك 2026 / 1447 هـ"
      : "Accurate countdown timer for Ramadan 2026 / 1447 AH",
    applicationCategory: "UtilitiesApplication",
    inLanguage: locale,
    offers: { "@type": "Offer", price: "0" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: isAr ? "العدادات" : "Countdowns", href: `/${locale}/countdowns` },
            { label: isAr ? "عداد رمضان" : "Ramadan Countdown" },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-2 space-y-8">
            {/* العداد */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 sm:p-10 shadow-2xl text-center">
              <span className="text-5xl mb-4 block">🌙</span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {t("ramadanQuestion")}
              </h1>
              <p className="text-white/70 text-lg mb-6">
                {isAr ? "رمضان 2026 — 1447 هـ" : "Ramadan 2026 — 1447 AH"}
              </p>
              <CountdownTimer targetDate={targetDate} size="lg" />
            </div>

            <ShareButtons
              title={isAr ? "كم باقي على رمضان 2026؟" : "Ramadan 2026 Countdown"}
            />

            <AdSlot id="ramadan-mid" size="rectangle" />

            {/* محتوى معلوماتي */}
            <article className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {isAr ? "شهر رمضان المبارك" : "The Holy Month of Ramadan"}
              </h2>
              {isAr ? (
                <>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    شهر رمضان هو الشهر التاسع في التقويم الهجري، وهو أقدس الشهور عند المسلمين.
                    يُفرض فيه الصيام على المسلمين البالغين القادرين من الفجر حتى المغرب. يتميز
                    الشهر بالعبادة المكثفة وقراءة القرآن الكريم وصلاة التراويح والإحسان.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    في المملكة العربية السعودية، يحمل رمضان أجواءً خاصة ومميزة. تُقام صلاة
                    التراويح في الحرمين الشريفين بحضور ملايين المصلين. تتغير أوقات العمل
                    والدوام الرسمي خلال الشهر، وتنتشر موائد الإفطار وبرامج الخير في جميع
                    أنحاء المملكة.
                  </p>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-6">
                    فضائل شهر رمضان
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>فيه أُنزل القرآن الكريم هدى للناس</li>
                    <li>فيه ليلة القدر التي هي خير من ألف شهر</li>
                    <li>تُفتح أبواب الجنة وتُغلق أبواب النار</li>
                    <li>تُصفَّد الشياطين ومردة الجن</li>
                    <li>من صام رمضان إيماناً واحتساباً غُفر له ما تقدم من ذنبه</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Ramadan is the ninth month of the Islamic calendar and the holiest month
                    for Muslims worldwide. Muslims fast from dawn to sunset, engage in
                    increased worship, Quran recitation, Taraweeh prayers, and charitable giving.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    In Saudi Arabia, Ramadan carries a special atmosphere. Taraweeh prayers at
                    the Two Holy Mosques attract millions of worshippers. Work hours change
                    during the month, and Iftar tables and charity programs spread throughout
                    the Kingdom.
                  </p>
                </>
              )}
            </article>

            {/* جدول تواريخ رمضان */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                {isAr ? "تواريخ رمضان القادمة" : "Upcoming Ramadan Dates"}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-dark-bg">
                      <th className="px-6 py-3 text-start font-semibold text-gray-500 dark:text-gray-400">
                        {isAr ? "السنة الهجرية" : "Hijri Year"}
                      </th>
                      <th className="px-6 py-3 text-start font-semibold text-gray-500 dark:text-gray-400">
                        {isAr ? "التاريخ الميلادي (تقريبي)" : "Gregorian Date (approx.)"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-3 text-gray-800 dark:text-white">1447 {isAr ? "هـ" : "AH"}</td>
                      <td className="px-6 py-3 text-gray-600 dark:text-gray-300">18 {isAr ? "فبراير" : "February"} 2026</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 text-gray-800 dark:text-white">1448 {isAr ? "هـ" : "AH"}</td>
                      <td className="px-6 py-3 text-gray-600 dark:text-gray-300">7 {isAr ? "فبراير" : "February"} 2027</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 text-gray-800 dark:text-white">1449 {isAr ? "هـ" : "AH"}</td>
                      <td className="px-6 py-3 text-gray-600 dark:text-gray-300">28 {isAr ? "يناير" : "January"} 2028</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <AdSlot id="ramadan-bottom" size="leaderboard" />

            {/* الأسئلة الشائعة */}
            <FAQSection faqs={faqs} />
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            <AdSlot id="ramadan-sidebar" size="rectangle" />

            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                {isAr ? "عدادات ذات صلة" : "Related Countdowns"}
              </h3>
              <ul className="space-y-3">
                {relatedCountdowns.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <span className="text-xs text-primary-500">{isAr ? "←" : "→"}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
