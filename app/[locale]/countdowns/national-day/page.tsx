import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import NationalDayPage from "./NationalDayPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "كم باقي على اليوم الوطني السعودي 96؟ | عداد تنازلي دقيق"
      : "Saudi National Day 96 Countdown | Accurate Timer",
    description: isAr
      ? "تابع العد التنازلي لليوم الوطني السعودي 96 الموافق 23 سبتمبر 2026. اعرف كم باقي على اليوم الوطني بالأيام والساعات والدقائق."
      : "Live countdown to Saudi National Day 96, September 23, 2026.",
    keywords: isAr
      ? ["كم باقي على اليوم الوطني", "اليوم الوطني السعودي 96", "اليوم الوطني 2026", "عداد اليوم الوطني", "23 سبتمبر"]
      : ["saudi national day countdown", "national day 2026", "september 23"],
    alternates: { canonical: locale === "ar" ? "/countdowns/national-day" : `/${locale}/countdowns/national-day` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <NationalDayPage locale={locale} />;
}
