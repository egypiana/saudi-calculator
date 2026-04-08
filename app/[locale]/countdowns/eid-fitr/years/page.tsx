import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import EidYearsClient from "./EidYearsClient";
import EidSidebar from "../components/EidSidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "جميع سنوات عيد الفطر 2025-2050 | مواعيد العيد السنوية"
      : "Eid Al-Fitr Dates 2025–2050 | All Years",
    description: isAr
      ? "تصفح مواعيد عيد الفطر من 2025 إلى 2050 مع عدادات تنازلية لكل عام. اعرف متى عيد الفطر في أي سنة بالتاريخ الهجري والميلادي."
      : "Browse Eid Al-Fitr dates from 2025 to 2050 with countdown timers for each year.",
    keywords: isAr
      ? ["جميع سنوات عيد الفطر", "مواعيد عيد الفطر", "عيد الفطر 2025 2050"]
      : ["eid al-fitr dates", "eid schedule", "when is eid"],
    alternates: { canonical: `/${locale}/countdowns/eid-fitr/years` },
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
          { labelAr: "عيد الفطر", labelEn: "Eid Al-Fitr", href: "/countdowns/eid-fitr" },
          { labelAr: "جميع السنوات", labelEn: "All Years" },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "جميع مواعيد عيد الفطر" : "All Eid Al-Fitr Dates"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "تصفح مواعيد عيد الفطر المبارك من 2025 حتى 2050 — تواريخ دقيقة وعدادات تنازلية لكل عام."
              : "Browse Eid Al-Fitr dates from 2025 to 2050 — accurate dates and countdown timers."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <EidYearsClient locale={locale} />
          <div className="hidden lg:block">
            <EidSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
