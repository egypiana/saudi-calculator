import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { RAMADAN_DATA, AVAILABLE_YEARS } from "@/lib/data/ramadanData";
import RamadanYearPage from "./RamadanYearPage";

export function generateStaticParams() {
  return AVAILABLE_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}): Promise<Metadata> {
  const yearNum = parseInt(year);
  const data = RAMADAN_DATA[yearNum];

  if (!data) {
    return { title: "رمضان — غير موجود" };
  }

  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
    keywords: data.content.keywords,
    alternates: { canonical: `/${locale}/countdowns/ramadan/${year}` },
  };
}

export default function Page({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}) {
  unstable_setRequestLocale(locale);
  const yearNum = parseInt(year);

  if (!RAMADAN_DATA[yearNum]) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">لم يتم العثور على بيانات لهذه السنة</p>
        </div>
      </main>
    );
  }

  return <RamadanYearPage year={yearNum} locale={locale} />;
}
