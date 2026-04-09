import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CountdownPageTemplate from "@/components/countdown/CountdownPageTemplate";
import { getNextNationalEventDate } from "@/lib/events/national-events";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr ? "كم باقي على يوم العلم السعودي 2026؟" : "Saudi Flag Day Countdown";
  const description = isAr ? "عداد تنازلي ليوم العلم 11 مارس." : "Countdown to Saudi Flag Day, March 11.";
  return {
    title,
    description,
    ...generatePageSEO(locale, "/countdowns/flag-day", { title, description }),
  };
}

function PageContent() {
  const targetDate = getNextNationalEventDate("flag-day") || new Date("2026-03-11");
  return (
    <CountdownPageTemplate
      icon="🏴"
      titleAr="يوم العلم السعودي"
      titleEn="Saudi Flag Day"
      questionAr="كم باقي على يوم العلم؟"
      questionEn="How long until Flag Day?"
      subtitleAr="11 مارس — يوم العلم"
      subtitleEn="March 11 — Flag Day"
      targetDate={targetDate}
      gradient="from-green-700 to-emerald-800"
      breadcrumbLabelAr="يوم العلم"
      breadcrumbLabelEn="Flag Day"
      contentAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            يوم العلم السعودي يُحتفل به في 11 مارس من كل عام، وهو يوم اعتماد الملك عبدالعزيز
            للعلم السعودي بشكله الحالي. يرمز العلم الأخضر بالشهادتين والسيف إلى التوحيد والقوة.
          </p>
        </>
      }
      contentEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Saudi Flag Day is celebrated on March 11th, marking King Abdulaziz&apos;s adoption of
            the Saudi flag in its current form. The green flag with the Shahada and sword symbolizes
            unity and strength.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى يوم العلم السعودي؟", answer: "11 مارس من كل عام." },
        { question: "ماذا يرمز العلم السعودي؟", answer: "اللون الأخضر يرمز للإسلام، والشهادتان تعبّران عن التوحيد، والسيف يرمز للقوة والعدل." },
        { question: "هل يوم العلم إجازة رسمية؟", answer: "لا، يوم العلم ليس إجازة رسمية لكنه مناسبة وطنية تُحتفل بها." },
      ]}
      faqsEn={[
        { question: "When is Saudi Flag Day?", answer: "March 11th every year." },
        { question: "What does the Saudi flag symbolize?", answer: "The green color represents Islam, the Shahada represents monotheism, and the sword represents strength and justice." },
        { question: "Is Flag Day an official holiday?", answer: "No, but it's a national occasion that is celebrated." },
      ]}
      relatedItems={[
        { labelAr: "اليوم الوطني", labelEn: "National Day", href: "/countdowns/national-day" },
        { labelAr: "يوم التأسيس", labelEn: "Foundation Day", href: "/countdowns/foundation-day" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
