interface Props {
  label: string;
  value: number;
  currency?: string;
  isPositive?: boolean;
  isNegative?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
}

function fmt(n: number): string {
  return n.toLocaleString("ar-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ResultCard({ label, value, currency = "ريال", isPositive, isNegative, size = "lg", color }: Props) {
  const textSize = size === "lg" ? "text-3xl sm:text-4xl" : size === "md" ? "text-2xl" : "text-xl";
  const textColor = color
    ? ""
    : isPositive
      ? "text-green-600 dark:text-green-400"
      : isNegative
        ? "text-red-600 dark:text-red-400"
        : "text-gray-800 dark:text-white";

  return (
    <div className="bg-green-50 dark:bg-green-900/10 border-2 border-green-200 dark:border-green-800/40 rounded-2xl p-5 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{label}</p>
      <p className={`${textSize} font-bold ${textColor} tabular-nums`} style={color ? { color } : {}}>
        {isPositive && value > 0 ? "+" : ""}{isNegative && value > 0 ? "-" : ""}{fmt(Math.abs(value))} <span className="text-lg font-normal opacity-60">{currency}</span>
      </p>
    </div>
  );
}

export { fmt };
