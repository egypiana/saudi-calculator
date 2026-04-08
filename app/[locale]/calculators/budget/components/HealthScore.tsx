"use client";

interface HealthScoreProps {
  score: number;
}

export default function HealthScore({ score }: HealthScoreProps) {
  const label = score >= 81 ? "ممتاز" : score >= 61 ? "جيد" : score >= 41 ? "يحتاج تحسين" : "يحتاج مراجعة";
  const color = score >= 81 ? "#10b981" : score >= 61 ? "#3b82f6" : score >= 41 ? "#f59e0b" : "#ef4444";

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 text-center">مؤشر الصحة المالية</h2>
      <div className="flex items-center justify-center gap-6">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" className="dark:stroke-gray-700" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke={color} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold" style={{ color }}>{score}</span>
            <span className="text-xs text-gray-400">/100</span>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold" style={{ color }}>{label}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[160px]">
            {score >= 81 ? "أنت تدير ميزانيتك بشكل ممتاز!" :
             score >= 61 ? "وضعك جيد مع مساحة للتحسين" :
             score >= 41 ? "راجع مصروفاتك وزد الادخار" :
             "تحتاج مراجعة جذرية لميزانيتك"}
          </p>
        </div>
      </div>
    </div>
  );
}
