"use client";

import Link from "next/link";
import { BLOG_CATEGORIES, getCategoryInfo, type BlogCategory } from "@/lib/blog/types";
import { ALL_ARTICLES } from "@/lib/blog/articles";

interface Props {
  locale: string;
  currentSlug?: string;
  currentCategory?: BlogCategory;
}

const RELATED_CALCULATORS = [
  { icon: "📜", labelAr: "حاسبة المواريث", href: "/calculators/inheritance", desc: "تقسيم التركة الشرعي" },
  { icon: "💰", labelAr: "حاسبة الزكاة", href: "/calculators/zakat", desc: "زكاة المال والذهب" },
  { icon: "🏢", labelAr: "حاسبة نهاية الخدمة", href: "/calculators/end-of-service", desc: "مكافأة نهاية الخدمة" },
  { icon: "🏠", labelAr: "حاسبة التمويل العقاري", href: "/calculators/mortgage", desc: "أقساط الرهن العقاري" },
  { icon: "🧾", labelAr: "حاسبة الضريبة", href: "/calculators/vat", desc: "القيمة المضافة 15%" },
  { icon: "📊", labelAr: "حاسبة النسبة المئوية", href: "/calculators/percentage", desc: "حساب أي نسبة" },
];

export default function BlogSidebar({ locale, currentSlug, currentCategory }: Props) {
  // Get latest articles excluding current
  const latestArticles = ALL_ARTICLES
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 5);

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Categories */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>📂</span>
          أقسام المدونة
        </h3>
        <div className="space-y-1">
          {BLOG_CATEGORIES.map((cat) => {
            const count = ALL_ARTICLES.filter((a) => a.category === cat.id).length;
            const isActive = currentCategory === cat.id;
            return (
              <Link
                key={cat.slug}
                href={`/${locale}/blog/category/${cat.slug}`}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.labelAr}</span>
                </div>
                {count > 0 && (
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
            <span>📝</span>
            أحدث المقالات
          </h3>
          <div className="space-y-3">
            {latestArticles.map((article, i) => {
              const catInfo = getCategoryInfo(article.category);
              return (
                <Link key={article.slug} href={`/${locale}/blog/${article.slug}`} className="block group">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-snug mb-1.5">
                    {article.titleAr}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${catInfo.bgColor} ${catInfo.color}`}>
                      {article.category}
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">
                      {article.readTime} دقائق قراءة
                    </span>
                  </div>
                  {i < latestArticles.length - 1 && (
                    <div className="border-b border-gray-100 dark:border-gray-800 mt-3" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Calculators */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>🧮</span>
          حاسبات ذات صلة
        </h3>
        <div className="space-y-1">
          {RELATED_CALCULATORS.map((calc) => (
            <Link
              key={calc.href}
              href={`/${locale}${calc.href}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <span className="text-xl flex-shrink-0">{calc.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {calc.labelAr}
                </div>
                <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{calc.desc}</div>
              </div>
              <span className="text-gray-300 dark:text-gray-600 mr-auto text-xs">←</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
