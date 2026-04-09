import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ArafahPage from "./ArafahPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "كم باقي على يوم عرفة 2026؟ | العد التنازلي ليوم عرفة"
      : "Arafat Day 2026 Countdown | How Long Until Yawm Arafah?",
    description: isAr
      ? "عداد تنازلي دقيق ليوم عرفة 2026 / 1447 هـ — ٩ ذو الحجة. اعرف كم باقي على يوم عرفة مع فضائل الصيام والدعاء ومواعيد يوم عرفة من 2025 إلى 2050."
      : "Accurate countdown to Arafat Day (Yawm Arafah) 2026 / 1447 AH — 9th Dhul Hijjah. Know exactly when Arafat Day falls, with dates from 2025 to 2050.",
    keywords: isAr
      ? ["كم باقي على يوم عرفة", "يوم عرفة 2026", "متى يوم عرفة", "صيام يوم عرفة", "دعاء يوم عرفة", "العد التنازلي ليوم عرفة"]
      : ["arafat day countdown", "yawm arafah 2026", "when is arafat day", "day of arafah fasting", "arafah dua"],
    alternates: { canonical: locale === "ar" ? "/countdowns/arafah" : `/${locale}/countdowns/arafah` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <ArafahPage locale={locale} />;
}
