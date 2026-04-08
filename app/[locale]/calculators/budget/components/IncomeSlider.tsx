"use client";

import { Wallet, Target } from "lucide-react";

interface IncomeSliderProps {
  income: number;
  onChange: (value: number) => void;
  savingsGoalPercent: number;
  onSavingsGoalChange: (value: number) => void;
}

function getTrackStyle(value: number, min: number, max: number, filledColor: string, trackColor: string) {
  const percent = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to left, ${filledColor} ${percent}%, ${trackColor} ${percent}%)`,
  };
}

export default function IncomeSlider({ income, onChange, savingsGoalPercent, onSavingsGoalChange }: IncomeSliderProps) {
  const savingsTarget = Math.round(income * savingsGoalPercent / 100);

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Income */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 dark:text-white text-sm">الدخل الشهري</h2>
              <p className="text-xs text-gray-400">حرّك المؤشر أو أدخل المبلغ</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <input
              type="number"
              value={income}
              onChange={(e) => onChange(Math.max(1000, Math.min(100000, +e.target.value)))}
              className="text-3xl font-bold text-primary-600 dark:text-primary-400 bg-transparent border-none outline-none w-40 text-center"
            />
            <span className="text-lg text-gray-400">ريال</span>
          </div>
          <input
            type="range"
            min={1000}
            max={100000}
            step={500}
            value={income}
            onChange={(e) => onChange(+e.target.value)}
            className="budget-slider w-full h-2.5 rounded-full appearance-none cursor-pointer"
            style={getTrackStyle(income, 1000, 100000, "#1a6b3c", "#e5e7eb")}
          />
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1.5">
            <span>١٬٠٠٠</span>
            <span>٥٠٬٠٠٠</span>
            <span>١٠٠٬٠٠٠</span>
          </div>
        </div>

        {/* Savings Goal */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center">
              <Target className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 dark:text-white text-sm">هدف الادخار</h2>
              <p className="text-xs text-gray-400">النسبة المستهدفة من الدخل</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{savingsGoalPercent}%</span>
            <span className="text-sm text-gray-400">= {savingsTarget.toLocaleString("ar-SA")} ريال</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={savingsGoalPercent}
            onChange={(e) => onSavingsGoalChange(+e.target.value)}
            className="budget-slider budget-slider-cyan w-full h-2.5 rounded-full appearance-none cursor-pointer"
            style={getTrackStyle(savingsGoalPercent, 5, 50, "#0891b2", "#e5e7eb")}
          />
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1.5">
            <span>٥%</span>
            <span>٢٠% مثالي</span>
            <span>٥٠%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
