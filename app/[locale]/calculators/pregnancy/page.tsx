import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PregnancyCalculatorPage from "./PregnancyCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = "حاسبة الحمل والولادة + العقيقة 2026 — موعد الولادة، تطور الجنين، الفحوصات";
  const description =
    "أشمل حاسبة حمل سعودية: 3 طرق حساب (آخر دورة، سونار، أطفال أنابيب IVF)، موعد الولادة المتوقع، تطور الجنين أسبوعياً بالفواكه، مواعيد الفحوصات الطبية، حساب العقيقة تلقائياً (اليوم 7/14/21).";
  const keywords = [
    "حاسبة الحمل",
    "حاسبة الولادة",
    "موعد الولادة المتوقع",
    "حساب الحمل",
    "أسابيع الحمل",
    "تطور الجنين",
    "العقيقة",
    "موعد العقيقة",
    "حاسبة الحمل بالسونار",
    "حاسبة الحمل IVF",
    "مراحل الحمل",
    "فحوصات الحمل",
    "الثلث الأول",
    "الثلث الثاني",
    "الثلث الثالث",
  ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/pregnancy", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <PregnancyCalculatorPage locale={locale} />;
}
