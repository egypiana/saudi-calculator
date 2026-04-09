import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CountdownsPage from "./CountdownsPage";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "العدادات التنازلية السعودية 2026 | رمضان، الرواتب، المناسبات"
    : "Saudi Countdowns 2026 | Ramadan, Salaries, Events";
  const description = isAr
    ? "جميع العدادات التنازلية للمناسبات الإسلامية والرواتب السعودية في مكان واحد. عداد رمضان، عيد الفطر، حساب المواطن، الراتب وأكثر."
    : "All countdown timers for Islamic events and Saudi salaries in one place. Ramadan, Eid Al-Fitr, Citizen Account, salary dates and more.";
  const keywords = isAr
    ? ["عداد رمضان", "موعد الراتب", "عيد الفطر", "حساب المواطن", "العد التنازلي السعودي"]
    : ["ramadan countdown", "salary date", "eid al-fitr", "citizen account", "saudi countdown"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns", { title, description, keywords }),
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "العدادات التنازلية", labelEn: "Countdowns" },
        ]} />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "العدادات التنازلية" : "Countdowns"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "تتبع جميع المناسبات الإسلامية والوطنية ومواعيد الرواتب والدعم الحكومي في مكان واحد. أنشئ عدادك الخاص أو تصفح العدادات الجاهزة."
              : "Track all Islamic and national events, salary dates, and government support in one place. Create your own countdown or browse ready-made timers."}
          </p>
        </div>

        <CountdownsPage locale={locale} />
      </div>
    </main>
  );
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <PageContent locale={locale} />;
}
