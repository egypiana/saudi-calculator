"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, ArrowUpCircle, ArrowDownCircle, Globe, Settings, TrendingUp, RefreshCw } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { VAT_COUNTRIES, calculateVAT, generateComparisonTable, QUICK_AMOUNTS, EXEMPT_ITEMS, fmt, type VATMode } from "@/lib/calculations/vat";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import VATSidebar from "./components/VATSidebar";
import VATSEO from "./components/VATSEO";
import VATFAQ from "./components/VATFAQ";

interface Props {
  locale: string;
}

const MODE_OPTIONS: { value: VATMode; labelAr: string; icon: typeof ArrowUpCircle; color: string }[] = [
  { value: "add", labelAr: "إضافة الضريبة", icon: ArrowUpCircle, color: "green" },
  { value: "remove", labelAr: "استخراج الضريبة", icon: ArrowDownCircle, color: "blue" },
];

export default function VATCalculatorPage({ locale }: Props) {
  const [amount, setAmount] = useState<number>(0);
  const [mode, setMode] = useState<VATMode>("add");
  const [selectedCountryId, setSelectedCountryId] = useState("sa");
  const [customRate, setCustomRate] = useState<number>(15);
  const [showComparison, setShowComparison] = useState(false);

  const selectedCountry = useMemo(
    () => VAT_COUNTRIES.find((c) => c.id === selectedCountryId) || VAT_COUNTRIES[0],
    [selectedCountryId]
  );

  const effectiveRate = selectedCountryId === "custom" ? customRate : selectedCountry.rate;

  const result = useMemo(() => {
    if (!amount || amount <= 0) return null;
    return calculateVAT(amount, effectiveRate, mode);
  }, [amount, effectiveRate, mode]);

  const comparisonData = useMemo(() => {
    if (!amount || amount <= 0) return [];
    return generateComparisonTable(amount, mode);
  }, [amount, mode]);

  const chartData = useMemo(() => {
    if (!result) return [];
    return [
      { name: "المبلغ قبل الضريبة", value: result.before, color: "#059669" },
      { name: "الضريبة", value: result.vat, color: "#f59e0b" },
    ];
  }, [result]);

  const reset = useCallback(() => {
    setAmount(0);
    setMode("add");
    setSelectedCountryId("sa");
    setCustomRate(15);
    setShowComparison(false);
  }, []);

  const handleAmountChange = useCallback((value: string) => {
    const num = parseFloat(value.replace(/,/g, ""));
    setAmount(isNaN(num) ? 0 : num);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة ضريبة القيمة المضافة",
    description: "حاسبة ضريبة القيمة المضافة لـ 12+ دولة — إضافة واستخراج الضريبة مع جدول مقارنة",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: ["إضافة الضريبة", "استخراج الضريبة", "12 دولة", "نسبة مخصصة", "جدول مقارنة", "رسم بياني"],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة الضريبة", labelEn: "VAT Calculator" },
        ]} />

        {/* Header */}
        <div className="mt-5 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            🧾 حاسبة ضريبة القيمة المضافة
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            أضف أو استخرج ضريبة القيمة المضافة لأي مبلغ — يدعم 12+ دولة مع جدول مقارنة ورسم بياني. اختر الدولة أو أدخل نسبة مخصصة.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["12+ دولة", "نسبة مخصصة", "جدول مقارنة", "رسم بياني", "حساب فوري", "مجاني 100%"].map((badge) => (
              <span key={badge} className="text-xs px-2.5 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full font-medium">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-6">

            {/* Step 1: Mode Selection */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  اختر نوع العملية
                </h2>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 rounded-lg transition-colors text-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  إعادة ضبط
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {MODE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = mode === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setMode(opt.value)}
                      className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all text-sm font-bold ${
                        isActive
                          ? opt.value === "add"
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 shadow-md"
                            : "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-md"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-bg text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {opt.labelAr}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Country & Rate Selection */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <Globe className="h-4 w-4" />
                اختر الدولة أو النسبة
              </h2>

              {/* Country Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                {VAT_COUNTRIES.map((country) => {
                  const isActive = selectedCountryId === country.id;
                  return (
                    <button
                      key={country.id}
                      onClick={() => setSelectedCountryId(country.id)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all text-xs ${
                        isActive
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                          : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className={`font-bold ${isActive ? "text-blue-700 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}>
                        {country.nameAr}
                      </span>
                      {country.id !== "custom" && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive ? "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        }`}>
                          {country.rate}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Rate Input */}
              {selectedCountryId === "custom" && (
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl p-4">
                  <label className="block text-xs font-medium text-amber-700 dark:text-amber-400 mb-2">أدخل نسبة الضريبة المخصصة (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={customRate || ""}
                    onChange={(e) => setCustomRate(Number(e.target.value))}
                    className="w-full max-w-[200px] h-10 px-3 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 outline-none tabular-nums"
                    placeholder="15"
                  />
                </div>
              )}

              {/* Selected Country Info */}
              {selectedCountryId !== "custom" && selectedCountry.note && (
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg px-4 py-2 text-xs text-blue-600 dark:text-blue-400">
                  ℹ️ {selectedCountry.flag} {selectedCountry.nameAr}: نسبة {selectedCountry.rate}% — {selectedCountry.note}
                </div>
              )}
            </div>

            {/* Step 3: Amount Input */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                أدخل المبلغ
              </h2>

              <div className="relative mb-4">
                <input
                  type="number"
                  value={amount || ""}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder={mode === "add" ? "المبلغ قبل الضريبة..." : "المبلغ شامل الضريبة..."}
                  className="w-full h-14 px-4 pr-4 pl-20 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none tabular-nums transition-all"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
                  {selectedCountryId !== "custom" ? selectedCountry.currencyAr || selectedCountry.currency : ""}
                </span>
                <span className="absolute left-16 top-1/2 -translate-y-1/2 text-xs text-gray-300">|</span>
                <span className="absolute left-20 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  {effectiveRate}%
                </span>
              </div>

              {/* Quick Amounts */}
              <div className="flex flex-wrap gap-2">
                {QUICK_AMOUNTS.map((qa) => (
                  <button
                    key={qa}
                    onClick={() => setAmount(qa)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      amount === qa
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {qa.toLocaleString("ar-SA")}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Result Bar */}
            {result && (
              <div className={`rounded-xl px-5 py-3 flex items-center justify-between text-white shadow-lg ${
                mode === "add"
                  ? "bg-gradient-to-l from-green-600 to-emerald-600"
                  : "bg-gradient-to-l from-blue-600 to-indigo-600"
              }`}>
                <div className="flex items-center gap-4 text-sm">
                  <span>🧾 {mode === "add" ? "المبلغ شامل الضريبة:" : "المبلغ قبل الضريبة:"}</span>
                  <span className="text-2xl font-bold tabular-nums">
                    {fmt(mode === "add" ? result.after : result.before)}
                  </span>
                </div>
                <span className="text-xs opacity-80">الضريبة: {fmt(result.vat)}</span>
              </div>
            )}

            {/* Results Card */}
            {result && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                <div className="text-center mb-6">
                  <p className="text-blue-200 text-sm mb-2">
                    {mode === "add" ? "📊 نتيجة إضافة الضريبة" : "📊 نتيجة استخراج الضريبة"}
                  </p>
                  <p className="text-blue-200 text-xs mb-1">
                    {selectedCountry.flag} {selectedCountry.nameAr} — نسبة {effectiveRate}%
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                    <p className="text-blue-200 text-xs mb-2">المبلغ قبل الضريبة</p>
                    <p className="text-2xl sm:text-3xl font-bold tabular-nums">{fmt(result.before)}</p>
                    {selectedCountryId !== "custom" && (
                      <p className="text-blue-300 text-xs mt-1">{selectedCountry.currencyAr}</p>
                    )}
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                    <p className="text-amber-200 text-xs mb-2">قيمة الضريبة ({effectiveRate}%)</p>
                    <p className="text-2xl sm:text-3xl font-bold tabular-nums text-amber-300">{fmt(result.vat)}</p>
                    {selectedCountryId !== "custom" && (
                      <p className="text-blue-300 text-xs mt-1">{selectedCountry.currencyAr}</p>
                    )}
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                    <p className="text-green-200 text-xs mb-2">المبلغ شامل الضريبة</p>
                    <p className="text-2xl sm:text-3xl font-bold tabular-nums text-green-300">{fmt(result.after)}</p>
                    {selectedCountryId !== "custom" && (
                      <p className="text-blue-300 text-xs mt-1">{selectedCountry.currencyAr}</p>
                    )}
                  </div>
                </div>

                {/* Reverse Calculation Helper */}
                <div className="mt-4 bg-white/10 rounded-xl px-4 py-3 text-center">
                  <p className="text-sm text-blue-200">
                    <RefreshCw className="inline h-3.5 w-3.5 ml-1" />
                    {mode === "add"
                      ? `${fmt(amount)} + ${effectiveRate}% ضريبة = ${fmt(result.after)}`
                      : `${fmt(amount)} يتضمن ${fmt(result.vat)} ضريبة — الأصل: ${fmt(result.before)}`}
                  </p>
                </div>
              </div>
            )}

            {/* Chart */}
            {result && (
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📊 توزيع المبلغ</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
                        {chartData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${fmt(Number(value))}`, ""]}
                        contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb", borderRadius: "12px", direction: "rtl", fontSize: "13px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-2">
                    {chartData.map((entry, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        {entry.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Summary */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📋 ملخص العملية</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-sm text-gray-600 dark:text-gray-400">نوع العملية</span>
                      <span className="font-bold text-sm text-gray-800 dark:text-white">
                        {mode === "add" ? "إضافة ضريبة" : "استخراج ضريبة"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-sm text-gray-600 dark:text-gray-400">الدولة</span>
                      <span className="font-bold text-sm text-gray-800 dark:text-white">
                        {selectedCountry.flag} {selectedCountry.nameAr}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-sm text-gray-600 dark:text-gray-400">نسبة الضريبة</span>
                      <span className="font-bold text-sm text-blue-600 dark:text-blue-400">{effectiveRate}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-sm text-gray-600 dark:text-gray-400">المبلغ الأصلي</span>
                      <span className="font-bold text-sm tabular-nums">{fmt(result.before)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-sm text-gray-600 dark:text-gray-400">الضريبة</span>
                      <span className="font-bold text-sm text-amber-600 dark:text-amber-400 tabular-nums">{fmt(result.vat)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-1 border-t-2 border-blue-200 dark:border-blue-800/40">
                      <span className="font-bold text-gray-800 dark:text-white">الإجمالي</span>
                      <span className="font-bold text-lg text-blue-600 dark:text-blue-400 tabular-nums">{fmt(result.after)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comparison Table Toggle */}
            {amount > 0 && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 dark:bg-dark-bg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    🌍 مقارنة الضريبة بين الدول
                    <span className="text-xs font-normal text-gray-400">({comparisonData.length} دولة)</span>
                  </h3>
                  <span className="text-gray-400 text-lg">{showComparison ? "▲" : "▼"}</span>
                </button>

                {showComparison && (
                  <div>
                    {/* Bar Chart */}
                    <div className="px-5 pt-4 pb-2">
                      <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={comparisonData.map(d => ({ name: d.country.nameAr, rate: d.country.rate, vat: d.vat }))}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} />
                          <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
                          <Tooltip
                            formatter={(value) => [`${fmt(Number(value))}`, "الضريبة"]}
                            labelFormatter={(label) => `${label}`}
                            contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb", borderRadius: "12px", direction: "rtl", fontSize: "12px" }}
                          />
                          <Bar dataKey="vat" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg">
                            <th className="px-4 py-3 text-right">الدولة</th>
                            <th className="px-4 py-3 text-right">النسبة</th>
                            <th className="px-4 py-3 text-right">قبل الضريبة</th>
                            <th className="px-4 py-3 text-right">الضريبة</th>
                            <th className="px-4 py-3 text-right">بعد الضريبة</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonData.map((row, i) => {
                            const isSA = row.country.id === "sa";
                            return (
                              <tr
                                key={row.country.id}
                                className={`${isSA ? "bg-blue-50 dark:bg-blue-900/10 font-bold" : i % 2 === 0 ? "" : "bg-gray-50 dark:bg-dark-bg/50"}`}
                              >
                                <td className="px-4 py-3 text-gray-800 dark:text-white">
                                  <span className="ml-1">{row.country.flag}</span>
                                  {row.country.nameAr}
                                  {isSA && <span className="text-[10px] bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-full mr-2">أنت هنا</span>}
                                </td>
                                <td className="px-4 py-3 text-blue-600 dark:text-blue-400 font-bold tabular-nums">{row.country.rate}%</td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300 tabular-nums">{fmt(row.before)}</td>
                                <td className="px-4 py-3 text-amber-600 dark:text-amber-400 tabular-nums font-medium">{fmt(row.vat)}</td>
                                <td className="px-4 py-3 text-gray-800 dark:text-white tabular-nums font-bold">{fmt(row.after)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Exempt Items (Saudi) */}
            {selectedCountryId === "sa" && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-4 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  📜 السلع والخدمات المعفاة وصفرية الضريبة
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {EXEMPT_ITEMS.map((group) => (
                    <div key={group.category} className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
                      <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-2">{group.category}</h4>
                      <ul className="space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <span className="text-green-500 mt-0.5">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No amount message */}
            {!amount && (
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 rounded-xl p-6 text-center">
                <p className="text-blue-600 dark:text-blue-400 text-lg mb-2">👆</p>
                <p className="text-blue-700 dark:text-blue-400 font-medium">أدخل المبلغ لحساب الضريبة فوراً</p>
                <p className="text-blue-500 text-sm mt-1">اختر الدولة ونوع العملية ثم أدخل المبلغ</p>
              </div>
            )}

            <AdSlot id="vat-mid" size="leaderboard" />

            {/* SEO Content */}
            <VATSEO />

            <AdSlot id="vat-btm" size="rectangle" />

            {/* FAQ */}
            <VATFAQ />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <VATSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
