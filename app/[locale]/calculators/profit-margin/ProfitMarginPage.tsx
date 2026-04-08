"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, TrendingUp, ChevronDown, Plus, Trash2, ArrowLeftRight, CheckCircle } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  calculateProfitMargin,
  calculateMultiProduct,
  marginToMarkup,
  markupToMargin,
  ProfitMarginInput,
  MarginMode,
  CalcDirection,
  ProductItem,
  QUICK_COSTS,
  QUICK_MARGINS,
  QUICK_MARKUPS,
  MARGIN_VS_MARKUP_TABLE,
  newProductId,
  fmt,
  fmtDec,
  fmtPct,
} from "@/lib/calculations/profit-margin";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ProfitMarginSidebar from "./components/ProfitMarginSidebar";
import ProfitMarginFAQ from "./components/ProfitMarginFAQ";
import ProfitMarginSEO from "./components/ProfitMarginSEO";

interface Props { locale: string; }

const DEFAULT_INPUT: ProfitMarginInput = {
  mode: "gross",
  direction: "from-revenue",
  revenue: 1000,
  cogs: 600,
  operatingExpenses: 0,
  otherExpenses: 0,
  targetMargin: 25,
  knownCost: 1000,
  targetMarkup: 50,
  markupCost: 1000,
  includeVAT: false,
  vatRate: 15,
};

const MODE_OPTIONS: { value: MarginMode; labelAr: string; icon: string; descAr: string; color: string }[] = [
  { value: "gross", labelAr: "هامش الربح الإجمالي", icon: "📊", descAr: "الإيرادات — تكلفة البضاعة", color: "border-green-500 bg-green-50 dark:bg-green-900/20" },
  { value: "operating", labelAr: "هامش الربح التشغيلي", icon: "⚙️", descAr: "بعد خصم المصاريف التشغيلية", color: "border-blue-500 bg-blue-50 dark:bg-blue-900/20" },
  { value: "net", labelAr: "هامش صافي الربح", icon: "💰", descAr: "بعد جميع المصاريف والضرائب", color: "border-purple-500 bg-purple-50 dark:bg-purple-900/20" },
];

const DIRECTION_OPTIONS: { value: CalcDirection; labelAr: string; descAr: string }[] = [
  { value: "from-revenue", labelAr: "من الإيرادات والتكلفة", descAr: "أعرف سعر البيع والتكلفة" },
  { value: "from-margin", labelAr: "من نسبة الهامش المستهدفة", descAr: "أريد تحديد سعر البيع" },
  { value: "from-markup", labelAr: "من نسبة هامش الربح (Markup)", descAr: "أريد إضافة نسبة على التكلفة" },
];

const PIE_COLORS = ["#22c55e", "#ef4444", "#f59e0b", "#8b5cf6"];

