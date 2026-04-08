import { fmt } from "./ResultCard";

interface Row {
  label: string;
  value: number;
  highlight?: boolean;
}

interface Props {
  rows: Row[];
  currency?: string;
}

export default function BreakdownTable({ rows, currency = "ريال" }: Props) {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={row.highlight
                ? "bg-green-50 dark:bg-green-900/10 font-bold"
                : i % 2 === 1
                  ? "bg-gray-50 dark:bg-white/[0.02]"
                  : ""
              }
            >
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{row.label}</td>
              <td className="px-4 py-3 text-left text-gray-800 dark:text-white tabular-nums">
                {fmt(row.value)} {currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
