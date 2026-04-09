import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import TimeCalculatorPage from "./TimeCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "حاسبة الوقت والتاريخ 2026 — فرق الوقت، إضافة وطرح، ساعات العمل"
    : "Time & Date Calculator 2026 — Time Difference, Add/Subtract, Work Hours";
  const description = isAr
    ? "أقوى حاسبة وقت: الفرق بين وقتين أو تاريخين، إضافة وطرح ساعات ودقائق، حاسبة ساعات العمل مع أجور، تحويل وحدات الوقت. 5 أدوات في حاسبة واحدة. مجاني 100%."
    : "Most powerful time calculator: difference between times/dates, add/subtract hours, work hours with wages, time unit converter. 5 tools in one. 100% free.";
  const keywords = isAr
    ? [
        "حاسبة الوقت",
        "الفرق بين وقتين",
        "الفرق بين تاريخين",
        "حاسبة ساعات العمل",
        "إضافة ساعات",
        "تحويل وحدات الوقت",
        "حساب الوقت",
        "كم ساعة بين",
        "حاسبة التاريخ",
        "حاسبة المدة",
        "حاسبة الدقائق",
        "فرق التاريخ",
        "ساعات العمل السعودية",
      ]
    : ["time calculator", "time difference", "date difference", "work hours calculator", "add hours", "time converter", "duration calculator"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/time", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <TimeCalculatorPage locale={locale} />;
}
