"use client";

import { useState, useMemo } from "react";
import { Wallet, Calculator, Users, CheckCircle, XCircle, Info, ChevronDown, Shield, TrendingUp } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import {
  HEAD_SUPPORT,
  DEPENDENT_OVER_18,
  DEPENDENT_UNDER_18,
  PAYMENT_DAY,
  ELIGIBILITY_CONDITIONS,
  EXCLUDED_CATEGORIES,
  PRESETS,
  SUPPORT_TABLE,
  calculateCitizenAccount,
  fmt,
  type ApplicantType,
} from "@/lib/calculations/citizen-account";

import dynamic from "next/dynamic";
const CitizenAccountFAQ = dynamic(() => import("./components/CitizenAccountFAQ"), { ssr: false });
const CitizenAccountSEO = dynamic(() => import("./components/CitizenAccountSEO"), { ssr: false });
const CitizenAccountSidebar = dynamic(() => import("./components/CitizenAccountSidebar"), { ssr: false });

export default function CitizenAccountCalculatorPage({ locale }: { locale: string }) {
  const [applicantType, setApplicantType] = useState<ApplicantType>("head-of-household");
  const [monthlyIncome, setMonthlyIncome] = useState(6000);
  const [dependentsOver18, setDependentsOver18] = useState(1);
  const [dependentsUnder18, setDependentsUnder18] = useState(2);
  const [showEligibility, setShowEligibility] = useState(false);
  const [showSupportTable, setShowSupportTable] = useState(false);

  const result = useMemo(
    () => calculateCitizenAccount({ applicantType, monthlyIncome, dependentsOver18, dependentsUnder18 }),
    [applicantType, monthlyIncome, dependentsOver18, dependentsUnder18]
  );

  const applyPreset = (p: typeof PRESETS[0]) => {
    setApplicantType(p.type);
    setMonthlyIncome(p.income);
    setDependentsOver18(p.over18);
    setDependentsUnder18(p.under18);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg" dir="rtl" lang="ar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
            { labelAr: "حساب المواطن", labelEn: "Citizen Account" },
          ]}
        />

        {/* Hero */}
        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-2.5">
              <Wallet className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              حاسبة حساب المواطن — الأهلية والمبلغ التقديري
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            احسب مبلغ دعم حساب المواطن التقديري بناءً على دخلك وعدد أفراد أسرتك (2025-2026)
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 rounded-lg px-3 py-2">
            <Info className="h-4 w-4 flex-shrink-0" />
            <span>هذه حاسبة تقديرية. للحصول على المبلغ الدقيق استخدم الحاسبة الرسمية على portal.ca.gov.sa</span>
          </div>
        </div>

        <AdSlot id="ca-top" size="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* ══════════ Main Column ══════════ */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick Presets */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-500" />
                اختيار سريع
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRESETS.map((p) => (
                  <button key={p.label} onClick={() => applyPreset(p)}
                    className="text-right p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all">
                    <div className="text-xl mb-1">{p.icon}</div>
                    <div className="font-semibold text-gray-800 dark:text-white text-xs">{p.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-5">
              <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-500" />
                بيانات الأسرة والدخل
              </h2>

              {/* Applicant Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">نوع المتقدم</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setApplicantType("independent"); setDependentsOver18(0); setDependentsUnder18(0); }}
                    className={`p-3 rounded-xl text-center text-sm font-medium border transition-all ${
                      applicantType === "independent"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    👤 فرد مستقل
                  </button>
                  <button
                    onClick={() => setApplicantType("head-of-household")}
                    className={`p-3 rounded-xl text-center text-sm font-medium border transition-all ${
                      applicantType === "head-of-household"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    👨‍👩‍👦 رب أسرة
                  </button>
                </div>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  إجمالي الدخل الشهري للأسرة (ريال)
                </label>
                <input
                  type="number"
                  min={0}
                  max={50000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-lg font-bold text-center"
                />
                <div className="flex gap-2 mt-2">
                  {[0, 3000, 5000, 8000, 12000, 15000].map((v) => (
                    <button key={v} onClick={() => setMonthlyIncome(v)}
                      className={`text-xs px-2 py-1 rounded-lg transition-all ${
                        monthlyIncome === v
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-emerald-50"
                      }`}>
                      {v === 0 ? "بدون دخل" : `${fmt(v)}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dependents (for head of household) */}
              {applicantType === "head-of-household" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      تابعين (18 سنة فأكثر)
                      <span className="text-xs text-gray-400 mr-1">({fmt(DEPENDENT_OVER_18)} ريال/فرد)</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={dependentsOver18}
                      onChange={(e) => setDependentsOver18(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-lg font-bold text-center"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">الزوجة + الأبناء 18 سنة فأكثر</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      تابعين (أقل من 18 سنة)
                      <span className="text-xs text-gray-400 mr-1">({fmt(DEPENDENT_UNDER_18)} ريال/فرد)</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={15}
                      value={dependentsUnder18}
                      onChange={(e) => setDependentsUnder18(Math.max(0, Math.min(15, parseInt(e.target.value) || 0)))}
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-lg font-bold text-center"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">الأبناء أقل من 18 سنة</p>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-5">
              <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-500" />
                نتيجة الحساب التقديرية
              </h2>

              {/* Eligibility Status */}
              <div className={`rounded-2xl p-5 text-center ${
                result.eligible
                  ? "bg-gradient-to-l from-emerald-600 to-emerald-800 text-white"
                  : "bg-gradient-to-l from-red-600 to-red-800 text-white"
              }`}>
                <div className="mb-2">
                  {result.eligible ? (
                    <CheckCircle className="h-10 w-10 mx-auto" />
                  ) : (
                    <XCircle className="h-10 w-10 mx-auto" />
                  )}
                </div>
                <div className="text-lg font-bold mb-1">
                  {result.eligible ? "مؤهل للدعم" : "غير مؤهل — الدخل يتجاوز الحد المانع"}
                </div>
                {result.eligible && (
                  <>
                    <div className="text-4xl font-bold mt-2">{fmt(result.monthlySupport)} <span className="text-lg">ريال/شهر</span></div>
                    <div className="text-sm opacity-80 mt-1">نسبة الاستحقاق: {result.supportPercentage}%</div>
                  </>
                )}
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">المبلغ المعياري</div>
                  <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{fmt(result.standardAmount)}</div>
                  <div className="text-xs text-gray-500">ريال/شهر</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
                  <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">حد الإعفاء</div>
                  <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{fmt(result.exemptionThreshold)}</div>
                  <div className="text-xs text-gray-500">ريال</div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
                  <div className="text-xs text-amber-600 dark:text-amber-400 mb-1">الحد المانع</div>
                  <div className="text-xl font-bold text-amber-700 dark:text-amber-300">{fmt(result.incomeLimit)}</div>
                  <div className="text-xs text-gray-500">ريال</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
                  <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">الدعم السنوي</div>
                  <div className="text-xl font-bold text-purple-700 dark:text-purple-300">{fmt(result.annualSupport)}</div>
                  <div className="text-xs text-gray-500">ريال</div>
                </div>
              </div>

              {/* Income position bar */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">موقع دخلك من حدود الاستحقاق</div>
                <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  {/* Exemption zone */}
                  <div
                    className="absolute h-full bg-emerald-400"
                    style={{ width: `${Math.min((result.exemptionThreshold / result.incomeLimit) * 100, 100)}%` }}
                  />
                  {/* Partial zone */}
                  <div
                    className="absolute h-full bg-amber-400"
                    style={{ right: '0', width: `${Math.max(100 - (result.exemptionThreshold / result.incomeLimit) * 100, 0)}%` }}
                  />
                  {/* Income marker */}
                  {monthlyIncome <= result.incomeLimit && (
                    <div
                      className="absolute h-full w-1 bg-red-600 z-10"
                      style={{ right: `${Math.min((monthlyIncome / result.incomeLimit) * 100, 100)}%` }}
                    />
                  )}
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
                  <span>0</span>
                  <span className="text-emerald-600">حد الإعفاء: {fmt(result.exemptionThreshold)}</span>
                  <span className="text-amber-600">الحد المانع: {fmt(result.incomeLimit)}</span>
                </div>
                <div className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400">
                  <span className="inline-block w-3 h-3 bg-emerald-400 rounded ml-1" /> دعم كامل
                  <span className="inline-block w-3 h-3 bg-amber-400 rounded mx-1 mr-3" /> دعم جزئي (متناقص)
                  <span className="inline-block w-3 h-3 bg-red-600 rounded mx-1 mr-3" /> دخلك
                </div>
              </div>

              {/* Breakdown */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-right py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">البند</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">العدد</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">المبلغ/فرد</th>
                      <th className="text-center py-2 px-3 font-semibold text-gray-600 dark:text-gray-400">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr>
                      <td className="py-2 px-3">👤 {applicantType === "independent" ? "فرد مستقل" : "رب الأسرة"}</td>
                      <td className="text-center py-2 px-3">1</td>
                      <td className="text-center py-2 px-3">{fmt(HEAD_SUPPORT)} ريال</td>
                      <td className="text-center py-2 px-3 font-medium">{fmt(result.headAmount)} ريال</td>
                    </tr>
                    {applicantType === "head-of-household" && dependentsOver18 > 0 && (
                      <tr>
                        <td className="py-2 px-3">👨 تابعين (≥18 سنة)</td>
                        <td className="text-center py-2 px-3">{dependentsOver18}</td>
                        <td className="text-center py-2 px-3">{fmt(DEPENDENT_OVER_18)} ريال</td>
                        <td className="text-center py-2 px-3 font-medium">{fmt(result.dependentsOver18Amount)} ريال</td>
                      </tr>
                    )}
                    {applicantType === "head-of-household" && dependentsUnder18 > 0 && (
                      <tr>
                        <td className="py-2 px-3">👧 تابعين (&lt;18 سنة)</td>
                        <td className="text-center py-2 px-3">{dependentsUnder18}</td>
                        <td className="text-center py-2 px-3">{fmt(DEPENDENT_UNDER_18)} ريال</td>
                        <td className="text-center py-2 px-3 font-medium">{fmt(result.dependentsUnder18Amount)} ريال</td>
                      </tr>
                    )}
                    <tr className="bg-emerald-50 dark:bg-emerald-900/10">
                      <td className="py-2 px-3 font-bold" colSpan={3}>المبلغ المعياري (الحد الأقصى)</td>
                      <td className="text-center py-2 px-3 font-bold text-emerald-600 dark:text-emerald-400">{fmt(result.standardAmount)} ريال</td>
                    </tr>
                    {result.supportPercentage < 100 && result.supportPercentage > 0 && (
                      <tr className="bg-amber-50 dark:bg-amber-900/10">
                        <td className="py-2 px-3 font-bold" colSpan={3}>
                          الدعم بعد التناقص ({result.supportPercentage}%)
                        </td>
                        <td className="text-center py-2 px-3 font-bold text-amber-600 dark:text-amber-400">{fmt(result.monthlySupport)} ريال</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Annual projection */}
              {result.eligible && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    الدعم التراكمي
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[3, 6, 12, 24].map((months) => (
                      <div key={months} className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-400">{months} {months === 3 ? "أشهر" : months === 6 ? "أشهر" : months === 12 ? "شهر" : "شهر"}</div>
                        <div className="font-bold text-gray-800 dark:text-white">{fmt(result.monthlySupport * months)}</div>
                        <div className="text-xs text-gray-400">ريال</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                يُصرف الدعم في اليوم {PAYMENT_DAY} من كل شهر ميلادي. المبالغ تقديرية وقد تختلف عن المبلغ الفعلي.
              </div>
            </div>

            {/* Eligibility Conditions */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700">
              <button onClick={() => setShowEligibility(!showEligibility)} className="w-full p-5 flex items-center justify-between">
                <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  شروط الأهلية
                </h2>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showEligibility ? "rotate-180" : ""}`} />
              </button>
              {showEligibility && (
                <div className="px-5 pb-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ELIGIBILITY_CONDITIONS.map((c) => (
                      <div key={c.id} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/10">
                        <span className="text-xl flex-shrink-0">{c.icon}</span>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white text-sm">{c.nameAr}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{c.descAr}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">الفئات المستثناة (غير السعوديين المؤهلين):</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {EXCLUDED_CATEGORIES.map((c) => (
                        <div key={c.nameAr} className="flex items-start gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                          <span className="text-lg">{c.icon}</span>
                          <div>
                            <div className="text-xs font-medium text-gray-800 dark:text-white">{c.nameAr}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{c.descAr}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Support Reference Table */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700">
              <button onClick={() => setShowSupportTable(!showSupportTable)} className="w-full p-5 flex items-center justify-between">
                <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-500" />
                  جدول مبالغ الدعم المعيارية
                </h2>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showSupportTable ? "rotate-180" : ""}`} />
              </button>
              {showSupportTable && (
                <div className="px-5 pb-5">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-right py-2 px-3 text-gray-600 dark:text-gray-400">التركيبة</th>
                          <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">الأفراد</th>
                          <th className="text-center py-2 px-3 text-gray-600 dark:text-gray-400">الحد الأقصى</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {SUPPORT_TABLE.map((row) => (
                          <tr key={row.count} className={row.count === result.totalMembers ? "bg-emerald-50 dark:bg-emerald-900/10" : ""}>
                            <td className="py-2 px-3 text-sm">{row.members}</td>
                            <td className="text-center py-2 px-3">{row.count}</td>
                            <td className="text-center py-2 px-3 font-bold text-emerald-600 dark:text-emerald-400">{fmt(row.maxSupport)} ريال</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <AdSlot id="ca-mid" size="rectangle" />

            <CitizenAccountFAQ />
            <CitizenAccountSEO />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <CitizenAccountSidebar locale={locale} />
            <AdSlot id="ca-sidebar" size="rectangle" />
          </aside>
        </div>

        <AdSlot id="ca-bottom" size="leaderboard" />
      </div>
    </main>
  );
}
