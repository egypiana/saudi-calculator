"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import {
  GOV_SALARY_DATES,
  getCitizenAccountDates,
  getPensionDates,
  formatDateAr,
  getHijriMonthName,
  type ProcessedSalaryDate,
} from "@/lib/data/salaryDatesData";

type TabKey = "government" | "citizen" | "pension" | "all";

interface CombinedDate extends ProcessedSalaryDate {
  type: "government" | "citizen" | "pension";
  typeLabel: string;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "government", label: "الراتب الحكومي" },
  { key: "citizen", label: "حساب المواطن" },
  { key: "pension", label: "التقاعد" },
  { key: "all", label: "الكل" },
];

function isCurrentOrNext(dates: ProcessedSalaryDate[], date: ProcessedSalaryDate): boolean {
  const firstUpcoming = dates.find((d) => !d.isPast);
  return firstUpcoming?.depositDate === date.depositDate && firstUpcoming?.hijriMonth === date.hijriMonth;
}

export default function SalaryScheduleTable() {
  useLocale();
  const [activeTab, setActiveTab] = useState<TabKey>("government");

  const govDates = GOV_SALARY_DATES;
  const citizenDates = useMemo(() => getCitizenAccountDates(2026), []);
  const pensionDates = useMemo(() => getPensionDates(2026), []);

  const combinedDates = useMemo<CombinedDate[]>(() => {
    const gov: CombinedDate[] = govDates.map((d) => ({
      ...d,
      type: "government",
      typeLabel: "حكومي",
    }));
    const cit: CombinedDate[] = citizenDates.map((d) => ({
      ...d,
      type: "citizen",
      typeLabel: "حساب المواطن",
    }));
    const pen: CombinedDate[] = pensionDates.map((d) => ({
      ...d,
      type: "pension",
      typeLabel: "تقاعد",
    }));
    return [...gov, ...cit, ...pen].sort(
      (a, b) => new Date(a.depositDate).getTime() - new Date(b.depositDate).getTime()
    );
  }, [govDates, citizenDates, pensionDates]);

  const typeBadgeClasses: Record<CombinedDate["type"], string> = {
    government:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    citizen:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    pension:
      "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  };

  const typeRowAccent: Record<CombinedDate["type"], string> = {
    government: "border-l-emerald-500",
    citizen: "border-l-purple-500",
    pension: "border-l-sky-500",
  };

  function renderGovTable() {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300">
              <th className="px-4 py-3 font-semibold whitespace-nowrap">الشهر الهجري</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">السنة الهجرية</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">التاريخ الأصلي</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">تاريخ الإيداع</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">اليوم</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">ملاحظات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {govDates.map((date) => {
              const isCurrent = isCurrentOrNext(govDates, date);
              return (
                <tr
                  key={`${date.hijriYear}-${date.hijriMonth}`}
                  className={`
                    transition-colors duration-150
                    ${date.isPast
                      ? "text-gray-400 dark:text-gray-500 line-through"
                      : "text-gray-800 dark:text-gray-100"
                    }
                    ${isCurrent
                      ? "bg-emerald-50 dark:bg-emerald-900/20 font-medium !no-underline [&>td]:no-underline"
                      : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                    }
                  `}
                  style={isCurrent ? { textDecoration: "none" } : undefined}
                >
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {getHijriMonthName(date.hijriMonth)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {date.hijriYear}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {formatDateAr(date.originalDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {formatDateAr(date.depositDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {date.dayOfWeek}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    <div className="flex items-center gap-2">
                      {date.isAdjusted && (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 font-medium">
                          تم التقديم
                        </span>
                      )}
                      {isCurrent && (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 font-medium">
                          القادم
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  function renderGregorianTable(dates: ProcessedSalaryDate[]) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300">
              <th className="px-4 py-3 font-semibold whitespace-nowrap">الشهر</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">التاريخ الأصلي</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">تاريخ الإيداع</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">اليوم</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">ملاحظات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {dates.map((date) => {
              const isCurrent = isCurrentOrNext(dates, date);
              return (
                <tr
                  key={`${date.hijriYear}-${date.hijriMonth}`}
                  className={`
                    transition-colors duration-150
                    ${date.isPast
                      ? "text-gray-400 dark:text-gray-500 line-through"
                      : "text-gray-800 dark:text-gray-100"
                    }
                    ${isCurrent
                      ? "bg-emerald-50 dark:bg-emerald-900/20 font-medium"
                      : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                    }
                  `}
                  style={isCurrent ? { textDecoration: "none" } : undefined}
                >
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {date.hijriMonthName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {formatDateAr(date.originalDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {formatDateAr(date.depositDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {date.dayOfWeek}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    <div className="flex items-center gap-2">
                      {date.isAdjusted && (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 font-medium">
                          تم التقديم
                        </span>
                      )}
                      {isCurrent && (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 font-medium">
                          القادم
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  function renderCombinedTable() {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300">
              <th className="px-4 py-3 font-semibold whitespace-nowrap">النوع</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">الشهر</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">تاريخ الإيداع</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">اليوم</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">ملاحظات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {combinedDates.map((date, idx) => {
              const isCurrent = !date.isPast && (idx === 0 || combinedDates[idx - 1].isPast);
              return (
                <tr
                  key={`${date.type}-${date.depositDate}-${idx}`}
                  className={`
                    transition-colors duration-150 border-l-4
                    ${typeRowAccent[date.type]}
                    ${date.isPast
                      ? "text-gray-400 dark:text-gray-500 line-through"
                      : "text-gray-800 dark:text-gray-100"
                    }
                    ${isCurrent
                      ? "bg-emerald-50 dark:bg-emerald-900/20 font-medium"
                      : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                    }
                  `}
                  style={isCurrent ? { textDecoration: "none" } : undefined}
                >
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    <span
                      className={`inline-block px-2.5 py-1 text-xs rounded-full font-medium ${typeBadgeClasses[date.type]}`}
                    >
                      {date.typeLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {date.type === "government"
                      ? `${getHijriMonthName(date.hijriMonth)} ${date.hijriYear}`
                      : date.hijriMonthName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {formatDateAr(date.depositDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    {date.dayOfWeek}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={isCurrent ? { textDecoration: "none" } : undefined}>
                    <div className="flex items-center gap-2">
                      {date.isAdjusted && (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 font-medium">
                          تم التقديم
                        </span>
                      )}
                      {isCurrent && (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 font-medium">
                          القادم
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto" dir="rtl">
      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
        جدول مواعيد الرواتب والمستحقات ٢٠٢٥-٢٠٢٦
      </h2>

      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === tab.key
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-emerald-900/40"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        {activeTab === "government" && renderGovTable()}
        {activeTab === "citizen" && renderGregorianTable(citizenDates)}
        {activeTab === "pension" && renderGregorianTable(pensionDates)}
        {activeTab === "all" && renderCombinedTable()}
      </div>

      {/* Legend for combined view */}
      {activeTab === "all" && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500" />
            <span>حكومي</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-purple-500" />
            <span>حساب المواطن</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-sky-500" />
            <span>تقاعد</span>
          </div>
        </div>
      )}
    </section>
  );
}
