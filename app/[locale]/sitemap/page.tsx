import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { lp } from "@/lib/utils/locale";
import { ALL_ARTICLES } from "@/lib/blog/articles";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "خريطة الموقع — حاسبة VIP" : "Sitemap — Calculator VIP",
    description: isAr
      ? "تصفح جميع صفحات موقع حاسبة VIP — الحاسبات والعدادات والمقالات والمزيد."
      : "Browse all pages on Calculator VIP — calculators, countdowns, articles, and more.",
    alternates: { canonical: locale === "ar" ? "/sitemap" : `/${locale}/sitemap` },
  };
}

const linkClass =
  "flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-sm text-gray-700 dark:text-gray-300";

const headingClass =
  "text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2";

const gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3";

export default function SitemapPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8" dir="rtl">
      <Breadcrumb
        items={[{ label: "خريطة الموقع" }]}
      />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        خريطة الموقع
      </h1>

      {/* الصفحات الرئيسية */}
      <section className="mb-10">
        <h2 className={headingClass}>الصفحات الرئيسية</h2>
        <div className={gridClass}>
          <Link href={lp(locale, "/")} className={linkClass}>الرئيسية</Link>
          <Link href={lp(locale, "/calculators")} className={linkClass}>الحاسبات</Link>
          <Link href={lp(locale, "/countdowns")} className={linkClass}>العدادات</Link>
          <Link href={lp(locale, "/blog")} className={linkClass}>المدونة</Link>
          <Link href={lp(locale, "/about")} className={linkClass}>من نحن</Link>
          <Link href={lp(locale, "/contact")} className={linkClass}>اتصل بنا</Link>
          <Link href={lp(locale, "/hijri-calendar")} className={linkClass}>التقويم الهجري</Link>
        </div>
      </section>

      {/* الحاسبات */}
      <section className="mb-10">
        <h2 className={headingClass}>الحاسبات</h2>
        <div className={gridClass}>
          <Link href={lp(locale, "/calculators/zakat")} className={linkClass}>حاسبة الزكاة</Link>
          <Link href={lp(locale, "/calculators/salary")} className={linkClass}>حاسبة الراتب</Link>
          <Link href={lp(locale, "/calculators/vat")} className={linkClass}>القيمة المضافة</Link>
          <Link href={lp(locale, "/calculators/end-of-service")} className={linkClass}>نهاية الخدمة</Link>
          <Link href={lp(locale, "/calculators/mortgage")} className={linkClass}>القرض العقاري</Link>
          <Link href={lp(locale, "/calculators/inheritance")} className={linkClass}>الميراث</Link>
          <Link href={lp(locale, "/calculators/age")} className={linkClass}>حاسبة العمر</Link>
          <Link href={lp(locale, "/calculators/budget")} className={linkClass}>حاسبة الميزانية</Link>
          <Link href={lp(locale, "/calculators/bmi")} className={linkClass}>حاسبة BMI</Link>
          <Link href={lp(locale, "/calculators/percentage")} className={linkClass}>حاسبة النسبة المئوية</Link>
          <Link href={lp(locale, "/calculators/real-estate-finance")} className={linkClass}>حاسبة التمويل العقاري</Link>
        </div>
      </section>

      {/* العدادات التنازلية */}
      <section className="mb-10">
        <h2 className={headingClass}>العدادات التنازلية</h2>
        <div className={gridClass}>
          <Link href={lp(locale, "/countdowns/ramadan")} className={linkClass}>رمضان</Link>
          <Link href={lp(locale, "/countdowns/eid-fitr")} className={linkClass}>عيد الفطر</Link>
          <Link href={lp(locale, "/countdowns/eid-adha")} className={linkClass}>عيد الأضحى</Link>
          <Link href={lp(locale, "/countdowns/hajj")} className={linkClass}>الحج</Link>
          <Link href={lp(locale, "/countdowns/laylatul-qadr")} className={linkClass}>ليلة القدر</Link>
          <Link href={lp(locale, "/countdowns/arafah")} className={linkClass}>يوم عرفة</Link>
          <Link href={lp(locale, "/countdowns/hijri-new-year")} className={linkClass}>رأس السنة الهجرية</Link>
          <Link href={lp(locale, "/countdowns/ashura")} className={linkClass}>يوم عاشوراء</Link>
          <Link href={lp(locale, "/countdowns/mawlid")} className={linkClass}>المولد النبوي</Link>
          <Link href={lp(locale, "/countdowns/national-day")} className={linkClass}>اليوم الوطني</Link>
          <Link href={lp(locale, "/countdowns/citizen-account")} className={linkClass}>حساب المواطن</Link>
          <Link href={lp(locale, "/countdowns/salaries-dates")} className={linkClass}>مواعيد الرواتب</Link>
        </div>
      </section>

      {/* المدونة */}
      <section className="mb-10">
        <h2 className={headingClass}>المدونة</h2>
        <div className={gridClass}>
          {ALL_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={lp(locale, "/blog/" + article.slug)}
              className={linkClass}
            >
              {article.icon} {article.titleAr}
            </Link>
          ))}
        </div>
      </section>

      {/* الصفحات القانونية */}
      <section className="mb-10">
        <h2 className={headingClass}>الصفحات القانونية</h2>
        <div className={gridClass}>
          <Link href={lp(locale, "/privacy-policy")} className={linkClass}>سياسة الخصوصية</Link>
          <Link href={lp(locale, "/terms")} className={linkClass}>شروط الاستخدام</Link>
        </div>
      </section>
    </main>
  );
}
