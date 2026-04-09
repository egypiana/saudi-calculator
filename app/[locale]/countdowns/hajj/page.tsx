import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HajjPage from "./HajjPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "كم باقي على الحج 2026؟ | عداد تنازلي دقيق لموسم الحج"
    : "Hajj 2026 Countdown | Accurate Timer";
  const description = isAr
    ? "تابع العد التنازلي المباشر لموسم الحج 2026 الموافق 8 ذو الحجة 1447 هـ. اعرف كم باقي على الحج بالأيام والساعات والدقائق مع معلومات شاملة عن مناسك الحج."
    : "Live countdown to Hajj 2026. Track how many days until Hajj with accurate timer.";
  const keywords = isAr
    ? ["كم باقي على الحج", "موسم الحج 2026", "متى الحج", "عداد الحج", "مناسك الحج"]
    : ["hajj countdown", "hajj 2026", "when is hajj"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns/hajj", { title, description, keywords }),
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
