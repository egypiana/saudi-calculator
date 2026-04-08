"use client";

import { Wallet, ShoppingCart, PiggyBank } from "lucide-react";

interface SummaryCardsProps {
  income: number;
  totalExpenses: number;
  totalSavings: number;
}

export default function SummaryCards({ income, totalExpenses, totalSavings }: SummaryCardsProps) {
  const expenseRatio = income > 0 ? totalExpenses / income : 0;
  const savingsRatio = income > 0 ? totalSavings / income : 0;

  const expenseColor = expenseRatio > 0.9
    ? "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/10"
    : expenseRatio > 0.8
    ? "border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10"
    : "border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-900/10";

  const expenseTextColor = expenseRatio > 0.9
    ? "text-red-600 dark:text-red-400"
    : expenseRatio > 0.8
    ? "text-amber-600 dark:text-amber-400"
    : "text-green-600 dark:text-green-400";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Income */}
      <div className="rounded-2xl border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-900/10 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">الدخل الشهري</span>
        </div>
        <p className="text-2xl font-bold text-green-700 dark:text-green-300">
          {income.toLocaleString("ar-SA")} <span className="text-sm">ريال</span>
        </p>
        <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-1">راتبك الشهري</p>
      </div>

      {/* Expenses */}
      <div className={`rounded-2xl border p-5 ${expenseColor}`}>
        <div className="flex items-center gap-2 mb-2">
          <ShoppingCart className={`h-5 w-5 ${expenseTextColor}`} />
          <span className={`text-sm font-medium ${expenseTextColor}`}>إجمالي النفقات</span>
        </div>
        <p className={`text-2xl font-bold ${expenseTextColor}`}>
          {totalExpenses.toLocaleString("ar-SA")} <span className="text-sm">ريال</span>
        </p>
        <p className={`text-xs mt-1 ${expenseTextColor} opacity-70`}>
          {(expenseRatio * 100).toFixed(0)}% من الدخل
        </p>
      </div>

      {/* Savings */}
      <div className={`rounded-2xl border p-5 ${
        totalSavings < 0
          ? "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/10"
          : "border-cyan-300 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/10"
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <PiggyBank className={`h-5 w-5 ${totalSavings < 0 ? "text-red-600 dark:text-red-400" : "text-cyan-600 dark:text-cyan-400"}`} />
          <span className={`text-sm font-medium ${totalSavings < 0 ? "text-red-700 dark:text-red-300" : "text-cyan-700 dark:text-cyan-300"}`}>
            صافي الادخار
          </span>
        </div>
        <p className={`text-2xl font-bold ${totalSavings < 0 ? "text-red-700 dark:text-red-300" : "text-cyan-700 dark:text-cyan-300"}`}>
          {totalSavings.toLocaleString("ar-SA")} <span className="text-sm">ريال</span>
        </p>
        <p className={`text-xs mt-1 opacity-70 ${totalSavings < 0 ? "text-red-600 dark:text-red-400" : "text-cyan-600 dark:text-cyan-400"}`}>
          {(savingsRatio * 100).toFixed(0)}% من الدخل
        </p>
      </div>
    </div>
  );
}
