import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CountdownPageTemplate from "@/components/countdown/CountdownPageTemplate";
import { getNextNationalEventDate } from "@/lib/events/national-events";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "كم باقي على اليوم الوطني السعودي 94؟" : "Saudi National Day Countdown",
    description: isAr ? "عداد تنازلي لليوم الوطني السعودي 23 سبتمبر." : "Countdown to Saudi National Day, September 23.",
    alternates: { canonical: `/${locale}/countdowns/national-day` },
  };
}

function PageContent() {
  const targetDate = getNextNationalEventDate("national-day") || new Date("2026-09-23");
  return (
    <CountdownPageTemplate
      icon="🇸🇦"
      titleAr="اليوم الوطني السعودي"
      titleEn="Saudi National Day"
      questionAr="كم باقي على اليوم الوطني؟"
      questionEn="How long until Saudi National Day?"
      subtitleAr="23 سبتمبر — اليوم الوطني السعودي"
      subtitleEn="September 23 — Saudi National Day"
      targetDate={targetDate}
      gradient="from-green-600 to-green-800"
      breadcrumbLabelAr="اليوم الوطني"
      breadcrumbLabelEn="National Day"
      contentAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            اليوم الوطني السعودي يُحتفل به في 23 سبتمبر من كل عام، وهو ذكرى توحيد المملكة العربية السعودية
            على يد الملك عبدالعزيز بن عبدالرحمن آل سعود عام 1932م.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            يُعد اليوم الوطني من أهم المناسبات في المملكة، حيث تُقام الاحتفالات والفعاليات في جميع
            مناطق المملكة، وتُزيَّن الشوارع والمباني باللونين الأخضر والأبيض.
          </p>
        </>
      }
      contentEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Saudi National Day is celebrated on September 23rd, commemorating the unification of
            the Kingdom by King Abdulaziz bin Abdulrahman Al Saud in 1932.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            It is one of the most important occasions in the Kingdom, with celebrations and events
            held across all regions, and buildings decorated in green and white.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى اليوم الوطني السعودي؟", answer: "23 سبتمبر من كل عام ميلادي." },
        { question: "لماذا نحتفل باليوم الوطني؟", answer: "إحياءً لذكرى توحيد المملكة العربية السعودية عام 1932م (1351 هـ)." },
        { question: "هل اليوم الوطني إجازة رسمية؟", answer: "نعم، هو إجازة رسمية لجميع القطاعات الحكومية والخاصة." },
        { question: "ما رقم اليوم الوطني القادم؟", answer: "اليوم الوطني 96 يكون في 23 سبتمبر 2026." },
      ]}
      faqsEn={[
        { question: "When is Saudi National Day?", answer: "September 23rd every year." },
        { question: "Why is National Day celebrated?", answer: "To commemorate the unification of Saudi Arabia in 1932." },
        { question: "Is it an official holiday?", answer: "Yes, it's an official holiday for all government and private sectors." },
      ]}
      relatedItems={[
        { labelAr: "يوم التأسيس", labelEn: "Foundation Day", href: "/countdowns/foundation-day" },
        { labelAr: "يوم العلم", labelEn: "Flag Day", href: "/countdowns/flag-day" },
        { labelAr: "عداد رمضان", labelEn: "Ramadan", href: "/countdowns/ramadan" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
