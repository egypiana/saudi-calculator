import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import MawlidPage from "./MawlidPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "كم باقي على المولد النبوي 2025؟ | العد التنازلي للمولد النبوي الشريف"
      : "Mawlid an-Nabi 2025 Countdown | How Long Until Prophet's Birthday?",
    description: isAr
      ? "عداد تنازلي دقيق للمولد النبوي الشريف 2025 — ١٢ ربيع الأول. اعرف كم باقي على المولد النبوي مع مواعيد ذكرى مولد النبي من 2025 إلى 2050."
      : "Accurate countdown to Mawlid an-Nabi (Prophet's Birthday) 2025 — 12th Rabi al-Awwal. Know exactly when Mawlid falls, with dates from 2025 to 2050.",
    keywords: isAr
      ? ["كم باقي على المولد النبوي", "المولد النبوي 2025", "متى المولد النبوي", "12 ربيع الأول", "ذكرى مولد النبي"]
      : ["mawlid an-nabi countdown", "prophet birthday 2025", "when is mawlid", "12 rabi al-awwal", "mawlid date"],
    alternates: { canonical: locale === "ar" ? "/countdowns/mawlid" : `/${locale}/countdowns/mawlid` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <MawlidPage locale={locale} />;
}
