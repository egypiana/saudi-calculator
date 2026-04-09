"use client";

import Link from "next/link";
import { getNextAshura, formatArabicDate } from "@/lib/data/ashuraData";
import { lp } from "@/lib/utils/locale";

interface AshuraSidebarProps {
  locale: string;
}

const RELATED_COUNTDOWNS = [
  { icon: "🌙", labelAr: "العد التنازلي لرمضان", href: "/countdowns/ramadan", desc: "متى يبدأ رمضان؟" },
  { icon: "🎉", labelAr: "العد التنازلي لعيد الفطر", href: "/countdowns/eid-fitr", desc: "متى عيد الفطر؟" },
  { icon: "🐑", labelAr: "العد التنازلي لعيد الأضحى", href: "/countdowns/eid-adha", desc: "متى عيد الأضحى؟" },
  { icon: "🕋", labelAr: "العد التنازلي للحج", href: "/countdowns/hajj", desc: "متى موسم الحج؟" },
  { icon: "✨", labelAr: "العد التنازلي لليلة القدر", href: "/countdowns/laylatul-qadr", desc: "متى ليلة القدر؟" },
  { icon: "⛰️", labelAr: "العد التنازلي ليوم عرفة", href: "/countdowns/arafah", desc: "متى يوم عرفة؟" },
  { icon: "🗓️", labelAr: "رأس السنة الهجرية", href: "/countdowns/hijri-new-year", desc: "متى رأس السنة الهجرية؟" },
];

const FASTING_TIP = [
  { text: "نية الصيام من الليل", icon: "🌙" },
  { text: "صيام تاسوعاء (٩ محرم)", icon: "📿" },
  { text: "صيام عاشوراء (١٠ محرم)", icon: "⭐" },
  { text: "صيام الحادي عشر (١١ محرم)", icon: "🌟" },
  { text: "الإكثار من الذكر والدعاء", icon: "🤲" },
  { text: "قراءة سورة طه والشعراء", icon: "📖" },
  { text: "التوسعة على الأهل", icon: "👨‍👩‍👧‍👦" },
];

export default function AshuraSidebar({ locale }: AshuraSidebarProps) {
  const nextAshura = getNextAshura();

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Quick Info Card */}
      {nextAshura && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
            <span>📿</span>
            معلومات عاشوراء القادمة
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">التاريخ</span>
              <span className="text-xs font-medium text-gray-800 dark:text-white">
                {formatArabicDate(nextAshura.ashuraDate)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">الهجري</span>
              <span className="text-xs font-medium text-gray-800 dark:text-white">
                ١٠ محرم {nextAshura.hijriYear} هـ
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">اليوم</span>
              <span className="text-xs font-medium text-gray-800 dark:text-white">
                {nextAshura.dayOfWeek}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">تاسوعاء</span>
              <span className="text-xs font-medium text-gray-800 dark:text-white">
                {formatArabicDate(nextAshura.tasua)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Fasting Tip Checklist */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>🍽️</span>
          نصائح صيام عاشوراء
        </h3>
        <div className="space-y-2">
          {FASTING_TIP.map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
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
          عدادات تنازلية ذات صلة
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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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
    </aside>
  );
}
