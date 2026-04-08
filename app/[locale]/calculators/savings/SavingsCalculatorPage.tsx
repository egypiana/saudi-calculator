"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, TrendingUp, Target, ChevronDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  calculateSavings, fmt, fmtDec, COMPOUND_OPTIONS, QUICK_DEPOSITS, QUICK_MONTHLY, QUICK_RATES, QUICK_YEARS, SAUDI_RATES_REFERENCE,
  type CalculationMode, type CompoundFrequency, type SavingsInput,
} from "@/lib/calculations/savings";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import SavingsSidebar from "./components/SavingsSidebar";
import SavingsSEO from "./components/SavingsSEO";
import SavingsFAQ from "./components/SavingsFAQ";

interface Props { locale: string; }

const DEFAULT_INPUT: SavingsInput = {
  mode: "growth", initialDeposit: 10000, monthlyContribution: 2000,
  annualRate: 7, years: 10, compounding: "monthly", annualContributionIncrease: 0, targetAmount: 500000,
};

export default function SavingsCalculatorPage({ locale }: Props) {
  const [input, setInput] = useState<SavingsInput>(DEFAULT_INPUT);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const update = useCallback(<K extends keyof SavingsInput>(key: K, value: SavingsInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => { setInput(DEFAULT_INPUT); setShowAdvanced(false); setShowTable(false); }, []);

  const result = useMemo(() => calculateSavings(input), [input]);
  const hasValue = input.years > 0 && (input.initialDeposit > 0 || input.monthlyContribution > 0 || (input.mode === "goal" && input.targetAmount > 0));

  const chartData = useMemo(() => result.yearlyBreakdown.map((y) => ({
    name: `سنة ${y.year}`, contributions: Math.round(y.cumulativeContributions), interest: Math.round(y.cumulativeInterest), total: Math.round(y.endBalance),
  })), [result]);

  const pieData = useMemo(() => {
    if (!hasValue) return [];
    const items = [];
    if (result.initialDeposit > 0) items.push({ name: "الإيداع الأولي", value: result.initialDeposit, color: "#6366f1" });
    if (result.totalContributions - result.initialDeposit > 0) items.push({ name: "الإيداعات الشهرية", value: result.totalContributions - result.initialDeposit, color: "#3b82f6" });
    if (result.totalInterest > 0) items.push({ name: "الأرباح", value: Math.round(result.totalInterest), color: "#10b981" });
    return items;
  }, [hasValue, result]);

  const structuredData = { "@context": "https://schema.org", "@type": "WebApplication", name: "حاسبة الادخار", description: "حاسبة الادخار والاستثمار مع الفائدة المركبة وتخطيط الأهداف المالية", applicationCategory: "UtilitiesApplication", operatingSystem: "Web Browser", inLanguage: ["ar", "en"], offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" } };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[{ labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" }, { labelAr: "حاسبة الادخار", labelEn: "Savings Calculator" }]} />

        <div className="mt-5 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">🏦 حاسبة الادخار والاستثمار</h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            خطط لمستقبلك المالي — احسب نمو مدخراتك مع الفائدة المركبة، أو اعرف كم تحتاج تدخر شهرياً لتحقيق هدفك. جدول سنوي مفصّل ورسم بياني تفاعلي.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["فائدة مركبة", "وضع الهدف", "رسم بياني", "جدول سنوي", "زيادة سنوية", "مجاني 100%"].map((b) => (
              <span key={b} className="text-xs px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-full font-medium">✓ {b}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-6">

            {/* Step 1: Mode */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  اختر نوع الحساب
                </h2>
                <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 rounded-lg transition-colors text-xs">
                  <RotateCcw className="h-3.5 w-3.5" /> إعادة ضبط
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { val: "growth" as CalculationMode, label: "حساب النمو", desc: "كم ستصبح مدخراتي؟", icon: TrendingUp, emoji: "📈" },
                  { val: "goal" as CalculationMode, label: "تحقيق هدف", desc: "كم أدخر شهرياً للوصول لهدفي؟", icon: Target, emoji: "🎯" },
                ]).map((opt) => {
                  const Icon = opt.icon;
                  const isActive = input.mode === opt.val;
                  return (
                    <button key={opt.val} onClick={() => update("mode", opt.val)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-sm font-bold ${isActive ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 shadow-md" : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-bg text-gray-500 hover:border-gray-300"}`}>
                      <span className="text-2xl">{opt.emoji}</span>
                      <div className="text-right"><div className="flex items-center gap-1.5"><Icon className="h-4 w-4" />{opt.label}</div><div className="text-[10px] font-normal opacity-70">{opt.desc}</div></div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Inputs */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                بيانات الادخار
              </h2>

              {/* Goal target */}
              {input.mode === "goal" && (
                <div className="mb-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl p-4">
                  <label className="block text-xs font-medium text-indigo-700 dark:text-indigo-400 mb-1">🎯 المبلغ المستهدف</label>
                  <input type="number" value={input.targetAmount || ""} onChange={(e) => update("targetAmount", Number(e.target.value))}
                    placeholder="مثال: 500,000 ريال" className="w-full h-12 px-4 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-lg font-bold focus:ring-2 focus:ring-indigo-500 outline-none tabular-nums" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Initial Deposit */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">الإيداع الأولي (ريال)</label>
                  <input type="number" value={input.initialDeposit || ""} onChange={(e) => update("initialDeposit", Number(e.target.value))}
                    placeholder="0" className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none tabular-nums" />
                  <div className="flex flex-wrap gap-1 mt-1">
                    {QUICK_DEPOSITS.map((q) => (
                      <button key={q} onClick={() => update("initialDeposit", q)} className={`px-2 py-0.5 rounded text-[10px] transition-all ${input.initialDeposit === q ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-500 hover:bg-gray-200"}`}>
                        {q === 0 ? "٠" : fmt(q)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Contribution */}
                {input.mode === "growth" && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">الإيداع الشهري (ريال)</label>
                    <input type="number" value={input.monthlyContribution || ""} onChange={(e) => update("monthlyContribution", Number(e.target.value))}
                      placeholder="0" className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none tabular-nums" />
                    <div className="flex flex-wrap gap-1 mt-1">
                      {QUICK_MONTHLY.map((q) => (
                        <button key={q} onClick={() => update("monthlyContribution", q)} className={`px-2 py-0.5 rounded text-[10px] transition-all ${input.monthlyContribution === q ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-500 hover:bg-gray-200"}`}>
                          {fmt(q)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {input.mode === "goal" && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">المدة (سنوات)</label>
                    <input type="number" min={1} max={50} value={input.years || ""} onChange={(e) => update("years", Number(e.target.value))}
                      placeholder="10" className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none tabular-nums" />
                    <div className="flex flex-wrap gap-1 mt-1">
                      {QUICK_YEARS.map((q) => (
                        <button key={q} onClick={() => update("years", q)} className={`px-2 py-0.5 rounded text-[10px] transition-all ${input.years === q ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-500 hover:bg-gray-200"}`}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                {/* Annual Rate */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">العائد السنوي المتوقع (%)</label>
                  <input type="number" min={0} max={50} step={0.5} value={input.annualRate || ""} onChange={(e) => update("annualRate", Number(e.target.value))}
                    placeholder="7" className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none tabular-nums" />
                  <div className="flex flex-wrap gap-1 mt-1">
                    {QUICK_RATES.map((q) => (
                      <button key={q} onClick={() => update("annualRate", q)} className={`px-2 py-0.5 rounded text-[10px] transition-all ${input.annualRate === q ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-500 hover:bg-gray-200"}`}>
                        {q}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Years (growth mode) */}
                {input.mode === "growth" && (
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">المدة (سنوات)</label>
                    <input type="number" min={1} max={50} value={input.years || ""} onChange={(e) => update("years", Number(e.target.value))}
                      placeholder="10" className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none tabular-nums" />
                    <div className="flex flex-wrap gap-1 mt-1">
                      {QUICK_YEARS.map((q) => (
                        <button key={q} onClick={() => update("years", q)} className={`px-2 py-0.5 rounded text-[10px] transition-all ${input.years === q ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-500 hover:bg-gray-200"}`}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Advanced */}
              <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
                إعدادات متقدمة (التركيب، الزيادة السنوية)
              </button>
              {showAdvanced && (
                <div className="grid grid-cols-2 gap-4 mt-3 bg-gray-50 dark:bg-dark-bg rounded-xl p-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">تكرار التركيب</label>
                    <select value={input.compounding} onChange={(e) => update("compounding", e.target.value as CompoundFrequency)}
                      className="w-full h-9 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none">
                      {COMPOUND_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.labelAr}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">زيادة سنوية في الإيداع (%)</label>
                    <input type="number" min={0} max={50} step={1} value={input.annualContributionIncrease || ""} onChange={(e) => update("annualContributionIncrease", Number(e.target.value))}
                      placeholder="0" className="w-full h-9 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none tabular-nums" />
                  </div>
                </div>
              )}
            </div>

            {/* Live Result Bar */}
            {hasValue && (
              <div className="bg-gradient-to-l from-indigo-600 to-violet-600 rounded-xl px-5 py-3 flex items-center justify-between text-white shadow-lg">
                <div className="flex items-center gap-4 text-sm">
                  <span>{input.mode === "goal" ? "🎯 الادخار الشهري المطلوب:" : "🏦 الرصيد النهائي:"}</span>
                  <span className="text-2xl font-bold tabular-nums">
                    {input.mode === "goal" && result.requiredMonthly !== undefined ? `${fmt(Math.ceil(result.requiredMonthly))} ريال/شهر` : `${fmt(Math.round(result.finalBalance))} ريال`}
                  </span>
                </div>
                <span className="text-xs text-indigo-200">أرباح: {fmt(Math.round(result.totalInterest))} ريال</span>
              </div>
            )}

            {/* Main Results */}
            {hasValue && (
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                <div className="text-center mb-6">
                  {input.mode === "goal" && result.requiredMonthly !== undefined && (
                    <>
                      <p className="text-indigo-200 text-sm mb-2">🎯 لتحقيق هدفك ({fmt(input.targetAmount)} ريال) خلال {input.years} سنة</p>
                      <p className="text-4xl sm:text-5xl font-bold tabular-nums mb-1">{fmt(Math.ceil(result.requiredMonthly))}</p>
                      <p className="text-indigo-200 text-lg">ريال شهرياً</p>
                    </>
                  )}
                  {input.mode === "growth" && (
                    <>
                      <p className="text-indigo-200 text-sm mb-2">📈 رصيدك بعد {input.years} سنة</p>
                      <p className="text-4xl sm:text-5xl font-bold tabular-nums mb-1">{fmt(Math.round(result.finalBalance))}</p>
                      <p className="text-indigo-200 text-lg">ريال سعودي</p>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-indigo-200 text-[10px] mb-1">إجمالي الإيداعات</p>
                    <p className="text-xl font-bold tabular-nums">{fmt(Math.round(result.totalContributions))}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-emerald-200 text-[10px] mb-1">إجمالي الأرباح</p>
                    <p className="text-xl font-bold tabular-nums text-emerald-300">{fmt(Math.round(result.totalInterest))}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-indigo-200 text-[10px] mb-1">نسبة الربح</p>
                    <p className="text-xl font-bold">{fmtDec(result.effectiveRate)}%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Charts */}
            {hasValue && chartData.length > 1 && (
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Area Chart */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:col-span-2">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📈 نمو المدخرات عبر السنوات</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} />
                      <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => [`${fmt(Number(value))} ريال`, ""]} contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb", borderRadius: "12px", direction: "rtl", fontSize: "12px" }} />
                      <Area type="monotone" dataKey="contributions" stackId="1" fill="#6366f1" stroke="#6366f1" fillOpacity={0.3} name="الإيداعات" />
                      <Area type="monotone" dataKey="interest" stackId="1" fill="#10b981" stroke="#10b981" fillOpacity={0.3} name="الأرباح" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400"><div className="w-3 h-3 rounded-full bg-indigo-500" />الإيداعات</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400"><div className="w-3 h-3 rounded-full bg-emerald-500" />الأرباح</div>
                  </div>
                </div>

                {/* Pie */}
                {pieData.length > 1 && (
                  <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                    <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📊 توزيع الرصيد النهائي</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                          {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <Tooltip formatter={(value) => [`${fmt(Number(value))} ريال`, ""]} contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb", borderRadius: "12px", direction: "rtl", fontSize: "12px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                      {pieData.map((e, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />{e.name}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📋 ملخص</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-600 dark:text-gray-400">الإيداع الأولي</span><span className="font-medium tabular-nums">{fmt(input.initialDeposit)} ريال</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-600 dark:text-gray-400">الإيداع الشهري</span><span className="font-medium tabular-nums">{input.mode === "goal" && result.requiredMonthly ? fmt(Math.ceil(result.requiredMonthly)) : fmt(input.monthlyContribution)} ريال</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-600 dark:text-gray-400">العائد السنوي</span><span className="font-medium text-indigo-600 dark:text-indigo-400">{input.annualRate}%</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-600 dark:text-gray-400">المدة</span><span className="font-medium">{input.years} سنة</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-600 dark:text-gray-400">إجمالي الإيداعات</span><span className="font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">{fmt(Math.round(result.totalContributions))}</span></div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800"><span className="text-gray-600 dark:text-gray-400">إجمالي الأرباح</span><span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{fmt(Math.round(result.totalInterest))}</span></div>
                    <div className="flex justify-between pt-3 mt-1 border-t-2 border-indigo-200 dark:border-indigo-800/40"><span className="font-bold text-gray-800 dark:text-white">الرصيد النهائي</span><span className="font-bold text-lg text-indigo-600 dark:text-indigo-400 tabular-nums">{fmt(Math.round(result.finalBalance))} ريال</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* Year-by-year Table */}
            {hasValue && result.yearlyBreakdown.length > 0 && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button onClick={() => setShowTable(!showTable)} className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 dark:bg-dark-bg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <h3 className="font-bold text-gray-800 dark:text-white text-sm">📅 الجدول السنوي المفصّل ({result.yearlyBreakdown.length} سنة)</h3>
                  <span className="text-gray-400 text-lg">{showTable ? "▲" : "▼"}</span>
                </button>
                {showTable && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-[10px] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                          <th className="px-3 py-2 text-right">السنة</th>
                          <th className="px-3 py-2 text-right">الرصيد أول السنة</th>
                          <th className="px-3 py-2 text-right">الإيداعات</th>
                          <th className="px-3 py-2 text-right">الأرباح</th>
                          <th className="px-3 py-2 text-right">الرصيد آخر السنة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyBreakdown.map((y, i) => (
                          <tr key={y.year} className={i % 2 === 0 ? "" : "bg-gray-50 dark:bg-dark-bg/50"}>
                            <td className="px-3 py-2 font-bold text-gray-800 dark:text-white">{y.year}</td>
                            <td className="px-3 py-2 text-gray-600 dark:text-gray-300 tabular-nums">{fmt(Math.round(y.startBalance))}</td>
                            <td className="px-3 py-2 text-indigo-600 dark:text-indigo-400 tabular-nums">{fmt(Math.round(y.totalContributions))}</td>
                            <td className="px-3 py-2 text-emerald-600 dark:text-emerald-400 tabular-nums">{fmt(Math.round(y.interestEarned))}</td>
                            <td className="px-3 py-2 font-bold text-gray-800 dark:text-white tabular-nums">{fmt(Math.round(y.endBalance))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Saudi Rates Reference */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg">
                <h3 className="font-bold text-gray-800 dark:text-white text-sm">📊 متوسط العوائد في السعودية (تقريبي)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-xs text-gray-400 border-b border-gray-100 dark:border-gray-800">
                    <th className="px-4 py-3 text-right">نوع الاستثمار</th><th className="px-4 py-3 text-right">العائد السنوي</th><th className="px-4 py-3 text-right">المخاطرة</th>
                  </tr></thead>
                  <tbody>
                    {SAUDI_RATES_REFERENCE.map((r, i) => (
                      <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50 dark:bg-dark-bg/50"}>
                        <td className="px-4 py-3 text-gray-800 dark:text-white"><span className="ml-1">{r.icon}</span>{r.typeAr}</td>
                        <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400 font-bold tabular-nums">{r.rateRange}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{r.riskAr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {!hasValue && (
              <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/40 rounded-xl p-6 text-center">
                <p className="text-indigo-600 dark:text-indigo-400 text-lg mb-2">👆</p>
                <p className="text-indigo-700 dark:text-indigo-400 font-medium">أدخل بيانات الادخار لمشاهدة النتائج فوراً</p>
              </div>
            )}

            <AdSlot id="savings-mid" size="leaderboard" />
            <SavingsSEO />
            <AdSlot id="savings-btm" size="rectangle" />
            <SavingsFAQ />
          </div>

          <div className="hidden lg:block"><SavingsSidebar locale={locale} /></div>
        </div>
      </div>
    </main>
  );
}
