"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface Props {
  locale: string;
}

const ANNUAL_COSTS = [
  { workers: "1", balanced: "8,400", unbalanced: "9,600" },
  { workers: "5", balanced: "42,000", unbalanced: "48,000" },
  { workers: "10", balanced: "84,000", unbalanced: "96,000" },
  { workers: "20", balanced: "168,000", unbalanced: "192,000" },
  { workers: "50", balanced: "420,000", unbalanced: "480,000" },
];

const IMPORTANT_NOTES = [
  "الحد الأدنى للسداد 3 أشهر",
  "القطاع الصناعي معفى من المقابل المالي منذ ديسمبر 2025",
  "المنشآت الصغيرة معفاة عن 2-4 عمال",
  "رسوم رخصة العمل 100 ريال منفصلة عن المقابل المالي",
  "نسبة السعودة تحدد فئة المقابل المالي (متوازن أو غير متوازن)",
];

const RELATED_TOOLS = [
  { labelAr: "حاسبة الراتب", href: "/calculators/salary" },
  { labelAr: "حاسبة الضريبة", href: "/calculators/vat" },
  { labelAr: "حاسبة مكافأة نهاية الخدمة", href: "/calculators/end-of-service" },
  { labelAr: "حاسبة رسوم المرافقين", href: "/calculators/dependents-fee" },
];

const QUICK_FACTS = [
  "بدأ تطبيق المقابل المالي في يناير 2018",
  "المعدل الحالي مستقر منذ 2020",
  "يُطبّق على جميع القطاعات باستثناء القطاع الصناعي",
];

export default function LaborFeeSidebar({ locale }: Props) {
  return (
    <aside className="space-y-6 sticky top-24">
      {/* Quick Rates Reference */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl border border-orange-200 dark:border-orange-800/40 p-5">
        <h3 className="font-bold text-orange-800 dark:text-orange-300 mb-3 text-sm">
          💼 مرجع سريع للمقابل المالي
        </h3>
        <div className="flex items-center justify-between mb-3">
          <div className="text-center">
            <div className="text-lg font-bold text-orange-700 dark:text-orange-300">700</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">ريال/شهر (متوازن)</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-700 dark:text-orange-300">800</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">ريال/شهر (غير متوازن)</div>
          </div>
        </div>
        <div className="space-y-1.5">
          {ANNUAL_COSTS.map((row) => (
            <div
              key={row.workers}
              className="bg-white/70 dark:bg-dark-bg/50 rounded-lg px-3 py-2 flex items-center justify-between"
            >
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {row.workers} {row.workers === "1" ? "عامل" : "عمال"}
              </span>
              <div className="flex gap-2">
                <span className="text-xs font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                  {row.balanced}
                </span>
                <span className="text-xs font-bold text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                  {row.unbalanced}
                </span>
              </div>
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
