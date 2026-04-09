import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import EidAdhaPage from "./EidAdhaPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "كم باقي على عيد الأضحى 2026؟ | عداد تنازلي دقيق"
      : "Eid Al-Adha 2026 Countdown | Accurate Timer",
    description: isAr
      ? "تابع العد التنازلي المباشر لعيد الأضحى المبارك 2026 الموافق 27 مايو / 10 ذو الحجة 1447 هـ. اعرف كم باقي على عيد الأضحى بالأيام والساعات والدقائق مع معلومات شاملة عن الأضحية والحج."
      : "Live countdown to Eid Al-Adha 2026, May 27, 10 Dhul-Hijjah 1447 AH. Track how many days until Eid Al-Adha with accurate timer.",
    keywords: isAr
      ? ["كم باقي على عيد الأضحى", "عيد الأضحى 2026", "متى عيد الأضحى", "عداد عيد الأضحى", "عيد الأضحى المبارك", "الأضحية", "يوم عرفة"]
      : ["eid al-adha countdown", "eid al-adha 2026", "when is eid al-adha"],
    alternates: { canonical: locale === "ar" ? "/countdowns/eid-adha" : `/${locale}/countdowns/eid-adha` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <EidAdhaPage locale={locale} />;
}
