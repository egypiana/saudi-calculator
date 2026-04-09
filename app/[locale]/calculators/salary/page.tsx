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
    ? "حاسبة الراتب 2026 — صافي الراتب والتأمينات الاجتماعية GOSI"
    : "Salary Calculator 2026 — Net Salary & GOSI Deductions";
  const description = isAr
    ? "أشمل حاسبة راتب سعودية: صافي الراتب، خصم التأمينات 9.75%، حصة الموظف وصاحب العمل، سعودي وغير سعودي، البدلات، الأوقات الإضافية، تحويل الراتب. حساب فوري ومجاني."
    : "Most comprehensive Saudi salary calculator: net salary, GOSI 9.75%, employee & employer share, Saudi & non-Saudi, allowances, overtime, salary conversion. Instant & free.";
  const keywords = isAr
    ? [
        "حاسبة الراتب",
        "صافي الراتب",
        "خصم التأمينات",
        "التأمينات الاجتماعية",
        "GOSI",
        "راتب سعودي",
        "حاسبة الراتب السعودية",
        "حصة صاحب العمل",
        "بدل السكن",
        "بدل النقل",
        "الحد الأدنى للأجور",
        "نظام العمل السعودي",
        "ساند",
      ]
    : ["salary calculator", "saudi salary", "gosi deduction", "net salary", "saudi labor law", "employee gosi", "employer cost"];
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
