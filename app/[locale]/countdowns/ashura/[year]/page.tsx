import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { generatePageSEO } from "@/lib/utils/metadata";
import { ASHURA_DATA, ASHURA_YEARS } from "@/lib/data/ashuraData";
import AshuraYearPage from "./AshuraYearPage";

export function generateStaticParams() {
  return ASHURA_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}): Promise<Metadata> {
  const yearNum = parseInt(year);
  const data = ASHURA_DATA[yearNum];

  if (!data) {
    return { title: "يوم عاشوراء — غير موجود" };
  }

  const title = data.content.metaTitle;
  const description = data.content.metaDescription;
  return {
    title,
    description,
    keywords: data.content.keywords,
    ...generatePageSEO(locale, `/countdowns/ashura/${year}`, { title, description, keywords: data.content.keywords }),
  };
}

export default function Page({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}) {
  unstable_setRequestLocale(locale);
  const yearNum = parseInt(year);

  if (!ASHURA_DATA[yearNum]) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">لم يتم العثور على بيانات لهذه السنة</p>
        </div>
      </main>
    );
  }

  return <AshuraYearPage year={yearNum} locale={locale} />;
}
