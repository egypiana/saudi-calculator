import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CitizenAccountCountdownPage from "./CitizenAccountCountdownPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = "كم باقي على حساب المواطن؟ | موعد صرف الدفعة القادمة + حاسبة الدعم";
  const description =
    "عدّاد تنازلي مباشر لموعد صرف دعم حساب المواطن (يوم 10 من كل شهر). تعرّف على شروط الأهلية، مبالغ الدعم، الحد المانع، واحسب مبلغ دعمك التقديري مجاناً.";
  const keywords = [
    "كم باقي على حساب المواطن",
    "موعد صرف حساب المواطن",
    "حساب المواطن الدفعة القادمة",
    "متى ينزل حساب المواطن",
    "عداد حساب المواطن",
    "حساب المواطن 2026",
    "مبلغ حساب المواطن",
    "شروط حساب المواطن",
    "الحد المانع حساب المواطن",
    "حاسبة حساب المواطن",
    "أهلية حساب المواطن",
    "رب الأسرة حساب المواطن",
    "تابع حساب المواطن",
    "حساب المواطن للفرد المستقل",
    "تاريخ صرف حساب المواطن",
  ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns/citizen-account", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <CitizenAccountCountdownPage />;
}
