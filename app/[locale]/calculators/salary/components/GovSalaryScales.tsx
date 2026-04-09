"use client";

import { useState, useMemo } from "react";
import {
  GENERAL_SCALE,
  getGeneralSalary,
  TEACHER_SCALE,
  getTeacherSalary,
  HEALTH_SCALE,
  getHealthSalary,
  MILITARY_OFFICERS,
  MILITARY_ENLISTED,
  getMilitarySalary,
  fmtSalary,
} from "@/lib/data/salaryScales";
type TabId = "general" | "education" | "health" | "military";
type MilitarySubTab = "officers" | "enlisted";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "general", label: "الموظفين العام", icon: "🏛️" },
  { id: "education", label: "المعلمين", icon: "📚" },
  { id: "health", label: "القطاع الصحي", icon: "🏥" },
  { id: "military", label: "العسكريين", icon: "⚔️" },
];

/* ────────────── Shared UI helpers ────────────── */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: number | string;
  onChange: (v: string) => void;
  options: { value: string | number; label: string }[];
}) {
  return (
    <div className="flex-1 min-w-[120px]">
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-800 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultCard({
  basic,
  transport,
}: {
  basic: number;
  transport: number;
}) {
  const total = basic + transport;
  const annual = total * 12;

  return (
    <div className="bg-gradient-to-l from-orange-500 to-amber-500 rounded-2xl p-5 text-white shadow-lg">
      <div className="text-center mb-4">
        <p className="text-sm opacity-90 mb-1">الراتب الشهري الإجمالي</p>
        <p className="text-4xl font-bold tracking-tight">
          {fmtSalary(total)} <span className="text-lg font-normal">ريال</span>
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-white/20 rounded-xl p-3">
          <p className="text-[10px] opacity-80 mb-0.5">الراتب الأساسي</p>
          <p className="text-sm font-bold">{fmtSalary(basic)}</p>
        </div>
        <div className="bg-white/20 rounded-xl p-3">
          <p className="text-[10px] opacity-80 mb-0.5">بدل النقل</p>
          <p className="text-sm font-bold">{fmtSalary(transport)}</p>
        </div>
        <div className="bg-white/20 rounded-xl p-3">
          <p className="text-[10px] opacity-80 mb-0.5">الراتب السنوي</p>
          <p className="text-sm font-bold">{fmtSalary(annual)}</p>
        </div>
      </div>
    </div>
  );
}

/* ────────────── Tab: General ────────────── */

function GeneralTab() {
  const [rank, setRank] = useState(1);
  const [degree, setDegree] = useState(1);

  const info = useMemo(
    () => GENERAL_SCALE.find((r) => r.rank === rank)!,
    [rank]
  );

  const salary = useMemo(
    () => getGeneralSalary(rank, degree),
    [rank, degree]
  );

  return (
    <div className="space-y-5">
      {/* Selectors */}
      <div className="flex flex-wrap gap-3">
        <SelectField
          label="المرتبة"
          value={rank}
          onChange={(v) => {
            const r = Number(v);
            setRank(r);
            const newInfo = GENERAL_SCALE.find((x) => x.rank === r)!;
            if (degree > newInfo.maxDegrees) setDegree(newInfo.maxDegrees);
          }}
          options={GENERAL_SCALE.map((r) => ({
            value: r.rank,
            label: `المرتبة ${r.rank}`,
          }))}
        />
        <SelectField
          label="الدرجة"
          value={degree}
          onChange={(v) => setDegree(Number(v))}
          options={Array.from({ length: info.maxDegrees }, (_, i) => ({
            value: i + 1,
            label: `الدرجة ${i + 1}`,
          }))}
        />
      </div>

      <ResultCard basic={salary} transport={info.transportAllowance} />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
              <th className="px-3 py-2 text-right">المرتبة</th>
              <th className="px-3 py-2 text-right">راتب الدرجة 1</th>
              <th className="px-3 py-2 text-right">أعلى راتب</th>
              <th className="px-3 py-2 text-right">العلاوة</th>
              <th className="px-3 py-2 text-right">بدل النقل</th>
            </tr>
          </thead>
          <tbody>
            {GENERAL_SCALE.map((r) => {
              const maxSalary =
                r.baseSalary + (r.maxDegrees - 1) * r.increment;
              const isSelected = r.rank === rank;
              return (
                <tr
                  key={r.rank}
                  className={
                    isSelected
                      ? "bg-orange-50 dark:bg-orange-900/20 font-bold"
                      : "even:bg-gray-50 dark:even:bg-gray-800/40"
                  }
                >
                  <td className="px-3 py-2">{r.rank}</td>
                  <td className="px-3 py-2">{fmtSalary(r.baseSalary)}</td>
                  <td className="px-3 py-2">{fmtSalary(maxSalary)}</td>
                  <td className="px-3 py-2">{fmtSalary(r.increment)}</td>
                  <td className="px-3 py-2">{fmtSalary(r.transportAllowance)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ────────────── Tab: Education ────────────── */

function EducationTab() {
  const [categoryId, setCategoryId] = useState(TEACHER_SCALE[0].id);
  const [level, setLevel] = useState(1);
  const [degree, setDegree] = useState(1);

  const category = useMemo(
    () => TEACHER_SCALE.find((c) => c.id === categoryId)!,
    [categoryId]
  );

  const currentLevel = useMemo(
    () => category.levels.find((l) => l.level === level),
    [category, level]
  );

  const salary = useMemo(
    () => getTeacherSalary(categoryId, level, degree),
    [categoryId, level, degree]
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <SelectField
          label="الفئة"
          value={categoryId}
          onChange={(v) => {
            setCategoryId(v);
            const cat = TEACHER_SCALE.find((c) => c.id === v)!;
            if (level > cat.levels.length) setLevel(cat.levels.length);
            setDegree(1);
          }}
          options={TEACHER_SCALE.map((c) => ({
            value: c.id,
            label: c.labelAr,
          }))}
        />
        <SelectField
          label="المستوى"
          value={level}
          onChange={(v) => {
            setLevel(Number(v));
            setDegree(1);
          }}
          options={category.levels.map((l) => ({
            value: l.level,
            label: `المستوى ${l.level}`,
          }))}
        />
        <SelectField
          label="الدرجة"
          value={degree}
          onChange={(v) => setDegree(Number(v))}
          options={Array.from(
            { length: currentLevel?.maxDegrees ?? 6 },
            (_, i) => ({
              value: i + 1,
              label: `الدرجة ${i + 1}`,
            })
          )}
        />
      </div>

      <ResultCard basic={salary} transport={category.transportAllowance} />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
              <th className="px-3 py-2 text-right">الفئة</th>
              <th className="px-3 py-2 text-right">المستويات</th>
              <th className="px-3 py-2 text-right">أدنى راتب</th>
              <th className="px-3 py-2 text-right">أعلى راتب</th>
              <th className="px-3 py-2 text-right">بدل النقل</th>
            </tr>
          </thead>
          <tbody>
            {TEACHER_SCALE.map((cat) => {
              const minSalary = cat.levels[0].baseSalary;
              const lastLevel = cat.levels[cat.levels.length - 1];
              const maxSalary =
                lastLevel.baseSalary +
                (lastLevel.maxDegrees - 1) * lastLevel.increment;
              const isSelected = cat.id === categoryId;
              return (
                <tr
                  key={cat.id}
                  className={
                    isSelected
                      ? "bg-orange-50 dark:bg-orange-900/20 font-bold"
                      : "even:bg-gray-50 dark:even:bg-gray-800/40"
                  }
                >
                  <td className="px-3 py-2">{cat.labelAr}</td>
                  <td className="px-3 py-2">
                    {cat.levels.length} مستويات
                  </td>
                  <td className="px-3 py-2">{fmtSalary(minSalary)}</td>
                  <td className="px-3 py-2">{fmtSalary(maxSalary)}</td>
                  <td className="px-3 py-2">{fmtSalary(cat.transportAllowance)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ────────────── Tab: Health ────────────── */

function HealthTab() {
  const [positionId, setPositionId] = useState(HEALTH_SCALE[0].id);
  const [level, setLevel] = useState(1);
  const [degree, setDegree] = useState(1);

  const position = useMemo(
    () => HEALTH_SCALE.find((p) => p.id === positionId)!,
    [positionId]
  );

  const currentLevel = useMemo(
    () => position.levels.find((l) => l.level === level),
    [position, level]
  );

  const salary = useMemo(
    () => getHealthSalary(positionId, level, degree),
    [positionId, level, degree]
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <SelectField
          label="المسمى"
          value={positionId}
          onChange={(v) => {
            setPositionId(v);
            const pos = HEALTH_SCALE.find((p) => p.id === v)!;
            if (level > pos.levels.length) setLevel(pos.levels.length);
            setDegree(1);
          }}
          options={HEALTH_SCALE.map((p) => ({
            value: p.id,
            label: p.labelAr,
          }))}
        />
        <SelectField
          label="المستوى"
          value={level}
          onChange={(v) => {
            setLevel(Number(v));
            setDegree(1);
          }}
          options={position.levels.map((l) => ({
            value: l.level,
            label: `المستوى ${l.level}`,
          }))}
        />
        <SelectField
          label="الدرجة"
          value={degree}
          onChange={(v) => setDegree(Number(v))}
          options={Array.from(
            { length: currentLevel?.maxDegrees ?? 4 },
            (_, i) => ({
              value: i + 1,
              label: `الدرجة ${i + 1}`,
            })
          )}
        />
      </div>

      <ResultCard basic={salary} transport={position.transportAllowance} />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
              <th className="px-3 py-2 text-right">المسمى</th>
              <th className="px-3 py-2 text-right">المستويات</th>
              <th className="px-3 py-2 text-right">أدنى راتب</th>
              <th className="px-3 py-2 text-right">أعلى راتب</th>
              <th className="px-3 py-2 text-right">بدل النقل</th>
            </tr>
          </thead>
          <tbody>
            {HEALTH_SCALE.map((pos) => {
              const minSalary = pos.levels[0].baseSalary;
              const lastLevel = pos.levels[pos.levels.length - 1];
              const maxSalary =
                lastLevel.baseSalary +
                (lastLevel.maxDegrees - 1) * lastLevel.increment;
              const isSelected = pos.id === positionId;
              return (
                <tr
                  key={pos.id}
                  className={
                    isSelected
                      ? "bg-orange-50 dark:bg-orange-900/20 font-bold"
                      : "even:bg-gray-50 dark:even:bg-gray-800/40"
                  }
                >
                  <td className="px-3 py-2">{pos.labelAr}</td>
                  <td className="px-3 py-2">{pos.levels.length} مستويات</td>
                  <td className="px-3 py-2">{fmtSalary(minSalary)}</td>
                  <td className="px-3 py-2">{fmtSalary(maxSalary)}</td>
                  <td className="px-3 py-2">{fmtSalary(pos.transportAllowance)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ────────────── Tab: Military ────────────── */

function MilitaryTab() {
  const [subTab, setSubTab] = useState<MilitarySubTab>("officers");
  const ranks =
    subTab === "officers" ? MILITARY_OFFICERS : MILITARY_ENLISTED;

  const [rankId, setRankId] = useState(ranks[0].id);
  const [degree, setDegree] = useState(1);

  const currentRank = useMemo(
    () => ranks.find((r) => r.id === rankId) ?? ranks[0],
    [ranks, rankId]
  );

  const salary = useMemo(
    () => getMilitarySalary(ranks, currentRank.id, degree),
    [ranks, currentRank, degree]
  );

  const handleSubTabChange = (tab: MilitarySubTab) => {
    setSubTab(tab);
    const newRanks =
      tab === "officers" ? MILITARY_OFFICERS : MILITARY_ENLISTED;
    setRankId(newRanks[0].id);
    setDegree(1);
  };

  return (
    <div className="space-y-5">
      {/* Sub-tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => handleSubTabChange("officers")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            subTab === "officers"
              ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-300 dark:border-orange-700"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
          }`}
        >
          ضباط
        </button>
        <button
          onClick={() => handleSubTabChange("enlisted")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            subTab === "enlisted"
              ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-300 dark:border-orange-700"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
          }`}
        >
          أفراد
        </button>
      </div>

      {/* Selectors */}
      <div className="flex flex-wrap gap-3">
        <SelectField
          label="الرتبة"
          value={currentRank.id}
          onChange={(v) => {
            setRankId(v);
            const r = ranks.find((x) => x.id === v)!;
            if (degree > r.maxDegrees) setDegree(r.maxDegrees);
          }}
          options={ranks.map((r) => ({
            value: r.id,
            label: r.labelAr,
          }))}
        />
        <SelectField
          label="الدرجة"
          value={degree}
          onChange={(v) => setDegree(Number(v))}
          options={Array.from(
            { length: currentRank.maxDegrees },
            (_, i) => ({
              value: i + 1,
              label: `الدرجة ${i + 1}`,
            })
          )}
        />
      </div>

      <ResultCard
        basic={salary}
        transport={currentRank.transportAllowance}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
              <th className="px-3 py-2 text-right">الرتبة</th>
              <th className="px-3 py-2 text-right">راتب الدرجة 1</th>
              <th className="px-3 py-2 text-right">أعلى راتب</th>
              <th className="px-3 py-2 text-right">العلاوة</th>
              <th className="px-3 py-2 text-right">بدل النقل</th>
            </tr>
          </thead>
          <tbody>
            {ranks.map((r) => {
              const maxSalary =
                r.baseSalary + (r.maxDegrees - 1) * r.increment;
              const isSelected = r.id === currentRank.id;
              return (
                <tr
                  key={r.id}
                  className={
                    isSelected
                      ? "bg-orange-50 dark:bg-orange-900/20 font-bold"
                      : "even:bg-gray-50 dark:even:bg-gray-800/40"
                  }
                >
                  <td className="px-3 py-2">{r.labelAr}</td>
                  <td className="px-3 py-2">{fmtSalary(r.baseSalary)}</td>
                  <td className="px-3 py-2">{fmtSalary(maxSalary)}</td>
                  <td className="px-3 py-2">{fmtSalary(r.increment)}</td>
                  <td className="px-3 py-2">
                    {fmtSalary(r.transportAllowance)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ────────────── Main Component ────────────── */

export default function GovSalaryScales() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  return (
    <section dir="rtl" className="space-y-5">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        سلالم الرواتب الحكومية
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-orange-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        {activeTab === "general" && <GeneralTab />}
        {activeTab === "education" && <EducationTab />}
        {activeTab === "health" && <HealthTab />}
        {activeTab === "military" && <MilitaryTab />}
      </div>
    </section>
  );
}
