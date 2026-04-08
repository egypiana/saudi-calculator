"use client";

import { useState, useMemo, useCallback } from "react";
import { Clock, Plus, Minus, ArrowLeftRight } from "lucide-react";
import {
  calculateTimeDifference,
  calculateDateDifference,
  calculateAddSubtract,
  calculateWorkHours,
  convertTimeUnits,
  TimeDifferenceInput,
  DateDifferenceInput,
  AddSubtractInput,
  WorkHoursInput,
  TimeCalcMode,
  TIME_UNITS,
  WORK_PRESETS,
  fmt,
  fmtDec,
  pad,
} from "@/lib/calculations/time-calc";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import TimeSidebar from "./components/TimeSidebar";
import TimeFAQ from "./components/TimeFAQ";
import TimeSEO from "./components/TimeSEO";

interface Props { locale: string; }

const TAB_OPTIONS: { key: TimeCalcMode; label: string; icon: string }[] = [
  { key: "difference", label: "فرق الوقت", icon: "🕐" },
  { key: "add-subtract", label: "إضافة / طرح", icon: "➕" },
  { key: "date-diff", label: "فرق التاريخ", icon: "📅" },
  { key: "work-hours", label: "ساعات العمل", icon: "💼" },
  { key: "converter", label: "تحويل الوحدات", icon: "🔄" },
];

type Period = "AM" | "PM";

