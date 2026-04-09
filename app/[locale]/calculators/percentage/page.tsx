import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PercentageCalculator from "./PercentageCalculator";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "حاسبة النسبة المئوية من مبلغ 2026 | خصم، زكاة، ضريبة، إكرامية"
      : "Percentage Calculator 2026 | Discount, VAT, Zakat, Tips",
    description: isAr
      ? "احسب أي نسبة مئوية من أي مبلغ فورياً. حاسبة الخصم، ضريبة القيمة المضافة 15%، الزكاة 2.5%، الإكرامية، العمولة، ونسبة التغيير — مجانية وبالعربية."
      : "Calculate any percentage instantly. Discount calculator, 15% VAT, Zakat 2.5%, tips, commissions, and percentage change — free and accurate.",
    keywords: isAr
      ? ["حاسبة النسبة المئوية", "حساب النسبة من مبلغ", "حاسبة الخصم", "حاسبة القيمة المضافة 15", "حساب الزكاة", "حاسبة الإكرامية", "نسبة التغيير", "حساب نسبة مئوية"]
      : ["percentage calculator", "discount calculator", "vat calculator", "zakat calculator"],
    alternates: { canonical: locale === "ar" ? "/calculators/percentage" : `/${locale}/calculators/percentage` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <PercentageCalculator locale={locale} />;
}
