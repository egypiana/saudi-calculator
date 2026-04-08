import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import { BLOG_CATEGORIES, getCategoryBySlug } from "@/lib/blog/types";
import { ALL_ARTICLES } from "@/lib/blog/articles";
import ArticleCard from "../../components/ArticleCard";
import BlogSidebar from "../../components/BlogSidebar";

export async function generateStaticParams() {
  return BLOG_CATEGORIES.flatMap((cat) => [
    { locale: "ar", category: cat.slug },
    { locale: "en", category: cat.slug },
    { locale: "es", category: cat.slug },
    { locale: "pt", category: cat.slug },
  ]);
}

export async function generateMetadata({
  params: { locale, category },
}: {
  params: { locale: string; category: string };
}): Promise<Metadata> {
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "قسم غير موجود" };

  const isAr = locale === "ar";
  return {
    title: isAr
      ? `${cat.labelAr} — مقالات المدونة`
      : `${cat.labelEn} — Blog Articles`,
    description: isAr
      ? cat.descriptionAr
      : `Articles about ${cat.labelEn.toLowerCase()} topics.`,
    alternates: { canonical: `/${locale}/blog/category/${category}` },
  };
}

export default function CategoryPage({
  params: { locale, category },
}: {
  params: { locale: string; category: string };
}) {
  unstable_setRequestLocale(locale);

  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const articles = ALL_ARTICLES.filter((a) => a.category === cat.id);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb
          items={[
            { labelAr: "المدونة", labelEn: "Blog", href: "/blog" },
            { labelAr: cat.labelAr, labelEn: cat.labelEn },
          ]}
        />

        {/* Header */}
        <div className="mt-5 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{cat.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {cat.labelAr}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {cat.descriptionAr}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs px-2.5 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full font-medium">
              {articles.length} مقالات
            </span>
            <Link href={`/${locale}/blog`} className="text-xs text-green-600 dark:text-green-400 hover:underline">
              ← جميع المقالات
            </Link>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href={`/${locale}/blog`}
            className="text-sm px-4 py-2 rounded-full font-medium border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-colors text-gray-600 dark:text-gray-400"
          >
            📋 الكل
          </Link>
          {BLOG_CATEGORIES.map((c) => {
            const count = ALL_ARTICLES.filter((a) => a.category === c.id).length;
            if (count === 0) return null;
            const isActive = c.slug === category;
            return (
              <Link
                key={c.slug}
                href={`/${locale}/blog/category/${c.slug}`}
                className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
                  isActive
                    ? "bg-green-600 text-white"
                    : `border border-gray-200 dark:border-gray-700 hover:border-green-500 ${c.bgColor} ${c.color}`
                }`}
              >
                {c.icon} {c.labelAr} ({count})
              </Link>
            );
          })}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-4">
            {articles.length > 0 ? (
              articles.map((article, i) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  locale={locale}
                  featured={i === 0}
                />
              ))
            ) : (
              <div className="text-center py-16 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700">
                <p className="text-4xl mb-4">{cat.icon}</p>
                <p className="text-gray-500 dark:text-gray-400 font-medium">لا توجد مقالات في هذا القسم بعد</p>
                <Link href={`/${locale}/blog`} className="text-sm text-green-600 dark:text-green-400 hover:underline mt-2 inline-block">
                  تصفح جميع المقالات ←
                </Link>
              </div>
            )}

            <AdSlot id="blog-cat-btm" size="leaderboard" />
          </div>

          <div className="hidden lg:block">
            <BlogSidebar locale={locale} currentCategory={cat.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
