"use client";

import Link from "next/link";
import { lp } from "@/lib/utils/locale";

interface CurrencySidebarProps {
  locale: string;
}

const quickRates = [
  { flag: "\u{1F1EA}\u{1F1EC}", rate: "13.28", name: "\u062c\u0646\u064a\u0647 \u0645\u0635\u0631\u064a" },
  { flag: "\u{1F1F5}\u{1F1F0}", rate: "74.40", name: "\u0631\u0648\u0628\u064a\u0629 \u0628\u0627\u0643\u0633\u062a\u0627\u0646\u064a\u0629" },
  { flag: "\u{1F1EE}\u{1F1F3}", rate: "22.71", name: "\u0631\u0648\u0628\u064a\u0629 \u0647\u0646\u062f\u064a\u0629" },
  { flag: "\u{1F1E7}\u{1F1E9}", rate: "32.73", name: "\u062a\u0627\u0643\u0627" },
  { flag: "\u{1F1F5}\u{1F1ED}", rate: "15.21", name: "\u0628\u064a\u0633\u0648" },
  { flag: "\u{1F1FA}\u{1F1F8}", rate: "0.2667", name: "\u062f\u0648\u0644\u0627\u0631" },
  { flag: "\u{1F1E6}\u{1F1EA}", rate: "0.98", name: "\u062f\u0631\u0647\u0645 \u0625\u0645\u0627\u0631\u0627\u062a\u064a" },
  { flag: "\u{1F1F9}\u{1F1F7}", rate: "10.27", name: "\u0644\u064a\u0631\u0629 \u062a\u0631\u0643\u064a\u0629" },
];

const relatedTools = [
  { label: "\u062d\u0627\u0633\u0628\u0629 \u0627\u0644\u0632\u0643\u0627\u0629", href: "/calculators/zakat" },
  { label: "\u062d\u0627\u0633\u0628\u0629 \u0627\u0644\u0636\u0631\u064a\u0628\u0629", href: "/calculators/vat" },
  { label: "\u062d\u0627\u0633\u0628\u0629 \u0627\u0644\u0631\u0627\u062a\u0628", href: "/calculators/salary" },
  { label: "\u062d\u0627\u0633\u0628\u0629 \u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629", href: "/calculators/budget" },
];

export default function CurrencySidebar({ locale }: CurrencySidebarProps) {
  return (
    <aside className="space-y-6" dir="rtl">
      {/* Quick Rates */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-l from-green-500 to-green-600 p-4">
          <h3 className="text-white font-bold text-lg">
            {"\u0623\u0633\u0639\u0627\u0631 \u0633\u0631\u064a\u0639\u0629"}
          </h3>
          <p className="text-green-100 text-sm mt-1">
            {"1 \u0631\u064a\u0627\u0644 \u0633\u0639\u0648\u062f\u064a ="}
          </p>
        </div>
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {quickRates.map((currency) => (
            <li
              key={currency.name}
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{currency.flag}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {currency.name}
                </span>
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {currency.rate}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Important Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">
          {"\u{1f4a1} \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0645\u0647\u0645\u0629"}
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li className="flex gap-2">
            <span className="shrink-0">{"\u2022"}</span>
            <span>
              {"\u0627\u0644\u0631\u064a\u0627\u0644 \u0645\u0631\u0628\u0648\u0637 \u0628\u0627\u0644\u062f\u0648\u0644\u0627\u0631: 3.75 \u0645\u0646\u0630 1986"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0">{"\u2022"}</span>
            <span>
              {"\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u062a\u0642\u0631\u064a\u0628\u064a\u0629 \u0648\u0642\u062f \u062a\u062e\u062a\u0644\u0641 \u0639\u0646 \u0627\u0644\u0628\u0646\u0648\u0643"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0">{"\u2022"}</span>
            <span>
              {"\u0622\u062e\u0631 \u062a\u062d\u062f\u064a\u062b: \u0623\u0628\u0631\u064a\u0644 2026"}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0">{"\u2022"}</span>
            <span>
              {"\u0642\u0627\u0631\u0646 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u064a\u0646 3 \u0645\u0635\u0627\u062f\u0631 \u0642\u0628\u0644 \u0627\u0644\u062a\u062d\u0648\u064a\u0644"}
            </span>
          </li>
        </ul>
      </div>

      {/* Related Tools */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">
          {"\u0623\u062f\u0648\u0627\u062a \u0630\u0627\u062a \u0635\u0644\u0629"}
        </h3>
        <ul className="space-y-2">
          {relatedTools.map((tool) => (
            <li key={tool.href}>
              <Link
                href={lp(locale, tool.href)}
                className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
              >
                <span>{"\u2190"}</span>
                <span>{tool.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Transfer Channels */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">
          {"\u0642\u0646\u0648\u0627\u062a \u0627\u0644\u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0634\u0627\u0626\u0639\u0629"}
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li className="flex gap-2">
            <span>{"\u{1f3e6}"}</span>
            <span>
              {"\u0627\u0644\u0628\u0646\u0648\u0643 (\u0627\u0644\u0631\u0627\u062c\u062d\u064a\u060c \u0627\u0644\u0623\u0647\u0644\u064a\u060c \u0627\u0644\u0631\u064a\u0627\u0636)"}
            </span>
          </li>
          <li className="flex gap-2">
            <span>{"\u{1f4b3}"}</span>
            <span>STC Pay</span>
          </li>
          <li className="flex gap-2">
            <span>{"\u{1f310}"}</span>
            <span>{"\u0648\u064a\u0633\u062a\u0631\u0646 \u064a\u0648\u0646\u064a\u0648\u0646"}</span>
          </li>
          <li className="flex gap-2">
            <span>{"\u{1f4f1}"}</span>
            <span>
              {"\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0627\u0644\u062a\u062d\u0648\u064a\u0644 (Wise, Remitly)"}
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
