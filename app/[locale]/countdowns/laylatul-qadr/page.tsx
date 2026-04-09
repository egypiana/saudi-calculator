import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CountdownPageTemplate from "@/components/countdown/CountdownPageTemplate";
import { getNextEventDate } from "@/lib/events/islamic-events";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "كم باقي على ليلة القدر 2026؟" : "Laylatul Qadr 2026 Countdown",
    description: isAr ? "عداد تنازلي لليلة القدر المباركة." : "Countdown to the blessed Night of Power.",
    alternates: { canonical: locale === "ar" ? "/countdowns/laylatul-qadr" : `/${locale}/countdowns/laylatul-qadr` },
  };
}

function PageContent() {
  const targetDate = getNextEventDate("laylatul-qadr") || new Date("2026-03-16");
  return (
    <CountdownPageTemplate
      icon="✨"
      titleAr="ليلة القدر"
      titleEn="Laylatul Qadr (Night of Power)"
      questionAr="كم باقي على ليلة القدر؟"
      questionEn="How long until Laylatul Qadr?"
      subtitleAr="ليلة القدر — 27 رمضان 1447 هـ (تقريبي)"
      subtitleEn="Laylatul Qadr — 27 Ramadan 1447 AH (approx.)"
      targetDate={targetDate}
      gradient="from-violet-600 to-purple-800"
      breadcrumbLabelAr="ليلة القدر"
      breadcrumbLabelEn="Laylatul Qadr"
      contentAr={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            ليلة القدر هي أعظم ليالي العام، أنزل فيها القرآن الكريم. قال تعالى: &quot;ليلة القدر خير من ألف شهر&quot;.
            وهي في إحدى الليالي الوترية من العشر الأواخر من رمضان.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            يُستحب في هذه الليلة الإكثار من العبادة والدعاء وقراءة القرآن وصلاة القيام.
            أرجح الأقوال أنها ليلة السابع والعشرين من رمضان.
          </p>
        </>
      }
      contentEn={
        <>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Laylatul Qadr (the Night of Power) is the most blessed night of the year, when the Quran
            was first revealed. It is &quot;better than a thousand months&quot; (Quran 97:3).
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            It falls on one of the odd nights of the last ten days of Ramadan, most likely the 27th.
            Muslims spend this night in prayer, supplication, and Quran recitation.
          </p>
        </>
      }
      faqsAr={[
        { question: "متى ليلة القدر؟", answer: "ليلة القدر في إحدى الليالي الوترية من العشر الأواخر (21، 23، 25، 27، 29). أرجح الأقوال ليلة 27." },
        { question: "ما فضل ليلة القدر؟", answer: "العبادة فيها خير من عبادة ألف شهر (83 سنة تقريباً)." },
        { question: "ما دعاء ليلة القدر؟", answer: "اللهم إنك عفو تحب العفو فاعفُ عني." },
        { question: "كيف أعرف أنها ليلة القدر؟", answer: "من علاماتها: ليلة هادئة معتدلة، والشمس تطلع صبيحتها بيضاء لا شعاع لها." },
      ]}
      faqsEn={[
        { question: "When is Laylatul Qadr?", answer: "It falls on one of the odd nights of the last 10 days of Ramadan (21, 23, 25, 27, 29). Most likely the 27th." },
        { question: "What is the virtue of Laylatul Qadr?", answer: "Worship on this night is better than worship for a thousand months (~83 years)." },
        { question: "What is the dua for Laylatul Qadr?", answer: "Allahumma innaka afuwwun tuhibbul afwa fa'fu anni (O Allah, You are forgiving and love forgiveness, so forgive me)." },
      ]}
      relatedItems={[
        { labelAr: "عداد رمضان", labelEn: "Ramadan", href: "/countdowns/ramadan" },
        { labelAr: "عداد عيد الفطر", labelEn: "Eid Al-Fitr", href: "/countdowns/eid-fitr" },
        { labelAr: "حاسبة الزكاة", labelEn: "Zakat Calculator", href: "/calculators/zakat" },
      ]}
    />
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent />;
}
