import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import EndOfServiceCalculator from "@/components/calculators/EndOfServiceCalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "حاسبة مكافأة نهاية الخدمة — نظام العمل السعودي" : "End of Service Calculator — Saudi Labor Law",
    description: isAr
      ? "احسب مكافأة نهاية الخدمة حسب نظام العمل السعودي. استقالة، فصل، تقاعد، أو انتهاء عقد."
      : "Calculate end of service reward per Saudi Labor Law. Resignation, termination, retirement, or contract end.",
    alternates: { canonical: `/${locale}/calculators/end-of-service` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "كيف تُحسب مكافأة نهاية الخدمة؟", answer: "أول 5 سنوات: نصف راتب شهر عن كل سنة. ما بعد 5 سنوات: راتب شهر كامل عن كل سنة. في حالة الاستقالة تختلف النسبة حسب مدة الخدمة." },
        { question: "هل يستحق المستقيل مكافأة نهاية الخدمة؟", answer: "إذا كانت الخدمة أقل من سنتين: لا يستحق. من 2 إلى 5 سنوات: ثلث المكافأة. من 5 إلى 10 سنوات: ثلثا المكافأة. أكثر من 10 سنوات: المكافأة كاملة." },
        { question: "ما الراتب المعتمد في الحساب؟", answer: "يُحسب على أساس آخر راتب أساسي مع بدل السكن والنقل والبدلات الثابتة." },
        { question: "متى تُصرف المكافأة؟", answer: "يجب على صاحب العمل دفع المكافأة خلال أسبوع من تاريخ انتهاء العلاقة العمالية." },
        { question: "هل تشمل المكافأة فترة التجربة؟", answer: "لا تُحسب فترة التجربة ضمن مدة الخدمة إلا إذا تم تجديد العقد بعدها." },
      ]
    : [
        { question: "How is end of service calculated?", answer: "First 5 years: half month salary per year. After 5 years: full month salary per year. For resignation, the percentage varies by service length." },
        { question: "Does a resigning employee get a reward?", answer: "Less than 2 years: no reward. 2-5 years: 1/3 of reward. 5-10 years: 2/3 of reward. Over 10 years: full reward." },
        { question: "Which salary is used for calculation?", answer: "The last basic salary plus housing, transport, and fixed allowances." },
        { question: "When must the reward be paid?", answer: "The employer must pay within one week of the employment relationship ending." },
      ];

  const relatedTools = [
    { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary" },
    { labelAr: "مواعيد الرواتب", labelEn: "Salary Dates", href: "/countdowns/salaries-dates" },
    { labelAr: "حاسبة الضريبة", labelEn: "VAT Calculator", href: "/calculators/vat" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة نهاية الخدمة", labelEn: "End of Service" },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <EndOfServiceCalculator />
            <AdSlot id="eos-mid" size="leaderboard" />

            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {isAr ? "مكافأة نهاية الخدمة في نظام العمل السعودي" : "End of Service in Saudi Labor Law"}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-3">
                <p>{isAr
                  ? "مكافأة نهاية الخدمة حق من حقوق العامل وفقاً لنظام العمل السعودي (المواد 84-86). تُحسب على أساس آخر أجر ومدة الخدمة وسبب انتهاء العلاقة العمالية."
                  : "End of service reward is an employee right under Saudi Labor Law (Articles 84-86). It is calculated based on the last wage, service duration, and reason for employment termination."
                }</p>
              </div>
            </div>

            <FAQSection faqs={faqs} />
          </div>

          <aside className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                {isAr ? "أدوات ذات صلة" : "Related Tools"}
              </h3>
              <div className="space-y-2">
                {relatedTools.map((item) => (
                  <Link key={item.href} href={`/${locale}${item.href}`}
                    className="block px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-primary-900/10 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium text-sm transition-colors">
                    {isAr ? item.labelAr : item.labelEn}
                  </Link>
                ))}
              </div>
            </div>
            <AdSlot id="eos-side" size="rectangle" />
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
