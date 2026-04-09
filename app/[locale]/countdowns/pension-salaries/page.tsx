import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SalaryCountdownPage from "@/components/countdown/SalaryCountdownPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr ? "كم باقي على راتب التقاعد؟" : "Pension Salary Countdown";
  const description = isAr ? "عداد تنازلي لموعد صرف رواتب المتقاعدين." : "Countdown to pension salary payment.";
  return {
    title,
    description,
    ...generatePageSEO(locale, "/countdowns/pension-salaries", { title, description }),
  };
}

function PageContent() {
  return (
    <SalaryCountdownPage
      icon="👴"
      titleAr="رواتب المتقاعدين"
      titleEn="Pension Salaries"
      questionAr="كم باقي على راتب التقاعد؟"
      questionEn="How long until pension payment?"
      dayOfMonth={25}
      gradient="from-indigo-500 to-indigo-700"
      breadcrumbAr="رواتب المتقاعدين"
      breadcrumbEn="Pension Salaries"
      descriptionAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            تُصرف رواتب المتقاعدين عبر المؤسسة العامة للتقاعد عادةً في اليوم 25 من كل شهر ميلادي.
            يشمل ذلك متقاعدي القطاعين المدني والعسكري.
          </p>
        </>
      }
      descriptionEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Pension salaries are paid through the General Organization for Social Insurance (GOSI)
            usually on the 25th of each month, covering both civil and military retirees.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى ينزل راتب التقاعد؟", answer: "عادةً في يوم 25 من كل شهر ميلادي." },
        { question: "كيف أستعلم عن راتبي التقاعدي؟", answer: "عبر بوابة المؤسسة العامة للتأمينات الاجتماعية gosi.gov.sa" },
        { question: "هل يشمل المتقاعدين العسكريين؟", answer: "نعم، يشمل متقاعدي القطاعين المدني والعسكري." },
      ]}
      faqsEn={[
        { question: "When is the pension paid?", answer: "Usually on the 25th of each month." },
        { question: "How to check my pension?", answer: "Through the GOSI portal gosi.gov.sa" },
      ]}
      relatedItems={[
        { labelAr: "مواعيد الرواتب", labelEn: "Salary Dates", href: "/countdowns/salaries-dates" },
        { labelAr: "الضمان الاجتماعي", labelEn: "Social Security", href: "/countdowns/social-security" },
        { labelAr: "حاسبة نهاية الخدمة", labelEn: "End of Service", href: "/calculators/end-of-service" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
