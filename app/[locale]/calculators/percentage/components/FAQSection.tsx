"use client";

import { useState } from "react";

const faqs = [
  { q: "كيف أحسب النسبة المئوية من مبلغ؟", a: "المعادلة بسيطة: اضرب المبلغ في النسبة ثم اقسم على 100. مثال: 15% من 1,000 = (1,000 × 15) ÷ 100 = 150 ريال." },
  { q: "كيف أحسب سعر منتج بعد الخصم؟", a: "استخدم وضع 'الخصم والتوفير': أدخل السعر الأصلي ونسبة الخصم. مثال: منتج 500 ريال بخصم 20% = 500 - (500 × 20%) = 400 ريال." },
  { q: "كيف أضيف ضريبة القيمة المضافة 15% إلى سعر؟", a: "اختر وضع 'القيمة المضافة' ثم أدخل السعر قبل الضريبة. أو استخدم المعادلة: السعر الشامل = السعر × 1.15." },
  { q: "كيف أستخرج ضريبة القيمة المضافة من سعر شامل؟", a: "في وضع VAT، اختر 'استخراج الضريبة'. المعادلة: السعر الأصلي = السعر الشامل ÷ 1.15. مثال: 1,150 ÷ 1.15 = 1,000 ريال." },
  { q: "كيف أحسب نسبة الزكاة؟", a: "الزكاة 2.5% من المال الزكوي الذي بلغ النصاب. استخدم وضع 'الزكاة' أو اضرب مبلغك في 0.025." },
  { q: "كيف أحسب نسبة تغيّر السعر؟", a: "استخدم وضع 'نسبة التغيير': أدخل السعر القديم والجديد. المعادلة: ((الجديد - القديم) ÷ القديم) × 100." },
  { q: "هل يمكن استخدام الحاسبة للعملات غير الريال؟", a: "نعم، الحاسبة تعمل مع أي عملة. الأرقام عالمية — فقط استبدل الريال بعملتك." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">❓ الأسئلة الشائعة</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-right hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <span className="font-medium text-gray-800 dark:text-white text-sm">{faq.q}</span>
              <span className={`text-gray-400 transition-transform duration-200 flex-shrink-0 mr-3 ${openIndex === i ? "rotate-180" : ""}`}>▼</span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
