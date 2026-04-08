import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import { getCategoryInfo } from "@/lib/blog/types";
import { getArticleBySlug, getRelatedArticles, getAllSlugs } from "@/lib/blog/articles";
import BlogSidebar from "../components/BlogSidebar";
import RelatedArticles from "../components/RelatedArticles";

export async function generateStaticParams() {
  return getAllSlugs().flatMap((slug) => [
    { locale: "ar", slug },
    { locale: "en", slug },
    { locale: "es", slug },
    { locale: "pt", slug },
  ]);
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(slug);
  if (!article) return { title: "مقال غير موجود" };

  const isAr = locale === "ar";
  return {
    title: isAr ? article.titleAr : article.titleEn,
    description: isAr ? article.descriptionAr : article.descriptionEn,
    keywords: article.keywords,
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      title: isAr ? article.titleAr : article.titleEn,
      description: isAr ? article.descriptionAr : article.descriptionEn,
      type: "article",
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate || article.publishDate,
      authors: ["CalculatorVIP"],
    },
  };
}

export default function ArticlePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const catInfo = getCategoryInfo(article.category);
  const related = getRelatedArticles(slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titleAr,
    description: article.descriptionAr,
    datePublished: article.publishDate,
    dateModified: article.updatedDate || article.publishDate,
    author: { "@type": "Organization", name: "CalculatorVIP" },
    publisher: { "@type": "Organization", name: "CalculatorVIP", url: "https://calculatorvip.com" },
    inLanguage: "ar",
    mainEntityOfPage: `https://calculatorvip.com/${locale}/blog/${slug}`,
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb
          items={[
            { labelAr: "المدونة", labelEn: "Blog", href: "/blog" },
            { labelAr: article.titleAr, labelEn: article.titleEn },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 mt-6">
          {/* Article Content */}
          <div>
            {/* Article Header */}
            <article className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Hero Banner */}
              <div className="bg-gradient-to-l from-green-600 to-emerald-700 px-6 sm:px-8 py-8">
                <div className="flex items-center gap-2 mb-4">
                  <Link
                    href={`/${locale}/blog/category/${catInfo.slug}`}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    {catInfo.icon} {catInfo.labelAr}
                  </Link>
                  <span className="text-xs text-green-200">
                    ⏱️ {article.readTime} دقائق قراءة
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">
                  {article.icon} {article.titleAr}
                </h1>
                <p className="text-green-100 text-sm leading-relaxed max-w-2xl">
                  {article.descriptionAr}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-green-200">
                  <span>📅 {new Date(article.publishDate).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</span>
                  {article.updatedDate && (
                    <span>🔄 آخر تحديث: {new Date(article.updatedDate).toLocaleDateString("ar-SA")}</span>
                  )}
                </div>
              </div>

              {/* Related Calculator CTA */}
              {article.relatedCalculator && (
                <div className="px-6 sm:px-8 py-3 bg-green-50 dark:bg-green-900/10 border-b border-green-200 dark:border-green-800/40">
                  <Link
                    href={`/${locale}${article.relatedCalculator.href}`}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-green-700 dark:text-green-400 font-medium">
                      🧮 جرّب: {article.relatedCalculator.labelAr}
                    </span>
                    <span className="text-green-600 dark:text-green-500 text-xs">استخدم الحاسبة ←</span>
                  </Link>
                </div>
              )}

              {/* Article Body */}
              <div
                className="px-6 sm:px-8 py-8 prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

            <AdSlot id="blog-article-btm" size="leaderboard" />

            {/* Related Articles */}
            <RelatedArticles articles={related} locale={locale} />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <BlogSidebar locale={locale} currentSlug={slug} currentCategory={article.category} />
          </div>
        </div>
      </div>
    </main>
  );
}
