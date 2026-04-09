"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw, Plus, Trash2, GraduationCap, BookOpen, ChevronDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  GRADE_OPTIONS, CREDIT_OPTIONS, calculateGPA, getMaxGPA, fmt, createEmptyCourse,
  SAUDI_THRESHOLDS_5, SAUDI_THRESHOLDS_4,
  type GPAScale, type Course, type CumulativeInput,
} from "@/lib/calculations/gpa";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import GPASidebar from "./components/GPASidebar";
import GPASEO from "./components/GPASEO";
import GPAFAQ from "./components/GPAFAQ";

interface Props {
  locale: string;
}

export default function GPACalculatorPage({ locale }: Props) {
  const [scale, setScale] = useState<GPAScale>("5.0");
  const [courses, setCourses] = useState<Course[]>([
    createEmptyCourse(1),
    createEmptyCourse(2),
    createEmptyCourse(3),
    createEmptyCourse(4),
    createEmptyCourse(5),
  ]);
  const [useCumulative, setUseCumulative] = useState(false);
  const [cumulative, setCumulative] = useState<CumulativeInput>({ previousGPA: 0, previousCredits: 0 });
  const [showGradeRef, setShowGradeRef] = useState(false);

  const updateCourse = useCallback((id: string, field: keyof Course, value: string | number) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }, []);

  const addCourse = useCallback(() => {
    setCourses((prev) => [...prev, createEmptyCourse(prev.length + 1)]);
  }, []);

  const removeCourse = useCallback((id: string) => {
    setCourses((prev) => (prev.length <= 1 ? prev : prev.filter((c) => c.id !== id)));
  }, []);

  const reset = useCallback(() => {
    setCourses([createEmptyCourse(1), createEmptyCourse(2), createEmptyCourse(3), createEmptyCourse(4), createEmptyCourse(5)]);
    setCumulative({ previousGPA: 0, previousCredits: 0 });
    setUseCumulative(false);
  }, []);

  // Real-time calculation
  const result = useMemo(() => {
    return calculateGPA(courses, scale, useCumulative ? cumulative : undefined);
  }, [courses, scale, useCumulative, cumulative]);

  const hasAnyCourse = courses.some((c) => c.credits > 0);
  const maxGPA = getMaxGPA(scale);
  const displayGPA = useCumulative && cumulative.previousCredits > 0 ? result.cumulativeGPA : result.semesterGPA;
  const gpaPercent = maxGPA > 0 ? Math.min((displayGPA / maxGPA) * 100, 100) : 0;

  const thresholds = scale === "5.0" ? SAUDI_THRESHOLDS_5 : SAUDI_THRESHOLDS_4;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة المعدل التراكمي GPA",
    description: "حاسبة المعدل التراكمي للجامعات السعودية — نظام 5 نقاط و4 نقاط مع حساب تراكمي ورسم بياني",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: ["حساب المعدل الفصلي", "حساب المعدل التراكمي", "نظام 5 نقاط", "نظام 4 نقاط", "رسم بياني", "جدول التقديرات"],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة المعدل", labelEn: "GPA Calculator" },
        ]} />

        {/* Header */}
        <div className="mt-5 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            🎓 حاسبة المعدل التراكمي GPA
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            احسب معدلك الفصلي والتراكمي بدقة — يدعم نظام 5 نقاط (الجامعات السعودية) ونظام 4 نقاط (الدولي). أضف موادك واحصل على النتيجة فوراً مع رسم بياني وتقرير مفصّل.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["نظام 5 و 4 نقاط", "معدل تراكمي", "حساب فوري", "رسم بياني", "جدول التقديرات", "مجاني 100%"].map((badge) => (
              <span key={badge} className="text-xs px-2.5 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full font-medium">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-6">

            {/* Step 1: Scale Selection */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  اختر نظام المعدل
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
                {(["5.0", "4.0"] as GPAScale[]).map((s) => {
                  const isActive = scale === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setScale(s)}
                      className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all text-sm font-bold ${
                        isActive
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 shadow-md"
                          : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-bg text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <GraduationCap className="h-5 w-5" />
                      <div className="text-right">
                        <div>نظام {s} نقاط</div>
                        <div className="text-[10px] font-normal opacity-70">
                          {s === "5.0" ? "معظم الجامعات السعودية" : "KFUPM، الأمير سلطان، دولي"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Cumulative Toggle */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <BookOpen className="h-4 w-4" />
                المعدل التراكمي السابق (اختياري)
              </h2>

              <div className="flex items-center gap-3 mb-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useCumulative}
                    onChange={(e) => setUseCumulative(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
                <span className="text-sm text-gray-700 dark:text-gray-300">أريد حساب المعدل التراكمي مع فصول سابقة</span>
              </div>

              {useCumulative && (
                <div className="grid grid-cols-2 gap-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">المعدل التراكمي السابق</label>
                    <input
                      type="number"
                      min={0}
                      max={maxGPA}
                      step={0.01}
                      value={cumulative.previousGPA || ""}
                      onChange={(e) => setCumulative((p) => ({ ...p, previousGPA: Number(e.target.value) }))}
                      placeholder={`0.00 — ${maxGPA}`}
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">عدد الساعات المجتازة</label>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={cumulative.previousCredits || ""}
                      onChange={(e) => setCumulative((p) => ({ ...p, previousCredits: Number(e.target.value) }))}
                      placeholder="مثال: 60"
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none tabular-nums"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Courses */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  أدخل مواد الفصل الحالي
                  <span className="text-xs font-normal text-gray-400">({courses.length} مواد)</span>
                </h2>
                <button
                  onClick={() => setShowGradeRef(!showGradeRef)}
                  className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-500"
                >
                  📋 جدول التقديرات
                  <ChevronDown className={`h-3 w-3 transition-transform ${showGradeRef ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Grade Reference (Collapsible) */}
              {showGradeRef && (
                <div className="mb-4 bg-gray-50 dark:bg-dark-bg rounded-xl p-4 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-gray-400 dark:text-gray-500">
                        <th className="py-1 text-right">التقدير</th>
                        <th className="py-1 text-right">الوصف</th>
                        <th className="py-1 text-right">نقاط (5.0)</th>
                        <th className="py-1 text-right">نقاط (4.0)</th>
                        <th className="py-1 text-right">النسبة المئوية</th>
                      </tr>
                    </thead>
                    <tbody>
                      {GRADE_OPTIONS.map((g) => (
                        <tr key={g.letter} className="border-t border-gray-100 dark:border-gray-800">
                          <td className="py-1.5 font-bold" style={{ color: g.color }}>{g.letter}</td>
                          <td className="py-1.5 text-gray-600 dark:text-gray-400">{g.labelAr}</td>
                          <td className="py-1.5 font-medium text-gray-700 dark:text-gray-300">{g.points5}</td>
                          <td className="py-1.5 font-medium text-gray-700 dark:text-gray-300">{g.points4}</td>
                          <td className="py-1.5 text-gray-500">{g.minPercent}% — {g.maxPercent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Course Headers */}
              <div className="hidden sm:grid grid-cols-[1fr_140px_80px_36px] gap-2 text-[10px] font-semibold text-gray-400 dark:text-gray-500 px-1 mb-2">
                <span>اسم المادة</span>
                <span className="text-center">التقدير</span>
                <span className="text-center">الساعات</span>
                <span />
              </div>

              {/* Course Rows */}
              <div className="space-y-2">
                {courses.map((course, index) => (
                  <div key={course.id} className="grid grid-cols-1 sm:grid-cols-[1fr_140px_80px_36px] gap-2 items-center bg-gray-50 dark:bg-dark-bg rounded-xl p-2 sm:p-0 sm:bg-transparent sm:dark:bg-transparent">
                    {/* Course Name */}
                    <div className="relative">
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-300 dark:text-gray-600 font-bold">{index + 1}</span>
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                        className="w-full h-10 px-3 pr-7 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder={`مادة ${index + 1}`}
                      />
                    </div>

                    {/* Grade Select */}
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                      className="h-10 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g.letter} value={g.letter}>
                          {g.letter} — {g.labelAr} ({scale === "5.0" ? g.points5 : g.points4})
                        </option>
                      ))}
                    </select>

                    {/* Credits */}
                    <select
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, "credits", Number(e.target.value))}
                      className="h-10 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none text-center"
                    >
                      {CREDIT_OPTIONS.map((cr) => (
                        <option key={cr} value={cr}>{cr} ساعات</option>
                      ))}
                    </select>

                    {/* Delete */}
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="h-10 w-9 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Course */}
              <button
                onClick={addCourse}
                className="mt-3 flex items-center gap-1.5 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-500 font-medium px-2 py-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors"
              >
                <Plus className="h-4 w-4" /> إضافة مادة
              </button>
            </div>

            {/* Live Result Bar */}
            {hasAnyCourse && result.semesterCredits > 0 && (
              <div className="bg-gradient-to-l from-purple-600 to-indigo-600 rounded-xl px-5 py-3 flex items-center justify-between text-white shadow-lg">
                <div className="flex items-center gap-4 text-sm">
                  <span>🎓 المعدل:</span>
                  <span className="text-2xl font-bold tabular-nums">
                    {fmt(displayGPA)} / {maxGPA.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-purple-200">
                  {result.classification.emoji} {result.classification.ar} — {result.semesterCredits} ساعة
                </span>
              </div>
            )}

            {/* Results Card */}
            {hasAnyCourse && result.semesterCredits > 0 && (
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                <div className="text-center mb-6">
                  <p className="text-purple-200 text-sm mb-2">📊 نتيجة حساب المعدل</p>
                  <p className="text-5xl sm:text-6xl font-bold tabular-nums mb-1">
                    {fmt(displayGPA)}
                  </p>
                  <p className="text-purple-200 text-lg">من {maxGPA.toFixed(1)}</p>
                  <p className="text-xl font-bold mt-2">
                    {result.classification.emoji} {result.classification.ar}
                  </p>
                </div>

                {/* GPA Progress Bar */}
                <div className="bg-white/10 rounded-full h-4 mb-6 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-amber-400 to-emerald-400 transition-all duration-700 ease-out"
                    style={{ width: `${gpaPercent}%` }}
                  />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-purple-200 text-[10px] mb-1">المعدل الفصلي</p>
                    <p className="text-xl font-bold tabular-nums">{fmt(result.semesterGPA)}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                    <p className="text-purple-200 text-[10px] mb-1">ساعات الفصل</p>
                    <p className="text-xl font-bold tabular-nums">{result.semesterCredits}</p>
                  </div>
                  {useCumulative && cumulative.previousCredits > 0 && (
                    <>
                      <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                        <p className="text-purple-200 text-[10px] mb-1">المعدل التراكمي</p>
                        <p className="text-xl font-bold tabular-nums text-amber-300">{fmt(result.cumulativeGPA)}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                        <p className="text-purple-200 text-[10px] mb-1">إجمالي الساعات</p>
                        <p className="text-xl font-bold tabular-nums">{result.cumulativeCredits}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Chart + Breakdown */}
            {hasAnyCourse && result.gradeDistribution.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Pie Chart */}
                {result.gradeDistribution.length > 1 && (
                  <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                    <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📊 توزيع التقديرات</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={result.gradeDistribution.map((d) => ({ name: d.letter, value: d.count, color: d.color }))}
                          cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none"
                        >
                          {result.gradeDistribution.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} مادة`, ""]}
                          contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb", borderRadius: "12px", direction: "rtl", fontSize: "13px" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {result.gradeDistribution.map((entry, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                          {entry.letter} ({entry.count})
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Course Details */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                  <h3 className="font-bold text-sm text-gray-800 dark:text-white mb-3">📋 تفصيل المواد</h3>
                  <div className="space-y-2">
                    {courses.filter((c) => c.credits > 0).map((course, i) => {
                      const grade = GRADE_OPTIONS.find((g) => g.letter === course.grade);
                      const pts = scale === "5.0" ? (grade?.points5 || 0) : (grade?.points4 || 0);
                      return (
                        <div key={course.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center font-bold" style={{ backgroundColor: grade?.color || "#6b7280" }}>
                              {i + 1}
                            </span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {course.name || `مادة ${i + 1}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="font-bold" style={{ color: grade?.color }}>{course.grade}</span>
                            <span className="text-gray-400">{course.credits}س</span>
                            <span className="font-bold text-gray-700 dark:text-gray-300 tabular-nums">{(pts * course.credits).toFixed(1)}</span>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between pt-3 mt-2 border-t-2 border-purple-200 dark:border-purple-800/40">
                      <span className="font-bold text-gray-800 dark:text-white">الإجمالي</span>
                      <span className="font-bold text-lg text-purple-600 dark:text-purple-400 tabular-nums">
                        {fmt(result.semesterPoints)} / {result.semesterCredits} = {fmt(result.semesterGPA)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Thresholds Table */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg">
                <h3 className="font-bold text-gray-800 dark:text-white text-sm">📐 جدول التقديرات والتصنيفات — نظام {scale} نقاط</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                      <th className="px-4 py-3 text-right">التصنيف</th>
                      <th className="px-4 py-3 text-right">نطاق المعدل</th>
                      <th className="px-4 py-3 text-right">الملاحظات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thresholds.map((t, i) => {
                      const isCurrentRange = displayGPA >= t.min && displayGPA <= t.max && hasAnyCourse && result.semesterCredits > 0;
                      return (
                        <tr key={i} className={isCurrentRange ? "bg-purple-50 dark:bg-purple-900/10 font-bold" : i % 2 === 0 ? "" : "bg-gray-50 dark:bg-dark-bg/50"}>
                          <td className="px-4 py-3 text-gray-800 dark:text-white">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${t.color}`} />
                              {t.labelAr}
                              {isCurrentRange && <span className="text-[10px] bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded-full">أنت هنا</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300 tabular-nums">{t.min.toFixed(2)} — {t.max.toFixed(2)}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{t.honors}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* No courses message */}
            {!hasAnyCourse && (
              <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/40 rounded-xl p-6 text-center">
                <p className="text-purple-600 dark:text-purple-400 text-lg mb-2">👆</p>
                <p className="text-purple-700 dark:text-purple-400 font-medium">أدخل مواد الفصل لحساب المعدل فوراً</p>
                <p className="text-purple-500 text-sm mt-1">اختر التقدير والساعات المعتمدة لكل مادة</p>
              </div>
            )}

            <AdSlot id="gpa-mid" size="leaderboard" />

            {/* SEO Content */}
            <GPASEO />

            <AdSlot id="gpa-btm" size="rectangle" />

            {/* FAQ */}
            <GPAFAQ />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <GPASidebar locale={locale} scale={scale} />
          </div>
        </div>
      </div>
    </main>
  );
}
