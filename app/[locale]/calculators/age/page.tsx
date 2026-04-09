import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import AgeCalculator from "@/components/calculators/AgeCalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { lp } from "@/lib/utils/locale";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "حاسبة العمر — احسب عمرك بالتفصيل" : "Age Calculator — Calculate Your Exact Age",
    description: isAr
      ? "احسب عمرك بالسنوات والأشهر والأيام. اعرف كم يوم عشت ومتى عيد ميلادك القادم."
      : "Calculate your age in years, months, and days. Know how many days you've lived and when your next birthday is.",
    alternates: { canonical: locale === "ar" ? "/calculators/age" : `/${locale}/calculators/age` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "كيف تُحسب العمر بالضبط؟", answer: "يُحسب العمر بطرح تاريخ الميلاد من التاريخ الحالي، مع مراعاة الأشهر والأيام بدقة." },
        { question: "هل يمكن حساب العمر بالتاريخ الهجري؟", answer: "هذه الحاسبة تعتمد على التاريخ الميلادي. لتحويل تاريخ ميلادك الهجري، استخدم حاسبة التقويم الهجري أولاً." },
      ]
    : [
        { question: "How is the exact age calculated?", answer: "Age is calculated by subtracting the birth date from today's date, accounting for months and days precisely." },
        { question: "Can I calculate age using Hijri calendar?", answer: "This calculator uses the Gregorian calendar. To convert a Hijri birth date, use the Hijri calendar converter first." },
      ];

  const relatedTools = [
    { labelAr: "حاسبة الحمل", labelEn: "Pregnancy Calculator", href: "/calculators/pregnancy" },
    { labelAr: "حاسبة BMI", labelEn: "BMI Calculator", href: "/calculators/bmi" },
    { labelAr: "التقويم الهجري", labelEn: "Hijri Calendar", href: "/hijri-calendar" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة العمر", labelEn: "Age Calculator" },
        ]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <AgeCalculator />
            <AdSlot id="age-mid" size="leaderboard" />
            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">{isAr ? "أدوات ذات صلة" : "Related Tools"}</h3>
              <div className="space-y-2">
                {relatedTools.map((item) => (
                  <Link key={item.href} href={lp(locale, item.href)}
                    className="block px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-primary-900/10 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium text-sm transition-colors">
                    {isAr ? item.labelAr : item.labelEn}
                  </Link>
                ))}
              </div>
            </div>
            <AdSlot id="age-side" size="rectangle" />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent locale={locale} />;
}
