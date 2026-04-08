"use client";

import { HEIR_DEFINITIONS, HEIR_CATEGORIES, type DeceasedGender } from "@/lib/calculations/inheritance";

interface Props {
  deceasedGender: DeceasedGender;
  selectedHeirs: Record<string, number>;
  onToggle: (id: string) => void;
  onSetCount: (id: string, count: number) => void;
}

export default function HeirSelector({ deceasedGender, selectedHeirs, onToggle, onSetCount }: Props) {
  const has = (id: string) => id in selectedHeirs;

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
        اختر الورثة الموجودين
      </h3>

      <div className="space-y-4">
        {HEIR_CATEGORIES.map((cat) => {
          const categoryHeirs = HEIR_DEFINITIONS.filter((h) => {
            if (h.category !== cat.id) return false;
            if (h.showForDeceased && h.showForDeceased !== deceasedGender) return false;
            return true;
          });

          if (categoryHeirs.length === 0) return null;

          return (
            <div key={cat.id} className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                <span>{cat.icon}</span>
                {cat.labelAr}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {categoryHeirs.map((heir) => {
                  const selected = has(heir.id);
                  return (
                    <div key={heir.id} className="space-y-1.5">
                      <button
                        onClick={() => onToggle(heir.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          selected
                            ? "bg-green-600 text-white shadow-md shadow-green-600/20 scale-[1.02]"
                            : "bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-400 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/10"
                        }`}
                      >
                        <span className="text-base">{heir.icon}</span>
                        <span className="truncate">{heir.labelAr}</span>
                        {selected && <span className="mr-auto text-green-200">✓</span>}
                      </button>

                      {/* Count selector for countable heirs */}
                      {selected && heir.countable && (
                        <div className="flex items-center justify-center gap-2 bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-gray-700 px-2 py-1">
                          <button
                            onClick={() => onSetCount(heir.id, Math.max(1, (selectedHeirs[heir.id] || 1) - 1))}
                            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 transition-colors flex items-center justify-center font-bold text-lg"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold text-gray-800 dark:text-white tabular-nums text-lg">
                            {selectedHeirs[heir.id] || 1}
                          </span>
                          <button
                            onClick={() => {
                              const max = heir.maxCount || 20;
                              onSetCount(heir.id, Math.min(max, (selectedHeirs[heir.id] || 1) + 1));
                            }}
                            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-100 hover:text-green-600 transition-colors flex items-center justify-center font-bold text-lg"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
