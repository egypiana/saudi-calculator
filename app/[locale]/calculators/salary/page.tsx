import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "حاسبة الراتب — صافي الراتب بعد خصم التأمينات" : "Salary Calculator — Net Salary After GOSI",
    description: isAr
      ? "احسب صافي راتبك بعد خصم التأمينات الاجتماعية (9.75%). أدخل الراتب الأساسي والبدلات."
      : "Calculate your net salary after GOSI deduction (9.75%). Enter basic salary and allowances.",
    alternates: { canonical: `/${locale}/calculators/salary` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "كم نسبة خصم التأمينات الاجتماعية؟", answer: "يتم خصم 9.75% من الراتب الأساسي للموظف السعودي (حصة الموظف)، بينما يدفع صاحب العمل 11.75%." },
        { question: "هل تُحسب التأمينات على البدلات؟", answer: "لا، تُحسب التأمينات الاجتماعية على الراتب الأساسي فقط، ولا تشمل بدل السكن أو النقل أو البدلات الأخرى." },
        { question: "ما هو الحد الأقصى للراتب الخاضع للتأمينات؟", answer: "الحد الأقصى للأجر الخاضع للاشتراك هو 45,000 ريال شهرياً." },
        { question: "هل يختلف الخصم للسعودي عن غير السعودي؟", answer: "نعم، غير السعودي يُخصم 2% فقط (تأمين أخطار مهنية) ولا يشترك في نظام التقاعد." },
      ]
    : [
        { question: "What is the GOSI deduction rate?", answer: "9.75% is deducted from the basic salary for Saudi employees (employee share). The employer pays 11.75%." },
        { question: "Is GOSI calculated on allowances?", answer: "No, GOSI is calculated on basic salary only, not on housing, transport, or other allowances." },
        { question: "What is the maximum salary subject to GOSI?", answer: "The maximum salary subject to GOSI contribution is 45,000 SAR per month." },
      ];

  const relatedTools = [
    { labelAr: "حاسبة نهاية الخدمة", labelEn: "End of Service Calculator", href: "/calculators/end-of-service" },
    { labelAr: "حاسبة الضريبة", labelEn: "VAT Calculator", href: "/calculators/vat" },
    { labelAr: "مواعيد الرواتب", labelEn: "Salary Dates", href: "/countdowns/salaries-dates" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator" },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <SalaryCalculator />
            <AdSlot id="salary-mid" size="leaderboard" />

            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {isAr ? "كيف يُحسب صافي الراتب؟" : "How is Net Salary Calculated?"}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-3">
                <p>{isAr
                  ? "صافي الراتب = الراتب الإجمالي (الأساسي + البدلات) − خصم التأمينات الاجتماعية. يُحسب خصم التأمينات بنسبة 9.75% من الراتب الأساسي فقط للموظف السعودي."
                  : "Net Salary = Gross Salary (Basic + Allowances) − GOSI Deduction. GOSI is calculated at 9.75% of basic salary only for Saudi employees."
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
            <AdSlot id="salary-side" size="rectangle" />
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
