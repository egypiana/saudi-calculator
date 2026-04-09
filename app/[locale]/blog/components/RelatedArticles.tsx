import Link from "next/link";
import { getCategoryInfo } from "@/lib/blog/types";
import type { BlogArticle } from "@/lib/blog/types";
import { lp } from "@/lib/utils/locale";

interface Props {
  articles: BlogArticle[];
  locale: string;
}

export default function RelatedArticles({ articles, locale }: Props) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📚 مقالات ذات صلة</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => {
          const catInfo = getCategoryInfo(article.category);
          return (
            <Link
              key={article.slug}
              href={lp(locale, `/blog/${article.slug}`)}
              className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{article.icon}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${catInfo.bgColor} ${catInfo.color}`}>
                  {article.category}
                </span>
              </div>
              <h3 className="font-bold text-sm text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2 leading-snug">
                {article.titleAr}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-3">
                {article.descriptionAr}
              </p>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                ⏱️ {article.readTime} دقائق قراءة
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
