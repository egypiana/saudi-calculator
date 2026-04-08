"use client";

import { Wallet, ShoppingCart, PiggyBank, TrendingUp, TrendingDown, CheckCircle } from "lucide-react";

interface SummaryCardsProps {
  income: number;
  totalExpenses: number;
  totalSavings: number;
  healthScore: number;
}

export default function SummaryCards({ income, totalExpenses, totalSavings, healthScore }: SummaryCardsProps) {
  const expenseRatio = income > 0 ? totalExpenses / income : 0;
  const savingsRatio = income > 0 ? totalSavings / income : 0;

  const healthLabel = healthScore >= 81 ? "ميزانية ممتازة" : healthScore >= 61 ? "ميزانية جيدة" : healthScore >= 41 ? "تحتاج تحسين" : "تحتاج مراجعة";
  const healthColor = healthScore >= 81 ? "text-green-600 dark:text-green-400" : healthScore >= 61 ? "text-blue-600 dark:text-blue-400" : healthScore >= 41 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400";
  const healthBg = healthScore >= 81 ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800" : healthScore >= 61 ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800" : healthScore >= 41 ? "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800" : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800";
  const HealthIcon = healthScore >= 61 ? CheckCircle : healthScore >= 41 ? TrendingUp : TrendingDown;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Income */}
        <div className="rounded-2xl border-2 border-green-200 dark:border-green-800 bg-white dark:bg-dark-surface p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500 rounded-r-full" />
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">الدخل الشهري</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {income.toLocaleString("ar-SA")} <span className="text-sm text-gray-400">ريال</span>
          </p>
        </div>

        {/* Expenses */}
        <div className={`rounded-2xl border-2 bg-white dark:bg-dark-surface p-5 relative overflow-hidden ${
          expenseRatio > 0.9 ? "border-red-200 dark:border-red-800" : expenseRatio > 0.8 ? "border-amber-200 dark:border-amber-800" : "border-blue-200 dark:border-blue-800"
        }`}>
          <div className={`absolute top-0 left-0 w-1.5 h-full rounded-r-full ${
            expenseRatio > 0.9 ? "bg-red-500" : expenseRatio > 0.8 ? "bg-amber-500" : "bg-blue-500"
          }`} />
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className={`h-5 w-5 ${
              expenseRatio > 0.9 ? "text-red-600 dark:text-red-400" : expenseRatio > 0.8 ? "text-amber-600 dark:text-amber-400" : "text-blue-600 dark:text-blue-400"
            }`} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">إجمالي النفقات</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {totalExpenses.toLocaleString("ar-SA")} <span className="text-sm text-gray-400">ريال</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">{(expenseRatio * 100).toFixed(0)}% من الدخل</p>
        </div>

        {/* Savings */}
        <div className={`rounded-2xl border-2 bg-white dark:bg-dark-surface p-5 relative overflow-hidden ${
          totalSavings < 0 ? "border-red-200 dark:border-red-800" : "border-cyan-200 dark:border-cyan-800"
        }`}>
          <div className={`absolute top-0 left-0 w-1.5 h-full rounded-r-full ${
            totalSavings < 0 ? "bg-red-500" : "bg-cyan-500"
          }`} />
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className={`h-5 w-5 ${totalSavings < 0 ? "text-red-600 dark:text-red-400" : "text-cyan-600 dark:text-cyan-400"}`} />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">صافي الادخار</span>
          </div>
          <p className={`text-2xl font-bold ${totalSavings < 0 ? "text-red-600 dark:text-red-400" : "text-gray-800 dark:text-white"}`}>
            {totalSavings.toLocaleString("ar-SA")} <span className="text-sm text-gray-400">ريال</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">{(savingsRatio * 100).toFixed(0)}% من الدخل</p>
        </div>
      </div>

      {/* Budget Health Status Bar */}
      <div className={`rounded-xl border p-3 flex items-center gap-3 ${healthBg}`}>
        <HealthIcon className={`h-5 w-5 flex-shrink-0 ${healthColor}`} />
        <div className="flex-1">
          <span className={`font-bold text-sm ${healthColor}`}>{healthLabel}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">— النقاط: {healthScore}/100</span>
        </div>
        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${healthScore}%`,
              backgroundColor: healthScore >= 81 ? "#10b981" : healthScore >= 61 ? "#3b82f6" : healthScore >= 41 ? "#f59e0b" : "#ef4444",
            }}
          />
        </div>
      </div>
    </div>
  );
}
