"use client";

import { useState } from "react";
import { getNextNationalDayYear, NATIONAL_DAY_DATA, formatDateAr } from "@/lib/data/nationalDayData";

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function NationalDayFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const nextYear = getNextNationalDayYear();
  const data = NATIONAL_DAY_DATA[nextYear];

  const kingdomAge = nextYear - 1932;

  const faqs = [
    {
      q: `كم باقي على اليوم الوطني ${toAr(nextYear)}؟`,
      a: "تابع العداد التنازلي أعلى الصفحة لمعرفة الوقت المتبقي بالأيام والساعات والدقائق والثواني بشكل دقيق ومحدّث.",
    },
    {
      q: `متى اليوم الوطني السعودي ${toAr(nextYear)}؟`,
      a: data ? `اليوم الوطني السعودي ${toAr(nextYear)} يوم ${data.dayOfWeek} ${formatDateAr(data.date)}. وهو اليوم الوطني رقم ${toAr(data.nationalDayNumber)} للمملكة العربية السعودية.` : "",
    },
    {
      q: "ما هو رقم اليوم الوطني القادم؟",
      a: data ? `اليوم الوطني القادم هو اليوم الوطني ${toAr(data.nationalDayNumber)} ويصادف يوم ${data.dayOfWeek} ${formatDateAr(data.date)}.` : "",
    },
    {
      q: "لماذا نحتفل في 23 سبتمبر؟",
      a: "نحتفل في 23 سبتمبر لأنه اليوم الذي أُعلن فيه توحيد المملكة العربية السعودية رسمياً عام 1932م (1351 هـ) على يد الملك المؤسس عبدالعزيز بن عبدالرحمن آل سعود، بعد رحلة توحيد استمرت ثلاثين عاماً.",
    },
    {
      q: "هل اليوم الوطني إجازة رسمية؟",
      a: "نعم، اليوم الوطني السعودي إجازة رسمية لجميع القطاعات الحكومية والخاصة في المملكة. يحصل الموظفون على يوم إجازة مدفوعة الأجر. إذا صادف يوم الجمعة أو السبت، قد تُعوّض الإجازة بيوم آخر.",
    },
    {
      q: "ما قصة توحيد المملكة؟",
      a: "بدأت قصة التوحيد عام 1902م باستعادة الملك عبدالعزيز لمدينة الرياض، ثم واصل توحيد مناطق الجزيرة العربية: الأحساء (1913)، عسير (1921)، حائل (1921)، الحجاز (1925)، حتى أُعلن قيام المملكة العربية السعودية في 23 سبتمبر 1932م.",
    },
    {
      q: `ما هو شعار اليوم الوطني ${toAr(nextYear)}؟`,
      a: data ? `شعار اليوم الوطني ${toAr(data.nationalDayNumber)} لعام ${toAr(nextYear)} هو: "${data.theme}".` : "",
    },
    {
      q: "كم عمر المملكة العربية السعودية؟",
      a: `تأسست المملكة العربية السعودية بشكلها الحالي عام 1932م، أي أن عمرها في عام ${toAr(nextYear)} يبلغ ${toAr(kingdomAge)} عاماً. وتُعدّ من أكبر الدول العربية مساحة وأكثرها تأثيراً في المنطقة والعالم.`,
    },
    {
      q: "ما هي رؤية 2030 وعلاقتها باليوم الوطني؟",
      a: "رؤية السعودية 2030 هي خطة استراتيجية أطلقها ولي العهد الأمير محمد بن سلمان لتحويل المملكة إلى نموذج عالمي رائد. يرتبط اليوم الوطني بالرؤية حيث يُستعرض كل عام التقدم المحرز نحو تحقيق أهدافها في مجالات الاقتصاد والسياحة والترفيه والتقنية.",
    },
    {
      q: "ماذا يحدث إذا صادف اليوم الوطني نهاية أسبوع؟",
      a: "إذا صادف اليوم الوطني يوم الجمعة أو السبت (نهاية الأسبوع في السعودية)، يصدر مجلس الوزراء قراراً بتعويض الإجازة بيوم عمل آخر، عادةً يوم الأحد أو الخميس، لضمان حصول جميع المواطنين والمقيمين على إجازتهم الرسمية.",
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
        ❓ الأسئلة الشائعة عن اليوم الوطني السعودي
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
