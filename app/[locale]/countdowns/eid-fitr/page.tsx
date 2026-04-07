import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CountdownPageTemplate from "@/components/countdown/CountdownPageTemplate";
import { getNextEventDate } from "@/lib/events/islamic-events";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "كم باقي على عيد الفطر 2026؟ | عداد تنازلي" : "Eid Al-Fitr 2026 Countdown",
    description: isAr
      ? "عداد تنازلي دقيق لعيد الفطر المبارك 2026 / 1447 هـ. اعرف كم باقي على العيد بالأيام والساعات."
      : "Accurate countdown to Eid Al-Fitr 2026 / 1447 AH.",
    alternates: { canonical: `/${locale}/countdowns/eid-fitr` },
  };
}

function PageContent() {
  const targetDate = getNextEventDate("eid-fitr") || new Date("2026-03-20");
  return (
    <CountdownPageTemplate
      icon="🎉"
      titleAr="عيد الفطر المبارك"
      titleEn="Eid Al-Fitr"
      questionAr="كم باقي على عيد الفطر؟"
      questionEn="How long until Eid Al-Fitr?"
      subtitleAr="عيد الفطر 2026 — 1 شوال 1447 هـ"
      subtitleEn="Eid Al-Fitr 2026 — 1 Shawwal 1447 AH"
      targetDate={targetDate}
      gradient="from-emerald-500 to-teal-600"
      breadcrumbLabelAr="عداد عيد الفطر"
      breadcrumbLabelEn="Eid Al-Fitr Countdown"
      contentAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            عيد الفطر هو أول أعياد المسلمين، يأتي بعد صيام شهر رمضان المبارك في اليوم الأول من شهر شوال.
            يُحتفل به في جميع أنحاء المملكة العربية السعودية بصلاة العيد والزيارات العائلية وتبادل التهاني.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            يستمر عيد الفطر عادةً ثلاثة أيام، وتكون إجازة رسمية في المملكة. يُستحب فيه إخراج زكاة الفطر
            قبل صلاة العيد، ولبس أفضل الثياب، والتكبير والتهليل.
          </p>
        </>
      }
      contentEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Eid Al-Fitr marks the end of Ramadan and is celebrated on the 1st of Shawwal. It is one of
            the most important holidays in Saudi Arabia, featuring Eid prayers, family gatherings, and gift-giving.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The celebration typically lasts three days and is an official holiday in the Kingdom. Muslims
            pay Zakat Al-Fitr before the Eid prayer and wear their best clothes for the occasion.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى عيد الفطر 2026؟", answer: "من المتوقع أن يكون عيد الفطر 1447 هـ في 20 مارس 2026 ميلادي تقريباً." },
        { question: "كم يوم إجازة عيد الفطر؟", answer: "إجازة عيد الفطر في السعودية عادةً تكون من 4-5 أيام للقطاع الحكومي." },
        { question: "ما هي زكاة الفطر؟", answer: "زكاة الفطر واجبة على كل مسلم، وتُخرج قبل صلاة العيد. مقدارها صاع من قوت البلد (حوالي 3 كغ من الأرز)." },
        { question: "متى تكون صلاة العيد؟", answer: "تُصلى صلاة عيد الفطر بعد شروق الشمس بحوالي 15-20 دقيقة." },
      ]}
      faqsEn={[
        { question: "When is Eid Al-Fitr 2026?", answer: "Eid Al-Fitr 1447 AH is expected around March 20, 2026." },
        { question: "How many days is the Eid holiday?", answer: "Eid Al-Fitr holiday in Saudi Arabia is usually 4-5 days for government employees." },
        { question: "What is Zakat Al-Fitr?", answer: "Zakat Al-Fitr is obligatory for every Muslim, paid before Eid prayer. It equals approximately 3 kg of staple food." },
      ]}
      relatedItems={[
        { labelAr: "عداد رمضان", labelEn: "Ramadan Countdown", href: "/countdowns/ramadan" },
        { labelAr: "عداد عيد الأضحى", labelEn: "Eid Al-Adha Countdown", href: "/countdowns/eid-adha" },
        { labelAr: "حاسبة زكاة الفطر", labelEn: "Zakat Al-Fitr Calculator", href: "/calculators/zakat" },
        { labelAr: "عداد الراتب", labelEn: "Salary Countdown", href: "/countdowns/salaries-dates" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
