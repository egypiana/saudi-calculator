import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { LAILATUL_QADR_DATA, LAILATUL_QADR_YEARS } from "@/lib/data/lailatulQadrData";
import LailatulQadrYearPage from "./LailatulQadrYearPage";

export function generateStaticParams() {
  return LAILATUL_QADR_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}): Promise<Metadata> {
  const yearNum = parseInt(year);
  const data = LAILATUL_QADR_DATA[yearNum];

  if (!data) {
    return { title: "ليلة القدر — غير موجود" };
  }

  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
    keywords: data.content.keywords,
    alternates: { canonical: locale === "ar" ? `/countdowns/laylatul-qadr/${year}` : `/${locale}/countdowns/laylatul-qadr/${year}` },
  };
}

export default function Page({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}) {
  unstable_setRequestLocale(locale);
  const yearNum = parseInt(year);

  if (!LAILATUL_QADR_DATA[yearNum]) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">لم يتم العثور على بيانات لهذه السنة</p>
        </div>
      </main>
    );
  }

  return <LailatulQadrYearPage year={yearNum} locale={locale} />;
}
