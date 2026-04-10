"use client";

import { useState, useMemo } from "react";
import { Briefcase, Calculator, Users, TrendingDown, Info, ChevronDown, Shield, Clock, BarChart3 } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import {
  DURATION_OPTIONS,
  SMALL_BIZ_EXEMPTIONS,
  EXEMPT_INFO,
  FEE_HISTORY,
  RATE_BALANCED,
  RATE_EXCEEDING,
  calculateLaborFee,
  fmt,
  fmtInt,
} from "@/lib/calculations/labor-fee";

import dynamic from "next/dynamic";
const LaborFeeFAQ = dynamic(() => import("./components/LaborFeeFAQ"), { ssr: false });
const LaborFeeSEO = dynamic(() => import("./components/LaborFeeSEO"), { ssr: false });
const LaborFeeSidebar = dynamic(() => import("./components/LaborFeeSidebar"), { ssr: false });

export default function LaborFeeCalculatorPage({ locale }: { locale: string }) {
  const [totalExpats, setTotalExpats] = useState(5);
  const [totalSaudis, setTotalSaudis] = useState(2);
  const [duration, setDuration] = useState("annual");
  const [isSmallBiz, setIsSmallBiz] = useState(false);
  const [smallBizType, setSmallBizType] = useState("owner-only");
  const [isIndustrial, setIsIndustrial] = useState(false);
  const [showExemptions, setShowExemptions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const result = useMemo(
    () => calculateLaborFee(totalExpats, totalSaudis, duration, isSmallBiz, smallBizType, isIndustrial),
    [totalExpats, totalSaudis, duration, isSmallBiz, smallBizType, isIndustrial]
  );

  const totalEmployees = totalExpats + totalSaudis;
  const saudizationPct = totalEmployees > 0 ? (totalSaudis / totalEmployees) * 100 : 0;

  /* ── Quick presets ── */
  const presets = [
    { label: "مؤسسة صغيرة", desc: "3 وافدين + 1 سعودي", icon: "🏪", apply: () => { setTotalExpats(3); setTotalSaudis(1); setIsSmallBiz(true); setSmallBizType("owner-only"); setIsIndustrial(false); }},
    { label: "شركة متوسطة", desc: "10 وافدين + 5 سعوديين", icon: "🏢", apply: () => { setTotalExpats(10); setTotalSaudis(5); setIsSmallBiz(false); setIsIndustrial(false); }},
    { label: "شركة كبيرة", desc: "50 وافدين + 20 سعودي", icon: "🏗️", apply: () => { setTotalExpats(50); setTotalSaudis(20); setIsSmallBiz(false); setIsIndustrial(false); }},
    { label: "مصنع", desc: "30 وافدين (معفى)", icon: "🏭", apply: () => { setTotalExpats(30); setTotalSaudis(10); setIsSmallBiz(false); setIsIndustrial(true); }},
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg" dir="rtl" lang="ar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
            { labelAr: "المقابل المالي", labelEn: "Labor Fee" },
          ]}
        />

        {/* Hero */}
        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-2.5">
              <Briefcase className="h-7 w-7 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              حاسبة المقابل المالي — رسوم العمالة الوافدة
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            احسب المقابل المالي لرخص العمل — {fmtInt(RATE_BALANCED)} ريال (متوازن) أو {fmtInt(RATE_EXCEEDING)} ريال (غير متوازن) شهرياً لكل عامل
          </p>
        </div>

        <AdSlot id="labor-top" size="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* ══════════ Main Column ══════════ */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick Presets */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-orange-500" />
                اختيار سريع
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {presets.map((p) => (
                  <button key={p.label} onClick={p.apply}
                    className="text-right p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all">
                    <div className="text-2xl mb-1">{p.icon}</div>
                    <div className="font-semibold text-gray-800 dark:text-white text-sm">{p.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-5">
              <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                بيانات المنشأة
              </h2>

              {/* Employee counts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    عدد العمالة الوافدة
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={9999}
                    value={totalExpats}
                    onChange={(e) => setTotalExpats(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-lg font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    عدد الموظفين السعوديين
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={9999}
                    value={totalSaudis}
                    onChange={(e) => setTotalSaudis(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-lg font-bold text-center"
                  />
                </div>
              </div>

              {/* Saudization ratio bar */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">نسبة السعودة</span>
                  <span className={`font-bold ${saudizationPct >= 50 ? "text-emerald-600" : "text-red-600"}`}>
                    {fmt(saudizationPct)}%
                  </span>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300 rounded-r-full"
                    style={{ width: `${Math.min(saudizationPct, 100)}%` }}
                  />
                  <div
                    className="h-full bg-orange-500 transition-all duration-300 rounded-l-full"
                    style={{ width: `${Math.min(100 - saudizationPct, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
                  <span>🇸🇦 سعوديين: {totalSaudis}</span>
                  <span>🌍 وافدين: {totalExpats}</span>
                </div>
                {totalExpats > totalSaudis && (
                  <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    العمالة الوافدة تتجاوز السعوديين — سيطبق السعر الأعلى ({fmtInt(RATE_EXCEEDING)} ريال/شهر)
                  </div>
                )}
              </div>

              {/* Sector type */}
              <div>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isIndustrial}
                    onChange={(e) => setIsIndustrial(e.target.checked)}
                    className="w-5 h-5 rounded text-blue-600"
                  />
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white text-sm">🏭 منشأة صناعية مرخصة</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">معفاة بالكامل من المقابل المالي (قرار ديسمبر 2025)</div>
                  </div>
                </label>
              </div>

              {/* Small business */}
              {!isIndustrial && (
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSmallBiz}
                      onChange={(e) => setIsSmallBiz(e.target.checked)}
                      className="w-5 h-5 rounded text-emerald-600"
                    />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white text-sm">🏪 منشأة صغيرة (9 عمال فأقل)</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">إعفاء جزئي حسب تسجيل المالك بالتأمينات</div>
                    </div>
                  </label>

                  {isSmallBiz && totalEmployees <= 9 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                      {SMALL_BIZ_EXEMPTIONS.map((ex) => (
                        <button
                          key={ex.id}
                          onClick={() => setSmallBizType(ex.id)}
                          className={`text-right p-3 rounded-xl border transition-all ${
                            smallBizType === ex.id
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                              : "border-gray-200 dark:border-gray-600"
                          }`}
                        >
                          <div className="font-medium text-sm text-gray-800 dark:text-white">{ex.nameAr}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{ex.descAr}</div>
                          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                            إعفاء {ex.exemptWorkers} وافدين
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {isSmallBiz && totalEmployees > 9 && (
                    <div className="text-xs text-amber-600 dark:text-amber-400 pr-8 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      إجمالي العمال ({totalEmployees}) يتجاوز 9 — لا ينطبق إعفاء المنشآت الصغيرة
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Duration Selector */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                مدة السداد
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DURATION_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    className={`p-3 rounded-xl text-center text-sm font-medium transition-all ${
                      duration === d.id
                        ? "bg-orange-600 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                    }`}
                  >
                    {d.nameAr}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                <Info className="h-3 w-3" />
                الحد الأدنى للسداد 3 أشهر عبر سداد
              </p>
            </div>

            {/* Results */}
            {result && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-5">
                <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  نتيجة الحساب
                </h2>

                {/* Industrial exempt message */}
                {isIndustrial && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🏭</div>
                    <div className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">منشأة صناعية — معفاة بالكامل</div>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                      تم إلغاء المقابل المالي على المنشآت الصناعية المرخصة (قرار ديسمبر 2025)
                    </div>
                    {result.workPermitFee > 0 && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        رسوم رخص العمل فقط: {fmtInt(result.workPermitFee)} ريال ({totalExpats} عامل × {fmtInt(100)} ريال)
                      </div>
                    )}
                  </div>
                )}

                {/* Normal results */}
                {!isIndustrial && (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-center">
                        <div className="text-xs text-orange-600 dark:text-orange-400 mb-1">السعر الشهري / عامل</div>
                        <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{fmtInt(result.monthlyRatePerWorker)}</div>
                        <div className="text-xs text-gray-500">ريال</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
                        <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">العمال المحسوبين</div>
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{result.chargeableWorkers}</div>
                        <div className="text-xs text-gray-500">من {totalExpats} وافد</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
                        <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">الرسوم الشهرية</div>
                        <div className="text-xl font-bold text-purple-700 dark:text-purple-300">{fmtInt(result.monthlyTotal)}</div>
                        <div className="text-xs text-gray-500">ريال</div>
                      </div>
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">التكلفة السنوية</div>
                        <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{fmtInt(result.annualTotal)}</div>
                        <div className="text-xs text-gray-500">ريال</div>
                      </div>
                    </div>

                    {/* Total for period */}
                    <div className="bg-gradient-to-l from-orange-600 to-orange-800 rounded-2xl p-5 text-white text-center">
                      <div className="text-sm opacity-80 mb-1">
                        إجمالي المقابل المالي ({DURATION_OPTIONS.find((d) => d.id === duration)?.nameAr})
                      </div>
                      <div className="text-4xl font-bold">{fmtInt(result.periodTotal)} <span className="text-lg">ريال</span></div>
                      <div className="text-sm opacity-80 mt-2">
                        {result.chargeableWorkers} عامل × {fmtInt(result.monthlyRatePerWorker)} ريال × {result.periodMonths} شهر
                      </div>
                      {result.workPermitFee > 0 && (
                        <div className="text-xs opacity-70 mt-1">
                          + رسوم رخص العمل: {fmtInt(result.workPermitFee)} ريال
                        </div>
                      )}
                    </div>

                    {/* Exemption details */}
                    {result.exemptWorkers > 0 && (
                      <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-4 flex items-start gap-3">
                        <Shield className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-emerald-700 dark:text-emerald-300 text-sm">
                            إعفاء منشأة صغيرة: {result.exemptWorkers} وافدين معفون
                          </div>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                            التوفير الشهري: {fmtInt(result.exemptWorkers * result.monthlyRatePerWorker)} ريال |
                            التوفير السنوي: {fmtInt(result.exemptWorkers * result.monthlyRatePerWorker * 12)} ريال
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Savings tip */}
                    {result.savingsIfBalanced > 0 && (
                      <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4 flex items-start gap-3">
                        <TrendingDown className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-amber-700 dark:text-amber-300 text-sm">
                            نصيحة: وازن نسبة السعودة لتوفير {fmtInt(result.savingsIfBalanced)} ريال سنوياً
                          </div>
                          <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                            إذا كان عدد السعوديين ≥ عدد الوافدين، ينخفض السعر من {fmtInt(RATE_EXCEEDING)} إلى {fmtInt(RATE_BALANCED)} ريال/شهر
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Breakdown */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-right py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">البند</th>
                            <th className="text-center py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">المبلغ</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          <tr>
                            <td className="py-2 px-3">المقابل المالي الشهري</td>
                            <td className="text-center py-2 px-3 font-medium">{fmtInt(result.monthlyTotal)} ريال</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">المقابل المالي ({result.periodMonths} أشهر)</td>
                            <td className="text-center py-2 px-3 font-medium">{fmtInt(result.periodTotal)} ريال</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">رسوم رخص العمل (100 ريال × {totalExpats})</td>
                            <td className="text-center py-2 px-3 font-medium">{fmtInt(result.workPermitFee)} ريال</td>
                          </tr>
                          <tr className="bg-orange-50 dark:bg-orange-900/10">
                            <td className="py-2 px-3 font-bold">الإجمالي</td>
                            <td className="text-center py-2 px-3 font-bold text-orange-600 dark:text-orange-400">{fmtInt(result.totalWithPermit)} ريال</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Cost per worker */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">التكلفة اليومية للمنشأة</div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">{fmt(result.dailyCost)} <span className="text-sm">ريال/يوم</span></div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Rate Comparison */}
            {!isIndustrial && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                <h2 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  مقارنة الأسعار حسب عدد الوافدين
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">عدد الوافدين</th>
                        <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">شهرياً (متوازن)</th>
                        <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">شهرياً (غير متوازن)</th>
                        <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">سنوياً (متوازن)</th>
                        <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">سنوياً (غير متوازن)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {[1, 5, 10, 20, 50, 100].map((n) => (
                        <tr key={n} className={n === totalExpats ? "bg-orange-50 dark:bg-orange-900/10" : ""}>
                          <td className="py-2 px-3 font-medium">{n}</td>
                          <td className="text-center py-2 px-3">{fmtInt(n * RATE_BALANCED)}</td>
                          <td className="text-center py-2 px-3">{fmtInt(n * RATE_EXCEEDING)}</td>
                          <td className="text-center py-2 px-3 text-emerald-600 dark:text-emerald-400">{fmtInt(n * RATE_BALANCED * 12)}</td>
                          <td className="text-center py-2 px-3 text-red-600 dark:text-red-400">{fmtInt(n * RATE_EXCEEDING * 12)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Exemptions */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700">
              <button onClick={() => setShowExemptions(!showExemptions)} className="w-full p-5 flex items-center justify-between">
                <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  الفئات والقطاعات المعفاة
                </h2>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showExemptions ? "rotate-180" : ""}`} />
              </button>
              {showExemptions && (
                <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXEMPT_INFO.map((ex) => (
                    <div key={ex.nameAr} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/10">
                      <span className="text-xl flex-shrink-0">{ex.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white text-sm">{ex.nameAr}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ex.descAr}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Fee History */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700">
              <button onClick={() => setShowHistory(!showHistory)} className="w-full p-5 flex items-center justify-between">
                <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  تاريخ تطور الرسوم
                </h2>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showHistory ? "rotate-180" : ""}`} />
              </button>
              {showHistory && (
                <div className="px-5 pb-5 space-y-3">
                  {FEE_HISTORY.map((h, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="text-center flex-shrink-0 min-w-[80px]">
                        <div className="text-sm font-bold text-orange-600 dark:text-orange-400">{fmtInt(h.balanced)} / {fmtInt(h.exceeding)}</div>
                        <div className="text-xs text-gray-500">ريال/شهر</div>
                      </div>
                      <div className="h-10 w-px bg-gray-300 dark:bg-gray-600" />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white text-sm">{h.year}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{h.descAr}</div>
                      </div>
                      {i === FEE_HISTORY.length - 1 && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full mr-auto">الحالي</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <AdSlot id="labor-mid" size="rectangle" />

            <LaborFeeFAQ />
            <LaborFeeSEO />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <LaborFeeSidebar locale={locale} />
            <AdSlot id="labor-sidebar" size="rectangle" />
          </aside>
        </div>

        <AdSlot id="labor-bottom" size="leaderboard" />
      </div>
    </main>
  );
}
