"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface HijriNewYearSidebarProps {
  locale: string;
}

const RELATED_COUNTDOWNS = [
  { icon: "🌙", labelAr: "العد التنازلي لرمضان", href: "/countdowns/ramadan", desc: "متى يبدأ رمضان؟" },
  { icon: "🎉", labelAr: "العد التنازلي لعيد الفطر", href: "/countdowns/eid-fitr", desc: "متى عيد الفطر؟" },
  { icon: "🕋", labelAr: "العد التنازلي للحج", href: "/countdowns/hajj", desc: "متى موسم الحج؟" },
];

const RELATED_CALCULATORS = [
  { icon: "📅", labelAr: "التقويم الهجري", href: "/hijri-calendar", desc: "تحويل التاريخ الهجري" },
  { icon: "💰", labelAr: "حاسبة الزكاة", href: "/calculators/zakat", desc: "احسب زكاة أموالك" },
  { icon: "🎂", labelAr: "حاسبة العمر", href: "/calculators/age", desc: "احسب عمرك بالهجري والميلادي" },
];

const MUHARRAM_CHECKLIST = [
  { text: "نية صيام محرم", icon: "🌙" },
  { text: "صيام تاسوعاء وعاشوراء", icon: "🕌" },
  { text: "التوبة والاستغفار", icon: "🔄" },
  { text: "الدعاء", icon: "🤲" },
  { text: "الصدقة", icon: "💰" },
  { text: "قراءة سيرة الهجرة", icon: "📖" },
  { text: "تحديد أهداف العام", icon: "🎯" },
];

export default function HijriNewYearSidebar({ locale }: HijriNewYearSidebarProps) {
  const isAr = locale === "ar";

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Muharram Checklist */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800/40 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>🗓️</span>
          {isAr ? "قائمة عبادات شهر محرم" : "Muharram Worship Checklist"}
        </h3>
        <div className="space-y-2">
          {MUHARRAM_CHECKLIST.map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
