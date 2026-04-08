"use client";

interface BudgetRuleChartProps {
  expenses: Record<string, number>;
  income: number;
}

const NEEDS_CATS = ["housing", "food", "transport", "health"];
const WANTS_CATS = ["entertainment", "clothing", "education", "other"];
const SAVINGS_CATS = ["savings"];

export default function BudgetRuleChart({ expenses, income }: BudgetRuleChartProps) {
  if (income <= 0) return null;

  const needsTotal = NEEDS_CATS.reduce((s, id) => s + (expenses[id] || 0), 0);
  const wantsTotal = WANTS_CATS.reduce((s, id) => s + (expenses[id] || 0), 0);
  const savingsTotal = SAVINGS_CATS.reduce((s, id) => s + (expenses[id] || 0), 0);

  const needsPct = (needsTotal / income) * 100;
  const wantsPct = (wantsTotal / income) * 100;
  const savingsPct = (savingsTotal / income) * 100;

  const categories = [
    {
      label: "الضروريات",
      sublabel: "سكن، طعام، نقل، صحة",
      actual: needsPct,
      recommended: 50,
      color: "#10b981",
      bgColor: "bg-green-50 dark:bg-green-900/10",
      borderColor: "border-green-200 dark:border-green-800",
      amount: needsTotal,
    },
    {
      label: "الرغبات",
      sublabel: "ترفيه، ملابس، تعليم، أخرى",
      actual: wantsPct,
      recommended: 30,
      color: "#3b82f6",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      borderColor: "border-blue-200 dark:border-blue-800",
      amount: wantsTotal,
    },
    {
      label: "الادخار",
      sublabel: "ادخار واستثمار",
      actual: savingsPct,
      recommended: 20,
      color: "#06b6d4",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/10",
      borderColor: "border-cyan-200 dark:border-cyan-800",
      amount: savingsTotal,
    },
  ];

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">📐 قاعدة 50-30-20</h3>
      <p className="text-xs text-gray-400 mb-5">مقارنة ميزانيتك بالقاعدة المالية الشهيرة</p>

      <div className="space-y-5">
        {categories.map((cat) => {
          const isOver = cat.actual > cat.recommended;
          const maxVal = Math.max(cat.actual, cat.recommended, 60);
          return (
            <div key={cat.label}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-sm text-gray-800 dark:text-white">{cat.label}</span>
                  <span className="text-xs text-gray-400 mr-2">({cat.sublabel})</span>
                </div>
                <span className="text-sm font-bold" style={{ color: cat.color }}>
                  {cat.amount.toLocaleString("ar-SA")} ريال
                </span>
              </div>

              {/* Actual bar */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500 w-12 flex-shrink-0">ميزانيتك</span>
                <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(cat.actual / maxVal) * 100}%`,
                      backgroundColor: isOver && cat.label !== "الادخار" ? "#ef4444" : cat.color,
                    }}
                  />
                </div>
                <span className={`text-xs font-bold w-10 text-left ${isOver && cat.label !== "الادخار" ? "text-red-500" : ""}`} style={{ color: !isOver || cat.label === "الادخار" ? cat.color : undefined }}>
                  {cat.actual.toFixed(0)}%
                </span>
              </div>

              {/* Recommended bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-12 flex-shrink-0">الموصى</span>
                <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full opacity-30"
                    style={{
                      width: `${(cat.recommended / maxVal) * 100}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-10 text-left">{cat.recommended}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
