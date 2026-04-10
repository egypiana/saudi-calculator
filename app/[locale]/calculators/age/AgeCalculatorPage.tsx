"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Calendar, Clock, Heart, Globe, Cake, Calculator, ChevronDown, Sparkles } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import {
  calculateAge,
  hijriToGregorian,
  fmtNum,
  fmtBigNum,
  type AgeResult,
} from "@/lib/calculations/age";

import dynamic from "next/dynamic";
const AgeFAQ = dynamic(() => import("./components/AgeFAQ"), { ssr: false });
const AgeSEO = dynamic(() => import("./components/AgeSEO"), { ssr: false });
const AgeSidebar = dynamic(() => import("./components/AgeSidebar"), { ssr: false });

/* ═══════════════ Hijri Month Names ═══════════════ */
const HIJRI_MONTHS = [
  "محرم", "صفر", "ربيع الأول", "ربيع الثاني",
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة",
];

export default function AgeCalculatorPage({ locale }: { locale: string }) {
  const [calendarType, setCalendarType] = useState<"gregorian" | "hijri">("gregorian");
  const [birthDate, setBirthDate] = useState("");
  // Hijri inputs
  const [hijriDay, setHijriDay] = useState(1);
  const [hijriMonth, setHijriMonth] = useState(1);
  const [hijriYear, setHijriYear] = useState(1420);

  const [result, setResult] = useState<AgeResult | null>(null);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "planets">("overview");
  const [showAgeDiff, setShowAgeDiff] = useState(false);
  const [secondDate, setSecondDate] = useState("");

  const calculate = useCallback(() => {
    let date: Date;
    if (calendarType === "gregorian") {
      if (!birthDate) return;
      date = new Date(birthDate);
    } else {
      date = hijriToGregorian(hijriYear, hijriMonth, hijriDay);
    }

    const r = calculateAge(date);
    if (r) {
      setResult(r);
      setLiveSeconds(r.units.seconds);
    }
  }, [calendarType, birthDate, hijriYear, hijriMonth, hijriDay]);

  // Live counter
  useEffect(() => {
    if (!result) return;
    const timer = setInterval(() => {
      setLiveSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [result]);

  // Age difference calculation
  const ageDiff = useMemo(() => {
    if (!result || !secondDate) return null;
    const d2 = new Date(secondDate);
    const d1 = result.birthDate;
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffYears = Math.floor(diffDays / 365.25);
    const diffMonths = Math.floor((diffDays % 365.25) / 30.44);
    const diffDaysRem = Math.floor(diffDays - diffYears * 365.25 - diffMonths * 30.44);
    return { years: diffYears, months: diffMonths, days: Math.max(0, diffDaysRem), totalDays: diffDays, older: d1 < d2 ? "أنت" : "الشخص الآخر" };
  }, [result, secondDate]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg" dir="rtl" lang="ar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
            { labelAr: "حاسبة العمر", labelEn: "Age Calculator" },
          ]}
        />

        {/* Hero */}
        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-2.5">
              <Cake className="h-7 w-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              حاسبة العمر — احسب عمرك بالهجري والميلادي
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            احسب عمرك بدقة بالسنوات والأشهر والأيام. اعرف برجك، إحصائيات حياتك، وعمرك على الكواكب الأخرى!
          </p>
        </div>

        <AdSlot id="age-top" size="leaderboard" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* ══════════ Main Column ══════════ */}
          <div className="lg:col-span-2 space-y-6">

            {/* Input Section */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-5">
              <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                أدخل تاريخ ميلادك
              </h2>

              {/* Calendar type toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCalendarType("gregorian")}
                  className={`p-3 rounded-xl text-center text-sm font-medium border transition-all ${
                    calendarType === "gregorian"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                  }`}
                >
                  📅 التقويم الميلادي
                </button>
                <button
                  onClick={() => setCalendarType("hijri")}
                  className={`p-3 rounded-xl text-center text-sm font-medium border transition-all ${
                    calendarType === "hijri"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"
                  }`}
                >
                  🌙 التقويم الهجري
                </button>
              </div>

              {/* Date input */}
              {calendarType === "gregorian" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تاريخ الميلاد (ميلادي)</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-lg"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اليوم</label>
                    <input
                      type="number" min={1} max={30} value={hijriDay}
                      onChange={(e) => setHijriDay(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
                      className="w-full h-12 px-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الشهر</label>
                    <select
                      value={hijriMonth}
                      onChange={(e) => setHijriMonth(parseInt(e.target.value))}
                      className="w-full h-12 px-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    >
                      {HIJRI_MONTHS.map((m, i) => (
                        <option key={i} value={i + 1}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">السنة</label>
                    <input
                      type="number" min={1300} max={1450} value={hijriYear}
                      onChange={(e) => setHijriYear(parseInt(e.target.value) || 1420)}
                      className="w-full h-12 px-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-center font-bold"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={calculate}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors text-lg"
              >
                احسب عمري
              </button>
            </div>

            {/* Results */}
            {result && (
              <>
                {/* Main Age Display */}
                <div className="bg-gradient-to-l from-purple-600 to-purple-800 rounded-2xl p-6 text-white text-center">
                  {result.nextBirthday.isToday && (
                    <div className="text-2xl mb-2">🎂 عيد ميلاد سعيد! 🎉</div>
                  )}
                  <div className="text-sm opacity-80 mb-2">عمرك بالميلادي</div>
                  <div className="flex items-center justify-center gap-4 text-center">
                    <div>
                      <div className="text-4xl font-bold">{result.age.years}</div>
                      <div className="text-xs opacity-80">سنة</div>
                    </div>
                    <div className="text-2xl opacity-50">:</div>
                    <div>
                      <div className="text-4xl font-bold">{result.age.months}</div>
                      <div className="text-xs opacity-80">شهر</div>
                    </div>
                    <div className="text-2xl opacity-50">:</div>
                    <div>
                      <div className="text-4xl font-bold">{result.age.days}</div>
                      <div className="text-xs opacity-80">يوم</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-sm opacity-80 mb-1">عمرك بالهجري</div>
                    <div className="text-xl font-bold">
                      {result.ageHijri.years} سنة و {result.ageHijri.months} شهر و {result.ageHijri.days} يوم
                    </div>
                  </div>

                  {/* Live counter */}
                  <div className="mt-3 text-sm opacity-70">
                    <Clock className="h-4 w-4 inline ml-1" />
                    عشت {fmtNum(liveSeconds)} ثانية حتى الآن
                  </div>
                </div>

                {/* Birth Info Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
                    <div className="text-2xl mb-1">{result.birthInfo.zodiacEmoji}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">برجك</div>
                    <div className="font-bold text-sm text-gray-800 dark:text-white">{result.birthInfo.zodiacSignAr}</div>
                  </div>
                  <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
                    <div className="text-2xl mb-1">{result.birthInfo.chineseZodiacEmoji}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">البرج الصيني</div>
                    <div className="font-bold text-sm text-gray-800 dark:text-white">{result.birthInfo.chineseZodiacAr}</div>
                  </div>
                  <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
                    <div className="text-2xl mb-1">📅</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">يوم ولادتك</div>
                    <div className="font-bold text-sm text-gray-800 dark:text-white">{result.birthInfo.dayOfWeekAr}</div>
                  </div>
                  <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
                    <div className="text-2xl mb-1">{result.birthInfo.seasonAr === "الشتاء" ? "❄️" : result.birthInfo.seasonAr === "الصيف" ? "☀️" : result.birthInfo.seasonAr === "الربيع" ? "🌸" : "🍂"}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">فصل ولادتك</div>
                    <div className="font-bold text-sm text-gray-800 dark:text-white">{result.birthInfo.seasonAr}</div>
                  </div>
                </div>

                {/* Date conversions */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    تاريخ ميلادك
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-3">
                      <div className="text-xs text-blue-600 dark:text-blue-400">بالميلادي</div>
                      <div className="font-bold text-gray-800 dark:text-white">{result.birthInfo.birthGregorian}</div>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-3">
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">بالهجري</div>
                      <div className="font-bold text-gray-800 dark:text-white">{result.birthInfo.birthHijri}</div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex border-b border-gray-200 dark:border-gray-700">
                    {[
                      { id: "overview" as const, label: "العمر بالتفصيل", icon: <Calculator className="h-4 w-4" /> },
                      { id: "stats" as const, label: "إحصائيات حياتك", icon: <Heart className="h-4 w-4" /> },
                      { id: "planets" as const, label: "عمرك على الكواكب", icon: <Globe className="h-4 w-4" /> },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3 px-2 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${
                          activeTab === tab.id
                            ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                        }`}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-5">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { label: "بالسنوات", value: fmtNum(result.units.years), unit: "سنة" },
                            { label: "بالأشهر", value: fmtNum(result.units.months), unit: "شهر" },
                            { label: "بالأسابيع", value: fmtNum(result.units.weeks), unit: "أسبوع" },
                            { label: "بالأيام", value: fmtNum(result.units.days), unit: "يوم" },
                          ].map((item) => (
                            <div key={item.label} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 text-center">
                              <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
                              <div className="text-lg font-bold text-gray-800 dark:text-white">{item.value}</div>
                              <div className="text-xs text-gray-400">{item.unit}</div>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { label: "بالساعات", value: fmtNum(result.units.hours) },
                            { label: "بالدقائق", value: fmtNum(result.units.minutes) },
                            { label: "بالثواني (يتحدث مباشرة)", value: fmtNum(liveSeconds) },
                          ].map((item) => (
                            <div key={item.label} className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-3 text-center">
                              <div className="text-xs text-purple-600 dark:text-purple-400">{item.label}</div>
                              <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{item.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Next birthday */}
                        <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4">
                          <h4 className="font-semibold text-amber-700 dark:text-amber-300 text-sm mb-2 flex items-center gap-2">
                            🎂 عيد ميلادك القادم
                          </h4>
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            <div>ستبلغ <strong>{result.nextBirthday.nextAge} سنة</strong> بعد <strong className="text-amber-600">{fmtNum(result.nextBirthday.daysUntil)} يوم</strong></div>
                            <div className="text-xs text-gray-500 mt-1">{result.nextBirthday.nextDateFormatted}</div>
                          </div>
                        </div>

                        {/* Life progress bars */}
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <span>نسبة السنة الحالية المنقضية</span>
                              <span>{result.percentOfYear}%</span>
                            </div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${result.percentOfYear}%` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                              <span>نسبة العمر المتوقع (75 سنة)</span>
                              <span>{result.percentOfLife}%</span>
                            </div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${result.percentOfLife}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Life Stats Tab */}
                    {activeTab === "stats" && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { icon: "💓", label: "نبضات القلب", value: fmtBigNum(result.lifeStats.heartbeats) },
                          { icon: "🫁", label: "مرات التنفس", value: fmtBigNum(result.lifeStats.breaths) },
                          { icon: "😴", label: "ساعات النوم", value: fmtBigNum(result.lifeStats.sleepHours) },
                          { icon: "🍽️", label: "وجبات أكل", value: fmtBigNum(result.lifeStats.mealsEaten) },
                          { icon: "🚶", label: "خطوات مشي", value: fmtBigNum(result.lifeStats.stepsWalked) },
                          { icon: "💬", label: "كلمات منطوقة", value: fmtBigNum(result.lifeStats.wordsSpoken) },
                          { icon: "👁️", label: "عدد الرمشات", value: fmtBigNum(result.lifeStats.blinks) },
                          { icon: "😂", label: "مرات الضحك", value: fmtBigNum(result.lifeStats.laughs) },
                        ].map((stat) => (
                          <div key={stat.label} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 text-center">
                            <div className="text-2xl mb-1">{stat.icon}</div>
                            <div className="text-lg font-bold text-gray-800 dark:text-white">{stat.value}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Planetary Ages Tab */}
                    {activeTab === "planets" && (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          عمرك يختلف على كل كوكب لأن مدة السنة تختلف حسب بُعد الكوكب عن الشمس
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {result.planetaryAges.map((p) => (
                            <div key={p.planet} className={`rounded-xl p-3 text-center ${
                              p.planet === "Earth" ? "bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700" : "bg-gray-50 dark:bg-gray-800/50"
                            }`}>
                              <div className="text-xl mb-1">{p.emoji}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{p.planetAr}</div>
                              <div className="text-lg font-bold text-gray-800 dark:text-white">{fmtNum(p.age)}</div>
                              <div className="text-xs text-gray-400">سنة</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Age Difference */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700">
                  <button onClick={() => setShowAgeDiff(!showAgeDiff)} className="w-full p-5 flex items-center justify-between">
                    <h2 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-pink-500" />
                      حساب فرق العمر بين شخصين
                    </h2>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showAgeDiff ? "rotate-180" : ""}`} />
                  </button>
                  {showAgeDiff && (
                    <div className="px-5 pb-5 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          تاريخ ميلاد الشخص الآخر
                        </label>
                        <input
                          type="date"
                          value={secondDate}
                          onChange={(e) => setSecondDate(e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                        />
                      </div>
                      {ageDiff && (
                        <div className="bg-pink-50 dark:bg-pink-900/10 rounded-xl p-4 text-center">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">فرق العمر</div>
                          <div className="text-xl font-bold text-pink-700 dark:text-pink-300">
                            {ageDiff.years} سنة و {ageDiff.months} شهر و {ageDiff.days} يوم
                          </div>
                          <div className="text-xs text-gray-500 mt-1">({fmtNum(ageDiff.totalDays)} يوم) — {ageDiff.older} الأكبر</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Empty state */}
            {!result && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                <Cake className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">أدخل تاريخ ميلادك لمعرفة عمرك بالتفصيل</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">يدعم التقويم الهجري والميلادي</p>
              </div>
            )}

            <AdSlot id="age-mid" size="rectangle" />

            <AgeFAQ />
            <AgeSEO />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AgeSidebar locale={locale} />
            <AdSlot id="age-sidebar" size="rectangle" />
          </aside>
        </div>

        <AdSlot id="age-bottom" size="leaderboard" />
      </div>
    </main>
  );
}
