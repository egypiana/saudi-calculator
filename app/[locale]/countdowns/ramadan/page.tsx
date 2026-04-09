import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import RamadanPage from "./RamadanPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "العد التنازلي لرمضان 2027 | كم باقي على رمضان؟"
    : "Ramadan 2027 Countdown | How Long Until Ramadan?";
  const description = isAr
    ? "عداد تنازلي دقيق لشهر رمضان المبارك 2027 / 1448 هـ. اعرف كم يوم وساعة ودقيقة تبقى على رمضان، مع مواعيد رمضان من 2027 إلى 2050."
    : "Accurate countdown timer for Ramadan 2027 / 1448 AH. Know exactly how many days, hours, and minutes until Ramadan, with dates from 2027 to 2050.";
  const keywords = isAr
    ? ["كم باقي على رمضان", "عداد رمضان 2027", "متى رمضان 2027", "موعد رمضان", "رمضان 2027 السعودية", "العد التنازلي لرمضان"]
    : ["ramadan countdown", "ramadan 2027", "when is ramadan 2027", "ramadan countdown timer"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns/ramadan", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <RamadanPage locale={locale} />;
}
