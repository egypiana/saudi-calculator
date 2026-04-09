import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import RetirementCalculatorPage from "./RetirementCalculatorPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "حاسبة التقاعد السعودية 2026 — احسب معاشك التقاعدي مدني وعسكري وخاص"
      : "Saudi Retirement Calculator 2026 — Calculate Your Pension (Civil, Military, Private)",
    description: isAr
      ? "أقوى حاسبة تقاعد سعودية: احسب معاشك التقاعدي للقطاع المدني والعسكري والخاص (التأمينات). التقاعد المبكر، إضافة المعالين، تحليل الفجوة، مؤشر الجاهزية، رسوم بيانية تفاعلية. مجاني 100%."
      : "Most powerful Saudi retirement calculator: pension for civil, military & private (GOSI) sectors. Early retirement, dependents supplement, gap analysis, readiness score, interactive charts. 100% free.",
    keywords: isAr
      ? [
          "حاسبة التقاعد",
          "حاسبة المعاش التقاعدي",
          "التقاعد المبكر السعودية",
          "معاش التأمينات الاجتماعية",
          "حاسبة التقاعد المدني",
          "حاسبة التقاعد العسكري",
          "نظام التقاعد السعودي",
          "حساب المعاش",
          "GOSI pension calculator",
          "التأمينات الاجتماعية",
          "مكافأة نهاية الخدمة",
          "التخطيط للتقاعد",
          "سن التقاعد السعودية",
        ]
      : ["retirement calculator", "saudi pension", "GOSI calculator", "early retirement", "pension calculator", "civil pension", "military pension"],
    alternates: { canonical: locale === "ar" ? "/calculators/retirement" : `/${locale}/calculators/retirement` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <RetirementCalculatorPage locale={locale} />;
}
