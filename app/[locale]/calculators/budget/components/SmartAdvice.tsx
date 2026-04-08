"use client";

import { AlertTriangle, CheckCircle, Info, AlertOctagon } from "lucide-react";

interface Advice {
  type: "warning" | "success" | "info" | "danger";
  icon: string;
  title: string;
  description: string;
}

interface SmartAdviceProps {
  advices: Advice[];
}

const styles: Record<string, { bg: string; border: string; text: string; Icon: typeof Info }> = {
  danger: { bg: "bg-red-50 dark:bg-red-900/10", border: "border-red-200 dark:border-red-800", text: "text-red-700 dark:text-red-300", Icon: AlertOctagon },
  warning: { bg: "bg-amber-50 dark:bg-amber-900/10", border: "border-amber-200 dark:border-amber-800", text: "text-amber-700 dark:text-amber-300", Icon: AlertTriangle },
  success: { bg: "bg-green-50 dark:bg-green-900/10", border: "border-green-200 dark:border-green-800", text: "text-green-700 dark:text-green-300", Icon: CheckCircle },
  info: { bg: "bg-blue-50 dark:bg-blue-900/10", border: "border-blue-200 dark:border-blue-800", text: "text-blue-700 dark:text-blue-300", Icon: Info },
};

export default function SmartAdvice({ advices }: SmartAdviceProps) {
  if (advices.length === 0) return null;

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">💡 التوصيات الذكية</h3>
      <div className="space-y-3">
        {advices.map((advice, i) => {
          const style = styles[advice.type];
          const IconComponent = style.Icon;
          return (
            <div key={i} className={`rounded-xl border p-4 ${style.bg} ${style.border}`}>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{advice.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className={`h-4 w-4 ${style.text}`} />
                    <h4 className={`font-bold text-sm ${style.text}`}>{advice.title}</h4>
                  </div>
                  <p className={`text-sm ${style.text} opacity-80`}>{advice.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
