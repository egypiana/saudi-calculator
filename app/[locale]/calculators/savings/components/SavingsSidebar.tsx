"use client";

import { useMemo } from "react";
import Link from "next/link";
import { SAUDI_RATES_REFERENCE } from "@/lib/calculations/savings";

interface Props { locale: string; }

const RELATED_CALCULATORS = [
  { icon: "📊", labelAr: "حاسبة الميزانية", href: "/calculators/budget", desc: "خطط لميزانيتك الشهرية" },
  { icon: "💵", labelAr: "حاسبة الراتب", href: "/calculators/salary", desc: "صافي الراتب والتأمينات" },
  { icon: "🏠", labelAr: "حاسبة التمويل العقاري", href: "/calculators/mortgage", desc: "أقساط الرهن العقاري" },
  { icon: "🧾", labelAr: "حاسبة الضريبة", href: "/calculators/vat", desc: "القيمة المضافة 15%" },
  { icon: "🌙", labelAr: "حاسبة الزكاة", href: "/calculators/zakat", desc: "زكاة المال والذهب" },
  { icon: "🏢", labelAr: "حاسبة نهاية الخدمة", href: "/calculators/end-of-service", desc: "مكافأة نهاية الخدمة" },
];

const ALL_ARTICLES = [
  { titleAr: "كيف تخطط ميزانيتك الشهرية بقاعدة 50/30/20", category: "مالي", readTime: 6, href: "/blog/budget-rule" },
  { titleAr: "حساب مكافأة نهاية الخدمة حسب نظام العمل السعودي", category: "مالي", readTime: 8, href: "/blog/end-of-service" },
  { titleAr: "كيفية حساب التمويل العقاري وأقساط الرهن العقاري", category: "مالي", readTime: 9, href: "/blog/mortgage-calculation" },
  { titleAr: "دليل حساب زكاة المال والذهب في السعودية", category: "مالي", readTime: 7, href: "/blog/zakat-guide" },
];

const CATEGORY_COLORS: Record<string, string> = { "مالي": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" };

function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array]; let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) { s = (s * 16807 + 0) % 2147483647; const j = s % (i + 1); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
  return shuffled;
}

export default function SavingsSidebar({ locale }: Props) {
  const randomArticles = useMemo(() => shuffleArray(ALL_ARTICLES, Math.floor(Date.now() / (1000 * 60 * 60 * 24))).slice(0, 4), []);

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Investment Types */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm flex items-center gap-2"><span>📈</span>عوائد الاستثمار</h3>
        <div className="space-y-2">
          {SAUDI_RATES_REFERENCE.map((r, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-dark-bg rounded-lg px-3 py-2">
              <span className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-1.5"><span>{r.icon}</span>{r.typeAr}</span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{r.rateRange}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Tips */}
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/10 dark:to-violet-900/10 rounded-2xl border border-indigo-200 dark:border-indigo-800/40 p-5">
        <h3 className="font-bold text-indigo-800 dark:text-indigo-300 mb-3 text-sm">💡 قاعدة الادخار</h3>
        <div className="space-y-2 text-xs text-indigo-700 dark:text-indigo-400">
          <div className="flex justify-between"><span>الاحتياجات</span><span className="font-bold">50%</span></div>
          <div className="flex justify-between"><span>الرغبات</span><span className="font-bold">30%</span></div>
          <div className="flex justify-between"><span>الادخار والاستثمار</span><span className="font-bold">20%</span></div>
        </div>
        <p className="text-[10px] text-indigo-500 mt-2">* قاعدة 50/30/20 لتوزيع الدخل</p>
      </div>

      {/* Compound Interest Power */}
      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/40 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3 text-sm">⚡ قوة الفائدة المركبة</h3>
        <ul className="space-y-2 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          <li>• 1,000 ريال/شهر بعائد 7% لمدة 20 سنة = ~522,000 ريال</li>
          <li>• منها 240,000 إيداعات + 282,000 أرباح!</li>
          <li>• كلما بدأت مبكراً، زادت أرباحك بشكل أكبر</li>
          <li>• الأرباح تولّد أرباحاً إضافية كل فترة</li>
        </ul>
      </div>

      {/* Related */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2"><span>🧮</span>حاسبات ذات صلة</h3>
        <div className="space-y-1">
          {RELATED_CALCULATORS.map((calc) => (
            <Link key={calc.href} href={`/${locale}${calc.href}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
              <span className="text-xl flex-shrink-0">{calc.icon}</span>
              <div className="min-w-0"><div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{calc.labelAr}</div><div className="text-[11px] text-gray-400 truncate">{calc.desc}</div></div>
              <span className="text-gray-300 dark:text-gray-600 mr-auto text-xs">←</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2"><span>📝</span>مقالات مميزة</h3>
        <div className="space-y-3">
          {randomArticles.map((article, i) => (
            <Link key={i} href={`/${locale}${article.href}`} className="block group">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug mb-1.5">{article.titleAr}</h4>
              <div className="flex items-center gap-2"><span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || ""}`}>{article.category}</span><span className="text-[11px] text-gray-400">{article.readTime} دقائق قراءة</span></div>
              {i < randomArticles.length - 1 && <div className="border-b border-gray-100 dark:border-gray-800 mt-3" />}
            </Link>
          ))}
        </div>
        <Link href={`/${locale}/blog`} className="mt-4 block text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors">تصفح جميع المقالات &larr;</Link>
      </div>
    </aside>
  );
}
