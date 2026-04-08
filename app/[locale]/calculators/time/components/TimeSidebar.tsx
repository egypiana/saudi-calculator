"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";

interface Props { locale: string; }

const RELATED_CALCULATORS = [
  { icon: "🎂", labelAr: "حاسبة العمر", href: "/calculators/age", desc: "احسب عمرك بالتفصيل" },
  { icon: "🤰", labelAr: "حاسبة الحمل", href: "/calculators/pregnancy", desc: "موعد الولادة المتوقع" },
  { icon: "💰", labelAr: "حاسبة الراتب", href: "/calculators/salary", desc: "صافي الراتب والتأمينات" },
  { icon: "🏢", labelAr: "حاسبة نهاية الخدمة", href: "/calculators/end-of-service", desc: "مكافأة نهاية الخدمة" },
  { icon: "🛡️", labelAr: "حاسبة التقاعد", href: "/calculators/retirement", desc: "المعاش التقاعدي" },
  { icon: "📊", labelAr: "حاسبة الميزانية", href: "/calculators/budget", desc: "خطط لميزانيتك الشهرية" },
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

export default function TimeSidebar({ locale }: Props) {
  const randomArticles = useMemo(() => shuffleArray(ALL_ARTICLES, Math.floor(Date.now() / (1000 * 60 * 60 * 24))).slice(0, 4), []);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Live Clock */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-700 rounded-2xl p-5 text-white shadow-lg text-center">
        <h3 className="font-bold text-sky-100 mb-2 text-sm">🕐 الوقت الآن</h3>
        {now && (
          <>
            <p className="text-3xl font-bold font-mono tracking-wider">
              {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
            </p>
            <p className="text-sky-200 text-xs mt-2">
              {now.toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </>
        )}
      </div>

      {/* Time Conversions Reference */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm flex items-center gap-2"><span>📋</span>مرجع سريع</h3>
        <div className="space-y-2 text-xs">
          {[
            { from: "1 ساعة", to: "60 دقيقة = 3,600 ثانية" },
            { from: "1 يوم", to: "24 ساعة = 1,440 دقيقة" },
            { from: "1 أسبوع", to: "7 أيام = 168 ساعة" },
            { from: "1 شهر", to: "≈ 30.44 يوم = 730 ساعة" },
            { from: "1 سنة", to: "365.25 يوم = 8,766 ساعة" },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-dark-bg rounded-lg px-3 py-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">{r.from}</span>
              <span className="text-sky-600 dark:text-sky-400 text-[10px]">{r.to}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Saudi Work Hours */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/10 dark:to-blue-900/10 rounded-2xl border border-sky-200 dark:border-sky-800/40 p-5">
        <h3 className="font-bold text-sky-800 dark:text-sky-300 mb-3 text-sm">💼 ساعات العمل في السعودية</h3>
        <div className="space-y-2 text-xs text-sky-700 dark:text-sky-400">
          <div className="flex justify-between"><span>القطاع الحكومي</span><span className="font-bold">7 ساعات/يوم</span></div>
          <div className="flex justify-between"><span>القطاع الخاص</span><span className="font-bold">8 ساعات/يوم</span></div>
          <div className="flex justify-between"><span>الحد الأقصى أسبوعياً</span><span className="font-bold">48 ساعة</span></div>
          <div className="flex justify-between"><span>رمضان (مسلمين)</span><span className="font-bold">6 ساعات/يوم</span></div>
        </div>
        <p className="text-[10px] text-sky-500 mt-2">* حسب نظام العمل السعودي</p>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/40 p-5">
        <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3 text-sm">💡 نصائح لإدارة الوقت</h3>
        <ul className="space-y-2 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          <li>• استخدم تقنية بومودورو: 25 دقيقة عمل + 5 دقائق راحة</li>
          <li>• خصص أول ساعتين لأهم المهام (وقت الذروة)</li>
          <li>• قاعدة الدقيقتين: إذا كانت المهمة أقل من دقيقتين أنجزها فوراً</li>
          <li>• خطط ليومك مساء اليوم السابق</li>
        </ul>
      </div>

      {/* Related */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2"><span>🧮</span>حاسبات ذات صلة</h3>
        <div className="space-y-1">
          {RELATED_CALCULATORS.map((calc) => (
            <Link key={calc.href} href={`/${locale}${calc.href}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
              <span className="text-xl flex-shrink-0">{calc.icon}</span>
              <div className="min-w-0"><div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{calc.labelAr}</div><div className="text-[11px] text-gray-400 truncate">{calc.desc}</div></div>
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
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug mb-1.5">{article.titleAr}</h4>
              <div className="flex items-center gap-2"><span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] || ""}`}>{article.category}</span><span className="text-[11px] text-gray-400">{article.readTime} دقائق قراءة</span></div>
              {i < randomArticles.length - 1 && <div className="border-b border-gray-100 dark:border-gray-800 mt-3" />}
            </Link>
          ))}
        </div>
        <Link href={`/${locale}/blog`} className="mt-4 block text-center text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 transition-colors">تصفح جميع المقالات &larr;</Link>
      </div>
    </aside>
  );
}
