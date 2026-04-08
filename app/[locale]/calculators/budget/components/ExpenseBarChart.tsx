"use client";

interface BarChartItem {
  name: string;
  userPercent: number;
  recommendedMax: number;
  color: string;
}

interface ExpenseBarChartProps {
  data: BarChartItem[];
}

export default function ExpenseBarChart({ data }: ExpenseBarChartProps) {
  const filtered = data.filter((d) => d.userPercent > 0 || d.recommendedMax > 0);
  if (filtered.length === 0) return null;

  const maxVal = Math.max(...filtered.map((d) => Math.max(d.userPercent, d.recommendedMax))) + 5;

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">📊 ميزانيتك مقابل الموصى به</h3>
      <p className="text-xs text-gray-400 mb-5">مقارنة نسب إنفاقك مع النسب الموصى بها لكل فئة</p>

      <div className="space-y-4">
        {filtered.map((item) => {
          const isOver = item.userPercent > item.recommendedMax;
          return (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                <span className={`text-xs font-bold ${isOver ? "text-red-500" : "text-gray-500"}`}>
                  {item.userPercent.toFixed(0)}% / {item.recommendedMax}%
                </span>
              </div>
              {/* Two bars stacked */}
              <div className="space-y-1">
                {/* User bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(item.userPercent / maxVal) * 100}%`,
                        backgroundColor: isOver ? "#ef4444" : item.color,
                      }}
                    />
                  </div>
                </div>
                {/* Recommended bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full opacity-30"
                      style={{
                        width: `${(item.recommendedMax / maxVal) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <div className="w-3 h-3 rounded-full bg-primary-600" />
          ميزانيتك
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <div className="w-3 h-3 rounded-full bg-primary-600 opacity-30" />
          الموصى به
        </div>
      </div>
    </div>
  );
}
