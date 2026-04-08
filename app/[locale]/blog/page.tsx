import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import { BLOG_CATEGORIES } from "@/lib/blog/types";
import { ALL_ARTICLES } from "@/lib/blog/articles";
import ArticleCard from "./components/ArticleCard";
import BlogSidebar from "./components/BlogSidebar";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "المدونة — مقالات مالية وشرعية وأدوات حسابية"
      : "Blog — Financial, Islamic, and Calculator Guides",
    description: isAr
      ? "مقالات شاملة عن الحسابات المالية والشرعية في السعودية — الميراث، نهاية الخدمة، التمويل العقاري، استهلاك الوقود، والمزيد."
      : "Comprehensive articles about financial and Islamic calculations in Saudi Arabia.",
    keywords: isAr
      ? ["مدونة حاسبات", "مقالات مالية", "حساب الميراث", "نهاية الخدمة", "التمويل العقاري"]
      : ["calculator blog", "financial articles", "islamic inheritance"],
    alternates: { canonical: `/${locale}/blog` },
  };
}

export default function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const featuredArticle = ALL_ARTICLES[0];
  const restArticles = ALL_ARTICLES.slice(1);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb
          items={[{ labelAr: "المدونة", labelEn: "Blog" }]}
        />

        {/* Header */}
        <div className="mt-5 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            المدونة
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            مقالات شاملة ومحدّثة عن الحسابات المالية والشرعية في المملكة العربية السعودية — أدلة عملية مع أمثلة وحاسبات.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href={`/${locale}/blog`}
            className="text-sm px-4 py-2 rounded-full bg-green-600 text-white font-medium"
          >
            📋 جميع المقالات ({ALL_ARTICLES.length})
          </Link>
          {BLOG_CATEGORIES.map((cat) => {
            const count = ALL_ARTICLES.filter((a) => a.category === cat.id).length;
            if (count === 0) return null;
            return (
              <Link
                key={cat.slug}
                href={`/${locale}/blog/category/${cat.slug}`}
                className={`text-sm px-4 py-2 rounded-full font-medium border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-colors ${cat.bgColor} ${cat.color}`}
              >
                {cat.icon} {cat.labelAr} ({count})
              </Link>
            );
          })}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-6">
            {/* Featured Article */}
            {featuredArticle && (
              <ArticleCard article={featuredArticle} locale={locale} featured />
            )}

            <AdSlot id="blog-mid" size="leaderboard" />

            {/* Rest of Articles */}
            <div className="space-y-4">
              {restArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} locale={locale} />
              ))}
            </div>

            {ALL_ARTICLES.length === 0 && (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">📝</p>
                <p className="text-gray-500 dark:text-gray-400">لا توجد مقالات بعد — ترقبوا قريباً!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <BlogSidebar locale={locale} />
          </div>
        </div>

        {/* Category Cards Section */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">📂 تصفح حسب القسم</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLOG_CATEGORIES.map((cat) => {
              const count = ALL_ARTICLES.filter((a) => a.category === cat.id).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/${locale}/blog/category/${cat.slug}`}
                  className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {cat.labelAr}
                      </h3>
                      <span className="text-xs text-gray-400">{count} مقالات</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {cat.descriptionAr}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <AdSlot id="blog-btm" size="rectangle" />
      </div>
    </main>
  );
}
