"use client";

import { useState, useMemo, useCallback } from "react";
import { RotateCcw } from "lucide-react";
import { ZAKAT_CATEGORIES, calculateZakat, fmt, type ZakatResult } from "@/lib/calculations/zakat";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ZakatCategorySection from "./components/ZakatCategorySection";
import ZakatResults from "./components/ZakatResults";
import ZakatSidebar from "./components/ZakatSidebar";
import ZakatSEO from "./components/ZakatSEO";
import ZakatFAQ from "./components/ZakatFAQ";

interface Props {
  locale: string;
}

export default function ZakatCalculatorPage({ locale }: Props) {
  const [values, setValues] = useState<Record<string, number>>({});
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({ money: true });
  const [goldPrice, setGoldPrice] = useState(300);
  const [silverPrice, setSilverPrice] = useState(3.5);

  const handleChange = useCallback((fieldId: string, value: number) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const toggleCategory = useCallback((catId: string) => {
    setOpenCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  }, []);

  const reset = useCallback(() => {
    setValues({});
    setOpenCategories({ money: true });
    setGoldPrice(300);
    setSilverPrice(3.5);
  }, []);

  // Real-time calculation
  const result: ZakatResult = useMemo(() => {
    return calculateZakat(values, goldPrice, silverPrice);
  }, [values, goldPrice, silverPrice]);

  const hasAnyValue = Object.values(values).some((v) => v > 0);
  const activeCount = ZAKAT_CATEGORIES.filter((cat) =>
    cat.fields.some((f) => (values[f.id] || 0) > 0)
  ).length;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة الزكاة الشاملة",
    description: "حاسبة الزكاة الإلكترونية: 14 نوع زكاة — المال، الذهب، الفضة، الأسهم، العقارات، الزروع، الأنعام، والمزيد",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar", "en"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: ZAKAT_CATEGORIES.map((c) => c.labelAr),
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة الزكاة", labelEn: "Zakat Calculator" },
        ]} />

        {/* Header */}
        <div className="mt-5 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            🌙 حاسبة الزكاة الشاملة
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            احسب زكاة أموالك بدقة وفق أحكام الشريعة الإسلامية — 14 نوع زكاة، حساب فوري للنصاب، رسم بياني، وتقرير مفصّل.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["14 نوع زكاة", "حساب فوري", "رسم بياني", "النصاب التلقائي", "مجاني 100%"].map((badge) => (
              <span key={badge} className="text-xs px-2.5 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full font-medium">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-6">

            {/* Gold/Silver Prices + Summary Bar */}
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-800 dark:text-white text-sm">⚙️ إعدادات الأسعار</h2>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-dark-bg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 rounded-lg transition-colors text-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  إعادة ضبط الكل
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">سعر غرام الذهب (24)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={goldPrice || ""}
                      onChange={(e) => setGoldPrice(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-green-500 outline-none tabular-nums"
                    />
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">ريال</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">سعر غرام الفضة</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={silverPrice || ""}
                      onChange={(e) => setSilverPrice(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-green-500 outline-none tabular-nums"
                    />
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">ريال</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center bg-green-50 dark:bg-green-900/10 rounded-lg px-3 py-2">
                  <span className="text-[10px] text-green-600 dark:text-green-400">نصاب الذهب</span>
                  <span className="font-bold text-sm text-green-700 dark:text-green-300 tabular-nums">{fmt(goldPrice * 85)} ريال</span>
                </div>
                <div className="flex flex-col justify-center bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">نصاب الفضة</span>
                  <span className="font-bold text-sm text-gray-700 dark:text-gray-300 tabular-nums">{fmt(silverPrice * 595)} ريال</span>
                </div>
              </div>
            </div>

            {/* Live Summary Bar */}
            {hasAnyValue && (
              <div className="bg-gradient-to-l from-green-600 to-emerald-600 rounded-xl px-5 py-3 flex items-center justify-between text-white shadow-lg">
                <div className="flex items-center gap-4 text-sm">
                  <span>🌙 الزكاة المستحقة:</span>
                  <span className="text-2xl font-bold tabular-nums">{fmt(result.totalZakat)} ريال</span>
                </div>
                <span className="text-xs text-green-200">{activeCount} أقسام نشطة</span>
              </div>
            )}

            {/* Category Sections */}
            <div className="space-y-3">
              {ZAKAT_CATEGORIES.map((cat) => {
                const catResult = result.categories.find((c) => c.categoryId === cat.id);
                return (
                  <ZakatCategorySection
                    key={cat.id}
                    category={cat}
                    values={values}
                    onChange={handleChange}
                    isOpen={!!openCategories[cat.id]}
                    onToggle={() => toggleCategory(cat.id)}
                    categoryZakat={catResult?.zakatAmount || 0}
                  />
                );
              })}
            </div>

            {/* Results */}
            {hasAnyValue && result.totalZakat > 0 && (
              <ZakatResults result={result} />
            )}

            {/* No values message */}
            {!hasAnyValue && (
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/40 rounded-xl p-6 text-center">
                <p className="text-green-600 dark:text-green-400 text-lg mb-2">👆</p>
                <p className="text-green-700 dark:text-green-400 font-medium">افتح أي قسم وأدخل أموالك لحساب الزكاة فوراً</p>
                <p className="text-green-500 text-sm mt-1">ابدأ بقسم &quot;زكاة المال&quot; — الأكثر شيوعاً</p>
              </div>
            )}

            <AdSlot id="zakat-mid" size="leaderboard" />

            {/* SEO Content */}
            <ZakatSEO />

            <AdSlot id="zakat-btm" size="rectangle" />

            {/* FAQ */}
            <ZakatFAQ />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <ZakatSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
