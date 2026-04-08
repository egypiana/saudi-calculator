import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import Link from "next/link";
import { Calculator } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "الحاسبات — أدوات حسابية متنوعة" : "Calculators — Various Calculation Tools",
    description: isAr
      ? "مجموعة شاملة من الحاسبات: الزكاة، الراتب، الضريبة، نهاية الخدمة، التمويل العقاري، BMI، المعدل التراكمي، والمزيد."
      : "Comprehensive calculators: Zakat, Salary, VAT, End of Service, Mortgage, BMI, GPA, and more.",
    alternates: { canonical: `/${locale}/calculators` },
  };
}

interface CalcItem {
  icon: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  href: string;
  color: string;
}

const categories: { titleAr: string; titleEn: string; items: CalcItem[] }[] = [
  {
    titleAr: "الحاسبات المالية",
    titleEn: "Financial Calculators",
    items: [
      { icon: "🕌", titleAr: "حاسبة الزكاة", titleEn: "Zakat Calculator", descAr: "احسب زكاة أموالك", descEn: "Calculate your Zakat", href: "/calculators/zakat", color: "from-emerald-500 to-emerald-700" },
      { icon: "🧾", titleAr: "حاسبة الضريبة", titleEn: "VAT Calculator", descAr: "إضافة وحذف ضريبة 15%", descEn: "Add/remove 15% VAT", href: "/calculators/vat", color: "from-blue-500 to-blue-700" },
      { icon: "💰", titleAr: "حاسبة الراتب", titleEn: "Salary Calculator", descAr: "صافي الراتب بعد التأمينات", descEn: "Net salary after GOSI", href: "/calculators/salary", color: "from-green-500 to-green-700" },
      { icon: "🏢", titleAr: "حاسبة نهاية الخدمة", titleEn: "End of Service", descAr: "مكافأة نهاية الخدمة", descEn: "End of service reward", href: "/calculators/end-of-service", color: "from-teal-500 to-teal-700" },
      { icon: "🏠", titleAr: "حاسبة التمويل العقاري", titleEn: "Mortgage Calculator", descAr: "القسط الشهري للتمويل", descEn: "Monthly mortgage payment", href: "/calculators/mortgage", color: "from-indigo-500 to-indigo-700" },
      { icon: "📊", titleAr: "حاسبة الميزانية", titleEn: "Budget Calculator", descAr: "خطط لميزانيتك الشهرية", descEn: "Plan your monthly budget", href: "/calculators/budget", color: "from-cyan-500 to-cyan-700" },
    ],
  },
  {
    titleAr: "الحاسبات الصحية",
    titleEn: "Health Calculators",
    items: [
      { icon: "⚖️", titleAr: "حاسبة BMI", titleEn: "BMI Calculator", descAr: "مؤشر كتلة الجسم", descEn: "Body Mass Index", href: "/calculators/bmi", color: "from-rose-500 to-rose-700" },
      { icon: "🤰", titleAr: "حاسبة الحمل", titleEn: "Pregnancy Calculator", descAr: "موعد الولادة المتوقع", descEn: "Expected due date", href: "/calculators/pregnancy", color: "from-pink-500 to-pink-700" },
      { icon: "🎂", titleAr: "حاسبة العمر", titleEn: "Age Calculator", descAr: "احسب عمرك بالتفصيل", descEn: "Calculate your exact age", href: "/calculators/age", color: "from-purple-500 to-purple-700" },
    ],
  },
  {
    titleAr: "أدوات أخرى",
    titleEn: "Other Tools",
    items: [
      { icon: "📜", titleAr: "حاسبة المواريث", titleEn: "Inheritance Calculator", descAr: "تقسيم التركة الشرعي", descEn: "Islamic inheritance shares", href: "/calculators/inheritance", color: "from-amber-500 to-amber-700" },
      { icon: "🎓", titleAr: "حاسبة المعدل التراكمي", titleEn: "GPA Calculator", descAr: "المعدل بنظام 5 نقاط", descEn: "GPA on 5.0 scale", href: "/calculators/gpa", color: "from-violet-500 to-violet-700" },
    ],
  },
];

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ labelAr: "الحاسبات", labelEn: "Calculators" }]} />

        <div className="mt-6 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
              <Calculator className="h-7 w-7 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {isAr ? "الحاسبات" : "Calculators"}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {isAr ? "مجموعة شاملة من الأدوات الحسابية المصممة خصيصاً للمملكة العربية السعودية." : "A comprehensive collection of calculation tools designed for Saudi Arabia."}
          </p>
        </div>

        <AdSlot id="calc-top" size="leaderboard" />

        {categories.map((category) => (
          <section key={category.titleEn} className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              {isAr ? category.titleAr : category.titleEn}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <Link key={item.href} href={`/${locale}${item.href}`}
                  className="group bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${item.color} rounded-xl p-3 text-2xl flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {isAr ? item.titleAr : item.titleEn}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {isAr ? item.descAr : item.descEn}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <AdSlot id="calc-bottom" size="leaderboard" />
      </div>
    </main>
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent locale={locale} />;
}
