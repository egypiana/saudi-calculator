import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SalaryCountdownPage from "@/components/countdown/SalaryCountdownPage";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "كم باقي على الراتب؟ | مواعيد الرواتب الحكومية" : "Saudi Government Salary Dates",
    description: isAr ? "عداد تنازلي لموعد صرف الرواتب الحكومية. اعرف كم باقي على الراتب." : "Countdown to Saudi government salary payment dates.",
    alternates: { canonical: locale === "ar" ? "/countdowns/salaries-dates" : `/${locale}/countdowns/salaries-dates` },
  };
}

function PageContent() {
  return (
    <SalaryCountdownPage
      icon="💵"
      titleAr="مواعيد صرف الرواتب الحكومية"
      titleEn="Government Salary Payment Dates"
      questionAr="كم باقي على الراتب؟"
      questionEn="How long until next salary?"
      dayOfMonth={27}
      gradient="from-green-500 to-emerald-600"
      breadcrumbAr="مواعيد الرواتب"
      breadcrumbEn="Salary Dates"
      descriptionAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            تُصرف رواتب موظفي القطاع الحكومي في المملكة العربية السعودية عادةً في اليوم 27 من كل شهر ميلادي.
            إذا صادف يوم السبت أو الأحد (عطلة نهاية الأسبوع)، يُصرف الراتب في يوم الخميس السابق.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            يشمل الراتب الحكومي: الراتب الأساسي، بدل السكن، بدل النقل، والعلاوات. يُخصم من الراتب
            اشتراك التأمينات الاجتماعية بنسبة 9.75% من الراتب الأساسي.
          </p>
        </>
      }
      descriptionEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Saudi government employees typically receive their salaries on the 27th of each Gregorian month.
            If it falls on a weekend, payment is made on the preceding Thursday.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Government salary includes base salary, housing allowance, transportation allowance, and bonuses.
            Social insurance (GOSI) deduction is 9.75% of the base salary.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى ينزل الراتب الحكومي؟", answer: "عادةً في اليوم 27 من كل شهر ميلادي." },
        { question: "ماذا لو صادف يوم 27 عطلة؟", answer: "يُصرف الراتب في آخر يوم عمل قبل العطلة." },
        { question: "كم نسبة خصم التأمينات؟", answer: "9.75% من الراتب الأساسي للموظف." },
        { question: "هل يشمل العداد القطاع الخاص؟", answer: "هذا العداد خاص بالقطاع الحكومي. مواعيد القطاع الخاص تختلف حسب الشركة." },
      ]}
      faqsEn={[
        { question: "When are government salaries paid?", answer: "Usually on the 27th of each month." },
        { question: "What if the 27th is a weekend?", answer: "Salary is paid on the last working day before the weekend." },
        { question: "What is the GOSI deduction rate?", answer: "9.75% of the basic salary." },
      ]}
      relatedItems={[
        { labelAr: "حساب المواطن", labelEn: "Citizen Account", href: "/countdowns/citizen-account" },
        { labelAr: "الضمان الاجتماعي", labelEn: "Social Security", href: "/countdowns/social-security" },
        { labelAr: "رواتب المتقاعدين", labelEn: "Pension", href: "/countdowns/pension-salaries" },
        { labelAr: "حاسبة الراتب", labelEn: "Salary Calculator", href: "/calculators/salary" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
