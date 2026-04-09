import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import MortgageCalculatorPage from "./MortgageCalculatorPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "حاسبة التمويل العقاري 2026 — مرابحة، إجارة، تورّق، مقارنة 8 بنوك سعودية"
    : "Saudi Mortgage Calculator 2026 — Murabaha, Ijara, Tawarruq, 8-Bank Comparison";
  const description = isAr
    ? "أشمل حاسبة تمويل عقاري سعودية: 3 أنواع تمويل (مرابحة، إجارة، تورّق)، مقارنة 8 بنوك (الراجحي، الأهلي، الرياض، الإنماء...)، دعم صندوق التنمية العقارية REDF، جدول سداد سنوي، ضوابط ساما."
    : "Most comprehensive Saudi mortgage calculator: 3 finance types (Murabaha, Ijara, Tawarruq), 8-bank comparison (Al Rajhi, SNB, Riyad Bank...), REDF subsidy support, annual amortization schedule, SAMA regulations.";
  const keywords = isAr
    ? [
        "حاسبة التمويل العقاري",
        "تمويل عقاري",
        "مرابحة",
        "إجارة منتهية بالتمليك",
        "تورّق",
        "القسط الشهري",
        "صندوق التنمية العقارية",
        "REDF",
        "دعم سكني",
        "الراجحي تمويل عقاري",
        "الأهلي تمويل عقاري",
        "بنك الرياض تمويل",
        "مقارنة بنوك",
        "ضوابط ساما",
        "الدفعة الأولى",
        "جدول سداد",
      ]
    : [
        "saudi mortgage calculator",
        "murabaha calculator",
        "ijara calculator",
        "home finance saudi",
        "REDF support",
        "bank comparison",
        "monthly payment calculator",
        "SAMA regulations",
      ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/calculators/mortgage", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <MortgageCalculatorPage locale={locale} />;
}
