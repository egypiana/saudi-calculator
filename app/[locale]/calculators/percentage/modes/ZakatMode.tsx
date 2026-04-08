"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { fmt } from "../components/ResultCard";
import FormulaDisplay from "../components/FormulaDisplay";
import DonutChart from "../components/DonutChart";

export default function ZakatMode() {
  const [amount, setAmount] = useState(50000);
  const [goldPrice, setGoldPrice] = useState(215);

  const nisab = useMemo(() => goldPrice * 85, [goldPrice]);
  const zakatDue = useMemo(() => amount >= nisab, [amount, nisab]);
  const zakatAmount = useMemo(() => (zakatDue ? amount * 0.025 : 0), [amount, zakatDue]);
  const remaining = useMemo(() => (zakatDue ? amount - zakatAmount : 0), [amount, zakatAmount, zakatDue]);
  const shortfall = useMemo(() => (!zakatDue ? nisab - amount : 0), [nisab, amount, zakatDue]);

  const formula = zakatDue
    ? `${fmt(amount)} × 2.5% = ${fmt(zakatAmount)}`
    : `النصاب = ${goldPrice} × 85 = ${fmt(nisab)} ريال`;

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">المبلغ الزكوي (ريال)</label>
            <input
              type="number"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-[52px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">سعر غرام الذهب الحالي (ريال) — لحساب النصاب</label>
            <input
              type="number"
              value={goldPrice || ""}
              onChange={(e) => setGoldPrice(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />
            <p className="text-[11px] text-gray-400 mt-1">النصاب = 85 غرام × {goldPrice} = {fmt(nisab)} ريال</p>
          </div>
        </div>

        <div className="space-y-4">
          {zakatDue ? (
            <>
              <div className="bg-green-50 dark:bg-green-900/10 border-2 border-green-200 dark:border-green-800/40 rounded-2xl p-5 text-center">
                <p className="text-sm text-green-600 mb-2">✅ تجب عليك الزكاة</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400 tabular-nums">
                  {fmt(zakatAmount)} <span className="text-lg font-normal opacity-60">ريال</span>
                </p>
              </div>
              <DonutChart percent={2.5} color="#059669" label="الزكاة 2.5%" />
            </>
          ) : (
            <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800/40 rounded-2xl p-5 text-center">
              <p className="text-sm text-blue-600 mb-2">ℹ️ لا تجب عليك الزكاة حتى الآن</p>
              <p className="text-lg text-blue-700 dark:text-blue-400">
                تحتاج <strong>{fmt(shortfall)}</strong> ريال إضافية لبلوغ النصاب
              </p>
            </div>
          )}
        </div>
      </div>

      <FormulaDisplay formula={formula} />

      {zakatDue && (
        <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              <tr><td className="px-4 py-3 text-gray-600 dark:text-gray-300">المبلغ الزكوي</td><td className="px-4 py-3 text-left tabular-nums">{fmt(amount)} ريال</td></tr>
              <tr className="bg-gray-50 dark:bg-white/[0.02]"><td className="px-4 py-3 text-gray-600 dark:text-gray-300">مبلغ الزكاة (2.5%)</td><td className="px-4 py-3 text-left tabular-nums">{fmt(zakatAmount)} ريال</td></tr>
              <tr className="bg-green-50 dark:bg-green-900/10 font-bold"><td className="px-4 py-3 text-gray-700 dark:text-gray-200">المتبقي بعد الزكاة</td><td className="px-4 py-3 text-left tabular-nums">{fmt(remaining)} ريال</td></tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center">
        <Link href="/ar/calculators/zakat" className="text-sm text-green-600 dark:text-green-400 hover:underline">
          للحساب الشامل ← حاسبة الزكاة الكاملة
        </Link>
      </div>
    </div>
  );
}
