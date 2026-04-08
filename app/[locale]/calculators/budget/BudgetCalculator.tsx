"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { RotateCcw, Wand2, Share2, Printer } from "lucide-react";
import IncomeSlider from "./components/IncomeSlider";
import SummaryCards from "./components/SummaryCards";
import ExpenseRow from "./components/ExpenseRow";
import ExpenseDonutChart from "./components/ExpenseDonutChart";
import ExpenseBarChart from "./components/ExpenseBarChart";
import SmartAdvice from "./components/SmartAdvice";
import SavingsProjection from "./components/SavingsProjection";
import BudgetRuleChart from "./components/BudgetRuleChart";
import RelatedCalcSidebar from "./components/RelatedCalcSidebar";

const EXPENSE_CATEGORIES = [
  {
    id: "housing", name: "السكن والإيجار", icon: "🏠", color: "#10b981",
    defaultPercent: 30, recommended: { min: 25, max: 35 },
    tips: "المعيار السعودي: لا يتجاوز 30% من الدخل",
  },
  {
    id: "food", name: "الطعام والمطاعم", icon: "🍽️", color: "#f59e0b",
    defaultPercent: 20, recommended: { min: 15, max: 25 },
    tips: "الطهي في البيت يوفر 40% من تكلفة الطعام",
  },
  {
    id: "transport", name: "النقل والمواصلات", icon: "🚗", color: "#3b82f6",
    defaultPercent: 15, recommended: { min: 10, max: 20 },
    tips: "يشمل قسط السيارة والبنزين والتأمين",
  },
  {
    id: "education", name: "التعليم والتطوير", icon: "📚", color: "#8b5cf6",
    defaultPercent: 5, recommended: { min: 5, max: 10 },
    tips: "استثمر في نفسك — التعليم عائده لا ينتهي",
  },
  {
    id: "health", name: "الصحة والطب", icon: "💊", color: "#ef4444",
    defaultPercent: 5, recommended: { min: 3, max: 8 },
    tips: "تأمين طبي شامل يقلل التكاليف الطارئة",
  },
  {
    id: "entertainment", name: "الترفيه والتسلية", icon: "🎮", color: "#ec4899",
    defaultPercent: 5, recommended: { min: 3, max: 8 },
    tips: "الترفيه ضروري — لكن ضع له حداً شهرياً",
  },
  {
    id: "clothing", name: "الملابس والمظهر", icon: "👗", color: "#f97316",
    defaultPercent: 5, recommended: { min: 3, max: 7 },
    tips: "خطط مشترياتك مع العروض والمواسم",
  },
  {
    id: "savings", name: "الادخار والاستثمار", icon: "💰", color: "#06b6d4",
    defaultPercent: 10, recommended: { min: 10, max: 20 },
    tips: "القاعدة الذهبية: ادّخر أولاً ثم أنفق",
  },
  {
    id: "other", name: "مصروفات أخرى", icon: "📦", color: "#6b7280",
    defaultPercent: 5, recommended: { min: 2, max: 8 },
    tips: "احتياطي للمصروفات غير المتوقعة",
  },
];

function buildDefaultExpenses(income: number) {
  return EXPENSE_CATEGORIES.reduce((acc, cat) => ({
    ...acc,
    [cat.id]: Math.round(income * cat.defaultPercent / 100),
  }), {} as Record<string, number>);
}

interface BudgetCalculatorProps {
  locale?: string;
}

