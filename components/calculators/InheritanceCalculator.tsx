"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Calculator, RotateCcw } from "lucide-react";
import { formatNumber } from "@/lib/utils";

type Gender = "male" | "female";

interface Heir {
  id: string;
  labelAr: string;
  labelEn: string;
  type: "fixed" | "residual";
}

const heirs: Heir[] = [
  { id: "husband", labelAr: "زوج", labelEn: "Husband", type: "fixed" },
  { id: "wife", labelAr: "زوجة", labelEn: "Wife", type: "fixed" },
  { id: "sons", labelAr: "أبناء ذكور", labelEn: "Sons", type: "residual" },
  { id: "daughters", labelAr: "بنات", labelEn: "Daughters", type: "residual" },
  { id: "father", labelAr: "أب", labelEn: "Father", type: "fixed" },
  { id: "mother", labelAr: "أم", labelEn: "Mother", type: "fixed" },
  { id: "brothers", labelAr: "إخوة أشقاء", labelEn: "Full Brothers", type: "residual" },
  { id: "sisters", labelAr: "أخوات شقيقات", labelEn: "Full Sisters", type: "residual" },
];

export default function InheritanceCalculator() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [estate, setEstate] = useState("");
  const [debts, setDebts] = useState("");
  const [wasiyyah, setWasiyyah] = useState("");
  const [deceasedGender, setDeceasedGender] = useState<Gender>("male");
  const [selectedHeirs, setSelectedHeirs] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ netEstate: number; shares: { heir: string; share: string; amount: number }[] } | null>(null);

  const toggleHeir = (id: string) => {
    setSelectedHeirs((prev) => {
      const updated = { ...prev };
      if (id in updated) { delete updated[id]; } else { updated[id] = 1; }
      return updated;
    });
  };

  const setHeirCount = (id: string, count: number) => {
    setSelectedHeirs((prev) => ({ ...prev, [id]: Math.max(1, count) }));
  };

  const calculate = () => {
    const totalEstate = parseFloat(estate) || 0;
    const totalDebts = parseFloat(debts) || 0;
    const totalWasiyyah = Math.min(parseFloat(wasiyyah) || 0, (totalEstate - totalDebts) / 3);
    const netEstate = totalEstate - totalDebts - totalWasiyyah;

    if (netEstate <= 0) return;

    const shares: { heir: string; share: string; amount: number }[] = [];
    let remaining = netEstate;

    // Simplified Islamic inheritance — fixed shares first
    const hasChildren = (selectedHeirs["sons"] || 0) > 0 || (selectedHeirs["daughters"] || 0) > 0;

    // Spouse share
    if ("husband" in selectedHeirs) {
      const fraction = hasChildren ? 1 / 4 : 1 / 2;
      const amount = netEstate * fraction;
      shares.push({ heir: isAr ? "الزوج" : "Husband", share: hasChildren ? "1/4" : "1/2", amount });
      remaining -= amount;
    }
    if ("wife" in selectedHeirs) {
      const fraction = hasChildren ? 1 / 8 : 1 / 4;
      const amount = netEstate * fraction;
      shares.push({ heir: isAr ? "الزوجة" : "Wife", share: hasChildren ? "1/8" : "1/4", amount });
      remaining -= amount;
    }

    // Father
    if ("father" in selectedHeirs) {
      if (hasChildren) {
        const amount = netEstate * (1 / 6);
        shares.push({ heir: isAr ? "الأب" : "Father", share: "1/6", amount });
        remaining -= amount;
      } else {
        // Father gets residual if no children
        // Will be handled with residual heirs
      }
    }

    // Mother
    if ("mother" in selectedHeirs) {
      const hasSiblings = (selectedHeirs["brothers"] || 0) + (selectedHeirs["sisters"] || 0) >= 2;
      const fraction = (hasChildren || hasSiblings) ? 1 / 6 : 1 / 3;
      const amount = netEstate * fraction;
      shares.push({ heir: isAr ? "الأم" : "Mother", share: (hasChildren || hasSiblings) ? "1/6" : "1/3", amount });
      remaining -= amount;
    }

    // Children (residual)
    const sonsCount = selectedHeirs["sons"] || 0;
    const daughtersCount = selectedHeirs["daughters"] || 0;

    if (sonsCount > 0 || daughtersCount > 0) {
      // Sons get double daughters' share
      const totalShares = sonsCount * 2 + daughtersCount;
      if (totalShares > 0) {
        const perShare = remaining / totalShares;
        if (sonsCount > 0) {
          shares.push({
            heir: isAr ? `الأبناء (${sonsCount})` : `Sons (${sonsCount})`,
            share: isAr ? "تعصيب" : "Residual",
            amount: perShare * 2 * sonsCount,
          });
        }
        if (daughtersCount > 0) {
          shares.push({
            heir: isAr ? `البنات (${daughtersCount})` : `Daughters (${daughtersCount})`,
            share: isAr ? "تعصيب" : "Residual",
            amount: perShare * daughtersCount,
          });
        }
        remaining = 0;
      }
    }

    // Father residual (no children)
    if ("father" in selectedHeirs && !hasChildren) {
      shares.push({ heir: isAr ? "الأب" : "Father", share: isAr ? "تعصيب" : "Residual", amount: remaining });
      remaining = 0;
    }

    // Siblings (only if no children and no father)
    if (!hasChildren && !("father" in selectedHeirs)) {
      const brothersCount = selectedHeirs["brothers"] || 0;
      const sistersCount = selectedHeirs["sisters"] || 0;
      const totalSibShares = brothersCount * 2 + sistersCount;
      if (totalSibShares > 0) {
        const perShare = remaining / totalSibShares;
        if (brothersCount > 0) {
          shares.push({
            heir: isAr ? `الإخوة (${brothersCount})` : `Brothers (${brothersCount})`,
            share: isAr ? "تعصيب" : "Residual",
            amount: perShare * 2 * brothersCount,
          });
        }
        if (sistersCount > 0) {
          shares.push({
            heir: isAr ? `الأخوات (${sistersCount})` : `Sisters (${sistersCount})`,
            share: isAr ? "تعصيب" : "Residual",
            amount: perShare * sistersCount,
          });
        }
      }
    }

    setResult({ netEstate, shares });
  };

  const reset = () => {
    setEstate(""); setDebts(""); setWasiyyah(""); setDeceasedGender("male");
    setSelectedHeirs({}); setResult(null);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500";
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-2.5">
          <Calculator className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isAr ? "حاسبة المواريث الشرعية" : "Islamic Inheritance Calculator"}
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>{isAr ? "إجمالي التركة (ريال)" : "Total Estate (SAR)"}</label>
            <input type="number" value={estate} onChange={(e) => setEstate(e.target.value)} className={inputClass} placeholder="0" />
          </div>
          <div>
            <label className={labelClass}>{isAr ? "الديون (ريال)" : "Debts (SAR)"}</label>
            <input type="number" value={debts} onChange={(e) => setDebts(e.target.value)} className={inputClass} placeholder="0" />
          </div>
          <div>
            <label className={labelClass}>{isAr ? "الوصية (ريال)" : "Will/Bequest (SAR)"}</label>
            <input type="number" value={wasiyyah} onChange={(e) => setWasiyyah(e.target.value)} className={inputClass} placeholder="0" />
          </div>
        </div>

        <div>
          <label className={labelClass}>{isAr ? "جنس المتوفى" : "Deceased Gender"}</label>
          <div className="flex gap-2">
            <button onClick={() => setDeceasedGender("male")}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${deceasedGender === "male" ? "bg-primary-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400"}`}>
              {isAr ? "ذكر" : "Male"}
            </button>
            <button onClick={() => setDeceasedGender("female")}
              className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${deceasedGender === "female" ? "bg-primary-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400"}`}>
              {isAr ? "أنثى" : "Female"}
            </button>
          </div>
        </div>

        <div>
          <label className={labelClass}>{isAr ? "الورثة" : "Heirs"}</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {heirs
              .filter((h) => {
                if (deceasedGender === "male" && h.id === "husband") return false;
                if (deceasedGender === "female" && h.id === "wife") return false;
                return true;
              })
              .map((heir) => (
              <button key={heir.id} onClick={() => toggleHeir(heir.id)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${heir.id in selectedHeirs ? "bg-primary-600 text-white" : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                {isAr ? heir.labelAr : heir.labelEn}
              </button>
            ))}
          </div>
        </div>

        {Object.entries(selectedHeirs).filter(([id]) => ["sons", "daughters", "brothers", "sisters"].includes(id)).map(([id, count]) => {
          const heir = heirs.find((h) => h.id === id)!;
          return (
            <div key={id} className="flex items-center gap-3">
              <span className="text-sm text-gray-700 dark:text-gray-300 w-32">{isAr ? heir.labelAr : heir.labelEn}:</span>
              <input type="number" value={count} onChange={(e) => setHeirCount(id, parseInt(e.target.value) || 1)}
                className="w-20 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface text-center text-gray-800 dark:text-white text-sm" min="1" />
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
          {isAr ? "احسب المواريث" : "Calculate Shares"}
        </button>
        <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {result && (
        <div className="mt-6 p-6 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 space-y-3">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">{isAr ? "صافي التركة:" : "Net Estate:"}</span>
            <span className="font-bold text-gray-800 dark:text-white">{formatNumber(result.netEstate)} {isAr ? "ريال" : "SAR"}</span>
          </div>
          <hr className="border-gray-200 dark:border-gray-700" />
          {result.shares.map((share, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                {share.heir} <span className="text-gray-400">({share.share})</span>
              </span>
              <span className="font-bold text-primary-600 dark:text-primary-400">{formatNumber(share.amount)} {isAr ? "ريال" : "SAR"}</span>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 text-center">
        {isAr ? "⚠️ هذه الحاسبة للاسترشاد فقط. يُرجى مراجعة عالم شرعي للتأكد من صحة التوزيع." : "⚠️ This calculator is for guidance only. Please consult a qualified scholar for verification."}
      </p>
    </div>
  );
}
