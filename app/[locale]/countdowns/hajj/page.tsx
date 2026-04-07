import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CountdownPageTemplate from "@/components/countdown/CountdownPageTemplate";
import { getNextEventDate } from "@/lib/events/islamic-events";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "كم باقي على الحج 2026؟ | عداد موسم الحج" : "Hajj 2026 Countdown",
    description: isAr ? "عداد تنازلي لموسم الحج 1447 هـ." : "Countdown to Hajj season 1447 AH.",
    alternates: { canonical: `/${locale}/countdowns/hajj` },
  };
}

function PageContent() {
  const targetDate = getNextEventDate("hajj") || new Date("2026-05-25");
  return (
    <CountdownPageTemplate
      icon="🕋"
      titleAr="موسم الحج"
      titleEn="Hajj Season"
      questionAr="كم باقي على الحج؟"
      questionEn="How long until Hajj?"
      subtitleAr="الحج 2026 — 1447 هـ"
      subtitleEn="Hajj 2026 — 1447 AH"
      targetDate={targetDate}
      gradient="from-stone-600 to-stone-800"
      breadcrumbLabelAr="عداد الحج"
      breadcrumbLabelEn="Hajj Countdown"
      contentAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            الحج هو الركن الخامس من أركان الإسلام، يجب على كل مسلم بالغ عاقل قادر مرة واحدة في العمر.
            يؤدى في مكة المكرمة في الأيام من 8 إلى 13 من شهر ذي الحجة.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            تستقبل المملكة العربية السعودية ملايين الحجاج سنوياً من جميع أنحاء العالم.
            تشمل مناسك الحج الإحرام والطواف والسعي والوقوف بعرفة ورمي الجمرات.
          </p>
        </>
      }
      contentEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Hajj is the fifth pillar of Islam, obligatory once in a lifetime for every able Muslim.
            It takes place in Makkah from the 8th to 13th of Dhul-Hijjah.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Saudi Arabia welcomes millions of pilgrims annually. The rituals include Ihram, Tawaf,
            Sa&apos;i, standing at Arafat, and stoning the Jamarat.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى موسم الحج 2026؟", answer: "يبدأ الحج من 8 ذي الحجة 1447 هـ، الموافق تقريباً 25 مايو 2026." },
        { question: "كم يوم يستغرق الحج؟", answer: "مناسك الحج تستغرق من 5 إلى 6 أيام." },
        { question: "ما شروط الحج؟", answer: "الإسلام، البلوغ، العقل، الحرية، الاستطاعة المالية والبدنية." },
        { question: "كيف أسجل في الحج؟", answer: "يتم التسجيل عبر منصة نسك الإلكترونية التابعة لوزارة الحج والعمرة." },
      ]}
      faqsEn={[
        { question: "When is Hajj 2026?", answer: "Hajj starts on 8 Dhul-Hijjah 1447 AH, approximately May 25, 2026." },
        { question: "How long does Hajj last?", answer: "The Hajj rituals take 5-6 days." },
        { question: "How to register for Hajj?", answer: "Registration is through the Nusuk platform by the Ministry of Hajj and Umrah." },
      ]}
      relatedItems={[
        { labelAr: "عداد عيد الأضحى", labelEn: "Eid Al-Adha", href: "/countdowns/eid-adha" },
        { labelAr: "عداد رمضان", labelEn: "Ramadan", href: "/countdowns/ramadan" },
        { labelAr: "ليلة القدر", labelEn: "Laylatul Qadr", href: "/countdowns/laylatul-qadr" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
