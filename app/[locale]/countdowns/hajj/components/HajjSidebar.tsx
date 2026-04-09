"use client";

import { useMemo } from "react";
import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface HajjSidebarProps {
  locale: string;
}

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T00:00:00").getTime();
  return Math.max(0, Math.ceil((target - Date.now()) / 86400000));
}

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

const RELATED_COUNTDOWNS = [
  { title: "عداد عيد الأضحى", href: "/countdowns/eid-adha", icon: "🐑", date: "2026-05-27" },
  { title: "عداد رمضان المبارك", href: "/countdowns/ramadan", icon: "🌙", date: "2027-02-08" },
  { title: "عداد عيد الفطر", href: "/countdowns/eid-fitr", icon: "🎊", date: "2026-03-20" },
  { title: "عداد اليوم الوطني", href: "/countdowns/national-day", icon: "🇸🇦", date: "2026-09-23" },
];

const RELATED_CALCULATORS = [
  { title: "حاسبة الزكاة", href: "/calculators/zakat", icon: "💰", desc: "احسب زكاتك بدقة" },
  { title: "حاسبة الميراث", href: "/calculators/inheritance", icon: "📜", desc: "الإرث الشرعي" },
  { title: "حاسبة الميزانية", href: "/calculators/budget", icon: "📊", desc: "خطط لميزانية الحج" },
  { title: "حاسبة الادخار", href: "/calculators/savings", icon: "🏦", desc: "ادخر لتكاليف الحج" },
];

const ALL_ARTICLES = [
  { title: "دليل مناسك الحج خطوة بخطوة", category: "إسلامي", readTime: 8, href: "/blog/hajj-guide" },
  { title: "كيف تستعد صحياً لموسم الحج", category: "صحي", readTime: 5, href: "/blog/hajj-health" },
  { title: "ميزانية الحج: كيف تخطط مالياً", category: "مالي", readTime: 4, href: "/blog/hajj-budget" },
  { title: "فضل يوم عرفة وأعمال العشر من ذي الحجة", category: "إسلامي", readTime: 6, href: "/blog/arafah-virtues" },
  { title: "أدعية الحج والعمرة المأثورة", category: "إسلامي", readTime: 5, href: "/blog/hajj-duas" },
  { title: "نصائح للحاج المبتدئ", category: "إرشادي", readTime: 7, href: "/blog/first-hajj-tips" },
  { title: "تاريخ الحج عبر العصور", category: "ثقافي", readTime: 6, href: "/blog/hajj-history" },
  { title: "أحكام الأضحية وشروطها", category: "إسلامي", readTime: 4, href: "/blog/udhiyah-rules" },
];

const CAT_COLORS: Record<string, string> = {
  "إسلامي": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "مالي": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "صحي": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  "ثقافي": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "إرشادي": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
};

function shuffleArray<T>(arr: T[], seed: number): T[] {
  const s = [...arr];
  let r = seed;
  for (let i = s.length - 1; i > 0; i--) {
    r = (r * 16807) % 2147483647;
    const j = r % (i + 1);
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

export default function HajjSidebar({ locale }: HajjSidebarProps) {
  const randomArticles = useMemo(() => {
    const daySeed = Math.floor(Date.now() / 86400000);
    return shuffleArray(ALL_ARTICLES, daySeed).slice(0, 4);
  }, []);

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Related Countdowns */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>🔗</span> عدادات ذات صلة
        </h3>
        <div className="space-y-1.5">
          {RELATED_COUNTDOWNS.map((item) => {
            const days = getDaysUntil(item.date);
            return (
              <Link
                key={item.href}
                href={lp(locale, item.href)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </span>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  {days > 0 ? `${toAr(days)} يوم` : "قريباً"}
                </span>
              </Link>
            );
          })}
        </div>
        <Link
          href={lp(locale, "/countdowns")}
          className="mt-3 block text-center text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
        >
          عرض جميع العدادات &larr;
        </Link>
      </div>

      {/* Related Calculators */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>🧮</span> حاسبات مقترحة
        </h3>
        <div className="space-y-1">
          {RELATED_CALCULATORS.map((calc) => (
            <Link
              key={calc.href}
              href={lp(locale, calc.href)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <span className="text-xl flex-shrink-0">{calc.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {calc.title}
                </div>
                <div className="text-[11px] text-gray-400 dark:text-gray-500">{calc.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>📝</span> مقالات مميزة
        </h3>
        <div className="space-y-3">
          {randomArticles.map((article, i) => (
            <Link key={i} href={lp(locale, article.href)} className="block group">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-1.5">
                {article.title}
              </h4>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CAT_COLORS[article.category] || "bg-gray-100 text-gray-600"}`}>
                  {article.category}
                </span>
                <span className="text-[11px] text-gray-400">{article.readTime} دقائق قراءة</span>
              </div>
              {i < randomArticles.length - 1 && (
                <div className="border-b border-gray-100 dark:border-gray-800 mt-3" />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Slot */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="w-full h-[250px] bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center">
          <span className="text-gray-300 dark:text-gray-600 text-sm">إعلان</span>
        </div>
      </div>
    </aside>
  );
}
