import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import GPACalculator from "@/components/calculators/GPACalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "حاسبة المعدل التراكمي GPA — نظام 5 نقاط" : "GPA Calculator — 5.0 Scale (Saudi System)",
    description: isAr
      ? "احسب معدلك التراكمي GPA حسب نظام الجامعات السعودية (5 نقاط). أضف موادك وتقديراتك."
      : "Calculate your GPA on the Saudi university 5.0 scale. Add your courses and grades.",
    alternates: { canonical: `/${locale}/calculators/gpa` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "ما هو نظام المعدل التراكمي في الجامعات السعودية؟", answer: "تستخدم معظم الجامعات السعودية نظام 5 نقاط: A+ = 5.0 (ممتاز مرتفع)، A = 4.75 (ممتاز)، B+ = 4.5، B = 4.0، C+ = 3.5، C = 3.0، D+ = 2.5، D = 2.0، F = 1.0." },
        { question: "كيف يُحسب المعدل التراكمي؟", answer: "المعدل = مجموع (نقاط التقدير × عدد الساعات) لكل مادة ÷ إجمالي الساعات المعتمدة." },
        { question: "ما هو الحد الأدنى للتخرج؟", answer: "الحد الأدنى للتخرج في معظم الجامعات السعودية هو معدل 2.0 من 5.0 (تقدير مقبول)." },
        { question: "هل تختلف النقاط بين الجامعات؟", answer: "قد تختلف بعض التفاصيل بين الجامعات، لكن نظام 5 نقاط هو الأكثر شيوعاً في المملكة." },
      ]
    : [
        { question: "What GPA system do Saudi universities use?", answer: "Most Saudi universities use a 5.0 scale: A+ = 5.0, A = 4.75, B+ = 4.5, B = 4.0, C+ = 3.5, C = 3.0, D+ = 2.5, D = 2.0, F = 1.0." },
        { question: "How is GPA calculated?", answer: "GPA = Sum of (grade points × credit hours) for each course ÷ total credit hours." },
        { question: "What is the minimum GPA for graduation?", answer: "The minimum GPA for graduation at most Saudi universities is 2.0 out of 5.0." },
      ];

  const relatedTools = [
    { labelAr: "مكافأة الجامعة", labelEn: "University Stipend", href: "/countdowns/university-stipend" },
    { labelAr: "حاسبة العمر", labelEn: "Age Calculator", href: "/calculators/age" },
    { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة المعدل", labelEn: "GPA Calculator" },
        ]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <GPACalculator />
            <AdSlot id="gpa-mid" size="leaderboard" />
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
            <AdSlot id="gpa-side" size="rectangle" />
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
