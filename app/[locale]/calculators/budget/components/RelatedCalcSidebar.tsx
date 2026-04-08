"use client";

import Link from "next/link";
import { Calculator, Banknote, Building2, Home, Scale, Coins } from "lucide-react";

interface RelatedCalcSidebarProps {
  locale: string;
}

const relatedTools = [
  { icon: Banknote, labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
  { icon: Building2, labelAr: "حاسبة نهاية الخدمة", labelEn: "End of Service", href: "/calculators/end-of-service", color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-900/20" },
  { icon: Home, labelAr: "حاسبة التمويل العقاري", labelEn: "Mortgage Calculator", href: "/calculators/mortgage", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
  { icon: Coins, labelAr: "حاسبة الزكاة", labelEn: "Zakat Calculator", href: "/calculators/zakat", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  { icon: Scale, labelAr: "حاسبة الضريبة", labelEn: "VAT Calculator", href: "/calculators/vat", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { icon: Calculator, labelAr: "حاسبة BMI", labelEn: "BMI Calculator", href: "/calculators/bmi", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20" },
];

export default function RelatedCalcSidebar({ locale }: RelatedCalcSidebarProps) {
  const isAr = locale === "ar";

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm sticky top-24">
      <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
        <Calculator className="h-4 w-4 text-primary-600 dark:text-primary-400" />
        {isAr ? "حاسبات ذات صلة" : "Related Calculators"}
      </h3>
      <div className="space-y-2">
        {relatedTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={`/${locale}${tool.href}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className={`w-8 h-8 rounded-lg ${tool.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-4 w-4 ${tool.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {isAr ? tool.labelAr : tool.labelEn}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Quick tip */}
      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-800">
          <p className="text-xs font-bold text-primary-700 dark:text-primary-300 mb-1">💡 نصيحة سريعة</p>
          <p className="text-xs text-primary-600 dark:text-primary-400 leading-relaxed">
            {isAr
              ? "استخدم حاسبة الراتب أولاً لمعرفة صافي دخلك بعد التأمينات، ثم استخدم هذه الحاسبة لتوزيع الميزانية."
              : "Use the Salary Calculator first to find your net income after GOSI, then use this calculator to plan your budget."}
          </p>
        </div>
      </div>
    </div>
  );
}
