"use client";

import { EXAMPLE_SCENARIOS, type InheritanceInput } from "@/lib/calculations/inheritance";

interface Props {
  onLoadScenario: (input: InheritanceInput) => void;
}

export default function ExampleScenarios({ onLoadScenario }: Props) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">💡 أمثلة جاهزة — جرّب الآن</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {EXAMPLE_SCENARIOS.map((scenario) => (
          <button
            key={scenario.titleAr}
            onClick={() => onLoadScenario(scenario.input)}
            className="text-right bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all hover:border-green-400 dark:hover:border-green-600 group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{scenario.icon}</span>
              <span className="font-bold text-gray-800 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{scenario.titleAr}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{scenario.desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
