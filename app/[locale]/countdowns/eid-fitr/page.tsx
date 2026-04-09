import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import EidFitrPage from "./EidFitrPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "كم باقي على عيد الفطر 2026؟ | عداد تنازلي دقيق"
    : "Eid Al-Fitr 2026 Countdown | Accurate Timer";
  const description = isAr
    ? "تابع العد التنازلي المباشر لعيد الفطر المبارك 2026 الموافق 20 مارس 1447 هـ. اعرف كم باقي على عيد الفطر بالأيام والساعات والدقائق مع معلومات شاملة."
    : "Live countdown to Eid Al-Fitr 2026, March 20, 1447 AH. Track how many days until Eid with accurate timer.";
  const keywords = isAr
    ? ["كم باقي على عيد الفطر", "عيد الفطر 2026", "متى عيد الفطر", "عداد عيد الفطر", "عيد الفطر المبارك"]
    : ["eid al-fitr countdown", "eid 2026", "when is eid al-fitr"];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns/eid-fitr", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <EidFitrPage locale={locale} />;
}
