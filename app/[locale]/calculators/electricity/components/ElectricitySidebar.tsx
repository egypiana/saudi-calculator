"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface Props {
  locale: string;
}

const TARIFF_TIERS = [
  { label: "الشريحة الأولى", range: "1-6,000 ك.و.س", rate: "18 هللة/ك.و.س" },
  { label: "الشريحة الثانية", range: "6,001+ ك.و.س", rate: "30 هللة/ك.و.س" },
];

const SAVING_TIPS = [
  "اضبط المكيف على 24°م",
  "استخدم لمبات LED",
  "أطفئ الأجهزة غير المستخدمة",
  "نظّف فلتر المكيف شهرياً",
  "استخدم ستائر عاكسة للحرارة",
];

const RELATED_TOOLS = [
  { labelAr: "حاسبة الضريبة", href: "/calculators/vat" },
  { labelAr: "حاسبة الميزانية", href: "/calculators/budget" },
  { labelAr: "حاسبة الراتب", href: "/calculators/salary" },
];

const FACTS = [
  "التكييف = 60-70% من الاستهلاك",
  "متوسط فاتورة الصيف: 500-1500 ريال",
  "متوسط فاتورة الشتاء: 150-400 ريال",
  "السعودية من أعلى الدول استهلاكاً للكهرباء",
];

export default function ElectricitySidebar({ locale }: Props) {
  return (
    <aside className="space-y-6 sticky top-24">
      {/* Residential Tariff Table */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-2xl border border-yellow-200 dark:border-yellow-800/40 p-5">
        <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3 text-sm">
          ⚡ التعرفة السكنية
        </h3>
        <div className="space-y-2">
          {TARIFF_TIERS.map((tier) => (
            <div
              key={tier.label}
              className="bg-white/70 dark:bg-dark-bg/50 rounded-lg px-3 py-2"
            >
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {tier.label}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {tier.range}
                </span>
                <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
                  {tier.rate}
                </span>
              </div>
            </div>
          ))}
          <div className="bg-white/70 dark:bg-dark-bg/50 rounded-lg px-3 py-2 flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">رسوم العداد</span>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">~15 ريال/شهر</span>
          </div>
          <div className="bg-white/70 dark:bg-dark-bg/50 rounded-lg px-3 py-2 flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">ضريبة القيمة المضافة</span>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">15%</span>
          </div>
        </div>
      </div>

      {/* Saving Tips */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">
          💡 نصائح توفير
        </h3>
        <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
          {SAVING_TIPS.map((tip) => (
            <li key={tip}>• {tip}</li>
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

      {/* Facts */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">
          📊 معلومات
        </h3>
        <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
          {FACTS.map((fact) => (
            <li key={fact}>• {fact}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