export default function ProfitMarginPage({ locale }: Props) {
  const [input, setInput] = useState<ProfitMarginInput>(DEFAULT_INPUT);
  const [activeTab, setActiveTab] = useState<"single" | "multi" | "convert">("single");
  const [showConversionTable, setShowConversionTable] = useState(false);

  // Multi-product
  const [products, setProducts] = useState<ProductItem[]>([
    { id: newProductId(), name: "المنتج 1", cost: 50, sellingPrice: 80, quantity: 100 },
    { id: newProductId(), name: "المنتج 2", cost: 30, sellingPrice: 55, quantity: 200 },
  ]);

  // Converter
  const [convertValue, setConvertValue] = useState(25);
  const [convertFrom, setConvertFrom] = useState<"margin" | "markup">("margin");

  const update = useCallback((patch: Partial<ProfitMarginInput>) => {
    setInput((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setInput(DEFAULT_INPUT), []);

  const result = useMemo(() => calculateProfitMargin(input), [input]);
  const multiResult = useMemo(() => calculateMultiProduct(products), [products]);

  const hasValue = (() => {
    if (input.direction === "from-revenue") return input.revenue > 0 && input.cogs > 0;
    if (input.direction === "from-margin") return input.knownCost > 0 && input.targetMargin > 0;
    return input.markupCost > 0 && input.targetMarkup > 0;
  })();

  // Pie data
  const pieData = useMemo(() => {
    if (!hasValue) return [];
    const data: { name: string; value: number }[] = [];
    if (input.mode === "gross") {
      data.push({ name: "الربح الإجمالي", value: Math.max(0, result.grossProfit) });
      data.push({ name: "تكلفة البضاعة", value: result.cogs });
    } else if (input.mode === "operating") {
      data.push({ name: "الربح التشغيلي", value: Math.max(0, result.operatingProfit) });
      data.push({ name: "تكلفة البضاعة", value: result.cogs });
      if (input.operatingExpenses > 0) data.push({ name: "المصاريف التشغيلية", value: input.operatingExpenses });
    } else {
      data.push({ name: "صافي الربح", value: Math.max(0, result.netProfit) });
      data.push({ name: "تكلفة البضاعة", value: result.cogs });
      if (input.operatingExpenses > 0) data.push({ name: "المصاريف التشغيلية", value: input.operatingExpenses });
      if (input.otherExpenses > 0) data.push({ name: "مصاريف أخرى", value: input.otherExpenses });
    }
    return data;
  }, [hasValue, result, input]);

  // Multi-product bar data
  const multiBarData = useMemo(() => {
    return multiResult.products.map((p) => ({
      name: p.name || "—",
      margin: +p.margin.toFixed(1),
      markup: +p.markup.toFixed(1),
    }));
  }, [multiResult]);

  const addProduct = () => {
    setProducts((prev) => [...prev, { id: newProductId(), name: `المنتج ${prev.length + 1}`, cost: 0, sellingPrice: 0, quantity: 1 }]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, patch: Partial<ProductItem>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  // Get the main profit & margin based on mode
  const mainProfit = input.mode === "net" ? result.netProfit : input.mode === "operating" ? result.operatingProfit : result.grossProfit;
  const mainMargin = input.mode === "net" ? result.netMargin : input.mode === "operating" ? result.operatingMargin : result.grossMargin;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة نسبة الربح",
    description: "احسب هامش الربح الإجمالي والتشغيلي وصافي الربح — تحويل Margin و Markup، مقارنة منتجات متعددة",
    url: `https://calculatorvip.com/${locale}/calculators/profit-margin`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" }, { labelAr: "حاسبة نسبة الربح", labelEn: "Profit Margin Calculator" }]} />

        {/* Header */}
        <div className="mt-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl p-3 text-white shadow-lg">
                <TrendingUp className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">حاسبة نسبة الربح</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">هامش الربح، نسبة الإضافة (Markup)، تحليل التكاليف ومقارنة المنتجات</p>
              </div>
            </div>
            <button onClick={reset} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors">
              <RotateCcw className="h-4 w-4" /><span>إعادة تعيين</span>
            </button>
          </div>
        </div>

        <AdSlot id="profit-top" size="leaderboard" />

        {/* Tabs */}
        <div className="flex gap-2 mt-6 mb-4 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-1.5">
          {([
            { key: "single" as const, label: "حاسبة الربح", icon: "📊" },
            { key: "multi" as const, label: "مقارنة المنتجات", icon: "📦" },
            { key: "convert" as const, label: "تحويل Margin ↔ Markup", icon: "🔄" },
          ]).map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${activeTab === tab.key ? "bg-green-500 text-white shadow-md" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Single Product Calculator */}
            {activeTab === "single" && (
              <>
                {/* Step 1: Mode */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <h2 className="font-bold text-gray-800 dark:text-white">نوع هامش الربح</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    {MODE_OPTIONS.map((m) => {
                      const active = input.mode === m.value;
                      return (
                        <button key={m.value} onClick={() => update({ mode: m.value })}
                          className={`relative rounded-xl border-2 p-4 text-right transition-all ${active ? `${m.color} border-opacity-100 shadow-md` : "border-gray-200 dark:border-gray-700 hover:border-gray-300"}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{m.icon}</span>
                            <span className={`font-bold text-xs ${active ? "text-gray-800 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>{m.labelAr}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">{m.descAr}</p>
                          {active && <div className="absolute top-2 left-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"><CheckCircle className="h-3.5 w-3.5 text-white" /></div>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Direction */}
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">طريقة الحساب</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {DIRECTION_OPTIONS.map((d) => (
                      <button key={d.value} onClick={() => update({ direction: d.value })}
                        className={`rounded-xl border-2 py-3 px-4 text-right transition-all ${input.direction === d.value ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-300"}`}>
                        <span className={`font-medium text-xs ${input.direction === d.value ? "text-green-700 dark:text-green-300" : "text-gray-600 dark:text-gray-400"}`}>{d.labelAr}</span>
                        <p className="text-[10px] text-gray-400 mt-0.5">{d.descAr}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Inputs */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <h2 className="font-bold text-gray-800 dark:text-white">البيانات المالية</h2>
                  </div>

                  {input.direction === "from-revenue" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">سعر البيع / الإيرادات (ريال)</label>
                          <input type="number" value={input.revenue || ""} onChange={(e) => update({ revenue: +e.target.value })}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center font-bold text-lg"
                            placeholder="1,000" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">تكلفة البضاعة / التكلفة (ريال)</label>
                          <input type="number" value={input.cogs || ""} onChange={(e) => update({ cogs: +e.target.value })}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center font-bold text-lg"
                            placeholder="600" />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs text-gray-400 ml-2 self-center">التكلفة:</span>
                        {QUICK_COSTS.map((c) => (
                          <button key={c} onClick={() => update({ cogs: c })}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${input.cogs === c ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100"}`}>{fmt(c)}</button>
                        ))}
                      </div>
                    </>
                  )}

                  {input.direction === "from-margin" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">التكلفة (ريال)</label>
                          <input type="number" value={input.knownCost || ""} onChange={(e) => update({ knownCost: +e.target.value })}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center font-bold text-lg"
                            placeholder="1,000" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">نسبة الهامش المستهدفة (%)</label>
                          <input type="number" value={input.targetMargin || ""} onChange={(e) => update({ targetMargin: +e.target.value })}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center font-bold text-lg"
                            placeholder="25" min={0} max={99} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs text-gray-400 ml-2 self-center">الهامش:</span>
                        {QUICK_MARGINS.map((m) => (
                          <button key={m} onClick={() => update({ targetMargin: m })}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${input.targetMargin === m ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100"}`}>{m}%</button>
                        ))}
                      </div>
                    </>
                  )}

                  {input.direction === "from-markup" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">التكلفة (ريال)</label>
                          <input type="number" value={input.markupCost || ""} onChange={(e) => update({ markupCost: +e.target.value })}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center font-bold text-lg"
                            placeholder="1,000" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">نسبة الإضافة — Markup (%)</label>
                          <input type="number" value={input.targetMarkup || ""} onChange={(e) => update({ targetMarkup: +e.target.value })}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center font-bold text-lg"
                            placeholder="50" min={0} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs text-gray-400 ml-2 self-center">Markup:</span>
                        {QUICK_MARKUPS.map((m) => (
                          <button key={m} onClick={() => update({ targetMarkup: m })}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${input.targetMarkup === m ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100"}`}>{m}%</button>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Operating & Other expenses */}
                  {(input.mode === "operating" || input.mode === "net") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">المصاريف التشغيلية (ريال)</label>
                        <input type="number" value={input.operatingExpenses || ""} onChange={(e) => update({ operatingExpenses: +e.target.value })}
                          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center font-bold"
                          placeholder="إيجار، رواتب، تسويق..." />
                      </div>
                      {input.mode === "net" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">مصاريف أخرى (ضرائب، فوائد...)</label>
                          <input type="number" value={input.otherExpenses || ""} onChange={(e) => update({ otherExpenses: +e.target.value })}
                            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center font-bold"
                            placeholder="ضريبة، فوائد..." />
                        </div>
                      )}
                    </div>
                  )}

                  {/* VAT toggle */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={input.includeVAT} onChange={(e) => update({ includeVAT: e.target.checked })}
                        className="w-4 h-4 rounded accent-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">إظهار السعر شامل ضريبة القيمة المضافة ({input.vatRate}%)</span>
                    </label>
                  </div>
                </div>

                {/* Results */}
                {hasValue && (
                  <>
                    {/* Result Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-4 text-white shadow-lg">
                        <p className="text-green-100 text-xs mb-1">{input.mode === "net" ? "صافي الربح" : input.mode === "operating" ? "الربح التشغيلي" : "الربح الإجمالي"}</p>
                        <p className="text-2xl font-bold">{fmtDec(mainProfit)}</p>
                        <p className="text-green-200 text-[10px] mt-1">ريال</p>
                      </div>
                      <div className={`rounded-2xl p-4 shadow-lg ${mainMargin >= 0 ? "bg-gradient-to-br from-emerald-500 to-green-700 text-white" : "bg-gradient-to-br from-red-500 to-red-700 text-white"}`}>
                        <p className="text-white/70 text-xs mb-1">نسبة الهامش (Margin)</p>
                        <p className="text-2xl font-bold">{fmtPct(mainMargin)}%</p>
                        <p className="text-white/60 text-[10px] mt-1">من الإيرادات</p>
                      </div>
                      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                        <p className="text-gray-400 text-xs mb-1">نسبة الإضافة (Markup)</p>
                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{fmtPct(result.grossMarkup)}%</p>
                        <p className="text-gray-400 text-[10px] mt-1">من التكلفة</p>
                      </div>
                      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                        <p className="text-gray-400 text-xs mb-1">{input.direction === "from-revenue" ? "الإيرادات" : "سعر البيع المطلوب"}</p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{fmtDec(result.revenue)}</p>
                        <p className="text-gray-400 text-[10px] mt-1">ريال</p>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                      <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />التفاصيل المالية
                      </h3>
                      <div className="space-y-2.5">
                        <Row label="الإيرادات / سعر البيع" value={`${fmtDec(result.revenue)} ريال`} />
                        <Row label="تكلفة البضاعة (COGS)" value={`${fmtDec(result.cogs)} ريال`} isNeg />
                        <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                          <Row label="الربح الإجمالي" value={`${fmtDec(result.grossProfit)} ريال`} highlight />
                          <Row label="هامش الربح الإجمالي" value={`${fmtPct(result.grossMargin)}%`} />
                        </div>

                        {(input.mode === "operating" || input.mode === "net") && (
                          <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                            <Row label="المصاريف التشغيلية" value={`${fmtDec(input.operatingExpenses)} ريال`} isNeg />
                            <Row label="الربح التشغيلي" value={`${fmtDec(result.operatingProfit)} ريال`} highlight />
                            <Row label="هامش الربح التشغيلي" value={`${fmtPct(result.operatingMargin)}%`} />
                          </div>
                        )}

                        {input.mode === "net" && (
                          <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                            <Row label="مصاريف أخرى (ضرائب، فوائد)" value={`${fmtDec(input.otherExpenses)} ريال`} isNeg />
                            <Row label="صافي الربح" value={`${fmtDec(result.netProfit)} ريال`} highlight />
                            <Row label="هامش صافي الربح" value={`${fmtPct(result.netMargin)}%`} />
                          </div>
                        )}

                        <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                          <Row label="نسبة الإضافة (Markup)" value={`${fmtPct(result.grossMarkup)}%`} />
                          <Row label="نسبة التكاليف من الإيرادات" value={`${fmtPct(result.costRatio)}%`} />
                        </div>

                        {input.includeVAT && (
                          <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                            <Row label={`ضريبة القيمة المضافة (${input.vatRate}%)`} value={`${fmtDec(result.vatAmount)} ريال`} />
                            <Row label="السعر شامل الضريبة" value={`${fmtDec(result.revenueWithVAT)} ريال`} highlight />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                      <h3 className="font-bold text-gray-800 dark:text-white mb-4">توزيع الإيرادات</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex justify-center">
                          <ResponsiveContainer width={220} height={220}>
                            <PieChart>
                              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                              </Pie>
                              <Tooltip formatter={(v) => `${fmtDec(Number(v))} ريال`} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex flex-col justify-center space-y-3">
                          {pieData.map((d, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                              <span className="text-xs text-gray-600 dark:text-gray-400">{d.name}</span>
                              <span className="text-xs font-bold text-gray-800 dark:text-white mr-auto">{fmtDec(d.value)} ريال</span>
                              <span className="text-[10px] text-gray-400">({result.revenue > 0 ? fmtPct((d.value / result.revenue) * 100) : 0}%)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Margin explanation */}
                    <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-200 dark:border-green-800/30 p-5">
                      <h4 className="font-bold text-green-800 dark:text-green-300 text-sm mb-3 flex items-center gap-2">
                        <ArrowLeftRight className="h-4 w-4" />الفرق بين Margin و Markup
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4 text-xs">
                        <div className="bg-white dark:bg-dark-bg rounded-xl p-3">
                          <p className="font-bold text-green-700 dark:text-green-400 mb-1">هامش الربح (Margin) = {fmtPct(result.grossMargin)}%</p>
                          <p className="text-green-600 dark:text-green-500">الربح ÷ سعر البيع × 100</p>
                          <p className="text-green-600 dark:text-green-500">{fmtDec(result.grossProfit)} ÷ {fmtDec(result.revenue)} × 100</p>
                        </div>
                        <div className="bg-white dark:bg-dark-bg rounded-xl p-3">
                          <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">نسبة الإضافة (Markup) = {fmtPct(result.grossMarkup)}%</p>
                          <p className="text-amber-600 dark:text-amber-500">الربح ÷ التكلفة × 100</p>
                          <p className="text-amber-600 dark:text-amber-500">{fmtDec(result.grossProfit)} ÷ {fmtDec(result.cogs)} × 100</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Multi-product Tab */}
            {activeTab === "multi" && (
              <>
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">📦 مقارنة ربحية المنتجات</h2>
                    <button onClick={addProduct} className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium">
                      <Plus className="h-4 w-4" />إضافة منتج
                    </button>
                  </div>

                  <div className="space-y-3">
                    {products.map((p) => (
                      <div key={p.id} className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-3">
                          <input value={p.name} onChange={(e) => updateProduct(p.id, { name: e.target.value })}
                            className="font-bold text-sm text-gray-800 dark:text-white bg-transparent border-none outline-none w-40" />
                          {products.length > 1 && (
                            <button onClick={() => removeProduct(p.id)} className="text-red-400 hover:text-red-600 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] text-gray-400 mb-1">التكلفة</label>
                            <input type="number" value={p.cost || ""} onChange={(e) => updateProduct(p.id, { cost: +e.target.value })}
                              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface px-3 py-2 text-sm text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500" placeholder="50" />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-400 mb-1">سعر البيع</label>
                            <input type="number" value={p.sellingPrice || ""} onChange={(e) => updateProduct(p.id, { sellingPrice: +e.target.value })}
                              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface px-3 py-2 text-sm text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500" placeholder="80" />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-400 mb-1">الكمية</label>
                            <input type="number" value={p.quantity || ""} onChange={(e) => updateProduct(p.id, { quantity: +e.target.value })}
                              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface px-3 py-2 text-sm text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500" placeholder="100" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Multi-product Results */}
                {multiResult.products.length > 0 && (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-4 text-white shadow-lg">
                        <p className="text-green-100 text-xs mb-1">إجمالي الربح</p>
                        <p className="text-2xl font-bold">{fmtDec(multiResult.totalProfit)}</p>
                        <p className="text-green-200 text-[10px] mt-1">ريال</p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-2xl p-4 text-white shadow-lg">
                        <p className="text-white/70 text-xs mb-1">الهامش الإجمالي</p>
                        <p className="text-2xl font-bold">{fmtPct(multiResult.overallMargin)}%</p>
                        <p className="text-white/60 text-[10px] mt-1">Margin</p>
                      </div>
                      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                        <p className="text-gray-400 text-xs mb-1">إجمالي الإيرادات</p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{fmt(multiResult.totalRevenue)}</p>
                        <p className="text-gray-400 text-[10px] mt-1">ريال</p>
                      </div>
                      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                        <p className="text-gray-400 text-xs mb-1">إجمالي التكاليف</p>
                        <p className="text-2xl font-bold text-red-500">{fmt(multiResult.totalCost)}</p>
                        <p className="text-gray-400 text-[10px] mt-1">ريال</p>
                      </div>
                    </div>

                    {/* Product comparison table */}
                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="font-bold text-gray-800 dark:text-white text-sm">تفاصيل ربحية كل منتج</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-gray-50 dark:bg-dark-bg">
                            <tr>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">المنتج</th>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">التكلفة</th>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">سعر البيع</th>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">الكمية</th>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">الربح</th>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">Margin</th>
                              <th className="px-3 py-2 text-right text-gray-500 font-medium">Markup</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {multiResult.products.map((p, i) => (
                              <tr key={i}>
                                <td className="px-3 py-2 font-medium text-gray-800 dark:text-white">{p.name}</td>
                                <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{fmtDec(p.cost)}</td>
                                <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{fmtDec(p.sellingPrice)}</td>
                                <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{fmt(p.quantity)}</td>
                                <td className={`px-3 py-2 font-bold ${p.profit >= 0 ? "text-green-600" : "text-red-600"}`}>{fmtDec(p.profit)}</td>
                                <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.margin >= 20 ? "bg-green-100 text-green-700" : p.margin >= 10 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{fmtPct(p.margin)}%</span></td>
                                <td className="px-3 py-2 text-amber-600 dark:text-amber-400 font-medium">{fmtPct(p.markup)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Multi-product bar chart */}
                    {multiBarData.length > 1 && (
                      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4">مقارنة هوامش الربح</h3>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={multiBarData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                            <Tooltip formatter={(v) => `${v}%`} />
                            <Bar dataKey="margin" name="Margin" fill="#22c55e" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="markup" name="Markup" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-6 mt-3 text-xs">
                          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500" />Margin</span>
                          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" />Markup</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* Converter Tab */}
            {activeTab === "convert" && (
              <>
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <h2 className="font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">🔄 تحويل بين Margin و Markup</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        {convertFrom === "margin" ? "هامش الربح (Margin %)" : "نسبة الإضافة (Markup %)"}
                      </label>
                      <input type="number" value={convertValue || ""} onChange={(e) => setConvertValue(+e.target.value)}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center font-bold text-xl"
                        placeholder="25" />
                    </div>
                    <button onClick={() => setConvertFrom(convertFrom === "margin" ? "markup" : "margin")}
                      className="bg-green-100 dark:bg-green-900/20 rounded-xl p-3 text-green-600 hover:bg-green-200 transition-colors self-end mb-1">
                      <ArrowLeftRight className="h-5 w-5" />
                    </button>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        {convertFrom === "margin" ? "نسبة الإضافة (Markup %)" : "هامش الربح (Margin %)"}
                      </label>
                      <div className="w-full rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 px-4 py-3 text-center font-bold text-xl text-green-700 dark:text-green-400">
                        {convertValue > 0
                          ? `${fmtPct(convertFrom === "margin" ? marginToMarkup(convertValue) : markupToMargin(convertValue))}%`
                          : "—"}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {(convertFrom === "margin" ? QUICK_MARGINS : QUICK_MARKUPS).map((v) => (
                      <button key={v} onClick={() => setConvertValue(v)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${convertValue === v ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100"}`}>{v}%</button>
                    ))}
                  </div>
                </div>

                {/* Conversion Reference Table */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <button onClick={() => setShowConversionTable(!showConversionTable)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors">
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm">📋 جدول التحويل المرجعي (Margin ↔ Markup)</h3>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showConversionTable ? "rotate-180" : ""}`} />
                  </button>
                  {showConversionTable && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50 dark:bg-dark-bg">
                          <tr>
                            <th className="px-4 py-2 text-right text-gray-500 font-medium">Margin (هامش الربح)</th>
                            <th className="px-4 py-2 text-right text-gray-500 font-medium">Markup (نسبة الإضافة)</th>
                            <th className="px-4 py-2 text-right text-gray-500 font-medium">مثال: تكلفة 100 ريال</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {MARGIN_VS_MARKUP_TABLE.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-dark-bg/50">
                              <td className="px-4 py-2 text-green-600 dark:text-green-400 font-bold">{row.margin}%</td>
                              <td className="px-4 py-2 text-amber-600 dark:text-amber-400 font-bold">{row.markup.toFixed(1)}%</td>
                              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">بيع بـ {fmtDec(100 + row.markup)} ريال → ربح {fmtDec(row.markup)} ريال</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}

            <AdSlot id="profit-mid" size="rectangle" />
            <ProfitMarginSEO />
            <ProfitMarginFAQ />
            <AdSlot id="profit-bottom" size="leaderboard" />
          </div>

          {/* Sidebar */}
          <ProfitMarginSidebar locale={locale} />
        </div>
      </div>
    </main>
  );
}

function Row({ label, value, highlight, isNeg }: { label: string; value: string; highlight?: boolean; isNeg?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className={`text-sm font-bold ${isNeg ? "text-red-500" : highlight ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-white"}`}>{isNeg ? `(${value})` : value}</span>
    </div>
  );
}
