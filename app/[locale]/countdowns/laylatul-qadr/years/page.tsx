import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import LailatulQadrYearsClient from "./LailatulQadrYearsClient";
import LailatulQadrSidebar from "../components/LailatulQadrSidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "جميع مواعيد ليلة القدر من 2025 إلى 2050 | كل السنوات"
      : "Laylatul Qadr Dates 2025–2050 | All Years",
    description: isAr
      ? "جدول شامل لمواعيد ليلة القدر من 2025 إلى 2050 مع تواريخ الليالي الوترية (21، 23، 25، 27، 29) من العشر الأواخر من رمضان لكل سنة. خطط مسبقاً لليلة القدر القادمة."
      : "Complete Laylatul Qadr dates from 2025 to 2050 with odd nights (21, 23, 25, 27, 29) of the last ten days of Ramadan. Plan ahead for the Night of Power.",
    keywords: isAr
      ? ["مواعيد ليلة القدر", "ليلة القدر 2025 2050", "جدول ليلة القدر", "تقويم ليلة القدر", "متى ليلة القدر"]
      : ["laylatul qadr dates", "night of power schedule", "laylatul qadr calendar", "when is laylatul qadr"],
    alternates: { canonical: locale === "ar" ? "/countdowns/laylatul-qadr/years" : `/${locale}/countdowns/laylatul-qadr/years` },
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
          { labelAr: "ليلة القدر", labelEn: "Laylatul Qadr", href: "/countdowns/laylatul-qadr" },
          { labelAr: "جميع السنوات", labelEn: "All Years" },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "جميع مواعيد ليلة القدر" : "All Laylatul Qadr Dates"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "تصفح مواعيد ليلة القدر المباركة من 2025 حتى 2050 — تواريخ ليلة ٢٧ رمضان والليالي الوترية والفصل المناخي لكل سنة."
              : "Browse Laylatul Qadr dates from 2025 to 2050 — accurate dates for the 27th night and odd nights of the last ten days of Ramadan."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <LailatulQadrYearsClient locale={locale} />

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <LailatulQadrSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
