import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import CitizenAccountCalculatorPage from "./CitizenAccountCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = "حاسبة حساب المواطن 2026 — الأهلية والمبلغ التقديري والحد المانع";
  const description =
    "احسب مبلغ دعم حساب المواطن التقديري حسب دخلك وعدد أفراد أسرتك. رب أسرة 720 ريال، تابع ≥18 سنة 360 ريال، تابع <18 سنة 216 ريال. تحقق من الأهلية والحد المانع للاستحقاق.";
  const keywords = [
    "حاسبة حساب المواطن",
    "حساب المواطن 2026",
    "مبلغ حساب المواطن",
    "الحد المانع حساب المواطن",
    "أهلية حساب المواطن",
    "كم مبلغ حساب المواطن للفرد",
    "حساب المواطن للأسرة",
    "دعم حساب المواطن",
    "حد الإعفاء حساب المواطن",
    "حساب المواطن تابعين",
    "موعد صرف حساب المواطن",
    "شروط حساب المواطن",
    "حاسبة الدعم التقديرية",
    "حساب المواطن فرد مستقل",
    "حساب المواطن رب أسرة",
  ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/citizen-account", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <CitizenAccountCalculatorPage locale={locale} />;
}
