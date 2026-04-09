import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HijriConverter from "@/components/calculators/HijriConverter";
import FAQSection from "@/components/shared/FAQSection";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { lp } from "@/lib/utils/locale";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr ? "التقويم الهجري — تحويل التاريخ الميلادي إلى هجري" : "Hijri Calendar — Gregorian to Hijri Converter",
    description: isAr
      ? "حول التاريخ الميلادي إلى هجري والعكس. اعرف التاريخ الهجري اليوم والأشهر الهجرية."
      : "Convert Gregorian dates to Hijri and vice versa. Know today's Hijri date and Hijri months.",
    alternates: { canonical: locale === "ar" ? "/hijri-calendar" : `/${locale}/hijri-calendar` },
  };
}

function PageContent({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  const faqs = isAr
    ? [
        { question: "ما هو التقويم الهجري؟", answer: "التقويم الهجري (القمري) هو التقويم الإسلامي الذي يبدأ من هجرة النبي محمد ﷺ. يتكون من 12 شهراً قمرياً (354 أو 355 يوماً)." },
        { question: "لماذا يختلف التاريخ الهجري عن الميلادي؟", answer: "لأن السنة الهجرية قمرية (حوالي 354 يوماً) بينما الميلادية شمسية (حوالي 365 يوماً)، لذلك يتقدم التقويم الهجري كل عام بحوالي 11 يوماً." },
        { question: "هل هذا التحويل دقيق 100%؟", answer: "التحويل خوارزمي وقد يختلف بيوم أو يومين عن التقويم الرسمي (أم القرى) لأن بداية الشهر الهجري تعتمد على رؤية الهلال." },
        { question: "ما هو تقويم أم القرى؟", answer: "تقويم أم القرى هو التقويم الهجري الرسمي المعتمد في المملكة العربية السعودية، ويصدر عن معهد أبحاث الفلك والجيوفيزياء." },
      ]
    : [
        { question: "What is the Hijri calendar?", answer: "The Hijri (lunar) calendar is the Islamic calendar starting from Prophet Muhammad's migration. It has 12 lunar months (354 or 355 days per year)." },
        { question: "Why does the Hijri date differ from Gregorian?", answer: "Because the Hijri year is lunar (~354 days) while the Gregorian is solar (~365 days), so the Hijri calendar advances by about 11 days each year." },
        { question: "Is this conversion 100% accurate?", answer: "The conversion is algorithmic and may differ by 1-2 days from the official Umm Al-Qura calendar, as Hijri months depend on moon sighting." },
      ];

  const relatedTools = [
    { labelAr: "عداد رمضان", labelEn: "Ramadan Countdown", href: "/countdowns/ramadan" },
    { labelAr: "حاسبة العمر", labelEn: "Age Calculator", href: "/calculators/age" },
    { labelAr: "عداد عيد الأضحى", labelEn: "Eid Al-Adha Countdown", href: "/countdowns/eid-adha" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ labelAr: "التقويم الهجري", labelEn: "Hijri Calendar" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <HijriConverter />
            <AdSlot id="hijri-mid" size="leaderboard" />

            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {isAr ? "عن التقويم الهجري" : "About the Hijri Calendar"}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-3">
                <p>{isAr
                  ? "التقويم الهجري هو التقويم الإسلامي المعتمد في المملكة العربية السعودية للشؤون الدينية والرسمية. يبدأ من هجرة النبي محمد ﷺ من مكة إلى المدينة عام 622 ميلادي."
                  : "The Hijri calendar is the Islamic calendar used in Saudi Arabia for religious and official matters. It starts from Prophet Muhammad's migration from Makkah to Madinah in 622 CE."
                }</p>
                <p>{isAr
                  ? "يعتمد التقويم الهجري على دورة القمر، حيث يبدأ كل شهر برؤية الهلال. تستخدم المملكة تقويم أم القرى كتقويم رسمي."
                  : "The Hijri calendar is based on the lunar cycle, with each month beginning upon sighting of the crescent moon. Saudi Arabia uses the Umm Al-Qura calendar as its official calendar."
                }</p>
              </div>
            </div>

            <FAQSection faqs={faqs} />
          </div>

          <aside className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">{isAr ? "أدوات ذات صلة" : "Related Tools"}</h3>
              <div className="space-y-2">
                {relatedTools.map((item) => (
                  <Link key={item.href} href={lp(locale, item.href)}
                    className="block px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-primary-900/10 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium text-sm transition-colors">
                    {isAr ? item.labelAr : item.labelEn}
                  </Link>
                ))}
              </div>
            </div>
            <AdSlot id="hijri-side" size="rectangle" />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <PageContent locale={locale} />;
}
