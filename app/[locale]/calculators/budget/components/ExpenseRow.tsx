"use client";

import { Minus, Plus } from "lucide-react";

interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  recommended: { min: number; max: number };
  tips: string;
}

interface ExpenseRowProps {
  category: ExpenseCategory;
  amount: number;
  income: number;
  onChange: (id: string, value: number) => void;
}

export default function ExpenseRow({ category, amount, income, onChange }: ExpenseRowProps) {
  const percent = income > 0 ? (amount / income) * 100 : 0;
  const isOver = percent > category.recommended.max;
  const isUnder = percent < category.recommended.min;
  const maxPercent = Math.max(category.recommended.max + 10, percent + 5);
  const fillWidth = Math.min((percent / maxPercent) * 100, 100);

  const step = income >= 50000 ? 500 : income >= 20000 ? 250 : 100;

  return (
    <div className="py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      {/* Top row: icon + name + amount controls */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ backgroundColor: `${category.color}18` }}
          >
            {category.icon}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-sm text-gray-800 dark:text-white truncate">
              {category.name}
            </h4>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {category.recommended.min}–{category.recommended.max}% موصى
            </span>
          </div>
        </div>

        {/* Amount controls: minus / input / plus */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => onChange(category.id, Math.max(0, amount - step))}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="تقليل"
          >
            <Minus className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => onChange(category.id, Math.max(0, +e.target.value))}
              className="w-24 text-center font-bold text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg rounded-lg px-1 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            onClick={() => onChange(category.id, amount + step)}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="زيادة"
          >
            <Plus className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative">
          {/* Recommended range indicator */}
          <div
            className="absolute top-0 h-full opacity-20 rounded-full"
            style={{
              right: `${(category.recommended.min / maxPercent) * 100}%`,
              width: `${((category.recommended.max - category.recommended.min) / maxPercent) * 100}%`,
              backgroundColor: category.color,
            }}
          />
          {/* Actual fill */}
          <div
            className="h-full rounded-full transition-all duration-300 relative"
            style={{
              width: `${fillWidth}%`,
              backgroundColor: isOver ? "#ef4444" : category.color,
            }}
          />
        </div>
        <span
          className={`text-xs font-bold min-w-[40px] text-left ${
            isOver ? "text-red-500" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {percent.toFixed(0)}%
        </span>
      </div>

      {/* Warning / tip */}
      {isOver && (
        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
          <span>⚠️</span> تجاوزت الحد الموصى به ({category.recommended.max}%)
        </p>
      )}
      {isUnder && percent > 0 && category.id === "savings" && (
        <p className="text-xs text-amber-500 mt-1.5 flex items-center gap-1">
          <span>💡</span> {category.tips}
        </p>
      )}
    </div>
  );
}
