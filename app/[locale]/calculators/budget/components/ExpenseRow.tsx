"use client";

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

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div style={{ backgroundColor: category.color }} className="w-1 h-12 rounded-full flex-shrink-0" />
      <span className="text-2xl flex-shrink-0">{category.icon}</span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm text-gray-800 dark:text-white">{category.name}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            موصى: {category.recommended.min}-{category.recommended.max}%
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={income}
          step={100}
          value={amount}
          onChange={(e) => onChange(category.id, +e.target.value)}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{ accentColor: category.color }}
        />
        {isOver && (
          <p className="text-xs text-red-500 mt-0.5">⚠️ تجاوزت الحد الموصى به ({category.recommended.max}%)</p>
        )}
      </div>

      <div className="text-left flex-shrink-0" style={{ minWidth: 100 }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => onChange(category.id, Math.max(0, +e.target.value))}
          className="text-right font-semibold text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg rounded-lg px-2 py-1.5 w-24 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <div className="text-xs text-gray-400 text-center mt-0.5">
          {percent.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
