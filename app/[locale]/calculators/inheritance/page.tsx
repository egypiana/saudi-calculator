import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import InheritanceCalculatorPage from "./InheritanceCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "حاسبة المواريث الشرعية 2026 — شجرة عائلة بصرية، العول والرد، تصدير PDF"
    : "Islamic Inheritance Calculator 2026 — Family Tree, Awl & Radd, PDF Export";
  const description = isAr
    ? "أشمل حاسبة مواريث عربية: 17 نوع وارث، شجرة عائلة بصرية تفاعلية، العول والرد والحجب، تصدير تقرير PDF، أمثلة جاهزة — المذهب الحنبلي المعتمد في السعودية."
    : "Most comprehensive Arabic inheritance calculator: 17 heir types, visual family tree, Awl & Radd & blocking, PDF report export, examples — Hanbali school.";
  const keywords = isAr
    ? [
        "حاسبة المواريث",
        "تقسيم التركة",
        "حاسبة الميراث الشرعي",
        "حساب الإرث",
        "أنصبة الورثة",
        "علم الفرائض",
        "تقسيم الميراث في الإسلام",
        "حاسبة الورثة",
        "المواريث في السعودية",
        "العول والرد",
        "حجب الورثة",
        "نصيب الزوجة من الميراث",
        "ميراث الأبناء",
        "شجرة عائلة المواريث",
        "تصدير تقرير الميراث PDF",
      ]
    : [
        "islamic inheritance calculator",
        "estate division calculator",
        "inheritance shares",
        "faraid calculator",
        "islamic law inheritance",
      ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/inheritance", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <InheritanceCalculatorPage locale={locale} />;
}
