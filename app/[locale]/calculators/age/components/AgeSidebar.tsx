"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface Props {
  locale: string;
}

const FEATURES = [
  "حساب العمر بالتقويمين الهجري والميلادي",
  "إحصائيات حياتك بالأرقام",
  "معرفة برجك الفلكي",
  "عمرك على الكواكب الأخرى",
  "حساب فرق العمر بين شخصين",
  "عداد مباشر للعمر بالثواني",
];

const AGE_MILESTONES = [
  "مليار ثانية من عمرك ≈ 31.7 سنة",
  "10,000 يوم من عمرك ≈ 27.4 سنة",
  "العمر الهجري = العمر الميلادي × 1.03 تقريباً",
];

const FUN_FACTS = [
  "قلب الإنسان ينبض حوالي 2.5 مليار مرة في حياته",
  "يتنفس الإنسان حوالي 600 مليون نَفَس في حياته",
  "يقضي الإنسان حوالي 25 سنة نائماً",
  "يمشي الإنسان حوالي 100,000 كم في حياته",
];

const RELATED_TOOLS = [
  { labelAr: "حاسبة الحمل", href: "/calculators/pregnancy" },
  { labelAr: "حاسبة كتلة الجسم", href: "/calculators/bmi" },
  { labelAr: "التقويم الهجري", href: "/hijri-calendar" },
  { labelAr: "حاسبة الوقت", href: "/calculators/time" },
];

const BIRTH_FACTS = [
  "يولد حوالي 385,000 طفل يومياً حول العالم",
  "شهر سبتمبر هو أكثر الأشهر ولادة",
  "يوم الثلاثاء هو أكثر أيام الأسبوع ولادة",
];

export default function AgeSidebar({ locale }: Props) {
  return (
    <aside className="space-y-6 sticky top-24">
      {/* Quick Info Card */}
      <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 rounded-2xl border border-purple-200 dark:border-purple-800/40 p-5">
        <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3 text-sm">
          🧬 حاسبة العمر الشاملة
        </h3>
        <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
          {FEATURES.map((feature) => (
            <li key={feature}>• {feature}</li>
          ))}
        </ul>
      </div>

      {/* Age Milestones */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">
          🎯 محطات عمرية مثيرة
        </h3>
        <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
          {AGE_MILESTONES.map((milestone) => (
            <li key={milestone}>• {milestone}</li>
          ))}
        </ul>
      </div>

      {/* Fun Facts */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">
          💡 حقائق ممتعة
        </h3>
        <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
          {FUN_FACTS.map((fact) => (
            <li key={fact}>• {fact}</li>
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

      {/* Did You Know */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">
          🌍 هل تعلم؟
        </h3>
        <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
          {BIRTH_FACTS.map((fact) => (
            <li key={fact}>• {fact}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
