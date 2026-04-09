import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { generatePageSEO } from "@/lib/utils/metadata";
import Breadcrumb from "@/components/layout/Breadcrumb";
import MawlidYearsClient from "./MawlidYearsClient";
import MawlidSidebar from "../components/MawlidSidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "جميع مواعيد المولد النبوي من 2025 إلى 2050 | كل السنوات"
    : "Mawlid an-Nabi Dates 2025\u20132050 | All Years";
  const description = isAr
    ? "جدول شامل لمواعيد المولد النبوي الشريف من 2025 إلى 2050 مع تاريخ ١٢ ربيع الأول والفصل المناخي لكل سنة. خطط مسبقاً للمولد النبوي القادم."
    : "Complete Mawlid an-Nabi dates from 2025 to 2050 with 12th Rabi al-Awwal dates. Plan ahead for the Prophet's Birthday.";
  const keywords = isAr
    ? ["مواعيد المولد النبوي", "المولد النبوي 2025 2050", "جدول المولد النبوي", "تقويم المولد النبوي", "متى المولد النبوي"]
    : ["mawlid dates", "prophet birthday schedule", "mawlid calendar", "when is mawlid"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns/mawlid/years", { title, description, keywords }),
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
          { labelAr: "المولد النبوي", labelEn: "Mawlid an-Nabi", href: "/countdowns/mawlid" },
          { labelAr: "جميع السنوات", labelEn: "All Years" },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "جميع مواعيد المولد النبوي" : "All Mawlid an-Nabi Dates"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "تصفح مواعيد المولد النبوي الشريف من 2025 حتى 2050 — تاريخ ١٢ ربيع الأول والفصل المناخي لكل سنة."
              : "Browse Mawlid an-Nabi dates from 2025 to 2050 \u2014 accurate dates for 12th Rabi al-Awwal for each year."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <MawlidYearsClient locale={locale} />

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <MawlidSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
