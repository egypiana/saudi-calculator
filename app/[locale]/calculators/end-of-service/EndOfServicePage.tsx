"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, Briefcase, Calendar, ChevronDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  calculateEndOfService, fmt, QUICK_SALARIES, TERMINATION_REASONS, RESIGNATION_RULES, EXAMPLE_SCENARIOS,
  AMENDMENT_2025_HIGHLIGHTS, NOTICE_PERIOD_RULES,
  type ContractType, type EndOfServiceInput,
} from "@/lib/calculations/end-of-service";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import EndOfServiceSidebar from "./components/EndOfServiceSidebar";
import EndOfServiceSEO from "./components/EndOfServiceSEO";
import EndOfServiceFAQ from "./components/EndOfServiceFAQ";

interface Props {
  locale: string;
}

const DEFAULT_INPUT: EndOfServiceInput = {
  lastSalary: 0, years: 0, months: 0, days: 0,
  reason: "employer-termination", contractType: "unlimited",
};

export default function EndOfServicePage({ locale }: Props) {
  const [input, setInput] = useState<EndOfServiceInput>(DEFAULT_INPUT);
  const [showExamples, setShowExamples] = useState(false);

  const update = useCallback(<K extends keyof EndOfServiceInput>(key: K, value: EndOfServiceInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setInput(DEFAULT_INPUT);
  }, []);

  const loadExample = useCallback((ex: typeof EXAMPLE_SCENARIOS[0]) => {
    setInput({ lastSalary: ex.salary, years: ex.years, months: ex.months, days: ex.days, reason: ex.reason, contractType: "unlimited" });
  }, []);

  const result = useMemo(() => calculateEndOfService(input), [input]);
  const hasValue = input.lastSalary > 0 && (input.years > 0 || input.months > 0 || input.days > 0);

  const chartData = useMemo(() => {
    if (!hasValue || result.steps.length === 0) return [];
    return result.steps.map((s, i) => ({
      name: s.periodAr,
      value: s.amount * result.resignationMultiplier,
      color: i === 0 ? "#059669" : "#3b82f6",
    }));
  }, [hasValue, result]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة مكافأة نهاية الخدمة — تعديلات 2025",
    description: "حاسبة مكافأة نهاية الخدمة محدّثة وفق تعديلات نظام العمل السعودي فبراير 2025 — 10 أسباب انتهاء، استقالة رسمية، إفلاس، فترة إشعار",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: [
      "10 أسباب انتهاء خدمة",
      "تعديلات 2025 الجديدة",
      "إفلاس صاحب العمل",
      "استقالة رسمية",
      "فترة إشعار 30/60 يوماً",
      "استقالة المرأة (زواج/ولادة)",
      "خطوات الحساب التفصيلية",
      "فترة تجربة 180 يوماً",
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة نهاية الخدمة", labelEn: "End of Service" },
        ]} />

        <div className="mt-5 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">🏢 حاسبة مكافأة نهاية الخدمة — تعديلات 2025</h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            احسب مكافأة نهاية الخدمة بدقة حسب نظام العمل السعودي المحدّث (تعديلات فبراير 2025) — 10 أسباب انتهاء، استقالة رسمية، إفلاس، فترة إشعار 30/60 يوماً، استقالة المرأة، مع خطوات الحساب التفصيلية.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["محدّث 2025", "10 أسباب انتهاء", "إشعار 30/60 يوماً", "إفلاس صاحب العمل", "استقالة المرأة", "حساب فوري", "مجاني 100%"].map((b) => (
              <span key={b} className="text-xs px-2.5 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-full font-medium">✓ {b}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-6">

            {/* Step 1: Termination Reason */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  سبب انتهاء العلاقة العمالية
                </h2>
                <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 rounded-lg transition-colors text-xs">
                  <RotateCcw className="h-3.5 w-3.5" /> إعادة ضبط
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {TERMINATION_REASONS.map((r) => {
                  const isActive = input.reason === r.value;
                  return (
                    <button
                      key={r.value}
                      onClick={() => update("reason", r.value)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-xs ${
                        isActive
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-md"
                          : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg hover:border-gray-300"
                      }`}
                    >
                      <span className="text-xl">{r.icon}</span>
                      <span className={`font-bold text-center leading-tight ${isActive ? "text-orange-700 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"}`}>{r.labelAr}</span>
                      <span className="text-[10px] text-gray-400 text-center">{r.descAr}</span>
                    </button>
                  );
                })}
              </div>

              {/* Contract type */}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-xs text-gray-500">نوع العقد:</span>
                {(["unlimited", "limited"] as ContractType[]).map((ct) => (
                  <button
                    key={ct}
                    onClick={() => update("contractType", ct)}
                    className={`text-xs px-3 py-1 rounded-lg transition-all ${
                      input.contractType === ct
                        ? "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-bold"
                        : "bg-gray-100 dark:bg-dark-bg text-gray-500"
                    }`}
                  >
                    {ct === "unlimited" ? "غير محدد المدة" : "محدد المدة"}
                  </button>
                ))}
              </div>
            </div>

            {/* 2025 Amendments Banner */}
            <div className="bg-gradient-to-l from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/40 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">جديد 2025</span>
                <h3 className="font-bold text-amber-800 dark:text-amber-300 text-sm">أبرز تعديلات نظام العمل — سارية من 19 فبراير 2025</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AMENDMENT_2025_HIGHLIGHTS.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white/70 dark:bg-dark-bg/50 rounded-lg px-3 py-2">
                    <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-amber-800 dark:text-amber-300">{item.titleAr}</p>
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 leading-relaxed">{item.descAr}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notice Period Table */}
              <div className="mt-3 bg-white/70 dark:bg-dark-bg/50 rounded-lg overflow-hidden">
                <div className="px-3 py-2 bg-amber-100/50 dark:bg-amber-900/20">
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-300">⏰ فترات الإشعار المحدّثة (المادة 75)</p>
                </div>
                <div className="divide-y divide-amber-100 dark:divide-amber-900/20">
                  {NOTICE_PERIOD_RULES.map((rule, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2 text-xs">
                      <span className="text-amber-700 dark:text-amber-400">{rule.partyAr}</span>
                      <span className="font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">{rule.daysRequired} يوماً</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Salary & Duration */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <Briefcase className="h-4 w-4" />
                الراتب ومدة الخدمة
              </h2>

              {/* Salary */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  آخر راتب شهري (أساسي + بدلات) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={input.lastSalary || ""}
                    onChange={(e) => update("lastSalary", Number(e.target.value))}
                    placeholder="أدخل الراتب الشامل..."
                    className="w-full h-14 px-4 pl-16 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-xl font-bold focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none tabular-nums transition-all"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">ريال</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {QUICK_SALARIES.map((qs) => (
                    <button key={qs} onClick={() => update("lastSalary", qs)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${input.lastSalary === qs ? "bg-orange-600 text-white shadow-md" : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200"}`}>
                      {qs.toLocaleString("ar-SA")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                <Calendar className="inline h-3.5 w-3.5 ml-1" />
                مدة الخدمة
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">سنوات</label>
                  <input type="number" min={0} value={input.years || ""} onChange={(e) => update("years", Number(e.target.value))}
                    placeholder="0" className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none tabular-nums text-center" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">أشهر</label>
                  <input type="number" min={0} max={11} value={input.months || ""} onChange={(e) => update("months", Number(e.target.value))}
                    placeholder="0" className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none tabular-nums text-center" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">أيام</label>
                  <input type="number" min={0} max={29} value={input.days || ""} onChange={(e) => update("days", Number(e.target.value))}
                    placeholder="0" className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 outline-none tabular-nums text-center" />
                </div>
              </div>

              {/* Examples */}
              <button onClick={() => setShowExamples(!showExamples)} className="mt-3 flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 hover:underline">
                <ChevronDown className={`h-3 w-3 transition-transform ${showExamples ? "rotate-180" : ""}`} />
                أمثلة جاهزة
              </button>
              {showExamples && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {EXAMPLE_SCENARIOS.map((ex, i) => (
                    <button key={i} onClick={() => loadExample(ex)}
                      className="text-xs text-right bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/40 rounded-lg px-3 py-2 hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors">
                      <span className="font-bold text-orange-700 dark:text-orange-400">{ex.labelAr}</span>
                      <span className="text-orange-500 block">{ex.salary.toLocaleString("ar-SA")} ريال</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Result Bar */}
            {hasValue && result.isEligible && (
              <div className="bg-gradient-to-l from-orange-600 to-amber-600 rounded-xl px-5 py-3 flex items-center justify-between text-white shadow-lg">
                <div className="flex items-center gap-4 text-sm">
                  <span>🏢 المكافأة:</span>
                  <span className="text-2xl font-bold tabular-nums">{fmt(result.totalReward)} ريال</span>
                </div>
                <span className="text-xs text-orange-200">{result.articleAr}</span>
              </div>
            )}

            {/* Ineligible Notice */}
            {hasValue && !result.isEligible && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/40 rounded-xl px-5 py-4 text-center">
                <p className="text-red-600 dark:text-red-400 font-bold">{result.ineligibleReasonAr}</p>
              </div>
            )}

            {/* Main Results Card */}
            {hasValue && result.isEligible && (
              <div className="bg-gradient-to-br from-orange-600 to-amber-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                <div className="text-center mb-6">
                  <p className="text-orange-200 text-sm mb-2">📜 مكافأة نهاية الخدمة — {result.articleAr}</p>
                  <p className="text-5xl sm:text-6xl font-bold tabular-nums mb-1">{fmt(result.totalReward)}</p>
                  <p className="text-orange-200 text-lg">ريال سعودي</p>
                  <p className="text-orange-200 text-sm mt-2">≈ {fmt(result.monthlyEquivalent)} شهر راتب</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-orange-200 text-[10px] mb-1">الراتب</p>
                    <p className="text-xl font-bold tabular-nums">{fmt(input.lastSalary)}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-orange-200 text-[10px] mb-1">مدة الخدمة</p>
                    <p className="text-xl font-bold tabular-nums">{fmt(result.totalYears)} سنة</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-orange-200 text-[10px] mb-1">المكافأة الأساسية</p>
                    <p className="text-xl font-bold tabular-nums">{fmt(result.baseReward)}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-orange-200 text-[10px] mb-1">النسبة المستحقة</p>
                    <p className="text-xl font-bold">{result.resignationMultiplier === 1 ? "100%" : `${Math.round(result.resignationMultiplier * 100)}%`}</p>
                  </div>
                </div>

                <div className="mt-4 bg-white/10 rounded-xl px-4 py-2 text-center text-sm text-orange-200">
                  📋 {result.ruleAr}
                </div>
              </div>
            )}

            {/* Chart + Steps */}
            {hasValue && result.isEligible && result.steps.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Pie Chart */}
                {chartData.length > 1 && (
                  <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                    <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📊 توزيع المكافأة</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
                          {chartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${fmt(Number(value))} ريال`, ""]}
                          contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb", borderRadius: "12px", direction: "rtl", fontSize: "13px" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                      {chartData.map((e, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                          {e.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Steps */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📐 خطوات الحساب</h3>
                  <div className="space-y-3">
                    {result.steps.map((step, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{step.periodAr}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mr-7">
                          {step.rateAr}: {fmt(step.years)} سنة × {fmt(input.lastSalary * step.rate)} = <span className="font-bold text-gray-800 dark:text-white">{fmt(step.amount)} ريال</span>
                        </p>
                      </div>
                    ))}

                    {input.reason === "resignation" && result.resignationMultiplier < 1 && (
                      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">×</span>
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-400">نسبة الاستقالة</span>
                        </div>
                        <p className="text-xs text-amber-600 dark:text-amber-400 mr-7">
                          {fmt(result.baseReward)} × {Math.round(result.resignationMultiplier * 100)}% = <span className="font-bold">{fmt(result.totalReward)} ريال</span>
                        </p>
                      </div>
                    )}

                    <div className="border-t-2 border-orange-200 dark:border-orange-800/40 pt-3 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 dark:text-white">المكافأة النهائية</span>
                        <span className="font-bold text-lg text-orange-600 dark:text-orange-400 tabular-nums">{fmt(result.totalReward)} ريال</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Resignation Rules Table */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg">
                <h3 className="font-bold text-gray-800 dark:text-white text-sm">📜 قواعد الاستقالة — مادة 85 من نظام العمل</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                      <th className="px-4 py-3 text-right">مدة الخدمة</th>
                      <th className="px-4 py-3 text-right">النسبة المستحقة</th>
                      <th className="px-4 py-3 text-right">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RESIGNATION_RULES.map((rule, i) => {
                      const isCurrentRange = input.reason === "resignation" && hasValue && (
                        (i === 0 && result.totalYears < 2) ||
                        (i === 1 && result.totalYears >= 2 && result.totalYears < 5) ||
                        (i === 2 && result.totalYears >= 5 && result.totalYears < 10) ||
                        (i === 3 && result.totalYears >= 10)
                      );
                      return (
                        <tr key={i} className={isCurrentRange ? "bg-orange-50 dark:bg-orange-900/10 font-bold" : i % 2 === 0 ? "" : "bg-gray-50 dark:bg-dark-bg/50"}>
                          <td className="px-4 py-3 text-gray-800 dark:text-white">{rule.range}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${rule.color}`} />
                              <span className="text-gray-700 dark:text-gray-300">{rule.multiplier}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500">
                            {isCurrentRange && <span className="text-[10px] bg-orange-200 dark:bg-orange-800 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded-full">حالتك</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-gray-50 dark:bg-dark-bg border-t border-gray-100 dark:border-gray-800">
                <p className="text-[11px] text-gray-400">💡 في حالات الفصل أو انتهاء العقد أو التقاعد أو القوة القاهرة: يستحق الموظف المكافأة كاملة بغض النظر عن مدة الخدمة.</p>
              </div>
            </div>

            {!hasValue && (
              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/40 rounded-xl p-6 text-center">
                <p className="text-orange-600 dark:text-orange-400 text-lg mb-2">👆</p>
                <p className="text-orange-700 dark:text-orange-400 font-medium">أدخل الراتب ومدة الخدمة لحساب المكافأة فوراً</p>
                <p className="text-orange-500 text-sm mt-1">اختر سبب الانتهاء ثم أدخل البيانات</p>
              </div>
            )}

            <AdSlot id="eos-mid" size="leaderboard" />
            <EndOfServiceSEO />
            <AdSlot id="eos-btm" size="rectangle" />
            <EndOfServiceFAQ />
          </div>

          <div className="hidden lg:block">
            <EndOfServiceSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
