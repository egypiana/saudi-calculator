import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CountdownPageTemplate from "@/components/countdown/CountdownPageTemplate";
import { getNextNationalEventDate } from "@/lib/events/national-events";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "كم باقي على يوم التأسيس 2026؟" : "Saudi Foundation Day Countdown",
    description: isAr ? "عداد تنازلي ليوم التأسيس السعودي 22 فبراير." : "Countdown to Saudi Foundation Day, February 22.",
    alternates: { canonical: locale === "ar" ? "/countdowns/foundation-day" : `/${locale}/countdowns/foundation-day` },
  };
}

function PageContent() {
  const targetDate = getNextNationalEventDate("foundation-day") || new Date("2026-02-22");
  return (
    <CountdownPageTemplate
      icon="🏛️"
      titleAr="يوم التأسيس السعودي"
      titleEn="Saudi Foundation Day"
      questionAr="كم باقي على يوم التأسيس؟"
      questionEn="How long until Foundation Day?"
      subtitleAr="22 فبراير — يوم التأسيس"
      subtitleEn="February 22 — Foundation Day"
      targetDate={targetDate}
      gradient="from-amber-600 to-yellow-700"
      breadcrumbLabelAr="يوم التأسيس"
      breadcrumbLabelEn="Foundation Day"
      contentAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            يوم التأسيس يُحتفل به في 22 فبراير من كل عام، ويُخلّد ذكرى تأسيس الدولة السعودية الأولى
            عام 1727م على يد الإمام محمد بن سعود.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            أصبح يوم التأسيس إجازة رسمية اعتباراً من عام 2022، ويُحتفل به بفعاليات ثقافية وتراثية
            تعكس عمق التاريخ السعودي وتراثه العريق.
          </p>
        </>
      }
      contentEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Foundation Day is celebrated on February 22nd, commemorating the establishment of the
            First Saudi State in 1727 by Imam Muhammad bin Saud.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            It became an official holiday in 2022, celebrated with cultural and heritage events
            reflecting Saudi Arabia&apos;s deep history and rich heritage.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى يوم التأسيس؟", answer: "22 فبراير من كل عام." },
        { question: "ما الفرق بين اليوم الوطني ويوم التأسيس؟", answer: "اليوم الوطني (23 سبتمبر) يحتفل بتوحيد المملكة 1932، ويوم التأسيس (22 فبراير) يحتفل بتأسيس الدولة السعودية الأولى 1727." },
        { question: "هل يوم التأسيس إجازة رسمية؟", answer: "نعم، إجازة رسمية لجميع القطاعات." },
      ]}
      faqsEn={[
        { question: "When is Foundation Day?", answer: "February 22nd every year." },
        { question: "What's the difference between National Day and Foundation Day?", answer: "National Day (Sep 23) celebrates the 1932 unification; Foundation Day (Feb 22) celebrates the 1727 First Saudi State." },
        { question: "Is Foundation Day an official holiday?", answer: "Yes, it's an official holiday for all sectors." },
      ]}
      relatedItems={[
        { labelAr: "اليوم الوطني", labelEn: "National Day", href: "/countdowns/national-day" },
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
