import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SalaryCountdownPage from "@/components/countdown/SalaryCountdownPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr ? "كم باقي على مكافأة الجامعة؟" : "University Stipend Countdown";
  const description = isAr ? "عداد تنازلي لموعد صرف مكافأة الجامعة الشهرية." : "Countdown to university monthly stipend.";
  return {
    title,
    description,
    ...generatePageSEO(locale, "/countdowns/university-stipend", { title, description }),
  };
}

function PageContent() {
  return (
    <SalaryCountdownPage
      icon="🎓"
      titleAr="مكافأة الجامعة"
      titleEn="University Stipend"
      questionAr="كم باقي على مكافأة الجامعة؟"
      questionEn="How long until university stipend?"
      dayOfMonth={28}
      gradient="from-violet-500 to-violet-700"
      breadcrumbAr="مكافأة الجامعة"
      breadcrumbEn="University Stipend"
      descriptionAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            تُصرف المكافآت الجامعية للطلاب المنتظمين في الجامعات الحكومية السعودية عادةً في
            نهاية كل شهر. تبلغ المكافأة 1000 ريال للتخصصات العلمية و850 ريال للتخصصات الأدبية.
          </p>
        </>
      }
      descriptionEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            University stipends for regular students at Saudi public universities are usually
            paid at the end of each month. The stipend is 1000 SAR for science majors and 850 SAR for humanities.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى تنزل مكافأة الجامعة؟", answer: "عادةً في اليوم 28 من كل شهر ميلادي تقريباً." },
        { question: "كم مبلغ المكافأة؟", answer: "1000 ريال للتخصصات العلمية و850 ريال للتخصصات الأدبية." },
        { question: "هل تُصرف في الإجازات؟", answer: "لا تُصرف عادةً خلال الإجازة الصيفية." },
        { question: "ما شروط صرف المكافأة؟", answer: "الانتظام في الدراسة وعدم تجاوز الحد المسموح من الغياب." },
      ]}
      faqsEn={[
        { question: "When is the stipend paid?", answer: "Usually around the 28th of each month." },
        { question: "How much is the stipend?", answer: "1000 SAR for science majors, 850 SAR for humanities." },
        { question: "Is it paid during summer break?", answer: "Usually not paid during summer vacation." },
      ]}
      relatedItems={[
        { labelAr: "مواعيد الرواتب", labelEn: "Salary Dates", href: "/countdowns/salaries-dates" },
        { labelAr: "حاسبة المعدل التراكمي", labelEn: "GPA Calculator", href: "/calculators/gpa" },
        { labelAr: "حساب المواطن", labelEn: "Citizen Account", href: "/countdowns/citizen-account" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
