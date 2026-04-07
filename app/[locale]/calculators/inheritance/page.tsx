import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import InheritanceCalculator from "@/components/calculators/InheritanceCalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "حاسبة المواريث الشرعية — تقسيم التركة" : "Islamic Inheritance Calculator",
    description: isAr
      ? "حاسبة المواريث الشرعية: احسب نصيب كل وارث حسب الشريعة الإسلامية. أدخل التركة والورثة."
      : "Islamic inheritance calculator: compute each heir's share according to Islamic law. Enter estate and heirs.",
    alternates: { canonical: `/${locale}/calculators/inheritance` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "ما ترتيب توزيع التركة؟", answer: "تُوزع التركة بالترتيب: 1) تجهيز الميت ودفنه، 2) سداد الديون، 3) تنفيذ الوصية (بحد أقصى الثلث)، 4) توزيع الباقي على الورثة." },
        { question: "ما الحد الأقصى للوصية؟", answer: "الحد الأقصى للوصية هو ثلث التركة بعد خصم الديون، ولا تجوز الوصية لوارث." },
        { question: "هل هذه الحاسبة تغني عن المحكمة؟", answer: "لا، هذه الحاسبة للاسترشاد فقط. يجب مراجعة المحكمة الشرعية أو عالم شرعي مختص لتوزيع التركة رسمياً." },
      ]
    : [
        { question: "What is the order of estate distribution?", answer: "Estate is distributed in order: 1) funeral expenses, 2) debt settlement, 3) will execution (max 1/3), 4) distribution to heirs." },
        { question: "What is the maximum will amount?", answer: "The maximum will (wasiyyah) is one-third of the estate after debts. A will cannot be made for an heir." },
        { question: "Does this calculator replace a court ruling?", answer: "No, this is for guidance only. Official estate distribution must go through Sharia court or a qualified scholar." },
      ];

  const relatedTools = [
    { labelAr: "حاسبة الزكاة", labelEn: "Zakat Calculator", href: "/calculators/zakat" },
    { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة المواريث", labelEn: "Inheritance Calculator" },
        ]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <InheritanceCalculator />
            <AdSlot id="inheritance-mid" size="leaderboard" />
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
            <AdSlot id="inheritance-side" size="rectangle" />
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
