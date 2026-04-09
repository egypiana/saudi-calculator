import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { MAWLID_DATA, MAWLID_YEARS } from "@/lib/data/mawlidData";
import MawlidYearPage from "./MawlidYearPage";

export function generateStaticParams() {
  return MAWLID_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}): Promise<Metadata> {
  const yearNum = parseInt(year);
  const data = MAWLID_DATA[yearNum];

  if (!data) {
    return { title: "المولد النبوي — غير موجود" };
  }

  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
    keywords: data.content.keywords,
    alternates: { canonical: locale === "ar" ? `/countdowns/mawlid/${year}` : `/${locale}/countdowns/mawlid/${year}` },
  };
}

export default function Page({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}) {
  unstable_setRequestLocale(locale);
  const yearNum = parseInt(year);

  if (!MAWLID_DATA[yearNum]) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">لم يتم العثور على بيانات لهذه السنة</p>
        </div>
      </main>
    );
  }

  return <MawlidYearPage year={yearNum} locale={locale} />;
}
