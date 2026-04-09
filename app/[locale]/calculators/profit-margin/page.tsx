import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ProfitMarginPage from "./ProfitMarginPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "حاسبة نسبة الربح وهامش الربح 2026 — Margin و Markup ومقارنة المنتجات"
    : "Profit Margin Calculator 2026 — Margin, Markup & Multi-Product Comparison";
  const description = isAr
    ? "أقوى حاسبة نسبة الربح: هامش الربح الإجمالي والتشغيلي وصافي الربح، تحويل Margin↔Markup، تسعير من الهامش المستهدف، مقارنة ربحية المنتجات، رسوم بيانية تفاعلية. مجاني 100%."
    : "Most powerful profit margin calculator: gross, operating & net margin, Margin↔Markup conversion, target pricing, multi-product comparison, interactive charts. 100% free.";
  const keywords = isAr
    ? [
        "حاسبة نسبة الربح",
        "حاسبة هامش الربح",
        "حساب الربح",
        "Profit Margin",
        "Markup calculator",
        "هامش الربح الإجمالي",
        "صافي الربح",
        "تسعير المنتجات",
        "نسبة الإضافة",
        "حاسبة التسعير",
        "مقارنة المنتجات",
        "تحليل الربحية",
        "حاسبة تجارية",
      ]
    : ["profit margin calculator", "markup calculator", "gross margin", "net margin", "pricing calculator", "product comparison", "business calculator"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/profit-margin", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <ProfitMarginPage locale={locale} />;
}
