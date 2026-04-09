import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AshuraYearsClient from "./AshuraYearsClient";
import AshuraSidebar from "../components/AshuraSidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "جميع مواعيد يوم عاشوراء من 2025 إلى 2050 | كل السنوات"
      : "Ashura Day Dates 2025\u20132050 | All Years",
    description: isAr
      ? "جدول شامل لمواعيد يوم عاشوراء من 2025 إلى 2050 مع تواريخ تاسوعاء والحادي عشر من محرم والفصل المناخي لكل سنة. خطط مسبقاً ليوم عاشوراء القادم."
      : "Complete Ashura Day dates from 2025 to 2050 with Tasua and 11th Muharram dates. Plan ahead for the Day of Ashura.",
    keywords: isAr
      ? ["مواعيد يوم عاشوراء", "يوم عاشوراء 2025 2050", "جدول يوم عاشوراء", "تقويم يوم عاشوراء", "متى يوم عاشوراء"]
      : ["ashura day dates", "day of ashura schedule", "ashura calendar", "when is ashura"],
    alternates: { canonical: locale === "ar" ? "/countdowns/ashura/years" : `/${locale}/countdowns/ashura/years` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const isAr = locale === "ar";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات", labelEn: "Countdowns", href: "/countdowns" },
          { labelAr: "يوم عاشوراء", labelEn: "Ashura Day", href: "/countdowns/ashura" },
          { labelAr: "جميع السنوات", labelEn: "All Years" },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "جميع مواعيد يوم عاشوراء" : "All Ashura Day Dates"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "تصفح مواعيد يوم عاشوراء من 2025 حتى 2050 — تواريخ ١٠ محرم وتاسوعاء والحادي عشر من محرم والفصل المناخي لكل سنة."
              : "Browse Ashura Day dates from 2025 to 2050 \u2014 accurate dates for 10th Muharram, Tasua, and 11th Muharram for each year."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <AshuraYearsClient locale={locale} />

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <AshuraSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
