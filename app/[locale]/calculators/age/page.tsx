import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import AgeCalculatorPage from "./AgeCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = "حاسبة العمر 2026 — احسب عمرك بالهجري والميلادي بدقة | كم عمري";
  const description =
    "احسب عمرك بالسنوات والأشهر والأيام والساعات. حساب العمر بالهجري والميلادي مع البرج والفصل ويوم الولادة وإحصائيات الحياة وعمرك على الكواكب. أدق حاسبة عمر عربية.";
  const keywords = [
    "حساب العمر",
    "احسب عمرك",
    "كم عمري",
    "احسب عمري",
    "حساب العمر بالهجري والميلادي",
    "حساب العمر بالهجري",
    "حاسبة العمر",
    "حسب العمر",
    "احسب العمر",
    "كيف اعرف عمري",
    "العمر بالهجري",
    "احسب عمرك بالهجري",
    "كم عمري بالهجري",
    "حساب العمر بالميلادي",
    "حساب فرق العمر",
    "عمري بالأيام",
    "عمري بالساعات",
    "تاريخ ميلادي بالهجري",
    "برجي حسب تاريخ ميلادي",
    "عيد ميلادي القادم",
  ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/age", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <AgeCalculatorPage locale={locale} />;
}
