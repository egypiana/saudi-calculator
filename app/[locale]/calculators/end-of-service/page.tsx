import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import EndOfServicePage from "./EndOfServicePage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "حاسبة مكافأة نهاية الخدمة 2026 — نظام العمل السعودي (مواد 84-87)"
      : "End of Service Calculator 2026 — Saudi Labor Law (Articles 84-87)",
    description: isAr
      ? "أشمل حاسبة مكافأة نهاية الخدمة: استقالة، فصل، تقاعد، انتهاء عقد، قوة قاهرة. خطوات الحساب التفصيلية، حالات الاستقالة الأربعة، مواد النظام. حساب فوري ومجاني."
      : "Most comprehensive end of service calculator: resignation, termination, retirement, contract end. Step-by-step calculation, Saudi Labor Law articles 84-87. Instant & free.",
    keywords: isAr
      ? [
          "حاسبة نهاية الخدمة",
          "مكافأة نهاية الخدمة",
          "حاسبة مكافأة نهاية الخدمة",
          "نظام العمل السعودي",
          "مادة 84",
          "مادة 85",
          "حساب نهاية الخدمة",
          "مكافأة الاستقالة",
          "مكافأة الفصل",
          "مكافأة التقاعد",
          "حقوق الموظف",
          "تسوية نهاية الخدمة",
          "نظام العمل",
        ]
      : ["end of service calculator", "saudi labor law", "gratuity calculator", "resignation reward", "termination benefit", "article 84"],
    alternates: { canonical: `/${locale}/calculators/end-of-service` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <EndOfServicePage locale={locale} />;
}
