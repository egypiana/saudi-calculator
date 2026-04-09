import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ZakatCalculatorPage from "./ZakatCalculatorPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "حاسبة الزكاة الشاملة 2026 — المال، الذهب، الأسهم، العقارات، الزروع، الأنعام"
      : "Comprehensive Zakat Calculator 2026 — Cash, Gold, Stocks, Real Estate, Crops, Livestock",
    description: isAr
      ? "أشمل حاسبة زكاة عربية: 14 نوع زكاة — المال، الذهب، الفضة، الأسهم، العقارات، عروض التجارة، الأحجار الكريمة، الزروع، التمور، الأنعام، الشركات. حساب فوري للنصاب مع رسم بياني وتقرير مفصّل."
      : "Most comprehensive Arabic Zakat calculator: 14 types — cash, gold, silver, stocks, real estate, trade goods, crops, livestock. Instant nisab calculation with charts and detailed report.",
    keywords: isAr
      ? [
          "حاسبة الزكاة",
          "حساب زكاة المال",
          "زكاة الذهب",
          "زكاة الفضة",
          "زكاة الأسهم",
          "زكاة العقارات",
          "زكاة عروض التجارة",
          "نصاب الزكاة",
          "زكاة الأنعام",
          "زكاة الزروع",
          "حاسبة زكاة شاملة",
          "زكاة الشركات",
          "زكاة التمور",
        ]
      : ["zakat calculator", "gold zakat", "nisab calculator", "islamic zakat", "comprehensive zakat"],
    alternates: { canonical: locale === "ar" ? "/calculators/zakat" : `/${locale}/calculators/zakat` },
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
