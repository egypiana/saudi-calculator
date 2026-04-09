"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";
import { useLocale, useTranslations } from "next-intl";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  MoonStar,
  Banknote,
  Calculator,
  Heart,
  GraduationCap,
  Flag,
  Wrench,
  HandCoins,
} from "lucide-react";
import { useState } from "react";
import CountdownCard from "@/components/countdown/CountdownCard";
import AdSlot from "@/components/ads/AdSlot";
import { getNextEventDate } from "@/lib/events/islamic-events";
import { getNextMonthlyDate } from "@/lib/events/salary-events";

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const ts = useTranslations("sections");
  const tc = useTranslations("categories");
  const tst = useTranslations("stats");
  const isRTL = locale === "ar";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { icon: MoonStar, label: tc("islamicEvents"), href: "/countdowns#islamic", count: 5 },
    { icon: Banknote, label: tc("salaryDates"), href: "/countdowns#salaries", count: 6 },
    { icon: Calculator, label: tc("financialCalc"), href: "/calculators#financial", count: 10 },
    { icon: HandCoins, label: tc("zakatWorship"), href: "/calculators#zakat", count: 3 },
    { icon: GraduationCap, label: tc("education"), href: "/academic-calendar", count: 2 },
    { icon: Flag, label: tc("nationalEvents"), href: "/countdowns#national", count: 3 },
    { icon: Heart, label: tc("healthFamily"), href: "/calculators#health", count: 4 },
    { icon: Wrench, label: tc("dailyTools"), href: "/calculators#tools", count: 6 },
  ];

  const featuredTools = [
    { label: locale === "ar" ? "حاسبة الزكاة" : "Zakat Calculator", href: "/calculators/zakat" },
    { label: locale === "ar" ? "حاسبة الراتب" : "Salary Calculator", href: "/calculators/salary" },
    { label: locale === "ar" ? "القيمة المضافة" : "VAT Calculator", href: "/calculators/vat" },
    { label: locale === "ar" ? "نهاية الخدمة" : "End of Service", href: "/calculators/end-of-service" },
    { label: locale === "ar" ? "عداد رمضان" : "Ramadan Countdown", href: "/countdowns/ramadan" },
    { label: locale === "ar" ? "حساب المواطن" : "Citizen Account", href: "/countdowns/citizen-account" },
    { label: locale === "ar" ? "التقويم الهجري" : "Hijri Calendar", href: "/hijri-calendar" },
  ];

  // حساب تواريخ العدادات المميزة
  const ramadanDate = getNextEventDate("ramadan") || new Date("2026-02-18");
  const eidFitrDate = getNextEventDate("eid-fitr") || new Date("2026-03-20");
  const eidAdhaDate = getNextEventDate("eid-adha") || new Date("2026-05-27");
  const salaryDate = getNextMonthlyDate(27);

  return (
    <>
      {/* ══ Hero Section ══ */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-dark py-16 sm:py-20 md:py-24 hero-pattern">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight text-balance">
            {t("title")}
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            {t("subtitle")}
          </p>

          {/* مربع البحث */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = lp(locale, `/search?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute top-1/2 -translate-y-1/2 start-4 h-5 w-5 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full ps-12 pe-4 py-4 rounded-2xl text-gray-800 bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-gold text-base"
              />
            </div>
          </form>

          {/* أزرار CTA */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
            <Link
              href={lp(locale, "/calculators")}
              className="px-6 py-3 bg-gold hover:bg-gold-600 text-white font-bold rounded-xl shadow-lg transition-all hover:shadow-xl"
            >
              {t("exploreCalculators")}
            </Link>
            <Link
              href={lp(locale, "/countdowns/salaries-dates")}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 transition-all"
            >
              {t("salaryDates")}
            </Link>
          </div>

          {/* إحصائيات */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[tst("calculatorsCount"), tst("eventsCount"), tst("languages"), tst("users")].map(
              (stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur rounded-xl px-4 py-3">
                  <span className="text-white font-bold text-sm sm:text-base">{stat}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══ العدادات المميزة ══ */}
      <section className="py-12 sm:py-16 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center mb-10">
            {ts("featuredCountdowns")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CountdownCard
              eventId="ramadan"
              icon="🌙"
              titleKey="ramadan"
              questionKey="ramadanQuestion"
              targetDate={ramadanDate}
              gradient="from-purple-600 to-indigo-700"
              href="/countdowns/ramadan"
            />
            <CountdownCard
              eventId="eid-fitr"
              icon="🎉"
              titleKey="eidFitr"
              questionKey="eidFitrQuestion"
              targetDate={eidFitrDate}
              gradient="from-emerald-500 to-teal-600"
              href="/countdowns/eid-fitr"
            />
            <CountdownCard
              eventId="eid-adha"
              icon="🐑"
              titleKey="eidAdha"
              questionKey="eidAdhaQuestion"
              targetDate={eidAdhaDate}
              gradient="from-amber-500 to-orange-600"
              href="/countdowns/eid-adha"
            />
            <CountdownCard
              eventId="salary"
              icon="💵"
              titleKey="nextSalary"
              questionKey="nextSalaryQuestion"
              targetDate={salaryDate}
              gradient="from-green-500 to-emerald-600"
              href="/countdowns/salaries-dates"
            />
          </div>
        </div>
      </section>

      {/* ══ إعلان ══ */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSlot id="home-top" size="leaderboard" />
      </div>

      {/* ══ أقسام الخدمات ══ */}
      <section className="py-12 sm:py-16 bg-white dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center mb-10">
            {ts("allServices")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={lp(locale, cat.href)}
                className="group bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center hover:border-primary-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto mb-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 transition-colors">
                  <cat.icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white text-sm sm:text-base mb-1">
                  {cat.label}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {cat.count} {locale === "ar" ? "أدوات" : "tools"}
                </span>
                <Arrow className="h-4 w-4 mx-auto mt-2 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ الأدوات المميزة ══ */}
      <section className="py-12 sm:py-16 bg-background dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
            {ts("mostUsed")}
          </h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-4">
            {featuredTools.map((tool, i) => (
              <Link
                key={i}
                href={lp(locale, tool.href)}
                className="flex-shrink-0 px-5 py-3 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-400 hover:shadow-md transition-all text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ إعلان ══ */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSlot id="home-bottom" size="rectangle" />
      </div>
    </>
  );
}
