"use client";

import { useMemo } from "react";
import Link from "next/link";
import { RETIREMENT_AGES_REF } from "@/lib/calculations/retirement";
import { lp } from "@/lib/utils/locale";

interface Props { locale: string; }

const RELATED_CALCULATORS = [
  { icon: "💰", labelAr: "حاسبة الراتب", href: "/calculators/salary", desc: "صافي الراتب والتأمينات" },
  { icon: "🏢", labelAr: "حاسبة نهاية الخدمة", href: "/calculators/end-of-service", desc: "مكافأة نهاية الخدمة" },
  { icon: "🏦", labelAr: "حاسبة الادخار", href: "/calculators/savings", desc: "الفائدة المركبة والادخار" },
  { icon: "🕌", labelAr: "حاسبة الزكاة", href: "/calculators/zakat", desc: "زكاة المال والذهب" },
  { icon: "📊", labelAr: "حاسبة الميزانية", href: "/calculators/budget", desc: "خطط لميزانيتك الشهرية" },
  { icon: "🧾", labelAr: "حاسبة الضريبة", href: "/calculators/vat", desc: "القيمة المضافة 15%" },
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

export default function RetirementSidebar({ locale }: Props) {
  const randomArticles = useMemo(() => shuffleArray(ALL_ARTICLES, Math.floor(Date.now() / (1000 * 60 * 60 * 24))).slice(0, 4), []);

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Retirement Ages */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm flex items-center gap-2"><span>📋</span>سن التقاعد النظامي</h3>
        <div className="space-y-2">
          {RETIREMENT_AGES_REF.map((r, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-dark-bg rounded-lg px-3 py-2">
              <span className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-1.5"><span>{r.icon}</span>{r.sectorAr}</span>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{r.age} سنة</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pension Formula */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/10 rounded-2xl border border-teal-200 dark:border-teal-800/40 p-5">
        <h3 className="font-bold text-teal-800 dark:text-teal-300 mb-3 text-sm">🧮 معادلة حساب المعاش</h3>
        <div className="bg-white dark:bg-dark-bg rounded-lg p-3 text-center mb-3">
          <p className="text-sm font-bold text-teal-700 dark:text-teal-400 font-mono">(الراتب × أشهر الخدمة) ÷ 480</p>
        </div>
        <div className="space-y-1.5 text-xs text-teal-700 dark:text-teal-400">
          <div className="flex justify-between"><span>10 سنوات</span><span className="font-bold">25%</span></div>
          <div className="flex justify-between"><span>20 سنة</span><span className="font-bold">50%</span></div>
          <div className="flex justify-between"><span>30 سنة</span><span className="font-bold">75%</span></div>
          <div className="flex justify-between"><span>32 سنة</span><span className="font-bold">80% (الحد الأقصى)</span></div>
        </div>
      </div>

      {/* Key Facts */}
      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/40 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3 text-sm">⚡ معلومات مهمة</h3>
        <ul className="space-y-2 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          <li>• الحد الأقصى للمعاش = 80% من آخر راتب</li>
          <li>• الحد الأدنى للمعاش = 1,984 ريال</li>
          <li>• سقف اشتراك التأمينات = 45,000 ريال</li>
          <li>• إضافة المعالين: حتى 20% إضافية</li>
          <li>• التقاعد المبكر: خصم 5% لكل سنة</li>
        </ul>
      </div>

      {/* Useful Links */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm flex items-center gap-2"><span>🔗</span>روابط مفيدة</h3>
        <div className="space-y-2">
          <a href="https://www.gosi.gov.sa" target="_blank" rel="noopener noreferrer" className="block text-xs text-teal-600 dark:text-teal-400 hover:underline">🏢 التأمينات الاجتماعية (GOSI)</a>
          <a href="https://www.pension.gov.sa" target="_blank" rel="noopener noreferrer" className="block text-xs text-teal-600 dark:text-teal-400 hover:underline">🏛️ المؤسسة العامة للتقاعد</a>
          <a href="https://hrsd.gov.sa" target="_blank" rel="noopener noreferrer" className="block text-xs text-teal-600 dark:text-teal-400 hover:underline">📋 وزارة الموارد البشرية</a>
        </div>
      </div>

      {/* Related */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2"><span>🧮</span>حاسبات ذات صلة</h3>
        <div className="space-y-1">
          {RELATED_CALCULATORS.map((calc) => (
            <Link key={calc.href} href={lp(locale, calc.href)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
              <span className="text-xl flex-shrink-0">{calc.icon}</span>
              <div className="min-w-0"><div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{calc.labelAr}</div><div className="text-[11px] text-gray-400 truncate">{calc.desc}</div></div>
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
            <Link key={i} href={lp(locale, article.href)} className="block group">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug mb-1.5">{article.titleAr}</h4>
              <div className="flex items-center gap-2"><span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || ""}`}>{article.category}</span><span className="text-[11px] text-gray-400">{article.readTime} دقائق قراءة</span></div>
              {i < randomArticles.length - 1 && <div className="border-b border-gray-100 dark:border-gray-800 mt-3" />}
            </Link>
          ))}
        </div>
        <Link href={lp(locale, "/blog")} className="mt-4 block text-center text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 transition-colors">تصفح جميع المقالات &larr;</Link>
      </div>
    </aside>
  );
}
