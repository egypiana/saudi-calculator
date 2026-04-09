import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import HajjYearsClient from "./HajjYearsClient";
import HajjSidebar from "../components/HajjSidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "جميع مواسم الحج 2025-2050 | مواعيد الحج السنوية"
      : "Hajj Dates 2025–2050 | All Years",
    description: isAr
      ? "تصفح مواعيد موسم الحج من 2025 إلى 2050 مع عدادات تنازلية لكل عام. اعرف متى الحج في أي سنة بالتاريخ الهجري والميلادي."
      : "Browse Hajj dates from 2025 to 2050 with countdown timers for each year.",
    keywords: isAr
      ? ["جميع مواسم الحج", "مواعيد الحج", "الحج 2025 2050"]
      : ["hajj dates", "hajj schedule", "when is hajj"],
    alternates: { canonical: `/${locale}/countdowns/hajj/years` },
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
          { labelAr: "الحج", labelEn: "Hajj", href: "/countdowns/hajj" },
          { labelAr: "جميع السنوات", labelEn: "All Years" },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "جميع مواسم الحج" : "All Hajj Dates"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "تصفح مواعيد موسم الحج من 2025 حتى 2050 — تواريخ دقيقة وعدادات تنازلية لكل عام."
              : "Browse Hajj dates from 2025 to 2050 — accurate dates and countdown timers."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <HajjYearsClient locale={locale} />
          <div className="hidden lg:block">
            <HajjSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
