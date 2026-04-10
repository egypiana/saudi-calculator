import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CurrencyConverterPage from "./CurrencyConverterPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = "حاسبة تحويل العملات 2026 — الريال السعودي مقابل 35+ عملة (مصري، باكستاني، هندي)";
  const description =
    "أشمل حاسبة تحويل عملات سعودية: تحويل فوري من الريال السعودي إلى 35+ عملة (جنيه مصري، روبية باكستانية، روبية هندية، تاكا، بيسو، دولار، يورو، درهم إماراتي). مقارنة متعددة + جدول سريع.";
  const keywords = [
    "تحويل عملات",
    "حاسبة تحويل العملات",
    "سعر صرف الريال السعودي",
    "ريال سعودي جنيه مصري",
    "SAR to EGP",
    "ريال سعودي روبية",
    "SAR to PKR",
    "SAR to INR",
    "تحويل ريال",
    "أسعار الصرف اليوم",
    "سعر الدولار بالريال",
    "تحويل عملات الخليج",
    "صرف ريال سعودي",
    "أسعار العملات السعودية",
    "حاسبة صرف العملات",
  ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/currency", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <CurrencyConverterPage locale={locale} />;
}
