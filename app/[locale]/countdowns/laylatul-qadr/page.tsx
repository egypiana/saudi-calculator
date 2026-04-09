import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import LailatulQadrPage from "./LailatulQadrPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "كم باقي على ليلة القدر 2026؟ | العد التنازلي لليلة القدر"
    : "Laylatul Qadr 2026 Countdown | How Long Until the Night of Power?";
  const description = isAr
    ? "عداد تنازلي دقيق لليلة القدر المباركة 2026 / 1447 هـ. اعرف كم باقي على ليلة القدر في الليالي الوترية من العشر الأواخر من رمضان (21، 23، 25، 27، 29) مع مواعيد ليلة القدر من 2025 إلى 2050."
    : "Accurate countdown to Laylatul Qadr (Night of Power) 2026 / 1447 AH. Know exactly when the odd nights of the last 10 days of Ramadan fall, with dates from 2025 to 2050.";
  const keywords = isAr
    ? ["كم باقي على ليلة القدر", "ليلة القدر 2026", "متى ليلة القدر", "العشر الأواخر من رمضان", "ليلة 27 رمضان", "العد التنازلي لليلة القدر"]
    : ["laylatul qadr countdown", "night of power 2026", "when is laylatul qadr", "last 10 nights ramadan", "27th night ramadan"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns/laylatul-qadr", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <LailatulQadrPage locale={locale} />;
}
