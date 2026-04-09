"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, User, UserX, Briefcase, ChevronDown, Clock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  calculateSalary, fmt, QUICK_SALARIES, GOSI_COMPONENTS, GOSI_MAX_SALARY, MINIMUM_WAGE, SALARY_SCALES,
  type Nationality, type SalaryInput,
} from "@/lib/calculations/salary";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import SalarySidebar from "./components/SalarySidebar";
import SalarySEO from "./components/SalarySEO";
import SalaryFAQ from "./components/SalaryFAQ";
import GovSalaryScales from "./components/GovSalaryScales";
import SectorComparison from "./components/SectorComparison";

interface Props {
  locale: string;
}

const DEFAULT_INPUT: SalaryInput = {
  basicSalary: 0, housingAllowance: 0, transportAllowance: 0,
  foodAllowance: 0, phoneAllowance: 0, otherAllowances: 0,
  nationality: "saudi", overtime: 0, overtimeRate: 1.5, otherDeductions: 0,
};

export default function SalaryCalculatorPage({ locale }: Props) {
  const [input, setInput] = useState<SalaryInput>(DEFAULT_INPUT);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showOvertime, setShowOvertime] = useState(false);

  const update = useCallback(<K extends keyof SalaryInput>(key: K, value: SalaryInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setInput(DEFAULT_INPUT);
    setShowAdvanced(false);
    setShowOvertime(false);
  }, []);

  const result = useMemo(() => calculateSalary(input), [input]);

  const hasValue = input.basicSalary > 0;
  const isBelowMinimum = input.nationality === "saudi" && input.basicSalary > 0 && input.basicSalary < MINIMUM_WAGE.saudi;

  const chartData = useMemo(() => {
    if (!hasValue) return [];
    const items = [
      { name: "الراتب الأساسي", value: result.basicSalary, color: "#059669" },
    ];
    if (result.totalAllowances > 0) items.push({ name: "البدلات", value: result.totalAllowances, color: "#3b82f6" });
    if (result.overtimeAmount > 0) items.push({ name: "الأوقات الإضافية", value: result.overtimeAmount, color: "#8b5cf6" });
    if (result.totalDeductions > 0) items.push({ name: "الخصومات", value: result.totalDeductions, color: "#ef4444" });
    return items;
  }, [hasValue, result]);

  const gosiComponents = GOSI_COMPONENTS[input.nationality];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة الراتب السعودية — سلالم الرواتب الحكومية",
    description: "حاسبة الراتب الشاملة: سلالم رواتب حكومية (عام، معلمين، صحي، عسكري)، صافي الراتب، التأمينات الاجتماعية، مقارنة قطاعات",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: [
      "سلم رواتب الموظفين العام (15 مرتبة)",
      "سلم رواتب المعلمين (4 فئات)",
      "سلم رواتب القطاع الصحي",
      "سلم رواتب العسكريين (ضباط وأفراد)",
      "مقارنة رواتب القطاعات",
      "التأمينات الاجتماعية GOSI",
      "تكلفة صاحب العمل",
      "الأوقات الإضافية",
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator" },
        ]} />

        {/* Header */}
        <div className="mt-5 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            💵 حاسبة الراتب الشاملة — سلالم الرواتب الحكومية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            احسب صافي راتبك بدقة + سلالم رواتب حكومية تفاعلية (عام، معلمين، صحي، عسكري) بالمرتبة والدرجة — التأمينات الاجتماعية (GOSI)، مقارنة قطاعات، البدلات، الأوقات الإضافية.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["سلالم رواتب حكومية", "مقارنة قطاعات", "المرتبة والدرجة", "GOSI كامل", "سعودي / غير سعودي", "حساب فوري", "مجاني 100%"].map((badge) => (
              <span key={badge} className="text-xs px-2.5 py-1 bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 rounded-full font-medium">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-6">

            {/* Step 1: Nationality */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  الجنسية
                </h2>
                <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 rounded-lg transition-colors text-xs">
                  <RotateCcw className="h-3.5 w-3.5" /> إعادة ضبط
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { val: "saudi" as Nationality, label: "سعودي", icon: User, desc: "تأمينات 9.75%", flag: "🇸🇦" },
                  { val: "nonSaudi" as Nationality, label: "غير سعودي", icon: UserX, desc: "أخطار مهنية 2%", flag: "🌍" },
                ]).map((opt) => {
                  const Icon = opt.icon;
                  const isActive = input.nationality === opt.val;
                  return (
                    <button
                      key={opt.val}
                      onClick={() => update("nationality", opt.val)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-sm font-bold ${
                        isActive
                          ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 shadow-md"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-bg text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-2xl">{opt.flag}</span>
                      <div className="text-right">
                        <div className="flex items-center gap-1.5"><Icon className="h-4 w-4" />{opt.label}</div>
                        <div className="text-[10px] font-normal opacity-70">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Salary Components */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <Briefcase className="h-4 w-4" />
                مكونات الراتب
              </h2>

              {/* Basic Salary */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  الراتب الأساسي <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={input.basicSalary || ""}
                    onChange={(e) => update("basicSalary", Number(e.target.value))}
                    placeholder="أدخل الراتب الأساسي..."
                    className="w-full h-14 px-4 pl-16 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-xl font-bold focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none tabular-nums transition-all"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">ريال</span>
                </div>
                {/* Quick amounts */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {QUICK_SALARIES.map((qs) => (
                    <button
                      key={qs}
                      onClick={() => update("basicSalary", qs)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        input.basicSalary === qs
                          ? "bg-teal-600 text-white shadow-md"
                          : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      {qs.toLocaleString("ar-SA")}
                    </button>
                  ))}
                </div>
                {isBelowMinimum && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                    ⚠️ الحد الأدنى لأجور السعوديين هو {MINIMUM_WAGE.saudi.toLocaleString("ar-SA")} ريال
                  </p>
                )}
              </div>

              {/* Main Allowances */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {([
                  { key: "housingAllowance" as const, label: "بدل السكن", hint: "عادة 25% من الأساسي" },
                  { key: "transportAllowance" as const, label: "بدل النقل", hint: "500 — 1,500 ريال" },
                ]).map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{field.label}</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={input[field.key] || ""}
                        onChange={(e) => update(field.key, Number(e.target.value))}
                        placeholder="0"
                        className="w-full h-10 px-3 pl-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 outline-none tabular-nums"
                      />
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">ريال</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{field.hint}</p>
                  </div>
                ))}
              </div>

              {/* Auto-fill housing */}
              {input.basicSalary > 0 && !input.housingAllowance && (
                <button
                  onClick={() => update("housingAllowance", Math.round(input.basicSalary * 0.25))}
                  className="mb-3 text-xs text-teal-600 dark:text-teal-400 hover:underline"
                >
                  💡 إضافة بدل سكن تلقائي (25% = {fmt(Math.round(input.basicSalary * 0.25))} ريال)
                </button>
              )}

              {/* Advanced Allowances */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-3"
              >
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
                بدلات إضافية (طعام، هاتف، أخرى)
              </button>
              {showAdvanced && (
                <div className="grid grid-cols-3 gap-3 mb-3 bg-gray-50 dark:bg-dark-bg rounded-xl p-3">
                  {([
                    { key: "foodAllowance" as const, label: "بدل الطعام" },
                    { key: "phoneAllowance" as const, label: "بدل الهاتف" },
                    { key: "otherAllowances" as const, label: "بدلات أخرى" },
                  ]).map((field) => (
                    <div key={field.key}>
                      <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">{field.label}</label>
                      <input
                        type="number"
                        value={input[field.key] || ""}
                        onChange={(e) => update(field.key, Number(e.target.value))}
                        placeholder="0"
                        className="w-full h-9 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 outline-none tabular-nums"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Overtime */}
              <button
                onClick={() => setShowOvertime(!showOvertime)}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-3"
              >
                <Clock className="h-3.5 w-3.5" />
                <ChevronDown className={`h-3 w-3 transition-transform ${showOvertime ? "rotate-180" : ""}`} />
                الأوقات الإضافية والخصومات
              </button>
              {showOvertime && (
                <div className="grid grid-cols-3 gap-3 bg-gray-50 dark:bg-dark-bg rounded-xl p-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">ساعات إضافية / شهر</label>
                    <input
                      type="number"
                      value={input.overtime || ""}
                      onChange={(e) => update("overtime", Number(e.target.value))}
                      placeholder="0"
                      className="w-full h-9 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 outline-none tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">معدل الإضافي</label>
                    <select
                      value={input.overtimeRate}
                      onChange={(e) => update("overtimeRate", Number(e.target.value))}
                      className="w-full h-9 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      <option value={1.5}>×1.5 (عادي)</option>
                      <option value={2}>×2.0 (أعياد/إجازات)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">خصومات أخرى</label>
                    <input
                      type="number"
                      value={input.otherDeductions || ""}
                      onChange={(e) => update("otherDeductions", Number(e.target.value))}
                      placeholder="سلف، قروض..."
                      className="w-full h-9 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 outline-none tabular-nums"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Live Result Bar */}
            {hasValue && (
              <div className="bg-gradient-to-l from-teal-600 to-emerald-600 rounded-xl px-5 py-3 flex items-center justify-between text-white shadow-lg">
                <div className="flex items-center gap-4 text-sm">
                  <span>💵 صافي الراتب:</span>
                  <span className="text-2xl font-bold tabular-nums">{fmt(result.netSalary)} ريال</span>
                </div>
                <span className="text-xs text-teal-200">
                  خصم {fmt(result.totalDeductions)} ريال
                </span>
              </div>
            )}

            {/* Main Results Card */}
            {hasValue && (
              <div className="bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                <div className="text-center mb-6">
                  <p className="text-teal-200 text-sm mb-2">
                    {input.nationality === "saudi" ? "🇸🇦 موظف سعودي" : "🌍 موظف غير سعودي"}
                  </p>
                  <p className="text-5xl sm:text-6xl font-bold tabular-nums mb-1">{fmt(result.netSalary)}</p>
                  <p className="text-teal-200 text-lg">ريال — صافي الراتب الشهري</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-teal-200 text-[10px] mb-1">الإجمالي</p>
                    <p className="text-xl font-bold tabular-nums">{fmt(result.grossSalary)}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-red-200 text-[10px] mb-1">التأمينات (موظف)</p>
                    <p className="text-xl font-bold tabular-nums text-red-200">-{fmt(result.gosi.employeeAmount)}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-amber-200 text-[10px] mb-1">حصة صاحب العمل</p>
                    <p className="text-xl font-bold tabular-nums text-amber-200">{fmt(result.gosi.employerAmount)}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-teal-200 text-[10px] mb-1">التكلفة الكلية</p>
                    <p className="text-xl font-bold tabular-nums">{fmt(result.totalEmployerCost)}</p>
                  </div>
                </div>

                {input.basicSalary > GOSI_MAX_SALARY && (
                  <div className="mt-4 bg-white/10 rounded-xl px-4 py-2 text-center text-xs text-amber-200">
                    ⚠️ الراتب الأساسي يتجاوز سقف التأمينات ({fmt(GOSI_MAX_SALARY)} ريال) — الخصم محسوب على السقف فقط
                  </div>
                )}
              </div>
            )}

            {/* Charts + Breakdown */}
            {hasValue && (
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📊 توزيع الراتب</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
                        {chartData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${fmt(Number(value))} ريال`, ""]}
                        contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb", borderRadius: "12px", direction: "rtl", fontSize: "13px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {chartData.map((entry, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        {entry.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📋 تفصيل الراتب</h3>
                  <div className="space-y-2 text-sm">
                    <Row label="الراتب الأساسي" value={result.basicSalary} color="text-gray-800 dark:text-white" />
                    {result.housingAllowance > 0 && <Row label="بدل السكن" value={result.housingAllowance} />}
                    {result.transportAllowance > 0 && <Row label="بدل النقل" value={result.transportAllowance} />}
                    {result.foodAllowance > 0 && <Row label="بدل الطعام" value={result.foodAllowance} />}
                    {result.phoneAllowance > 0 && <Row label="بدل الهاتف" value={result.phoneAllowance} />}
                    {result.otherAllowances > 0 && <Row label="بدلات أخرى" value={result.otherAllowances} />}
                    {result.overtimeAmount > 0 && <Row label={`أوقات إضافية (${result.overtimeHours}س)`} value={result.overtimeAmount} color="text-purple-600 dark:text-purple-400" />}

                    <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                      <Row label="الراتب الإجمالي" value={result.grossSalary + result.overtimeAmount} bold />
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                      <Row label={`التأمينات (${(result.gosi.employeeRate * 100).toFixed(2)}%)`} value={-result.gosi.employeeAmount} color="text-red-500" />
                      {result.otherDeductions > 0 && <Row label="خصومات أخرى" value={-result.otherDeductions} color="text-red-500" />}
                    </div>

                    <div className="border-t-2 border-teal-200 dark:border-teal-800/40 pt-3 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 dark:text-white">صافي الراتب</span>
                        <span className="font-bold text-lg text-teal-600 dark:text-teal-400 tabular-nums">{fmt(result.netSalary)} ريال</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GOSI Detail Table */}
            {hasValue && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg">
                  <h3 className="font-bold text-gray-800 dark:text-white text-sm">
                    🏛️ تفصيل التأمينات الاجتماعية (GOSI) — {input.nationality === "saudi" ? "سعودي" : "غير سعودي"}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                        <th className="px-4 py-3 text-right">البند</th>
                        <th className="px-4 py-3 text-right">حصة الموظف</th>
                        <th className="px-4 py-3 text-right">حصة صاحب العمل</th>
                        <th className="px-4 py-3 text-right">الإجمالي</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gosiComponents.map((comp, i) => (
                        <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50 dark:bg-dark-bg/50"}>
                          <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{comp.nameAr}</td>
                          <td className="px-4 py-3 text-red-500 tabular-nums">
                            {comp.employee > 0 ? `${(comp.employee * 100).toFixed(2)}% = ${fmt(result.gosi.baseSalaryUsed * comp.employee)}` : "—"}
                          </td>
                          <td className="px-4 py-3 text-amber-600 dark:text-amber-400 tabular-nums">
                            {comp.employer > 0 ? `${(comp.employer * 100).toFixed(2)}% = ${fmt(result.gosi.baseSalaryUsed * comp.employer)}` : "—"}
                          </td>
                          <td className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300 tabular-nums">
                            {fmt(result.gosi.baseSalaryUsed * (comp.employee + comp.employer))}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-teal-200 dark:border-teal-800/40 font-bold">
                        <td className="px-4 py-3 text-gray-800 dark:text-white">المجموع</td>
                        <td className="px-4 py-3 text-red-600 tabular-nums">{fmt(result.gosi.employeeAmount)}</td>
                        <td className="px-4 py-3 text-amber-600 tabular-nums">{fmt(result.gosi.employerAmount)}</td>
                        <td className="px-4 py-3 text-teal-600 dark:text-teal-400 tabular-nums">{fmt(result.gosi.totalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Salary Conversion */}
            {hasValue && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-4">🔄 تحويل الراتب</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "شهري", value: result.netSalary, icon: "📅" },
                    { label: "سنوي", value: result.annual, icon: "📆" },
                    { label: "يومي", value: result.daily, icon: "☀️" },
                    { label: "ساعي", value: result.hourly, icon: "⏰" },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 text-center">
                      <span className="text-lg">{item.icon}</span>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{item.label}</p>
                      <p className="font-bold text-sm text-gray-800 dark:text-white tabular-nums">{fmt(item.value)}</p>
                      <p className="text-[10px] text-gray-400">ريال</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Salary Scales Reference */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg">
                <h3 className="font-bold text-gray-800 dark:text-white text-sm">📊 متوسط الرواتب في السعودية (تقريبي)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                      <th className="px-4 py-3 text-right">المستوى</th>
                      <th className="px-4 py-3 text-right">نطاق الراتب</th>
                      <th className="px-4 py-3 text-right">المتوسط</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SALARY_SCALES.map((s, i) => {
                      const isInRange = input.basicSalary >= (i === 0 ? 0 : SALARY_SCALES[i - 1].avg) && input.basicSalary <= s.avg * 1.3;
                      return (
                        <tr key={i} className={isInRange && hasValue ? "bg-teal-50 dark:bg-teal-900/10 font-bold" : i % 2 === 0 ? "" : "bg-gray-50 dark:bg-dark-bg/50"}>
                          <td className="px-4 py-3 text-gray-800 dark:text-white">{s.levelAr}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300 tabular-nums">{s.range} ريال</td>
                          <td className="px-4 py-3 text-teal-600 dark:text-teal-400 font-bold tabular-nums">{s.avg.toLocaleString("ar-SA")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* No value message */}
            {!hasValue && (
              <div className="bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-800/40 rounded-xl p-6 text-center">
                <p className="text-teal-600 dark:text-teal-400 text-lg mb-2">👆</p>
                <p className="text-teal-700 dark:text-teal-400 font-medium">أدخل الراتب الأساسي لحساب صافي الراتب فوراً</p>
                <p className="text-teal-500 text-sm mt-1">اختر جنسيتك وأدخل الراتب الأساسي والبدلات</p>
              </div>
            )}

            {/* Government Salary Scales */}
            <GovSalaryScales />

            <AdSlot id="salary-mid" size="leaderboard" />

            {/* Sector Comparison */}
            <SectorComparison />

            <SalarySEO />
            <AdSlot id="salary-btm" size="rectangle" />
            <SalaryFAQ />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <SalarySidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper component
function Row({ label, value, color, bold }: { label: string; value: number; color?: string; bold?: boolean }) {
  const isNeg = value < 0;
  return (
    <div className="flex justify-between items-center py-1">
      <span className={`text-gray-600 dark:text-gray-400 ${bold ? "font-bold text-gray-800 dark:text-white" : ""}`}>{label}</span>
      <span className={`tabular-nums font-medium ${color || (isNeg ? "text-red-500" : bold ? "font-bold text-gray-800 dark:text-white" : "text-gray-700 dark:text-gray-300")}`}>
        {isNeg ? `-${fmt(Math.abs(value))}` : fmt(value)} ريال
      </span>
    </div>
  );
}
