import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import VATCalculator from "@/components/calculators/VATCalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "حاسبة ضريبة القيمة المضافة 15% — إضافة وحذف الضريبة" : "VAT Calculator 15% — Add & Remove VAT",
    description: isAr
      ? "حاسبة ضريبة القيمة المضافة في السعودية 15%. أضف أو احذف الضريبة من أي مبلغ بسهولة."
      : "Saudi Arabia VAT calculator at 15%. Easily add or remove VAT from any amount.",
    alternates: { canonical: `/${locale}/calculators/vat` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "كم نسبة ضريبة القيمة المضافة في السعودية؟", answer: "نسبة ضريبة القيمة المضافة في المملكة العربية السعودية هي 15% منذ يوليو 2020." },
        { question: "كيف أحسب الضريبة على مبلغ؟", answer: "لإضافة الضريبة: اضرب المبلغ × 1.15. لمعرفة المبلغ قبل الضريبة: اقسم المبلغ الشامل ÷ 1.15." },
        { question: "ما هي السلع المعفاة من الضريبة؟", answer: "تشمل المعفاة: الخدمات المالية، التأمين على الحياة، تأجير العقارات السكنية، وبعض الخدمات الحكومية." },
        { question: "متى تم تطبيق ضريبة 15%؟", answer: "تم رفع النسبة من 5% إلى 15% في 1 يوليو 2020." },
      ]
    : [
        { question: "What is the VAT rate in Saudi Arabia?", answer: "The VAT rate in Saudi Arabia is 15%, effective since July 2020." },
        { question: "How do I calculate VAT?", answer: "To add VAT: multiply the amount by 1.15. To find the amount before VAT: divide the inclusive amount by 1.15." },
        { question: "What goods are VAT-exempt?", answer: "Exempt items include financial services, life insurance, residential property rental, and some government services." },
      ];

  const relatedTools = [
    { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary" },
    { labelAr: "حاسبة هامش الربح", labelEn: "Profit Margin Calculator", href: "/calculators/profit-margin" },
    { labelAr: "حاسبة الزكاة", labelEn: "Zakat Calculator", href: "/calculators/zakat" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة الضريبة", labelEn: "VAT Calculator" },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <VATCalculator />
            <AdSlot id="vat-mid" size="leaderboard" />

            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {isAr ? "ضريبة القيمة المضافة في السعودية" : "VAT in Saudi Arabia"}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-3">
                <p>{isAr
                  ? "ضريبة القيمة المضافة (VAT) هي ضريبة غير مباشرة تُفرض على معظم السلع والخدمات في المملكة العربية السعودية بنسبة 15%. تم تطبيقها أول مرة في يناير 2018 بنسبة 5%، ثم رُفعت إلى 15% في يوليو 2020."
                  : "Value Added Tax (VAT) is an indirect tax applied to most goods and services in Saudi Arabia at 15%. It was first implemented in January 2018 at 5%, then raised to 15% in July 2020."
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
            <AdSlot id="vat-side" size="rectangle" />
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
