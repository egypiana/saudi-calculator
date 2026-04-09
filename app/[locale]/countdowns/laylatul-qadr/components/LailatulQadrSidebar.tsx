"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface LailatulQadrSidebarProps {
  locale: string;
}

const RELATED_COUNTDOWNS = [
  { icon: "🌙", labelAr: "العد التنازلي لرمضان", href: "/countdowns/ramadan", desc: "متى يبدأ رمضان؟" },
  { icon: "🎉", labelAr: "العد التنازلي لعيد الفطر", href: "/countdowns/eid-fitr", desc: "متى عيد الفطر؟" },
  { icon: "🐑", labelAr: "العد التنازلي لعيد الأضحى", href: "/countdowns/eid-adha", desc: "متى عيد الأضحى؟" },
];

const RELATED_CALCULATORS = [
  { icon: "💰", labelAr: "حاسبة زكاة الذهب", href: "/calculators/zakat", desc: "احسب زكاة الذهب والفضة" },
  { icon: "🕌", labelAr: "أوقات الصلاة", href: "/prayer-times", desc: "مواقيت الصلاة في مدينتك" },
  { icon: "👨‍👩‍👧‍👦", labelAr: "حاسبة الميراث", href: "/calculators/inheritance", desc: "الإرث الشرعي" },
  { icon: "💵", labelAr: "حاسبة الراتب", href: "/calculators/salary", desc: "صافي الراتب بعد الخصومات" },
];

const WORSHIP_CHECKLIST = [
  { text: "صلاة التراويح كاملة", icon: "🕌" },
  { text: "قراءة جزء من القرآن", icon: "📖" },
  { text: "دعاء ليلة القدر", icon: "🤲" },
  { text: "صلاة التهجد", icon: "🌙" },
  { text: "الاستغفار 100 مرة", icon: "📿" },
  { text: "الصدقة", icon: "💰" },
  { text: "الصلاة على النبي ﷺ", icon: "💚" },
];

export default function LailatulQadrSidebar({ locale }: LailatulQadrSidebarProps) {
  const isAr = locale === "ar";

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Worship Checklist */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border border-violet-200 dark:border-violet-800/40 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>✨</span>
          {isAr ? "قائمة عبادات ليلة القدر" : "Laylat al-Qadr Worship Checklist"}
        </h3>
        <div className="space-y-2">
          {WORSHIP_CHECKLIST.map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-violet-300 text-violet-600 focus:ring-violet-500"
              />
              <span className="text-sm flex-shrink-0">{item.icon}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Related Countdowns */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>⏰</span>
          {isAr ? "عدادات تنازلية ذات صلة" : "Related Countdowns"}
        </h3>
        <div className="space-y-1">
          {RELATED_COUNTDOWNS.map((item) => (
            <Link
              key={item.href}
              href={lp(locale, item.href)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {item.labelAr}
                </div>
                <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
                  {item.desc}
                </div>
              </div>
              <span className="text-gray-300 dark:text-gray-600 mr-auto text-xs">&larr;</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Related Calculators */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>🧮</span>
          {isAr ? "حاسبات ذات صلة" : "Related Calculators"}
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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {calc.labelAr}
                </div>
                <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
                  {calc.desc}
                </div>
              </div>
              <span className="text-gray-300 dark:text-gray-600 mr-auto text-xs">&larr;</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
