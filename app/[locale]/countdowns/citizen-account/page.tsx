import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SalaryCountdownPage from "@/components/countdown/SalaryCountdownPage";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "كم باقي على حساب المواطن؟ | موعد الصرف" : "Citizen Account Payment Countdown",
    description: isAr ? "عداد تنازلي لموعد صرف دعم حساب المواطن." : "Countdown to Citizen Account (Hafiz) payment.",
    alternates: { canonical: `/${locale}/countdowns/citizen-account` },
  };
}

function PageContent() {
  return (
    <SalaryCountdownPage
      icon="🏦"
      titleAr="برنامج حساب المواطن"
      titleEn="Citizen Account Program"
      questionAr="كم باقي على حساب المواطن؟"
      questionEn="How long until Citizen Account payment?"
      dayOfMonth={10}
      gradient="from-blue-500 to-blue-700"
      breadcrumbAr="حساب المواطن"
      breadcrumbEn="Citizen Account"
      descriptionAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            برنامج حساب المواطن هو برنامج حكومي سعودي يقدم دعماً نقدياً مباشراً للأسر السعودية
            ذات الدخل المنخفض والمتوسط. يُصرف الدعم عادةً في اليوم العاشر من كل شهر ميلادي.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            يهدف البرنامج إلى حماية الأسر من الأثر المباشر وغير المباشر للإصلاحات الاقتصادية،
            خاصة ما يتعلق بإعادة توجيه الدعم الحكومي.
          </p>
        </>
      }
      descriptionEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The Citizen Account is a Saudi government program providing direct cash support to low
            and middle-income Saudi families. Payments are usually made on the 10th of each month.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى ينزل حساب المواطن؟", answer: "يوم 10 من كل شهر ميلادي." },
        { question: "كيف أسجل في حساب المواطن؟", answer: "عبر البوابة الإلكترونية ca.gov.sa أو تطبيق حساب المواطن." },
        { question: "ما شروط الأهلية؟", answer: "الجنسية السعودية، الإقامة في المملكة، ألا يتجاوز الدخل الحد المانع." },
        { question: "كم مبلغ الدعم؟", answer: "يختلف حسب عدد أفراد الأسرة والدخل. الحد الأقصى للفرد المستقل حوالي 1000 ريال." },
      ]}
      faqsEn={[
        { question: "When is Citizen Account paid?", answer: "10th of each month." },
        { question: "How to register?", answer: "Through ca.gov.sa or the Citizen Account app." },
        { question: "What are the eligibility requirements?", answer: "Saudi nationality, residency in the Kingdom, and income below the threshold." },
      ]}
      relatedItems={[
        { labelAr: "مواعيد الرواتب", labelEn: "Salary Dates", href: "/countdowns/salaries-dates" },
        { labelAr: "الضمان الاجتماعي", labelEn: "Social Security", href: "/countdowns/social-security" },
        { labelAr: "ساند", labelEn: "SANED", href: "/countdowns/saned-payment" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
