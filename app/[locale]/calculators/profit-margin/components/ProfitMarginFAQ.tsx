"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "ما هو هامش الربح (Profit Margin)؟", a: "هامش الربح هو نسبة الربح من إجمالي الإيرادات (سعر البيع). يُحسب بالمعادلة: (الربح ÷ الإيرادات) × 100. مثال: بعت منتجاً بـ 100 ريال وتكلفته 60 ريال، الربح = 40 ريال، هامش الربح = 40%. يُعتبر مقياس أساسي لصحة الأعمال التجارية." },
  { q: "ما الفرق بين هامش الربح (Margin) ونسبة الإضافة (Markup)؟", a: "هامش الربح (Margin): الربح كنسبة من سعر البيع. نسبة الإضافة (Markup): الربح كنسبة من التكلفة. مثال: تكلفة 60 وبيع 100 → Margin = 40% (40÷100) لكن Markup = 66.7% (40÷60). الـ Markup دائماً أكبر من الـ Margin لنفس المعاملة. خطأ شائع: الخلط بينهما يؤدي لتسعير خاطئ." },
  { q: "كيف أحسب سعر البيع من نسبة هامش الربح المستهدف؟", a: "المعادلة: سعر البيع = التكلفة ÷ (1 - هامش الربح/100). مثال: التكلفة 500 ريال وتريد هامش 25%: 500 ÷ (1 - 0.25) = 500 ÷ 0.75 = 667 ريال. هذا يعني الربح = 167 ريال وهامش الربح = 167÷667 = 25% ✓. استخدم وضع 'من نسبة الهامش المستهدفة' في الحاسبة." },
  { q: "ما هو هامش الربح الجيد لمشروعي؟", a: "يختلف حسب الصناعة: سوبرماركت 2-5% (حجم مبيعات كبير)، مطاعم 5-15%، ملابس 10-20%، إلكترونيات 5-10%، برمجيات 15-30%، استشارات 20-40%، عقارات 15-25%. القاعدة العامة: هامش إجمالي 30%+ يُعتبر صحياً، وصافي ربح 10%+ ممتاز لمعظم الأعمال." },
  { q: "ما الفرق بين هامش الربح الإجمالي والتشغيلي وصافي الربح؟", a: "الإجمالي (Gross): الإيرادات - تكلفة البضاعة فقط. يقيس كفاءة الإنتاج. التشغيلي (Operating): الإجمالي - المصاريف التشغيلية (إيجار، رواتب، تسويق). يقيس كفاءة العمليات. صافي الربح (Net): التشغيلي - الضرائب والفوائد ومصاريف أخرى. يقيس الربحية النهائية. المثالي: تتبع الثلاثة معاً." },
  { q: "كيف أحسب Markup من Margin والعكس؟", a: "التحويل من Margin إلى Markup: Markup = Margin ÷ (100 - Margin) × 100. مثال: Margin 25% → Markup = 25÷75×100 = 33.3%. من Markup إلى Margin: Margin = Markup ÷ (100 + Markup) × 100. مثال: Markup 50% → Margin = 50÷150×100 = 33.3%. استخدم تبويب التحويل في الحاسبة." },
  { q: "لماذا يكون Markup دائماً أكبر من Margin؟", a: "لأن Markup يُحسب على التكلفة (الرقم الأصغر) بينما Margin يُحسب على سعر البيع (الرقم الأكبر). عند قسمة نفس الربح على رقم أصغر تحصل على نسبة أكبر. مثال عملي: ربح 50 ريال: Markup = 50÷100(التكلفة) = 50%، Margin = 50÷150(البيع) = 33.3%." },
  { q: "كيف أحسب هامش الربح بعد ضريبة القيمة المضافة (15%)؟", a: "الضريبة لا تؤثر على هامش الربح الفعلي لأنها تُحصّل من العميل وتُورّد للزكاة والدخل. لكن عند التسعير: إذا المنتج بـ 100 ريال (شامل الضريبة)، السعر الفعلي = 100÷1.15 = 87 ريال. احسب هامشك على 87 وليس 100. فعّل خيار الضريبة في الحاسبة لمعرفة السعر الشامل." },
  { q: "ما هي أفضل طريقة لتحسين هامش الربح؟", a: "1) تقليل التكاليف: تفاوض مع الموردين، اشترِ بالجملة. 2) رفع الأسعار: أضف قيمة مميزة تبرر السعر الأعلى. 3) تقليل الهدر والخسائر في المخزون. 4) أتمتة العمليات لتقليل تكاليف التشغيل. 5) التركيز على المنتجات ذات الهامش العالي. 6) مراجعة التسعير بانتظام مع تغير التكاليف." },
  { q: "كيف أستخدم حاسبة مقارنة المنتجات المتعددة؟", a: "اضغط على تبويب 'مقارنة المنتجات'، أدخل اسم كل منتج وتكلفته وسعر بيعه والكمية. الحاسبة تحسب تلقائياً: هامش الربح و Markup لكل منتج، إجمالي الأرباح، ورسم بياني للمقارنة. يساعدك هذا في معرفة أي المنتجات أكثر ربحية والتركيز عليها." },
  { q: "ما هي نقطة التعادل وعلاقتها بهامش الربح؟", a: "نقطة التعادل (Break-even) هي عدد الوحدات التي يجب بيعها لتغطية جميع التكاليف (الثابتة والمتغيرة) دون ربح أو خسارة. المعادلة: التكاليف الثابتة ÷ (سعر البيع - التكلفة المتغيرة للوحدة). كلما زاد هامش الربح، قلّ عدد الوحدات المطلوبة للوصول لنقطة التعادل." },
  { q: "هل يجب أن أستخدم Margin أم Markup في تسعير منتجاتي؟", a: "الممارسة الأفضل: استخدم Margin لتحليل الربحية والتقارير المالية (لأنه يقارن مع الإيرادات). استخدم Markup للتسعير اليومي (لأنه يُطبق مباشرة على التكلفة). مثال: تكلفة 100 ريال + Markup 50% = بيع 150 ريال. ثم تحقق: Margin = 33.3% — هل هذا كافي لتغطية مصاريفك التشغيلية؟" },
];

export default function ProfitMarginFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg">
        <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">❓ أسئلة شائعة عن حساب نسبة الربح <span className="text-xs font-normal text-gray-400">({FAQS.length} سؤال)</span></h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-right hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors">
                <span className="font-medium text-sm text-gray-800 dark:text-white leading-relaxed pl-4">{faq.q}</span>
                <ChevronDown className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div className="px-5 pb-4"><p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-green-50 dark:bg-green-900/10 rounded-xl px-4 py-3">{faq.a}</p></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
