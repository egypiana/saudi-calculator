"use client";

import { useMemo } from "react";
import type { InheritanceResult, HeirResult } from "@/lib/calculations/inheritance";

/* ───────────── Types ───────────── */

interface FamilyTreeVisualProps {
  deceasedGender: "male" | "female";
  result: InheritanceResult;
  selectedHeirs: Record<string, number>;
}

/* ───────────── Helpers ───────────── */

const fmt = (n: number) =>
  n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

const toArabicNum = (n: number): string =>
  n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

/** Map heir IDs to the tree level they belong on */
const LEVEL_MAP: Record<string, number> = {
  paternal_grandfather: 0,
  paternal_grandmother: 0,
  maternal_grandmother: 0,
  father: 1,
  mother: 1,
  husband: 1,
  wife: 1,
  // deceased is virtual level 2 (rendered separately)
  sons: 3,
  daughters: 3,
  full_brothers: 3,
  full_sisters: 3,
  paternal_brothers: 3,
  paternal_sisters: 3,
  maternal_brothers: 3,
  maternal_sisters: 3,
  sons_sons: 4,
  sons_daughters: 4,
};

const LEVEL_LABELS: Record<number, string> = {
  0: "الأجداد",
  1: "الوالدان والزوج",
  3: "الأبناء والإخوة",
  4: "أبناء الابن",
};

/* ───────────── Sub-components ───────────── */

function HeirNode({ heir }: { heir: HeirResult }) {
  const isBlocked = heir.isBlocked;
  const pct = heir.percentage;

  return (
    <div className="relative group">
      <div
        className={`
          relative flex flex-col items-center w-[120px] sm:w-[140px] rounded-xl border-2 overflow-hidden
          transition-all duration-200 hover:scale-105 hover:shadow-lg
          ${
            isBlocked
              ? "border-red-300 dark:border-red-800 bg-red-50/80 dark:bg-red-950/30 opacity-75"
              : "border-green-300 dark:border-green-800 bg-white dark:bg-gray-900 shadow-sm"
          }
        `}
      >
        {/* Header */}
        <div
          className={`
            w-full py-1.5 px-2 text-center text-xs font-bold
            ${
              isBlocked
                ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400"
                : "bg-gradient-to-l from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-800 dark:text-green-300"
            }
          `}
        >
          <span className="text-lg leading-none">{heir.icon}</span>
        </div>

        {/* Body */}
        <div className="py-2 px-2 text-center space-y-1 flex-1 flex flex-col items-center justify-center">
          <p
            className={`text-xs font-bold leading-tight ${
              isBlocked
                ? "text-red-600 dark:text-red-400 line-through"
                : "text-gray-800 dark:text-white"
            }`}
          >
            {heir.labelAr}
          </p>

          {heir.count > 1 && (
            <span
              className={`
                inline-block text-[10px] font-bold rounded-full px-1.5 py-0.5
                ${
                  isBlocked
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                }
              `}
            >
              &times;{toArabicNum(heir.count)}
            </span>
          )}

          {!isBlocked && (
            <>
              <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 font-mono" dir="ltr">
                {heir.shareFraction}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 tabular-nums">
                {fmt(heir.totalAmount)} ر.س
              </p>
            </>
          )}

          {isBlocked && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-full px-1.5 py-0.5">
              <span>🔴</span> محجوب
            </span>
          )}
        </div>

        {/* Percentage bar */}
        {!isBlocked && pct > 0 && (
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800">
            <div
              className="h-full bg-gradient-to-l from-green-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>
        )}
      </div>

      {/* Tooltip for blocked heirs */}
      {isBlocked && heir.blockReason && (
        <div className="absolute z-20 bottom-full right-1/2 translate-x-1/2 mb-2 w-48 bg-gray-900 dark:bg-gray-800 text-white text-[10px] rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          <p className="font-bold text-red-400 mb-0.5">سبب الحجب:</p>
          <p>{heir.blockReason}</p>
          <div className="absolute top-full right-1/2 translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
        </div>
      )}
    </div>
  );
}

