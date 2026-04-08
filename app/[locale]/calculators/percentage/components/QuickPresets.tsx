interface Props {
  values: number[];
  onSelect: (val: number) => void;
  suffix?: string;
  active?: number;
}

export default function QuickPresets({ values, onSelect, suffix = "%", active }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
      {values.map((v) => (
        <button
          key={v}
          onClick={() => onSelect(v)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors ${
            active === v
              ? "bg-green-600 text-white border-green-600"
              : "bg-white dark:bg-dark-surface border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          {v.toLocaleString("ar-SA")}{suffix}
        </button>
      ))}
    </div>
  );
}
