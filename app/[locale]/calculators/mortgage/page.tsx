import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { lp } from "@/lib/utils/locale";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "حاسبة التمويل العقاري — القسط الشهري" : "Mortgage Calculator — Monthly Payment",
    description: isAr
      ? "احسب القسط الشهري للتمويل العقاري في السعودية. أدخل سعر العقار والدفعة الأولى ومعدل الربح."
      : "Calculate your monthly mortgage payment in Saudi Arabia. Enter property price, down payment, and interest rate.",
    alternates: { canonical: locale === "ar" ? "/calculators/mortgage" : `/${locale}/calculators/mortgage` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "ما هو الحد الأدنى للدفعة الأولى؟", answer: "الحد الأدنى للدفعة الأولى في السعودية هو 30% من قيمة العقار للمسكن الأول، و15% للمسكن الثاني عبر برنامج سكني." },
        { question: "ما هو معدل الربح المعتاد؟", answer: "معدلات الربح تتراوح عادةً بين 3.5% و7% سنوياً حسب البنك ونوع التمويل (ثابت أو متغير)." },
        { question: "ما أقصى مدة للتمويل العقاري؟", answer: "أقصى مدة للتمويل العقاري في السعودية هي 30 سنة، ويجب ألا يتجاوز عمر المقترض 70 سنة عند نهاية التمويل." },
        { question: "هل يشمل القسط التأمين؟", answer: "هذه الحاسبة تحسب القسط الأساسي فقط. التأمين ورسوم التقييم تُضاف بشكل منفصل." },
      ]
    : [
        { question: "What is the minimum down payment?", answer: "The minimum down payment in Saudi Arabia is 30% for the first home, and 15% for second homes through the Sakani program." },
        { question: "What is a typical interest rate?", answer: "Interest rates typically range from 3.5% to 7% annually depending on the bank and type (fixed or variable)." },
        { question: "What is the maximum loan period?", answer: "The maximum mortgage period in Saudi Arabia is 30 years, and the borrower's age must not exceed 70 at the end of the loan." },
      ];

  const relatedTools = [
    { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary" },
    { labelAr: "حاسبة الضريبة", labelEn: "VAT Calculator", href: "/calculators/vat" },
    { labelAr: "حاسبة الزكاة", labelEn: "Zakat Calculator", href: "/calculators/zakat" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة التمويل العقاري", labelEn: "Mortgage Calculator" },
        ]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <MortgageCalculator />
            <AdSlot id="mortgage-mid" size="leaderboard" />
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
            <AdSlot id="mortgage-side" size="rectangle" />
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
