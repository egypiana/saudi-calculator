import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { generatePageSEO } from "@/lib/utils/metadata";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ArafahYearsClient from "./ArafahYearsClient";
import ArafahSidebar from "../components/ArafahSidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "جميع مواعيد يوم عرفة من 2025 إلى 2050 | كل السنوات"
    : "Arafat Day Dates 2025\u20132050 | All Years";
  const description = isAr
    ? "جدول شامل لمواعيد يوم عرفة من 2025 إلى 2050 مع تواريخ عيد الأضحى وبداية الحج والفصل المناخي لكل سنة. خطط مسبقاً ليوم عرفة القادم."
    : "Complete Arafat Day dates from 2025 to 2050 with Eid Al-Adha dates and Hajj start dates. Plan ahead for the Day of Arafah.";
  const keywords = isAr
    ? ["مواعيد يوم عرفة", "يوم عرفة 2025 2050", "جدول يوم عرفة", "تقويم يوم عرفة", "متى يوم عرفة"]
    : ["arafat day dates", "day of arafah schedule", "arafah calendar", "when is arafat day"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns/arafah/years", { title, description, keywords }),
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
          { labelAr: "يوم عرفة", labelEn: "Arafat Day", href: "/countdowns/arafah" },
          { labelAr: "جميع السنوات", labelEn: "All Years" },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "جميع مواعيد يوم عرفة" : "All Arafat Day Dates"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "تصفح مواعيد يوم عرفة من 2025 حتى 2050 — تواريخ ٩ ذو الحجة وعيد الأضحى وبداية الحج والفصل المناخي لكل سنة."
              : "Browse Arafat Day dates from 2025 to 2050 \u2014 accurate dates for 9th Dhul Hijjah, Eid Al-Adha, and Hajj start for each year."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <ArafahYearsClient locale={locale} />

          {/* Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <ArafahSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
