"use client";

import { useMemo } from "react";
import Link from "next/link";
import { GOSI_RATES, GOSI_MAX_SALARY } from "@/lib/calculations/salary";

interface Props {
  locale: string;
}

const RELATED_CALCULATORS = [
  { icon: "🏢", labelAr: "حاسبة نهاية الخدمة", href: "/calculators/end-of-service", desc: "مكافأة نهاية الخدمة" },
  { icon: "🧾", labelAr: "حاسبة الضريبة", href: "/calculators/vat", desc: "القيمة المضافة 15%" },
  { icon: "🌙", labelAr: "حاسبة الزكاة", href: "/calculators/zakat", desc: "زكاة المال والذهب" },
  { icon: "📊", labelAr: "حاسبة النسبة المئوية", href: "/calculators/percentage", desc: "حساب أي نسبة" },
  { icon: "🏠", labelAr: "حاسبة التمويل العقاري", href: "/calculators/mortgage", desc: "أقساط الرهن العقاري" },
  { icon: "🎓", labelAr: "حاسبة المعدل التراكمي", href: "/calculators/gpa", desc: "حساب GPA" },
];

const SALARY_DATES = [
  { icon: "💰", labelAr: "رواتب القطاع الحكومي", day: "27 من كل شهر", href: "/countdowns/salaries-dates" },
  { icon: "🏦", labelAr: "حساب المواطن", day: "10 من كل شهر", href: "/countdowns/citizen-account" },
  { icon: "👴", labelAr: "رواتب المتقاعدين", day: "25 من كل شهر", href: "/countdowns/pension-salaries" },
  { icon: "🛡️", labelAr: "التأمينات الاجتماعية", day: "1 من كل شهر", href: "/countdowns/social-security" },
  { icon: "📚", labelAr: "مكافأة الجامعة", day: "الأسبوع الأخير", href: "/countdowns/university-stipend" },
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

export default function SalarySidebar({ locale }: Props) {
  const randomArticles = useMemo(() => {
    const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return shuffleArray(ALL_ARTICLES, daySeed).slice(0, 4);
  }, []);

  return (
    <aside className="space-y-6 sticky top-24">
      {/* GOSI Rates */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm flex items-center gap-2">
          <span>🏛️</span>
          نسب التأمينات الاجتماعية
        </h3>
        <div className="space-y-3">
          <div className="bg-teal-50 dark:bg-teal-900/10 rounded-lg p-3">
            <p className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-1.5">🇸🇦 سعودي</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-teal-600 dark:text-teal-400">الموظف</span><span className="font-bold">{(GOSI_RATES.saudi.employee * 100).toFixed(2)}%</span></div>
              <div className="flex justify-between"><span className="text-teal-600 dark:text-teal-400">صاحب العمل</span><span className="font-bold">{(GOSI_RATES.saudi.employer * 100).toFixed(2)}%</span></div>
              <div className="flex justify-between border-t border-teal-200 dark:border-teal-800 pt-1"><span className="text-teal-700 dark:text-teal-300 font-bold">الإجمالي</span><span className="font-bold">{((GOSI_RATES.saudi.employee + GOSI_RATES.saudi.employer) * 100).toFixed(2)}%</span></div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-3">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">🌍 غير سعودي</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">الموظف</span><span className="font-bold">0%</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">صاحب العمل</span><span className="font-bold">{(GOSI_RATES.nonSaudi.employer * 100)}%</span></div>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 text-center">الحد الأقصى للراتب الخاضع: {GOSI_MAX_SALARY.toLocaleString("ar-SA")} ريال</p>
        </div>
      </div>

      {/* Salary Dates */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10 rounded-2xl border border-teal-200 dark:border-teal-800/40 p-5">
        <h3 className="font-bold text-teal-800 dark:text-teal-300 mb-3 text-sm">📅 مواعيد الصرف</h3>
        <div className="space-y-2">
          {SALARY_DATES.map((item) => (
            <Link key={item.href} href={`/${locale}${item.href}`} className="flex items-center justify-between group">
              <span className="text-xs text-teal-700 dark:text-teal-400 group-hover:text-teal-500 flex items-center gap-1.5">
                <span>{item.icon}</span> {item.labelAr}
              </span>
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">{item.day}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Facts */}
      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/40 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3 text-sm">💡 هل تعلم؟</h3>
        <ul className="space-y-2 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          <li>• الحد الأدنى لأجور السعوديين: 4,000 ريال</li>
          <li>• نسبة توطين نطاقات الأخضر المتوسط: 40%+</li>
          <li>• ساعات العمل النظامية: 8 ساعات/يوم (48 أسبوعياً)</li>
          <li>• في رمضان: 6 ساعات/يوم (36 أسبوعياً)</li>
          <li>• الإجازة السنوية: 21 يوماً (30 بعد 5 سنوات)</li>
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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{calc.labelAr}</div>
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
          <span>📝</span> مقالات مميزة
        </h3>
        <div className="space-y-3">
          {randomArticles.map((article, i) => (
            <Link key={i} href={`/${locale}${article.href}`} className="block group">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug mb-1.5">
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
        <Link href={`/${locale}/blog`} className="mt-4 block text-center text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 transition-colors">
          تصفح جميع المقالات &larr;
        </Link>
      </div>
    </aside>
  );
}
