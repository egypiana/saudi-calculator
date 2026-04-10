"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, Baby, ChevronDown, Calendar, Heart, Stethoscope } from "lucide-react";
import {
  calculatePregnancy,
  formatDateAr, getDayNameAr,
  CALC_METHODS, WEEK_MILESTONES, MEDICAL_APPOINTMENTS,
  type PregnancyInput, type PregnancyResult,
} from "@/lib/calculations/pregnancy";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import PregnancySidebar from "./components/PregnancySidebar";
import PregnancySEO from "./components/PregnancySEO";
import PregnancyFAQ from "./components/PregnancyFAQ";

interface Props {
  locale: string;
}

const DEFAULT_INPUT: PregnancyInput = {
  method: "lmp",
  lmpDate: "",
  ultrasoundDate: "",
  ultrasoundWeeks: 8,
  ultrasoundDays: 0,
  ivfDate: "",
  ivfDayTransfer: 5,
};

export default function PregnancyCalculatorPage({ locale }: Props) {
  const [input, setInput] = useState<PregnancyInput>(DEFAULT_INPUT);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);

  const update = useCallback(<K extends keyof PregnancyInput>(key: K, value: PregnancyInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setInput(DEFAULT_INPUT);
    setShowTimeline(false);
    setShowAppointments(false);
  }, []);

  const result = useMemo(() => calculatePregnancy(input), [input]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة الحمل والولادة + العقيقة 2026",
    description: "أشمل حاسبة حمل سعودية: موعد الولادة المتوقع، مراحل الحمل، تطور الجنين أسبوعياً، مواعيد الفحوصات، حساب العقيقة — 3 طرق حساب: آخر دورة، سونار، أطفال أنابيب",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: [
      "3 طرق حساب: دورة، سونار، IVF",
      "تطور الجنين أسبوعياً",
      "مواعيد الفحوصات الطبية",
      "حساب العقيقة تلقائياً",
      "شريط تقدّم الحمل",
      "جدول المراحل الثلاث",
      "مقارنة حجم الجنين بالفواكه",
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة الحمل والولادة", labelEn: "Pregnancy Calculator" },
        ]} />

        {/* ═══ Header ═══ */}
        <div className="mt-6 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="bg-pink-100 dark:bg-pink-900/30 rounded-xl p-3">
              <Baby className="h-7 w-7 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                حاسبة الحمل والولادة + العقيقة
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                موعد الولادة · تطور الجنين · الفحوصات · العقيقة
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {["3 طرق حساب", "تطور أسبوعي", "فحوصات طبية", "حساب العقيقة", "مقارنة بالفواكه"].map((b) => (
              <span key={b} className="px-3 py-1 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 text-xs font-bold rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ Main Grid ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* ═══ Method Selector ═══ */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">طريقة الحساب</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CALC_METHODS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => update("method", m.value)}
                    className={`p-4 rounded-xl border-2 text-right transition-all ${
                      input.method === m.value
                        ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-pink-300"
                    }`}
                  >
                    <div className="text-2xl mb-2">{m.icon}</div>
                    <div className="font-bold text-gray-800 dark:text-white text-sm">{m.labelAr}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.descAr}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* ═══ Input Fields ═══ */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-pink-500" />
                  أدخلي البيانات
                </h2>
                <button onClick={reset} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="إعادة ضبط">
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>

              {/* LMP method */}
              {input.method === "lmp" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    تاريخ أول يوم من آخر دورة شهرية
                  </label>
                  <input
                    type="date"
                    value={input.lmpDate}
                    onChange={(e) => update("lmpDate", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg"
                  />
                </div>
              )}

              {/* Ultrasound method */}
              {input.method === "ultrasound" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      تاريخ السونار
                    </label>
                    <input
                      type="date"
                      value={input.ultrasoundDate}
                      onChange={(e) => update("ultrasoundDate", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        عمر الحمل عند السونار (أسابيع)
                      </label>
                      <input
                        type="number"
                        min={4} max={40}
                        value={input.ultrasoundWeeks}
                        onChange={(e) => update("ultrasoundWeeks", parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        أيام إضافية
                      </label>
                      <input
                        type="number"
                        min={0} max={6}
                        value={input.ultrasoundDays}
                        onChange={(e) => update("ultrasoundDays", parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* IVF method */}
              {input.method === "ivf" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      تاريخ نقل الأجنّة
                    </label>
                    <input
                      type="date"
                      value={input.ivfDate}
                      onChange={(e) => update("ivfDate", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      نوع الجنين المنقول
                    </label>
                    <div className="flex gap-3">
                      {([3, 5] as const).map((day) => (
                        <button
                          key={day}
                          onClick={() => update("ivfDayTransfer", day)}
                          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                            input.ivfDayTransfer === day
                              ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300"
                              : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-pink-300"
                          }`}
                        >
                          جنين يوم {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ═══ Results ═══ */}
            {result && <ResultsSection result={result} />}

            {/* ═══ Aqiqah Section ═══ */}
            {result && <AqiqahSection result={result} />}

            {/* ═══ Baby Size Timeline ═══ */}
            {result && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
                <button
                  onClick={() => setShowTimeline(!showTimeline)}
                  className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-sm hover:underline w-full"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${showTimeline ? "rotate-180" : ""}`} />
                  {showTimeline ? "إخفاء تطور الجنين الأسبوعي" : "🍇 عرض تطور الجنين أسبوعياً (مقارنة بالفواكه)"}
                </button>

                {showTimeline && (
                  <div className="mt-6 space-y-3">
                    {WEEK_MILESTONES.map((m) => {
                      const isCurrent = result.currentWeek >= m.week && result.currentWeek < (WEEK_MILESTONES.find((n) => n.week > m.week)?.week ?? 41);
                      const isPast = result.currentWeek > m.week;
                      return (
                        <div
                          key={m.week}
                          className={`flex items-start gap-4 p-3 rounded-xl transition-all ${
                            isCurrent
                              ? "bg-pink-50 dark:bg-pink-900/20 border-2 border-pink-300 dark:border-pink-700"
                              : isPast
                              ? "opacity-60"
                              : "bg-gray-50 dark:bg-dark-bg"
                          }`}
                        >
                          <div className="flex-shrink-0 w-16 text-center">
                            <div className={`text-xs font-bold rounded-full px-2 py-0.5 ${
                              m.trimester === 1 ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
                              : m.trimester === 2 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                            }`}>
                              أسبوع {m.week}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-gray-800 dark:text-white">{m.sizeAr}</span>
                              {isCurrent && (
                                <span className="text-xs px-2 py-0.5 bg-pink-500 text-white rounded-full animate-pulse">أنتِ هنا</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{m.developmentAr}</p>
                            <div className="flex gap-3 mt-1 text-xs text-gray-400">
                              <span>الوزن: {m.weightGrams} غرام</span>
                              <span>الطول: {m.lengthCm} سم</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ═══ Medical Appointments ═══ */}
            {result && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
                <button
                  onClick={() => setShowAppointments(!showAppointments)}
                  className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-sm hover:underline w-full"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAppointments ? "rotate-180" : ""}`} />
                  {showAppointments ? "إخفاء مواعيد الفحوصات" : "🩺 عرض مواعيد الفحوصات الطبية"}
                </button>

                {showAppointments && (
                  <div className="mt-6 space-y-3">
                    {MEDICAL_APPOINTMENTS.map((apt) => {
                      const isDone = result.currentWeek > apt.weekEnd;
                      const isCurrent = result.currentWeek >= apt.weekStart && result.currentWeek <= apt.weekEnd;
                      return (
                        <div
                          key={apt.id}
                          className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                            isCurrent
                              ? "border-2 border-pink-400 dark:border-pink-600 bg-pink-50 dark:bg-pink-900/10"
                              : isDone
                              ? "border-gray-100 dark:border-gray-800 opacity-50"
                              : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-bg"
                          }`}
                        >
                          <div className="text-2xl flex-shrink-0">{apt.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-gray-800 dark:text-white">{apt.nameAr}</span>
                              {isCurrent && (
                                <span className="text-xs px-2 py-0.5 bg-green-500 text-white rounded-full">الآن</span>
                              )}
                              {isDone && (
                                <span className="text-xs px-2 py-0.5 bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">تم</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{apt.descAr}</p>
                            <span className="text-xs font-bold" style={{ color: apt.color }}>
                              الأسبوع {apt.weekStart} - {apt.weekEnd}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <AdSlot id="pregnancy-mid" size="leaderboard" />
            <PregnancyFAQ />
            <PregnancySEO />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <PregnancySidebar locale={locale} />
            <AdSlot id="pregnancy-side" size="rectangle" />
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ═══════════════ Sub-components ═══════════════ */

function ResultsSection({ result }: { result: PregnancyResult }) {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      {/* Due date hero */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">موعد الولادة المتوقع</p>
        <p className="text-3xl sm:text-4xl font-extrabold text-pink-600 dark:text-pink-400">
          {formatDateAr(result.dueDate)}
        </p>
        <p className="text-sm text-gray-400 mt-1">{getDayNameAr(result.dueDate)}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>الأسبوع {result.currentWeek} + {result.currentDay} يوم</span>
          <span>{Math.round(result.progressPercent)}% مكتمل</span>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
          {/* Trimester sections */}
          <div className="absolute inset-0 flex">
            <div className="w-[30%] bg-pink-200/50 dark:bg-pink-900/20" />
            <div className="w-[37.5%] bg-amber-200/50 dark:bg-amber-900/20" />
            <div className="w-[32.5%] bg-indigo-200/50 dark:bg-indigo-900/20" />
          </div>
          <div
            className="h-full rounded-full transition-all duration-500 relative z-10"
            style={{
              width: `${result.progressPercent}%`,
              background: result.trimester.number === 1
                ? "linear-gradient(90deg, #ec4899, #f472b6)"
                : result.trimester.number === 2
                ? "linear-gradient(90deg, #ec4899, #f59e0b)"
                : "linear-gradient(90deg, #ec4899, #f59e0b, #6366f1)",
            }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 text-gray-400">
          <span>🌸 الأول</span>
          <span>🌻 الثاني</span>
          <span>👶 الثالث</span>
        </div>
      </div>

      {/* Current trimester */}
      <div className="flex items-center gap-3 p-4 rounded-xl mb-6" style={{
        backgroundColor: result.trimester.number === 1 ? "#fdf2f8" : result.trimester.number === 2 ? "#fffbeb" : "#eef2ff",
      }}>
        <span className="text-3xl">{result.trimester.icon}</span>
        <div>
          <p className="font-bold text-gray-800" style={{ color: result.trimester.color }}>
            {result.trimester.nameAr}
          </p>
          <p className="text-xs text-gray-600">{result.trimester.descAr}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard icon="📅" label="موعد الإخصاب" value={formatDateAr(result.conceptionDate)} color="text-pink-600" />
        <StatCard icon="⏳" label="الأيام المتبقية" value={`${result.totalDaysLeft} يوم`} color="text-indigo-600" />
        <StatCard icon="📊" label="الأسبوع الحالي" value={`${result.currentWeek}+${result.currentDay}`} color="text-amber-600" />
        <StatCard icon="🏥" label="اكتمال النضج" value={formatDateAr(result.fullTerm)} color="text-green-600" />
      </div>

      {/* Current milestone */}
      {result.currentMilestone && (
        <div className="p-4 bg-gradient-to-l from-pink-50 to-white dark:from-pink-900/10 dark:to-dark-bg rounded-xl border border-pink-100 dark:border-pink-900/30">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-pink-500" />
            <span className="font-bold text-sm text-pink-700 dark:text-pink-400">
              الجنين الآن — أسبوع {result.currentMilestone.week}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            بحجم <strong>{result.currentMilestone.sizeAr}</strong> — {result.currentMilestone.developmentAr}
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>الوزن: ~{result.currentMilestone.weightGrams} غرام</span>
            <span>الطول: ~{result.currentMilestone.lengthCm} سم</span>
          </div>
        </div>
      )}

      {/* Key dates */}
      <div className="mt-6">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-pink-500" />
          مواعيد مهمة
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <DateRow label="نهاية الثلث الأول" date={result.firstTrimesterEnd} week={12} currentWeek={result.currentWeek} />
          <DateRow label="نهاية الثلث الثاني" date={result.secondTrimesterEnd} week={27} currentWeek={result.currentWeek} />
          <DateRow label="اكتمال النضج" date={result.fullTerm} week={37} currentWeek={result.currentWeek} />
          <DateRow label="موعد الولادة" date={result.dueDate} week={40} currentWeek={result.currentWeek} />
        </div>
      </div>
    </div>
  );
}

function AqiqahSection({ result }: { result: PregnancyResult }) {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🐑</span>
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">مواعيد العقيقة المقترحة</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">{result.aqiqah.descAr}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <AqiqahDateCard day={7} date={result.aqiqah.day7} recommended />
        <AqiqahDateCard day={14} date={result.aqiqah.day14} />
        <AqiqahDateCard day={21} date={result.aqiqah.day21} />
      </div>

      <div className="bg-teal-50 dark:bg-teal-900/10 rounded-xl p-4 border border-teal-100 dark:border-teal-900/30">
        <h3 className="text-sm font-bold text-teal-800 dark:text-teal-400 mb-2">أحكام العقيقة</h3>
        <ul className="space-y-1.5">
          {result.aqiqah.rulesAr.map((rule, i) => (
            <li key={i} className="text-xs text-teal-700 dark:text-teal-300 flex items-start gap-2">
              <span className="text-teal-500 mt-0.5">●</span> {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AqiqahDateCard({ day, date, recommended }: { day: number; date: string; recommended?: boolean }) {
  return (
    <div className={`p-4 rounded-xl text-center transition-all ${
      recommended
        ? "bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-400 dark:border-teal-600"
        : "bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700"
    }`}>
      {recommended && (
        <span className="text-xs px-2 py-0.5 bg-teal-500 text-white rounded-full mb-2 inline-block">مُستحب</span>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">اليوم {day}</p>
      <p className={`font-bold text-sm ${recommended ? "text-teal-700 dark:text-teal-400" : "text-gray-800 dark:text-white"}`}>
        {formatDateAr(date)}
      </p>
      <p className="text-xs text-gray-400 mt-0.5">{getDayNameAr(date)}</p>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 text-center">
      <span className="text-lg">{icon}</span>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
      <p className={`text-xs sm:text-sm font-extrabold mt-0.5 ${color}`}>{value}</p>
    </div>
  );
}

function DateRow({ label, date, week, currentWeek }: { label: string; date: Date; week: number; currentWeek: number }) {
  const isDone = currentWeek >= week;
  return (
    <div className={`flex justify-between items-center px-3 py-2 rounded-lg text-sm ${
      isDone ? "bg-green-50 dark:bg-green-900/10" : "bg-gray-50 dark:bg-dark-bg"
    }`}>
      <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
        {isDone ? "✅" : "⏳"} {label}
      </span>
      <span className={`text-xs font-bold ${isDone ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-white"}`}>
        {formatDateAr(date)}
      </span>
    </div>
  );
}
