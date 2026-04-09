import Link from "next/link";
import { getCategoryInfo } from "@/lib/blog/types";
import type { BlogArticle } from "@/lib/blog/types";
import { lp } from "@/lib/utils/locale";

interface Props {
  article: BlogArticle;
  locale: string;
  featured?: boolean;
}

export default function ArticleCard({ article, locale, featured = false }: Props) {
  const catInfo = getCategoryInfo(article.category);

  if (featured) {
    return (
      <Link
        href={lp(locale, `/blog/${article.slug}`)}
        className="block bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl border-2 border-green-200 dark:border-green-800/40 p-6 hover:shadow-lg hover:-translate-y-1 transition-all group"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{article.icon}</span>
          <div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${catInfo.bgColor} ${catInfo.color}`}>
              {article.category}
            </span>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors mb-2 leading-snug">
          {article.titleAr}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">
          {article.descriptionAr}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          <span>⏱️ {article.readTime} دقائق قراءة</span>
          <span>📅 {new Date(article.publishDate).toLocaleDateString("ar-SA")}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={lp(locale, `/blog/${article.slug}`)}
      className="block bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0 mt-1">{article.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${catInfo.bgColor} ${catInfo.color}`}>
              {article.category}
            </span>
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              {article.readTime} دقائق قراءة
            </span>
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-1.5 leading-snug">
            {article.titleAr}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
            {article.descriptionAr}
          </p>
        </div>
      </div>
    </Link>
  );
}
