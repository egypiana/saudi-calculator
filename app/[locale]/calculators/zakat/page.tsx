import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ZakatCalculatorPage from "./ZakatCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "حاسبة الزكاة الشاملة 2026 — المال، الذهب، الأسهم، العملات الرقمية، الزروع، الأنعام | أسعار لحظية"
    : "Comprehensive Zakat Calculator 2026 — Cash, Gold, Stocks, Crypto, Crops | Live Prices";
  const description = isAr
    ? "أشمل حاسبة زكاة عربية: 15 نوع زكاة — المال، الذهب بأسعار لحظية، أسهم تداول، العملات الرقمية (بيتكوين، إيثريوم)، العقارات، الزروع (القمح، الشعير، الأرز)، التمور، الأنعام. حساب فوري للنصاب مع رسم بياني."
    : "Most comprehensive Arabic Zakat calculator: 15 types — cash, gold with live prices, Tadawul stocks, cryptocurrency (Bitcoin, Ethereum), real estate, crops, livestock. Instant nisab calculation.";
  const keywords = isAr
    ? [
        "حاسبة الزكاة",
        "حساب زكاة المال",
        "زكاة الذهب",
        "زكاة الأسهم",
        "زكاة العملات الرقمية",
        "زكاة البيتكوين",
        "زكاة الإيثريوم",
        "أسهم تداول زكاة",
        "نصاب الزكاة",
        "زكاة الأنعام",
        "زكاة الزروع",
        "زكاة القمح",
        "سعر الذهب اليوم",
        "حاسبة زكاة شاملة",
        "زكاة الشركات",
      ]
    : ["zakat calculator", "gold zakat", "nisab calculator", "crypto zakat", "bitcoin zakat", "tadawul stocks zakat"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/zakat", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <ZakatCalculatorPage locale={locale} />;
}
