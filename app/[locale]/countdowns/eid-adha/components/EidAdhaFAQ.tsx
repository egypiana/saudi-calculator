"use client";

import { useState } from "react";
import { getNextEidAdhaYear, EID_ADHA_DATA, formatDateAr } from "@/lib/data/eidAdhaData";

function toAr(n: number): string {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);
}

export default function EidAdhaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const nextYear = getNextEidAdhaYear();
  const data = EID_ADHA_DATA[nextYear];

  const faqs = [
    {
      q: `كم باقي على عيد الأضحى ${toAr(nextYear)}؟`,
      a: "تابع العداد التنازلي أعلى الصفحة لمعرفة الوقت المتبقي بالأيام والساعات والدقائق والثواني بشكل دقيق ومحدّث.",
    },
    {
      q: `متى موعد عيد الأضحى ${toAr(nextYear)} في السعودية؟`,
      a: data ? `عيد الأضحى ${toAr(nextYear)} يوم ${data.dayOfWeek} ${formatDateAr(data.date)}، الموافق ${data.hijriMonth} ${toAr(data.hijriYear)} هـ. يُعلَن رسمياً من قِبَل المحكمة العليا في المملكة.` : "",
    },
    {
      q: "ما هي الأضحية وما حكمها؟",
      a: "الأضحية هي ذبح حيوان من الأنعام (غنم أو بقر أو إبل) تقرباً إلى الله تعالى في أيام العيد. وهي سنة مؤكدة عن النبي ﷺ، وذهب بعض العلماء إلى وجوبها على المستطيع.",
    },
    {
      q: "ما شروط الأضحية الشرعية؟",
      a: "يُشترط أن تكون من الأنعام (إبل أو بقر أو غنم)، وأن تبلغ السن المعتبرة شرعاً، وأن تكون سليمة من العيوب الأربعة: العرج البيّن، والعور البيّن، والمرض البيّن، والهزال الشديد.",
    },
    {
      q: "ما فضل صيام يوم عرفة؟",
      a: "صيام يوم عرفة (9 ذو الحجة) لغير الحاج يكفّر ذنوب سنتين — السنة الماضية والسنة القادمة — كما ورد في صحيح مسلم عن النبي ﷺ.",
    },
    {
      q: "متى وقت ذبح الأضحية؟",
      a: "يبدأ وقت الذبح بعد صلاة عيد الأضحى يوم 10 ذو الحجة، ويستمر حتى غروب شمس آخر أيام التشريق (13 ذو الحجة). من ذبح قبل الصلاة فهي شاة لحم وليست أضحية.",
    },
    {
      q: "ما هي تكبيرات عيد الأضحى؟",
      a: "التكبير المقيد يبدأ من فجر يوم عرفة (9 ذو الحجة) حتى عصر آخر أيام التشريق (13 ذو الحجة). الصيغة: الله أكبر الله أكبر لا إله إلا الله، الله أكبر الله أكبر ولله الحمد.",
    },
    {
      q: "ما هي أيام التشريق؟",
      a: "أيام التشريق هي 11 و12 و13 من ذي الحجة، وهي أيام أكل وشرب وذكر لله تعالى. يحرم فيها الصيام، ويُستحب فيها التكبير والذكر.",
    },
    {
      q: "كيف يُوزَّع لحم الأضحية؟",
      a: "يُستحب تقسيم لحم الأضحية ثلاثة أقسام: ثلث لأهل البيت يأكلون منه، وثلث يُهدى للأقارب والجيران، وثلث يُتصدَّق به على الفقراء والمساكين.",
    },
    {
      q: "كم يوم إجازة عيد الأضحى في السعودية؟",
      a: "إجازة عيد الأضحى في المملكة العربية السعودية عادة 5 أيام رسمية للقطاع الحكومي، وتشمل يوم عرفة وأيام العيد.",
    },
    {
      q: "هل يختلف موعد عيد الأضحى بين الدول؟",
      a: "نعم، قد يختلف موعد عيد الأضحى بين الدول بيوم واحد بحسب رؤية هلال ذي الحجة. معظم الدول العربية تتبع رؤية المملكة العربية السعودية.",
    },
    {
      q: "ما الفرق بين عيد الأضحى وعيد الفطر؟",
      a: "عيد الأضحى في 10 ذي الحجة مرتبط بالحج والأضحية ومدته 4 أيام. عيد الفطر في 1 شوال مرتبط برمضان وزكاة الفطر ومدته 3 أيام.",
    },
    {
      q: "ما حكم من لم يجد أضحية؟",
      a: "الأضحية سنة مؤكدة وليست واجبة عند جمهور العلماء. من لم يستطع ذبح أضحية فلا إثم عليه، ويمكنه المشاركة في أضحية مع غيره (البقرة والجمل عن سبعة).",
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
        ❓ الأسئلة الشائعة عن عيد الأضحى
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
