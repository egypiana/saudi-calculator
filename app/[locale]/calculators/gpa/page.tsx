import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import GPACalculatorPage from "./GPACalculatorPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "حاسبة المعدل التراكمي GPA 2026 — نظام 5 و 4 نقاط مع المعدل التراكمي"
      : "GPA Calculator 2026 — 5.0 & 4.0 Scale with Cumulative GPA",
    description: isAr
      ? "أشمل حاسبة معدل تراكمي للجامعات السعودية: نظام 5 نقاط و4 نقاط، حساب المعدل الفصلي والتراكمي، جدول التقديرات، رسم بياني، 12 جامعة سعودية. حساب فوري ومجاني."
      : "Most comprehensive GPA calculator for Saudi universities: 5.0 & 4.0 scales, semester & cumulative GPA, grade reference, charts, 12 Saudi universities. Instant & free.",
    keywords: isAr
      ? [
          "حاسبة المعدل التراكمي",
          "حاسبة GPA",
          "حساب المعدل الجامعي",
          "المعدل التراكمي",
          "نظام 5 نقاط",
          "نظام 4 نقاط",
          "جامعة الملك سعود",
          "جامعة الملك عبدالعزيز",
          "جامعة الملك فهد",
          "معدل الجامعة",
          "حساب المعدل الفصلي",
          "تقديرات الجامعة",
          "مرتبة الشرف",
        ]
      : ["gpa calculator", "saudi university gpa", "5.0 scale", "4.0 scale", "cumulative gpa", "semester gpa", "grade calculator"],
    alternates: { canonical: locale === "ar" ? "/calculators/gpa" : `/${locale}/calculators/gpa` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <GPACalculatorPage locale={locale} />;
}
