import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HajjPage from "./HajjPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "كم باقي على الحج 2026؟ | عداد تنازلي دقيق لموسم الحج"
      : "Hajj 2026 Countdown | Accurate Timer",
    description: isAr
      ? "تابع العد التنازلي المباشر لموسم الحج 2026 الموافق 8 ذو الحجة 1447 هـ. اعرف كم باقي على الحج بالأيام والساعات والدقائق مع معلومات شاملة عن مناسك الحج."
      : "Live countdown to Hajj 2026. Track how many days until Hajj with accurate timer.",
    keywords: isAr
      ? ["كم باقي على الحج", "موسم الحج 2026", "متى الحج", "عداد الحج", "مناسك الحج"]
      : ["hajj countdown", "hajj 2026", "when is hajj"],
    alternates: { canonical: `/${locale}/countdowns/hajj` },
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <HajjPage locale={locale} />;
}
