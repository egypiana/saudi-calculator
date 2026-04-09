import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { generatePageSEO } from "@/lib/utils/metadata";
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

  const title = data.content.metaTitle;
  const description = data.content.metaDescription;
  return {
    title,
    description,
    keywords: data.content.keywords,
    ...generatePageSEO(locale, `/countdowns/mawlid/${year}`, { title, description, keywords: data.content.keywords }),
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
