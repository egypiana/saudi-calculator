"use client";

import { useMemo } from "react";
import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface Props {
  locale: string;
}

const RELATED_CALCULATORS = [
  { icon: "💰", labelAr: "حاسبة الزكاة", href: "/calculators/zakat", desc: "زكاة المال والذهب" },
  { icon: "🧾", labelAr: "حاسبة الضريبة المضافة", href: "/calculators/vat", desc: "VAT 15%" },
  { icon: "🏢", labelAr: "حاسبة نهاية الخدمة", href: "/calculators/end-of-service", desc: "مكافأة نهاية الخدمة" },
  { icon: "💵", labelAr: "حاسبة الراتب", href: "/calculators/salary", desc: "صافي الراتب بعد الخصومات" },
  { icon: "🏦", labelAr: "حاسبة القرض", href: "/calculators/mortgage", desc: "أقساط التمويل العقاري" },
  { icon: "📊", labelAr: "حاسبة النسبة المئوية", href: "/calculators/percentage", desc: "حساب أي نسبة مئوية" },
];

const ALL_ARTICLES = [
  { titleAr: "كيفية حساب الميراث في الإسلام وفق أحكام الفرائض", category: "شرعي", readTime: 9, href: "/blog/inheritance-calculation" },
  { titleAr: "دليل حساب زكاة المال والذهب في السعودية", category: "مالي", readTime: 7, href: "/blog/zakat-guide" },
  { titleAr: "حساب مكافأة نهاية الخدمة حسب نظام العمل السعودي", category: "مالي", readTime: 7, href: "/blog/end-of-service" },
  { titleAr: "كيف تخطط ميزانيتك الشهرية بقاعدة 50/30/20", category: "مالي", readTime: 6, href: "/blog/budget-rule" },
  { titleAr: "كيفية حساب التمويل العقاري وأقساط الرهن العقاري", category: "مالي", readTime: 8, href: "/blog/mortgage-calculation" },
  { titleAr: "فضل شهر رمضان وأهم الأعمال المستحبة فيه", category: "ديني", readTime: 8, href: "/blog/ramadan-virtues" },
  { titleAr: "كيفية حساب المعدل التراكمي GPA بدقة", category: "أدوات", readTime: 4, href: "/blog/gpa-calculation" },
  { titleAr: "كيفية حساب استهلاك وقود سيارتك وتوفير المصاريف", category: "أدوات", readTime: 5, href: "/blog/fuel-consumption" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "شرعي": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "مالي": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "أدوات": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
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

export default function InheritanceSidebar({ locale }: Props) {
  const randomArticles = useMemo(() => {
    const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return shuffleArray(ALL_ARTICLES, daySeed).slice(0, 4);
  }, []);

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Quick Shares Reference */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm flex items-center gap-2">
          <span>📖</span>
          جدول الفروض المقدرة
        </h3>
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            {[
              { fraction: "½", heirs: "بنت واحدة، أخت شقيقة واحدة" },
              { fraction: "¼", heirs: "الزوج (مع فرع)، الزوجة (بدون فرع)" },
              { fraction: "⅛", heirs: "الزوجة (مع فرع وارث)" },
              { fraction: "⅔", heirs: "بنتان فأكثر، أختان فأكثر" },
              { fraction: "⅓", heirs: "الأم (بدون فرع ولا إخوة)" },
              { fraction: "⅙", heirs: "الأب (مع فرع)، الأم (مع فرع)" },
            ].map((item) => (
              <div key={item.fraction} className="bg-gray-50 dark:bg-dark-bg rounded-lg p-2.5">
                <span className="block text-xl font-bold text-green-600 dark:text-green-400 mb-1">{item.fraction}</span>
                <span className="text-gray-500 dark:text-gray-400 leading-tight">{item.heirs}</span>
              </div>
            ))}
          </div>
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
              href={lp(locale, calc.href)}
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

      {/* Featured Articles */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>📝</span>
          مقالات مميزة
        </h3>
        <div className="space-y-3">
          {randomArticles.map((article, i) => (
            <Link key={i} href={lp(locale, article.href)} className="block group">
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
        <Link href={lp(locale, "/blog")} className="mt-4 block text-center text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
          تصفح جميع المقالات &larr;
        </Link>
      </div>
    </aside>
  );
}
