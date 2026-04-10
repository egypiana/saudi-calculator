"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "كم تعرفة الكهرباء للقطاع السكني؟",
    answer:
      "تعرفة الكهرباء للقطاع السكني في المملكة العربية السعودية هي 18 هللة لكل كيلوواط ساعة لأول 6,000 ك.و.س من الاستهلاك الشهري، و30 هللة لكل كيلوواط ساعة لما يزيد عن ذلك. هذه التعرفة محددة من هيئة تنظيم المياه والكهرباء.",
  },
  {
    question: "هل تختلف التعرفة صيفاً وشتاءً؟",
    answer:
      "لا، التعرفة ثابتة طوال العام ولا تتغير بين الصيف والشتاء. لكن الاستهلاك الفعلي يزداد بنسبة 50-100% في فصل الصيف بسبب الاعتماد الكبير على أجهزة التكييف، مما يؤدي إلى ارتفاع ملحوظ في الفاتورة خلال أشهر الصيف.",
  },
  {
    question: "ما هي ضريبة القيمة المضافة على الكهرباء؟",
    answer:
      "تُطبق ضريبة القيمة المضافة بنسبة 15% على إجمالي فاتورة الكهرباء، وتشمل قيمة الاستهلاك ورسوم العداد وأي رسوم أخرى. تُضاف الضريبة تلقائياً إلى الفاتورة من قبل الشركة السعودية للكهرباء.",
  },
  {
    question: "ما هي رسوم العداد؟",
    answer:
      "رسوم العداد هي رسوم شهرية ثابتة تتراوح بين 10 و40 ريال حسب سعة القاطع الكهربائي المركّب. تُضاف هذه الرسوم إلى فاتورة الاستهلاك شهرياً بغض النظر عن حجم الاستهلاك الفعلي.",
  },
  {
    question: "كم استهلاك المكيف شهرياً؟",
    answer:
      "مكيف سبليت بقدرة 1,500 واط (حوالي 18,000 وحدة حرارية) يستهلك تقريباً 450 كيلوواط ساعة شهرياً عند تشغيله 10 ساعات يومياً. يختلف الاستهلاك حسب درجة الحرارة المضبوطة وكفاءة الجهاز وعزل الغرفة.",
  },
  {
    question: "ما الفرق بين التعرفة السكنية والتجارية؟",
    answer:
      "التعرفة التجارية هي 22 هللة لكل كيلوواط ساعة لأول 6,000 ك.و.س و32 هللة لما يزيد عن ذلك، بينما التعرفة السكنية هي 18 هللة لأول 6,000 ك.و.س و30 هللة لما يزيد عن ذلك. التعرفة التجارية أعلى بحوالي 4-2 هللات لكل كيلوواط ساعة.",
  },
  {
    question: "كيف أقلل فاتورة الكهرباء؟",
    answer:
      "لتقليل فاتورة الكهرباء: اضبط المكيف على درجة 24 مئوية بدلاً من درجات أقل، استخدم العزل الحراري للجدران والأسقف، استبدل الإضاءة التقليدية بمصابيح LED الموفرة، أطفئ الأجهزة غير المستخدمة بالكامل، واستخدم أجهزة ذات كفاءة طاقة عالية.",
  },
  {
    question: "ما معنى الشرائح في فاتورة الكهرباء؟",
    answer:
      "الشرائح هي نظام تقسيم الاستهلاك إلى فئات بأسعار مختلفة. الشريحة الأولى تشمل أول 6,000 ك.و.س بسعر أقل (18 هللة للسكني)، والشريحة الثانية تشمل ما يزيد عن ذلك بسعر أعلى (30 هللة للسكني). هذا النظام يهدف لتشجيع ترشيد الاستهلاك.",
  },
  {
    question: "متى تغيّرت تعرفة الكهرباء آخر مرة؟",
    answer:
      "التعرفة السكنية ثابتة منذ يناير 2018 عندما تم تعديل هيكل التعرفة ضمن إصلاحات أسعار الطاقة. أما التعرفة التجارية فشهدت تحديثاً في مايو 2025. تُراجع التعرفة دورياً من قبل هيئة تنظيم المياه والكهرباء.",
  },
  {
    question: "هل يوجد خيار الفاتورة الثابتة؟",
    answer:
      "نعم، تقدم الشركة السعودية للكهرباء (SEC) خطة الدفع الثابت التي تعتمد على حساب متوسط استهلاكك خلال الـ 12 شهراً الماضية وتقسيمه على أقساط شهرية متساوية. هذا يساعد على التخطيط المالي وتجنب الفواتير المرتفعة في الصيف.",
  },
  {
    question: "كم متوسط فاتورة الكهرباء في السعودية؟",
    answer:
      "يتفاوت متوسط فاتورة الكهرباء بشكل كبير بين الصيف والشتاء. في الصيف تتراوح الفاتورة عادةً بين 500 و1,500 ريال للمنزل المتوسط، بينما في الشتاء تنخفض إلى 150-400 ريال. يعتمد ذلك على مساحة المنزل وعدد المكيفات وعادات الاستهلاك.",
  },
  {
    question: "ما هي تعرفة الاستهلاك المكثف؟",
    answer:
      "تعرفة الاستهلاك المكثف هي تعرفة مخفضة مخصصة للمنشآت الصناعية والتجارية التي تشكّل تكلفة الكهرباء 10% أو أكثر من إجمالي تكاليفها التشغيلية. تهدف هذه التعرفة إلى دعم القطاعات كثيفة الاستهلاك وتعزيز تنافسيتها.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function ElectricityFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section dir="rtl" lang="ar" className="w-full py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        الأسئلة الشائعة عن حاسبة الكهرباء
      </h2>

      <div className="max-w-3xl mx-auto rounded-2xl bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 shadow-sm">
        {faqItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
              aria-expanded={openIndex === index}
            >
              <span className="text-base font-medium text-gray-900 dark:text-white">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
