import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SalaryCountdownPage from "@/components/countdown/SalaryCountdownPage";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "كم باقي على دعم ساند؟" : "SANED Payment Countdown",
    description: isAr ? "عداد تنازلي لموعد صرف دعم ساند للتعطل عن العمل." : "Countdown to SANED unemployment support payment.",
    alternates: { canonical: `/${locale}/countdowns/saned-payment` },
  };
}

function PageContent() {
  return (
    <SalaryCountdownPage
      icon="📋"
      titleAr="نظام ساند (التأمين ضد التعطل)"
      titleEn="SANED (Unemployment Insurance)"
      questionAr="كم باقي على دعم ساند؟"
      questionEn="How long until SANED payment?"
      dayOfMonth={5}
      gradient="from-cyan-500 to-cyan-700"
      breadcrumbAr="دعم ساند"
      breadcrumbEn="SANED"
      descriptionAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            نظام ساند هو نظام التأمين ضد التعطل عن العمل في المملكة العربية السعودية.
            يوفر تعويضاً شهرياً للسعوديين المتعطلين عن العمل لأسباب خارجة عن إرادتهم.
          </p>
        </>
      }
      descriptionEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            SANED is the unemployment insurance system in Saudi Arabia, providing monthly
            compensation to Saudis who become unemployed through no fault of their own.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى ينزل دعم ساند؟", answer: "عادةً في الأيام الأولى من كل شهر ميلادي." },
        { question: "كم مدة صرف ساند؟", answer: "حتى 12 شهراً متصلة أو متقطعة." },
        { question: "كم مبلغ ساند؟", answer: "60% من الراتب المسجل في أول 3 أشهر، و50% في الأشهر المتبقية." },
      ]}
      faqsEn={[
        { question: "When is SANED paid?", answer: "Usually in the first days of each month." },
        { question: "How long does SANED last?", answer: "Up to 12 months, continuous or intermittent." },
        { question: "How much is SANED?", answer: "60% of registered salary for first 3 months, 50% for remaining months." },
      ]}
      relatedItems={[
        { labelAr: "مواعيد الرواتب", labelEn: "Salary Dates", href: "/countdowns/salaries-dates" },
        { labelAr: "حساب المواطن", labelEn: "Citizen Account", href: "/countdowns/citizen-account" },
        { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
