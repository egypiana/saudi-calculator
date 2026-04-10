"use client";

import { useState, useMemo } from "react";
import { Users, Calculator, Info, Shield, Clock, ChevronDown, Minus, Plus, TrendingUp } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import {
  DEPENDENT_CATEGORIES,
  DURATION_OPTIONS,
  EXEMPT_CATEGORIES,
  FEE_HISTORY,
  MONTHLY_FEE,
  calculateDependentsFee,
  fmt,
  fmtInt,
  type DependentEntry,
  type DurationPeriod,
} from "@/lib/calculations/dependents-fee";

/* ═══════════════ Lazy-loaded sub-components ═══════════════ */
import dynamic from "next/dynamic";
const DependentsFAQ = dynamic(() => import("./components/DependentsFAQ"), { ssr: false });
const DependentsSEO = dynamic(() => import("./components/DependentsSEO"), { ssr: false });
const DependentsSidebar = dynamic(() => import("./components/DependentsSidebar"), { ssr: false });

/* ═══════════════ Component ═══════════════ */

export default function DependentsFeeCalculatorPage({ locale }: { locale: string }) {
  const [entries, setEntries] = useState<DependentEntry[]>(
    DEPENDENT_CATEGORIES.map((c) => ({ categoryId: c.id, count: 0 }))
  );
  const [duration, setDuration] = useState<DurationPeriod>("annual");
  const [showExemptions, setShowExemptions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const updateCount = (categoryId: string, delta: number) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.categoryId === categoryId
          ? { ...e, count: Math.max(0, Math.min(20, e.count + delta)) }
          : e
      )
    );
  };

  const setCount = (categoryId: string, value: number) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.categoryId === categoryId
          ? { ...e, count: Math.max(0, Math.min(20, value)) }
          : e
      )
    );
  };

  const totalPersons = useMemo(() => entries.reduce((s, e) => s + e.count, 0), [entries]);

  const result = useMemo(
    () => calculateDependentsFee(entries, duration),
    [entries, duration]
  );

  const resetAll = () => {
    setEntries(DEPENDENT_CATEGORIES.map((c) => ({ categoryId: c.id, count: 0 })));
  };

  /* ═══════════════ Quick presets ═══════════════ */
  const presets = [
    { label: "أسرة صغيرة", desc: "زوجة + طفلين", icon: "👨‍👩‍👦", apply: () => setEntries(DEPENDENT_CATEGORIES.map((c) => ({ categoryId: c.id, count: c.id === "wife" ? 1 : c.id === "son-under-18" ? 1 : c.id === "daughter" ? 1 : 0 }))) },
    { label: "أسرة متوسطة", desc: "زوجة + 3 أطفال + خادمة", icon: "👨‍👩‍👧‍👦", apply: () => setEntries(DEPENDENT_CATEGORIES.map((c) => ({ categoryId: c.id, count: c.id === "wife" ? 1 : c.id === "son-under-18" ? 2 : c.id === "daughter" ? 1 : c.id === "domestic-worker" ? 1 : 0 }))) },
    { label: "أسرة كبيرة", desc: "زوجة + 5 أطفال + والدة + خادمة", icon: "👨‍👩‍👧‍👦", apply: () => setEntries(DEPENDENT_CATEGORIES.map((c) => ({ categoryId: c.id, count: c.id === "wife" ? 1 : c.id === "son-under-18" ? 3 : c.id === "daughter" ? 2 : c.id === "parent" ? 1 : c.id === "domestic-worker" ? 1 : 0 }))) },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg" dir="rtl" lang="ar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
            { labelAr: "رسوم المرافقين", labelEn: "Dependents Fee" },
          ]}
        />

        {/* ── Hero ── */}
        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-2.5">
              <Users className="h-7 w-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              حاسبة رسوم المرافقين والتابعين
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            احسب رسوم المرافقين والتابعين في السعودية بدقة — {fmtInt(MONTHLY_FEE)} ريال شهرياً للفرد الواحد (2025-2026)
          </p>
        </div>

        <AdSlot id="dep-top" size="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* ══════════ Main Column ══════════ */}
          <div className="lg:col-span-2 space-y-6">
            {/* ── Quick Presets ── */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-purple-500" />
                اختيار سريع
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={p.apply}
                    className="text-right p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all"
                  >
                    <div className="text-2xl mb-1">{p.icon}</div>
                    <div className="font-semibold text-gray-800 dark:text-white text-sm">{p.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Dependents Input ── */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  عدد المرافقين والتابعين
                </h2>
                {totalPersons > 0 && (
                  <button
                    onClick={resetAll}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    إعادة تعيين
                  </button>
                )}
              </div>

              {/* Dependents (تابعين) */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  التابعون
                </div>
                <div className="space-y-3">
                  {DEPENDENT_CATEGORIES.filter((c) => c.type === "تابع").map((cat) => {
                    const entry = entries.find((e) => e.categoryId === cat.id);
                    const count = entry?.count ?? 0;
                    return (
                      <div key={cat.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 dark:text-white text-sm">{cat.nameAr}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{cat.descAr}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCount(cat.id, -1)}
                            disabled={count === 0}
                            className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-30 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            min={0}
                            max={20}
                            value={count}
                            onChange={(e) => setCount(cat.id, parseInt(e.target.value) || 0)}
                            className="w-12 h-8 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-bold text-sm"
                          />
                          <button
                            onClick={() => updateCount(cat.id, 1)}
                            disabled={count >= 20}
                            className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-900/30 disabled:opacity-30 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Companions (مرافقين) */}
              <div>
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  المرافقون
                </div>
                <div className="space-y-3">
                  {DEPENDENT_CATEGORIES.filter((c) => c.type === "مرافق").map((cat) => {
                    const entry = entries.find((e) => e.categoryId === cat.id);
                    const count = entry?.count ?? 0;
                    return (
                      <div key={cat.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 dark:text-white text-sm">{cat.nameAr}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{cat.descAr}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCount(cat.id, -1)}
                            disabled={count === 0}
                            className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-30 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            min={0}
                            max={20}
                            value={count}
                            onChange={(e) => setCount(cat.id, parseInt(e.target.value) || 0)}
                            className="w-12 h-8 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-bold text-sm"
                          />
                          <button
                            onClick={() => updateCount(cat.id, 1)}
                            disabled={count >= 20}
                            className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-900/30 disabled:opacity-30 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Duration Selector ── */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                مدة الحساب
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {DURATION_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    className={`p-3 rounded-xl text-center text-sm font-medium transition-all ${
                      duration === d.id
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    }`}
                  >
                    {d.nameAr}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Results ── */}
            {result && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-5">
                <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-purple-500" />
                  نتيجة الحساب
                </h2>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
                    <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">إجمالي الأفراد</div>
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{fmtInt(result.totalPersons)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {result.totalDependents > 0 && `${result.totalDependents} تابع`}
                      {result.totalDependents > 0 && result.totalCompanions > 0 && " + "}
                      {result.totalCompanions > 0 && `${result.totalCompanions} مرافق`}
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
                    <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">الرسوم الشهرية</div>
                    <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{fmtInt(result.monthlyTotal)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">ريال / شهر</div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">الرسوم السنوية</div>
                    <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{fmtInt(result.annualTotal)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">ريال / سنة</div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
                    <div className="text-xs text-amber-600 dark:text-amber-400 mb-1">التكلفة اليومية</div>
                    <div className="text-xl font-bold text-amber-700 dark:text-amber-300">{fmt(result.dailyCost)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">ريال / يوم</div>
                  </div>
                </div>

                {/* Total for selected period */}
                <div className="bg-gradient-to-l from-purple-600 to-purple-800 rounded-2xl p-5 text-white text-center">
                  <div className="text-sm opacity-80 mb-1">
                    إجمالي الرسوم للمدة المحددة ({DURATION_OPTIONS.find((d) => d.id === duration)?.nameAr})
                  </div>
                  <div className="text-4xl font-bold">{fmtInt(result.periodTotal)} <span className="text-lg">ريال</span></div>
                  <div className="text-sm opacity-80 mt-2">
                    {fmtInt(result.totalPersons)} فرد × {fmtInt(MONTHLY_FEE)} ريال × {result.periodMonths} شهر
                  </div>
                </div>

                {/* Breakdown Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-right py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">الفئة</th>
                        <th className="text-center py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">النوع</th>
                        <th className="text-center py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">العدد</th>
                        <th className="text-center py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">شهرياً</th>
                        <th className="text-center py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">للمدة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.entries.map((row) => (
                        <tr key={row.category.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2 px-3">
                            <span className="ml-2">{row.category.icon}</span>
                            {row.category.nameAr}
                          </td>
                          <td className="text-center py-2 px-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              row.category.type === "تابع"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}>
                              {row.category.type}
                            </span>
                          </td>
                          <td className="text-center py-2 px-3 font-medium">{row.count}</td>
                          <td className="text-center py-2 px-3">{fmtInt(row.monthlyTotal)} ريال</td>
                          <td className="text-center py-2 px-3 font-bold text-purple-600 dark:text-purple-400">{fmtInt(row.periodTotal)} ريال</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Multi-year projection */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    التكلفة التراكمية
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[1, 2, 3, 5].map((years) => (
                      <div key={years} className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-400">{years === 1 ? "سنة" : `${years} سنوات`}</div>
                        <div className="font-bold text-gray-800 dark:text-white">{fmtInt(result.annualTotal * years)}</div>
                        <div className="text-xs text-gray-400">ريال</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Empty State ── */}
            {!result && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">أضف عدد المرافقين والتابعين لحساب الرسوم</p>
              </div>
            )}

            {/* ── Exemptions Section ── */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowExemptions(!showExemptions)}
                className="w-full p-5 flex items-center justify-between"
              >
                <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  الفئات المعفاة من الرسوم
                </h2>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showExemptions ? "rotate-180" : ""}`} />
              </button>
              {showExemptions && (
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EXEMPT_CATEGORIES.map((ex) => (
                      <div key={ex.id} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/10">
                        <span className="text-xl flex-shrink-0">{ex.icon}</span>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white text-sm">{ex.nameAr}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ex.descAr}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl">
                    <p className="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
                      <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      للتحقق من الإعفاء، يمكنك الاستعلام عبر منصة أبشر أو التواصل مع الجوازات.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ── Fee History ── */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full p-5 flex items-center justify-between"
              >
                <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  تاريخ تطور الرسوم
                </h2>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showHistory ? "rotate-180" : ""}`} />
              </button>
              {showHistory && (
                <div className="px-5 pb-5">
                  <div className="space-y-3">
                    {FEE_HISTORY.map((h, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                        <div className="text-center flex-shrink-0">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{h.fee}</div>
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
                </div>
              )}
            </div>

            <AdSlot id="dep-mid" size="rectangle" />

            {/* ── FAQ & SEO ── */}
            <DependentsFAQ />
            <DependentsSEO />
          </div>

          {/* ══════════ Sidebar ══════════ */}
          <aside className="space-y-6">
            <DependentsSidebar locale={locale} />
            <AdSlot id="dep-sidebar" size="rectangle" />
          </aside>
        </div>

        <AdSlot id="dep-bottom" size="leaderboard" />
      </div>
    </main>
  );
}
