"use client";

import Link from "next/link";
import { getNextMawlid, formatArabicDate } from "@/lib/data/mawlidData";
import { lp } from "@/lib/utils/locale";

interface MawlidSidebarProps {
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
  { icon: "📿", labelAr: "العد التنازلي ليوم عاشوراء", href: "/countdowns/ashura", desc: "متى يوم عاشوراء؟" },
];

const SALAWAT_CHECKLIST = [
  { text: "الصلاة على النبي ﷺ", icon: "🤲" },
  { text: "قراءة سيرته العطرة", icon: "📖" },
  { text: "مشاركة ذكراه مع الأسرة", icon: "👨‍👩‍👧‍👦" },
  { text: "التأسي بأخلاقه ﷺ", icon: "⭐" },
  { text: "الصدقة والإحسان", icon: "💰" },
  { text: "تعليم الأبناء سيرته", icon: "🧒" },
  { text: "حضور درس عن السيرة", icon: "🕌" },
];

export default function MawlidSidebar({ locale }: MawlidSidebarProps) {
  const nextMawlid = getNextMawlid();

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Quick Info Card */}
      {nextMawlid && (
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl border border-teal-200 dark:border-teal-800/40 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
            <span>🕌</span>
            معلومات المولد النبوي القادم
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">التاريخ</span>
              <span className="text-xs font-medium text-gray-800 dark:text-white">
                {formatArabicDate(nextMawlid.mawlidDate)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">الهجري</span>
              <span className="text-xs font-medium text-gray-800 dark:text-white">
                ١٢ ربيع الأول {nextMawlid.hijriYear} هـ
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">اليوم</span>
              <span className="text-xs font-medium text-gray-800 dark:text-white">
                {nextMawlid.dayOfWeek}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">الموسم</span>
              <span className="text-xs font-medium text-gray-800 dark:text-white">
                {nextMawlid.season}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Salawat Checklist */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl border border-teal-200 dark:border-teal-800/40 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>🤲</span>
          الصلاة على النبي ﷺ
        </h3>
        <div className="space-y-2">
          {SALAWAT_CHECKLIST.map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500"
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
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
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
