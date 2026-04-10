"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useLocale } from "next-intl";
import { lp } from "@/lib/utils/locale";
import { Search, X, SearchX, ChevronLeft } from "lucide-react";
import { searchItems, type SearchResult } from "@/lib/search/search";
import type { SearchItemType } from "@/lib/search/searchIndex";

const TYPE_LABELS: Record<SearchItemType, { label: string; color: string }> = {
  calculator: {
    label: "حاسبة",
    color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  },
  countdown: {
    label: "عدّاد",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  },
  article: {
    label: "مقال",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  },
  page: {
    label: "صفحة",
    color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
  },
};

const POPULAR_SEARCHES = [
  "زكاة",
  "راتب",
  "رمضان",
  "حساب المواطن",
  "نهاية الخدمة",
  "العمر",
  "المرافقين",
  "التمويل العقاري",
];

export default function SearchPageClient({ initialQuery }: { initialQuery: string }) {
  const locale = useLocale();
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<SearchItemType | "all">("all");

  // تحديث URL عند تغيير الاستعلام
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.replaceState(null, "", newUrl);
  }, [query]);

  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) return [];
    return searchItems(query, 50);
  }, [query]);

  const filteredResults = useMemo(() => {
    if (activeFilter === "all") return results;
    return results.filter((r) => r.type === activeFilter);
  }, [results, activeFilter]);

  const counts = useMemo(() => {
    const c = { all: results.length, calculator: 0, countdown: 0, article: 0, page: 0 };
    results.forEach((r) => {
      c[r.type]++;
    });
    return c;
  }, [results]);

  return (
    <>
      {/* ═════ Hero ═════ */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900 py-14 sm:py-20">
        <div className="absolute top-0 start-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            البحث في حاسبة VIP
          </h1>
          <p className="text-white/90 text-base sm:text-lg mb-8">
            ابحث في أكثر من 50 حاسبة وعدّاد ومقال
          </p>

          {/* شريط البحث */}
          <div className="relative group max-w-2xl mx-auto">
            <Search className="absolute top-1/2 -translate-y-1/2 start-5 h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثال: زكاة، راتب، رمضان، حساب المواطن..."
              autoFocus
              className="w-full ps-14 pe-14 py-4 sm:py-5 rounded-2xl text-gray-800 bg-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300/50 text-base sm:text-lg"
              aria-label="البحث"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute top-1/2 -translate-y-1/2 end-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                aria-label="مسح البحث"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ═════ النتائج ═════ */}
      <section className="py-10 sm:py-14 bg-gray-50 dark:bg-gray-900 min-h-[40vh]">
        <div className="max-w-5xl mx-auto px-4">
          {/* حالة: لا يوجد استعلام */}
          {!query.trim() && (
            <div className="text-center py-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                أشهر عمليات البحث
              </h2>
              <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all shadow-sm hover:shadow"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* حالة: لا توجد نتائج */}
          {query.trim() && results.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <SearchX className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                لم نعثر على نتائج لـ &quot;{query}&quot;
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                جرّب كلمات مختلفة أو اختر من البحوث الشائعة
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
                {POPULAR_SEARCHES.slice(0, 6).map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-emerald-400 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* النتائج */}
          {query.trim() && results.length > 0 && (
            <>
              {/* شريط الفلاتر */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none mb-6 pb-1">
                {([
                  { key: "all", label: `الكل (${counts.all})` },
                  { key: "calculator", label: `حاسبات (${counts.calculator})` },
                  { key: "countdown", label: `عدادات (${counts.countdown})` },
                  { key: "article", label: `مقالات (${counts.article})` },
                  { key: "page", label: `صفحات (${counts.page})` },
                ] as const).map((f) => {
                  const count =
                    f.key === "all"
                      ? counts.all
                      : counts[f.key as keyof typeof counts];
                  if (f.key !== "all" && count === 0) return null;
                  const isActive = activeFilter === f.key;
                  return (
                    <button
                      key={f.key}
                      onClick={() => setActiveFilter(f.key as typeof activeFilter)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-400"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>

              {/* عدد النتائج */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {filteredResults.length} نتيجة للبحث عن{" "}
                <strong className="text-gray-900 dark:text-white">&quot;{query}&quot;</strong>
              </p>

              {/* قائمة النتائج */}
              <div className="space-y-3">
                {filteredResults.map((r) => {
                  const typeInfo = TYPE_LABELS[r.type];
                  return (
                    <Link
                      key={r.id}
                      href={lp(locale, r.href)}
                      className="group flex items-start gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-5 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                        {r.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeInfo.color}`}
                          >
                            {typeInfo.label}
                          </span>
                          {r.category && (
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                              {r.category}
                            </span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-gray-900 dark:text-white text-base sm:text-lg mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {r.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                          {r.description}
                        </p>
                      </div>
                      <ChevronLeft className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-emerald-600 group-hover:-translate-x-1 transition-all mt-3" />
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
