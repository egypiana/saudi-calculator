import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import HijriNewYearYearsClient from "./HijriNewYearYearsClient";
import HijriNewYearSidebar from "../components/HijriNewYearSidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "جميع مواعيد رأس السنة الهجرية من 1447 إلى 1473 | كل السنوات"
      : "Hijri New Year Dates 1447\u20131473 | All Years",
    description: isAr
      ? "جدول شامل لمواعيد رأس السنة الهجرية من 1447 إلى 1473 مع تواريخ عاشوراء والفصل المناخي لكل سنة. خطط مسبقاً لرأس السنة الهجرية القادمة."
      : "Complete Hijri New Year dates from 1447 to 1473 AH with Ashura dates. Plan ahead for the next Islamic New Year.",
    keywords: isAr
      ? ["مواعيد رأس السنة الهجرية", "رأس السنة الهجرية 1447 1473", "جدول رأس السنة الهجرية", "تقويم هجري", "١ محرم"]
      : ["hijri new year dates", "islamic new year schedule", "1 muharram calendar", "when is hijri new year"],
    alternates: { canonical: locale === "ar" ? "/countdowns/hijri-new-year/years" : `/${locale}/countdowns/hijri-new-year/years` },
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
          { labelAr: "رأس السنة الهجرية", labelEn: "Hijri New Year", href: "/countdowns/hijri-new-year" },
          { labelAr: "جميع السنوات", labelEn: "All Years" },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "جميع مواعيد رأس السنة الهجرية" : "All Hijri New Year Dates"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "تصفح مواعيد رأس السنة الهجرية من 1447 حتى 1473 — تواريخ ١ محرم وعاشوراء والفصل المناخي لكل سنة."
              : "Browse Hijri New Year dates from 1447 to 1473 AH \u2014 accurate dates for 1st Muharram and Ashura for each year."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <HijriNewYearYearsClient locale={locale} />

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <HijriNewYearSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
