import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { lp } from "@/lib/utils/locale";
import Link from "next/link";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr ? "من نحن — حاسبة VIP" : "About Us — Calculator VIP";
  const description = isAr
    ? "تعرف على حاسبة VIP — منصة سعودية متكاملة تقدم أدوات حسابية وعدادات تنازلية مجانية ودقيقة للمملكة العربية السعودية."
    : "Learn about Calculator VIP — a comprehensive Saudi-focused platform offering free, accurate calculators and countdowns for Saudi Arabia.";
  return {
    title,
    description,
    ...generatePageSEO(locale, "/about", { title, description }),
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const offerings = [
    {
      icon: "\u{1F9EE}",
      titleAr: "حاسبات مالية وشرعية",
      titleEn: "Financial & Sharia Calculators",
      descAr: "الزكاة، الراتب، القرض، نهاية الخدمة، الميراث",
      descEn: "Zakat, Salary, Loan, End of Service, Inheritance",
    },
    {
      icon: "\u23F0",
      titleAr: "عدادات تنازلية",
      titleEn: "Countdowns",
      descAr: "رمضان، الأعياد، المناسبات الوطنية والدينية",
      descEn: "Ramadan, Eids, national and religious occasions",
    },
    {
      icon: "\u{1F4DD}",
      titleAr: "مدونة متخصصة",
      titleEn: "Specialized Blog",
      descAr: "مقالات مالية وشرعية وصحية",
      descEn: "Financial, Sharia, and health articles",
    },
    {
      icon: "\u{1F5D3}\uFE0F",
      titleAr: "التقويم الهجري",
      titleEn: "Hijri Calendar",
      descAr: "تحويل التاريخ الهجري-ميلادي",
      descEn: "Hijri to Gregorian date conversion",
    },
  ];

  const features = [
    { ar: "مجاني بالكامل", en: "Completely free" },
    { ar: "دقة عالية في الحسابات", en: "High accuracy calculations" },
    { ar: "تحديث دوري للبيانات", en: "Regular data updates" },
    { ar: "يعمل على جميع الأجهزة", en: "Works on all devices" },
    { ar: "خصوصية تامة (لا نحفظ بياناتك)", en: "Full privacy (we don't store your data)" },
    { ar: "متعدد اللغات (العربية، الإنجليزية، الإسبانية، البرتغالية)", en: "Multilingual (Arabic, English, Spanish, Portuguese)" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ labelAr: "من نحن", labelEn: "About Us" }]} />

        {/* Hero Section */}
        <section className="mt-8 text-center py-12 sm:py-16 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            {isAr ? "حاسبة VIP" : "Calculator VIP"}
          </h1>
          <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto px-4">
            {isAr
              ? "مجموعة شاملة من الأدوات الحسابية المصممة خصيصاً للمملكة العربية السعودية"
              : "A comprehensive suite of calculators designed specifically for Saudi Arabia"}
          </p>
        </section>

        {/* من نحن */}
        <section className="mt-10 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {isAr ? "من نحن" : "Who We Are"}
          </h2>
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
            <p>
              {isAr
                ? "حاسبة VIP هي منصة سعودية متكاملة تقدم مجموعة واسعة من الأدوات الحسابية المصممة لتلبية احتياجات المقيمين في المملكة العربية السعودية. نوفر حاسبات للزكاة، الرواتب، الضرائب، والعقارات، بالإضافة إلى عدادات تنازلية لأهم المناسبات مثل رمضان، الأعياد، المولد النبوي، واليوم الوطني."
                : "Calculator VIP is a comprehensive Saudi-focused platform offering a wide range of calculators designed for Saudi Arabia residents. We provide calculators for Zakat, salaries, taxes, and real estate, along with countdowns for key occasions like Ramadan, Eids, Mawlid, and National Day."}
            </p>
            <p>
              {isAr
                ? "جميع أدواتنا مجانية بالكامل، دقيقة، وتحترم خصوصيتك — لا نحفظ أي بيانات شخصية."
                : "All our tools are completely free, accurate, and privacy-first — we never store personal data."}
            </p>
          </div>
        </section>

        {/* رؤيتنا */}
        <section className="mt-8 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {isAr ? "رؤيتنا" : "Our Vision"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {isAr
              ? "أن نكون المنصة الأولى للحاسبات والعدادات التنازلية للمقيمين في المملكة العربية السعودية، ونقدم تجربة مستخدم استثنائية تجمع بين الدقة وسهولة الاستخدام."
              : "To be the #1 calculator and countdown platform for Saudi Arabia residents, delivering an exceptional user experience that combines accuracy with ease of use."}
          </p>
        </section>

        {/* ما نقدمه */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {isAr ? "ما نقدمه" : "What We Offer"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offerings.map((item) => (
              <div
                key={item.titleEn}
                className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-green-400 dark:hover:border-green-500 transition-colors"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* مميزاتنا */}
        <section className="mt-8 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {isAr ? "مميزاتنا" : "Our Features"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.en}
                className="flex items-center gap-3 bg-green-50 dark:bg-green-900/10 rounded-xl px-4 py-3"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  &#10003;
                </span>
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {isAr ? feature.ar : feature.en}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* تواصل معنا */}
        <section className="mt-8 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-2xl border border-green-200 dark:border-green-800 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "تواصل معنا" : "Contact Us"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {isAr
              ? "لديك سؤال أو اقتراح؟ نسعد بتواصلك معنا!"
              : "Have a question or suggestion? We'd love to hear from you!"}
          </p>
          <Link
            href={lp(locale, "/contact")}
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            {isAr ? "صفحة التواصل" : "Contact Page"}
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent locale={locale} />;
}
