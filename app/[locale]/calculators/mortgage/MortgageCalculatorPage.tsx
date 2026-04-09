"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, Home, TrendingDown, ChevronDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  calculateMortgage, fmt, fmtDec,
  FINANCE_TYPES, QUICK_PRICES,
  type MortgageInput, type YearSummary,
} from "@/lib/calculations/mortgage";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import BankComparison from "./components/BankComparison";
import MortgageSidebar from "./components/MortgageSidebar";
import MortgageSEO from "./components/MortgageSEO";
import MortgageFAQ from "./components/MortgageFAQ";

interface Props {
  locale: string;
}

const DEFAULT_INPUT: MortgageInput = {
  propertyPrice: 0,
  downPaymentPercent: 10,
  annualRate: 4.5,
  years: 25,
  financeType: "murabaha",
  redfSupport: false,
  redfSupportPercent: 100,
};

export default function MortgageCalculatorPage({ locale }: Props) {
  const [input, setInput] = useState<MortgageInput>(DEFAULT_INPUT);
  const [showAmortization, setShowAmortization] = useState(false);

  const update = useCallback(<K extends keyof MortgageInput>(key: K, value: MortgageInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setInput(DEFAULT_INPUT);
    setShowAmortization(false);
  }, []);

  const result = useMemo(() => calculateMortgage(input), [input]);
  const hasValue = input.propertyPrice > 0;

  /* Chart data */
  const pieData = useMemo(() => {
    if (!hasValue) return [];
    return [
      { name: "أصل التمويل", value: result.loanAmount, color: "#059669" },
      { name: "إجمالي الأرباح", value: result.totalProfit, color: "#f59e0b" },
      { name: "الدفعة الأولى", value: result.downPayment, color: "#6366f1" },
    ];
  }, [hasValue, result]);

  const barData = useMemo(() => {
    if (!hasValue || result.yearSummaries.length === 0) return [];
    return result.yearSummaries.map((y: YearSummary) => ({
      name: `سنة ${y.year}`,
      أصل: Math.round(y.totalPrincipal),
      ربح: Math.round(y.totalProfit),
    }));
  }, [hasValue, result]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة التمويل العقاري السعودية 2026 — مرابحة، إجارة، تورّق",
    description: "أشمل حاسبة تمويل عقاري سعودية: مرابحة وإجارة وتورّق، مقارنة 8 بنوك، دعم صندوق التنمية العقارية REDF، جدول سداد سنوي، ضوابط ساما",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: [
      "3 أنواع تمويل: مرابحة، إجارة، تورّق",
      "مقارنة 8 بنوك سعودية",
      "دعم صندوق التنمية العقارية",
      "جدول سداد سنوي تفصيلي",
      "رسم بياني للأقساط",
      "ضوابط مؤسسة النقد SAMA",
      "حساب القسط الشهري الفوري",
      "نسبة الربح إلى سعر العقار",
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة التمويل العقاري", labelEn: "Mortgage Calculator" },
        ]} />

        {/* ═══ Header ═══ */}
        <div className="mt-6 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="bg-primary-100 dark:bg-primary-900/30 rounded-xl p-3">
              <Home className="h-7 w-7 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                حاسبة التمويل العقاري 2026
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                مرابحة · إجارة · تورّق — مقارنة 8 بنوك · دعم REDF
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {["مرابحة + إجارة + تورّق", "8 بنوك سعودية", "دعم عقاري REDF", "جدول سداد سنوي", "ضوابط ساما"].map((b) => (
              <span key={b} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-bold rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ Main Grid ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Calculator */}
          <div className="lg:col-span-2 space-y-8">

            {/* Finance Type Selector */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">نوع التمويل</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FINANCE_TYPES.map((ft) => (
                  <button
                    key={ft.value}
                    onClick={() => update("financeType", ft.value)}
                    className={`p-4 rounded-xl border-2 text-right transition-all ${
                      input.financeType === ft.value
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-primary-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">{ft.icon}</div>
                    <div className="font-bold text-gray-800 dark:text-white text-sm">{ft.labelAr}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ft.descAr}</div>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        ft.rateType === "ثابت" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : ft.rateType === "متغير" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}>
                        {ft.rateType}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Finance type details */}
              {FINANCE_TYPES.filter((ft) => ft.value === input.financeType).map((ft) => (
                <div key={ft.value} className="mt-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                  <ul className="space-y-1">
                    {ft.detailsAr.map((d, i) => (
                      <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-primary-500 mt-0.5">●</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Calculator Inputs */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">بيانات التمويل</h2>
                <button onClick={reset} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="إعادة ضبط">
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>

              {/* Quick prices */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">سعر العقار (ريال)</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {QUICK_PRICES.map((p) => (
                    <button
                      key={p}
                      onClick={() => update("propertyPrice", p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        input.propertyPrice === p
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-primary-50"
                      }`}
                    >
                      {fmt(p)}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={input.propertyPrice || ""}
                  onChange={(e) => update("propertyPrice", parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg font-bold"
                  placeholder="أدخل سعر العقار"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {/* Down payment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    الدفعة الأولى: <span className="text-primary-600">{input.downPaymentPercent}%</span>
                    {hasValue && <span className="text-xs text-gray-400 mr-2">({fmt(result.downPayment)} ريال)</span>}
                  </label>
                  <input
                    type="range"
                    min={5} max={50} step={5}
                    value={input.downPaymentPercent}
                    onChange={(e) => update("downPaymentPercent", parseFloat(e.target.value))}
                    className="w-full accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5%</span><span>50%</span>
                  </div>
                </div>

                {/* Annual rate */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    معدل الربح السنوي: <span className="text-primary-600">{fmtDec(input.annualRate)}%</span>
                  </label>
                  <input
                    type="range"
                    min={1} max={10} step={0.25}
                    value={input.annualRate}
                    onChange={(e) => update("annualRate", parseFloat(e.target.value))}
                    className="w-full accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1%</span><span>10%</span>
                  </div>
                </div>

                {/* Years */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    مدة التمويل: <span className="text-primary-600">{input.years} سنة</span>
                  </label>
                  <input
                    type="range"
                    min={1} max={30} step={1}
                    value={input.years}
                    onChange={(e) => update("years", parseInt(e.target.value))}
                    className="w-full accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 سنة</span><span>30 سنة</span>
                  </div>
                </div>

                {/* REDF toggle */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    دعم صندوق التنمية العقارية
                  </label>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      onClick={() => update("redfSupport", !input.redfSupport)}
                      className={`relative w-14 h-7 rounded-full transition-colors ${
                        input.redfSupport ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                        input.redfSupport ? "right-0.5" : "left-0.5"
                      }`} />
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {input.redfSupport ? "مفعّل" : "غير مفعّل"}
                    </span>
                  </div>
                  {input.redfSupport && (
                    <div className="mt-3">
                      <label className="text-xs text-gray-500 dark:text-gray-400">
                        نسبة الدعم: <span className="text-primary-600 font-bold">{input.redfSupportPercent}%</span>
                      </label>
                      <input
                        type="range"
                        min={35} max={100} step={5}
                        value={input.redfSupportPercent}
                        onChange={(e) => update("redfSupportPercent", parseFloat(e.target.value))}
                        className="w-full accent-primary-600 mt-1"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>35%</span><span>100%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ═══ Results ═══ */}
            {hasValue && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
                {/* Monthly payment hero */}
                <div className="text-center mb-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">القسط الشهري</p>
                  <p className="text-4xl sm:text-5xl font-extrabold text-primary-600 dark:text-primary-400">
                    {fmt(result.monthlyPayment)}
                  </p>
                  <p className="text-lg text-gray-500 dark:text-gray-400">ريال / شهر</p>
                  {input.redfSupport && result.totalRedfSavings > 0 && (
                    <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-bold text-green-700 dark:text-green-400">
                        وفّرت {fmt(result.totalRedfSavings)} ريال بدعم REDF
                      </span>
                    </div>
                  )}
                  {input.redfSupport && result.paymentWithoutRedf > result.monthlyPayment && (
                    <p className="text-xs text-gray-400 mt-2 line-through">
                      بدون دعم: {fmt(result.paymentWithoutRedf)} ريال/شهر
                    </p>
                  )}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <StatCard label="مبلغ التمويل" value={`${fmt(result.loanAmount)} ريال`} color="text-blue-600 dark:text-blue-400" />
                  <StatCard label="الدفعة الأولى" value={`${fmt(result.downPayment)} ريال`} color="text-indigo-600 dark:text-indigo-400" />
                  <StatCard label="إجمالي الأرباح" value={`${fmt(result.totalProfit)} ريال`} color="text-amber-600 dark:text-amber-400" />
                  <StatCard label="إجمالي المبلغ" value={`${fmt(result.totalPayment)} ريال`} color="text-gray-800 dark:text-gray-200" />
                </div>

                {/* Extra stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  <MiniStat label="معدل الربح الفعلي" value={`${fmtDec(result.effectiveRate)}%`} />
                  <MiniStat label="نسبة الربح من السعر" value={`${fmtDec(result.profitToPrice)}%`} />
                  <MiniStat label="عدد الأقساط" value={`${result.totalMonths} شهر`} />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Pie chart */}
                  <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 text-center">توزيع التكلفة</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                          {pieData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => `${fmt(Number(v))} ريال`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                      {pieData.map((d) => (
                        <span key={d.name} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                          {d.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bar chart - yearly */}
                  {barData.length > 0 && barData.length <= 30 && (
                    <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
                      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 text-center">الأقساط السنوية</h3>
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={barData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={Math.max(0, Math.floor(barData.length / 6) - 1)} />
                          <YAxis tick={{ fontSize: 9 }} />
                          <Tooltip formatter={(v) => `${fmt(Number(v))} ريال`} />
                          <Bar dataKey="أصل" stackId="a" fill="#059669" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="ربح" stackId="a" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Amortization table */}
                <div>
                  <button
                    onClick={() => setShowAmortization(!showAmortization)}
                    className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold text-sm hover:underline"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${showAmortization ? "rotate-180" : ""}`} />
                    {showAmortization ? "إخفاء جدول السداد" : "عرض جدول السداد السنوي"}
                  </button>

                  {showAmortization && result.yearSummaries.length > 0 && (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-dark-bg">
                            <th className="px-3 py-2 text-right font-bold text-gray-700 dark:text-gray-300">السنة</th>
                            <th className="px-3 py-2 text-right font-bold text-gray-700 dark:text-gray-300">القسط السنوي</th>
                            <th className="px-3 py-2 text-right font-bold text-gray-700 dark:text-gray-300">الأصل</th>
                            <th className="px-3 py-2 text-right font-bold text-gray-700 dark:text-gray-300">الأرباح</th>
                            <th className="px-3 py-2 text-right font-bold text-gray-700 dark:text-gray-300">الرصيد المتبقي</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearSummaries.map((y: YearSummary) => (
                            <tr key={y.year} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-bg/50">
                              <td className="px-3 py-2 font-bold text-gray-800 dark:text-white">{y.year}</td>
                              <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{fmt(y.totalPayment)}</td>
                              <td className="px-3 py-2 text-green-600 dark:text-green-400">{fmt(y.totalPrincipal)}</td>
                              <td className="px-3 py-2 text-amber-600 dark:text-amber-400">{fmt(y.totalProfit)}</td>
                              <td className="px-3 py-2 font-bold text-gray-800 dark:text-white">{fmt(y.endBalance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bank Comparison */}
            <BankComparison propertyPrice={input.propertyPrice} years={input.years} />

            <AdSlot id="mortgage-mid" size="leaderboard" />

            {/* FAQ */}
            <MortgageFAQ />

            {/* SEO Content */}
            <MortgageSEO />
          </div>

          {/* Right: Sidebar */}
          <aside className="space-y-6">
            <MortgageSidebar locale={locale} />
            <AdSlot id="mortgage-side" size="rectangle" />
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ═══ Sub-components ═══ */

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className={`text-sm sm:text-base font-extrabold ${color}`}>{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center px-3 py-2 bg-gray-50 dark:bg-dark-bg rounded-lg">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-bold text-gray-800 dark:text-white">{value}</span>
    </div>
  );
}
