"use client";

import { useState } from "react";
import { getNextHajjYear, HAJJ_DATA, formatDateAr } from "@/lib/data/hajjData";

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function HajjFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const nextYear = getNextHajjYear();
  const data = HAJJ_DATA[nextYear];

  const faqs = [
    {
      q: `كم باقي على الحج ${toAr(nextYear)}؟`,
      a: "تابع العداد التنازلي أعلى الصفحة لمعرفة الوقت المتبقي لموسم الحج بالأيام والساعات والدقائق والثواني بشكل دقيق ومحدّث.",
    },
    {
      q: `متى موسم الحج ${toAr(nextYear)}؟`,
      a: data ? `يبدأ موسم الحج ${toAr(nextYear)} يوم ${data.dayOfWeek} ${formatDateAr(data.date)}، الموافق ${data.hijriMonth} ${toAr(data.hijriYear)} هـ. يوم عرفة ${formatDateAr(data.arafaDay)} وعيد الأضحى ${formatDateAr(data.eidDay)}.` : "",
    },
    {
      q: "ما هي أركان الحج؟",
      a: "أركان الحج أربعة لا يصح الحج بدونها: الإحرام (النية)، الوقوف بعرفة وهو الركن الأعظم، طواف الإفاضة (طواف الزيارة)، والسعي بين الصفا والمروة. من ترك ركناً لم يصح حجه.",
    },
    {
      q: "ما الفرق بين الحج والعمرة؟",
      a: "الحج فريضة تُؤدَّى في وقت محدد (8-13 ذو الحجة) ويشمل الوقوف بعرفة ورمي الجمرات والمبيت بمزدلفة ومنى. أما العمرة فتُؤدَّى في أي وقت من العام وتتكون من الإحرام والطواف والسعي والحلق أو التقصير فقط.",
    },
    {
      q: "هل يجب الحج مرة واحدة فقط؟",
      a: "نعم، الحج واجب مرة واحدة في العمر على المسلم المستطيع. قال النبي ﷺ: \"الحج مرة، فمن زاد فهو تطوع\". لكن يُستحب تكرار الحج لمن استطاع ذلك.",
    },
    {
      q: "ما هي شروط الحج للمرأة؟",
      a: "يُشترط للمرأة ما يُشترط للرجل من شروط الوجوب (الإسلام، البلوغ، العقل، الاستطاعة). وكان يُشترط المحرم، لكن المملكة سهّلت مؤخراً بالسماح للمرأة فوق 45 عاماً بالحج مع مجموعة نساء دون اشتراط المحرم.",
    },
    {
      q: "كم يوماً يستغرق الحج؟",
      a: "تستغرق مناسك الحج الأساسية من 5 إلى 6 أيام، من يوم التروية (8 ذو الحجة) حتى نهاية أيام التشريق (13 ذو الحجة). يمكن التعجل في يومين فقط من أيام التشريق (النفر الأول يوم 12).",
    },
    {
      q: "ما هو حج التمتع؟",
      a: "حج التمتع هو الأكثر شيوعاً، ويكون بأداء العمرة في أشهر الحج (شوال، ذو القعدة، أو العشر الأوائل من ذي الحجة) ثم التحلل منها، ثم الإحرام بالحج يوم التروية. يجب على المتمتع ذبح هدي (شاة) شكراً لله.",
    },
    {
      q: "هل يجوز الحج بالتقسيط؟",
      a: "الاستطاعة المالية شرط لوجوب الحج، فمن لا يملك نفقة الحج لا يجب عليه. لا يُطلَب من المسلم الاستدانة للحج. لكن إذا وُفّرت برامج تقسيط ميسّرة دون ربا فلا حرج في الاستفادة منها مع القدرة على السداد.",
    },
    {
      q: "ما فضل يوم عرفة لغير الحاج؟",
      a: "يُستحب لغير الحاج صيام يوم عرفة (9 ذو الحجة). قال النبي ﷺ: \"صيام يوم عرفة أحتسب على الله أن يكفّر السنة التي قبله والتي بعده\". فصيامه يكفّر ذنوب سنتين كاملتين بإذن الله.",
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
        ❓ الأسئلة الشائعة عن الحج
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
