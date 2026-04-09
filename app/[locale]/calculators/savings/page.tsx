import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SavingsCalculatorPage from "./SavingsCalculatorPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "حاسبة الادخار والفائدة المركبة 2026 — خطط لمستقبلك المالي"
      : "Savings & Compound Interest Calculator 2026 — Plan Your Financial Future",
    description: isAr
      ? "أقوى حاسبة ادخار: احسب الفائدة المركبة، خطط لأهدافك المالية، قارن عوائد الاستثمار في السعودية. رسوم بيانية تفاعلية، جدول سنوي، وضع تحقيق الأهداف، مجاني 100%."
      : "Most powerful savings calculator: compound interest, financial goal planning, Saudi investment returns comparison. Interactive charts, yearly breakdown, goal mode, 100% free.",
    keywords: isAr
      ? [
          "حاسبة الادخار",
          "حاسبة الفائدة المركبة",
          "حساب الأرباح",
          "تخطيط مالي",
          "استثمار السعودية",
          "عوائد الاستثمار",
          "حاسبة الاستثمار",
          "ادخار شهري",
          "صناديق استثمارية",
          "التقاعد المبكر",
          "حاسبة التوفير",
          "الفائدة التراكمية",
          "تحقيق الأهداف المالية",
        ]
      : ["savings calculator", "compound interest", "investment calculator", "financial planning", "saudi investment", "retirement calculator", "goal planning"],
    alternates: { canonical: locale === "ar" ? "/calculators/savings" : `/${locale}/calculators/savings` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <SavingsCalculatorPage locale={locale} />;
}
