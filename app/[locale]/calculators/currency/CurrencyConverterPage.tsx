"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, ArrowLeftRight, Search } from "lucide-react";
import {
  convert, convertMulti, quickTable, fmtCurrency, fmtRate,
  CURRENCIES, POPULAR_PAIRS, QUICK_AMOUNTS, CATEGORY_LABELS,
  type CurrencyInfo,
} from "@/lib/calculations/currency";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import CurrencySidebar from "./components/CurrencySidebar";
import CurrencySEO from "./components/CurrencySEO";
import CurrencyFAQ from "./components/CurrencyFAQ";

interface Props {
  locale: string;
}

export default function CurrencyConverterPage({ locale }: Props) {
  const [fromCode, setFromCode] = useState("SAR");
  const [toCode, setToCode] = useState("EGP");
  const [amount, setAmount] = useState(1000);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [activeView, setActiveView] = useState<"convert" | "multi" | "table">("convert");

  const swap = useCallback(() => {
    setFromCode(toCode);
    setToCode(fromCode);
  }, [fromCode, toCode]);

  const reset = useCallback(() => {
    setFromCode("SAR");
    setToCode("EGP");
    setAmount(1000);
    setActiveView("convert");
  }, []);

  const result = useMemo(() => convert(amount, fromCode, toCode), [amount, fromCode, toCode]);

  const multiResult = useMemo(() => {
    const codes = POPULAR_PAIRS.filter((c) => c.code !== fromCode).map((c) => c.code);
    return convertMulti(amount, fromCode, codes);
  }, [amount, fromCode]);

  const table = useMemo(() => quickTable(fromCode, toCode), [fromCode, toCode]);

  const filterCurrencies = (search: string) => {
    if (!search) return CURRENCIES;
    const s = search.toLowerCase();
    return CURRENCIES.filter(
      (c) => c.nameAr.includes(s) || c.nameEn.toLowerCase().includes(s) || c.code.toLowerCase().includes(s) || c.countryAr.includes(s)
    );
  };

  const fromCurrency = CURRENCIES.find((c) => c.code === fromCode);
  const toCurrency = CURRENCIES.find((c) => c.code === toCode);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة تحويل العملات — الريال السعودي 2026",
    description: "أشمل حاسبة تحويل عملات سعودية: 35+ عملة، تحويل فوري، مقارنة متعددة، جدول سريع — EGP, PKR, INR, BDT, PHP, USD, EUR والمزيد",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: [
      "35+ عملة عالمية",
      "تحويل فوري ثنائي الاتجاه",
      "مقارنة متعددة العملات",
      "جدول تحويل سريع",
      "عملات التحويلات الشائعة",
      "عملات الخليج والعربية",
      "أعلام الدول",
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "تحويل العملات", labelEn: "Currency Converter" },
        ]} />

        {/* ═══ Header ═══ */}
        <div className="mt-6 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-xl p-3">
              <span className="text-2xl">💱</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                حاسبة تحويل العملات
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                35+ عملة · تحويل فوري · مقارنة متعددة · جدول سريع
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {["35+ عملة", "تحويل فوري", "مقارنة عملات", "جدول سريع", "أعلام الدول"].map((b) => (
              <span key={b} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ Main Grid ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* ═══ Popular Pairs Hero ═══ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {POPULAR_PAIRS.slice(0, 8).map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setFromCode("SAR"); setToCode(c.code); setActiveView("convert"); }}
                  className={`p-3 rounded-xl border text-center transition-all hover:shadow-md ${
                    toCode === c.code && fromCode === "SAR"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface hover:border-emerald-300"
                  }`}
                >
                  <span className="text-2xl block mb-1">{c.flag}</span>
                  <span className="text-xs font-bold text-gray-800 dark:text-white block">{c.code}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">{fmtRate(c.ratePerSAR)}</span>
                </button>
              ))}
            </div>

            {/* ═══ View Tabs ═══ */}
            <div className="flex gap-2 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-1.5">
              {([
                { id: "convert" as const, label: "تحويل", icon: "💱" },
                { id: "multi" as const, label: "مقارنة متعددة", icon: "📊" },
                { id: "table" as const, label: "جدول سريع", icon: "📋" },
              ]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    activeView === tab.id
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-bg"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* ═══ Main Converter ═══ */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  {activeView === "convert" ? "💱 تحويل العملات" : activeView === "multi" ? "📊 مقارنة متعددة" : "📋 جدول التحويل السريع"}
                </h2>
                <button onClick={reset} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>

              {/* Amount input */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">المبلغ</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {QUICK_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        amount === a ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-emerald-50"
                      }`}
                    >
                      {fmtCurrency(a, 0)}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount || ""}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-bold"
                  placeholder="أدخل المبلغ"
                />
              </div>

              {/* Currency selectors */}
              <div className="flex items-center gap-3 mb-6">
                {/* From */}
                <div className="flex-1 relative">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">من</label>
                  <button
                    onClick={() => { setShowFromDropdown(!showFromDropdown); setShowToDropdown(false); }}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-right"
                  >
                    <span className="text-xl">{fromCurrency?.flag}</span>
                    <span className="font-bold text-gray-800 dark:text-white">{fromCode}</span>
                    <span className="text-xs text-gray-400 mr-auto">{fromCurrency?.nameAr}</span>
                  </button>
                  {showFromDropdown && (
                    <CurrencyDropdown
                      search={searchFrom}
                      onSearch={setSearchFrom}
                      currencies={filterCurrencies(searchFrom)}
                      selected={fromCode}
                      onSelect={(code) => { setFromCode(code); setShowFromDropdown(false); setSearchFrom(""); }}
                      onClose={() => setShowFromDropdown(false)}
                    />
                  )}
                </div>

                {/* Swap button */}
                <button
                  onClick={swap}
                  className="mt-5 p-2.5 bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 rounded-full transition-colors"
                >
                  <ArrowLeftRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </button>

                {/* To */}
                <div className="flex-1 relative">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">إلى</label>
                  <button
                    onClick={() => { setShowToDropdown(!showToDropdown); setShowFromDropdown(false); }}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-right"
                  >
                    <span className="text-xl">{toCurrency?.flag}</span>
                    <span className="font-bold text-gray-800 dark:text-white">{toCode}</span>
                    <span className="text-xs text-gray-400 mr-auto">{toCurrency?.nameAr}</span>
                  </button>
                  {showToDropdown && (
                    <CurrencyDropdown
                      search={searchTo}
                      onSearch={setSearchTo}
                      currencies={filterCurrencies(searchTo)}
                      selected={toCode}
                      onSelect={(code) => { setToCode(code); setShowToDropdown(false); setSearchTo(""); }}
                      onClose={() => setShowToDropdown(false)}
                    />
                  )}
                </div>
              </div>

              {/* ═══ Convert View ═══ */}
              {activeView === "convert" && result && (
                <div>
                  {/* Result hero */}
                  <div className="bg-gradient-to-l from-emerald-50 to-white dark:from-emerald-900/10 dark:to-dark-bg rounded-xl p-6 text-center mb-6 border border-emerald-100 dark:border-emerald-900/30">
                    <p className="text-sm text-gray-500 mb-1">
                      {result.fromCurrency.flag} {fmtCurrency(result.fromAmount)} {result.fromCurrency.nameAr}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">=</p>
                    <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                      {result.toCurrency.flag} {fmtCurrency(result.toAmount)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{result.toCurrency.nameAr}</p>
                  </div>

                  {/* Rates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">1 {result.fromCurrency.code} =</p>
                      <p className="font-bold text-sm text-gray-800 dark:text-white">{fmtRate(result.rate)} {result.toCurrency.code}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">1 {result.toCurrency.code} =</p>
                      <p className="font-bold text-sm text-gray-800 dark:text-white">{fmtRate(result.inverseRate)} {result.fromCurrency.code}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ═══ Multi-Currency View ═══ */}
              {activeView === "multi" && multiResult && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
                    {multiResult.baseCurrency.flag} {fmtCurrency(multiResult.amount)} {multiResult.baseCurrency.nameAr} =
                  </p>
                  <div className="space-y-2">
                    {multiResult.conversions.map((c) => (
                      <div key={c.currency.code} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{c.currency.flag}</span>
                          <div>
                            <span className="font-bold text-sm text-gray-800 dark:text-white">{c.currency.nameAr}</span>
                            <span className="text-xs text-gray-400 mr-2">{c.currency.code}</span>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="font-extrabold text-emerald-600 dark:text-emerald-400">{fmtCurrency(c.amount)}</p>
                          <p className="text-xs text-gray-400">1 {multiResult.baseCurrency.code} = {fmtRate(c.rate)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ═══ Quick Table View ═══ */}
              {activeView === "table" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-dark-bg">
                        <th className="px-4 py-3 text-right font-bold text-gray-700 dark:text-gray-300">
                          {fromCurrency?.flag} {fromCode}
                        </th>
                        <th className="px-4 py-3 text-right font-bold text-gray-700 dark:text-gray-300">
                          {toCurrency?.flag} {toCode}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((row) => (
                        <tr key={row.amount} className="border-b border-gray-100 dark:border-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/10">
                          <td className="px-4 py-3 font-bold text-gray-800 dark:text-white">{fmtCurrency(row.amount, 0)}</td>
                          <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{fmtCurrency(row.converted)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* ═══ All Currencies by Category ═══ */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">🌍 جميع العملات — سعر الصرف مقابل {fromCurrency?.nameAr}</h2>
              {(["remittance", "gulf", "arab", "western", "other"] as const).map((cat) => {
                const currencies = CURRENCIES.filter((c) => c.category === cat && c.code !== fromCode);
                if (currencies.length === 0) return null;
                const catInfo = CATEGORY_LABELS[cat];
                return (
                  <div key={cat} className="mb-6 last:mb-0">
                    <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                      <span>{catInfo.icon}</span> {catInfo.labelAr}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currencies.map((c) => {
                        const r = convert(1, fromCode, c.code);
                        return (
                          <button
                            key={c.code}
                            onClick={() => { setToCode(c.code); setActiveView("convert"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-dark-bg hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors text-right"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{c.flag}</span>
                              <div>
                                <span className="text-sm font-bold text-gray-800 dark:text-white">{c.nameAr}</span>
                                <span className="text-xs text-gray-400 mr-1">({c.code})</span>
                              </div>
                            </div>
                            <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                              {r ? fmtRate(r.rate) : "—"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <AdSlot id="currency-mid" size="leaderboard" />
            <CurrencyFAQ />
            <CurrencySEO />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <CurrencySidebar locale={locale} />
            <AdSlot id="currency-side" size="rectangle" />
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ═══ Currency Dropdown ═══ */
function CurrencyDropdown({
  search, onSearch, currencies, selected, onSelect, onClose,
}: {
  search: string;
  onSearch: (v: string) => void;
  currencies: CurrencyInfo[];
  selected: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full mt-1 left-0 right-0 z-50 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl max-h-72 overflow-hidden">
        <div className="p-2 border-b border-gray-100 dark:border-gray-800">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="ابحث عن عملة..."
              className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              autoFocus
            />
          </div>
        </div>
        <div className="overflow-y-auto max-h-56">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => onSelect(c.code)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-right text-sm transition-colors ${
                selected === c.code
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold"
                  : "hover:bg-gray-50 dark:hover:bg-dark-bg text-gray-700 dark:text-gray-300"
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span className="font-bold">{c.code}</span>
              <span className="text-xs text-gray-400">{c.nameAr}</span>
              <span className="text-xs text-gray-300 mr-auto">{c.countryAr}</span>
            </button>
          ))}
          {currencies.length === 0 && (
            <p className="p-4 text-center text-sm text-gray-400">لا توجد نتائج</p>
          )}
        </div>
      </div>
    </>
  );
}
