import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import RamadanYearsClient from "./RamadanYearsClient";
import RamadanSidebar from "../components/RamadanSidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "مواعيد رمضان من 2025 إلى 2050 | جميع السنوات"
      : "Ramadan Dates 2025–2050 | All Years",
    description: isAr
      ? "جدول شامل لمواعيد رمضان من 2025 إلى 2050 مع تواريخ البداية والنهاية وساعات الصيام والفصل وأيام الأسبوع. خطط مسبقاً لرمضان القادم."
      : "Complete Ramadan dates from 2025 to 2050 with start/end dates, fasting hours, seasons, and more. Plan ahead for upcoming Ramadan.",
    keywords: isAr
      ? ["مواعيد رمضان", "رمضان 2025 2050", "جدول رمضان", "تقويم رمضان", "متى رمضان"]
      : ["ramadan dates", "ramadan schedule", "ramadan calendar", "when is ramadan"],
    alternates: { canonical: `/${locale}/countdowns/ramadan/years` },
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
          { labelAr: "رمضان", labelEn: "Ramadan", href: "/countdowns/ramadan" },
          { labelAr: "جميع السنوات", labelEn: "All Years" },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "جميع مواعيد رمضان" : "All Ramadan Dates"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "تصفح مواعيد رمضان المبارك من 2025 حتى 2050 — تواريخ دقيقة وساعات الصيام والفصل المناخي لكل سنة."
              : "Browse Ramadan dates from 2025 to 2050 — accurate dates, fasting hours, and seasons for each year."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <RamadanYearsClient locale={locale} />

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <RamadanSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
