"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

interface FAQItem {
  q: string;
  qEn: string;
  a: string;
  aEn: string;
  link?: { href: string; labelAr: string; labelEn: string };
}

const FAQS: FAQItem[] = [
  {
    q: "متى تُصرف الرواتب الحكومية في السعودية؟",
    qEn: "When are government salaries paid in Saudi Arabia?",
    a: "تُصرف الرواتب الحكومية في السعودية يوم 27 من كل شهر هجري. إذا صادف هذا التاريخ يوم الجمعة أو السبت (عطلة نهاية الأسبوع)، يُقدَّم الصرف إلى يوم الخميس السابق. يشمل ذلك جميع موظفي الحكومة المدنيين والعسكريين.",
    aEn: "Government salaries in Saudi Arabia are paid on the 27th of each Hijri month. If this date falls on a Friday or Saturday (weekend), the payment is moved to the preceding Thursday. This applies to all civilian and military government employees.",
  },
  {
    q: "متى ينزل حساب المواطن؟",
    qEn: "When is the Citizen Account (Hisab Al-Muwatin) deposited?",
    a: "يُصرف حساب المواطن يوم 10 من كل شهر ميلادي. إذا صادف يوم الجمعة يُقدَّم إلى الخميس، وإذا صادف السبت يُؤخَّر إلى الأحد. يجب التأكد من تحديث البيانات بشكل دوري لضمان استمرار الاستحقاق.",
    aEn: "The Citizen Account is deposited on the 10th of each Gregorian month. If it falls on a Friday, it moves to Thursday; if Saturday, it moves to Sunday. Ensure your data is regularly updated to maintain eligibility.",
  },
  {
    q: "متى تُصرف رواتب التقاعد والتأمينات الاجتماعية؟",
    qEn: "When are retirement and social insurance pensions paid?",
    a: "تُصرف رواتب التقاعد (المؤسسة العامة للتقاعد) والتأمينات الاجتماعية يوم 25 من كل شهر ميلادي. إذا صادف عطلة نهاية الأسبوع يُقدَّم ليوم الخميس. يشمل ذلك المعاشات التقاعدية ومعاشات العجز والورثة.",
    aEn: "Retirement pensions (General Organization for Social Insurance) and social insurance payments are made on the 25th of each Gregorian month. If it falls on a weekend, payment moves to the preceding Thursday. This includes retirement, disability, and survivor pensions.",
  },
  {
    q: "متى ينزل حافز؟",
    qEn: "When is the Hafiz unemployment benefit deposited?",
    a: "يُصرف حافز (إعانة البحث عن عمل) حوالي يوم 5 من كل شهر هجري. قد يختلف الموعد بيوم أو يومين حسب التقويم. يُشترط الالتزام بالتدريب والبحث الجاد عن عمل لاستمرار الصرف.",
    aEn: "Hafiz (job search allowance) is deposited around the 5th of each Hijri month. The exact date may vary by a day or two. Continued enrollment in training and active job seeking is required to maintain payments.",
  },
  {
    q: "ماذا يحدث إذا صادف موعد الراتب عطلة نهاية الأسبوع؟",
    qEn: "What happens if the salary date falls on a weekend?",
    a: "إذا صادف موعد صرف الراتب يوم الجمعة أو السبت (عطلة نهاية الأسبوع في السعودية)، يُقدَّم الصرف إلى يوم الخميس السابق. هذا ينطبق على الرواتب الحكومية ورواتب التقاعد وحساب المواطن. بعض البنوك قد تُودع المبلغ مساء الأربعاء.",
    aEn: "If the salary date falls on a Friday or Saturday (the Saudi weekend), payment is moved to the preceding Thursday. This applies to government salaries, retirement pensions, and the Citizen Account. Some banks may deposit funds on Wednesday evening.",
  },
  {
    q: "هل تختلف مواعيد رواتب القطاع الخاص عن الحكومي؟",
    qEn: "Do private sector salary dates differ from government?",
    a: "نعم، مواعيد رواتب القطاع الخاص تحددها كل شركة حسب سياستها الداخلية. لكن نظام حماية الأجور يُلزم جميع شركات القطاع الخاص بصرف الرواتب خلال أسبوع كحد أقصى من تاريخ الاستحقاق المتفق عليه. التأخير يُعرّض الشركة لعقوبات من وزارة الموارد البشرية.",
    aEn: "Yes, private sector salary dates are set by each company's internal policy. However, the Wage Protection System requires all private sector companies to pay salaries within one week of the agreed due date. Delays expose the company to penalties from the Ministry of Human Resources.",
  },
  {
    q: "كم نسبة خصم التأمينات الاجتماعية من الراتب؟",
    qEn: "What is the social insurance deduction rate from salary?",
    a: "تبلغ نسبة خصم التأمينات الاجتماعية 9.75% من الراتب الأساسي على الموظف السعودي (فرع المعاشات). ويتحمل صاحب العمل 11.75% إضافية (9.75% معاشات + 2% أخطار مهنية). للموظف غير السعودي يتحمل صاحب العمل 2% فقط عن الأخطار المهنية.",
    aEn: "The social insurance deduction is 9.75% of the basic salary for Saudi employees (pension branch). The employer pays an additional 11.75% (9.75% pension + 2% occupational hazards). For non-Saudi employees, the employer pays only 2% for occupational hazards.",
  },
  {
    q: "ما هو نظام حماية الأجور؟",
    qEn: "What is the Wage Protection System (WPS)?",
    a: "نظام حماية الأجور هو نظام إلكتروني أطلقته وزارة الموارد البشرية والتنمية الاجتماعية لمراقبة عمليات صرف رواتب العاملين في القطاع الخاص. يُلزم النظام الشركات بتحويل الرواتب عبر البنوك المعتمدة ويرصد أي تأخير أو نقص في الصرف لحماية حقوق العمال.",
    aEn: "The Wage Protection System (WPS) is an electronic system launched by the Ministry of Human Resources to monitor salary payments in the private sector. It requires companies to transfer salaries through approved banks and tracks any delays or shortfalls to protect workers' rights.",
  },
  {
    q: "كيف أحسب صافي راتبي بعد الخصومات؟",
    qEn: "How do I calculate my net salary after deductions?",
    a: "لحساب صافي راتبك: اطرح خصم التأمينات الاجتماعية (9.75% من الراتب الأساسي) من إجمالي الراتب. لا توجد ضريبة دخل في السعودية على المواطنين. يمكنك استخدام حاسبة الراتب للحصول على حساب دقيق يشمل جميع البدلات والخصومات.",
    aEn: "To calculate your net salary: deduct social insurance (9.75% of basic salary) from total salary. There is no income tax in Saudi Arabia for citizens. Use our salary calculator for an accurate breakdown including all allowances and deductions.",
    link: { href: "/calculators/salary", labelAr: "حاسبة الراتب", labelEn: "Salary Calculator" },
  },
  {
    q: "هل يوجد ضريبة دخل على الرواتب في السعودية؟",
    qEn: "Is there income tax on salaries in Saudi Arabia?",
    a: "لا، لا توجد ضريبة دخل على المواطنين السعوديين أو المقيمين العاملين في السعودية. الخصم الوحيد من الراتب هو التأمينات الاجتماعية. هذا يجعل السعودية من أقل الدول عبئاً ضريبياً على الأفراد. يوجد فقط ضريبة القيمة المضافة (15%) على السلع والخدمات.",
    aEn: "No, there is no income tax on Saudi citizens or residents working in Saudi Arabia. The only salary deduction is social insurance. This makes Saudi Arabia one of the lowest individual tax burden countries. There is only a 15% VAT on goods and services.",
  },
  {
    q: "ما هو بدل غلاء المعيشة؟",
    qEn: "What is the cost of living allowance?",
    a: "بدل غلاء المعيشة هو بدل أُقر بأمر ملكي عام 2018 بقيمة 1,000 ريال شهرياً لموظفي الحكومة والمتقاعدين والضمان الاجتماعي. في عام 2020 تم إيقاف البدل ودمجه في الراتب الأساسي كجزء من إجراءات مواجهة تداعيات جائحة كورونا وتثبيت المالية العامة.",
    aEn: "The cost of living allowance was approved by royal decree in 2018 at 1,000 SAR/month for government employees, retirees, and social security recipients. In 2020, it was discontinued and merged into the basic salary as part of fiscal measures during the COVID-19 pandemic.",
  },
  {
    q: "كيف أستعلم عن راتبي؟",
    qEn: "How do I check my salary information?",
    a: "للاستعلام عن الراتب: موظفو القطاع الحكومي يمكنهم استخدام نظام فارس (الخدمة الذاتية) أو منصة اعتماد. موظفو القطاع الخاص يمكنهم الاستعلام عبر منصة مُدد (mudad.com.sa) أو تطبيق البنك. المتقاعدون يستخدمون تطبيق تأميناتي أو موقع المؤسسة العامة للتأمينات الاجتماعية.",
    aEn: "To check your salary: Government employees can use the FARIS system (self-service) or the Etimad platform. Private sector employees can check via the Mudad platform (mudad.com.sa) or their bank app. Retirees can use the Taminaty app or the GOSI website.",
  },
  {
    q: "ما هي مكافأة نهاية الخدمة وكيف تُحسب؟",
    qEn: "What is end-of-service gratuity and how is it calculated?",
    a: "مكافأة نهاية الخدمة حق مكفول بنظام العمل السعودي. تُحسب بواقع نصف شهر راتب عن كل سنة من السنوات الخمس الأولى، وشهر راتب كامل عن كل سنة بعد ذلك. تُحسب على أساس آخر أجر شامل البدلات الثابتة.",
    aEn: "End-of-service gratuity is a right guaranteed by Saudi labor law. It is calculated as half a month's salary for each of the first 5 years, and a full month's salary for each subsequent year, based on the last salary including fixed allowances.",
  },
  {
    q: "هل تشمل الرواتب الحكومية البدلات؟",
    qEn: "Do government salaries include allowances?",
    a: "نعم، الراتب الحكومي يشمل: الراتب الأساسي حسب السلم الوظيفي، بدل النقل (يتراوح بين 500-700 ريال حسب المرتبة)، بدل السكن (إن وُجد)، وبدلات أخرى حسب طبيعة العمل والمنطقة. يُصرف المجموع دفعة واحدة في يوم الصرف المحدد.",
    aEn: "Yes, government salary includes: basic salary per the pay scale, transportation allowance (500-700 SAR depending on grade), housing allowance (if applicable), and other allowances based on work type and region. The total is paid in one lump sum on the designated payment date.",
  },
];

