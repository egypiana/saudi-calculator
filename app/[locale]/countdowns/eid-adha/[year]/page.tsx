import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { generatePageSEO } from "@/lib/utils/metadata";
import { EID_ADHA_DATA, EID_ADHA_YEARS } from "@/lib/data/eidAdhaData";
import EidAdhaYearPage from "./EidAdhaYearPage";

export function generateStaticParams() {
  return EID_ADHA_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}): Promise<Metadata> {
  const yearNum = parseInt(year);
  const data = EID_ADHA_DATA[yearNum];
  if (!data) return { title: "عيد الأضحى — غير موجود" };
  const title = data.content.metaTitle;
  const description = data.content.metaDescription;
  return {
    title,
    description,
    keywords: data.content.keywords,
    ...generatePageSEO(locale, `/countdowns/eid-adha/${year}`, { title, description, keywords: data.content.keywords }),
  };
}

export default function Page({
  params: { locale, year },
}: {
  params: { locale: string; year: string };
}) {
  unstable_setRequestLocale(locale);
  const yearNum = parseInt(year);

  if (!EID_ADHA_DATA[yearNum]) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">لم يتم العثور على بيانات لهذه السنة</p>
        </div>
      </main>
    );
  }

  return <EidAdhaYearPage year={yearNum} locale={locale} />;
}
