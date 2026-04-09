"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface ArafahSidebarProps {
  locale: string;
}

const RELATED_COUNTDOWNS = [
  { icon: "🐑", labelAr: "العد التنازلي لعيد الأضحى", href: "/countdowns/eid-adha", desc: "متى عيد الأضحى؟" },
  { icon: "🕋", labelAr: "العد التنازلي للحج", href: "/countdowns/hajj", desc: "متى موسم الحج؟" },
  { icon: "🌙", labelAr: "العد التنازلي لرمضان", href: "/countdowns/ramadan", desc: "متى يبدأ رمضان؟" },
];

const RELATED_CALCULATORS = [
  { icon: "💰", labelAr: "حاسبة الزكاة", href: "/calculators/zakat", desc: "احسب زكاة أموالك" },
  { icon: "💵", labelAr: "حاسبة الراتب", href: "/calculators/salary", desc: "صافي الراتب بعد الخصومات" },
  { icon: "👨‍👩‍👧‍👦", labelAr: "حاسبة الميراث", href: "/calculators/inheritance", desc: "الإرث الشرعي" },
];

const FASTING_CHECKLIST = [
  { text: "نية الصيام", icon: "🌙" },
  { text: "صلاة الفجر جماعة", icon: "🕌" },
  { text: "أذكار الصباح", icon: "📿" },
  { text: "قراءة القرآن", icon: "📖" },
  { text: "الدعاء بعد الظهر", icon: "🤲" },
  { text: "صلاة العصر", icon: "🕌" },
  { text: "الدعاء قبل المغرب", icon: "⏰" },
];

export default function ArafahSidebar({ locale }: ArafahSidebarProps) {
  const isAr = locale === "ar";

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Fasting Checklist */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/40 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>⛰️</span>
          {isAr ? "قائمة عبادات يوم عرفة" : "Arafat Day Worship Checklist"}
        </h3>
        <div className="space-y-2">
          {FASTING_CHECKLIST.map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
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
