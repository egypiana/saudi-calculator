import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SalaryDatesPage from "./SalaryDatesPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "مواعيد صرف الرواتب 2025-2026 | الراتب الحكومي وحساب المواطن والتقاعد وحافز"
      : "Saudi Salary Dates 2025-2026 | Government, Citizen Account, Pension & Hafiz",
    description: isAr
      ? "عداد تنازلي شامل لمواعيد صرف الرواتب الحكومية وحساب المواطن والتقاعد وحافز. جدول مواعيد الرواتب كامل مع تعديلات عطلة نهاية الأسبوع. اعرف كم باقي على الراتب القادم."
      : "Comprehensive countdown for Saudi government salaries, Citizen Account, pension, and Hafiz payment dates. Full schedule with weekend adjustments. Know exactly when your next payment arrives.",
    keywords: isAr
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
        ],
    alternates: {
      canonical:
        locale === "ar"
          ? "/countdowns/salaries-dates"
          : `/${locale}/countdowns/salaries-dates`,
    },
    openGraph: {
      title: isAr
        ? "مواعيد صرف الرواتب في السعودية 2025-2026"
        : "Saudi Salary Payment Dates 2025-2026",
      description: isAr
        ? "عداد تنازلي شامل لجميع مواعيد صرف الرواتب والمستحقات"
        : "Complete countdown for all Saudi payment dates",
      type: "website",
    },
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
