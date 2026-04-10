"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, ChevronDown, Zap } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  calculateBill, calculateAppliance, fmt, fmtInt,
  SECTORS, APPLIANCES, APPLIANCE_CATEGORIES, QUICK_CONSUMPTION, VAT_RATE,
  type SectorType, type ApplianceCalc,
} from "@/lib/calculations/electricity";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ElectricitySidebar from "./components/ElectricitySidebar";
import ElectricitySEO from "./components/ElectricitySEO";
import ElectricityFAQ from "./components/ElectricityFAQ";

interface Props {
  locale: string;
}

export default function ElectricityCalculatorPage({ locale }: Props) {
  const [sectorId, setSectorId] = useState<SectorType>("residential");
  const [consumption, setConsumption] = useState(0);
  const [activeView, setActiveView] = useState<"bill" | "appliance">("bill");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedAppliances, setSelectedAppliances] = useState<Map<string, { qty: number; hours: number }>>(new Map());

  const reset = useCallback(() => {
    setConsumption(0);
    setSectorId("residential");
    setShowBreakdown(false);
    setSelectedAppliances(new Map());
  }, []);

  const result = useMemo(() => calculateBill(consumption, sectorId), [consumption, sectorId]);

  const applianceResults = useMemo((): ApplianceCalc[] => {
    const results: ApplianceCalc[] = [];
    selectedAppliances.forEach((config, id) => {
      const appliance = APPLIANCES.find((a) => a.id === id);
      if (appliance) {
        results.push(calculateAppliance(appliance, config.qty, config.hours, sectorId));
      }
    });
    return results.sort((a, b) => b.monthlyKwh - a.monthlyKwh);
  }, [selectedAppliances, sectorId]);

  const totalApplianceKwh = useMemo(() => applianceResults.reduce((sum, a) => sum + a.monthlyKwh, 0), [applianceResults]);

  const toggleAppliance = useCallback((id: string) => {
    setSelectedAppliances((prev) => {
      const next = new Map(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        const appliance = APPLIANCES.find((a) => a.id === id);
        if (appliance) {
          next.set(id, { qty: appliance.defaultQty, hours: appliance.defaultHours });
        }
      }
      return next;
    });
  }, []);

  const updateAppliance = useCallback((id: string, field: "qty" | "hours", value: number) => {
    setSelectedAppliances((prev) => {
      const next = new Map(prev);
      const current = next.get(id);
      if (current) {
        next.set(id, { ...current, [field]: value });
      }
      return next;
    });
  }, []);

  const pieData = useMemo(() => {
    if (!result || result.breakdown.length === 0) return [];
    const colors = ["#10b981", "#f59e0b", "#ef4444"];
    return result.breakdown.map((b, i) => ({
      name: `الشريحة ${b.tier}`,
      value: b.cost,
      color: colors[i] || "#6366f1",
    }));
  }, [result]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة فاتورة الكهرباء السعودية 2026",
    description: "احسب فاتورة الكهرباء بدقة: 8 قطاعات، شرائح التعرفة، ضريبة 15%، حاسبة الأجهزة الكهربائية — تعرفة SEC/SERA الرسمية",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: [
      "8 قطاعات (سكني، تجاري، صناعي...)",
      "شرائح التعرفة الرسمية",
      "ضريبة القيمة المضافة 15%",
      "حاسبة الأجهزة الكهربائية",
      "20 جهاز كهربائي شائع",
      "تقدير سريع (صيف/شتاء)",
      "رسم بياني للتكلفة",
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة الكهرباء", labelEn: "Electricity Calculator" },
        ]} />

        {/* Header */}
        <div className="mt-6 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-xl p-3">
              <Zap className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                حاسبة فاتورة الكهرباء
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                8 قطاعات · تعرفة SEC الرسمية · حاسبة الأجهزة · ضريبة 15%
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {["8 قطاعات", "تعرفة رسمية", "حاسبة أجهزة", "20 جهاز", "ضريبة 15%", "تقدير صيف/شتاء"].map((b) => (
              <span key={b} className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs font-bold rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* View Tabs */}
            <div className="flex gap-2 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-1.5">
              {([
                { id: "bill" as const, label: "حساب الفاتورة", icon: "⚡" },
                { id: "appliance" as const, label: "حاسبة الأجهزة", icon: "🔌" },
              ]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    activeView === tab.id
                      ? "bg-yellow-500 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-bg"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* ═══ Bill Calculator ═══ */}
            {activeView === "bill" && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">⚡ حساب الفاتورة</h2>
                  <button onClick={reset} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <RotateCcw className="h-5 w-5" />
                  </button>
                </div>

                {/* Sector selector */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">نوع القطاع</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SECTORS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSectorId(s.id)}
                        className={`p-3 rounded-xl border-2 text-center transition-all text-sm ${
                          sectorId === s.id
                            ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-yellow-300"
                        }`}
                      >
                        <span className="text-xl block mb-1">{s.icon}</span>
                        <span className="font-bold text-gray-800 dark:text-white text-xs">{s.nameAr}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick consumption presets */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">تقدير سريع</label>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_CONSUMPTION.map((q) => (
                      <button
                        key={q.label}
                        onClick={() => setConsumption(q.kWh)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          consumption === q.kWh
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-yellow-50"
                        }`}
                      >
                        {q.icon} {q.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consumption input */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    الاستهلاك الشهري (كيلو واط ساعة)
                  </label>
                  <input
                    type="number"
                    value={consumption || ""}
                    onChange={(e) => setConsumption(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg font-bold"
                    placeholder="أدخل الاستهلاك بالكيلو واط ساعة"
                  />
                </div>

                {/* Results */}
                {result && (
                  <div>
                    {/* Total hero */}
                    <div className="bg-gradient-to-l from-yellow-50 to-white dark:from-yellow-900/10 dark:to-dark-bg rounded-xl p-6 text-center mb-6 border border-yellow-100 dark:border-yellow-900/30">
                      <p className="text-sm text-gray-500 mb-1">إجمالي الفاتورة (شامل الضريبة)</p>
                      <p className="text-4xl sm:text-5xl font-extrabold text-yellow-600 dark:text-yellow-400">
                        {fmt(result.total)}
                      </p>
                      <p className="text-lg text-gray-500">ريال / شهر</p>
                      <p className="text-xs text-gray-400 mt-2">≈ {fmt(result.dailyCost)} ريال/يوم</p>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      <StatCard label="تكلفة الاستهلاك" value={`${fmt(result.consumptionCost)} ريال`} color="text-green-600" />
                      <StatCard label="رسوم العداد" value={`${fmt(result.meterFee)} ريال`} color="text-blue-600" />
                      <StatCard label="الضريبة 15%" value={`${fmt(result.vat)} ريال`} color="text-red-600" />
                      <StatCard label="متوسط التكلفة" value={`${fmt(result.avgCostPerKwh)} ريال/ك.و.س`} color="text-amber-600" />
                    </div>

                    {/* Chart + Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      {pieData.length > 1 && (
                        <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
                          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 text-center">توزيع التكلفة</h3>
                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={35}>
                                {pieData.map((entry, i) => (
                                  <Cell key={i} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(v) => `${fmt(Number(v))} ريال`} />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="flex justify-center gap-4 mt-2">
                            {pieData.map((d) => (
                              <span key={d.name} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                                {d.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
                        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">تفصيل الشرائح</h3>
                        {result.breakdown.map((b) => (
                          <div key={b.tier} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                            <div>
                              <span className="text-xs font-bold text-gray-800 dark:text-white">الشريحة {b.tier}</span>
                              <span className="text-xs text-gray-400 mr-2">({b.rateHalalas} هللة)</span>
                            </div>
                            <div className="text-left">
                              <span className="text-xs text-gray-500">{fmtInt(b.kWh)} ك.و.س</span>
                              <span className="text-sm font-bold text-gray-800 dark:text-white mr-2">{fmt(b.cost)} ريال</span>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-2 mt-2 border-t-2 border-gray-300 dark:border-gray-600">
                          <span className="text-xs font-bold text-gray-600 dark:text-gray-400">+ رسوم العداد</span>
                          <span className="text-sm font-bold">{fmt(result.meterFee)} ريال</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-xs font-bold text-red-500">+ ضريبة {VAT_RATE * 100}%</span>
                          <span className="text-sm font-bold text-red-500">{fmt(result.vat)} ريال</span>
                        </div>
                      </div>
                    </div>

                    {/* Tariff comparison */}
                    <button
                      onClick={() => setShowBreakdown(!showBreakdown)}
                      className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-bold text-sm hover:underline"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${showBreakdown ? "rotate-180" : ""}`} />
                      {showBreakdown ? "إخفاء مقارنة القطاعات" : "📊 مقارنة تكلفة الفاتورة بين القطاعات"}
                    </button>

                    {showBreakdown && (
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100 dark:bg-dark-bg">
                              <th className="px-3 py-2 text-right font-bold text-gray-700 dark:text-gray-300">القطاع</th>
                              <th className="px-3 py-2 text-right font-bold text-gray-700 dark:text-gray-300">التكلفة</th>
                              <th className="px-3 py-2 text-right font-bold text-gray-700 dark:text-gray-300">الضريبة</th>
                              <th className="px-3 py-2 text-right font-bold text-gray-700 dark:text-gray-300">الإجمالي</th>
                            </tr>
                          </thead>
                          <tbody>
                            {SECTORS.map((s) => {
                              const r = calculateBill(consumption, s.id);
                              if (!r) return null;
                              const isCurrent = s.id === sectorId;
                              return (
                                <tr key={s.id} className={`border-b border-gray-100 dark:border-gray-800 ${isCurrent ? "bg-yellow-50 dark:bg-yellow-900/10 font-bold" : ""}`}>
                                  <td className="px-3 py-2">{s.icon} {s.nameAr}</td>
                                  <td className="px-3 py-2">{fmt(r.consumptionCost)}</td>
                                  <td className="px-3 py-2">{fmt(r.vat)}</td>
                                  <td className="px-3 py-2 font-bold text-yellow-600 dark:text-yellow-400">{fmt(r.total)}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ═══ Appliance Calculator ═══ */}
            {activeView === "appliance" && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">🔌 حاسبة استهلاك الأجهزة</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                  اختر أجهزتك وعدّل ساعات التشغيل لمعرفة استهلاك كل جهاز
                </p>

                {APPLIANCE_CATEGORIES.map((cat) => {
                  const items = APPLIANCES.filter((a) => a.category === cat.id);
                  return (
                    <div key={cat.id} className="mb-6">
                      <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-3">{cat.labelAr}</h3>
                      <div className="space-y-2">
                        {items.map((appliance) => {
                          const isSelected = selectedAppliances.has(appliance.id);
                          const config = selectedAppliances.get(appliance.id);
                          const calc = isSelected ? applianceResults.find((r) => r.appliance.id === appliance.id) : null;
                          return (
                            <div key={appliance.id} className={`rounded-xl border transition-all ${
                              isSelected ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10" : "border-gray-200 dark:border-gray-700"
                            }`}>
                              <button
                                onClick={() => toggleAppliance(appliance.id)}
                                className="w-full flex items-center justify-between p-3 text-right"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{appliance.icon}</span>
                                  <span className="text-sm font-bold text-gray-800 dark:text-white">{appliance.nameAr}</span>
                                  <span className="text-xs text-gray-400">({appliance.watts} واط)</span>
                                </div>
                                {calc && (
                                  <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">
                                    {fmtInt(calc.monthlyKwh)} ك.و.س · {fmt(calc.monthlyCost)} ريال
                                  </span>
                                )}
                              </button>
                              {isSelected && config && (
                                <div className="px-3 pb-3 flex gap-4">
                                  <div className="flex-1">
                                    <label className="text-xs text-gray-500">العدد</label>
                                    <input
                                      type="number" min={1} max={20}
                                      value={config.qty}
                                      onChange={(e) => updateAppliance(appliance.id, "qty", parseInt(e.target.value) || 1)}
                                      className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-sm text-gray-800 dark:text-white"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <label className="text-xs text-gray-500">ساعات/يوم</label>
                                    <input
                                      type="number" min={0.5} max={24} step={0.5}
                                      value={config.hours}
                                      onChange={(e) => updateAppliance(appliance.id, "hours", parseFloat(e.target.value) || 1)}
                                      className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-sm text-gray-800 dark:text-white"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Appliance totals */}
                {applianceResults.length > 0 && (
                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-900/30">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-gray-800 dark:text-white">إجمالي الاستهلاك المقدّر</span>
                      <span className="text-lg font-extrabold text-yellow-600 dark:text-yellow-400">{fmtInt(totalApplianceKwh)} ك.و.س/شهر</span>
                    </div>
                    <button
                      onClick={() => { setConsumption(Math.round(totalApplianceKwh)); setActiveView("bill"); }}
                      className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-xl transition-colors text-sm"
                    >
                      ← احسب الفاتورة بهذا الاستهلاك
                    </button>
                  </div>
                )}
              </div>
            )}

            <AdSlot id="electricity-mid" size="leaderboard" />
            <ElectricityFAQ />
            <ElectricitySEO />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <ElectricitySidebar locale={locale} />
            <AdSlot id="electricity-side" size="rectangle" />
          </aside>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className={`text-sm font-extrabold ${color}`}>{value}</p>
    </div>
  );
}
