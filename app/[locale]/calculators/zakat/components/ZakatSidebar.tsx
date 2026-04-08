"use client";

import { useMemo } from "react";
import Link from "next/link";

interface Props {
  locale: string;
}

const RELATED_CALCULATORS = [
  { icon: "📜", labelAr: "حاسبة المواريث", href: "/calculators/inheritance", desc: "تقسيم التركة الشرعي" },
  { icon: "🏢", labelAr: "حاسبة نهاية الخدمة", href: "/calculators/end-of-service", desc: "مكافأة نهاية الخدمة" },
  { icon: "💵", labelAr: "حاسبة الراتب", href: "/calculators/salary", desc: "صافي الراتب بعد الخصومات" },
  { icon: "🧾", labelAr: "حاسبة الضريبة", href: "/calculators/vat", desc: "القيمة المضافة 15%" },
  { icon: "📊", labelAr: "حاسبة النسبة المئوية", href: "/calculators/percentage", desc: "حساب أي نسبة" },
  { icon: "🏠", labelAr: "حاسبة التمويل العقاري", href: "/calculators/mortgage", desc: "أقساط الرهن العقاري" },
];

const NISAB_REFERENCE = [
  { type: "الذهب", nisab: "85 غرام", icon: "🥇" },
  { type: "الفضة", nisab: "595 غرام", icon: "🪙" },
  { type: "الزروع", nisab: "653 كغ", icon: "🌾" },
  { type: "الإبل", nisab: "5 رؤوس", icon: "🐪" },
  { type: "البقر", nisab: "30 رأساً", icon: "🐄" },
  { type: "الغنم", nisab: "40 رأساً", icon: "🐑" },
];

const ALL_ARTICLES = [
  { titleAr: "كيفية حساب الميراث في الإسلام وفق أحكام الفرائض", category: "شرعي", readTime: 10, href: "/blog/inheritance-calculation" },
  { titleAr: "دليل حساب زكاة المال والذهب في السعودية", category: "مالي", readTime: 7, href: "/blog/zakat-guide" },
  { titleAr: "حساب مكافأة نهاية الخدمة حسب نظام العمل السعودي", category: "مالي", readTime: 8, href: "/blog/end-of-service" },
  { titleAr: "كيفية حساب التمويل العقاري وأقساط الرهن العقاري", category: "مالي", readTime: 9, href: "/blog/mortgage-calculation" },
  { titleAr: "فضل شهر رمضان وأهم الأعمال المستحبة فيه", category: "ديني", readTime: 8, href: "/blog/ramadan-virtues" },
  { titleAr: "كيف تخطط ميزانيتك الشهرية بقاعدة 50/30/20", category: "مالي", readTime: 6, href: "/blog/budget-rule" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "شرعي": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "مالي": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "ديني": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ZakatSidebar({ locale }: Props) {
  const randomArticles = useMemo(() => {
    const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return shuffleArray(ALL_ARTICLES, daySeed).slice(0, 4);
  }, []);

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Nisab Reference */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm flex items-center gap-2">
          <span>📖</span>
          جدول النِّصاب
        </h3>
        <div className="space-y-2">
          {NISAB_REFERENCE.map((item) => (
            <div key={item.type} className="flex items-center justify-between bg-gray-50 dark:bg-dark-bg rounded-lg px-3 py-2">
              <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <span>{item.icon}</span> {item.type}
              </span>
              <span className="text-xs font-bold text-green-600 dark:text-green-400">{item.nisab}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Zakat Rates Quick Reference */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl border border-green-200 dark:border-green-800/40 p-5">
        <h3 className="font-bold text-green-800 dark:text-green-300 mb-3 text-sm">🌙 نسب الزكاة</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-green-700 dark:text-green-400">المال والذهب والفضة</span><span className="font-bold text-green-800 dark:text-green-300">2.5%</span></div>
          <div className="flex justify-between"><span className="text-green-700 dark:text-green-400">الزروع (مطر)</span><span className="font-bold text-green-800 dark:text-green-300">10%</span></div>
          <div className="flex justify-between"><span className="text-green-700 dark:text-green-400">الزروع (ري صناعي)</span><span className="font-bold text-green-800 dark:text-green-300">5%</span></div>
          <div className="flex justify-between"><span className="text-green-700 dark:text-green-400">الزروع (مختلط)</span><span className="font-bold text-green-800 dark:text-green-300">7.5%</span></div>
        </div>
      </div>

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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{calc.labelAr}</div>
                <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{calc.desc}</div>
              </div>
              <span className="text-gray-300 dark:text-gray-600 mr-auto text-xs">←</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>📝</span>
          مقالات مميزة
        </h3>
        <div className="space-y-3">
          {randomArticles.map((article, i) => (
            <Link key={i} href={`/${locale}${article.href}`} className="block group">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-snug mb-1.5">
                {article.titleAr}
              </h4>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || "bg-gray-100 text-gray-600"}`}>
                  {article.category}
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">{article.readTime} دقائق قراءة</span>
              </div>
              {i < randomArticles.length - 1 && <div className="border-b border-gray-100 dark:border-gray-800 mt-3" />}
            </Link>
          ))}
        </div>
        <Link href={`/${locale}/blog`} className="mt-4 block text-center text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 transition-colors">
          تصفح جميع المقالات &larr;
        </Link>
      </div>
    </aside>
  );
}
