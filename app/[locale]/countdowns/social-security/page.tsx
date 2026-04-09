import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SalaryCountdownPage from "@/components/countdown/SalaryCountdownPage";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "كم باقي على الضمان الاجتماعي؟" : "Social Security Payment Countdown",
    description: isAr ? "عداد تنازلي لموعد صرف الضمان الاجتماعي المطور." : "Countdown to Social Security payment.",
    alternates: { canonical: locale === "ar" ? "/countdowns/social-security" : `/${locale}/countdowns/social-security` },
  };
}

function PageContent() {
  return (
    <SalaryCountdownPage
      icon="🛡️"
      titleAr="الضمان الاجتماعي المطور"
      titleEn="Social Security (Daman)"
      questionAr="كم باقي على الضمان الاجتماعي؟"
      questionEn="How long until Social Security payment?"
      dayOfMonth={1}
      gradient="from-teal-500 to-teal-700"
      breadcrumbAr="الضمان الاجتماعي"
      breadcrumbEn="Social Security"
      descriptionAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            الضمان الاجتماعي المطور هو نظام الحماية الاجتماعية الذي يوفر معاشاً شهرياً للأسر
            الأكثر احتياجاً في المملكة. يُصرف عادةً في أول كل شهر ميلادي.
          </p>
        </>
      }
      descriptionEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The Social Security system provides monthly pensions to the most vulnerable families
            in Saudi Arabia. Payments are typically made on the 1st of each month.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى ينزل الضمان الاجتماعي؟", answer: "عادةً في أول كل شهر ميلادي." },
        { question: "كيف أسجل في الضمان المطور؟", answer: "عبر منصة الدعم والحماية الاجتماعية sbis.hrsd.gov.sa" },
        { question: "ما شروط الاستحقاق؟", answer: "الجنسية السعودية (مع استثناءات)، الإقامة الدائمة، الدخل أقل من الحد الأدنى." },
      ]}
      faqsEn={[
        { question: "When is Social Security paid?", answer: "Usually on the 1st of each month." },
        { question: "How to apply?", answer: "Through the Social Protection platform sbis.hrsd.gov.sa" },
      ]}
      relatedItems={[
        { labelAr: "حساب المواطن", labelEn: "Citizen Account", href: "/countdowns/citizen-account" },
        { labelAr: "مواعيد الرواتب", labelEn: "Salary Dates", href: "/countdowns/salaries-dates" },
        { labelAr: "رواتب المتقاعدين", labelEn: "Pension", href: "/countdowns/pension-salaries" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
