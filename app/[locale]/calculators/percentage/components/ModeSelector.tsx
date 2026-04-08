"use client";

export type ModeId = "percent-of" | "add-subtract" | "what-percent" | "percent-change" | "vat" | "zakat" | "discount";

export const MODES: { id: ModeId; label: string; shortLabel: string; icon: string; color: string; example: string }[] = [
  { id: "percent-of", label: "نسبة من مبلغ", shortLabel: "نسبة", icon: "％", color: "#1a6b3c", example: "مثال: 15% من 1,000" },
  { id: "add-subtract", label: "إضافة / طرح نسبة", shortLabel: "إضافة / طرح", icon: "±", color: "#0d9488", example: "مثال: 1,000 + 15%" },
  { id: "what-percent", label: "ما النسبة؟", shortLabel: "ما النسبة؟", icon: "？", color: "#2563eb", example: "مثال: 150 من 1,000" },
  { id: "percent-change", label: "نسبة التغيير", shortLabel: "التغيير", icon: "↑↓", color: "#7c3aed", example: "مثال: من 800 إلى 1,000" },
  { id: "vat", label: "القيمة المضافة 15%", shortLabel: "VAT 15%", icon: "🧾", color: "#d97706", example: "إضافة أو استخراج 15%" },
  { id: "zakat", label: "الزكاة 2.5%", shortLabel: "زكاة", icon: "🌙", color: "#059669", example: "احسب زكاة مالك" },
  { id: "discount", label: "حاسبة الخصم", shortLabel: "خصم", icon: "🏷️", color: "#dc2626", example: "مثال: خصم 30% على 500" },
];

interface Props {
  active: ModeId;
  onChange: (mode: ModeId) => void;
}

export default function ModeSelector({ active, onChange }: Props) {
  const activeMode = MODES.find((m) => m.id === active);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-1 px-1">
        {MODES.map((mode) => {
          const isActive = mode.id === active;
          return (
            <button
              key={mode.id}
              onClick={() => onChange(mode.id)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0"
              style={isActive ? { background: mode.color, color: "#fff" } : {}}
            >
              {!isActive && (
                <span className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl px-3.5 py-2.5 -mx-3.5 -my-2.5 flex items-center gap-1.5">
                  <span>{mode.icon}</span>
                  <span className="hidden sm:inline">{mode.label}</span>
                  <span className="sm:hidden">{mode.shortLabel}</span>
                </span>
              )}
              {isActive && (
                <>
                  <span>{mode.icon}</span>
                  <span className="hidden sm:inline">{mode.label}</span>
                  <span className="sm:hidden">{mode.shortLabel}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
      {activeMode && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 mr-1">{activeMode.example}</p>
      )}
    </div>
  );
}
