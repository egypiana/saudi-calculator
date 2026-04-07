import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import RamadanCountdown from "./RamadanCountdown";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "كم باقي على رمضان 2026؟ | عداد تنازلي دقيق"
      : "Ramadan 2026 Countdown | Accurate Timer",
    description: isAr
      ? "احسب كم باقي على شهر رمضان المبارك 2026 / 1447 هـ بدقة. عداد تنازلي حي يُحدَّث كل ثانية."
      : "Calculate exactly how long until Ramadan 2026 / 1447 AH. Live countdown timer updated every second.",
    keywords: isAr
      ? ["كم باقي على رمضان", "عداد رمضان", "رمضان 2026", "متى رمضان 1447"]
      : ["ramadan countdown", "ramadan 2026", "when is ramadan"],
    alternates: {
      canonical: `/${locale}/countdowns/ramadan`,
    },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <RamadanCountdown />;
}
