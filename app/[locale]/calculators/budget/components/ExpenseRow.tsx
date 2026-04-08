"use client";

import { useRef, useCallback } from "react";
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

function useHoldButton(callback: () => void) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  }, []);

  const start = useCallback(() => {
    callback();
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(callback, 80);
    }, 350);
  }, [callback]);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: (e: React.TouchEvent) => { e.preventDefault(); start(); },
    onTouchEnd: stop,
    onTouchCancel: stop,
  };
}

export default function ExpenseRow({ category, amount, income, onChange }: ExpenseRowProps) {
  const percent = income > 0 ? (amount / income) * 100 : 0;
  const isOver = percent > category.recommended.max;
  const isUnder = percent < category.recommended.min;
  const maxPercent = Math.max(category.recommended.max + 10, percent + 5);
  const fillWidth = Math.min((percent / maxPercent) * 100, 100);

  const step = income >= 50000 ? 500 : income >= 20000 ? 250 : 100;

  const amountRef = useRef(amount);
  amountRef.current = amount;

  const increment = useCallback(() => {
    onChange(category.id, amountRef.current + step);
  }, [category.id, onChange, step]);

  const decrement = useCallback(() => {
    onChange(category.id, Math.max(0, amountRef.current - step));
  }, [category.id, onChange, step]);

  const plusHandlers = useHoldButton(increment);
  const minusHandlers = useHoldButton(decrement);

  return (
    <div className="py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      {/* Top row: icon + name + amount controls */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2.5">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
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
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {category.recommended.min}–{category.recommended.max}% موصى
            </span>
          </div>
        </div>

        {/* Amount controls: plus / input / minus */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <button
            {...plusHandlers}
            className="w-10 h-10 sm:w-9 sm:h-9 rounded-xl bg-gray-100 dark:bg-gray-800 active:bg-primary-100 dark:active:bg-primary-900/30 active:scale-95 flex items-center justify-center transition-all duration-100 select-none touch-manipulation"
            aria-label="زيادة"
          >
            <Plus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </button>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => onChange(category.id, Math.max(0, +e.target.value))}
              className="w-20 sm:w-24 text-center font-bold text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg rounded-xl px-1 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            {...minusHandlers}
            className="w-10 h-10 sm:w-9 sm:h-9 rounded-xl bg-gray-100 dark:bg-gray-800 active:bg-red-100 dark:active:bg-red-900/30 active:scale-95 flex items-center justify-center transition-all duration-100 select-none touch-manipulation"
            aria-label="تقليل"
          >
            <Minus className="h-4 w-4 text-gray-700 dark:text-gray-300" />
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
            className="h-full rounded-full transition-all duration-200 relative"
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