export function generateSalaryFAQJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: locale === "ar" ? faq.q : faq.qEn,
      acceptedAnswer: {
        "@type": "Answer",
        text: locale === "ar" ? faq.a : faq.aEn,
      },
    })),
  };
}

export default function SalaryFAQ() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = generateSalaryFAQJsonLd(locale);

  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg">
        <h2 className="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">
          {isAr
            ? "❓ أسئلة شائعة عن مواعيد الرواتب في السعودية"
            : "❓ FAQ about Salary Dates in Saudi Arabia"}
          <span className="text-xs font-normal text-gray-400">
            ({FAQS.length} {isAr ? "سؤال" : "questions"})
          </span>
        </h2>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          const question = isAr ? faq.q : faq.qEn;
          const answer = isAr ? faq.a : faq.aEn;

          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`w-full flex items-center justify-between px-5 py-4 text-right transition-colors ${
                  isOpen
                    ? "bg-green-50 dark:bg-green-900/10"
                    : "hover:bg-gray-50 dark:hover:bg-dark-bg/50"
                }`}
                aria-expanded={isOpen}
              >
                <span
                  className={`font-medium text-sm leading-relaxed ${
                    isAr ? "pl-4" : "pr-4"
                  } ${
                    isOpen
                      ? "text-green-800 dark:text-green-300"
                      : "text-gray-800 dark:text-white"
                  }`}
                >
                  {question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? "rotate-180 text-green-600 dark:text-green-400"
                      : "text-gray-400"
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-4 pt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-green-50 dark:bg-green-900/10 rounded-xl px-4 py-3">
                      {answer}
                    </p>
                    {faq.link && (
                      <Link
                        href={`/${locale}${faq.link.href}`}
                        className="inline-flex items-center gap-1 mt-2 mx-4 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                      >
                        {isAr ? faq.link.labelAr : faq.link.labelEn} &larr;
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
