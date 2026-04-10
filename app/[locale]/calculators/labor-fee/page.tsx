import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import LaborFeeCalculatorPage from "./LaborFeeCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = "حاسبة المقابل المالي 2026 — رسوم العمالة الوافدة ورخص العمل السعودية";
  const description =
    "احسب المقابل المالي لرخص العمل في السعودية بدقة. 700 ريال (متوازن) أو 800 ريال (غير متوازن) شهرياً لكل عامل وافد. إعفاءات المنشآت الصغيرة والصناعية + نسبة السعودة.";
  const keywords = [
    "حاسبة المقابل المالي",
    "رسوم العمالة الوافدة",
    "المقابل المالي لرخص العمل",
    "رسوم مكتب العمل",
    "المقابل المالي 2026",
    "رسوم العمالة السعودية",
    "حاسبة رخص العمل",
    "نسبة السعودة",
    "إعفاء المنشآت الصناعية",
    "إعفاء المنشآت الصغيرة",
    "700 ريال مقابل مالي",
    "800 ريال مقابل مالي",
    "رسوم الوافدين الشهرية",
    "تكلفة العمالة الوافدة",
    "رسوم تجديد رخصة العمل",
  ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/labor-fee", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <LaborFeeCalculatorPage locale={locale} />;
}
