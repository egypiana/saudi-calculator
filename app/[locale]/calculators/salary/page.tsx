import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SalaryCalculatorPage from "./SalaryCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "حاسبة الراتب 2026 — سلالم رواتب حكومية، التأمينات، مقارنة قطاعات"
    : "Salary Calculator 2026 — Government Pay Scales, GOSI, Sector Comparison";
  const description = isAr
    ? "أشمل حاسبة راتب سعودية: سلالم رواتب حكومية (عام، معلمين، صحي، عسكري) بالمرتبة والدرجة، صافي الراتب، التأمينات 9.75%، مقارنة قطاعات، بدلات النقل. 15 مرتبة × 15 درجة."
    : "Most comprehensive Saudi salary calculator: government pay scales (civil, teachers, health, military) by rank & grade, GOSI deductions, sector comparison, transport allowances.";
  const keywords = isAr
    ? [
        "حاسبة الراتب",
        "سلم رواتب الموظفين",
        "سلم رواتب المعلمين",
        "سلم رواتب الصحيين",
        "سلم رواتب العسكريين",
        "صافي الراتب",
        "خصم التأمينات",
        "التأمينات الاجتماعية",
        "GOSI",
        "المرتبة والدرجة",
        "بدل النقل",
        "مقارنة رواتب القطاعات",
        "راتب سعودي",
        "الحد الأدنى للأجور",
        "ساند",
      ]
    : ["salary calculator", "saudi pay scale", "government salary scale", "teacher salary", "military salary", "gosi deduction", "sector comparison"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/salary", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <SalaryCalculatorPage locale={locale} />;
}
