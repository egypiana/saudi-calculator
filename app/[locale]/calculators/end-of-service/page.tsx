import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import EndOfServicePage from "./EndOfServicePage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "حاسبة مكافأة نهاية الخدمة 2026 — تعديلات نظام العمل 2025 (10 أسباب انتهاء)"
    : "End of Service Calculator 2026 — Saudi Labor Law 2025 Amendments (10 Termination Types)";
  const description = isAr
    ? "أشمل حاسبة مكافأة نهاية الخدمة محدّثة وفق تعديلات نظام العمل فبراير 2025: 10 أسباب انتهاء، استقالة رسمية، إفلاس صاحب العمل، فترة إشعار 30/60 يوماً، استقالة المرأة، فترة تجربة 180 يوماً. حساب فوري ومجاني."
    : "Most comprehensive end of service calculator updated with Feb 2025 Saudi Labor Law amendments: 10 termination types, formal resignation, bankruptcy, 30/60 day notice, woman's special rights. Instant & free.";
  const keywords = isAr
    ? [
        "حاسبة نهاية الخدمة",
        "مكافأة نهاية الخدمة",
        "حاسبة مكافأة نهاية الخدمة",
        "نظام العمل السعودي",
        "تعديلات نظام العمل 2025",
        "مادة 84",
        "مادة 85",
        "حساب نهاية الخدمة",
        "مكافأة الاستقالة",
        "مكافأة الفصل",
        "مكافأة التقاعد",
        "إفلاس صاحب العمل",
        "فترة الإشعار",
        "استقالة المرأة",
        "حقوق الموظف",
        "نظام العمل الجديد",
      ]
    : ["end of service calculator", "saudi labor law 2025", "gratuity calculator", "resignation reward", "termination benefit", "article 84", "labor law amendments"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/end-of-service", { title, description, keywords }),
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
