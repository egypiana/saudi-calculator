"use client";

interface Props {
  formula: string;
}

export default function FormulaDisplay({ formula }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(formula);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
      <code className="text-sm text-gray-700 dark:text-gray-300 font-mono" dir="ltr">
        {formula}
      </code>
      <button
        onClick={handleCopy}
        className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
        title="نسخ المعادلة"
      >
        📋
      </button>
    </div>
  );
}
