import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import BudgetCalculator from "./BudgetCalculator";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "حاسبة الميزانية والنفقات السعودية 2026 | خطط لمالك بذكاء"
      : "Saudi Budget Calculator 2026 | Plan Your Finances Smartly",
    description: isAr
      ? "حاسبة الميزانية الشهرية للأسرة السعودية — أدخل دخلك ووزّع مصروفاتك على السكن والطعام والنقل والادخار. احصل على توصيات ذكية لتحسين ميزانيتك."
      : "Monthly budget calculator for Saudi families — enter your income and distribute expenses across housing, food, transport, and savings. Get smart recommendations.",
    keywords: isAr
      ? ["حاسبة الميزانية", "ميزانية الأسرة السعودية", "توزيع الراتب", "تخطيط مالي", "مصروفات شهرية", "حاسبة النفقات", "ادخار الراتب"]
      : ["budget calculator", "Saudi family budget", "salary distribution", "financial planning", "monthly expenses"],
    openGraph: {
      title: isAr ? "حاسبة الميزانية والنفقات السعودية" : "Saudi Budget Calculator",
      description: isAr ? "وزّع راتبك بذكاء وابدأ الادخار اليوم" : "Distribute your salary smartly and start saving today",
    },
    alternates: { canonical: `/${locale}/calculators/budget` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "ما هي نسبة الادخار المثالية في السعودية؟", answer: "الموصى به هو ادخار 10-20% من دخلك الشهري. البداية بـ 10% كافية، ثم زيادتها تدريجياً. إذا كان لديك ديون، اسعَ لـ 20% على الأقل." },
        { question: "كيف يمكنني تقليل مصاريفي في السعودية؟", answer: "ابدأ بمصروفات الطعام: الطهي المنزلي يوفر 40%. ثم النقل: استخدام وسائل النقل العام أو مشاركة التنقل. وأخيراً الاشتراكات: راجع جميع اشتراكاتك الشهرية." },
        { question: "ما هو متوسط مصاريف الأسرة السعودية شهرياً؟", answer: "وفق إحصاءات هيئة الإحصاء (GASTAT)، يبلغ متوسط الإنفاق الشهري للأسرة السعودية 7,000-12,000 ريال، يأخذ السكن والغذاء النسبة الأكبر." },
        { question: "هل الحاسبة تحفظ بياناتي؟", answer: "لا، الحاسبة تعمل بالكامل في متصفحك ولا تُرسل أي بيانات لخوادمنا. يمكنك استخدام زر 'مشاركة' للحفاظ على بياناتك عبر رابط مشفّر." },
        { question: "كيف أحسب الميزانية إذا كان دخلي متغيراً؟", answer: "استخدم متوسط دخلك خلال آخر 3 أشهر، أو استخدم أقل دخل تتوقعه للتخطيط بشكل محافظ. احتفظ بصندوق طوارئ أكبر لتغطية الأشهر المنخفضة." },
        { question: "ما هي قاعدة 50-30-20 وهل تناسب السعودية؟", answer: "تقسم الدخل: 50% للضروريات، 30% للرغبات، 20% للادخار. مناسبة كبداية، لكن في السعودية قد يحتاج السكن لنسبة أعلى مما يستدعي تعديل القاعدة." },
        { question: "كيف أبدأ بالادخار إذا كان دخلي محدوداً؟", answer: "ابدأ بـ 5% فقط — حتى 250 ريال من دخل 5,000. الأهم هو الاستمرارية. استخدم خاصية الخصم التلقائي إن أتاح البنك ذلك. مع الوقت، زد النسبة." },
      ]
    : [
        { question: "What is the ideal savings rate in Saudi Arabia?", answer: "The recommended rate is 10-20% of monthly income. Starting with 10% is sufficient, then gradually increasing. If you have debts, aim for at least 20%." },
        { question: "How can I reduce my expenses?", answer: "Start with food: home cooking saves 40%. Then transport: use public transit or carpooling. Finally, review all monthly subscriptions." },
        { question: "What is the average Saudi family's monthly expense?", answer: "According to GASTAT, the average Saudi family spends 7,000-12,000 SAR monthly, with housing and food taking the largest share." },
        { question: "Does this calculator save my data?", answer: "No, the calculator runs entirely in your browser and sends no data to our servers. You can use the 'Share' button to save your data via an encoded link." },
        { question: "What is the 50-30-20 rule?", answer: "It divides income: 50% for needs, 30% for wants, 20% for savings. It's a good starting point, though housing in Saudi Arabia may require adjustment." },
      ];

  const relatedTools = [
    { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary" },
    { labelAr: "حاسبة نهاية الخدمة", labelEn: "End of Service", href: "/calculators/end-of-service" },
    { labelAr: "حاسبة التمويل العقاري", labelEn: "Mortgage Calculator", href: "/calculators/mortgage" },
    { labelAr: "حاسبة الزكاة", labelEn: "Zakat Calculator", href: "/calculators/zakat" },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: isAr ? "حاسبة الميزانية والنفقات السعودية" : "Saudi Budget Calculator",
        description: isAr ? "حاسبة ميزانية شهرية للأسرة السعودية مع توصيات ذكية" : "Monthly budget calculator for Saudi families with smart recommendations",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        inLanguage: isAr ? "ar" : "en",
        offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { labelAr: "الحاسبات", labelEn: "Calculators", href: "/calculators" },
          { labelAr: "حاسبة الميزانية", labelEn: "Budget Calculator" },
        ]} />

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            {isAr ? "حاسبة الميزانية والنفقات السعودية" : "Saudi Budget & Expense Calculator"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
            {isAr
              ? "خطط لميزانيتك الشهرية بذكاء. أدخل دخلك ووزّع نفقاتك على فئاتها واحصل على تحليل فوري مع توصيات مخصصة لتحسين وضعك المالي."
              : "Plan your monthly budget smartly. Enter your income, distribute your expenses, and get instant analysis with personalized recommendations."}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {(isAr
              ? ["✓ مجاني تماماً", "✓ بيانات محلية سعودية", "✓ نتائج فورية", "✓ بدون تسجيل"]
              : ["✓ Completely Free", "✓ Saudi Local Data", "✓ Instant Results", "✓ No Registration"]
            ).map((badge) => (
              <span key={badge} className="px-3 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Calculator */}
        <BudgetCalculator />

        <AdSlot id="budget-mid" size="leaderboard" />

        {/* Educational Content */}
        <div className="mt-8 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {isAr ? "ما هي حاسبة الميزانية؟" : "What is a Budget Calculator?"}
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-3">
            <p>{isAr
              ? "حاسبة الميزانية الشهرية هي أداة مالية تساعدك على توزيع دخلك الشهري بشكل منظم ومتوازن. تعتمد الحاسبة على معايير الأسرة السعودية والتوصيات المالية المعتمدة لضمان أفضل توزيع لمصروفاتك."
              : "A monthly budget calculator is a financial tool that helps you distribute your monthly income in an organized and balanced way. The calculator is based on Saudi family standards and approved financial recommendations."
            }</p>
            <p>{isAr
              ? "تُساعدك الحاسبة على: معرفة أين تذهب أموالك بدقة، تحديد الفئات التي تُنفق فيها أكثر من اللازم، تحديد هدف ادخار واقعي، والمقارنة مع متوسط الأسرة السعودية."
              : "The calculator helps you: know exactly where your money goes, identify categories where you overspend, set a realistic savings goal, and compare with the Saudi family average."
            }</p>
          </div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 mt-8">
            {isAr ? "كيفية استخدام الحاسبة" : "How to Use the Calculator"}
          </h2>
          <div className="space-y-3">
            {(isAr
              ? [
                  "أدخل دخلك الشهري (الراتب الصافي بعد الخصومات)",
                  "حرّك الـ sliders لتحديد مبلغ كل فئة من المصروفات",
                  "راقب مؤشر الصحة المالية وبطاقات الملخص",
                  "اقرأ التوصيات الذكية وطبّقها لتحسين ميزانيتك",
                  "استخدم \"توزيع تلقائي ذكي\" لاقتراح أمثل توزيع",
                ]
              : [
                  "Enter your monthly income (net salary after deductions)",
                  "Move the sliders to set the amount for each expense category",
                  "Monitor the financial health score and summary cards",
                  "Read and apply the smart recommendations",
                  "Use 'Smart Auto-Distribute' for an optimal distribution",
                ]
            ).map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm pt-1">{step}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 mt-8">
            {isAr ? "أبرز القواعد المالية" : "Key Financial Rules"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-800">
              <h3 className="font-bold text-primary-700 dark:text-primary-300 mb-2 text-sm">
                {isAr ? "قاعدة 50-30-20" : "50-30-20 Rule"}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isAr
                  ? "50% للضروريات (سكن، طعام، نقل) — 30% للرغبات (ترفيه، ملابس) — 20% للادخار والاستثمار"
                  : "50% needs (housing, food, transport) — 30% wants (entertainment, clothing) — 20% savings & investment"
                }
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
              <h3 className="font-bold text-amber-700 dark:text-amber-300 mb-2 text-sm">
                {isAr ? "قاعدة 30% للسكن" : "30% Housing Rule"}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isAr
                  ? "لا يجب أن يتجاوز إيجارك 30% من دخلك الشهري لضمان استدامة ميزانيتك."
                  : "Your rent should not exceed 30% of your monthly income to ensure budget sustainability."
                }
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-200 dark:border-cyan-800">
              <h3 className="font-bold text-cyan-700 dark:text-cyan-300 mb-2 text-sm">
                {isAr ? "صندوق الطوارئ" : "Emergency Fund"}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isAr
                  ? "اجمع ما يعادل 3-6 أشهر من مصروفاتك كاحتياطي للحالات الطارئة."
                  : "Save 3-6 months of expenses as an emergency reserve for unexpected situations."
                }
              </p>
            </div>
          </div>
        </div>

        <AdSlot id="budget-rect" size="rectangle" />

        {/* FAQ */}
        <div className="mt-8">
          <FAQSection faqs={faqs} />
        </div>

        {/* Related Tools */}
        <div className="mt-8 bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">
            {isAr ? "أدوات ذات صلة" : "Related Tools"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {relatedTools.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`}
                className="block px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-primary-900/10 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium text-sm transition-colors text-center">
                {isAr ? item.labelAr : item.labelEn}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent locale={locale} />;
}
