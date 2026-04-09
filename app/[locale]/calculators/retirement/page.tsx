import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import RetirementCalculatorPage from "./RetirementCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "حاسبة التقاعد السعودية 2026 — احسب معاشك التقاعدي مدني وعسكري وخاص"
    : "Saudi Retirement Calculator 2026 — Calculate Your Pension (Civil, Military, Private)";
  const description = isAr
    ? "أقوى حاسبة تقاعد سعودية: احسب معاشك التقاعدي للقطاع المدني والعسكري والخاص (التأمينات). التقاعد المبكر، إضافة المعالين، تحليل الفجوة، مؤشر الجاهزية، رسوم بيانية تفاعلية. مجاني 100%."
    : "Most powerful Saudi retirement calculator: pension for civil, military & private (GOSI) sectors. Early retirement, dependents supplement, gap analysis, readiness score, interactive charts. 100% free.";
  const keywords = isAr
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
    : ["retirement calculator", "saudi pension", "GOSI calculator", "early retirement", "pension calculator", "civil pension", "military pension"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/retirement", { title, description, keywords }),
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
