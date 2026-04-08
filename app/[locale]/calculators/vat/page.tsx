import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import VATCalculatorPage from "./VATCalculatorPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "حاسبة ضريبة القيمة المضافة 2026 — إضافة واستخراج الضريبة لـ 12+ دولة"
      : "VAT Calculator 2026 — Add & Remove VAT for 12+ Countries",
    description: isAr
      ? "أقوى حاسبة ضريبة القيمة المضافة: إضافة واستخراج الضريبة لأي مبلغ — السعودية 15%، الإمارات، البحرين، مصر، وأكثر من 12 دولة. جدول مقارنة، رسم بياني، نسبة مخصصة، مجاني 100%."
      : "Most powerful VAT calculator: add & remove VAT for any amount — Saudi Arabia 15%, UAE, Bahrain, Egypt, and 12+ countries. Comparison table, charts, custom rates, 100% free.",
    keywords: isAr
      ? [
          "حاسبة الضريبة",
          "حاسبة ضريبة القيمة المضافة",
          "حساب الضريبة 15%",
          "إضافة الضريبة",
          "استخراج الضريبة",
          "ضريبة القيمة المضافة السعودية",
          "VAT calculator",
          "حاسبة الضريبة المضافة",
          "حاسبة الضريبة السعودية",
          "نسبة الضريبة",
          "ضريبة الإمارات",
          "ضريبة البحرين",
          "مقارنة الضرائب",
        ]
      : ["vat calculator", "saudi vat", "add vat", "remove vat", "tax calculator", "15% vat", "gcc vat comparison"],
    alternates: { canonical: `/${locale}/calculators/vat` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <VATCalculatorPage locale={locale} />;
}
