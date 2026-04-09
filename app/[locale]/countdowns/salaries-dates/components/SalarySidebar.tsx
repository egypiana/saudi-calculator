"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { lp } from "@/lib/utils/locale";
import {
  getNextGovSalary,
  getNextMonthlyDate,
  formatDateAr,
  getDayName,
  PAYMENT_TYPES,
} from "@/lib/data/salaryDatesData";

const BORDER_COLORS: Record<string, string> = {
  government: "border-emerald-500",
  "citizen-account": "border-violet-500",
  pension: "border-sky-500",
  hafiz: "border-amber-500",
};

const BG_COLORS: Record<string, string> = {
  government: "bg-emerald-50 dark:bg-emerald-900/20",
  "citizen-account": "bg-violet-50 dark:bg-violet-900/20",
  pension: "bg-sky-50 dark:bg-sky-900/20",
  hafiz: "bg-amber-50 dark:bg-amber-900/20",
};

const TEXT_COLORS: Record<string, string> = {
  government: "text-emerald-700 dark:text-emerald-400",
  "citizen-account": "text-violet-700 dark:text-violet-400",
  pension: "text-sky-700 dark:text-sky-400",
  hafiz: "text-amber-700 dark:text-amber-400",
};

const IMPORTANT_LINKS = [
  { nameAr: "وزارة المالية", url: "https://www.mof.gov.sa", icon: "🏛️" },
  { nameAr: "التأمينات الاجتماعية", url: "https://www.gosi.gov.sa", icon: "🛡️" },
  { nameAr: "حساب المواطن", url: "https://www.ca.gov.sa", icon: "🏦" },
  { nameAr: "صندوق هدف", url: "https://www.hrdf.org.sa", icon: "📋" },
  { nameAr: "نظام فارس", url: "https://fareshr.moe.gov.sa", icon: "💻" },
  { nameAr: "منصة مدد", url: "https://mudad.com.sa", icon: "📊" },
];

const RELATED_TOOLS = [
  { nameAr: "حاسبة الراتب", href: "/calculators/salary", icon: "💰" },
  { nameAr: "حاسبة نهاية الخدمة", href: "/calculators/end-of-service", icon: "🏢" },
  { nameAr: "حاسبة الميزانية", href: "/calculators/budget", icon: "📊" },
  { nameAr: "حاسبة ضريبة القيمة المضافة", href: "/calculators/vat", icon: "🧾" },
];

const OTHER_COUNTDOWNS = [
  { nameAr: "حساب المواطن", href: "/countdowns/citizen-account", icon: "🏦" },
  { nameAr: "التقاعد", href: "/countdowns/pension-salaries", icon: "🏛️" },
  { nameAr: "الضمان الاجتماعي", href: "/countdowns/social-security", icon: "🛡️" },
  { nameAr: "ساند", href: "/countdowns/saned-payment", icon: "📋" },
];

function getNextDateForType(typeId: string): string | null {
  switch (typeId) {
    case "government": {
      const next = getNextGovSalary();
      return next?.depositDate ?? null;
    }
    case "citizen-account":
      return getNextMonthlyDate(10);
    case "pension":
      return getNextMonthlyDate(25);
    case "hafiz":
      return getNextMonthlyDate(5);
    default:
      return null;
  }
}

function getDaysRemaining(date: string): number {
  return Math.ceil(
    (new Date(date + "T00:00:00").getTime() - Date.now()) / 86400000
  );
}

export default function SalarySidebar() {
  const locale = useLocale();

  return (
    <aside className="space-y-6 sticky top-24">
      {/* Next Payment Dates */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>📅</span>
          القادم
        </h3>
        <div className="space-y-3">
          {PAYMENT_TYPES.map((type) => {
            const nextDate = getNextDateForType(type.id);
            if (!nextDate) return null;
            const daysLeft = getDaysRemaining(nextDate);

            return (
              <div
                key={type.id}
                className={`rounded-xl border-r-4 ${BORDER_COLORS[type.id]} ${BG_COLORS[type.id]} p-3`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg flex-shrink-0">{type.icon}</span>
                  <span className={`text-sm font-semibold ${TEXT_COLORS[type.id]}`}>
                    {type.nameAr}
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mr-7">
                  <div>{getDayName(nextDate)}، {formatDateAr(nextDate)}</div>
                  <div className="mt-1 font-medium">
                    {daysLeft <= 0 ? (
                      <span className="text-green-600 dark:text-green-400">اليوم!</span>
                    ) : (
                      <span>
                        باقي{" "}
                        <span className={`font-bold ${TEXT_COLORS[type.id]}`}>
                          {daysLeft}
                        </span>{" "}
                        {daysLeft === 1 ? "يوم" : "يوم"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Important Links */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>🔗</span>
          روابط مهمة
        </h3>
        <div className="space-y-1">
          {IMPORTANT_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <span className="text-lg flex-shrink-0">{link.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {link.nameAr}
              </span>
              <span className="text-gray-300 dark:text-gray-600 mr-auto text-xs">↗</span>
            </a>
          ))}
        </div>
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <span className="text-lg flex-shrink-0">{tool.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {tool.nameAr}
              </span>
              <span className="text-gray-300 dark:text-gray-600 mr-auto text-xs">←</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Other Countdowns */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm flex items-center gap-2">
          <span>⏳</span>
          عدادات أخرى
        </h3>
        <div className="space-y-1">
          {OTHER_COUNTDOWNS.map((item) => (
            <Link
              key={item.href}
              href={lp(locale, item.href)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {item.nameAr}
              </span>
              <span className="text-gray-300 dark:text-gray-600 mr-auto text-xs">←</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
