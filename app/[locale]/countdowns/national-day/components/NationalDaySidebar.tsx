"use client";

import { useMemo } from "react";
import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface NationalDaySidebarProps {
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
  { title: "عداد يوم التأسيس", href: "/countdowns/foundation-day", icon: "🏰", date: "2027-02-22" },
  { title: "عداد يوم العلم", href: "/countdowns/flag-day", icon: "🏳️", date: "2027-03-11" },
  { title: "عداد عيد الفطر", href: "/countdowns/eid-fitr", icon: "🎊", date: "2027-03-20" },
  { title: "عداد رمضان", href: "/countdowns/ramadan", icon: "🌙", date: "2027-02-18" },
];

const RELATED_CALCULATORS = [
  { title: "حاسبة الراتب", href: "/calculators/salary", icon: "💵", desc: "صافي الراتب" },
  { title: "حاسبة نهاية الخدمة", href: "/calculators/end-of-service", icon: "📋", desc: "مكافأة نهاية الخدمة" },
  { title: "حاسبة الميزانية", href: "/calculators/budget", icon: "📊", desc: "خطط لميزانيتك" },
  { title: "حاسبة الادخار", href: "/calculators/savings", icon: "🏦", desc: "خطة الادخار" },
];

const ALL_ARTICLES = [
  { title: "تاريخ توحيد المملكة العربية السعودية", category: "تاريخي", readTime: 6, href: "/blog/saudi-unification" },
  { title: "أبرز إنجازات رؤية 2030", category: "وطني", readTime: 5, href: "/blog/vision-2030" },
  { title: "دليل فعاليات اليوم الوطني", category: "ترفيهي", readTime: 4, href: "/blog/national-day-events" },
  { title: "رموز المملكة العربية السعودية", category: "ثقافي", readTime: 5, href: "/blog/saudi-symbols" },
  { title: "المشاريع العملاقة في السعودية", category: "اقتصادي", readTime: 7, href: "/blog/mega-projects" },
  { title: "كيف تخطط ميزانيتك بقاعدة 50/30/20", category: "مالي", readTime: 6, href: "/blog/budget-rule" },
  { title: "تقاليد اليوم الوطني في مناطق المملكة", category: "ثقافي", readTime: 5, href: "/blog/national-day-traditions" },
  { title: "دليل المتاحف والمواقع التراثية", category: "سياحي", readTime: 8, href: "/blog/heritage-sites" },
];

const CAT_COLORS: Record<string, string> = {
  "تاريخي": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "وطني": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "ترفيهي": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "ثقافي": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "اقتصادي": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "مالي": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "سياحي": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
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

export default function NationalDaySidebar({ locale }: NationalDaySidebarProps) {
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
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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
          className="mt-3 block text-center text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 transition-colors"
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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-snug mb-1.5">
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
