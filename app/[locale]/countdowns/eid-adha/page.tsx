import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CountdownPageTemplate from "@/components/countdown/CountdownPageTemplate";
import { getNextEventDate } from "@/lib/events/islamic-events";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "كم باقي على عيد الأضحى 2026؟ | عداد تنازلي" : "Eid Al-Adha 2026 Countdown",
    description: isAr
      ? "عداد تنازلي لعيد الأضحى المبارك 2026 / 1447 هـ. اعرف كم باقي على عيد الأضحى."
      : "Countdown to Eid Al-Adha 2026 / 1447 AH.",
    alternates: { canonical: `/${locale}/countdowns/eid-adha` },
  };
}

function PageContent() {
  const targetDate = getNextEventDate("eid-adha") || new Date("2026-05-27");
  return (
    <CountdownPageTemplate
      icon="🐑"
      titleAr="عيد الأضحى المبارك"
      titleEn="Eid Al-Adha"
      questionAr="كم باقي على عيد الأضحى؟"
      questionEn="How long until Eid Al-Adha?"
      subtitleAr="عيد الأضحى 2026 — 10 ذو الحجة 1447 هـ"
      subtitleEn="Eid Al-Adha 2026 — 10 Dhul-Hijjah 1447 AH"
      targetDate={targetDate}
      gradient="from-amber-500 to-orange-600"
      breadcrumbLabelAr="عداد عيد الأضحى"
      breadcrumbLabelEn="Eid Al-Adha Countdown"
      contentAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            عيد الأضحى هو ثاني أعياد المسلمين ويُعرف بالعيد الكبير. يقع في العاشر من ذي الحجة
            ويرتبط بموسم الحج وقصة نبي الله إبراهيم عليه السلام.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            يتميز العيد بذبح الأضاحي تقرباً لله تعالى، وتوزيع اللحوم على الفقراء والأقارب.
            تستمر إجازة العيد عادةً خمسة أيام في المملكة العربية السعودية.
          </p>
        </>
      }
      contentEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Eid Al-Adha is the second major Islamic holiday, falling on the 10th of Dhul-Hijjah.
            It commemorates Prophet Ibrahim&apos;s willingness to sacrifice his son and coincides with the Hajj pilgrimage.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The holiday is marked by the sacrifice of livestock (Udhiyah), with meat distributed to
            family, friends, and the poor. The holiday typically lasts 4-5 days in Saudi Arabia.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى عيد الأضحى 2026؟", answer: "من المتوقع أن يكون عيد الأضحى 1447 هـ في 27 مايو 2026 ميلادي تقريباً." },
        { question: "ما هي الأضحية؟", answer: "الأضحية سنة مؤكدة، وهي ذبح حيوان (خروف أو بقرة أو جمل) في أيام العيد تقرباً لله." },
        { question: "كم يوم إجازة عيد الأضحى؟", answer: "إجازة عيد الأضحى في السعودية عادةً 5 أيام للقطاع الحكومي." },
        { question: "ما أيام التشريق؟", answer: "أيام التشريق هي الأيام الثلاثة بعد يوم النحر (11، 12، 13 ذي الحجة)." },
      ]}
      faqsEn={[
        { question: "When is Eid Al-Adha 2026?", answer: "Eid Al-Adha 1447 AH is expected around May 27, 2026." },
        { question: "What is Udhiyah?", answer: "Udhiyah is the sacrifice of livestock during Eid Al-Adha as an act of worship." },
        { question: "How long is the Eid Al-Adha holiday?", answer: "The holiday is typically 4-5 days in Saudi Arabia." },
      ]}
      relatedItems={[
        { labelAr: "عداد الحج", labelEn: "Hajj Countdown", href: "/countdowns/hajj" },
        { labelAr: "عداد عيد الفطر", labelEn: "Eid Al-Fitr Countdown", href: "/countdowns/eid-fitr" },
        { labelAr: "عداد رمضان", labelEn: "Ramadan Countdown", href: "/countdowns/ramadan" },
        { labelAr: "اليوم الوطني", labelEn: "National Day", href: "/countdowns/national-day" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
