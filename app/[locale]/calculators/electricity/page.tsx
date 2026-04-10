import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ElectricityCalculatorPage from "./ElectricityCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = "حاسبة فاتورة الكهرباء 2026 — شرائح الاستهلاك والتعرفة السعودية (SEC)";
  const description =
    "احسب فاتورة الكهرباء السعودية بدقة حسب تعرفة شركة الكهرباء SEC 2025-2026. شرائح الاستهلاك لجميع القطاعات (سكني، تجاري، صناعي، حكومي، زراعي). حاسبة استهلاك الأجهزة + ضريبة القيمة المضافة 15%.";
  const keywords = [
    "حاسبة فاتورة الكهرباء",
    "فاتورة الكهرباء السعودية",
    "شرائح الكهرباء",
    "تعرفة الكهرباء السعودية",
    "حساب استهلاك الكهرباء",
    "شركة الكهرباء SEC",
    "تكلفة الكهرباء بالريال",
    "حاسبة استهلاك الأجهزة",
    "سعر كيلو واط ساعة",
    "هيئة تنظيم الكهرباء SERA",
    "فاتورة كهرباء سكني",
    "فاتورة كهرباء تجاري",
    "رسوم العداد",
    "ضريبة الكهرباء 15%",
    "توفير استهلاك الكهرباء",
  ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/electricity", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <ElectricityCalculatorPage locale={locale} />;
}
