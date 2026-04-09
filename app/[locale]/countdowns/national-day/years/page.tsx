import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { generatePageSEO } from "@/lib/utils/metadata";
import Breadcrumb from "@/components/layout/Breadcrumb";
import NationalDayYearsClient from "./NationalDayYearsClient";
import NationalDaySidebar from "../components/NationalDaySidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "جميع أعوام اليوم الوطني السعودي 2025-2050 | مواعيد اليوم الوطني"
    : "Saudi National Day Dates 2025–2050 | All Years";
  const description = isAr
    ? "تصفح مواعيد اليوم الوطني السعودي من 2025 إلى 2050 مع عدادات تنازلية لكل عام. اعرف رقم اليوم الوطني وتاريخه في أي سنة."
    : "Browse Saudi National Day dates from 2025 to 2050 with countdown timers for each year.";
  const keywords = isAr
    ? ["جميع أعوام اليوم الوطني", "مواعيد اليوم الوطني", "اليوم الوطني 2025 2050"]
    : ["national day dates", "saudi national day schedule"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns/national-day/years", { title, description, keywords }),
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
          { labelAr: "اليوم الوطني", labelEn: "National Day", href: "/countdowns/national-day" },
          { labelAr: "جميع السنوات", labelEn: "All Years" },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "جميع أعوام اليوم الوطني السعودي" : "All Saudi National Day Dates"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "تصفح مواعيد اليوم الوطني السعودي من 2025 حتى 2050 — تواريخ دقيقة وعدادات تنازلية لكل عام."
              : "Browse Saudi National Day dates from 2025 to 2050 — accurate dates and countdown timers."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <NationalDayYearsClient locale={locale} />
          <div className="hidden lg:block">
            <NationalDaySidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
