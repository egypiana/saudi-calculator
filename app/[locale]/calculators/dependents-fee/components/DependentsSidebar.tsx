"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface Props {
  locale: string;
}

const FEE_PER_PERSON = [
  { persons: "1", monthly: "400", annual: "4,800" },
  { persons: "2", monthly: "800", annual: "9,600" },
  { persons: "3", monthly: "1,200", annual: "14,400" },
  { persons: "4", monthly: "1,600", annual: "19,200" },
  { persons: "5", monthly: "2,000", annual: "24,000" },
];

const IMPORTANT_NOTES = [
  "يتم السداد عبر منصة أبشر أو عند تجديد الإقامة",
  "تُدفع الرسوم مقدماً عن كامل فترة التجديد",
  "المواليد الجدد معفون خلال أول 90 يوماً",
  "العاملون في القطاع الصناعي معفون منذ ديسمبر 2025",
  "حاملو الإقامة المميزة معفون من رسوم المرافقين",
];

const RELATED_TOOLS = [
  { labelAr: "حاسبة الراتب", href: "/calculators/salary" },
  { labelAr: "حاسبة الضريبة", href: "/calculators/vat" },
  { labelAr: "حاسبة الميزانية", href: "/calculators/budget" },
  { labelAr: "حاسبة مكافأة نهاية الخدمة", href: "/calculators/end-of-service" },
];

const QUICK_STATS = [
  "بدأ تطبيق الرسوم في يوليو 2017",
  "المعدل الحالي (400 ريال/شهر) ثابت منذ 2019",
  "يُقدّر عدد المرافقين والتابعين بأكثر من 10 ملايين في المملكة",
];

export default function DependentsSidebar({ locale }: Props) {
  return (
    <aside className="space-y-6 sticky top-24">
      {/* Quick Fee Reference */}
      <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 rounded-2xl border border-purple-200 dark:border-purple-800/40 p-5">
        <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-sm">
          👥 مرجع سريع للرسوم
        </h3>
        <div className="flex items-center justify-between mb-3">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">400</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">ريال/شهر</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">4,800</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">ريال/سنة</div>
          </div>
        </div>
        <div className="space-y-1.5">
          {FEE_PER_PERSON.map((row) => (
            <div
              key={row.persons}
              className="bg-white/70 dark:bg-dark-bg/50 rounded-lg px-3 py-2 flex items-center justify-between"
            >
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {row.persons} {row.persons === "1" ? "مرافق" : "مرافقين"}
              </span>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">
                {row.annual} ريال/سنة
              </span>
            </div>
          ))}
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

      {/* Quick Stats */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">
          📊 حقائق سريعة
        </h3>
        <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
          {QUICK_STATS.map((fact) => (
            <li key={fact}>• {fact}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
