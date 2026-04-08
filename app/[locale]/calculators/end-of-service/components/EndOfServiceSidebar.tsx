"use client";

import { useMemo } from "react";
import Link from "next/link";

interface Props {
  locale: string;
}

const RELATED_CALCULATORS = [
  { icon: "💵", labelAr: "حاسبة الراتب", href: "/calculators/salary", desc: "صافي الراتب والتأمينات" },
  { icon: "🧾", labelAr: "حاسبة الضريبة", href: "/calculators/vat", desc: "القيمة المضافة 15%" },
  { icon: "🌙", labelAr: "حاسبة الزكاة", href: "/calculators/zakat", desc: "زكاة المال والذهب" },
  { icon: "📜", labelAr: "حاسبة المواريث", href: "/calculators/inheritance", desc: "تقسيم التركة الشرعي" },
  { icon: "🏠", labelAr: "حاسبة التمويل العقاري", href: "/calculators/mortgage", desc: "أقساط الرهن العقاري" },
  { icon: "📊", labelAr: "حاسبة النسبة المئوية", href: "/calculators/percentage", desc: "حساب أي نسبة" },
];

const ALL_ARTICLES = [
  { titleAr: "حساب مكافأة نهاية الخدمة حسب نظام العمل السعودي", category: "مالي", readTime: 8, href: "/blog/end-of-service" },
  { titleAr: "كيفية حساب الميراث في الإسلام وفق أحكام الفرائض", category: "شرعي", readTime: 10, href: "/blog/inheritance-calculation" },
  { titleAr: "دليل حساب زكاة المال والذهب في السعودية", category: "مالي", readTime: 7, href: "/blog/zakat-guide" },
  { titleAr: "كيفية حساب التمويل العقاري وأقساط الرهن العقاري", category: "مالي", readTime: 9, href: "/blog/mortgage-calculation" },
  { titleAr: "كيف تخطط ميزانيتك الشهرية بقاعدة 50/30/20", category: "مالي", readTime: 6, href: "/blog/budget-rule" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "شرعي": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "مالي": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
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

export default function EndOfServiceSidebar({ locale }: Props) {
  const randomArticles = useMemo(() => {
    const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return shuffleArray(ALL_ARTICLES, daySeed).slice(0, 4);
  }, []);

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Calculation Formula */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm flex items-center gap-2">
          <span>📐</span> معادلة الحساب
        </h3>
        <div className="space-y-2 text-xs">
          <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-3">
            <p className="font-bold text-orange-700 dark:text-orange-400 mb-1">أول 5 سنوات</p>
            <p className="text-orange-600 dark:text-orange-400">نصف شهر × عدد السنوات</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3">
            <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">ما بعد 5 سنوات</p>
            <p className="text-blue-600 dark:text-blue-400">شهر كامل × عدد السنوات</p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3">
            <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">الحد الأقصى</p>
            <p className="text-gray-600 dark:text-gray-400">لا يتجاوز أجر سنتين</p>
          </div>
        </div>
      </div>

      {/* Key Articles */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl border border-orange-200 dark:border-orange-800/40 p-5">
        <h3 className="font-bold text-orange-800 dark:text-orange-300 mb-3 text-sm">⚖️ مواد النظام</h3>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between"><span className="text-orange-700 dark:text-orange-400">مادة 84</span><span className="text-orange-600 dark:text-orange-400">الاستحقاق (فصل/انتهاء)</span></div>
          <div className="flex justify-between"><span className="text-orange-700 dark:text-orange-400">مادة 85</span><span className="text-orange-600 dark:text-orange-400">حالات الاستقالة</span></div>
          <div className="flex justify-between"><span className="text-orange-700 dark:text-orange-400">مادة 86</span><span className="text-orange-600 dark:text-orange-400">استقالة المرأة</span></div>
          <div className="flex justify-between"><span className="text-orange-700 dark:text-orange-400">مادة 87</span><span className="text-orange-600 dark:text-orange-400">حساب الأجر</span></div>
          <div className="flex justify-between"><span className="text-orange-700 dark:text-orange-400">مادة 80</span><span className="text-orange-600 dark:text-orange-400">حرمان من المكافأة</span></div>
          <div className="flex justify-between"><span className="text-orange-700 dark:text-orange-400">مادة 81</span><span className="text-orange-600 dark:text-orange-400">ترك بسبب مخالفة</span></div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/40 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3 text-sm">💡 ملاحظات مهمة</h3>
        <ul className="space-y-2 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          <li>• المكافأة تُحسب على آخر أجر شامل (أساسي + بدلات)</li>
          <li>• استقالة المرأة خلال 6 أشهر من الزواج أو 3 أشهر من الولادة: مكافأة كاملة</li>
          <li>• الفصل بموجب مادة 80 (مخالفة جسيمة): لا مكافأة</li>
          <li>• يجب صرف المكافأة خلال أسبوع من انتهاء العلاقة</li>
        </ul>
      </div>

      {/* Related Calculators */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>🧮</span> حاسبات ذات صلة
        </h3>
        <div className="space-y-1">
          {RELATED_CALCULATORS.map((calc) => (
            <Link key={calc.href} href={`/${locale}${calc.href}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
              <span className="text-xl flex-shrink-0">{calc.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{calc.labelAr}</div>
                <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{calc.desc}</div>
              </div>
              <span className="text-gray-300 dark:text-gray-600 mr-auto text-xs">←</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2"><span>📝</span> مقالات مميزة</h3>
        <div className="space-y-3">
          {randomArticles.map((article, i) => (
            <Link key={i} href={`/${locale}${article.href}`} className="block group">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug mb-1.5">{article.titleAr}</h4>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || ""}`}>{article.category}</span>
                <span className="text-[11px] text-gray-400">{article.readTime} دقائق قراءة</span>
              </div>
              {i < randomArticles.length - 1 && <div className="border-b border-gray-100 dark:border-gray-800 mt-3" />}
            </Link>
          ))}
        </div>
        <Link href={`/${locale}/blog`} className="mt-4 block text-center text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors">تصفح جميع المقالات &larr;</Link>
      </div>
    </aside>
  );
}
