import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SalaryDatesPage from "./SalaryDatesPage";
import { generatePageSEO } from "@/lib/utils/metadata";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  const title = isAr
    ? "مواعيد صرف الرواتب 2025-2026 | الراتب الحكومي وحساب المواطن والتقاعد وحافز"
    : "Saudi Salary Dates 2025-2026 | Government, Citizen Account, Pension & Hafiz";
  const description = isAr
    ? "عداد تنازلي شامل لمواعيد صرف الرواتب الحكومية وحساب المواطن والتقاعد وحافز. جدول مواعيد الرواتب كامل مع تعديلات عطلة نهاية الأسبوع. اعرف كم باقي على الراتب القادم."
    : "Comprehensive countdown for Saudi government salaries, Citizen Account, pension, and Hafiz payment dates. Full schedule with weekend adjustments. Know exactly when your next payment arrives.";
  const keywords = isAr
    ? [
        "كم باقي على الراتب",
        "مواعيد الرواتب",
        "الراتب الحكومي",
        "حساب المواطن",
        "التقاعد",
        "حافز",
        "موعد صرف الراتب",
        "جدول الرواتب",
        "رواتب الموظفين",
        "التأمينات الاجتماعية",
      ]
    : [
        "saudi salary dates",
        "government salary countdown",
        "citizen account payment",
        "pension dates saudi",
        "hafiz payment",
        "when is next salary",
      ];
  return {
    title,
    description,
    keywords,
    ...generatePageSEO(locale, "/countdowns/salaries-dates", { title, description, keywords }),
  };
}

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <SalaryDatesPage locale={locale} />;
}
