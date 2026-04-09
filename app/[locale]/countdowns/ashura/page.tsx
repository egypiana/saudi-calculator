import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import AshuraPage from "./AshuraPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "كم باقي على يوم عاشوراء 2025؟ | العد التنازلي ليوم عاشوراء"
      : "Ashura Day 2025 Countdown | How Long Until Yawm Ashura?",
    description: isAr
      ? "عداد تنازلي دقيق ليوم عاشوراء 2025 — ١٠ محرم. اعرف كم باقي على يوم عاشوراء مع فضائل صيام عاشوراء وتاسوعاء ومواعيد يوم عاشوراء من 2025 إلى 2050."
      : "Accurate countdown to Ashura Day (Yawm Ashura) 2025 — 10th Muharram. Know exactly when Ashura falls, with dates from 2025 to 2050.",
    keywords: isAr
      ? ["كم باقي على عاشوراء", "يوم عاشوراء", "صيام عاشوراء", "تاسوعاء", "10 محرم"]
      : ["ashura day countdown", "yawm ashura 2025", "when is ashura", "ashura fasting", "10th muharram"],
    alternates: { canonical: locale === "ar" ? "/countdowns/ashura" : `/${locale}/countdowns/ashura` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <AshuraPage locale={locale} />;
}
