"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calculator, RotateCcw } from "lucide-react";

export default function BMICalculator() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    const h = (parseFloat(height) || 0) / 100;
    if (w <= 0 || h <= 0) return;

    const bmi = w / (h * h);
    let category: string;
    let color: string;

    if (bmi < 18.5) {
      category = isAr ? "نقص في الوزن" : "Underweight";
      color = "text-blue-600 dark:text-blue-400";
    } else if (bmi < 25) {
      category = isAr ? "وزن طبيعي" : "Normal weight";
      color = "text-green-600 dark:text-green-400";
    } else if (bmi < 30) {
      category = isAr ? "زيادة في الوزن" : "Overweight";
      color = "text-amber-600 dark:text-amber-400";
    } else if (bmi < 35) {
      category = isAr ? "سمنة درجة أولى" : "Obesity Class I";
      color = "text-orange-600 dark:text-orange-400";
    } else if (bmi < 40) {
      category = isAr ? "سمنة درجة ثانية" : "Obesity Class II";
      color = "text-red-600 dark:text-red-400";
    } else {
      category = isAr ? "سمنة مفرطة" : "Obesity Class III";
      color = "text-red-700 dark:text-red-500";
    }

    setResult({ bmi, category, color });
  };

  const reset = () => { setWeight(""); setHeight(""); setResult(null); };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500";
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
          <Calculator className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isAr ? "حاسبة مؤشر كتلة الجسم (BMI)" : "Body Mass Index (BMI) Calculator"}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelClass}>{isAr ? "الوزن (كجم)" : "Weight (kg)"}</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} placeholder="70" />
        </div>
        <div>
          <label className={labelClass}>{isAr ? "الطول (سم)" : "Height (cm)"}</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className={inputClass} placeholder="170" />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
          {isAr ? "احسب" : "Calculate"}
        </button>
        <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-gray-800 dark:text-white">{isAr ? "مؤشر كتلة الجسم:" : "BMI:"}</span>
            <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">{result.bmi.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "التصنيف:" : "Category:"}</span>
            <span className={`font-bold text-lg ${result.color}`}>{result.category}</span>
          </div>

          <div className="mt-4 space-y-1.5 text-xs">
            {[
              { range: "< 18.5", labelAr: "نقص في الوزن", labelEn: "Underweight", color: "bg-blue-500" },
              { range: "18.5 - 24.9", labelAr: "طبيعي", labelEn: "Normal", color: "bg-green-500" },
              { range: "25 - 29.9", labelAr: "زيادة في الوزن", labelEn: "Overweight", color: "bg-amber-500" },
              { range: "30 - 34.9", labelAr: "سمنة درجة أولى", labelEn: "Obesity I", color: "bg-orange-500" },
              { range: "35 - 39.9", labelAr: "سمنة درجة ثانية", labelEn: "Obesity II", color: "bg-red-500" },
              { range: "≥ 40", labelAr: "سمنة مفرطة", labelEn: "Obesity III", color: "bg-red-700" },
            ].map((item) => (
              <div key={item.range} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-gray-500 dark:text-gray-400">{item.range}</span>
                <span className="text-gray-700 dark:text-gray-300">{isAr ? item.labelAr : item.labelEn}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
