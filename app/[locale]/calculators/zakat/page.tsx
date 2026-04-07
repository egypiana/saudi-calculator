import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ZakatCalculator from "@/components/calculators/ZakatCalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "حاسبة الزكاة — احسب زكاتك بدقة" : "Zakat Calculator — Calculate Your Zakat",
    description: isAr
      ? "حاسبة الزكاة الإلكترونية: احسب زكاة المال والذهب والأسهم والتجارة. نصاب الزكاة ومقدارها 2.5%."
      : "Online Zakat calculator: calculate zakat on cash, gold, stocks, and trade goods. Nisab threshold and 2.5% rate.",
    alternates: { canonical: `/${locale}/calculators/zakat` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "ما هو نصاب الزكاة؟", answer: "نصاب الزكاة هو ما يعادل 85 غرام من الذهب أو 595 غرام من الفضة. إذا بلغ مالك النصاب وحال عليه الحول وجبت عليك الزكاة." },
        { question: "كم نسبة الزكاة؟", answer: "نسبة زكاة المال هي 2.5% من إجمالي المال الذي بلغ النصاب وحال عليه الحول." },
        { question: "هل تجب الزكاة على الذهب الملبوس؟", answer: "اختلف العلماء في ذلك. الجمهور يرى عدم وجوبها على الحلي المستعمل، بينما يرى الحنفية وجوبها." },
        { question: "متى يجب إخراج الزكاة؟", answer: "تجب الزكاة بعد مرور حول كامل (سنة هجرية) على المال الذي بلغ النصاب." },
        { question: "هل تُخصم الديون من الزكاة؟", answer: "نعم، تُخصم الديون المستحقة عليك من إجمالي أموالك قبل حساب الزكاة." },
      ]
    : [
        { question: "What is Nisab?", answer: "Nisab is the minimum amount of wealth a Muslim must have before being obligated to pay Zakat. It equals 85 grams of gold or 595 grams of silver." },
        { question: "What is the Zakat rate?", answer: "The Zakat rate is 2.5% of total wealth that has reached Nisab and been held for one lunar year." },
        { question: "Are debts deducted before calculating Zakat?", answer: "Yes, debts you owe are deducted from your total wealth before calculating Zakat." },
        { question: "When should Zakat be paid?", answer: "Zakat is due after one full lunar year (Hawl) has passed on wealth that meets the Nisab threshold." },
      ];

  const relatedTools = [
    { labelAr: "حاسبة المواريث", labelEn: "Inheritance Calculator", href: "/calculators/inheritance" },
    { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary" },
    { labelAr: "عداد رمضان", labelEn: "Ramadan Countdown", href: "/countdowns/ramadan" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة الزكاة", labelEn: "Zakat Calculator" },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <ZakatCalculator />
            <AdSlot id="zakat-mid" size="leaderboard" />

            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {isAr ? "كيف تحسب الزكاة؟" : "How to Calculate Zakat"}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-3">
                <p>{isAr
                  ? "الزكاة ركن من أركان الإسلام الخمسة، وهي فريضة مالية تجب على كل مسلم بلغ ماله النصاب وحال عليه الحول. تُحسب الزكاة بنسبة 2.5% من إجمالي الأموال الزكوية."
                  : "Zakat is one of the Five Pillars of Islam. It is a mandatory financial obligation on every Muslim whose wealth reaches the Nisab threshold for one lunar year. Zakat is calculated at 2.5% of total zakatable wealth."
                }</p>
                <p>{isAr
                  ? "تشمل الأموال الزكوية: النقود والأرصدة البنكية، الذهب والفضة، الأسهم والاستثمارات، وعروض التجارة. تُخصم الديون المستحقة قبل حساب الزكاة."
                  : "Zakatable wealth includes: cash and bank balances, gold and silver, stocks and investments, and trade goods. Debts owed are deducted before calculation."
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
            <AdSlot id="zakat-side" size="rectangle" />
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
