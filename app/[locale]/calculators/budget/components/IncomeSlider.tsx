"use client";

interface IncomeSliderProps {
  income: number;
  onChange: (value: number) => void;
}

export default function IncomeSlider({ income, onChange }: IncomeSliderProps) {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">أدخل دخلك الشهري</h2>
      <div className="text-center mb-4">
        <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
          {income.toLocaleString("ar-SA")}
        </span>
        <span className="text-xl text-gray-500 dark:text-gray-400 mr-2">ريال</span>
      </div>
      <input
        type="range"
        min={1000}
        max={100000}
        step={500}
        value={income}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-primary-600"
        style={{ accentColor: "#1a6b3c" }}
      />
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
        <span>١٬٠٠٠ ريال</span>
        <span>١٠٠٬٠٠٠ ريال</span>
      </div>
    </div>
  );
}
