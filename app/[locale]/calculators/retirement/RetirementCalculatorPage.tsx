"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, TrendingUp, Target, ChevronDown, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import {
  calculateRetirement,
  RetirementInput,
  EmployeeSector,
  Gender,
  SECTOR_CONFIG,
  DEPENDENTS_SUPPLEMENT,
  PENSION_MILESTONES,
  QUICK_SALARIES,
  QUICK_AGES,
  QUICK_SERVICE_YEARS,
  fmt,
  fmtPct,
} from "@/lib/calculations/retirement";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import RetirementSidebar from "./components/RetirementSidebar";
import RetirementFAQ from "./components/RetirementFAQ";
import RetirementSEO from "./components/RetirementSEO";

interface Props { locale: string; }

const DEFAULT_INPUT: RetirementInput = {
  sector: "private",
  gender: "male",
  retirementType: "normal",
  currentAge: 35,
  lastSalary: 10000,
  yearsOfService: 10,
  monthsOfService: 0,
  dependents: 0,
  expectedAnnualRaise: 3,
  personalSavings: 50000,
  monthlySavingsContribution: 1000,
  savingsReturnRate: 7,
};

const SECTOR_OPTIONS: { value: EmployeeSector; labelAr: string; icon: string; descAr: string; color: string }[] = [
  { value: "civil", labelAr: "القطاع المدني", icon: "🏛️", descAr: "الوزارات والهيئات الحكومية", color: "border-blue-500 bg-blue-50 dark:bg-blue-900/20" },
  { value: "military", labelAr: "القطاع العسكري", icon: "⭐", descAr: "القوات المسلحة والأمن", color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
  { value: "private", labelAr: "القطاع الخاص", icon: "🏢", descAr: "التأمينات الاجتماعية (GOSI)", color: "border-amber-500 bg-amber-50 dark:bg-amber-900/20" },
];

const GENDER_OPTIONS: { value: Gender; labelAr: string; icon: string }[] = [
  { value: "male", labelAr: "ذكر", icon: "👨" },
  { value: "female", labelAr: "أنثى", icon: "👩" },
];

const PIE_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

export default function RetirementCalculatorPage({ locale }: Props) {
  const [input, setInput] = useState<RetirementInput>(DEFAULT_INPUT);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showProjection, setShowProjection] = useState(false);

  const update = useCallback((patch: Partial<RetirementInput>) => {
    setInput((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setInput(DEFAULT_INPUT), []);

  const result = useMemo(() => {
    if (input.lastSalary <= 0 || input.currentAge <= 0) return null;
    return calculateRetirement(input);
  }, [input]);

  const hasValue = input.lastSalary > 0 && input.currentAge > 0;

  // Chart data
  const areaChartData = useMemo(() => {
    if (!result) return [];
    return result.yearlyProjection.map((y) => ({
      name: `${y.age}`,
      salary: y.salary,
      pension: y.estimatedPension,
      savings: Math.round(y.savingsBalance / (20 * 12)), // monthly equivalent
    }));
  }, [result]);

  const pieData = useMemo(() => {
    if (!result) return [];
    const data = [
      { name: "المعاش التقاعدي", value: result.totalMonthlyWithSupplements },
    ];
    if (result.monthlySavingsIncome > 0) {
      data.push({ name: "دخل المدخرات", value: result.monthlySavingsIncome });
    }
    if (result.incomeGap > 0) {
      data.push({ name: "الفجوة", value: result.incomeGap });
    }
    return data;
  }, [result]);

  const milestoneData = useMemo(() => {
    return PENSION_MILESTONES.map((m) => ({
      name: m.labelAr,
      ratio: m.ratio,
      years: m.years,
    }));
  }, []);

  // Readiness color
  const getReadinessColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getReadinessLabel = (score: number) => {
    if (score >= 80) return "ممتاز";
    if (score >= 60) return "جيد";
    if (score >= 40) return "متوسط";
    return "يحتاج تحسين";
  };

  const getReadinessBg = (score: number) => {
    if (score >= 80) return "from-emerald-500 to-emerald-700";
    if (score >= 60) return "from-amber-500 to-amber-700";
    return "from-red-500 to-red-700";
  };

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة التقاعد السعودية",
    description: "احسب معاشك التقاعدي للقطاع المدني والعسكري والخاص حسب أنظمة التقاعد السعودية",
    url: `https://calculatorvip.com/${locale}/calculators/retirement`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" }, { labelAr: "حاسبة التقاعد", labelEn: "Retirement Calculator" }]} />

        {/* Header */}
        <div className="mt-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl p-3 text-white shadow-lg">
                <Shield className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">حاسبة التقاعد السعودية</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">احسب معاشك التقاعدي وخطط لمستقبلك المالي — مدني، عسكري، خاص</p>
              </div>
            </div>
            <button onClick={reset} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors">
              <RotateCcw className="h-4 w-4" />
              <span>إعادة تعيين</span>
            </button>
          </div>
        </div>

        <AdSlot id="retirement-top" size="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 mt-6">
          {/* Main Content */}
          <div className="space-y-6">

            {/* Step 1: Sector & Gender */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <h2 className="font-bold text-gray-800 dark:text-white">القطاع الوظيفي والبيانات الأساسية</h2>
              </div>

              {/* Sector Selection */}
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">اختر القطاع</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                {SECTOR_OPTIONS.map((s) => {
                  const active = input.sector === s.value;
                  return (
                    <button key={s.value} onClick={() => update({ sector: s.value })}
                      className={`relative rounded-xl border-2 p-4 text-right transition-all ${active ? `${s.color} border-opacity-100 shadow-md` : "border-gray-200 dark:border-gray-700 hover:border-gray-300"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{s.icon}</span>
                        <span className={`font-bold text-sm ${active ? "text-gray-800 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>{s.labelAr}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{s.descAr}</p>
                      {active && <div className="absolute top-2 left-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center"><CheckCircle className="h-3.5 w-3.5 text-white" /></div>}
                    </button>
                  );
                })}
              </div>

              {/* Gender & Retirement Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">الجنس</label>
                  <div className="flex gap-2">
                    {GENDER_OPTIONS.map((g) => (
                      <button key={g.value} onClick={() => update({ gender: g.value })}
                        className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-medium transition-all flex items-center justify-center gap-2 ${input.gender === g.value ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"}`}>
                        <span>{g.icon}</span>{g.labelAr}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">نوع التقاعد</label>
                  <div className="flex gap-2">
                    <button onClick={() => update({ retirementType: "normal" })}
                      className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-medium transition-all flex items-center justify-center gap-2 ${input.retirementType === "normal" ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"}`}>
                      <TrendingUp className="h-4 w-4" />تقاعد نظامي
                    </button>
                    <button onClick={() => update({ retirementType: "early" })}
                      className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-medium transition-all flex items-center justify-center gap-2 ${input.retirementType === "early" ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"}`}>
                      <Target className="h-4 w-4" />تقاعد مبكر
                    </button>
                  </div>
                </div>
              </div>

              {/* Age & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">العمر الحالي</label>
                  <input type="number" value={input.currentAge || ""} onChange={(e) => update({ currentAge: +e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-center font-bold text-lg"
                    placeholder="35" min={18} max={65} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">سنوات الخدمة</label>
                  <input type="number" value={input.yearsOfService || ""} onChange={(e) => update({ yearsOfService: +e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-center font-bold text-lg"
                    placeholder="10" min={0} max={45} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">أشهر إضافية</label>
                  <input type="number" value={input.monthsOfService || ""} onChange={(e) => update({ monthsOfService: +e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-center font-bold text-lg"
                    placeholder="0" min={0} max={11} />
                </div>
              </div>

              {/* Quick age presets */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs text-gray-400 ml-2 self-center">العمر:</span>
                {QUICK_AGES.map((a) => (
                  <button key={a} onClick={() => update({ currentAge: a })}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${input.currentAge === a ? "bg-teal-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-teal-100 dark:hover:bg-teal-900/30"}`}>{a}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-400 ml-2 self-center">الخدمة:</span>
                {QUICK_SERVICE_YEARS.map((y) => (
                  <button key={y} onClick={() => update({ yearsOfService: y })}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${input.yearsOfService === y ? "bg-teal-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-teal-100 dark:hover:bg-teal-900/30"}`}>{y} سنة</button>
                ))}
              </div>

              {/* Normal retirement age info */}
              {input.sector && (
                <div className="mt-4 bg-teal-50 dark:bg-teal-900/10 rounded-xl p-3 text-xs text-teal-700 dark:text-teal-400">
                  سن التقاعد النظامي لـ{SECTOR_CONFIG[input.sector].nameAr}: <strong>{SECTOR_CONFIG[input.sector].normalRetirementAge[input.gender]} سنة</strong>
                  {input.currentAge > 0 && (
                    <> — متبقي <strong>{Math.max(0, SECTOR_CONFIG[input.sector].normalRetirementAge[input.gender] - input.currentAge)} سنة</strong></>
                  )}
                </div>
              )}
            </div>

            {/* Step 2: Salary & Dependents */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <h2 className="font-bold text-gray-800 dark:text-white">الراتب والمعالين</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {input.sector === "private" ? "متوسط راتب آخر سنتين" : "آخر راتب أساسي"} (ريال)
                  </label>
                  <input type="number" value={input.lastSalary || ""} onChange={(e) => update({ lastSalary: +e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-center font-bold text-lg"
                    placeholder="10,000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">عدد المعالين</label>
                  <select value={input.dependents} onChange={(e) => update({ dependents: +e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all">
                    {Object.entries(DEPENDENTS_SUPPLEMENT).map(([key, val]) => (
                      <option key={key} value={key}>{val.labelAr}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick salary presets */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs text-gray-400 ml-2 self-center">الراتب:</span>
                {QUICK_SALARIES.map((s) => (
                  <button key={s} onClick={() => update({ lastSalary: s })}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${input.lastSalary === s ? "bg-teal-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-teal-100 dark:hover:bg-teal-900/30"}`}>{fmt(s)}</button>
                ))}
              </div>

              {/* GOSI cap warning */}
              {input.sector === "private" && input.lastSalary > 45000 && (
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-3 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-400">الحد الأقصى لراتب الاشتراك في التأمينات هو <strong>45,000 ريال</strong>. سيتم احتساب المعاش على هذا الحد.</p>
                </div>
              )}

              {/* Expected raise */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">الزيادة السنوية المتوقعة في الراتب (%)</label>
                <input type="range" min={0} max={10} step={0.5} value={input.expectedAnnualRaise}
                  onChange={(e) => update({ expectedAnnualRaise: +e.target.value })}
                  className="w-full accent-teal-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">{fmtPct(input.expectedAnnualRaise)}%</span>
                  <span>10%</span>
                </div>
              </div>
            </div>

            {/* Step 3: Savings (Advanced) */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <button onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="text-right">
                    <h2 className="font-bold text-gray-800 dark:text-white">المدخرات الشخصية</h2>
                    <p className="text-xs text-gray-400 mt-0.5">اختياري — لحساب إجمالي دخل التقاعد</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
              </button>
              {showAdvanced && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">المدخرات الحالية (ريال)</label>
                      <input type="number" value={input.personalSavings || ""} onChange={(e) => update({ personalSavings: +e.target.value })}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-center font-bold"
                        placeholder="50,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">الادخار الشهري (ريال)</label>
                      <input type="number" value={input.monthlySavingsContribution || ""} onChange={(e) => update({ monthlySavingsContribution: +e.target.value })}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-center font-bold"
                        placeholder="1,000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">العائد المتوقع على المدخرات (%)</label>
                    <input type="range" min={0} max={15} step={0.5} value={input.savingsReturnRate}
                      onChange={(e) => update({ savingsReturnRate: +e.target.value })}
                      className="w-full accent-teal-500" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400">{fmtPct(input.savingsReturnRate)}%</span>
                      <span>15%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {hasValue && result && (
              <>
                {/* Eligibility Alert */}
                <div className={`rounded-2xl border p-4 flex items-start gap-3 ${result.isEligible
                  ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30"
                  : "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30"}`}>
                  {result.isEligible
                    ? <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    : <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />}
                  <div>
                    <p className={`font-bold text-sm ${result.isEligible ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>
                      {result.isEligible ? "مؤهل للتقاعد" : "غير مؤهل حالياً"}
                    </p>
                    <p className={`text-xs mt-0.5 ${result.isEligible ? "text-emerald-600 dark:text-emerald-500" : "text-amber-600 dark:text-amber-500"}`}>
                      {result.eligibilityMessage}
                    </p>
                  </div>
                </div>

                {/* Main Result Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Monthly Pension */}
                  <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-4 text-white shadow-lg col-span-2 sm:col-span-1">
                    <p className="text-teal-100 text-xs mb-1">المعاش الشهري</p>
                    <p className="text-2xl font-bold">{fmt(result.totalMonthlyWithSupplements)}</p>
                    <p className="text-teal-200 text-[10px] mt-1">ريال/شهر</p>
                  </div>
                  {/* Readiness Score */}
                  <div className={`bg-gradient-to-br ${getReadinessBg(result.readinessScore)} rounded-2xl p-4 text-white shadow-lg`}>
                    <p className="text-white/70 text-xs mb-1">جاهزية التقاعد</p>
                    <p className="text-2xl font-bold">{result.readinessScore}%</p>
                    <p className="text-white/60 text-[10px] mt-1">{getReadinessLabel(result.readinessScore)}</p>
                  </div>
                  {/* Replacement Ratio */}
                  <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                    <p className="text-gray-400 text-xs mb-1">نسبة الإحلال</p>
                    <p className={`text-2xl font-bold ${getReadinessColor(result.replacementRatio)}`}>{fmtPct(result.replacementRatio)}%</p>
                    <p className="text-gray-400 text-[10px] mt-1">من الراتب النهائي</p>
                  </div>
                  {/* Annual Pension */}
                  <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                    <p className="text-gray-400 text-xs mb-1">المعاش السنوي</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{fmt(result.annualPension)}</p>
                    <p className="text-gray-400 text-[10px] mt-1">ريال/سنة</p>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-teal-500" />تفاصيل المعاش التقاعدي
                  </h3>

                  <div className="space-y-3">
                    <Row label="الراتب النهائي المتوقع" value={`${fmt(result.finalSalary)} ريال`} />
                    <Row label="إجمالي مدة الخدمة" value={`${Math.floor(result.totalServiceMonths / 12)} سنة و ${result.totalServiceMonths % 12} شهر`} />
                    <Row label="المعاش الأساسي" value={`${fmt(result.monthlyPension)} ريال`} highlight />
                    {result.dependentsSupplement > 0 && (
                      <Row label={`إضافة المعالين (${DEPENDENTS_SUPPLEMENT[Math.min(input.dependents, 3)]?.ratio}%)`} value={`+${fmt(result.dependentsSupplement)} ريال`} />
                    )}
                    {result.isEarlyRetirement && result.earlyRetirementPenalty > 0 && (
                      <Row label={`خصم التقاعد المبكر (${fmtPct(result.earlyRetirementPenalty)}%)`} value={`مطبّق`} isWarning />
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <Row label="إجمالي المعاش الشهري" value={`${fmt(result.totalMonthlyWithSupplements)} ريال`} highlight />
                    </div>
                    <Row label="نسبة المعاش من الراتب" value={`${fmtPct(result.pensionRatio)}%`} />

                    {/* Early retirement comparison */}
                    {result.isEarlyRetirement && (
                      <div className="bg-orange-50 dark:bg-orange-900/10 rounded-xl p-3 mt-3">
                        <p className="text-xs text-orange-700 dark:text-orange-400 font-bold mb-1">مقارنة التقاعد المبكر vs النظامي:</p>
                        <div className="flex justify-between text-xs text-orange-600 dark:text-orange-400">
                          <span>المعاش عند التقاعد المبكر الآن</span>
                          <span className="font-bold">{fmt(result.totalMonthlyWithSupplements)} ريال</span>
                        </div>
                        <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                          <span>المعاش عند التقاعد النظامي ({SECTOR_CONFIG[input.sector].normalRetirementAge[input.gender]} سنة)</span>
                          <span className="font-bold">{fmt(result.normalPensionComparison)} ريال</span>
                        </div>
                        <p className="text-[10px] text-orange-500 mt-2">الفرق: {fmt(result.normalPensionComparison - result.totalMonthlyWithSupplements)} ريال/شهر</p>
                      </div>
                    )}

                    {/* Savings section */}
                    {(input.personalSavings > 0 || input.monthlySavingsContribution > 0) && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">دخل المدخرات (توزيع على 20 سنة)</p>
                        <Row label="إجمالي المدخرات عند التقاعد" value={`${fmt(result.projectedSavings)} ريال`} />
                        <Row label="دخل شهري من المدخرات" value={`${fmt(result.monthlySavingsIncome)} ريال`} />
                      </div>
                    )}

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                      <Row label="إجمالي الدخل التقاعدي الشهري" value={`${fmt(result.totalMonthlyRetirementIncome)} ريال`} highlight />
                      {result.incomeGap > 0 && (
                        <Row label="الفجوة عن الراتب النهائي" value={`-${fmt(result.incomeGap)} ريال`} isWarning />
                      )}
                    </div>
                  </div>
                </div>

                {/* Readiness Gauge */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-teal-500" />مؤشر جاهزية التقاعد
                  </h3>

                  {/* Progress bar */}
                  <div className="relative mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 bg-gradient-to-l ${getReadinessBg(result.readinessScore)}`}
                        style={{ width: `${Math.min(result.readinessScore, 100)}%` }}>
                        <span className="text-white text-xs font-bold flex items-center justify-center h-full">
                          {result.readinessScore}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>يحتاج تحسين</span>
                      <span>متوسط</span>
                      <span>جيد</span>
                      <span>ممتاز</span>
                    </div>
                  </div>

                  {/* Income composition pie */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex justify-center">
                      <ResponsiveContainer width={200} height={200}>
                        <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                            {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                          </Pie>
                          <Tooltip formatter={(v) => `${fmt(Number(v))} ريال`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                      {pieData.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{d.name}</span>
                          <span className="text-xs font-bold text-gray-800 dark:text-white mr-auto">{fmt(d.value)} ريال</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips based on score */}
                  <div className="mt-4 bg-teal-50 dark:bg-teal-900/10 rounded-xl p-4">
                    <p className="text-xs font-bold text-teal-700 dark:text-teal-400 mb-2">نصائح لتحسين جاهزيتك:</p>
                    <ul className="space-y-1 text-xs text-teal-600 dark:text-teal-400">
                      {result.readinessScore < 80 && <li>• زِد مبلغ الادخار الشهري لتعويض الفجوة في الدخل</li>}
                      {result.readinessScore < 60 && <li>• فكّر في تأخير التقاعد لزيادة سنوات الخدمة والمعاش</li>}
                      {input.savingsReturnRate < 7 && <li>• ابحث عن استثمارات بعائد أعلى (صناديق استثمارية متنوعة)</li>}
                      {input.dependents === 0 && <li>• تأكد من تسجيل معاليك للحصول على الإضافة</li>}
                      <li>• راجع استحقاقاتك دورياً عبر بوابة التأمينات الاجتماعية أو نظام فارس</li>
                    </ul>
                  </div>
                </div>

                {/* Area Chart - Projection */}
                {areaChartData.length > 1 && (
                  <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-teal-500" />توقعات النمو حتى التقاعد
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={areaChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} label={{ value: "العمر", position: "insideBottom", offset: -5, fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(v) => `${fmt(Number(v))} ريال`} />
                        <Area type="monotone" dataKey="salary" name="الراتب" stackId="0" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="pension" name="المعاش المتوقع" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-3 text-xs">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-teal-500" />الراتب</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500" />المعاش المتوقع</span>
                    </div>
                  </div>
                )}

                {/* Pension Milestones */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4">نسبة المعاش حسب سنوات الخدمة</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={milestoneData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={120} />
                      <Tooltip formatter={(v) => `${v}%`} />
                      <Bar dataKey="ratio" fill="#14b8a6" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-gray-400 mt-2 text-center">المعادلة: (الراتب × أشهر الخدمة) ÷ 480</p>
                </div>

                {/* Year-by-year projection table */}
                {result.yearlyProjection.length > 1 && (
                  <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <button onClick={() => setShowProjection(!showProjection)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors">
                      <h3 className="font-bold text-gray-800 dark:text-white text-sm">جدول التوقعات التفصيلي ({result.yearlyProjection.length} سنة)</h3>
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showProjection ? "rotate-180" : ""}`} />
                    </button>
                    {showProjection && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-gray-50 dark:bg-dark-bg">
                            <tr>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">العمر</th>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">الراتب</th>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">المعاش المتوقع</th>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">المدخرات</th>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">النسبة</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {result.yearlyProjection.map((y, i) => {
                              const ratio = y.salary > 0 ? ((y.estimatedPension / y.salary) * 100) : 0;
                              const isRetirementYear = y.age === SECTOR_CONFIG[input.sector].normalRetirementAge[input.gender];
                              return (
                                <tr key={i} className={`${isRetirementYear ? "bg-teal-50 dark:bg-teal-900/10 font-bold" : ""}`}>
                                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                    {y.age} {isRetirementYear && <span className="text-teal-600 text-[10px]">⬅ التقاعد</span>}
                                  </td>
                                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{fmt(y.salary)}</td>
                                  <td className="px-3 py-2 text-teal-600 dark:text-teal-400 font-medium">{fmt(y.estimatedPension)}</td>
                                  <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{fmt(y.savingsBalance)}</td>
                                  <td className="px-3 py-2"><span className={`${ratio >= 50 ? "text-emerald-600" : "text-amber-600"}`}>{fmtPct(ratio)}%</span></td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            <AdSlot id="retirement-mid" size="rectangle" />
            <RetirementSEO />
            <RetirementFAQ />
            <AdSlot id="retirement-bottom" size="leaderboard" />
          </div>

          {/* Sidebar */}
          <RetirementSidebar locale={locale} />
        </div>
      </div>
    </main>
  );
}

function Row({ label, value, highlight, isWarning }: { label: string; value: string; highlight?: boolean; isWarning?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className={`text-sm font-bold ${isWarning ? "text-red-600 dark:text-red-400" : highlight ? "text-teal-600 dark:text-teal-400" : "text-gray-800 dark:text-white"}`}>{value}</span>
    </div>
  );
}