function DeceasedNode({ gender }: { gender: "male" | "female" }) {
  const isMale = gender === "male";
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-4xl sm:text-5xl
          shadow-lg border-4
          ${
            isMale
              ? "bg-gradient-to-br from-green-400 to-emerald-600 border-green-300 dark:border-green-700"
              : "bg-gradient-to-br from-pink-400 to-rose-600 border-pink-300 dark:border-pink-700"
          }
        `}
      >
        {isMale ? "👤" : "👤"}
      </div>
      <div
        className={`
          mt-2 px-4 py-1 rounded-full text-sm font-bold text-white shadow-md
          ${isMale ? "bg-green-600 dark:bg-green-700" : "bg-pink-600 dark:bg-pink-700"}
        `}
      >
        {isMale ? "المتوفى" : "المتوفاة"}
      </div>
    </div>
  );
}

function ConnectorLine({ variant }: { variant: "down" | "up" }) {
  return (
    <div className="flex justify-center">
      <div
        className={`
          w-0.5 bg-gradient-to-b from-green-300 to-green-500 dark:from-green-700 dark:to-green-500
          ${variant === "down" ? "h-6 sm:h-8" : "h-6 sm:h-8"}
        `}
      />
    </div>
  );
}

function StatusBadges({ result }: { result: InheritanceResult }) {
  if (!result.hasAwl && !result.hasRadd) return null;
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      {result.hasAwl && (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full px-3 py-1.5 border border-red-200 dark:border-red-800">
          <span>⚠️</span> عول
          <span className="font-mono text-[10px] opacity-75">
            ({result.awlOriginalBase} &rarr; {result.awlNewBase})
          </span>
        </span>
      )}
      {result.hasRadd && (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full px-3 py-1.5 border border-blue-200 dark:border-blue-800">
          <span>↩️</span> رد
        </span>
      )}
    </div>
  );
}

/* ───────────── Level Row ───────────── */

function LevelRow({
  label,
  heirs,
  showConnectorAbove,
}: {
  label: string;
  heirs: HeirResult[];
  showConnectorAbove: boolean;
}) {
  if (heirs.length === 0) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Connector lines from parent level */}
      {showConnectorAbove && (
        <div className="relative flex justify-center w-full mb-1">
          {/* Vertical stem */}
          <div className="w-0.5 h-5 bg-green-400 dark:bg-green-600" />
          {/* Horizontal rail */}
          {heirs.length > 1 && (
            <div
              className="absolute bottom-0 h-0.5 bg-green-400 dark:bg-green-600"
              style={{
                width: `${Math.min(95, Math.max(30, heirs.length * 18))}%`,
                left: `${Math.max(2.5, 50 - heirs.length * 9)}%`,
              }}
            />
          )}
        </div>
      )}

      {/* Drop lines to each node */}
      {showConnectorAbove && heirs.length > 1 && (
        <div
          className="flex justify-center gap-2 sm:gap-3"
          style={{ width: `${Math.min(95, Math.max(30, heirs.length * 18))}%` }}
        >
          {heirs.map((h) => (
            <div key={h.heirId} className="flex-1 flex justify-center">
              <div className="w-0.5 h-3 bg-green-400 dark:bg-green-600" />
            </div>
          ))}
        </div>
      )}

      {/* Level label */}
      <div className="mb-2">
        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">
          {label}
        </span>
      </div>

      {/* Heir nodes */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {heirs.map((h) => (
          <HeirNode key={h.heirId} heir={h} />
        ))}
      </div>
    </div>
  );
}

/* ───────────── Main Component ───────────── */

export default function FamilyTreeVisual({
  deceasedGender,
  result,
}: FamilyTreeVisualProps) {
  const activeHeirs = result.heirs;

  // Organize heirs into levels
  const levels = useMemo(() => {
    const grandparents: HeirResult[] = [];
    const parentsAndSpouse: HeirResult[] = [];
    const childrenAndSiblings: HeirResult[] = [];
    const grandchildren: HeirResult[] = [];

    for (const heir of activeHeirs) {
      const level = LEVEL_MAP[heir.heirId];
      if (level === 0) grandparents.push(heir);
      else if (level === 1) parentsAndSpouse.push(heir);
      else if (level === 3) childrenAndSiblings.push(heir);
      else if (level === 4) grandchildren.push(heir);
    }

    // Sort parents: parents first, then spouse
    const parentIds = ["father", "mother"];
    parentsAndSpouse.sort((a, b) => {
      const aIsParent = parentIds.includes(a.heirId) ? 0 : 1;
      const bIsParent = parentIds.includes(b.heirId) ? 0 : 1;
      return aIsParent - bIsParent;
    });

    // Sort children: sons/daughters first, then siblings
    const childIds = ["sons", "daughters"];
    childrenAndSiblings.sort((a, b) => {
      const aIsChild = childIds.includes(a.heirId) ? 0 : 1;
      const bIsChild = childIds.includes(b.heirId) ? 0 : 1;
      return aIsChild - bIsChild;
    });

    return { grandparents, parentsAndSpouse, childrenAndSiblings, grandchildren };
  }, [activeHeirs]);

  if (activeHeirs.length === 0) return null;

  const hasGrandparents = levels.grandparents.length > 0;
  const hasParents = levels.parentsAndSpouse.length > 0;
  const hasChildren = levels.childrenAndSiblings.length > 0;
  const hasGrandchildren = levels.grandchildren.length > 0;

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 w-7 h-7 rounded-full flex items-center justify-center text-sm">
            🌳
          </span>
          شجرة الورثة
        </h3>
        <StatusBadges result={result} />
      </div>

      {/* Tree Container */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-950 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[400px] flex flex-col items-center gap-1" dir="rtl">

          {/* Level 0: Grandparents */}
          {hasGrandparents && (
            <>
              <LevelRow
                label={LEVEL_LABELS[0]}
                heirs={levels.grandparents}
                showConnectorAbove={false}
              />
              <ConnectorLine variant="down" />
            </>
          )}

          {/* Level 1: Parents & Spouse */}
          {hasParents && (
            <>
              <LevelRow
                label={LEVEL_LABELS[1]}
                heirs={levels.parentsAndSpouse}
                showConnectorAbove={hasGrandparents}
              />
              <ConnectorLine variant="down" />
            </>
          )}

          {/* Central Deceased Node */}
          <DeceasedNode gender={deceasedGender} />

          {/* Connector down to children */}
          {hasChildren && <ConnectorLine variant="down" />}

          {/* Level 3: Children & Siblings */}
          {hasChildren && (
            <LevelRow
              label={LEVEL_LABELS[3]}
              heirs={levels.childrenAndSiblings}
              showConnectorAbove={true}
            />
          )}

          {/* Connector to grandchildren */}
          {hasGrandchildren && <ConnectorLine variant="down" />}

          {/* Level 4: Grandchildren */}
          {hasGrandchildren && (
            <LevelRow
              label={LEVEL_LABELS[4]}
              heirs={levels.grandchildren}
              showConnectorAbove={true}
            />
          )}

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
            <div className="flex flex-wrap justify-center gap-4 text-[10px] text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-l from-green-400 to-emerald-500 inline-block" />
                وارث مستحق
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-red-400 inline-block" />
                محجوب
              </span>
              {result.hasAwl && (
                <span className="flex items-center gap-1">
                  <span>⚠️</span> عول (تخفيض نسبي)
                </span>
              )}
              {result.hasRadd && (
                <span className="flex items-center gap-1">
                  <span>↩️</span> رد (إعادة الفائض)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
