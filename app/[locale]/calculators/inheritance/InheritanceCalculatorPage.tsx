"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw } from "lucide-react";
import { calculateInheritance, type DeceasedGender, type InheritanceInput, type InheritanceResult } from "@/lib/calculations/inheritance";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import HeirSelector from "./components/HeirSelector";
import ResultsDisplay from "./components/ResultsDisplay";
import InheritanceSidebar from "./components/InheritanceSidebar";
import InheritanceSEO from "./components/InheritanceSEO";
import InheritanceFAQ from "./components/InheritanceFAQ";
import ExampleScenarios from "./components/ExampleScenarios";
import FamilyTreeVisual from "./components/FamilyTreeVisual";
import PDFExport from "./components/PDFExport";

const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 0 });

interface Props {
  locale: string;
}

export default function InheritanceCalculatorPage({ locale }: Props) {
  const [estate, setEstate] = useState(1000000);
  const [debts, setDebts] = useState(0);
  const [wasiyyah, setWasiyyah] = useState(0);
  const [deceasedGender, setDeceasedGender] = useState<DeceasedGender>("male");
  const [selectedHeirs, setSelectedHeirs] = useState<Record<string, number>>({ wife: 1, sons: 2, daughters: 1 });

  const toggleHeir = useCallback((id: string) => {
    setSelectedHeirs((prev) => {
      const updated = { ...prev };
      if (id in updated) {
        delete updated[id];
      } else {
        updated[id] = 1;
      }
      // Auto-remove invalid spouse
      if (id === "husband" && deceasedGender === "male") return prev;
      if (id === "wife" && deceasedGender === "female") return prev;
      return updated;
    });
  }, [deceasedGender]);

  const setHeirCount = useCallback((id: string, count: number) => {
    setSelectedHeirs((prev) => ({ ...prev, [id]: Math.max(1, count) }));
  }, []);

  // Real-time calculation
  const result: InheritanceResult | null = useMemo(() => {
    const activeHeirs = Object.keys(selectedHeirs);
    if (activeHeirs.length === 0 || estate <= 0) return null;

    return calculateInheritance({
      estate,
      debts,
      wasiyyah,
      deceasedGender,
      heirs: selectedHeirs,
    });
  }, [estate, debts, wasiyyah, deceasedGender, selectedHeirs]);

  const loadScenario = useCallback((input: InheritanceInput) => {
    setEstate(input.estate);
    setDebts(input.debts);
    setWasiyyah(input.wasiyyah);
    setDeceasedGender(input.deceasedGender);
    setSelectedHeirs(input.heirs);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const reset = useCallback(() => {
    setEstate(1000000);
    setDebts(0);
    setWasiyyah(0);
    setDeceasedGender("male");
    setSelectedHeirs({});
  }, []);

  const maxWasiyyah = Math.max(0, (estate - debts) / 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة المواريث الشرعية",
    description: "حاسبة تقسيم التركة والميراث وفق أحكام الشريعة الإسلامية — 17 نوع وارث، العول والرد، المذهب الحنبلي",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: [
      "17 نوع وارث",
      "شجرة عائلة بصرية",
      "قواعد الحجب",
      "العول والرد",
      "المذهب الحنبلي",
      "تصدير PDF",
      "أمثلة جاهزة",
      "رسم بياني",
      "خطوات الحساب التفصيلية",
    ],
  };

  const inputClass = "w-full h-[52px] px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface text-gray-800 dark:text-white text-lg focus:ring-2 focus:ring-green-500 outline-none tabular-nums";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة المواريث", labelEn: "Inheritance Calculator" },
        ]} />

        {/* Header */}
        <div className="mt-5 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            حاسبة المواريث الشرعية — تقسيم التركة
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            احسب أنصبة الورثة الشرعيين فورياً وفق أحكام الشريعة الإسلامية والمذهب الحنبلي — 17 نوع وارث، شجرة عائلة بصرية، العول والرد والحجب، تصدير PDF.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["17 نوع وارث", "شجرة عائلة بصرية", "العول والرد والحجب", "تصدير PDF", "أمثلة جاهزة", "مجاني 100%"].map((badge) => (
              <span key={badge} className="text-xs px-2.5 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full font-medium">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Main Layout: Calculator + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Calculator Card */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm space-y-6">

              {/* Step 1: Estate Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  بيانات التركة
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      إجمالي التركة (ريال)
                    </label>
                    <input
                      type="number"
                      value={estate || ""}
                      onChange={(e) => setEstate(Number(e.target.value))}
                      className={inputClass}
                      placeholder="0"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {[100000, 500000, 1000000, 5000000].map((v) => (
                        <button
                          key={v}
                          onClick={() => setEstate(v)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                            estate === v
                              ? "bg-green-600 text-white border-green-600"
                              : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-green-500"
                          }`}
                        >
                          {fmt(v)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      الديون المستحقة (ريال)
                    </label>
                    <input
                      type="number"
                      value={debts || ""}
                      onChange={(e) => setDebts(Number(e.target.value))}
                      className={inputClass}
                      placeholder="0"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">تُخصم من التركة أولاً</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      الوصية (ريال)
                    </label>
                    <input
                      type="number"
                      value={wasiyyah || ""}
                      onChange={(e) => setWasiyyah(Math.min(Number(e.target.value), maxWasiyyah))}
                      className={inputClass}
                      placeholder="0"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">الحد الأقصى: ⅓ التركة = {fmt(maxWasiyyah)} ريال</p>
                  </div>
                </div>
              </div>

              {/* Step 2: Deceased Gender */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  جنس المتوفى
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setDeceasedGender("male");
                      // Remove husband if was selected
                      setSelectedHeirs((prev) => {
                        const updated = { ...prev };
                        delete updated["husband"];
                        return updated;
                      });
                    }}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                      deceasedGender === "male"
                        ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                        : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    👨 ذكر (متوفى)
                  </button>
                  <button
                    onClick={() => {
                      setDeceasedGender("female");
                      // Remove wife if was selected
                      setSelectedHeirs((prev) => {
                        const updated = { ...prev };
                        delete updated["wife"];
                        return updated;
                      });
                    }}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                      deceasedGender === "female"
                        ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                        : "bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    👩 أنثى (متوفاة)
                  </button>
                </div>
              </div>

              {/* Step 3: Heir Selection */}
              <HeirSelector
                deceasedGender={deceasedGender}
                selectedHeirs={selectedHeirs}
                onToggle={toggleHeir}
                onSetCount={setHeirCount}
              />

              {/* Reset Button */}
              <div className="flex justify-end">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl transition-colors text-sm font-medium"
                >
                  <RotateCcw className="h-4 w-4" />
                  إعادة ضبط
                </button>
              </div>
            </div>

            {/* Family Tree Visual */}
            {result && result.heirs.length > 0 && (
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
                <FamilyTreeVisual
                  deceasedGender={deceasedGender}
                  result={result}
                  selectedHeirs={selectedHeirs}
                />
                {/* PDF Export Button */}
                {result.heirs.filter(h => !h.isBlocked).length > 0 && (
                  <div className="mt-6 flex justify-center">
                    <PDFExport
                      result={result}
                      deceasedGender={deceasedGender}
                      selectedHeirs={selectedHeirs}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Results */}
            {result && result.heirs.filter(h => !h.isBlocked).length > 0 && (
              <ResultsDisplay result={result} />
            )}

            {/* No heirs selected message */}
            {Object.keys(selectedHeirs).length === 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 rounded-xl p-6 text-center">
                <p className="text-blue-600 dark:text-blue-400 text-lg mb-2">👆</p>
                <p className="text-blue-700 dark:text-blue-400 font-medium">اختر الورثة الموجودين للحصول على نتائج التوزيع</p>
                <p className="text-blue-500 dark:text-blue-500 text-sm mt-1">أو جرّب أحد الأمثلة الجاهزة أدناه</p>
              </div>
            )}

            <AdSlot id="inheritance-mid" size="leaderboard" />

            {/* Example Scenarios */}
            <ExampleScenarios onLoadScenario={loadScenario} />

            {/* SEO Content */}
            <InheritanceSEO />

            <AdSlot id="inheritance-btm" size="rectangle" />

            {/* FAQ */}
            <InheritanceFAQ />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <InheritanceSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
