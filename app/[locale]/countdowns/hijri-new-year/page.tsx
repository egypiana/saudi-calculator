import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HijriNewYearPage from "./HijriNewYearPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "كم باقي على رأس السنة الهجرية 1448؟ | العد التنازلي"
    : "Hijri New Year 1448 Countdown | How Long Until 1 Muharram?";
  const description = isAr
    ? "عداد تنازلي دقيق لرأس السنة الهجرية 1448 — ١ محرم. اعرف كم باقي على السنة الهجرية الجديدة مع فضائل شهر محرم وصيام عاشوراء ومواعيد رأس السنة الهجرية من 2025 إلى 2050."
    : "Accurate countdown to Hijri New Year 1448 — 1st Muharram. Know exactly when the Islamic New Year falls, with dates from 2025 to 2050.";
  const keywords = isAr
    ? ["كم باقي على رأس السنة الهجرية", "رأس السنة الهجرية 1448", "متى رأس السنة الهجرية", "١ محرم", "العد التنازلي لرأس السنة الهجرية"]
    : ["hijri new year countdown", "islamic new year 1448", "when is 1 muharram", "hijri new year date"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns/hijri-new-year", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <HijriNewYearPage locale={locale} />;
}
