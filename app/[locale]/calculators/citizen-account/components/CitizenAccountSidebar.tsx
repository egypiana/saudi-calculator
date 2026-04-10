"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface Props {
  locale: string;
}

const SUPPORT_AMOUNTS = [
  { label: "رب أسرة / مستقل", amount: "720" },
  { label: "تابع (18 سنة فأكثر)", amount: "360" },
  { label: "تابع (أقل من 18 سنة)", amount: "216" },
];

const IMPORTANT_NOTES = [
  "المبالغ تقديرية فقط — استخدم الحاسبة الرسمية للحصول على المبلغ الدقيق",
  "تم تمديد البرنامج حتى نهاية عام 2026",
  "يشمل الدخل جميع مصادر الدخل المختلفة",
  "يجب تحديث البيانات بشكل دوري ومنتظم",
  "قد يتم استرداد الدعم في حال عدم صحة البيانات المقدمة",
];

const RELATED_TOOLS = [
  { labelAr: "حاسبة الراتب", href: "/calculators/salary" },
  { labelAr: "حاسبة الميزانية", href: "/calculators/budget" },
  { labelAr: "حاسبة الادخار", href: "/calculators/savings" },
  { labelAr: "حاسبة رسوم المرافقين", href: "/calculators/dependents-fee" },
];

const QUICK_FACTS = [
  "أُطلق البرنامج في ديسمبر 2017",
  "أكثر من 13 مليون مستفيد",
  "يُموَّل من ميزانية الدولة",
  "جزء من إصلاحات رؤية 2030",
];

export default function CitizenAccountSidebar({ locale }: Props) {
  return (
    <aside className="space-y-6 sticky top-24">
      {/* Support Amounts */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 p-5">
        <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3 text-sm">
          💰 مبالغ الدعم الشهرية
        </h3>
        <div className="space-y-1.5">
          {SUPPORT_AMOUNTS.map((item) => (
            <div
              key={item.label}
              className="bg-white/70 dark:bg-dark-bg/50 rounded-lg px-3 py-2 flex items-center justify-between"
            >
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {item.label}
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                {item.amount} ريال
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          موعد الصرف: اليوم 10 من كل شهر ميلادي
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">
          📌 ملاحظات مهمة
        </h3>
        <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
          {IMPORTANT_NOTES.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      </div>

      {/* Related Tools */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>🧮</span>
          أدوات ذات صلة
        </h3>
        <div className="space-y-1">
          {RELATED_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={lp(locale, tool.href)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.labelAr}
              </span>
              <span className="text-gray-300 dark:text-gray-600 text-xs">←</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Facts */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">
          📊 حقائق سريعة
        </h3>
        <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
          {QUICK_FACTS.map((fact) => (
            <li key={fact}>• {fact}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
