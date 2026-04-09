import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import BMICalculator from "@/components/calculators/BMICalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { lp } from "@/lib/utils/locale";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr ? "حاسبة مؤشر كتلة الجسم (BMI)" : "BMI Calculator — Body Mass Index";
  const description = isAr
    ? "احسب مؤشر كتلة الجسم BMI لمعرفة إذا كان وزنك طبيعي أو زائد. حاسبة سريعة ودقيقة."
    : "Calculate your Body Mass Index (BMI) to check if your weight is healthy. Fast and accurate calculator.";
  return {
    title,
    description,
    ...generatePageSEO(locale, "/calculators/bmi", { title, description }),
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "ما هو مؤشر كتلة الجسم BMI؟", answer: "مؤشر كتلة الجسم هو مقياس يُستخدم لتقييم وزن الشخص بالنسبة لطوله. يُحسب بقسمة الوزن (كجم) على مربع الطول (متر)." },
        { question: "ما هو المؤشر الطبيعي؟", answer: "المؤشر الطبيعي يتراوح بين 18.5 و24.9. أقل من 18.5 يعني نقص في الوزن، وأكثر من 25 يعني زيادة في الوزن." },
        { question: "هل مؤشر BMI دقيق للجميع؟", answer: "لا يُعد دقيقاً بالكامل للرياضيين وكبار السن والحوامل، لأنه لا يفرق بين الدهون والعضلات." },
      ]
    : [
        { question: "What is BMI?", answer: "BMI is a measure used to evaluate a person's weight relative to their height. It is calculated by dividing weight (kg) by height squared (m²)." },
        { question: "What is a normal BMI?", answer: "A normal BMI ranges from 18.5 to 24.9. Below 18.5 is underweight, above 25 is overweight." },
        { question: "Is BMI accurate for everyone?", answer: "BMI is not fully accurate for athletes, elderly, or pregnant women, as it doesn't distinguish between fat and muscle." },
      ];

  const relatedTools = [
    { labelAr: "حاسبة العمر", labelEn: "Age Calculator", href: "/calculators/age" },
    { labelAr: "حاسبة الحمل", labelEn: "Pregnancy Calculator", href: "/calculators/pregnancy" },
    { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة BMI", labelEn: "BMI Calculator" },
        ]} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <BMICalculator />
            <AdSlot id="bmi-mid" size="leaderboard" />
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
            <AdSlot id="bmi-side" size="rectangle" />
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
