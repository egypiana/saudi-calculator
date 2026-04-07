import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PregnancyCalculator from "@/components/calculators/PregnancyCalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "حاسبة الحمل والولادة — موعد الولادة المتوقع" : "Pregnancy Calculator — Expected Due Date",
    description: isAr
      ? "احسبي موعد الولادة المتوقع بناءً على تاريخ آخر دورة شهرية. اعرفي أسبوع الحمل الحالي."
      : "Calculate your expected due date based on your last menstrual period. Know your current pregnancy week.",
    alternates: { canonical: `/${locale}/calculators/pregnancy` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "كيف يُحسب موعد الولادة؟", answer: "يُحسب بإضافة 280 يوماً (40 أسبوعاً) إلى أول يوم من آخر دورة شهرية (قاعدة نيغل)." },
        { question: "هل موعد الولادة دقيق؟", answer: "موعد الولادة المتوقع تقديري. فقط 5% من النساء يلدن في الموعد المحدد بالضبط. المدة الطبيعية بين 37 و42 أسبوعاً." },
        { question: "ما هي مراحل الحمل الثلاث؟", answer: "الثلث الأول (الأسابيع 1-12)، الثلث الثاني (الأسابيع 13-27)، والثلث الثالث (الأسابيع 28-40)." },
      ]
    : [
        { question: "How is the due date calculated?", answer: "By adding 280 days (40 weeks) to the first day of the last menstrual period (Naegele's rule)." },
        { question: "Is the due date accurate?", answer: "The due date is an estimate. Only about 5% of babies are born on the exact due date. Normal range is 37-42 weeks." },
        { question: "What are the three trimesters?", answer: "First trimester (weeks 1-12), second trimester (weeks 13-27), and third trimester (weeks 28-40)." },
      ];

  const relatedTools = [
    { labelAr: "حاسبة العمر", labelEn: "Age Calculator", href: "/calculators/age" },
    { labelAr: "حاسبة BMI", labelEn: "BMI Calculator", href: "/calculators/bmi" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة الحمل", labelEn: "Pregnancy Calculator" },
        ]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <PregnancyCalculator />
            <AdSlot id="pregnancy-mid" size="leaderboard" />
            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">{isAr ? "أدوات ذات صلة" : "Related Tools"}</h3>
              <div className="space-y-2">
                {relatedTools.map((item) => (
                  <Link key={item.href} href={`/${locale}${item.href}`}
                    className="block px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-primary-900/10 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium text-sm transition-colors">
                    {isAr ? item.labelAr : item.labelEn}
                  </Link>
                ))}
              </div>
            </div>
            <AdSlot id="pregnancy-side" size="rectangle" />
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