export default function BudgetCalculator({ locale = "ar" }: BudgetCalculatorProps) {
  const [monthlyIncome, setMonthlyIncome] = useState(15000);
  const [expenses, setExpenses] = useState(() => buildDefaultExpenses(15000));
  const [savingsGoalPercent, setSavingsGoalPercent] = useState(20);

  // Load from URL on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const data = params.get("d");
      if (data) {
        const parsed = JSON.parse(atob(data));
        if (parsed.income) setMonthlyIncome(parsed.income);
        if (parsed.expenses) setExpenses(parsed.expenses);
      }
    } catch { /* ignore invalid data */ }
  }, []);

  const totalExpenses = useMemo(() =>
    Object.values(expenses).reduce((s, v) => s + v, 0), [expenses]);

  const totalSavings = useMemo(() =>
    monthlyIncome - totalExpenses, [monthlyIncome, totalExpenses]);

  const savingsRate = useMemo(() =>
    monthlyIncome > 0 ? (totalSavings / monthlyIncome) * 100 : 0,
    [totalSavings, monthlyIncome]);

  const handleIncomeChange = useCallback((newIncome: number) => {
    const oldIncome = monthlyIncome;
    setMonthlyIncome(newIncome);
    if (oldIncome > 0) {
      const ratio = newIncome / oldIncome;
      setExpenses((prev) => {
        const updated: Record<string, number> = {};
        for (const [id, val] of Object.entries(prev)) {
          updated[id] = Math.round(val * ratio);
        }
        return updated;
      });
    }
  }, [monthlyIncome]);

  const updateExpense = useCallback((id: string, value: number) => {
    setExpenses((prev) => ({ ...prev, [id]: Math.max(0, value) }));
  }, []);

  const autoDistribute = useCallback(() => {
    setExpenses(buildDefaultExpenses(monthlyIncome));
  }, [monthlyIncome]);

  const resetAll = useCallback(() => {
    setMonthlyIncome(15000);
    setExpenses(buildDefaultExpenses(15000));
    setSavingsGoalPercent(20);
  }, []);

  // Financial Health Score
  const healthScore = useMemo(() => {
    let score = 0;
    const savPct = monthlyIncome > 0 ? (expenses.savings / monthlyIncome) * 100 : 0;
    if (savPct >= 20) score += 40;
    else if (savPct >= 10) score += 25;
    else if (savPct >= 5) score += 10;

    const withinBounds = EXPENSE_CATEGORIES.filter((cat) => {
      const pct = monthlyIncome > 0 ? (expenses[cat.id] / monthlyIncome) * 100 : 0;
      return pct <= cat.recommended.max;
    }).length;
    score += Math.round((withinBounds / EXPENSE_CATEGORIES.length) * 30);

    if (totalSavings >= 0) score += 20;

    const activeCats = Object.values(expenses).filter((v) => v > 0).length;
    score += Math.min(10, activeCats);

    return Math.min(100, score);
  }, [expenses, monthlyIncome, totalSavings]);

  // Smart Advice
  const advices = useMemo(() => {
    const list: { type: "warning" | "success" | "info" | "danger"; icon: string; title: string; description: string }[] = [];
    const housingPct = monthlyIncome > 0 ? (expenses.housing / monthlyIncome) * 100 : 0;
    const savingsPct = monthlyIncome > 0 ? (expenses.savings / monthlyIncome) * 100 : 0;
    const foodPct = monthlyIncome > 0 ? (expenses.food / monthlyIncome) * 100 : 0;

    if (totalSavings < 0) {
      list.push({ type: "danger", icon: "🚨", title: "تنفق أكثر مما تكسب!", description: `مصروفاتك تتجاوز دخلك بـ ${Math.abs(totalSavings).toLocaleString("ar-SA")} ريال. هذا يؤدي لتراكم الديون.` });
    }
    if (housingPct > 35) {
      list.push({ type: "danger", icon: "🏠", title: "مصاريف السكن مرتفعة جداً", description: `تنفق ${housingPct.toFixed(0)}% على السكن — المعيار 30%. فكّر في خفض الإيجار أو البحث عن مسكن أقل تكلفة.` });
    }
    if (savingsPct < 10 && totalSavings >= 0) {
      list.push({ type: "warning", icon: "💰", title: "نسبة الادخار أقل من المثالية", description: `تدّخر ${savingsPct.toFixed(0)}% فقط. الهدف المثالي 10-20%. حاول تقليل نفقة واحدة غير ضرورية.` });
    } else if (savingsPct >= 20) {
      list.push({ type: "success", icon: "🎉", title: "رائع! نسبة ادخارك ممتازة", description: `تدّخر ${savingsPct.toFixed(0)}% من دخلك — أنت على الطريق الصحيح نحو الاستقلال المالي.` });
    }
    if (foodPct > 25) {
      list.push({ type: "info", icon: "🍽️", title: "مصاريف الطعام يمكن تخفيضها", description: `${foodPct.toFixed(0)}% على الطعام. الطهي المنزلي يوفر حتى 40% من هذه التكلفة.` });
    }
    return list;
  }, [expenses, monthlyIncome, totalSavings]);

  // Chart data
  const pieData = useMemo(() =>
    EXPENSE_CATEGORIES.filter((cat) => expenses[cat.id] > 0).map((cat) => ({
      name: cat.name, value: expenses[cat.id], color: cat.color,
    })), [expenses]);

  const comparisonBarData = useMemo(() =>
    EXPENSE_CATEGORIES.map((cat) => ({
      name: cat.name,
      userPercent: monthlyIncome > 0 ? (expenses[cat.id] / monthlyIncome) * 100 : 0,
      recommendedMax: cat.recommended.max,
      color: cat.color,
    })), [expenses, monthlyIncome]);

  // Share
  const handleShare = useCallback(() => {
    const data = btoa(JSON.stringify({ income: monthlyIncome, expenses }));
    const url = `${window.location.origin}${window.location.pathname}?d=${data}`;
    navigator.clipboard.writeText(url);
    alert("تم نسخ رابط الميزانية!");
  }, [monthlyIncome, expenses]);

  const handlePrint = useCallback(() => window.print(), []);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Income + Savings Goal */}
      <IncomeSlider
        income={monthlyIncome}
        onChange={handleIncomeChange}
        savingsGoalPercent={savingsGoalPercent}
        onSavingsGoalChange={setSavingsGoalPercent}
      />

      {/* Summary Cards with Health Score */}
      <SummaryCards
        income={monthlyIncome}
        totalExpenses={totalExpenses}
        totalSavings={totalSavings}
        healthScore={healthScore}
      />

      {/* Main content: Expenses + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
        {/* Main column */}
        <div className="space-y-6">
          {/* Expense Table */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">فئات النفقات</h3>
              <div className="flex gap-2">
                <button
                  onClick={autoDistribute}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <Wand2 className="h-3.5 w-3.5" /> توزيع ذكي
                </button>
                <button
                  onClick={resetAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> إعادة ضبط
                </button>
              </div>
            </div>

            {totalExpenses > monthlyIncome && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-medium">
                ⚠️ مصروفاتك تتجاوز دخلك بـ {(totalExpenses - monthlyIncome).toLocaleString("ar-SA")} ريال
              </div>
            )}

            <div>
              {EXPENSE_CATEGORIES.map((cat) => (
                <ExpenseRow
                  key={cat.id}
                  category={cat}
                  amount={expenses[cat.id]}
                  income={monthlyIncome}
                  onChange={updateExpense}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button onClick={handleShare} className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Share2 className="h-3.5 w-3.5" /> مشاركة الميزانية
              </button>
              <button onClick={handlePrint} className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Printer className="h-3.5 w-3.5" /> طباعة
              </button>
            </div>
          </div>

          {/* Charts row: Donut + 50-30-20 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExpenseDonutChart data={pieData} savingsRate={savingsRate} />
            <BudgetRuleChart expenses={expenses} income={monthlyIncome} />
          </div>

          {/* Budget vs Recommended Bar Chart */}
          <ExpenseBarChart data={comparisonBarData} />

          {/* Smart Advice */}
          <SmartAdvice advices={advices} />

          {/* Yearly Projection with Line Chart */}
          <SavingsProjection
            monthlySavings={totalSavings > 0 ? totalSavings : 0}
            monthlyIncome={monthlyIncome}
            monthlyExpenses={totalExpenses}
          />
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <RelatedCalcSidebar locale={locale} />
        </div>
      </div>
    </div>
  );
}
