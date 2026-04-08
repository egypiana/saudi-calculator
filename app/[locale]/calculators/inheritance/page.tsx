import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import InheritanceCalculatorPage from "./InheritanceCalculatorPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "حاسبة المواريث الشرعية 2026 — تقسيم التركة والإرث الشرعي"
      : "Islamic Inheritance Calculator 2026 — Estate Division",
    description: isAr
      ? "حاسبة المواريث الشرعية: احسب نصيب كل وارث فورياً وفق الشريعة الإسلامية. 17 نوع وارث، الحجب، العول والرد، أمثلة جاهزة، رسم بياني — المذهب الحنبلي المعتمد في السعودية."
      : "Islamic inheritance calculator: compute each heir's share according to Islamic law. 17 heir types, blocking rules, 'Awl & Radd, examples, pie chart — Hanbali school.",
    keywords: isAr
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
        ]
      : [
          "islamic inheritance calculator",
          "estate division calculator",
          "inheritance shares",
          "faraid calculator",
          "islamic law inheritance",
        ],
    alternates: { canonical: `/${locale}/calculators/inheritance` },
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
