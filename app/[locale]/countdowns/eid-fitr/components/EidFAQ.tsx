"use client";

import { useState } from "react";
import { getNextEidYear, EID_FITR_DATA, formatDateAr } from "@/lib/data/eidFitrData";

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function EidFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const nextYear = getNextEidYear();
  const data = EID_FITR_DATA[nextYear];

  const faqs = [
    {
      q: `كم باقي على عيد الفطر ${toAr(nextYear)}؟`,
      a: "تابع العداد التنازلي أعلى الصفحة لمعرفة الوقت المتبقي بالأيام والساعات والدقائق والثواني بشكل دقيق ومحدّث.",
    },
    {
      q: `متى موعد عيد الفطر ${toAr(nextYear)} في السعودية؟`,
      a: data ? `عيد الفطر ${toAr(nextYear)} يوم ${data.dayOfWeek} ${formatDateAr(data.date)}، الموافق ${data.hijriMonth} ${toAr(data.hijriYear)} هـ. يُعلَن رسمياً بعد رؤية هلال شوال من قِبَل المحكمة العليا في المملكة.` : "",
    },
    {
      q: "كيف يتم تحديد موعد عيد الفطر؟",
      a: "يُحدَّد موعد عيد الفطر برؤية هلال شوال شرعياً. في السعودية، تتولى المحكمة العليا الإعلان بناءً على شهادة الشهود أو الحسابات الفلكية.",
    },
    {
      q: "كم يوم إجازة عيد الفطر في السعودية؟",
      a: "إجازة عيد الفطر في المملكة العربية السعودية 4 أيام رسمية للقطاع الحكومي، و4 أيام للقطاع الخاص وفق اللوائح العمالية.",
    },
    {
      q: "ما هي زكاة الفطر ومقدارها؟",
      a: "زكاة الفطر صدقة واجبة على كل مسلم مقدارها صاع من قوت البلد (نحو 3 كيلو غرام)، أو ما يعادلها نقداً. تُخرَج قبل صلاة عيد الفطر.",
    },
    {
      q: "هل يختلف موعد عيد الفطر بين الدول؟",
      a: "نعم، قد يختلف موعد عيد الفطر بين الدول بيوم واحد بحسب رؤية الهلال محلياً. بعض الدول تعتمد الرؤية المشتركة مع السعودية.",
    },
    {
      q: "ما الفرق بين عيد الفطر وعيد الأضحى؟",
      a: "عيد الفطر يأتي بعد رمضان في 1 شوال، وشعيرته زكاة الفطر. أما عيد الأضحى فيأتي في 10 ذي الحجة مصادفاً موسم الحج، وشعيرته ذبح الأضحية.",
    },
  ];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        ❓ الأسئلة الشائعة عن عيد الفطر
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-right hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <span className="font-medium text-gray-800 dark:text-white text-sm">{faq.q}</span>
              <span className={`text-gray-400 transition-transform duration-200 flex-shrink-0 mr-3 ${openIndex === i ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