export default function TimeCalculatorPage({ locale }: Props) {
  const [activeTab, setActiveTab] = useState<TimeCalcMode>("difference");

  // Time difference state
  const [timeDiff, setTimeDiff] = useState<TimeDifferenceInput>({
    startHour: 8, startMinute: 0, startSecond: 0, startPeriod: "AM",
    endHour: 5, endMinute: 30, endSecond: 0, endPeriod: "PM",
  });

  // Date difference state
  const [dateDiff, setDateDiff] = useState<DateDifferenceInput>({
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
  });

  // Add/subtract state
  const [addSub, setAddSub] = useState<AddSubtractInput>({
    baseHour: 9, baseMinute: 0, baseSecond: 0, basePeriod: "AM",
    operation: "add", addDays: 0, addHours: 3, addMinutes: 30, addSeconds: 0,
  });

  // Work hours state
  const [workHours, setWorkHours] = useState<WorkHoursInput>({
    startHour: 8, startMinute: 0, endHour: 17, endMinute: 0,
    breakMinutes: 60, daysPerWeek: 5, hourlyRate: 0,
  });

  // Converter state
  const [convValue, setConvValue] = useState(1);
  const [convUnit, setConvUnit] = useState("hours");

  // Results
  const timeDiffResult = useMemo(() => calculateTimeDifference(timeDiff), [timeDiff]);
  const dateDiffResult = useMemo(() => calculateDateDifference(dateDiff), [dateDiff]);
  const addSubResult = useMemo(() => calculateAddSubtract(addSub), [addSub]);
  const workResult = useMemo(() => calculateWorkHours(workHours), [workHours]);
  const convResult = useMemo(() => convertTimeUnits(convValue, convUnit), [convValue, convUnit]);

  const updateTimeDiff = useCallback((p: Partial<TimeDifferenceInput>) => setTimeDiff(prev => ({ ...prev, ...p })), []);
  const updateDateDiff = useCallback((p: Partial<DateDifferenceInput>) => setDateDiff(prev => ({ ...prev, ...p })), []);
  const updateAddSub = useCallback((p: Partial<AddSubtractInput>) => setAddSub(prev => ({ ...prev, ...p })), []);
  const updateWork = useCallback((p: Partial<WorkHoursInput>) => setWorkHours(prev => ({ ...prev, ...p })), []);

  const applyWorkPreset = (preset: typeof WORK_PRESETS[0]) => {
    const [sh, sm] = preset.start.split(":").map(Number);
    const [eh, em] = preset.end.split(":").map(Number);
    setWorkHours({ startHour: sh, startMinute: sm, endHour: eh, endMinute: em, breakMinutes: preset.breakMin, daysPerWeek: preset.days, hourlyRate: workHours.hourlyRate });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة الوقت",
    description: "احسب فرق الوقت بين ساعتين، فرق التاريخ، إضافة وطرح الوقت، ساعات العمل، وتحويل وحدات الوقت",
    url: `https://calculatorvip.com/${locale}/calculators/time`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" }, { labelAr: "حاسبة الوقت", labelEn: "Time Calculator" }]} />

        {/* Header */}
        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-sky-500 to-blue-700 rounded-xl p-3 text-white shadow-lg">
              <Clock className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">حاسبة الوقت والتاريخ</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">فرق الوقت، إضافة وطرح، فرق التاريخ، ساعات العمل، وتحويل الوحدات</p>
            </div>
          </div>
        </div>

        <AdSlot id="time-top" size="leaderboard" />

        {/* Tabs */}
        <div className="flex gap-1.5 mt-6 mb-4 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-1.5 overflow-x-auto">
          {TAB_OPTIONS.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 rounded-lg py-2.5 px-3 text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${activeTab === tab.key ? "bg-sky-500 text-white shadow-md" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
              <span>{tab.icon}</span><span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-6">

            {/* ===== TIME DIFFERENCE ===== */}
            {activeTab === "difference" && (
              <>
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <h2 className="font-bold text-gray-800 dark:text-white">الفرق بين وقتين</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <TimeInput label="وقت البداية" hour={timeDiff.startHour} minute={timeDiff.startMinute} second={timeDiff.startSecond} period={timeDiff.startPeriod}
                      onHour={(v) => updateTimeDiff({ startHour: v })} onMinute={(v) => updateTimeDiff({ startMinute: v })} onSecond={(v) => updateTimeDiff({ startSecond: v })} onPeriod={(v) => updateTimeDiff({ startPeriod: v })} />
                    <TimeInput label="وقت النهاية" hour={timeDiff.endHour} minute={timeDiff.endMinute} second={timeDiff.endSecond} period={timeDiff.endPeriod}
                      onHour={(v) => updateTimeDiff({ endHour: v })} onMinute={(v) => updateTimeDiff({ endMinute: v })} onSecond={(v) => updateTimeDiff({ endSecond: v })} onPeriod={(v) => updateTimeDiff({ endPeriod: v })} />
                  </div>
                </div>

                {/* Result */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <ResultCard label="المدة" value={timeDiffResult.formatted} gradient="from-sky-500 to-blue-700" span={2} />
                  <ResultCard label="إجمالي الساعات" value={fmtDec(timeDiffResult.totalHours)} sub="ساعة" />
                  <ResultCard label="إجمالي الدقائق" value={fmt(timeDiffResult.totalMinutes)} sub="دقيقة" />
                </div>
                {timeDiffResult.crossesMidnight && (
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
                    ⚠️ الوقت يتجاوز منتصف الليل — تم احتساب الفرق ليوم كامل (24 ساعة)
                  </div>
                )}

                {/* Detailed */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">التفاصيل</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatBox label="ساعات" value={timeDiffResult.hours} />
                    <StatBox label="دقائق" value={timeDiffResult.minutes} />
                    <StatBox label="ثوانٍ" value={timeDiffResult.seconds} />
                    <StatBox label="إجمالي الثواني" value={fmt(timeDiffResult.totalSeconds)} />
                  </div>
                </div>
              </>
            )}

            {/* ===== ADD / SUBTRACT ===== */}
            {activeTab === "add-subtract" && (
              <>
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <h2 className="font-bold text-gray-800 dark:text-white">إضافة أو طرح وقت</h2>
                  </div>

                  {/* Base time */}
                  <TimeInput label="الوقت الأساسي" hour={addSub.baseHour} minute={addSub.baseMinute} second={addSub.baseSecond} period={addSub.basePeriod}
                    onHour={(v) => updateAddSub({ baseHour: v })} onMinute={(v) => updateAddSub({ baseMinute: v })} onSecond={(v) => updateAddSub({ baseSecond: v })} onPeriod={(v) => updateAddSub({ basePeriod: v })} />

                  {/* Operation */}
                  <div className="flex gap-3 my-5">
                    <button onClick={() => updateAddSub({ operation: "add" })}
                      className={`flex-1 rounded-xl border-2 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all ${addSub.operation === "add" ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300" : "border-gray-200 dark:border-gray-700 text-gray-500"}`}>
                      <Plus className="h-4 w-4" />إضافة
                    </button>
                    <button onClick={() => updateAddSub({ operation: "subtract" })}
                      className={`flex-1 rounded-xl border-2 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all ${addSub.operation === "subtract" ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300" : "border-gray-200 dark:border-gray-700 text-gray-500"}`}>
                      <Minus className="h-4 w-4" />طرح
                    </button>
                  </div>

                  {/* Duration to add/subtract */}
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">المدة</label>
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1 text-center">أيام</label>
                      <input type="number" value={addSub.addDays} onChange={(e) => updateAddSub({ addDays: +e.target.value })} min={0}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-2 py-2.5 text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1 text-center">ساعات</label>
                      <input type="number" value={addSub.addHours} onChange={(e) => updateAddSub({ addHours: +e.target.value })} min={0}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-2 py-2.5 text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1 text-center">دقائق</label>
                      <input type="number" value={addSub.addMinutes} onChange={(e) => updateAddSub({ addMinutes: +e.target.value })} min={0}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-2 py-2.5 text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1 text-center">ثوانٍ</label>
                      <input type="number" value={addSub.addSeconds} onChange={(e) => updateAddSub({ addSeconds: +e.target.value })} min={0}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-2 py-2.5 text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <ResultCard label="النتيجة (12 ساعة)" value={addSubResult.formatted12} gradient="from-sky-500 to-blue-700" />
                  <ResultCard label="النتيجة (24 ساعة)" value={addSubResult.formatted24} />
                  {addSubResult.daysDiff !== 0 && <ResultCard label="فرق الأيام" value={addSubResult.dayLabel} />}
                </div>
              </>
            )}

            {/* ===== DATE DIFFERENCE ===== */}
            {activeTab === "date-diff" && (
              <>
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <h2 className="font-bold text-gray-800 dark:text-white">الفرق بين تاريخين</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">التاريخ الأول</label>
                      <input type="date" value={dateDiff.startDate} onChange={(e) => updateDateDiff({ startDate: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">التاريخ الثاني</label>
                      <input type="date" value={dateDiff.endDate} onChange={(e) => updateDateDiff({ endDate: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent" />
                    </div>
                  </div>

                  {/* Quick dates */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-xs text-gray-400 ml-2 self-center">سريع:</span>
                    {[
                      { label: "بعد أسبوع", days: 7 },
                      { label: "بعد شهر", days: 30 },
                      { label: "بعد 3 أشهر", days: 90 },
                      { label: "بعد 6 أشهر", days: 180 },
                      { label: "بعد سنة", days: 365 },
                    ].map((q) => {
                      const d = new Date(); d.setDate(d.getDate() + q.days);
                      return (
                        <button key={q.days} onClick={() => updateDateDiff({ endDate: d.toISOString().split("T")[0] })}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-all">{q.label}</button>
                      );
                    })}
                  </div>
                </div>

                {dateDiffResult && (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <ResultCard label="الفرق" value={dateDiffResult.formatted} gradient="from-sky-500 to-blue-700" span={2} />
                      <ResultCard label="إجمالي الأيام" value={fmt(dateDiffResult.totalDays)} sub="يوم" />
                      <ResultCard label="أسابيع" value={`${dateDiffResult.weeks} أسبوع و ${dateDiffResult.remainingDays} يوم`} />
                    </div>

                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                      <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">تفاصيل الفرق</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <StatBox label="سنوات" value={dateDiffResult.years} />
                        <StatBox label="أشهر" value={dateDiffResult.months} />
                        <StatBox label="أيام" value={dateDiffResult.days} />
                        <StatBox label="أسابيع (إجمالي)" value={dateDiffResult.totalWeeks} />
                      </div>
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        <StatBox label="إجمالي الساعات" value={fmt(dateDiffResult.totalHours)} />
                        <StatBox label="إجمالي الدقائق" value={fmt(dateDiffResult.totalMinutes)} />
                        <StatBox label="إجمالي الثواني" value={fmt(dateDiffResult.totalSeconds)} />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* ===== WORK HOURS ===== */}
            {activeTab === "work-hours" && (
              <>
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <h2 className="font-bold text-gray-800 dark:text-white">حاسبة ساعات العمل</h2>
                  </div>

                  {/* Presets */}
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">أنماط الدوام الشائعة</label>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {WORK_PRESETS.map((p) => (
                      <button key={p.labelAr} onClick={() => applyWorkPreset(p)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-all">{p.labelAr}</button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">بداية الدوام</label>
                      <input type="time" value={`${pad(workHours.startHour)}:${pad(workHours.startMinute)}`}
                        onChange={(e) => { const [h, m] = e.target.value.split(":").map(Number); updateWork({ startHour: h, startMinute: m }); }}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-3 py-2.5 text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">نهاية الدوام</label>
                      <input type="time" value={`${pad(workHours.endHour)}:${pad(workHours.endMinute)}`}
                        onChange={(e) => { const [h, m] = e.target.value.split(":").map(Number); updateWork({ endHour: h, endMinute: m }); }}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-3 py-2.5 text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">مدة الاستراحة (دقيقة)</label>
                      <input type="number" value={workHours.breakMinutes} onChange={(e) => updateWork({ breakMinutes: +e.target.value })} min={0}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-3 py-2.5 text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1">أيام العمل/أسبوع</label>
                      <input type="number" value={workHours.daysPerWeek} onChange={(e) => updateWork({ daysPerWeek: +e.target.value })} min={1} max={7}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-3 py-2.5 text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
                    </div>
                  </div>

                  {/* Hourly rate (optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">أجر الساعة — اختياري (ريال)</label>
                    <input type="number" value={workHours.hourlyRate || ""} onChange={(e) => updateWork({ hourlyRate: +e.target.value })} min={0}
                      className="w-full sm:w-1/2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-center font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" placeholder="0" />
                  </div>
                </div>

                {/* Work Results */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <ResultCard label="ساعات العمل اليومية" value={workResult.formatted} gradient="from-sky-500 to-blue-700" sub={`${fmtDec(workResult.netDailyHours)} ساعة صافي`} />
                  <ResultCard label="أسبوعياً" value={`${fmtDec(workResult.weeklyHours)}`} sub="ساعة" />
                  <ResultCard label="شهرياً" value={`${fmtDec(workResult.monthlyHours)}`} sub="ساعة" />
                  {workHours.hourlyRate > 0 && <ResultCard label="الراتب الشهري المقدر" value={fmt(workResult.monthlyPay)} sub="ريال" />}
                </div>

                {workHours.hourlyRate > 0 && (
                  <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">تقدير الأجور</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <StatBox label="يومياً" value={`${fmtDec(workResult.dailyPay)} ريال`} />
                      <StatBox label="أسبوعياً" value={`${fmtDec(workResult.weeklyPay)} ريال`} />
                      <StatBox label="شهرياً" value={`${fmt(workResult.monthlyPay)} ريال`} />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ===== CONVERTER ===== */}
            {activeTab === "converter" && (
              <>
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <h2 className="font-bold text-gray-800 dark:text-white">تحويل وحدات الوقت</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">القيمة</label>
                      <input type="number" value={convValue || ""} onChange={(e) => setConvValue(+e.target.value)}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-center font-bold text-xl text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
                    </div>
                    <ArrowLeftRight className="h-5 w-5 text-gray-400 self-end mb-3 hidden sm:block" />
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">الوحدة</label>
                      <select value={convUnit} onChange={(e) => setConvUnit(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-4 py-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 font-bold text-center">
                        {TIME_UNITS.map((u) => <option key={u.value} value={u.value}>{u.icon} {u.labelAr}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Quick values */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {[1, 5, 10, 24, 30, 60, 100, 365].map((v) => (
                      <button key={v} onClick={() => setConvValue(v)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${convValue === v ? "bg-sky-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-sky-100"}`}>{v}</button>
                    ))}
                  </div>
                </div>

                {/* Conversion Results */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-sm">النتائج</h3>
                  <div className="space-y-2">
                    {TIME_UNITS.map((u) => {
                      const val = convResult[u.value as keyof typeof convResult];
                      const isSource = u.value === convUnit;
                      return (
                        <div key={u.value} className={`flex items-center justify-between px-4 py-3 rounded-xl ${isSource ? "bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800" : "bg-gray-50 dark:bg-dark-bg"}`}>
                          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"><span>{u.icon}</span>{u.labelAr}</span>
                          <span className={`text-sm font-bold ${isSource ? "text-sky-600 dark:text-sky-400" : "text-gray-800 dark:text-white"}`}>
                            {typeof val === "number" ? (val > 999999 ? val.toExponential(2) : fmtDec(val)) : val}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            <AdSlot id="time-mid" size="rectangle" />
            <TimeSEO />
            <TimeFAQ />
            <AdSlot id="time-bottom" size="leaderboard" />
          </div>

          {/* Sidebar */}
          <TimeSidebar locale={locale} />
        </div>
      </div>
    </main>
  );
}

// ====== Sub-Components ======

function TimeInput({ label, hour, minute, second, period, onHour, onMinute, onSecond, onPeriod }: {
  label: string; hour: number; minute: number; second: number; period: Period;
  onHour: (v: number) => void; onMinute: (v: number) => void; onSecond: (v: number) => void; onPeriod: (v: Period) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</label>
      <div className="flex gap-2 items-center">
        <div className="flex-1">
          <label className="block text-[10px] text-gray-400 mb-1 text-center">ساعة</label>
          <input type="number" value={hour} onChange={(e) => onHour(+e.target.value)} min={1} max={12}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-2 py-2 text-center font-bold text-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
        </div>
        <span className="text-xl font-bold text-gray-400 mt-4">:</span>
        <div className="flex-1">
          <label className="block text-[10px] text-gray-400 mb-1 text-center">دقيقة</label>
          <input type="number" value={minute} onChange={(e) => onMinute(+e.target.value)} min={0} max={59}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-2 py-2 text-center font-bold text-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
        </div>
        <span className="text-xl font-bold text-gray-400 mt-4">:</span>
        <div className="flex-1">
          <label className="block text-[10px] text-gray-400 mb-1 text-center">ثانية</label>
          <input type="number" value={second} onChange={(e) => onSecond(+e.target.value)} min={0} max={59}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg px-2 py-2 text-center font-bold text-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500" />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <button onClick={() => onPeriod("AM")} className={`px-2 py-1 rounded text-xs font-bold transition-all ${period === "AM" ? "bg-sky-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>ص</button>
          <button onClick={() => onPeriod("PM")} className={`px-2 py-1 rounded text-xs font-bold transition-all ${period === "PM" ? "bg-sky-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}>م</button>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, sub, gradient, span }: { label: string; value: string | number; sub?: string; gradient?: string; span?: number }) {
  return (
    <div className={`${gradient ? `bg-gradient-to-br ${gradient} text-white shadow-lg` : "bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700"} rounded-2xl p-4 ${span === 2 ? "col-span-2" : ""}`}>
      <p className={`text-xs mb-1 ${gradient ? "text-white/70" : "text-gray-400"}`}>{label}</p>
      <p className={`text-xl sm:text-2xl font-bold ${gradient ? "" : "text-gray-800 dark:text-white"}`}>{value}</p>
      {sub && <p className={`text-[10px] mt-1 ${gradient ? "text-white/60" : "text-gray-400"}`}>{sub}</p>}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-3 text-center">
      <p className="text-lg sm:text-xl font-bold text-sky-600 dark:text-sky-400">{value}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}
