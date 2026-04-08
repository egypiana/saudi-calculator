"use client";

import { type ZakatCategory, fmt } from "@/lib/calculations/zakat";

interface Props {
  category: ZakatCategory;
  values: Record<string, number>;
  onChange: (fieldId: string, value: number) => void;
  isOpen: boolean;
  onToggle: () => void;
  categoryZakat: number;
}

export default function ZakatCategorySection({ category, values, onChange, isOpen, onToggle, categoryZakat }: Props) {
  const hasValues = category.fields.some((f) => (values[f.id] || 0) > 0);

  return (
    <div className={`rounded-2xl border transition-all ${
      isOpen
        ? "border-green-300 dark:border-green-700 shadow-sm"
        : hasValues
        ? "border-green-200 dark:border-green-800/40 bg-green-50/50 dark:bg-green-900/5"
        : "border-gray-200 dark:border-gray-700"
    }`}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <div className="text-right">
            <h3 className="font-bold text-gray-800 dark:text-white text-sm">{category.labelAr}</h3>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {categoryZakat > 0 && (
            <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full tabular-nums">
              {fmt(categoryZakat)} ريال
            </span>
          )}
          {hasValues && !isOpen && (
            <span className="w-2 h-2 rounded-full bg-green-500" />
          )}
          <span className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▼</span>
        </div>
      </button>

      {/* Fields */}
      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {category.fields.map((field) => (
              <div key={field.id} className={field.type === "select" ? "sm:col-span-2" : ""}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {field.labelAr}
                  {field.isDeduction && <span className="text-red-500 text-xs mr-1">(خصم)</span>}
                </label>

                {field.type === "select" ? (
                  <div className="flex flex-wrap gap-2">
                    {field.options?.map((opt, i) => (
                      <button
                        key={opt.value}
                        onClick={() => onChange(field.id, i + 1)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          (values[field.id] || 1) === i + 1
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="number"
                      value={values[field.id] || ""}
                      onChange={(e) => onChange(field.id, Number(e.target.value))}
                      className={`w-full h-[48px] px-4 rounded-xl border text-gray-800 dark:text-white text-base focus:ring-2 outline-none tabular-nums ${
                        field.isDeduction
                          ? "border-red-200 dark:border-red-800/40 bg-red-50/50 dark:bg-red-900/5 focus:ring-red-500"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface focus:ring-green-500"
                      }`}
                      placeholder="0"
                    />
                    {field.unit && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {field.unit}
                      </span>
                    )}
                  </div>
                )}

                {field.helpText && (
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{field.helpText}</p>
                )}
              </div>
            ))}
          </div>

          {/* Category mini-result */}
          {categoryZakat > 0 && (
            <div className="mt-4 bg-green-50 dark:bg-green-900/10 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-green-700 dark:text-green-400">زكاة {category.labelAr}</span>
              <span className="font-bold text-green-700 dark:text-green-400 tabular-nums">{fmt(categoryZakat)} ريال</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
