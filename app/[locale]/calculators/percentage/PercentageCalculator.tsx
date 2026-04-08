"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import ModeSelector, { type ModeId } from "./components/ModeSelector";
import FAQSection from "./components/FAQSection";
import PercentOfAmount from "./modes/PercentOfAmount";
import AmountAfterPercent from "./modes/AmountAfterPercent";
import WhatPercent from "./modes/WhatPercent";
import PercentChange from "./modes/PercentChange";
import VATMode from "./modes/VATMode";
import ZakatMode from "./modes/ZakatMode";
import DiscountMode from "./modes/DiscountMode";

const MODE_COMPONENTS: Record<ModeId, React.FC> = {
  "percent-of": PercentOfAmount,
  "add-subtract": AmountAfterPercent,
  "what-percent": WhatPercent,
  "percent-change": PercentChange,
  "vat": VATMode,
  "zakat": ZakatMode,
  "discount": DiscountMode,
};

const SCENARIOS = [
  { title: "إكرامية المطعم", desc: "فاتورة 300 ريال، إكرامية 10%", mode: "percent-of" as ModeId, icon: "🍽️", result: "تدفع 30 ريال إكرامية" },
  { title: "خصم الجمعة السوداء", desc: "منتج 1,500 ريال، خصم 30%", mode: "discount" as ModeId, icon: "🛍️", result: "توفّر 450 ريال" },
  { title: "ضريبة القيمة المضافة", desc: "سعر المنتج 2,000 ريال + VAT", mode: "vat" as ModeId, icon: "🧾", result: "تدفع 2,300 ريال" },
  { title: "عمولة الوسيط العقاري", desc: "عقار 500,000 ريال، عمولة 2%", mode: "percent-of" as ModeId, icon: "🏠", result: "العمولة 10,000 ريال" },
  { title: "زيادة الراتب", desc: "راتب 8,000، زيادة 15%", mode: "add-subtract" as ModeId, icon: "💼", result: "الراتب الجديد 9,200 ريال" },
  { title: "نسبة ادخارك", desc: "دخل 12,000، ادخار 1,500", mode: "what-percent" as ModeId, icon: "💰", result: "تدّخر 12.5% من دخلك" },
];

const RELATED = [
  { title: "حاسبة القيمة المضافة (VAT)", href: "/calculators/vat", icon: "🧾" },
  { title: "حاسبة الزكاة الشاملة", href: "/calculators/zakat", icon: "🌙" },
  { title: "حاسبة الميزانية", href: "/calculators/budget", icon: "📊" },
  { title: "حاسبة الراتب", href: "/calculators/salary", icon: "💵" },
];

interface Props {
  locale: string;
}

export default function PercentageCalculator({ locale }: Props) {
  const [mode, setMode] = useState<ModeId>("percent-of");
  const ActiveMode = MODE_COMPONENTS[mode];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "حاسبة النسبة المئوية الشاملة",
    description: "احسب أي نسبة مئوية — خصم، VAT، زكاة، إكرامية، تغيير السعر",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["ar", "en"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    featureList: ["نسبة من مبلغ", "إضافة وطرح النسبة", "حساب نسبة مجهولة", "نسبة التغيير", "القيمة المضافة 15%", "الزكاة 2.5%", "حاسبة الخصم"],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة النسبة المئوية", labelEn: "Percentage Calculator" },
        ]} />

        <div className="mt-5 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            حاسبة النسبة المئوية الشاملة
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            احسب أي نسبة مئوية فورياً — خصم، ضريبة، زكاة، إكرامية، تغيير الأسعار، والمزيد.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["7 أوضاع حساب", "فوري بدون زر", "مجاني 100%"].map((badge) => (
              <span key={badge} className="text-xs px-2.5 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full font-medium">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Mode Selector */}
        <ModeSelector active={mode} onChange={setMode} />

        {/* Calculator */}
        <div className="mt-6 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-sm">
          <ActiveMode />
        </div>

        <AdSlot id="percentage-mid" size="leaderboard" />

        {/* Scenarios */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">💡 استخدامات شائعة</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SCENARIOS.map((s) => (
              <button
                key={s.title}
                onClick={() => setMode(s.mode)}
                className="text-right bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-bold text-gray-800 dark:text-white text-sm">{s.title}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{s.desc}</p>
                <p className="text-xs font-medium text-green-600 dark:text-green-400">{s.result}</p>
              </button>
            ))}
          </div>
        </section>

        <AdSlot id="percentage-btm" size="rectangle" />

        {/* Educational Content */}
        <section className="mt-8 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.9] space-y-4">
            <h2 className="text-lg font-bold text-green-800 dark:text-green-400 mt-0">كيف تحسب النسبة المئوية من مبلغ؟</h2>
            <p>المعادلة: <strong>القيمة = المبلغ × النسبة ÷ 100</strong>. مثال: 15% من 1,000 = 1,000 × 15 ÷ 100 = 150 ريال.</p>

            <h2 className="text-lg font-bold text-green-800 dark:text-green-400">متى تحتاج حاسبة النسبة المئوية؟</h2>
            <ul>
              <li>الخصومات والتخفيضات في المتاجر</li>
              <li>ضريبة القيمة المضافة 15%</li>
              <li>العمولات والإكراميات</li>
              <li>الزكاة والصدقات</li>
              <li>نسبة الادخار من الدخل</li>
              <li>التغير في الأسعار والرواتب</li>
            </ul>

            <h2 className="text-lg font-bold text-green-800 dark:text-green-400">كيف تحسب خصم 15% من مبلغ في السعودية؟</h2>
            <p>اضرب المبلغ في 0.15 لتحصل على قيمة الخصم، ثم اطرحها من المبلغ الأصلي. مثال: خصم 15% على 1,000 ريال = 1,000 × 0.15 = 150 ريال خصم، فيصبح السعر 850 ريال.</p>

            <h2 className="text-lg font-bold text-green-800 dark:text-green-400">الفرق بين إضافة واستخراج الضريبة</h2>
            <p><strong>إضافة:</strong> المبلغ × 1.15 = الإجمالي. <strong>استخراج:</strong> الإجمالي ÷ 1.15 = المبلغ الأصلي. مثال: 1,000 + VAT = 1,150 ريال | 1,150 بدون VAT = 1,000 ريال.</p>
          </div>
        </section>

        {/* FAQ */}
        <div className="mt-8">
          <FAQSection />
        </div>

        {/* Related Tools */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">🔗 أدوات ذات صلة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {RELATED.map((tool) => (
              <Link
                key={tool.href}
                href={`/${locale}${tool.href}`}
                className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span className="text-2xl block mb-2">{tool.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tool.title}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
