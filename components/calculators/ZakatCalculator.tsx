"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calculator, RotateCcw } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default function ZakatCalculator() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [stocks, setStocks] = useState("");
  const [trade, setTrade] = useState("");
  const [debts, setDebts] = useState("");
  const [goldPrice, setGoldPrice] = useState("300");
  const [result, setResult] = useState<{ total: number; zakat: number; nisab: number; eligible: boolean } | null>(null);

  const calculate = () => {
    const cashVal = parseFloat(cash) || 0;
    const goldVal = (parseFloat(gold) || 0) * (parseFloat(goldPrice) || 300);
    const stocksVal = parseFloat(stocks) || 0;
    const tradeVal = parseFloat(trade) || 0;
    const debtsVal = parseFloat(debts) || 0;

    const total = cashVal + goldVal + stocksVal + tradeVal - debtsVal;
    const nisab = 85 * (parseFloat(goldPrice) || 300);
    const eligible = total >= nisab;
    const zakat = eligible ? total * 0.025 : 0;

    setResult({ total, zakat, nisab, eligible });
  };

  const reset = () => {
    setCash(""); setGold(""); setStocks(""); setTrade(""); setDebts(""); setGoldPrice("300");
    setResult(null);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
          <Calculator className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isAr ? "حاسبة الزكاة" : "Zakat Calculator"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>{isAr ? "النقد والأرصدة البنكية (ريال)" : "Cash & Bank Balance (SAR)"}</label>
          <input type="number" value={cash} onChange={(e) => setCash(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "الذهب (غرام)" : "Gold (grams)"}</label>
          <input type="number" value={gold} onChange={(e) => setGold(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "الأسهم والاستثمارات (ريال)" : "Stocks & Investments (SAR)"}</label>
          <input type="number" value={stocks} onChange={(e) => setStocks(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "عروض التجارة (ريال)" : "Trade Goods (SAR)"}</label>
          <input type="number" value={trade} onChange={(e) => setTrade(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "الديون المستحقة عليك (ريال)" : "Debts You Owe (SAR)"}</label>
          <input type="number" value={debts} onChange={(e) => setDebts(e.target.value)} className={inputClass} placeholder="0" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "سعر غرام الذهب (ريال)" : "Gold Price per Gram (SAR)"}</label>
          <input type="number" value={goldPrice} onChange={(e) => setGoldPrice(e.target.value)} className={inputClass} placeholder="300" />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
          {isAr ? "احسب الزكاة" : "Calculate Zakat"}
        </button>
        <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "إجمالي الأموال:" : "Total Wealth:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{formatNumber(result.total)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "نصاب الزكاة (85 غرام ذهب):" : "Nisab (85g gold):"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{formatNumber(result.nisab)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />
          {result.eligible ? (
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800 dark:text-white">{isAr ? "مبلغ الزكاة (2.5%):" : "Zakat Amount (2.5%):"}</span>
              <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">{formatNumber(result.zakat)} {isAr ? "ريال" : "SAR"}</span>
            </div>
          ) : (
            <p className="text-center text-amber-600 dark:text-amber-400 font-bold">
              {isAr ? "لا تجب عليك الزكاة — المبلغ أقل من النصاب" : "No Zakat required — amount below Nisab"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
