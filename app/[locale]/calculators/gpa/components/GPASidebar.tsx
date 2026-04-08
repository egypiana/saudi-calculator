"use client";

import { useMemo } from "react";
import Link from "next/link";
import { GRADE_OPTIONS, SAUDI_UNIVERSITIES, type GPAScale } from "@/lib/calculations/gpa";

interface Props {
  locale: string;
  scale: GPAScale;
}

const RELATED_CALCULATORS = [
  { icon: "🎓", labelAr: "مكافأة الجامعة", href: "/countdowns/university-stipend", desc: "موعد صرف المكافأة" },
  { icon: "📊", labelAr: "حاسبة النسبة المئوية", href: "/calculators/percentage", desc: "حساب أي نسبة" },
  { icon: "💵", labelAr: "حاسبة الراتب", href: "/calculators/salary", desc: "صافي الراتب بعد الخصومات" },
  { icon: "🧾", labelAr: "حاسبة الضريبة", href: "/calculators/vat", desc: "القيمة المضافة 15%" },
  { icon: "🌙", labelAr: "حاسبة الزكاة", href: "/calculators/zakat", desc: "زكاة المال والذهب" },
  { icon: "🏠", labelAr: "حاسبة التمويل العقاري", href: "/calculators/mortgage", desc: "أقساط الرهن العقاري" },
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

export default function GPASidebar({ locale, scale }: Props) {
  const randomArticles = useMemo(() => {
    const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return shuffleArray(ALL_ARTICLES, daySeed).slice(0, 4);
  }, []);

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Grade Scale Quick Reference */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm flex items-center gap-2">
          <span>📋</span>
          جدول التقديرات ({scale})
        </h3>
        <div className="space-y-1.5">
          {GRADE_OPTIONS.map((g) => (
            <div key={g.letter} className="flex items-center justify-between bg-gray-50 dark:bg-dark-bg rounded-lg px-3 py-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{g.letter}</span>
                <span className="text-[10px] text-gray-400">{g.labelAr}</span>
              </div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                {scale === "5.0" ? g.points5 : g.points4}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Saudi Universities */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-2xl border border-purple-200 dark:border-purple-800/40 p-5">
        <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-sm">🏫 الجامعات السعودية</h3>
        <div className="space-y-1.5 text-xs">
          {SAUDI_UNIVERSITIES.map((uni, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-purple-700 dark:text-purple-400 truncate ml-2">{uni.name}</span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[10px] text-purple-500 dark:text-purple-500">{uni.city}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  uni.scale === scale
                    ? "bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}>
                  {uni.scale}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GPA Tips */}
      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/40 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3 text-sm">💡 نصائح لرفع المعدل</h3>
        <ul className="space-y-2 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          <li>• ركّز على المواد ذات الساعات الأكثر — تأثيرها أكبر على المعدل</li>
          <li>• حاول رفع تقدير مادة واحدة من B إلى B+ بدلاً من رفع عدة مواد</li>
          <li>• استفد من إعادة المواد (بعض الجامعات تحتسب الأعلى)</li>
          <li>• التسجيل في مواد الصيف يحسّن المعدل بتركيز أكبر</li>
        </ul>
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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{calc.labelAr}</div>
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
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug mb-1.5">
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
        <Link href={`/${locale}/blog`} className="mt-4 block text-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors">
          تصفح جميع المقالات &larr;
        </Link>
      </div>
    </aside>
  );
}
